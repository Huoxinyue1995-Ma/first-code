import { getCurrentUser, isSameOriginRequest } from "@/lib/auth";
import { CREDIT_PACKS, CREDIT_PACK_PRODUCT, isCreditPackId } from "@/lib/credits";
import { getSiteUrl, getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return Response.json({ error: "Invalid request." }, { status: 403 });

  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Please sign in first." }, { status: 401 });

  const stripe = getStripe();
  if (!stripe) return Response.json({ error: "Payments are not live yet. Please try again soon." }, { status: 503 });

  let packId: unknown;
  try {
    packId = ((await request.json()) as { pack?: unknown }).pack;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!isCreditPackId(packId)) return Response.json({ error: "Unknown credit pack." }, { status: 400 });
  const pack = CREDIT_PACKS[packId];

  try {
    const siteUrl = getSiteUrl(request);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Match the working batch checkout: this account charges directly, not through Stripe Managed Payments.
      managed_payments: { enabled: false },
      integration_identifier: "image_ready_credit_pack",
      customer_email: user.email,
      client_reference_id: user.id,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: pack.priceCents,
            product_data: {
              name: `Image Ready ${pack.name} credits`,
              description: `${pack.credits} credits for AI image tools. Credits do not expire.`,
            },
          },
        },
      ],
      metadata: {
        product: CREDIT_PACK_PRODUCT,
        user_id: user.id,
        pack: pack.id,
        credits: String(pack.credits),
      },
      success_url: `${siteUrl}/account?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/account?purchase=cancelled`,
    });
    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return Response.json({ checkoutUrl: session.url });
  } catch (error) {
    // Stripe error messages describe the bad parameter and never include the secret key.
    const stripeError = error as { type?: string; code?: string; param?: string; message?: string };
    console.error("Credit checkout creation failed.", {
      type: stripeError.type,
      code: stripeError.code,
      param: stripeError.param,
      message: stripeError.message?.slice(0, 300),
    });
    return Response.json({ error: "Checkout could not be started. Please try again." }, { status: 500 });
  }
}
