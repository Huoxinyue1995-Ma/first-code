import Link from "next/link";

export const metadata = {
  title: "Pricing",
  description: "Single-image compression is free. Batch compression is available with Image Ready Pro.",
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
          <p className="plan-label">Pro</p>
          <h2>$9<span>/month</span></h2>
          <p>For sellers preparing a group of product images.</p>
          <ul>
            <li>Everything in Free</li>
            <li>Batch compression and ZIP download</li>
            <li>Up to 20 images per batch</li>
            <li>Priority access to future workflows</li>
          </ul>
          <a className="plan-button" href="mailto:hello@example.com?subject=Image%20Ready%20Pro%20interest">Get Pro access</a>
        </section>
      </div>
      <p className="pricing-footnote">Pro checkout will be connected to a payment provider before public billing opens. Until then, the Pro button records interest only and does not charge a card.</p>
    </main>
  );
}
