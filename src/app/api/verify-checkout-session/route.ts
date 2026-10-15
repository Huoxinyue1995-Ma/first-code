import { getStripe, isBatchPaymentConfirmed, isBatchSession, isCheckoutSessionId } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId || !isCheckoutSessionId(sessionId)) {
    return Response.json({ error: "Invalid checkout session." }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return Response.json({ error: "Payments are not live yet." }, { status: 503 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!isBatchSession(session)) return Response.json({ paid: false, redeemed: false });
    return Response.json({
      paid: isBatchPaymentConfirmed(session),
      redeemed: Boolean(session.metadata?.batch_redeemed_at),
    });
  } catch {
    return Response.json({ error: "Payment could not be confirmed." }, { status: 500 });
  }
}
