// Browser-side loader for Google Identity Services (Sign in with Google button and One Tap).
// The library must be loaded from accounts.google.com; Google does not support self-hosting it.

type CredentialResponse = { credential?: string; select_by?: string };
type GoogleIdApi = {
  initialize: (config: Record<string, unknown>) => void;
  prompt: () => void;
  renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
  cancel: () => void;
};
type GoogleWindow = Window & { google?: { accounts?: { id?: GoogleIdApi } } };

// "button" when the Sign in with Google button was used (select_by btn / btn_confirm), otherwise One Tap.
export type GoogleSignInSource = "button" | "one_tap";
export type GoogleSignInResult = { ok: true; created: boolean; source: GoogleSignInSource } | { ok: false; reason: string; source: GoogleSignInSource };

const SCRIPT_SRC = "https://accounts.google.com/gsi/client";
export const AUTH_CHANNEL = "resizet-auth";

let scriptPromise: Promise<GoogleIdApi> | null = null;
let ready: Promise<GoogleIdApi> | null = null;
const listeners = new Set<(result: GoogleSignInResult) => void>();

function loadScript(locale: string): Promise<GoogleIdApi> {
  const w = window as GoogleWindow;
  if (w.google?.accounts?.id) return Promise.resolve(w.google.accounts.id);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    // hl sets the button language to the page language instead of the browser's (Google's documented way).
    script.src = `${SCRIPT_SRC}?hl=${encodeURIComponent(locale)}`;
    script.async = true;
    script.onload = () => (w.google?.accounts?.id ? resolve(w.google.accounts.id) : reject(new Error("gsi_load")));
    script.onerror = () => {
      scriptPromise = null;
      script.remove();
      reject(new Error("gsi_load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

// Tells every Resizet tab (and other components in this tab) that the account changed.
export function announceAccountChange() {
  if (typeof BroadcastChannel === "undefined") return;
  const channel = new BroadcastChannel(AUTH_CHANNEL);
  channel.postMessage({ type: "account-updated" });
  channel.close();
}

async function exchange(credential: string, source: GoogleSignInSource): Promise<GoogleSignInResult> {
  // The nonce cookie is single-use, so the next sign-in on this page needs a fresh initialization.
  ready = null;
  try {
    const response = await fetch("/api/auth/google/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential }),
    });
    const data = (await response.json().catch(() => ({}))) as { ok?: boolean; created?: boolean; reason?: string };
    if (!response.ok || !data.ok) return { ok: false, reason: data.reason || "google_failed", source };
    announceAccountChange();
    return { ok: true, created: Boolean(data.created), source };
  } catch {
    return { ok: false, reason: "google_failed", source };
  }
}

// Initializes once per page with a fresh nonce from our server. The button and One Tap share this one
// initialization, as Google requires; each credential is exchanged once and the result goes to every listener.
export function initGoogleIdentity(locale: string): Promise<GoogleIdApi> {
  if (ready) return ready;
  ready = (async () => {
    const response = await fetch("/api/auth/google/nonce", { method: "POST", cache: "no-store" });
    if (!response.ok) throw new Error(response.status === 503 ? "unavailable" : "nonce");
    const { nonce, clientId } = (await response.json()) as { nonce: string; clientId: string };
    const api = await loadScript(locale);
    api.initialize({
      client_id: clientId,
      nonce,
      callback: (r: CredentialResponse) => {
        if (!r.credential) return;
        const source: GoogleSignInSource = r.select_by?.startsWith("btn") ? "button" : "one_tap";
        void exchange(r.credential, source).then((result) => listeners.forEach((fn) => fn(result)));
      },
      auto_select: false,
      cancel_on_tap_outside: true,
      itp_support: true,
      use_fedcm_for_button: true,
      context: "signin",
      ux_mode: "popup",
      locale,
    });
    return api;
  })().catch((error) => {
    ready = null;
    throw error;
  });
  return ready;
}

export function onGoogleSignIn(fn: (result: GoogleSignInResult) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
