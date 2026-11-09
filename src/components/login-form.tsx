"use client";

import { useRouter } from "next/navigation";
import { SignInPanel } from "@/components/sign-in-panel";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

// /login page: after signing in, go to the page the user came from.
export function LoginForm({ locale, l, next }: { locale: Locale; l: Dictionary["login"]; next: string }) {
  const router = useRouter();
  return (
    <SignInPanel
      googleFallbackHref={`/api/auth/google/start?next=${encodeURIComponent(next)}&locale=${locale}`}
      l={l}
      locale={locale}
      onSignedIn={() => {
        router.replace(next);
        router.refresh();
      }}
    />
  );
}
