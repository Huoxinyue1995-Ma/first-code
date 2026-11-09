import { NextResponse } from "next/server";
import { GOOGLE_NONCE_COOKIE, cookieOptions, isSameOriginRequest, randomToken } from "@/lib/auth";
import { isGoogleConfigured } from "@/lib/google-oauth";

export const dynamic = "force-dynamic";

// Gives the browser a fresh nonce for Google Identity Services. The same value is kept in an HttpOnly cookie,
// and /api/auth/google/token only accepts an ID token that carries it.
export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return Response.json({ reason: "invalid_request" }, { status: 403 });
  if (!isGoogleConfigured()) return Response.json({ reason: "unavailable" }, { status: 503 });
  const nonce = randomToken(24);
  const response = NextResponse.json({ nonce, clientId: process.env.GOOGLE_CLIENT_ID }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(GOOGLE_NONCE_COOKIE, nonce, cookieOptions(10 * 60));
  return response;
}
