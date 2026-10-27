"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Loads sign-in state in the browser so the pages that show it can stay statically rendered.
export function AccountLink({
  accountHref,
  loginHref,
  signInLabel,
  creditsTemplate,
}: {
  accountHref: string;
  loginHref: string;
  signInLabel: string;
  creditsTemplate: string;
}) {
  const [state, setState] = useState<{ signedIn: boolean; balance?: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      fetch("/api/credits", { cache: "no-store" })
        .then((response) => (response.ok ? response.json() : { signedIn: false }))
        .then((data: { signedIn: boolean; balance?: number }) => { if (!cancelled) setState(data); })
        .catch(() => { if (!cancelled) setState({ signedIn: false }); });
    void load();
    window.addEventListener("focus", load);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", load);
    };
  }, []);

  if (state?.signedIn) {
    return <Link className="header-account" href={accountHref}>{creditsTemplate.replace("{n}", String(state.balance ?? 0))}</Link>;
  }
  return <Link className="header-signin" href={loginHref}>{signInLabel}</Link>;
}
