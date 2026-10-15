import Stripe from "stripe";
import { getStripe, isBatchCheckoutSession } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getWebhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET;
}

async function updateBatchPaymentStatus(
  stripe: Stripe,
  checkoutSession: Stripe.Checkout.Session,
  status: "paid" | "failed",
) {
  if (!isBatchCheckoutSession(checkoutSession)) return;

  const currentSession = await stripe.checkout.sessions.retrieve(checkoutSession.id);
  if (!isBatchCheckoutSession(currentSession)) return;

  const metadata = currentSession.metadata || {};
  const marker = status === "paid" ? "batch_payment_confirmed_at" : "batch_payment_failed_at";
  if (metadata[marker]) return;

  await stripe.checkout.sessions.update(currentSession.id, {
    metadata: {
      ...metadata,
      [marker]: new Date().toISOString(),
    },
  });
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = getWebhookSecret();
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
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        if (checkoutSession.payment_status === "paid") {
          await updateBatchPaymentStatus(stripe, checkoutSession, "paid");
        }
        break;
      case "checkout.session.async_payment_failed":
        await updateBatchPaymentStatus(stripe, checkoutSession, "failed");
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("Stripe webhook processing failed.", {
      eventId: event.id,
      eventType: event.type,
      errorType: error instanceof Error ? error.name : typeof error,
    });
    return Response.json({ error: "Stripe event could not be processed." }, { status: 500 });
  }

  return Response.json({ received: true });
}
