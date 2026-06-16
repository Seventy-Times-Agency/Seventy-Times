import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { LOCALES } from "@/i18n/config";
import { languageAlternates } from "@/lib/localizedMeta";
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

  const push = (
    path: string,
    priority: number,
    changeFrequency: NonNullable<
      MetadataRoute.Sitemap[number]["changeFrequency"]
    >,
  ) => {
    for (const locale of LOCALES) {
      entries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: languageAlternates(path) },
      });
    }
  };

  for (const page of PAGES) {
    push(page.path, page.priority, page.changeFrequency);
  }
  for (const item of CASES) {
    push(`/cases/${item.id}`, 0.6, "monthly");
  }
  for (const service of SERVICES) {
    push(`/services/${service.slug}`, 0.7, "monthly");
  }

  return entries;
}
