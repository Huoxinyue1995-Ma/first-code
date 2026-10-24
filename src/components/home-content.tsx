import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { BATCH_MAX_IMAGES, BATCH_PRICE_LABEL } from "@/lib/batch-pricing";

export const HOME_FAQ: Array<{ question: string; answer: string }> = [
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. Image Ready reads, crops, resizes, and compresses your files inside your browser. The original image, the preview, and the exported file stay on your device and are never sent to our servers or to a third-party image service.",
  },
  {
    question: "What sizes do the platform presets use?",
    answer:
      "The Amazon preset exports 2,000 × 2,000 pixels, the Shopify preset exports 2,048 × 2,048 pixels, and the TikTok Shop preset exports 1,080 × 1,080 pixels. You can also enter a custom width and height between 100 and 6,000 pixels.",
  },
  {
    question: "Which file types can I use?",
    answer:
      "You can open JPG, PNG, and WebP files up to 25 MB each. Exports are available as JPG, with an adjustable quality setting, or as PNG.",
  },
  {
    question: "Is Image Ready free?",
    answer: `Preparing and downloading one image at a time is free. If you want to export several images together, a batch ZIP of up to ${BATCH_MAX_IMAGES} images costs ${BATCH_PRICE_LABEL} as a one-time payment, with no subscription.`,
  },
  {
    question: "Does a preset guarantee my listing will be approved?",
    answer:
      "No. The presets are practical starting sizes. Marketplaces also have rules about backgrounds, text, and framing that can change over time, so check the current requirements for your category and region before publishing.",
  },
  {
    question: "Does it work on a phone?",
    answer:
      "Yes. The editor runs in modern mobile browsers. Very large photos may take a little longer to process on older phones because all the work happens on the device.",
  },
];

export function HomeContent() {
  const featuredGuides = GUIDES.slice(0, 3);

  return (
    <div className="home-content">
      <section className="content-section" aria-labelledby="how-title">
        <p className="eyebrow">How it works</p>
        <h2 id="how-title">Prepare a listing image in three steps</h2>
        <ol className="step-grid">
          <li>
            <strong>Choose your images</strong>
            <p>Drag in up to {BATCH_MAX_IMAGES} JPG, PNG, or WebP files. They open directly in your browser, so nothing is uploaded.</p>
          </li>
          <li>
            <strong>Pick a platform and frame it</strong>
            <p>Select Amazon, Shopify, TikTok Shop, or a custom size. Drag to reposition, zoom to fill the frame, and rotate if the photo is tilted.</p>
          </li>
          <li>
            <strong>Export at the right quality</strong>
            <p>Download a JPG with the quality you choose, or a PNG. The file is sized exactly for the platform you selected.</p>
          </li>
        </ol>
      </section>

      <section className="content-section" aria-labelledby="why-title">
        <p className="eyebrow">Why sellers use it</p>
        <h2 id="why-title">Made for product photos, not general photo editing</h2>
        <div className="feature-grid">
          <div>
            <h3>Platform sizes built in</h3>
            <p>You do not need to look up the recommended dimensions each time. Presets match the sizes most sellers use for Amazon, Shopify, and TikTok Shop.</p>
          </div>
          <div>
            <h3>Private by design</h3>
            <p>Unreleased products and client photos never leave your computer. There is no account to create and no upload queue to wait for.</p>
          </div>
          <div>
            <h3>Smaller, faster files</h3>
            <p>Resizing to the display size and choosing a sensible JPG quality often makes files several times smaller without a visible difference.</p>
          </div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="guides-title">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Guides</p>
            <h2 id="guides-title">Learn the image rules for each marketplace</h2>
          </div>
          <Link className="text-link" href="/guides">All guides</Link>
        </div>
        <div className="guide-grid">
          {featuredGuides.map((guide) => (
            <Link className="guide-card" href={`/guides/${guide.slug}`} key={guide.slug}>
              <strong>{guide.title}</strong>
              <span>{guide.summary}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-section" aria-labelledby="faq-title">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-title">Frequently asked questions</h2>
        <div className="faq-list">
          {HOME_FAQ.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
