"use client";

import { FormEvent, useState } from "react";
import type { Locale } from "@/lib/i18n";

type Labels = {
  email: string; placeholder: string; send: string; sending: string;
  checkInbox: string; sentTo: string; useDifferent: string; failed: string;
};

export function EmailLoginForm({ next, locale, labels }: { next: string; locale: Locale; labels: Labels }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const response = await fetch("/api/auth/email/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, next, locale }),
      });
      const result = (await response.json()) as { sent?: boolean; error?: string };
      if (!response.ok || !result.sent) throw new Error(result.error || labels.failed);
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : labels.failed);
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="auth-sent" role="status">
        <strong>{labels.checkInbox}</strong>
        <p>{labels.sentTo.replace("{email}", email)}</p>
        <button className="text-button" onClick={() => setStatus("idle")} type="button">{labels.useDifferent}</button>
      </div>
    );
  }

  return (
    <form className="email-form" onSubmit={submit}>
      <label htmlFor="login-email">{labels.email}</label>
      <input autoComplete="email" id="login-email" inputMode="email" onChange={(ev) => setEmail(ev.target.value)} placeholder={labels.placeholder} required type="email" value={email} />
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button className="plan-button" disabled={status === "sending"} type="submit">{status === "sending" ? labels.sending : labels.send}</button>
    </form>
  );
}
