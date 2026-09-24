import type { MetadataRoute } from "next";
import { hasSiteUrl, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const rules = { userAgent: "*", allow: "/" };
  if (hasSiteUrl) {
    return {
      rules,
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  }
  return { rules };
}