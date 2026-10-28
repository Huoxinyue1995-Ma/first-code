import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/site-chrome";
import { GUIDES, type Guide, type GuideBlock } from "@/lib/guides";
import { GUIDES_ES, esSlugFor } from "@/lib/guides-es";
import { type Locale, OG_LOCALE, localePath } from "@/lib/i18n";
import { PRIMARY_SITE_URL } from "@/lib/site";

const COPY = {
  en: {
    indexTitle: "Product image guides for online sellers.",
    indexEyebrow: "Guides",
    indexLead: "Plain-language explanations of the sizes, formats, and framing habits that make product photos look right on each marketplace.",
    minRead: "{n} min read",
    allGuides: "All guides",
    updated: "Updated {date}",
    ctaTitle: "Try it on your own photos",
    ctaBody: "Batch resize product photos for Etsy, eBay, Amazon, Shopify, and more in your browser. Your originals are never uploaded.",
    ctaButton: "Choose your platform",
    more: "More guides",
  },
  es: {
    indexTitle: "Guías de imágenes de producto para vendedores online.",
    indexEyebrow: "Guías",
    indexLead: "Explicaciones sencillas de los tamaños, formatos y hábitos de encuadre que hacen que las fotos de producto se vean bien en cada marketplace.",
    minRead: "{n} min de lectura",
    allGuides: "Todas las guías",
    updated: "Actualizado el {date}",
    ctaTitle: "Pruébalo con tus propias fotos",
    ctaBody: "Redimensiona en lote fotos de producto para Etsy, eBay, Amazon, Shopify y más en tu navegador. Tus originales nunca se suben.",
    ctaButton: "Elige tu plataforma",
    more: "Más guías",
  },
};

const guidesFor = (locale: Locale): Guide[] => (locale === "en" ? GUIDES : GUIDES_ES);
const indexPath = (locale: Locale) => (locale === "en" ? "/guides" : "/es/guias");
export const guidePath = (locale: Locale, slug: string) => `${indexPath(locale)}/${slug}`;

// Path of the same guide in the other language.
function counterpartPath(locale: Locale, guide: Guide) {
  if (locale === "es") return guidePath("en", (guide as Guide & { enSlug: string }).enSlug);
  const es = esSlugFor(guide.slug);
  return es ? guidePath("es", es) : indexPath("es");
}

export function guideIndexMetadata(locale: Locale): Metadata {
  const en = { title: "Product Image Guides for Online Sellers", description: "Practical guides to product image sizes, cropping, compression, and file formats for Etsy, eBay, Amazon, Shopify, and TikTok Shop sellers." };
  const es = { title: "Guías de imágenes de producto para vendedores", description: "Guías prácticas sobre tamaños de imagen, recorte, compresión y formatos de archivo para vendedores de Etsy, eBay, Amazon, Shopify y TikTok Shop." };
  const meta = locale === "en" ? en : es;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: indexPath(locale), languages: { en: "/guides", es: "/es/guias", "x-default": "/guides" } },
  };
}

export function guideMetadata(locale: Locale, guide: Guide): Metadata {
  const self = guidePath(locale, guide.slug);
  const other = counterpartPath(locale, guide);
  const languages = locale === "en" ? { en: self, es: other, "x-default": self } : { en: other, es: self, "x-default": other };
  return {
    title: { absolute: `${guide.title} | Image Ready` },
    description: guide.description,
    alternates: { canonical: self, languages },
    openGraph: { type: "article", locale: OG_LOCALE[locale], url: self, title: guide.title, description: guide.description, publishedTime: guide.published, modifiedTime: guide.updated },
  };
}

export function GuideIndexView({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <PageFrame alternate={indexPath(locale === "en" ? "es" : "en")} locale={locale}>
      <main className="content-main narrow legal-page">
        <p className="eyebrow">{c.indexEyebrow}</p>
        <h1>{c.indexTitle}</h1>
        <p className="legal-lead">{c.indexLead}</p>
        <div className="guide-list">
          {guidesFor(locale).map((guide) => (
            <article className="guide-list-item" key={guide.slug}>
              <h2><Link href={guidePath(locale, guide.slug)}>{guide.title}</Link></h2>
              <p>{guide.summary}</p>
              <small>{c.minRead.replace("{n}", String(guide.readingMinutes))}</small>
            </article>
          ))}
        </div>
      </main>
    </PageFrame>
  );
}

function renderBlock(block: GuideBlock, index: number) {
  switch (block.type) {
    case "p":
      return <p key={index}>{block.text}</p>;
    case "ul":
      return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    case "ol":
      return <ol key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ol>;
    case "tip":
      return <p className="guide-tip" key={index}>{block.text}</p>;
  }
}

export function GuideArticleView({ locale, guide }: { locale: Locale; guide: Guide }) {
  const c = COPY[locale];
  const date = new Date(`${guide.updated}T00:00:00Z`).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  const related = guidesFor(locale).filter((item) => item.slug !== guide.slug).slice(0, 3);
  const url = `${PRIMARY_SITE_URL}${guidePath(locale, guide.slug)}`;
  return (
    <PageFrame alternate={counterpartPath(locale, guide)} locale={locale}>
      <main className="content-main narrow legal-page guide-article">
        <JsonLd data={{
          "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, inLanguage: locale,
          datePublished: guide.published, dateModified: guide.updated, mainEntityOfPage: url,
          author: { "@type": "Organization", name: "Image Ready", url: PRIMARY_SITE_URL },
          publisher: { "@type": "Organization", name: "Image Ready", url: PRIMARY_SITE_URL },
        }} />
        <p className="eyebrow"><Link href={indexPath(locale)}>{c.allGuides}</Link> · {c.minRead.replace("{n}", String(guide.readingMinutes))}</p>
        <h1>{guide.title}</h1>
        <p className="legal-lead">{guide.description}</p>
        <p className="guide-meta">{c.updated.replace("{date}", date)}</p>
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.blocks.map(renderBlock)}
          </section>
        ))}
        <aside className="guide-cta">
          <strong>{c.ctaTitle}</strong>
          <p>{c.ctaBody}</p>
          <Link className="plan-button" href={`${localePath(locale, "/")}#platforms`}>{c.ctaButton}</Link>
        </aside>
        <section>
          <h2>{c.more}</h2>
          <ul className="related-guides">
            {related.map((item) => <li key={item.slug}><Link href={guidePath(locale, item.slug)}>{item.title}</Link></li>)}
          </ul>
        </section>
      </main>
    </PageFrame>
  );
}
