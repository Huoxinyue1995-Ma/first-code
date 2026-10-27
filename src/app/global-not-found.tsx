import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found | Image Ready",
  robots: { index: false, follow: true },
};

// Used for URLs that match no route. With two root layouts (English and Spanish) there is no single layout to build a 404 from.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="content-main narrow legal-page not-found-page">
          <p className="eyebrow">404</p>
          <h1>Page not found.</h1>
          <p className="legal-lead">The page you are looking for does not exist. / La página que buscas no existe.</p>
          <p><Link className="plan-button" href="/">Image Ready</Link> <Link className="plan-button is-secondary" href="/es">Image Ready en español</Link></p>
        </main>
      </body>
    </html>
  );
}
