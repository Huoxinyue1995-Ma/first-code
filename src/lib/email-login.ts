import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { getSql } from "@/lib/db";
import type { Locale } from "@/lib/i18n";
import { normalizeEmail } from "@/lib/ledger";

// Email sign-in with a 6-digit code typed on the same page, so the user never leaves the tab with their photos.
export const CODE_MINUTES = 10;
const MAX_CODES_PER_HOUR = 5;
export const MAX_CODE_ATTEMPTS = 5;

export function isEmailLoginConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

// Deliberately simple: one "@", a dot in the domain, no spaces, sane length.
export function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isCodeFormat(value: string) {
  return /^\d{6}$/.test(value);
}

export class EmailRateLimitError extends Error {}

// Creates the codes table on first use, so a deploy never depends on a manual migration step.
// Same statements as db/schema.sql; idempotent, and runs at most once per server instance.
let tableReady: Promise<unknown> | null = null;
function ensureCodesTable() {
  tableReady ??= getSql().begin(async (tx) => {
    await tx`create table if not exists email_login_codes (
      id bigserial primary key,
      email text not null,
      code_hash text not null,
      attempts integer not null default 0,
      created_at timestamptz not null default now(),
      expires_at timestamptz not null,
      used_at timestamptz
    )`;
    await tx`create index if not exists email_login_codes_email_idx on email_login_codes(email, created_at desc)`;
  }).catch((error) => {
    tableReady = null;
    throw error;
  });
  return tableReady;
}

// The hash includes the email so a stored hash cannot be reused for another address.
function hashCode(email: string, code: string) {
  return createHash("sha256").update(`${email}:${code}`).digest("base64url");
}

function randomCode() {
  // Uniform 000000-999999: reject the top of the 32-bit range so every code is equally likely.
  const buffer = new Uint32Array(1);
  const limit = Math.floor(0x1_0000_0000 / 1_000_000) * 1_000_000;
  do crypto.getRandomValues(buffer);
  while (buffer[0] >= limit);
  return String(buffer[0] % 1_000_000).padStart(6, "0");
}

export async function createEmailLoginCode(rawEmail: string) {
  const email = normalizeEmail(rawEmail);
  await ensureCodesTable();
  const sql = getSql();

  const recent = await sql<{ count: number }[]>`
    select count(*)::int as count from email_login_codes
    where email = ${email} and created_at > now() - interval '1 hour'`;
  if ((recent[0]?.count ?? 0) >= MAX_CODES_PER_HOUR) throw new EmailRateLimitError();

  const code = randomCode();
  const expiresAt = new Date(Date.now() + CODE_MINUTES * 60 * 1000);
  // A new code replaces any earlier one for this email.
  await sql.begin(async (tx) => {
    await tx`update email_login_codes set used_at = now() where email = ${email} and used_at is null`;
    await tx`insert into email_login_codes (email, code_hash, expires_at) values (${email}, ${hashCode(email, code)}, ${expiresAt})`;
  });
  return { email, code };
}

export type CodeCheck =
  | { ok: true; email: string }
  | { ok: false; reason: "expired" | "locked" | "wrong"; attemptsLeft?: number };

// Checks the latest active code for the email. Each wrong guess counts; the code locks after MAX_CODE_ATTEMPTS.
export async function verifyEmailLoginCode(rawEmail: string, code: string): Promise<CodeCheck> {
  const email = normalizeEmail(rawEmail);
  if (!isCodeFormat(code)) return { ok: false, reason: "wrong" };
  await ensureCodesTable();
  const sql = getSql();

  return sql.begin(async (tx) => {
    const rows = await tx<{ id: string; code_hash: string; attempts: number }[]>`
      select id, code_hash, attempts from email_login_codes
      where email = ${email} and used_at is null and expires_at > now()
      order by created_at desc limit 1 for update`;
    const row = rows[0];
    if (!row) return { ok: false, reason: "expired" } as const;
    if (row.attempts >= MAX_CODE_ATTEMPTS) return { ok: false, reason: "locked" } as const;

    const expected = Buffer.from(row.code_hash);
    const actual = Buffer.from(hashCode(email, code));
    if (expected.length === actual.length && timingSafeEqual(expected, actual)) {
      await tx`update email_login_codes set used_at = now() where id = ${row.id}`;
      return { ok: true, email } as const;
    }

    const attempts = row.attempts + 1;
    await tx`update email_login_codes set attempts = ${attempts} where id = ${row.id}`;
    const attemptsLeft = MAX_CODE_ATTEMPTS - attempts;
    return attemptsLeft > 0 ? { ok: false, reason: "wrong", attemptsLeft } as const : { ok: false, reason: "locked" } as const;
  });
}

const EMAIL_COPY: Record<Locale, { subject: (code: string) => string; intro: string; footer: string }> = {
  en: {
    subject: (code) => `${code} is your Resizet code`,
    intro: "Enter this code on Resizet to sign in:",
    footer: `The code expires in ${CODE_MINUTES} minutes. If you did not request it, you can ignore this email.`,
  },
  es: {
    subject: (code) => `${code} es tu código de Resizet`,
    intro: "Escribe este código en Resizet para iniciar sesión:",
    footer: `El código caduca en ${CODE_MINUTES} minutos. Si no lo solicitaste, puedes ignorar este correo.`,
  },
};

export async function sendLoginCodeEmail(to: string, code: string, locale: Locale = "en") {
  if (!isEmailLoginConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without an email provider: print the code instead of sending it.
      console.info(`[dev] Sign-in code for ${to}: ${code}`);
      return;
    }
    throw new Error("Email sign-in is not configured.");
  }

  const copy = EMAIL_COPY[locale];
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [to],
      subject: copy.subject(code),
      text: `${copy.intro}\n\n${code}\n\n${copy.footer}`,
      html: `<p>${copy.intro}</p><p style="font-size:28px;font-weight:700;letter-spacing:6px;margin:16px 0">${code}</p><p>${copy.footer}</p>`,
    }),
  });
  if (!response.ok) {
    // Resend error bodies are short JSON like {"name":"validation_error","message":"..."}; they never contain the API key.
    const detail = (await response.text().catch(() => "")).slice(0, 300);
    throw new Error(`Resend request failed (${response.status}): ${detail}`);
  }
}
