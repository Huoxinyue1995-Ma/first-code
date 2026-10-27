import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/site-chrome";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Product Image Guides for Online Sellers",
  description:
    "Practical guides to product image sizes, cropping, compression, and file formats for Etsy, eBay, Amazon, Shopify, and TikTok Shop sellers.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <PageFrame alternate="/es" locale="en">
    <main className="content-main narrow legal-page">
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
    </main>
    </PageFrame>
  );
}
