import type { Metadata } from "next";
import { type Locale, OG_LOCALE } from "@/lib/i18n";

// Canonical + hreflang for a page that exists in both languages.
export function bilingualMetadata(
  locale: Locale,
  paths: { en: string; es: string },
  meta: { title: string; description: string; absoluteTitle?: boolean },
): Metadata {
  const canonical = locale === "en" ? paths.en : paths.es;
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
      siteName: "Image Ready",
      title: meta.title,
      description: meta.description,
    },
  };
}
