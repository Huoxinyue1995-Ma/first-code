"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { initGoogleIdentity, onGoogleSignIn } from "@/lib/google-identity";
import type { Locale } from "@/lib/i18n";

// Pages where One Tap would get in the way: sign-in itself and the post-sign-in landing page.
const SKIP = /^\/(es\/)?login(\/|$)/;

// Google One Tap for signed-out visitors. Google decides whether it actually appears (a signed-in Google
// session, browser support) and backs off on its own after the visitor closes it, so we only ask.
export function GoogleOneTap({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  useEffect(() => {
    if (SKIP.test(pathname)) return;
    let live = true;
    let api: { prompt: () => void; cancel: () => void } | null = null;
    const stop = onGoogleSignIn((result) => {
      if (result.ok && result.source === "one_tap") trackEvent("login", { method: "google_one_tap", new_user: result.created });
    });

    // Short delay so One Tap never competes with the first paint.
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch("/api/credits", { cache: "no-store" });
        const account = (await response.json()) as { signedIn?: boolean };
        if (!live || account.signedIn) return;
        api = await initGoogleIdentity(locale);
        if (!live) return;
        api.prompt();
        trackEvent("one_tap_requested", {});
      } catch {
        // Google sign-in unavailable or blocked: the page works the same without One Tap.
      }
    }, 2500);

    return () => {
      live = false;
      window.clearTimeout(timer);
      stop();
      api?.cancel();
    };
  }, [locale, pathname]);

  return null;
}
