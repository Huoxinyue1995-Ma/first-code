import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { GUIDES_ES } from "@/lib/guides-es";
import { PLATFORM_PAGES } from "@/lib/platforms";
import { PRIMARY_SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const url = (path: string) => `${PRIMARY_SITE_URL}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Pages that exist in English and Spanish: list both, each pointing at the other with hreflang.
  const bilingual: Array<{ en: string; es: string; priority: number }> = [
    { en: "/", es: "/es", priority: 1 },
    ...PLATFORM_PAGES.map((page) => ({ en: `/${page.slug.en}`, es: `/es/${page.slug.es}`, priority: 0.9 })),
    { en: "/custom-size", es: "/es/tamano-personalizado", priority: 0.8 },
    { en: "/pricing", es: "/es/pricing", priority: 0.6 },
    { en: "/privacy", es: "/es/privacy", priority: 0.3 },
    { en: "/terms", es: "/es/terms", priority: 0.3 },
    { en: "/guides", es: "/es/guias", priority: 0.7 },
    ...GUIDES_ES.map((guide) => ({ en: `/guides/${guide.enSlug}`, es: `/es/guias/${guide.slug}`, priority: 0.6 })),
  ];

  const entries: MetadataRoute.Sitemap = bilingual.flatMap((pair) => {
    const languages = { en: url(pair.en), es: url(pair.es) };
    return [
      { url: url(pair.en), lastModified: now, changeFrequency: "weekly" as const, priority: pair.priority, alternates: { languages } },
      { url: url(pair.es), lastModified: now, changeFrequency: "weekly" as const, priority: pair.priority, alternates: { languages } },
    ];
  });

  const englishOnly: MetadataRoute.Sitemap = ["/about", "/contact"].map((path) => ({
    url: url(path),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  // English guides without a Spanish translation (none today; kept for future guides).
  const translated = new Set(GUIDES_ES.map((guide) => guide.enSlug));
  const untranslated: MetadataRoute.Sitemap = GUIDES.filter((guide) => !translated.has(guide.slug)).map((guide) => ({
    url: url(`/guides/${guide.slug}`),
    lastModified: new Date(`${guide.updated}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...entries, ...englishOnly, ...untranslated];
}
