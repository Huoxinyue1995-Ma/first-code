import Stripe from "stripe";
import { fulfillCreditPurchase, isCreditPackSession } from "@/lib/credit-fulfillment";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!stripe || !webhookSecret) {
    return Response.json({ error: "Webhook is not configured." }, { status: 503 });
  }
  if (!signature) {
    return Response.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch {
    return Response.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      if (isCreditPackSession(checkoutSession)) await fulfillCreditPurchase(checkoutSession);
    }
  } catch (error) {
    console.error("Stripe webhook processing failed.", {
      eventId: event.id,
      eventType: event.type,
      message: error instanceof Error ? error.message : String(error),
    });
    return Response.json({ error: "Stripe event could not be processed." }, { status: 500 });
  }

  return Response.json({ received: true });
}
