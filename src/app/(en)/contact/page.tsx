import type { Metadata } from "next";
import { PageFrame } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageFrame alternate="/es" locale="en">
      <main className="content-main narrow legal-page">
        <p className="eyebrow">Contact</p>
        <h1>We want to hear where image preparation slows you down.</h1>
        <p className="legal-lead">
          For help with credits, a payment, or a download, email us. Hablamos español. Please do not attach your product photos; we do not need them to help.
        </p>
        <a className="email-link" href="mailto:huoxinyue1995@gmail.com">huoxinyue1995@gmail.com</a>
      </main>
    </PageFrame>
  );
}
