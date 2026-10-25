import type { MetadataRoute } from "next";
import { PRIMARY_SITE_URL } from "../lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/login", "/api/"],
    },
    sitemap: `${PRIMARY_SITE_URL}/sitemap.xml`,
  };
}
