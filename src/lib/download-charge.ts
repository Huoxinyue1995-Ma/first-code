import "server-only";
import { CREDITS_PER_PHOTO, MAX_BATCH_PHOTOS } from "@/lib/credits";
import { getSql } from "@/lib/db";
import { InsufficientCreditsError, spendCredits } from "@/lib/ledger";

export { InsufficientCreditsError };

// A photo is identified by a fingerprint the browser computes from the file (a hash of its bytes).
// We never receive the photo itself. Once a photo is paid for, re-downloading it in other sizes within
// the paid window is free, so a user is never charged twice for the same photo.
const PAID_WINDOW_HOURS = 24;

export function isFingerprint(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

export async function chargeForDownload(userId: string, fingerprints: string[], detail: { sizes: number }) {
  const unique = Array.from(new Set(fingerprints)).slice(0, MAX_BATCH_PHOTOS);
  const sql = getSql();

  const alreadyPaid = await sql<{ fingerprint: string }[]>`
    select fingerprint from paid_photos
    where user_id = ${userId} and fingerprint = any(${unique}) and paid_at > now() - make_interval(hours => ${PAID_WINDOW_HOURS})`;
  const paidSet = new Set(alreadyPaid.map((row) => row.fingerprint));
  const toCharge = unique.filter((fingerprint) => !paidSet.has(fingerprint));

  if (toCharge.length === 0) {
    const balance = await sql<{ credit_balance: number }[]>`select credit_balance from users where id = ${userId}`;
    return { charged: 0, alreadyPaid: unique.length, balanceAfter: balance[0]?.credit_balance ?? 0 };
  }

  const jobId = `dl_${crypto.randomUUID()}`;
  const cost = toCharge.length * CREDITS_PER_PHOTO;
  const result = await spendCredits(userId, cost, jobId, { photos: toCharge.length, sizes: detail.sizes, skipped_paid: paidSet.size });
  if (!result) throw new Error("Download id collision; please retry.");

  await sql`
    insert into paid_photos (user_id, fingerprint, job_id)
    select ${userId}, unnest(${toCharge}::text[]), ${jobId}
    on conflict (user_id, fingerprint) do update set paid_at = now(), job_id = excluded.job_id`;

  return { charged: cost, alreadyPaid: paidSet.size, balanceAfter: result.balanceAfter };
}
