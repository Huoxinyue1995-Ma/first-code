import { NextResponse, type NextRequest } from "next/server";
import { GOOGLE_NONCE_COOKIE, isSameOriginRequest, startSession } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";
import { verifyGoogleIdToken } from "@/lib/google-id-token";
import { isGoogleConfigured } from "@/lib/google-oauth";
import { findOrCreateUser } from "@/lib/ledger";

export const dynamic = "force-dynamic";

// Signs in with an ID token from the Sign in with Google button (popup) or One Tap, without leaving the page.
export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) return Response.json({ reason: "invalid_request" }, { status: 403 });
  if (!isGoogleConfigured() || !isDatabaseConfigured()) return Response.json({ reason: "unavailable" }, { status: 503 });

  const nonce = request.cookies.get(GOOGLE_NONCE_COOKIE)?.value ?? "";
  let credential = "";
  try {
    const body = await request.json() as { credential?: unknown };
    credential = typeof body.credential === "string" ? body.credential : "";
  } catch {
    return Response.json({ reason: "invalid_request" }, { status: 400 });
  }
  if (!credential || credential.length > 4096 || !nonce) return Response.json({ reason: "invalid_request" }, { status: 400 });

  try {
    const profile = await verifyGoogleIdToken(credential, { clientId: process.env.GOOGLE_CLIENT_ID!, nonce });
    const { user, created } = await findOrCreateUser({ email: profile.email, name: profile.name, googleSub: profile.sub });
    await startSession(user.id);
    const response = NextResponse.json({ ok: true, created });
    response.cookies.delete(GOOGLE_NONCE_COOKIE);
    return response;
  } catch (error) {
    console.error("Google ID token sign-in failed.", { errorType: error instanceof Error ? error.message : typeof error });
    const response = NextResponse.json({ reason: "google_failed" }, { status: 401 });
    response.cookies.delete(GOOGLE_NONCE_COOKIE);
    return response;
  }
}
