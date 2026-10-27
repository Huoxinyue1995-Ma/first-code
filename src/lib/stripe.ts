import Stripe from "stripe";

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  return new Stripe(secretKey);
}

export function getSiteUrl(request: Request) {
  const requestOrigin = request.headers.get("origin");
  if (requestOrigin) {
    try {
      const url = new URL(requestOrigin);
      if (url.protocol === "https:" && url.hostname === "www.opensourcephotoeditor.com") {
        return url.origin;
      }
    } catch {
      // Fall back to the configured deployment URL for malformed Origins.
    }
  }

  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredUrl) return configuredUrl.replace(/\/$/, "");
  return new URL(request.url).origin;
}

export function isCheckoutSessionId(value: string | null) {
  return Boolean(value && /^cs_[A-Za-z0-9_]{10,255}$/.test(value));
}

// Production only accepts live payments; preview deployments (test keys) only accept test payments.
// This keeps Stripe test purchases from ever adding credits to real accounts.
export function isAcceptedPaymentMode(session: Stripe.Checkout.Session) {
  const isProduction = process.env.VERCEL_ENV === "production";
  return isProduction ? session.livemode === true : true;
}
