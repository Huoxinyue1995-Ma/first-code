export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "es";
}

// Builds a site path for a locale. English lives at the root; Spanish under /es.
export function localePath(locale: Locale, path: string) {
  const clean = path === "/" ? "" : path;
  return locale === "en" ? clean || "/" : `/es${clean}`;
}

export const HTML_LANG: Record<Locale, string> = { en: "en", es: "es" };
export const OG_LOCALE: Record<Locale, string> = { en: "en_US", es: "es_ES" };
