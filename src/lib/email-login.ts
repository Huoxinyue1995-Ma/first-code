import "server-only";
import { getSql } from "@/lib/db";
import { randomToken, sha256 } from "@/lib/auth";
import { normalizeEmail } from "@/lib/ledger";

const LINK_MINUTES = 15;
const MAX_LINKS_PER_HOUR = 5;

export function isEmailLoginConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

// Deliberately simple: one "@", a dot in the domain, no spaces, sane length.
export function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export class EmailRateLimitError extends Error {}

export async function createEmailLoginLink(rawEmail: string, origin: string, returnTo: string) {
  const email = normalizeEmail(rawEmail);
  const sql = getSql();

  const recent = await sql<{ count: number }[]>`
    select count(*)::int as count from email_login_tokens
    where email = ${email} and created_at > now() - interval '1 hour'`;
  if ((recent[0]?.count ?? 0) >= MAX_LINKS_PER_HOUR) throw new EmailRateLimitError();

  const token = randomToken();
  const expiresAt = new Date(Date.now() + LINK_MINUTES * 60 * 1000);
  await sql`insert into email_login_tokens (token_hash, email, expires_at) values (${await sha256(token)}, ${email}, ${expiresAt})`;

  const url = new URL("/login/verify", origin);
  url.searchParams.set("token", token);
  url.searchParams.set("next", returnTo);
  return { email, url: url.toString() };
}

// Marks the link as used and returns its email. Returns null when the link is unknown, expired, or already used.
export async function consumeEmailLoginToken(token: string) {
  if (!token || token.length > 128) return null;
  const sql = getSql();
  const rows = await sql<{ email: string }[]>`
    update email_login_tokens set used_at = now()
    where token_hash = ${await sha256(token)} and used_at is null and expires_at > now()
    returning email`;
  return rows[0]?.email ?? null;
}

export async function sendLoginEmail(to: string, url: string) {
  if (!isEmailLoginConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without an email provider: print the link instead of sending it.
      console.info(`[dev] Sign-in link for ${to}: ${url}`);
      return;
    }
    throw new Error("Email sign-in is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [to],
      subject: "Your Image Ready sign-in link",
      text: `Sign in to Image Ready:\n\n${url}\n\nThis link expires in ${LINK_MINUTES} minutes and can be used once. If you did not request it, you can ignore this email.`,
      html: `<p>Sign in to Image Ready:</p><p><a href="${url}">Sign in</a></p><p>This link expires in ${LINK_MINUTES} minutes and can be used once. If you did not request it, you can ignore this email.</p>`,
    }),
  });
  if (!response.ok) {
    // Resend error bodies are short JSON like {"name":"validation_error","message":"..."}; they never contain the API key.
    const detail = (await response.text().catch(() => "")).slice(0, 300);
    throw new Error(`Resend request failed (${response.status}): ${detail}`);
  }
}
