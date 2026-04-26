import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = Object.fromEntries(
    LOCALES.map((l) => [l, `${siteConfig.url}?lang=${l}`])
  );
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ...alternates,
          "x-default": `${siteConfig.url}?lang=${DEFAULT_LOCALE}`,
        },
      },
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
