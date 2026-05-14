import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config";
import { CASES } from "@/data/cases";
import { SERVICES } from "@/data/services";

const PAGES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/team", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

// Frozen at build time so the sitemap doesn't claim "everything was
// updated this second" on every request — Google deprioritises feeds
// where every URL has the same always-current lastmod, treating the
// signal as noise.
const BUILD_TIME = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const now = BUILD_TIME;
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    for (const locale of LOCALES) {
      const url = `${siteConfig.url}/${locale}${page.path}`;
      const languages = Object.fromEntries(
        LOCALES.map((l) => [l, `${siteConfig.url}/${l}${page.path}`]),
      );
      entries.push({
        url,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            ...languages,
            "x-default": `${siteConfig.url}/${DEFAULT_LOCALE}${page.path}`,
          },
        },
      });
    }
  }

  for (const item of CASES) {
    for (const locale of LOCALES) {
      const url = `${siteConfig.url}/${locale}/cases/${item.id}`;
      const languages = Object.fromEntries(
        LOCALES.map((l) => [l, `${siteConfig.url}/${l}/cases/${item.id}`]),
      );
      entries.push({
        url,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            ...languages,
            "x-default": `${siteConfig.url}/${DEFAULT_LOCALE}/cases/${item.id}`,
          },
        },
      });
    }
  }

  for (const service of SERVICES) {
    for (const locale of LOCALES) {
      const url = `${siteConfig.url}/${locale}/services/${service.slug}`;
      const languages = Object.fromEntries(
        LOCALES.map((l) => [
          l,
          `${siteConfig.url}/${l}/services/${service.slug}`,
        ]),
      );
      entries.push({
        url,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            ...languages,
            "x-default": `${siteConfig.url}/${DEFAULT_LOCALE}/services/${service.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
