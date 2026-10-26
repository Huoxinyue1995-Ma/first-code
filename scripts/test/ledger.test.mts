// Integration test for the credit ledger against a real Postgres.
// Usage: DATABASE_URL=postgres://... npm run test:ledger
import assert from "node:assert/strict";
const ledger = await import("../../src/lib/ledger.ts");
const { runPaidJob } = await import("../../src/lib/paid-job.ts");
const { getSql } = await import("../../src/lib/db.ts");
const { SIGNUP_BONUS_CREDITS } = await import("../../src/lib/credits.ts");

const sql = getSql();
// Unique per run so the script can be re-run against the same database.
const run = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const email = `test+${run}@example.com`;
let failures = 0;
async function check(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    console.log(`ok   ${name}`);
  } catch (error) {
    failures++;
    console.log(`FAIL ${name}\n     ${error instanceof Error ? error.message : error}`);
  }
}

const { user, created } = await ledger.findOrCreateUser({ email: ` ${email.toUpperCase()} `, name: "Tester" });

await check("new user gets the sign-up bonus once", async () => {
  assert.equal(created, true);
  assert.equal(user.email, email);
  assert.equal(user.creditBalance, SIGNUP_BONUS_CREDITS);
  const again = await ledger.findOrCreateUser({ email, googleSub: `google-${run}` });
  assert.equal(again.created, false);
  assert.equal(again.user.id, user.id);
  assert.equal((await ledger.getUserById(user.id))!.creditBalance, SIGNUP_BONUS_CREDITS);
});

await check("Google account links to the existing email account", async () => {
  const viaGoogle = await ledger.findOrCreateUser({ email: "changed@example.com", googleSub: `google-${run}` });
  assert.equal(viaGoogle.user.id, user.id);
});

await check("purchase is credited exactly once per Stripe session", async () => {
  const first = await ledger.grantPurchasedCredits(user.id, 50, `cs_test_abc_${run}`, { pack: "starter" });
  const second = await ledger.grantPurchasedCredits(user.id, 50, `cs_test_abc_${run}`, { pack: "starter" });
  assert.ok(first);
  assert.equal(second, null);
  assert.equal((await ledger.getUserById(user.id))!.creditBalance, SIGNUP_BONUS_CREDITS + 50);
});

await check("concurrent duplicate webhooks still credit once", async () => {
  const results = await Promise.all(
    Array.from({ length: 5 }, () => ledger.grantPurchasedCredits(user.id, 165, `cs_test_race_${run}`, { pack: "pro" })),
  );
  assert.equal(results.filter(Boolean).length, 1);
  assert.equal((await ledger.getUserById(user.id))!.creditBalance, SIGNUP_BONUS_CREDITS + 50 + 165);
});

await check("successful paid job charges the feature cost", async () => {
  const before = (await ledger.getUserById(user.id))!.creditBalance;
  const job = await runPaidJob(user.id, "scene", { test: true }, async () => "image-url");
  assert.equal(job.result, "image-url");
  assert.equal(job.balanceAfter, before - 2);
});

await check("failed paid job is refunded automatically", async () => {
  const before = (await ledger.getUserById(user.id))!.creditBalance;
  await assert.rejects(runPaidJob(user.id, "white_background", {}, async () => { throw new Error("model timeout"); }), /model timeout/);
  assert.equal((await ledger.getUserById(user.id))!.creditBalance, before);
});

await check("refund cannot be applied twice or to an unknown job", async () => {
  const spent = await ledger.spendCredits(user.id, 1, `job_manual_${run}`, {});
  assert.ok(spent);
  assert.ok(await ledger.refundCredits(user.id, `job_manual_${run}`));
  assert.equal(await ledger.refundCredits(user.id, `job_manual_${run}`), null);
  assert.equal(await ledger.refundCredits(user.id, `job_never_charged_${run}`), null);
});

await check("cannot spend more than the balance", async () => {
  const poor = await ledger.findOrCreateUser({ email: `poor+${run}@example.com` });
  await assert.rejects(ledger.spendCredits(poor.user.id, SIGNUP_BONUS_CREDITS + 1, `job_too_big_${run}`, {}), ledger.InsufficientCreditsError);
  assert.equal((await ledger.getUserById(poor.user.id))!.creditBalance, SIGNUP_BONUS_CREDITS);
});

await check("concurrent spends never overdraw", async () => {
  const racer = await ledger.findOrCreateUser({ email: `racer+${run}@example.com` });
  // Balance is SIGNUP_BONUS_CREDITS (3); ten parallel 1-credit spends must succeed exactly 3 times.
  const outcomes = await Promise.allSettled(
    Array.from({ length: 10 }, (_, i) => ledger.spendCredits(racer.user.id, 1, `job_race_${run}_${i}`, {})),
  );
  const succeeded = outcomes.filter((o) => o.status === "fulfilled").length;
  assert.equal(succeeded, SIGNUP_BONUS_CREDITS);
  assert.equal((await ledger.getUserById(racer.user.id))!.creditBalance, 0);
});

await check("balance always equals the sum of the ledger", async () => {
  const mismatches = await sql`
    select u.id from users u
    left join credit_ledger l on l.user_id = u.id
    group by u.id, u.credit_balance
    having u.credit_balance <> coalesce(sum(l.delta), 0)`;
  assert.equal(mismatches.length, 0);
});

await check("ledger history is newest first with running balance", async () => {
  const history = await ledger.getLedger(user.id);
  assert.ok(history.length >= 6);
  // Every entry belongs to this run's user, so the oldest one is its sign-up bonus.
  assert.equal(history[0].balanceAfter, (await ledger.getUserById(user.id))!.creditBalance);
  assert.equal(history.at(-1)!.reason, "signup_bonus");
});

await sql.end();
console.log(failures ? `\n${failures} check(s) failed.` : "\nAll ledger checks passed.");
process.exit(failures ? 1 : 0);
