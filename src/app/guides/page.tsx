import type { Metadata } from "next";
import Link from "next/link";
import { ContentFooter } from "@/components/content-page-shell";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Product Image Guides for Amazon, Shopify, and TikTok Shop",
  description:
    "Practical guides to product image sizes, backgrounds, compression, and file formats for Amazon, Shopify, and TikTok Shop sellers.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <main className="legal-page">
      <Link className="back-link" href="/">Back to Image Ready</Link>
      <p className="eyebrow">Guides</p>
      <h1>Product image guides for online sellers.</h1>
      <p className="legal-lead">
        Plain-language explanations of the sizes, formats, and framing habits that make product photos look right on each marketplace.
      </p>
      <div className="guide-list">
        {GUIDES.map((guide) => (
          <article className="guide-list-item" key={guide.slug}>
            <h2><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h2>
            <p>{guide.summary}</p>
            <small>{guide.readingMinutes} min read</small>
          </article>
        ))}
      </div>
      <ContentFooter />
    </main>
  );
}
