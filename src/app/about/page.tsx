import type { Metadata } from "next";
import Link from "next/link";
import { ContentFooter } from "@/components/content-page-shell";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Image Ready exists, who it is for, and how it keeps product images private by processing them entirely in your browser.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="legal-page">
      <Link className="back-link" href="/">Back to Image Ready</Link>
      <p className="eyebrow">About</p>
      <h1>A focused image tool for people who sell online.</h1>
      <p className="legal-lead">
        Image Ready helps sellers crop, resize, and compress product photos for Amazon, Shopify, and TikTok Shop without uploading the originals anywhere.
      </p>
      <section>
        <h2>Why we built it</h2>
        <p>
          Preparing product photos is repetitive. Every marketplace recommends a slightly different size, general photo editors have far more options than a listing needs, and many online resizers require you to upload unreleased product photos to someone else&apos;s server. Image Ready does one job: it turns a product photo into a correctly sized, reasonably small file for the platform you sell on.
        </p>
      </section>
      <section>
        <h2>Who it is for</h2>
        <p>
          Independent sellers, small ecommerce teams, and freelancers who manage listings for clients. If you regularly prepare images for more than one marketplace, the platform presets and batch export save the most time.
        </p>
      </section>
      <section>
        <h2>How it keeps your images private</h2>
        <p>
          All image processing happens in your browser using standard web technologies. The file you choose is read on your device, edited on your device, and downloaded back to your device. We do not receive, store, or look at your images. The website uses Google Analytics to understand overall usage and Google AdSense to show ads; you can read the details in our <Link href="/privacy">privacy policy</Link>.
        </p>
      </section>
      <section>
        <h2>How the site is funded</h2>
        <p>
          Single-image editing is free. Optional batch downloads are a small one-time payment processed by Stripe, described on the <Link href="/pricing">pricing page</Link>. The site may also display advertising. Neither payments nor ads give anyone access to your images.
        </p>
      </section>
      <section>
        <h2>Guides and accuracy</h2>
        <p>
          Our <Link href="/guides">guides</Link> summarize the image practices that work well on each marketplace. Platform rules change, so each guide points out where to confirm the current requirements. If you notice something out of date, please let us know and we will update it.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Image Ready is run by an independent developer. For questions, feedback, or payment support, email <a href="mailto:huoxinyue1995@gmail.com">huoxinyue1995@gmail.com</a> or visit the <Link href="/contact">contact page</Link>.
        </p>
      </section>
      <ContentFooter />
    </main>
  );
}
