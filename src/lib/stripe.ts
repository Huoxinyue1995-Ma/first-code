import Stripe from "stripe";

export const BATCH_PRICE_CENTS = 399;
export const BATCH_MAX_IMAGES = 10;
export const BATCH_PRODUCT = "image_ready_batch_zip";

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  return new Stripe(secretKey);
}

export function getSiteUrl(request: Request) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredUrl) return configuredUrl.replace(/\/$/, "");
  return new URL(request.url).origin;
}

export function isBatchCheckoutSession(session: Stripe.Checkout.Session) {
  return (
    session.mode === "payment" &&
    session.currency === "usd" &&
    session.amount_total === BATCH_PRICE_CENTS &&
    session.metadata?.product === BATCH_PRODUCT
  );
}

export function isBatchSession(session: Stripe.Checkout.Session) {
  return isBatchCheckoutSession(session) && session.payment_status === "paid";
}

export function isBatchPaymentConfirmed(session: Stripe.Checkout.Session) {
  return Boolean(session.metadata?.batch_payment_confirmed_at);
}

export function isCheckoutSessionId(value: string | null) {
  return Boolean(value && /^cs_[A-Za-z0-9_]{10,255}$/.test(value));
}
