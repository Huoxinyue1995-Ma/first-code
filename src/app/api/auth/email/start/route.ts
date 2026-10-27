import { getSiteOrigin, isSameOriginRequest, safeReturnPath } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";
import { isLocale } from "@/lib/i18n";
import { EmailRateLimitError, createEmailLoginLink, isValidEmail, sendLoginEmail } from "@/lib/email-login";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return Response.json({ error: "Invalid request." }, { status: 403 });
  if (!isDatabaseConfigured()) return Response.json({ error: "Sign-in is not available yet." }, { status: 503 });

  let email = "";
  let next = "/account";
  let locale: "en" | "es" = "en";
  try {
    const body = await request.json() as { email?: unknown; next?: unknown; locale?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
    locale = isLocale(body.locale) ? body.locale : "en";
    next = safeReturnPath(typeof body.next === "string" ? body.next : null, locale);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!isValidEmail(email)) return Response.json({ error: "Please enter a valid email address." }, { status: 400 });

  try {
    const link = await createEmailLoginLink(email, getSiteOrigin(request), next, locale);
    await sendLoginEmail(link.email, link.url, locale);
  } catch (error) {
    if (error instanceof EmailRateLimitError) {
      return Response.json({ error: "Too many sign-in emails. Please wait an hour and try again." }, { status: 429 });
    }
    console.error("Email sign-in link failed.", { errorType: error instanceof Error ? error.message : typeof error });
    return Response.json({ error: "We could not send the email. Please try again." }, { status: 500 });
  }

  return Response.json({ sent: true });
}
