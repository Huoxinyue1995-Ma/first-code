import type { MetadataRoute } from "next";
import { GUIDES } from "../lib/guides";
import { PRIMARY_SITE_URL } from "../lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ["", "/guides", "/about", "/pricing", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${PRIMARY_SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/guides" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/guides" ? 0.8 : 0.5,
  }));

  const guides: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${PRIMARY_SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(`${guide.updated}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...guides];
}
