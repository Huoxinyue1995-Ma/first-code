import type { Metadata } from "next";
import { DocumentShell } from "@/components/document-shell";
import { PRIMARY_SITE_URL } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(PRIMARY_SITE_URL),
  title: { default: "Image Ready", template: "%s | Image Ready" },
  description:
    "Batch resize product photos for Etsy, eBay, Amazon, Shopify, Pinterest, Poshmark and more, right in your browser.",
  openGraph: { type: "website", locale: "en_US", siteName: "Image Ready" },
};

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DocumentShell locale="en">{children}</DocumentShell>;
}
