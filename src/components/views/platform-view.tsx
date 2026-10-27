import Link from "next/link";
import { BatchResizer } from "@/components/batch-resizer";
import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/site-chrome";
import { fmt, getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { ratioLabel } from "@/lib/image-render";
import { PLATFORM_PAGES, type PlatformPage, platformPath } from "@/lib/platforms";

export function PlatformView({ locale, page }: { locale: Locale; page: PlatformPage }) {
  const t = getDictionary(locale);
  const p = t.platform;
  const other = locale === "en" ? "es" : "en";
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq[locale].map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  const recommended = page.sizes.filter((s) => s.note).map((s) => s.id);

  return (
    <PageFrame alternate={platformPath(other, page)} locale={locale}>
      <main className="content-main">
        <section className="hero is-compact">
          <p className="eyebrow">{page.platform}</p>
          <h1>{page.title[locale]}</h1>
          <p className="hero-lead">{page.intro[locale]}</p>
        </section>

        <BatchResizer defaultSelected={recommended.length ? recommended : undefined} locale={locale} platformId={page.id} presets={page.sizes} t={t} />

        <section aria-labelledby="sizes-title" className="content-section">
          <h2 id="sizes-title">{fmt(p.sizesTitle, { platform: page.platform })}</h2>
          <table className="size-table">
            <thead><tr><th>{p.colUse}</th><th>{p.colSize}</th><th>{p.colRatio}</th></tr></thead>
            <tbody>
              {page.sizes.map((s) => (
                <tr key={s.id}>
                  <td>{s.label[locale]}{s.note && <span className="size-badge">{s.note[locale]}</span>}</td>
                  <td>{s.width} × {s.height}</td>
                  <td>{ratioLabel(s.width, s.height)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="source-note">{page.sourceNote[locale]}</p>
        </section>

        <section aria-labelledby="tips-title" className="content-section">
          <h2 id="tips-title">{fmt(p.tipsTitle, { platform: page.platform })}</h2>
          <ul className="tip-list">{page.tips[locale].map((tip) => <li key={tip}>{tip}</li>)}</ul>
        </section>

        <section aria-labelledby="faq-title" className="content-section">
          <h2 id="faq-title">{fmt(p.faqTitle, { platform: page.platform })}</h2>
          <div className="faq-list">
            {page.faq[locale].map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}
          </div>
        </section>

        <section aria-labelledby="other-title" className="content-section">
          <h2 id="other-title">{p.otherTitle}</h2>
          <ul className="platform-chips">
            {PLATFORM_PAGES.filter((o) => o.id !== page.id).map((o) => (
              <li key={o.id}><Link href={platformPath(locale, o)}>{o.title[locale]}</Link></li>
            ))}
          </ul>
        </section>
        <JsonLd data={faqLd} />
      </main>
    </PageFrame>
  );
}
