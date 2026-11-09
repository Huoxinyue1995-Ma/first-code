import { isSameOriginRequest, startSession } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";
import { isValidEmail, verifyEmailLoginCode } from "@/lib/email-login";
import { findOrCreateUser } from "@/lib/ledger";

export const dynamic = "force-dynamic";

// Checks the emailed 6-digit code and signs the user in on this tab.
export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return Response.json({ reason: "invalid_request" }, { status: 403 });
  if (!isDatabaseConfigured()) return Response.json({ reason: "unavailable" }, { status: 503 });

  let email = "";
  let code = "";
  try {
    const body = await request.json() as { email?: unknown; code?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
    code = typeof body.code === "string" ? body.code.replace(/\s+/g, "") : "";
  } catch {
    return Response.json({ reason: "invalid_request" }, { status: 400 });
  }
  if (!isValidEmail(email)) return Response.json({ reason: "invalid_email" }, { status: 400 });

  const check = await verifyEmailLoginCode(email, code);
  if (!check.ok) {
    return Response.json({ reason: check.reason, attemptsLeft: check.attemptsLeft }, { status: check.reason === "wrong" ? 400 : 410 });
  }

  const { user, created } = await findOrCreateUser({ email: check.email });
  await startSession(user.id);
  return Response.json({ ok: true, created });
}
