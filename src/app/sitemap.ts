import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = Object.fromEntries(
    LOCALES.map((l) => [l, `${siteConfig.url}?lang=${l}`])
  );

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ...alternates,
          "x-default": `${siteConfig.url}?lang=${DEFAULT_LOCALE}`,
        },
      },
    },
  ];
}
