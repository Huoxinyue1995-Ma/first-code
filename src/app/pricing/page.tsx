import Link from "next/link";

export const metadata = {
  title: "Pricing",
  description: "Single-image compression is free. Download a ZIP of up to 10 processed images for $3.99.",
};

export default function PricingPage() {
  return (
    <main className="legal-page pricing-page">
      <Link className="back-link" href="/">Back to Image Ready</Link>
      <p className="eyebrow">Simple pricing</p>
      <h1>Prepare one image free. Move faster with batch compression.</h1>
      <p className="legal-lead">Every plan keeps the original image in your browser. There is no image upload allowance because your files never come to us.</p>
      <div className="pricing-grid">
        <section className="plan-card">
          <p className="plan-label">Free</p>
          <h2>$0</h2>
          <p>For individual product images.</p>
          <ul>
            <li>Crop one image at a time</li>
            <li>Amazon, Shopify, TikTok Shop, and custom sizes</li>
            <li>JPG or PNG download</li>
            <li>Private, local processing</li>
          </ul>
          <Link className="plan-button is-secondary" href="/">Use the free tool</Link>
        </section>
        <section className="plan-card is-featured">
          <p className="plan-label">Batch download</p>
          <h2>$3.99<span>/batch</span></h2>
          <p>For sellers preparing a small group of product images.</p>
          <ul>
            <li>Everything in Free</li>
            <li>Batch compression and ZIP download</li>
            <li>Up to 10 images per batch</li>
            <li>One payment, no subscription</li>
          </ul>
          <Link className="plan-button" href="/">Prepare a batch</Link>
        </section>
      </div>
      <p className="pricing-footnote">Payment opens in Stripe. Image files are processed and downloaded locally in your browser; we do not receive or store them.</p>
    </main>
  );
}
