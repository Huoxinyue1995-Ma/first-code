import { isSameOriginRequest } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";
import { isLocale } from "@/lib/i18n";
import { EmailRateLimitError, createEmailLoginCode, isValidEmail, sendLoginCodeEmail } from "@/lib/email-login";

export const dynamic = "force-dynamic";

// Emails a 6-digit sign-in code. Errors carry a `reason` the browser translates.
export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return Response.json({ reason: "invalid_request" }, { status: 403 });
  if (!isDatabaseConfigured()) return Response.json({ reason: "unavailable" }, { status: 503 });

  let email = "";
  let locale: "en" | "es" = "en";
  try {
    const body = await request.json() as { email?: unknown; locale?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
    locale = isLocale(body.locale) ? body.locale : "en";
  } catch {
    return Response.json({ reason: "invalid_request" }, { status: 400 });
  }
  if (!isValidEmail(email)) return Response.json({ reason: "invalid_email" }, { status: 400 });

  try {
    const { email: normalized, code } = await createEmailLoginCode(email);
    await sendLoginCodeEmail(normalized, code, locale);
  } catch (error) {
    if (error instanceof EmailRateLimitError) return Response.json({ reason: "rate_limited" }, { status: 429 });
    console.error("Email sign-in code failed.", { errorType: error instanceof Error ? error.message : typeof error });
    return Response.json({ reason: "send_failed" }, { status: 500 });
  }

  return Response.json({ sent: true });
}
