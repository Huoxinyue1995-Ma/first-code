"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { type Dictionary, fmt } from "@/lib/dictionary";
import { announceAccountChange, initGoogleIdentity, onGoogleSignIn } from "@/lib/google-identity";
import type { Locale } from "@/lib/i18n";

type Labels = Dictionary["login"];
const RESEND_SECONDS = 30;

// Google button rendered by Google Identity Services (popup / FedCM, no page change). If the library cannot
// load (blocked script, old browser), it falls back to the redirect link, which still works everywhere.
function GoogleButton({ locale, label, fallbackHref, fallbackNewTab, onError }: {
  locale: Locale; label: string; fallbackHref: string; fallbackNewTab: boolean; onError: (reason: string) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "fallback" | "hidden">("loading");

  useEffect(() => {
    let live = true;
    initGoogleIdentity(locale)
      .then((api) => {
        if (!live || !box.current) return;
        // Google caps the button at 400 px wide; on wider cards it stays centered.
        const width = Math.min(400, Math.max(200, Math.round(box.current.parentElement?.getBoundingClientRect().width ?? 320)));
        api.renderButton(box.current, { type: "standard", theme: "outline", size: "large", text: "continue_with", shape: "rectangular", logo_alignment: "center", width, locale });
        setState("ready");
      })
      .catch((error: Error) => live && setState(error.message === "unavailable" ? "hidden" : "fallback"));
    return () => {
      live = false;
    };
  }, [locale]);

  useEffect(() => onGoogleSignIn((result) => {
    if (result.source !== "button") return;
    if (result.ok) trackEvent("login", { method: "google_button", new_user: result.created });
    else onError(result.reason);
  }), [onError]);

  if (state === "hidden") return null;
  return (
    <div className="google-slot">
      <div className="google-render" ref={box} style={{ display: state === "ready" ? "flex" : "none" }} />
      {state !== "ready" && (
        <a className="plan-button google-button" href={fallbackHref} rel={fallbackNewTab ? "opener" : undefined} target={fallbackNewTab ? "_blank" : undefined}
          onClick={() => trackEvent("login_start", { method: "google_redirect" })}>
          {label}
        </a>
      )}
    </div>
  );
}

function EmailCodeForm({ locale, l, onSignedIn }: { locale: Locale; l: Labels; onSignedIn: () => void }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    if (step === "code") codeRef.current?.focus();
  }, [step]);

  const message = (reason: string, n?: number) => fmt(l.errors[reason] ?? l.errors.invalid_request, { n: n ?? 0 });

  async function sendCode(event?: FormEvent) {
    event?.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/email/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      const data = (await response.json().catch(() => ({}))) as { sent?: boolean; reason?: string };
      if (!response.ok || !data.sent) throw new Error(data.reason || "send_failed");
      setStep("code");
      setCode("");
      setCooldown(RESEND_SECONDS);
      trackEvent("login_code_sent", {});
    } catch (err) {
      setError(message(err instanceof Error ? err.message : "send_failed"));
    } finally {
      setBusy(false);
    }
  }

  async function verify(value: string) {
    if (busy || value.length !== 6) return;
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/email/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: value }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; created?: boolean; reason?: string; attemptsLeft?: number };
      if (!response.ok || !data.ok) {
        setError(message(data.reason || "invalid_request", data.attemptsLeft));
        if (data.reason === "wrong") setCode("");
        return;
      }
      trackEvent("login", { method: "email_code", new_user: Boolean(data.created) });
      announceAccountChange();
      onSignedIn();
    } catch {
      setError(message("invalid_request"));
    } finally {
      setBusy(false);
    }
  }

  if (step === "code") {
    return (
      <form className="email-form" onSubmit={(ev) => { ev.preventDefault(); void verify(code); }}>
        <p className="code-sent" role="status">{fmt(l.codeSentTo, { email })}</p>
        <label htmlFor="login-code">{l.codeLabel}</label>
        <input
          autoComplete="one-time-code" className="code-input" id="login-code" inputMode="numeric" maxLength={6} pattern="\d{6}" ref={codeRef} required
          onChange={(ev) => {
            const value = ev.target.value.replace(/\D/g, "").slice(0, 6);
            setCode(value);
            if (value.length === 6) void verify(value);
          }}
          value={code}
        />
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="plan-button" disabled={busy || code.length !== 6} type="submit">{busy ? l.verifying : l.verifyCode}</button>
        <div className="code-actions">
          <button className="text-button" disabled={busy || cooldown > 0} onClick={() => void sendCode()} type="button">
            {cooldown > 0 ? fmt(l.resendIn, { s: cooldown }) : l.resend}
          </button>
          <button className="text-button" onClick={() => { setStep("email"); setError(null); }} type="button">{l.useDifferent}</button>
        </div>
      </form>
    );
  }

  return (
    <form className="email-form" onSubmit={sendCode}>
      <label htmlFor="login-email">{l.emailLabel}</label>
      <input autoComplete="email" id="login-email" inputMode="email" onChange={(ev) => setEmail(ev.target.value)} placeholder={l.emailPlaceholder} required type="email" value={email} />
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button className="plan-button" disabled={busy} type="submit">{busy ? l.sendingCode : l.sendCode}</button>
    </form>
  );
}

// The whole sign-in UI: Google first, then email with a 6-digit code. Used on /login and inside the
// download dialog, so signing in never takes the user away from the tab that holds their photos.
export function SignInPanel({ locale, l, googleFallbackHref, googleFallbackNewTab = false, onSignedIn }: {
  locale: Locale; l: Labels; googleFallbackHref: string; googleFallbackNewTab?: boolean; onSignedIn: () => void;
}) {
  const [googleError, setGoogleError] = useState<string | null>(null);
  const showGoogleError = useCallback((reason: string) => setGoogleError(l.errors[reason] ?? l.errors.google_failed), [l]);
  const onSignedInRef = useRef(onSignedIn);
  onSignedInRef.current = onSignedIn;

  useEffect(() => onGoogleSignIn((result) => {
    if (result.ok) onSignedInRef.current();
  }), []);

  return (
    <div className="sign-in-panel">
      <GoogleButton fallbackHref={googleFallbackHref} fallbackNewTab={googleFallbackNewTab} label={l.google} locale={locale} onError={showGoogleError} />
      {googleError && <p className="auth-error" role="alert">{googleError}</p>}
      <div className="auth-divider"><span>{l.or}</span></div>
      <EmailCodeForm l={l} locale={locale} onSignedIn={onSignedIn} />
    </div>
  );
}
