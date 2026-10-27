import { NextResponse, type NextRequest } from "next/server";
import { LOGIN_LOCALE_COOKIE, OAUTH_STATE_COOKIE, RETURN_TO_COOKIE, cookieOptions, getSiteOrigin, randomToken, safeReturnPath } from "@/lib/auth";
import { googleAuthorizeUrl, isGoogleConfigured } from "@/lib/google-oauth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = getSiteOrigin(request);
  const locale = request.nextUrl.searchParams.get("locale") === "es" ? "es" : "en";
  if (!isGoogleConfigured()) {
    return NextResponse.redirect(new URL(`${locale === "es" ? "/es" : ""}/login?error=google_unavailable`, origin));
  }

  const state = randomToken(24);
  const response = NextResponse.redirect(googleAuthorizeUrl(origin, state));
  response.cookies.set(OAUTH_STATE_COOKIE, state, cookieOptions(10 * 60));
  response.cookies.set(RETURN_TO_COOKIE, safeReturnPath(request.nextUrl.searchParams.get("next"), locale), cookieOptions(10 * 60));
  response.cookies.set(LOGIN_LOCALE_COOKIE, locale, cookieOptions(10 * 60));
  return response;
}
