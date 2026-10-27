import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/site-chrome";
import { GUIDES, getGuide, type GuideBlock } from "@/lib/guides";
import { PRIMARY_SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata(props: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: { absolute: `${guide.title} | Image Ready` },
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      url: `/guides/${guide.slug}`,
      title: guide.title,
      description: guide.description,
      publishedTime: guide.published,
      modifiedTime: guide.updated,
    },
  };
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

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export default async function GuidePage(props: PageProps<"/guides/[slug]">) {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = GUIDES.filter((item) => item.slug !== guide.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.published,
    dateModified: guide.updated,
    mainEntityOfPage: `${PRIMARY_SITE_URL}/guides/${guide.slug}`,
    author: { "@type": "Organization", name: "Image Ready", url: PRIMARY_SITE_URL },
    publisher: { "@type": "Organization", name: "Image Ready", url: PRIMARY_SITE_URL },
  };

  return (
    <PageFrame alternate="/es" locale="en">
    <main className="content-main narrow legal-page guide-article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Link className="back-link" href="/guides">All guides</Link>
      <p className="eyebrow">Guide · {guide.readingMinutes} min read</p>
      <h1>{guide.title}</h1>
      <p className="legal-lead">{guide.description}</p>
      <p className="guide-meta">Updated {formatDate(guide.updated)}</p>
      {guide.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.blocks.map(renderBlock)}
        </section>
      ))}
      <aside className="guide-cta">
        <strong>Try it on your own photos</strong>
        <p>Batch resize product photos for Etsy, eBay, Amazon, Shopify, and more in your browser. Your originals are never uploaded.</p>
        <Link className="plan-button" href="/#platforms">Choose your platform</Link>
      </aside>
      <section>
        <h2>More guides</h2>
        <ul className="related-guides">
          {related.map((item) => (
            <li key={item.slug}><Link href={`/guides/${item.slug}`}>{item.title}</Link></li>
          ))}
        </ul>
      </section>
    </main>
    </PageFrame>
  );
}
