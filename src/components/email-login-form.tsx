"use client";

import { FormEvent, useState } from "react";

export function EmailLoginForm({ next }: { next: string }) {
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
        body: JSON.stringify({ email, next }),
      });
      const result = await response.json() as { sent?: boolean; error?: string };
      if (!response.ok || !result.sent) throw new Error(result.error || "We could not send the email.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not send the email.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="auth-sent" role="status">
        <strong>Check your inbox</strong>
        <p>We sent a sign-in link to {email}. It expires in 15 minutes.</p>
        <button className="text-button" onClick={() => setStatus("idle")} type="button">Use a different email</button>
      </div>
    );
  }

  return (
    <form className="email-form" onSubmit={submit}>
      <label htmlFor="login-email">Email address</label>
      <input
        autoComplete="email"
        id="login-email"
        inputMode="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        required
        type="email"
        value={email}
      />
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button className="plan-button" disabled={status === "sending"} type="submit">
        {status === "sending" ? "Sending link..." : "Email me a sign-in link"}
      </button>
    </form>
  );
}
