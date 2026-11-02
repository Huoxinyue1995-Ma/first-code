import type { Metadata } from "next";
import { type Locale, OG_LOCALE } from "@/lib/i18n";

// Canonical + hreflang for a page that exists in both languages.
export function bilingualMetadata(
  locale: Locale,
  paths: { en: string; es: string },
  meta: { title: string; description: string; absoluteTitle?: boolean; image?: { url: string; width: number; height: number; alt: string } },
): Metadata {
  const canonical = locale === "en" ? paths.en : paths.es;
  const image = meta.image;
  return {
    title: meta.absoluteTitle ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: { en: paths.en, es: paths.es, "x-default": paths.en },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url: canonical,
      siteName: "Resizet",
      title: meta.title,
      description: meta.description,
      ...(image && { images: [image] }),
    },
    ...(image && {
      twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [{ url: image.url, alt: image.alt }] },
    }),
  };
}

// Social preview for the home page: a 1200×630 screenshot of the batch resizer.
export const HOME_OG_IMAGE = {
  url: "/og/batch-image-resizer.jpg",
  width: 1200,
  height: 630,
  alt: "Resizet batch image resizer with six product photos and Etsy sizes selected",
};
