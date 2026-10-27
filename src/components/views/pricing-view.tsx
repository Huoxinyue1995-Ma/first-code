import { Check } from "lucide-react";
import { BuyCreditsButton } from "@/components/buy-credits-button";
import { PageFrame } from "@/components/site-chrome";
import { CREDIT_PACKS, formatPrice, pricePerPhoto } from "@/lib/credits";
import { fmt, getDictionary } from "@/lib/dictionary";
import { type Locale, localePath } from "@/lib/i18n";

export function PricingView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const p = t.pricing;
  return (
    <PageFrame alternate={localePath(locale === "en" ? "es" : "en", "/pricing")} locale={locale}>
      <main className="content-main narrow">
        <section className="hero is-compact">
          <p className="eyebrow">{p.eyebrow}</p>
          <h1>{p.title}</h1>
          <p className="hero-lead">{p.lead}</p>
        </section>
        <ul className="rule-list">
          {p.rules.map((rule) => <li key={rule}><Check size={16} /> {rule}</li>)}
        </ul>
        <section aria-labelledby="packs-title" className="content-section">
          <h2 id="packs-title">{p.packsTitle}</h2>
          <div className="pricing-grid three">
            {Object.values(CREDIT_PACKS).map((pack) => (
              <div className={`plan-card ${pack.featured ? "is-featured" : ""}`} key={pack.id}>
                <p className="plan-label">{pack.name}{pack.featured && <span className="plan-badge">{p.popular}</span>}</p>
                <h3>{formatPrice(pack.priceCents)}</h3>
                <p>{fmt(p.credits, { n: pack.credits })} · {fmt(p.perPhoto, { price: pricePerPhoto(pack) })}</p>
                <BuyCreditsButton
                  label={fmt(p.buy, { n: pack.credits })}
                  locale={locale}
                  loginHref={`${localePath(locale, "/login")}?next=${encodeURIComponent(localePath(locale, "/pricing"))}`}
                  pack={pack.id}
                  signInLabel={p.signInToBuy}
                />
              </div>
            ))}
          </div>
          <p className="pricing-footnote">{p.footnote}</p>
        </section>
      </main>
    </PageFrame>
  );
}
