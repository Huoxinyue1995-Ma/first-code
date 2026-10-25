import "server-only";
import { FEATURE_COSTS, type CreditFeature } from "@/lib/credits";
import { InsufficientCreditsError, refundCredits, spendCredits } from "@/lib/ledger";

export { InsufficientCreditsError };

/**
 * Runs a paid AI job for a signed-in user:
 * 1. charges the feature's credits up front (fails with InsufficientCreditsError if the balance is too low),
 * 2. runs `work`,
 * 3. refunds the credits automatically if `work` throws.
 *
 * Call this only from server code (Route Handlers). Never expose spend or refund as public endpoints.
 *
 * Example (future AI route):
 *   const result = await runPaidJob(user.id, "white_background", { source: "upload" }, () => removeBackground(file));
 */
export async function runPaidJob<T>(
  userId: string,
  feature: CreditFeature,
  detail: Record<string, unknown>,
  work: (jobId: string) => Promise<T>,
): Promise<{ jobId: string; result: T; balanceAfter: number }> {
  const jobId = `job_${crypto.randomUUID()}`;
  const cost = FEATURE_COSTS[feature];
  const charge = await spendCredits(userId, cost, jobId, { feature, ...detail });
  if (!charge) throw new Error("Job id collision; please retry.");

  try {
    const result = await work(jobId);
    return { jobId, result, balanceAfter: charge.balanceAfter };
  } catch (error) {
    await refundCredits(userId, jobId, { feature, reason: error instanceof Error ? error.message.slice(0, 200) : "failed" });
    throw error;
  }
}
