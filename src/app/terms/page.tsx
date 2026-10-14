import Link from "next/link";

export const metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <main className="legal-page">
      <Link className="back-link" href="/">Back to Image Ready</Link>
      <p className="eyebrow">Terms</p>
      <h1>Use Image Ready to prepare images, then check each platform&apos;s rules.</h1>
      <section>
        <h2>Using this tool</h2>
        <p>
          You are responsible for the images you choose and for having the right to use them. Do not use the service for unlawful content or content that violates another person&apos;s rights.
        </p>
      </section>
      <section>
        <h2>Platform templates</h2>
        <p>
          Amazon, Shopify, and TikTok Shop templates are practical starting sizes, not an approval guarantee or an official relationship with those companies. Platform requirements can change, so check the current rules for your market before publishing.
        </p>
      </section>
      <section>
        <h2>No warranty</h2>
        <p>
          We provide this tool as-is. You should review downloaded files before using them in a storefront or advertising campaign.
        </p>
      </section>
    </main>
  );
}
