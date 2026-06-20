import { siteConfig } from "@/data/siteConfig";
import { CASES, caseCardContent } from "@/data/cases";
import { DEFAULT_LOCALE } from "@/i18n/config";

export const dynamic = "force-static";

/**
 * Minimal RSS 2.0 feed. Until we ship a real blog, the feed surfaces
 * portfolio cases as items so feed readers and aggregators have
 * something useful to show. Once the blog lands, prepend its posts to
 * the channel and case items can stay as evergreen entries.
 */
function escape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const now = new Date().toUTCString();

  const items = CASES.map((c) => {
    const url = `${siteConfig.url}/${DEFAULT_LOCALE}/cases/${c.id}`;
    const { title, summary } = caseCardContent(c, DEFAULT_LOCALE);
    return `
    <item>
      <title>${escape(title)}</title>
      <link>${escape(url)}</link>
      <guid isPermaLink="true">${escape(url)}</guid>
      <pubDate>${now}</pubDate>
      <description>${escape(summary)}</description>
    </item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(siteConfig.name)}</title>
    <link>${escape(siteConfig.url)}</link>
    <description>${escape(siteConfig.description)}</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${escape(siteConfig.url)}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
