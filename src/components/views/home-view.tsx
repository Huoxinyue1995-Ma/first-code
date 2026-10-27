import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/site-chrome";
import { fmt, getDictionary } from "@/lib/dictionary";
import { GUIDES } from "@/lib/guides";
import { type Locale, localePath } from "@/lib/i18n";
import { PLATFORM_PAGES, customPath, platformPath } from "@/lib/platforms";

export function HomeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const h = t.home;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: h.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  return (
    <PageFrame alternate={localePath(locale === "en" ? "es" : "en", "/")} locale={locale}>
      <main className="content-main">
        <section className="hero">
          <p className="eyebrow">{h.eyebrow}</p>
          <h1>{h.title}</h1>
          <p className="hero-lead">{h.lead}</p>
        </section>

        <section aria-labelledby="platforms-title" className="content-section" id="platforms">
          <h2 id="platforms-title">{h.platformsTitle}</h2>
          <p className="section-lead">{h.platformsLead}</p>
          <ul className="platform-grid">
            {PLATFORM_PAGES.map((page) => (
              <li key={page.id}>
                <Link className="platform-card" href={platformPath(locale, page)}>
                  <strong>{page.title[locale]}</strong>
                  <span>{page.sizes.slice(0, 2).map((s) => `${s.width}×${s.height}`).join(" · ")}</span>
                  <small>{fmt(h.sizesCount, { n: page.sizes.length })}</small>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="custom-title" className="content-section">
          <Link className="custom-cta" href={customPath(locale)}>
            <span>
              <strong id="custom-title">{h.customTitle}</strong>
              <small>{h.customLead}</small>
            </span>
            <span className="custom-cta-button">{h.customButton} →</span>
          </Link>
        </section>

        <section aria-labelledby="how-title" className="content-section">
          <h2 id="how-title">{h.howTitle}</h2>
          <ol className="step-grid">
            {h.steps.map((step) => (
              <li key={step.title}><strong>{step.title}</strong><p>{step.body}</p></li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq-title" className="content-section">
          <h2 id="faq-title">{h.faqTitle}</h2>
          <div className="faq-list">
            {h.faq.map((item) => (
              <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>
            ))}
          </div>
        </section>

        <section aria-labelledby="guides-title" className="content-section">
          <div className="section-heading-row">
            <h2 id="guides-title">{h.guidesTitle}</h2>
            <Link className="text-link" href="/guides">{h.allGuides}</Link>
          </div>
          <div className="guide-grid">
            {GUIDES.slice(0, 3).map((guide) => (
              <Link className="guide-card" href={`/guides/${guide.slug}`} hrefLang="en" key={guide.slug}>
                <strong>{guide.title}</strong>
                <span>{guide.summary}</span>
              </Link>
            ))}
          </div>
        </section>
        <JsonLd data={faqLd} />
      </main>
    </PageFrame>
  );
}
