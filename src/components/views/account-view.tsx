import Link from "next/link";
import { redirect } from "next/navigation";
import { BuyCreditsButton } from "@/components/buy-credits-button";
import { NotifyEditorTab } from "@/components/notify-editor-tab";
import { PageFrame } from "@/components/site-chrome";
import { getCurrentUser } from "@/lib/auth";
import { fulfillCreditPurchase } from "@/lib/credit-fulfillment";
import { CREDIT_PACKS, formatPrice, pricePerPhoto } from "@/lib/credits";
import { fmt, getDictionary } from "@/lib/dictionary";
import { type Locale, localePath } from "@/lib/i18n";
import { type LedgerEntry, getLedger } from "@/lib/ledger";
import { getStripe, isCheckoutSessionId } from "@/lib/stripe";

// Credits the purchase on return from Stripe, in case the webhook has not arrived yet.
async function confirmReturningPurchase(sessionId: string, userId: string) {
  const stripe = getStripe();
  if (!stripe || !isCheckoutSessionId(sessionId)) return;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.metadata?.user_id !== userId) return;
    await fulfillCreditPurchase(session);
  } catch (error) {
    console.error("Purchase confirmation on return failed.", { message: error instanceof Error ? error.message : String(error) });
  }
}

export async function AccountView({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string | string[] | undefined> }) {
  const t = getDictionary(locale);
  const a = t.account;
  let user = await getCurrentUser();
  if (!user) redirect(`${localePath(locale, "/login")}?next=${encodeURIComponent(localePath(locale, "/account"))}`);

  const purchase = typeof searchParams.purchase === "string" ? searchParams.purchase : "";
  const sessionId = typeof searchParams.session_id === "string" ? searchParams.session_id : "";
  const fromEditor = searchParams.from === "editor";
  if (purchase === "success" && sessionId) {
    await confirmReturningPurchase(sessionId, user.id);
    user = (await getCurrentUser()) ?? user;
  }

  const ledger = await getLedger(user.id, 50);
  const dateFormat = new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });
  const describe = (entry: LedgerEntry) => {
    if (entry.reason === "usage" && typeof entry.detail?.photos === "number") return fmt(a.downloadDetail, { n: entry.detail.photos });
    if (entry.reason === "purchase" && typeof entry.detail?.pack === "string") {
      const pack = CREDIT_PACKS[entry.detail.pack as keyof typeof CREDIT_PACKS];
      return pack ? fmt(a.packPurchase, { name: pack.name }) : a.reasons.purchase;
    }
    return a.reasons[entry.reason] ?? entry.reason;
  };

  return (
    <PageFrame alternate={localePath(locale === "en" ? "es" : "en", "/account")} locale={locale}>
      <main className="content-main narrow">
        {fromEditor && <NotifyEditorTab closeSelf={purchase === "success"} />}
        <section className="hero is-compact">
          <p className="eyebrow">{a.eyebrow}</p>
          <h1>{a.title}</h1>
          <p className="hero-lead">{fmt(a.signedInAs, { email: user.email })}</p>
        </section>
        {purchase === "success" && <p className="auth-notice" role="status">{a.purchaseSuccess}</p>}
        {purchase === "cancelled" && <p className="auth-notice" role="status">{a.purchaseCancelled}</p>}

        <section aria-label={a.available} className="balance-card">
          <span>{a.available}</span>
          <strong>{user.creditBalance}</strong>
          <small>{a.costNote}</small>
          <Link className="text-link" href={localePath(locale, "/")}>{a.startResizing} →</Link>
        </section>

        <section className="content-section">
          <h2>{a.buyTitle}</h2>
          <div className="pricing-grid three">
            {Object.values(CREDIT_PACKS).map((pack) => (
              <div className={`plan-card ${pack.featured ? "is-featured" : ""}`} key={pack.id}>
                <p className="plan-label">{pack.name}</p>
                <h3>{formatPrice(pack.priceCents)}</h3>
                <p>{fmt(t.pricing.credits, { n: pack.credits })} · {fmt(t.pricing.perPhoto, { price: pricePerPhoto(pack) })}</p>
                <BuyCreditsButton
                  label={fmt(t.pricing.buy, { n: pack.credits })}
                  locale={locale}
                  loginHref={localePath(locale, "/login")}
                  pack={pack.id}
                  signInLabel={t.pricing.signInToBuy}
                />
              </div>
            ))}
          </div>
          <p className="pricing-footnote">{t.pricing.footnote}</p>
        </section>

        <section className="content-section">
          <h2>{a.historyTitle}</h2>
          {ledger.length ? (
            <table className="ledger-table">
              <thead><tr><th>{a.colDate}</th><th>{a.colActivity}</th><th>{a.colChange}</th><th>{a.colBalance}</th></tr></thead>
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
            <p>{a.noActivity}</p>
          )}
        </section>

        <form action="/api/auth/logout" className="content-section" method="post">
          <button className="text-button" type="submit">{a.signOut}</button>
        </form>
      </main>
    </PageFrame>
  );
}
