import { NextResponse, type NextRequest } from "next/server";
import { OAUTH_STATE_COOKIE, RETURN_TO_COOKIE, getSiteOrigin, safeReturnPath, startSession } from "@/lib/auth";
import { fetchGoogleProfile } from "@/lib/google-oauth";
import { findOrCreateUser } from "@/lib/ledger";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = getSiteOrigin(request);
  const params = request.nextUrl.searchParams;
  const expectedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value;
  const returnTo = safeReturnPath(request.cookies.get(RETURN_TO_COOKIE)?.value);

  const fail = (reason: string) => {
    const response = NextResponse.redirect(new URL(`/login?error=${reason}`, origin));
    response.cookies.delete(OAUTH_STATE_COOKIE);
    response.cookies.delete(RETURN_TO_COOKIE);
    return response;
  };

  if (params.get("error")) return fail("google_cancelled");
  const code = params.get("code");
  const state = params.get("state");
  if (!code || !state || !expectedState || state !== expectedState) return fail("google_state");

  try {
    const profile = await fetchGoogleProfile(origin, code);
    const { user } = await findOrCreateUser({ email: profile.email, name: profile.name, googleSub: profile.sub });
    await startSession(user.id);
  } catch (error) {
    console.error("Google sign-in failed.", { errorType: error instanceof Error ? error.message : typeof error });
    return fail("google_failed");
  }

  const response = NextResponse.redirect(new URL(returnTo, origin));
  response.cookies.delete(OAUTH_STATE_COOKIE);
  response.cookies.delete(RETURN_TO_COOKIE);
  return response;
}
