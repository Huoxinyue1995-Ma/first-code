"use client";

import { useState } from "react";
import type { CreditPackId } from "@/lib/credits";
import type { Locale } from "@/lib/i18n";

export function BuyCreditsButton({
  pack,
  label,
  locale,
  loginHref,
  signInLabel,
}: {
  pack: CreditPackId;
  label: string;
  locale: Locale;
  loginHref: string;
  signInLabel: string;
}) {
  const [loading, setLoading] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buy() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/credits/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack, locale }),
      });
      if (response.status === 401) {
        setNeedsLogin(true);
        setLoading(false);
        return;
      }
      const result = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !result.checkoutUrl) throw new Error(result.error || "Checkout could not be started.");
      window.location.assign(result.checkoutUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout could not be started.");
      setLoading(false);
    }
  }

  if (needsLogin) return <a className="plan-button" href={loginHref}>{signInLabel}</a>;
  return (
    <>
      <button className="plan-button" disabled={loading} onClick={() => void buy()} type="button">
        {loading ? "…" : label}
      </button>
      {error && <p className="auth-error" role="alert">{error}</p>}
    </>
  );
}
