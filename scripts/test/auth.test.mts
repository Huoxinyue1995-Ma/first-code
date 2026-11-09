// Tests for email sign-in codes (real Postgres) and Google ID token checks (self-signed test keys).
// Usage: DATABASE_URL=postgres://... npm run test:auth
import assert from "node:assert/strict";
import { SignJWT, createLocalJWKSet, exportJWK, generateKeyPair } from "jose";

const codes = await import("../../src/lib/email-login.ts");
const { verifyGoogleIdToken } = await import("../../src/lib/google-id-token.ts");
const { getSql } = await import("../../src/lib/db.ts");

const sql = getSql();
const run = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
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
const wrongOf = (code: string) => String((Number(code) + 1) % 1_000_000).padStart(6, "0");

// ---------- Email codes ----------
await check("code is 6 digits and the right code signs in once", async () => {
  const email = `code+${run}@example.com`;
  const { code } = await codes.createEmailLoginCode(` ${email.toUpperCase()} `);
  assert.match(code, /^\d{6}$/);
  const first = await codes.verifyEmailLoginCode(email, code);
  assert.deepEqual(first, { ok: true, email });
  const again = await codes.verifyEmailLoginCode(email, code);
  assert.equal(again.ok, false);
  assert.equal(!again.ok && again.reason, "expired");
});

await check("only a hash of the code is stored", async () => {
  const email = `hash+${run}@example.com`;
  const { code } = await codes.createEmailLoginCode(email);
  const rows = await sql<{ code_hash: string }[]>`select code_hash from email_login_codes where email = ${email}`;
  assert.equal(rows.length, 1);
  assert.notEqual(rows[0].code_hash, code);
  assert.ok(!rows[0].code_hash.includes(code));
});

await check("wrong codes count down and lock after 5 tries, even for the right code", async () => {
  const email = `lock+${run}@example.com`;
  const { code } = await codes.createEmailLoginCode(email);
  const wrong = wrongOf(code);
  for (let left = 4; left >= 1; left--) {
    const r = await codes.verifyEmailLoginCode(email, wrong);
    assert.deepEqual(r, { ok: false, reason: "wrong", attemptsLeft: left });
  }
  const fifth = await codes.verifyEmailLoginCode(email, wrong);
  assert.deepEqual(fifth, { ok: false, reason: "locked" });
  const right = await codes.verifyEmailLoginCode(email, code);
  assert.deepEqual(right, { ok: false, reason: "locked" });
});

await check("a new code replaces the previous one", async () => {
  const email = `replace+${run}@example.com`;
  const first = await codes.createEmailLoginCode(email);
  let second = await codes.createEmailLoginCode(email);
  while (second.code === first.code) second = await codes.createEmailLoginCode(email);
  const old = await codes.verifyEmailLoginCode(email, first.code);
  assert.equal(old.ok, false);
  assert.deepEqual(await codes.verifyEmailLoginCode(email, second.code), { ok: true, email });
});

await check("a code only works for the email it was sent to", async () => {
  const email = `owner+${run}@example.com`;
  const other = `other+${run}@example.com`;
  const { code } = await codes.createEmailLoginCode(email);
  await codes.createEmailLoginCode(other);
  const r = await codes.verifyEmailLoginCode(other, code);
  assert.equal(r.ok, false);
});

await check("expired codes are rejected", async () => {
  const email = `expired+${run}@example.com`;
  const { code } = await codes.createEmailLoginCode(email);
  await sql`update email_login_codes set expires_at = now() - interval '1 second' where email = ${email}`;
  const r = await codes.verifyEmailLoginCode(email, code);
  assert.deepEqual(r, { ok: false, reason: "expired" });
});

await check("more than 5 codes per hour is rate limited", async () => {
  const email = `rate+${run}@example.com`;
  for (let i = 0; i < 5; i++) await codes.createEmailLoginCode(email);
  await assert.rejects(() => codes.createEmailLoginCode(email), codes.EmailRateLimitError);
});

await check("malformed codes are rejected without counting", async () => {
  const email = `format+${run}@example.com`;
  const { code } = await codes.createEmailLoginCode(email);
  for (const bad of ["", "12345", "1234567", "abcdef", "12 345"]) {
    assert.deepEqual(await codes.verifyEmailLoginCode(email, bad), { ok: false, reason: "wrong" });
  }
  assert.deepEqual(await codes.verifyEmailLoginCode(email, code), { ok: true, email });
});

// ---------- Google ID tokens ----------
const CLIENT = "test-client.apps.googleusercontent.com";
const { publicKey, privateKey } = await generateKeyPair("RS256");
const jwk = { ...(await exportJWK(publicKey)), kid: "test-key", alg: "RS256", use: "sig" };
const keys = createLocalJWKSet({ keys: [jwk] });
const other = await generateKeyPair("RS256");

async function token(claims: Record<string, unknown>, opts: { key?: CryptoKey; iss?: string; aud?: string; exp?: string } = {}) {
  return new SignJWT({ email: "buyer@gmail.com", email_verified: true, name: "Buyer", nonce: "n-1", ...claims })
    .setProtectedHeader({ alg: "RS256", kid: "test-key" })
    .setSubject("google-sub-1")
    .setIssuer(opts.iss ?? "https://accounts.google.com")
    .setAudience(opts.aud ?? CLIENT)
    .setIssuedAt()
    .setExpirationTime(opts.exp ?? "1h")
    .sign(opts.key ?? privateKey);
}
const verify = (t: string, nonce = "n-1") => verifyGoogleIdToken(t, { clientId: CLIENT, nonce, keys });

await check("valid Google ID token returns the profile", async () => {
  assert.deepEqual(await verify(await token({})), { sub: "google-sub-1", email: "buyer@gmail.com", name: "Buyer" });
  assert.equal((await verify(await token({}, { iss: "accounts.google.com" }))).sub, "google-sub-1");
});

await check("Google ID token is rejected for wrong audience, issuer, signature, expiry, nonce or unverified email", async () => {
  await assert.rejects(async () => verify(await token({}, { aud: "someone-else" })));
  await assert.rejects(async () => verify(await token({}, { iss: "https://evil.example.com" })));
  await assert.rejects(async () => verify(await token({}, { key: other.privateKey })));
  await assert.rejects(async () => verify(await token({}, { exp: "-1m" })));
  await assert.rejects(async () => verify(await token({ nonce: "other" })));
  await assert.rejects(async () => verify(await token({}), ""));
  await assert.rejects(async () => verify(await token({ email_verified: false })));
});

await sql.end();
console.log(failures ? `\n${failures} failed` : "\nall passed");
process.exit(failures ? 1 : 0);
