import { getStripe, isBatchSession, isCheckoutSessionId } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let sessionId: string | null = null;
  try {
    const body = await request.json() as { sessionId?: unknown };
    sessionId = typeof body.sessionId === "string" ? body.sessionId : null;
  } catch {
    return Response.json({ error: "Invalid checkout session." }, { status: 400 });
  }

  if (!sessionId || !isCheckoutSessionId(sessionId)) {
    return Response.json({ error: "Invalid checkout session." }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return Response.json({ error: "Payments are not live yet." }, { status: 503 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!isBatchSession(session)) {
      return Response.json({ error: "This payment has not completed." }, { status: 402 });
    }
    if (session.metadata?.batch_redeemed_at) {
      return Response.json({ error: "This batch purchase has already been used." }, { status: 409 });
    }

    await stripe.checkout.sessions.update(sessionId, {
      metadata: {
        ...session.metadata,
        batch_redeemed_at: new Date().toISOString(),
      },
    });
    return Response.json({ redeemed: true });
  } catch {
    return Response.json({ error: "Your purchase could not be redeemed. Please try again." }, { status: 500 });
  }
}
