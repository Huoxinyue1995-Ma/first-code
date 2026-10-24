import Link from "next/link";

export function ContentFooter() {
  return (
    <footer className="content-footer">
      <span>Image Ready · Private product image editing in your browser.</span>
      <nav aria-label="Site links">
        <Link href="/">Editor</Link>
        <Link href="/guides">Guides</Link>
        <Link href="/about">About</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </footer>
  );
}
