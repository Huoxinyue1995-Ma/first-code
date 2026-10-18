import type { Metadata } from "next";
import { ImageEditor } from "@/components/image-editor";

export const metadata: Metadata = {
  title: {
    absolute: "Ecommerce Image Editor — Crop, Resize & Compress | Image Ready",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Image Ready",
    title: "Ecommerce Image Editor — Crop, Resize & Compress | Image Ready",
    description:
      "Crop, resize, and compress product images for Amazon, Shopify, and TikTok Shop directly in your browser. Your original images stay on your device.",
  },
};

export default function Home() {
  return <ImageEditor />;
}
