import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BuyCreditsButton } from "@/components/buy-credits-button";
import { getCurrentUser } from "@/lib/auth";
import { CREDIT_PACKS, FEATURE_COSTS, formatPrice } from "@/lib/credits";
import { fulfillCreditPurchase } from "@/lib/credit-fulfillment";
import { getLedger, type LedgerEntry } from "@/lib/ledger";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

const REASON_LABELS: Record<LedgerEntry["reason"], string> = {
  signup_bonus: "Welcome credits",
  purchase: "Credit purchase",
  usage: "AI image",
  refund: "Refund for failed image",
  adjustment: "Adjustment",
};

const FEATURE_LABELS: Record<string, string> = {
  white_background: "White background",
  scene: "AI scene",
};

function describe(entry: LedgerEntry) {
  const feature = typeof entry.detail?.feature === "string" ? FEATURE_LABELS[entry.detail.feature] : null;
  if (entry.reason === "usage" && feature) return feature;
  if (entry.reason === "purchase" && typeof entry.detail?.pack === "string") {
    const pack = CREDIT_PACKS[entry.detail.pack as keyof typeof CREDIT_PACKS];
    if (pack) return `${pack.name} pack`;
  }
  return REASON_LABELS[entry.reason];
}

// Credits the purchase immediately on return from Stripe, in case the webhook has not arrived yet.
async function confirmReturningPurchase(sessionId: string, userId: string) {
  const stripe = getStripe();
  if (!stripe || !/^cs_[A-Za-z0-9_]{10,255}$/.test(sessionId)) return;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.metadata?.user_id !== userId) return;
    await fulfillCreditPurchase(session);
  } catch (error) {
    console.error("Purchase confirmation on return failed.", { errorType: error instanceof Error ? error.message : typeof error });
  }
}

export default async function AccountPage(props: PageProps<"/account">) {
  const searchParams = await props.searchParams;
  let user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");

  const purchase = typeof searchParams.purchase === "string" ? searchParams.purchase : "";
  const sessionId = typeof searchParams.session_id === "string" ? searchParams.session_id : "";
  if (purchase === "success" && sessionId) {
    await confirmReturningPurchase(sessionId, user.id);
    user = (await getCurrentUser()) ?? user;
  }

  const ledger = await getLedger(user.id, 50);
  const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });

  return (
    <main className="legal-page account-page">
      <Link className="back-link" href="/">Back to Image Ready</Link>
      <p className="eyebrow">Account</p>
      <h1>Your credits</h1>
      <p className="legal-lead">Signed in as {user.email}</p>

      {purchase === "success" && <p className="auth-notice" role="status">Thanks! Your credits have been added.</p>}
      {purchase === "cancelled" && <p className="auth-notice" role="status">Checkout was cancelled. You were not charged.</p>}

      <section className="balance-card" aria-label="Credit balance">
        <span>Available credits</span>
        <strong>{user.creditBalance}</strong>
        <small>
          White background: {FEATURE_COSTS.white_background} credit per image · AI scene: {FEATURE_COSTS.scene} credits per image. Credits do not expire. Failed images are refunded automatically.
        </small>
      </section>

      <section>
        <h2>Buy credits</h2>
        <div className="pricing-grid">
          {Object.values(CREDIT_PACKS).map((pack) => (
            <div className={`plan-card ${pack.id === "pro" ? "is-featured" : ""}`} key={pack.id}>
              <p className="plan-label">{pack.name}</p>
              <h2>{formatPrice(pack.priceCents)}</h2>
              <p>{pack.credits} credits · {formatPrice(Math.round(pack.priceCents / pack.credits * 100) / 100)} each</p>
              <BuyCreditsButton pack={pack.id} label={`Buy ${pack.credits} credits`} />
            </div>
          ))}
        </div>
        <p className="pricing-footnote">One-time payment through Stripe. No subscription.</p>
      </section>

      <section>
        <h2>Credit history</h2>
        {ledger.length ? (
          <table className="ledger-table">
            <thead>
              <tr><th>Date (UTC)</th><th>Activity</th><th>Change</th><th>Balance</th></tr>
            </thead>
            <tbody>
              {ledger.map((entry) => (
                <tr key={entry.id}>
                  <td>{dateFormat.format(entry.createdAt)}</td>
                  <td>{describe(entry)}</td>
                  <td className={entry.delta > 0 ? "is-positive" : "is-negative"}>{entry.delta > 0 ? `+${entry.delta}` : entry.delta}</td>
                  <td>{entry.balanceAfter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No activity yet.</p>
        )}
      </section>

      <section>
        <form action="/api/auth/logout" method="post">
          <button className="text-button" type="submit">Sign out</button>
        </form>
      </section>
    </main>
  );
}
