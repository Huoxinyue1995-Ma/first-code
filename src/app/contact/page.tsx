import Link from "next/link";

export const metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="legal-page">
      <Link className="back-link" href="/">Back to Image Ready</Link>
      <p className="eyebrow">Contact</p>
      <h1>We want to hear where image preparation slows you down.</h1>
      <p className="legal-lead">
        For help with a payment or download, email us. Keep support messages separate from image files: the tool does not need customers to upload their originals to get help.
      </p>
      <a className="email-link" href="mailto:huoxinyue1995@gmail.com">huoxinyue1995@gmail.com</a>
    </main>
  );
}
