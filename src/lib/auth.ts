import "server-only";
import { cookies } from "next/headers";
import { getSql, isDatabaseConfigured } from "@/lib/db";
import { getUserById, type User } from "@/lib/ledger";

export const SESSION_COOKIE = "ir_session";
const SESSION_DAYS = 30;
export const OAUTH_STATE_COOKIE = "ir_oauth_state";
export const RETURN_TO_COOKIE = "ir_return_to";

function toBase64Url(bytes: Uint8Array) {
  return Buffer.from(bytes).toString("base64url");
}

export function randomToken(bytes = 32) {
  return toBase64Url(crypto.getRandomValues(new Uint8Array(bytes)));
}

export async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return toBase64Url(new Uint8Array(digest));
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function cookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

// Creates a session row and sets the login cookie. Call only from Route Handlers or Server Functions.
export async function startSession(userId: string) {
  const token = randomToken();
  const sql = getSql();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await sql`insert into sessions (token_hash, user_id, expires_at) values (${await sha256(token)}, ${userId}, ${expiresAt})`;
  const store = await cookies();
  store.set(SESSION_COOKIE, token, cookieOptions(SESSION_DAYS * 24 * 60 * 60));
}

export async function endSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token && isDatabaseConfigured()) {
    const sql = getSql();
    await sql`delete from sessions where token_hash = ${await sha256(token)}`;
  }
  store.delete(SESSION_COOKIE);
}

// Returns the signed-in user, or null. Safe to call from Server Components.
export async function getCurrentUser(): Promise<User | null> {
  if (!isDatabaseConfigured()) return null;
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token || token.length > 128) return null;

  const sql = getSql();
  const rows = await sql<{ user_id: string }[]>`
    select user_id from sessions where token_hash = ${await sha256(token)} and expires_at > now()`;
  if (!rows[0]) return null;
  return getUserById(rows[0].user_id);
}

// Only allow returning to a path on this site, never to another origin.
export function safeReturnPath(value: string | null | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return "/account";
  return value.slice(0, 512);
}

export function getSiteOrigin(request: Request) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (process.env.NODE_ENV === "production" && configured) return configured;
  return new URL(request.url).origin;
}

// Rejects state-changing requests that come from other websites.
export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}
