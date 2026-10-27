import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
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
    { en: "/pricing", es: "/es/pricing", priority: 0.6 },
    { en: "/privacy", es: "/es/privacy", priority: 0.3 },
    { en: "/terms", es: "/es/terms", priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = bilingual.flatMap((pair) => {
    const languages = { en: url(pair.en), es: url(pair.es) };
    return [
      { url: url(pair.en), lastModified: now, changeFrequency: "weekly" as const, priority: pair.priority, alternates: { languages } },
      { url: url(pair.es), lastModified: now, changeFrequency: "weekly" as const, priority: pair.priority, alternates: { languages } },
    ];
  });

  const englishOnly: MetadataRoute.Sitemap = ["/guides", "/about", "/contact"].map((path) => ({
    url: url(path),
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/guides" ? 0.7 : 0.4,
  }));

  const guides: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: url(`/guides/${guide.slug}`),
    lastModified: new Date(`${guide.updated}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...entries, ...englishOnly, ...guides];
}
