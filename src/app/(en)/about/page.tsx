import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "About",
  description: "Why Image Ready exists, who it is for, and how it resizes product photos in bulk without uploading them.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageFrame alternate="/es" locale="en">
      <main className="content-main narrow legal-page">
        <p className="eyebrow">About</p>
        <h1>A batch image resizer for people who sell online.</h1>
        <p className="legal-lead">
          Image Ready resizes and crops product photos for Etsy, eBay, Amazon, Shopify, Pinterest, Poshmark, and other marketplaces, in bulk, without uploading the originals anywhere.
        </p>
        <section>
          <h2>Why we built it</h2>
          <p>
            Every marketplace wants photos in slightly different sizes and shapes. Resizing them one at a time in a general photo editor is slow, and many online resizers make you upload unreleased product photos to someone else&apos;s server. Image Ready does one job well: it turns a folder of product photos into correctly sized files for the platforms you sell on.
          </p>
        </section>
        <section>
          <h2>Who it is for</h2>
          <p>
            Independent sellers, resellers, small ecommerce teams, and virtual assistants who list products on more than one platform. If you prepare dozens of photos at a time, batch export saves the most time.
          </p>
        </section>
        <section>
          <h2>How it keeps your photos private</h2>
          <p>
            All resizing and cropping happens in your browser. Photos are read, edited, and saved on your device. We never receive them. When you download, we only record a fingerprint of each file to count credits fairly; you can read the details in our <Link href="/privacy">privacy policy</Link>.
          </p>
        </section>
        <section>
          <h2>How the site is funded</h2>
          <p>
            New accounts get 3 free credits, and each downloaded photo costs 1 credit. Credit packs are a one-time payment through Stripe, described on the <Link href="/pricing">pricing page</Link>. The site may also show advertising. Neither payments nor ads give anyone access to your photos.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            Image Ready is run by an independent developer. For questions, feedback, or payment support, email <a href="mailto:huoxinyue1995@gmail.com">huoxinyue1995@gmail.com</a> or visit the <Link href="/contact">contact page</Link>.
          </p>
        </section>
      </main>
    </PageFrame>
  );
}
