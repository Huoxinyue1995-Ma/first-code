import "server-only";
import type Stripe from "stripe";
import { CREDIT_PACKS, CREDIT_PACK_PRODUCT, isCreditPackId } from "@/lib/credits";
import { grantPurchasedCredits } from "@/lib/ledger";

export function isCreditPackSession(session: Stripe.Checkout.Session) {
  return session.metadata?.product === CREDIT_PACK_PRODUCT;
}

// Credits a paid Checkout Session exactly once. Safe to call from both the webhook and the success page.
export async function fulfillCreditPurchase(session: Stripe.Checkout.Session) {
  if (!isCreditPackSession(session) || session.payment_status !== "paid") return { fulfilled: false as const };

  const packId = session.metadata?.pack;
  const userId = session.metadata?.user_id;
  if (!isCreditPackId(packId) || !userId) throw new Error("Credit session metadata is incomplete.");

  const pack = CREDIT_PACKS[packId];
  // Never trust metadata alone: the amount actually charged must match the pack price.
  if (session.currency !== "usd" || session.amount_total !== pack.priceCents) {
    throw new Error("Credit session amount does not match the pack price.");
  }

  const result = await grantPurchasedCredits(userId, pack.credits, session.id, {
    pack: pack.id,
    amount_cents: session.amount_total,
  });
  return { fulfilled: true as const, alreadyApplied: result === null };
}
