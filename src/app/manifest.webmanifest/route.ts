import { NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";
import { getLocaleMeta } from "@/lib/localizedMeta";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * PWA web-app manifest, localized by the visitor's `lang` cookie (set
 * by middleware / I18nProvider on every page view, so it's always
 * present by the time the browser fetches the manifest). A static
 * `app/manifest.ts` can't read the request, which is why this is a
 * route handler. The layout links it via `metadata.manifest`.
 */
export async function GET(req: Request) {
  const raw = req.headers
    .get("cookie")
    ?.match(/(?:^|;\s*)lang=(en|ru|de|ua)/)?.[1];
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const meta = getLocaleMeta(locale);

  return NextResponse.json(
    {
      name: `${siteConfig.name} — ${siteConfig.tagline}`,
      short_name: siteConfig.shortName,
      description: meta.description,
      lang: meta.ogLocale.replace("_", "-"),
      start_url: `/${locale}`,
      display: "standalone",
      background_color: "#0a0b10",
      theme_color: "#0a0b10",
      orientation: "portrait",
      icons: [
        {
          src: "/favicon.svg",
          sizes: "any",
          type: "image/svg+xml",
          purpose: "any",
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/manifest+json",
        // The manifest varies by cookie — keep caches private so one
        // visitor's language doesn't get served to another via a CDN.
        "Cache-Control": "private, max-age=3600",
      },
    },
  );
}
