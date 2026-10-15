import { BATCH_MAX_IMAGES, BATCH_PRICE_CENTS, BATCH_PRODUCT, getSiteUrl, getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getIntegrationIdentifier() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const suffix = Array.from(crypto.getRandomValues(new Uint8Array(8)), (value) => alphabet[value % alphabet.length]).join("");
  return `image_ready_checkout_${suffix}`;
}

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return Response.json({ error: "Payments are not live yet. Please try again soon." }, { status: 503 });
  }

  try {
    const siteUrl = getSiteUrl(request);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      integration_identifier: getIntegrationIdentifier(),
      managed_payments: { enabled: false },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: BATCH_PRICE_CENTS,
            product_data: {
              name: "Image Ready batch download",
              description: `One ZIP download for up to ${BATCH_MAX_IMAGES} processed images`,
            },
          },
        },
      ],
      metadata: {
        product: BATCH_PRODUCT,
        max_images: String(BATCH_MAX_IMAGES),
      },
      success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/payment/cancelled`,
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return Response.json({ checkoutUrl: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Stripe Checkout session creation failed.", {
      errorType: error instanceof Error ? error.name : typeof error,
    });
    return Response.json({ error: "Checkout could not be started. Please try again." }, { status: 500 });
  }
}
