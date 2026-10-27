// Credit packs and pricing rules. Change prices here only.
export type CreditPackId = "starter" | "seller" | "studio";

export type CreditPack = { id: CreditPackId; name: string; credits: number; priceCents: number; featured?: boolean };

export const CREDIT_PACKS: Record<CreditPackId, CreditPack> = {
  starter: { id: "starter", name: "Starter", credits: 100, priceCents: 500 },
  seller: { id: "seller", name: "Seller", credits: 300, priceCents: 1200, featured: true },
  studio: { id: "studio", name: "Studio", credits: 1000, priceCents: 2500 },
};

export const SIGNUP_BONUS_CREDITS = 3;

// One credit per source photo downloaded, regardless of how many sizes it is exported in.
export const CREDITS_PER_PHOTO = 1;

export const MAX_BATCH_PHOTOS = 100;
export const MAX_FILE_MB = 25;

export const CREDIT_PACK_PRODUCT = "image_ready_credit_pack";

export function isCreditPackId(value: unknown): value is CreditPackId {
  return value === "starter" || value === "seller" || value === "studio";
}

export function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

// Price of one photo in a pack, shown to 3 decimals so packs compare cleanly ($0.050, $0.040, $0.025).
export function pricePerPhoto(pack: CreditPack) {
  return `$${(pack.priceCents / pack.credits / 100).toFixed(3)}`;
}
