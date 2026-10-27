import { NextResponse } from "next/server";
import { getSiteOrigin, isSameOriginRequest, safeReturnPath, startSession } from "@/lib/auth";
import { consumeEmailLoginToken } from "@/lib/email-login";
import { findOrCreateUser } from "@/lib/ledger";

export const dynamic = "force-dynamic";

// The emailed link opens /login/verify, which posts here. Using POST means email link scanners
// that pre-open URLs cannot use up the one-time token.
export async function POST(request: Request) {
  const origin = getSiteOrigin(request);
  if (!isSameOriginRequest(request)) return NextResponse.redirect(new URL("/login?error=link_invalid", origin), 303);

  const form = await request.formData();
  const token = String(form.get("token") || "");
  const next = safeReturnPath(String(form.get("next") || ""));
  const loginPath = next.startsWith("/es/") || next === "/es" ? "/es/login" : "/login";

  const email = await consumeEmailLoginToken(token);
  if (!email) return NextResponse.redirect(new URL(`${loginPath}?error=link_invalid`, origin), 303);

  const { user } = await findOrCreateUser({ email });
  await startSession(user.id);
  return NextResponse.redirect(new URL(next, origin), 303);
}
