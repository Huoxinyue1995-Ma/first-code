// Credit packs and per-feature costs. Change prices here only.
export type CreditPackId = "starter" | "pro";

export const CREDIT_PACKS: Record<CreditPackId, { id: CreditPackId; name: string; credits: number; priceCents: number }> = {
  starter: { id: "starter", name: "Starter", credits: 50, priceCents: 500 },
  pro: { id: "pro", name: "Pro", credits: 165, priceCents: 1500 },
};

export const SIGNUP_BONUS_CREDITS = 3;

export type CreditFeature = "white_background" | "scene";

export const FEATURE_COSTS: Record<CreditFeature, number> = {
  white_background: 1,
  scene: 2,
};

export const CREDIT_PACK_PRODUCT = "image_ready_credit_pack";

export function isCreditPackId(value: unknown): value is CreditPackId {
  return value === "starter" || value === "pro";
}

export function isCreditFeature(value: unknown): value is CreditFeature {
  return value === "white_background" || value === "scene";
}

export function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}
