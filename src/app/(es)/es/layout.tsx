import type { Metadata } from "next";
import { DocumentShell } from "@/components/document-shell";
import { PRIMARY_SITE_URL } from "@/lib/site";
import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(PRIMARY_SITE_URL),
  title: { default: "Image Ready", template: "%s | Image Ready" },
  description:
    "Redimensiona en lote fotos de producto para Etsy, eBay, Amazon, Shopify, Pinterest, Poshmark y más, directamente en tu navegador.",
  openGraph: { type: "website", locale: "es_ES", siteName: "Image Ready" },
};

export default function SpanishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DocumentShell locale="es">{children}</DocumentShell>;
}
