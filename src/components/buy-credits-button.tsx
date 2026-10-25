"use client";

import { useState } from "react";
import type { CreditPackId } from "@/lib/credits";

export function BuyCreditsButton({ pack, label }: { pack: CreditPackId; label: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buy() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/credits/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack }),
      });
      const result = await response.json() as { checkoutUrl?: string; error?: string };
      if (!response.ok || !result.checkoutUrl) throw new Error(result.error || "Checkout could not be started.");
      window.location.assign(result.checkoutUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout could not be started.");
      setLoading(false);
    }
  }

  return (
    <>
      <button className="plan-button" disabled={loading} onClick={() => void buy()} type="button">
        {loading ? "Opening checkout..." : label}
      </button>
      {error && <p className="auth-error" role="alert">{error}</p>}
    </>
  );
}
