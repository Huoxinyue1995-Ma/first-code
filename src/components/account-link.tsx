"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Loads sign-in state in the browser so pages that link here can stay statically rendered.
export function AccountLink() {
  const [state, setState] = useState<{ signedIn: boolean; balance?: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/credits", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { signedIn: false }))
      .then((data: { signedIn: boolean; balance?: number }) => { if (!cancelled) setState(data); })
      .catch(() => { if (!cancelled) setState({ signedIn: false }); });
    return () => { cancelled = true; };
  }, []);

  if (state?.signedIn) {
    return <Link className="header-account" href="/account">{state.balance} credits</Link>;
  }
  return <Link href="/login">Sign in</Link>;
}
