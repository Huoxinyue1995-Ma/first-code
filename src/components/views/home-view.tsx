import Link from "next/link";
import { HomeDropzone } from "@/components/home-dropzone";
import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/site-chrome";
import { getDictionary } from "@/lib/dictionary";
import { guidePath } from "@/components/views/guide-views";
import { CREDIT_PACKS } from "@/lib/credits";
import { GUIDES } from "@/lib/guides";
import { GUIDES_ES } from "@/lib/guides-es";
import { HOME_SIZE_ROWS } from "@/lib/home-sizes";
import { type Locale, localePath } from "@/lib/i18n";
import { ratioLabel } from "@/lib/image-render";
import { customPath, platformPath } from "@/lib/platforms";
import { BRAND, PRIMARY_SITE_URL } from "@/lib/site";

export function HomeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const h = t.home;
  const pageUrl = `${PRIMARY_SITE_URL}${localePath(locale, "/")}`;
  const orgId = `${PRIMARY_SITE_URL}/#organization`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: h.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": orgId,
      name: BRAND,
      url: PRIMARY_SITE_URL,
      logo: `${PRIMARY_SITE_URL}/logo.png`,
      email: "huoxinyue1995@gmail.com",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: BRAND,
      url: pageUrl,
      description: h.metaDescription,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web",
      inLanguage: locale,
      image: `${PRIMARY_SITE_URL}/og/batch-image-resizer.jpg`,
      featureList: h.appFeatures,
      publisher: { "@id": orgId },
      offers: Object.values(CREDIT_PACKS).map((pack) => ({
        "@type": "Offer",
        name: `${pack.name}: ${pack.credits} credits`,
        price: (pack.priceCents / 100).toFixed(2),
        priceCurrency: "USD",
        url: `${PRIMARY_SITE_URL}${localePath(locale, "/pricing")}`,
      })),
    },
  ];

  return (
    <PageFrame alternate={localePath(locale === "en" ? "es" : "en", "/")} locale={locale}>
      <main className="content-main">
        <section className="hero is-compact">
          <p className="eyebrow">{h.eyebrow}</p>
          <h1>{h.title}</h1>
          <p className="hero-lead">{h.lead}</p>
        </section>

        <HomeDropzone locale={locale} t={t} />

        <section aria-labelledby="platforms-title" className="content-section" id="platforms">
          <h2 id="platforms-title">{h.platformsTitle}</h2>
          <p className="section-lead">{h.platformsLead}</p>
          <div className="table-scroll">
            <table className="size-table home-size-table">
              <thead>
                <tr><th>{h.colPlatform}</th><th>{h.colSize}</th><th>{h.colRatio}</th><th>{h.colNotes}</th><th>{h.colTool}</th></tr>
              </thead>
              <tbody>
                {HOME_SIZE_ROWS.map((row) => (
                  <tr key={row.id}>
                    <th scope="row">{row.page.platform}{row.id.endsWith("-banner") ? ` ${locale === "en" ? "banner" : "(banner)"}` : ""}</th>
                    <td className="nowrap">{row.size.width} × {row.size.height}</td>
                    <td>{ratioLabel(row.size.width, row.size.height)}</td>
                    <td>
                      {row.note[locale]}
                      {row.doc && (
                        <>
                          {" "}
                          <a className="doc-link" href={row.doc.url} rel="noopener" target="_blank">{row.doc.label[locale]} ↗</a>
                        </>
                      )}
                    </td>
                    <td><Link className="text-link" href={platformPath(locale, row.page)}>{row.page.title[locale]}</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="source-note">{h.sizesSource}</p>
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

        <article className="content-section platform-guide">
          <section aria-labelledby="crop-title">
            <h2 id="crop-title">{h.resizeVsCropTitle}</h2>
            {h.resizeVsCrop.map((text) => <p key={text.slice(0, 40)}>{text}</p>)}
          </section>
          <section aria-labelledby="quality-title">
            <h2 id="quality-title">{h.qualityTitle}</h2>
            {h.quality.map((text) => <p key={text.slice(0, 40)}>{text}</p>)}
          </section>
        </article>

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
            <Link className="text-link" href={locale === "en" ? "/guides" : "/es/guias"}>{h.allGuides}</Link>
          </div>
          <div className="guide-grid">
            {(locale === "en" ? GUIDES : GUIDES_ES).slice(0, 3).map((guide) => (
              <Link className="guide-card" href={guidePath(locale, guide.slug)} key={guide.slug}>
                <strong>{guide.title}</strong>
                <span>{guide.summary}</span>
              </Link>
            ))}
          </div>
        </section>
        <JsonLd data={structuredData} />
      </main>
    </PageFrame>
  );
}
