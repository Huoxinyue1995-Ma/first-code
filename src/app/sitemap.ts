import type { MetadataRoute } from "next";
import { PRIMARY_SITE_URL } from "../lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy", "/terms", "/contact", "/pricing"].map((path) => ({
    url: `${PRIMARY_SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.5,
  }));
}
