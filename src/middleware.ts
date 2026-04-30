import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "@/i18n/config";

// Obvious scanner / bad-bot user agents. Real browsers never send these,
// and search-engine crawlers (Googlebot, Bingbot, DuckDuckBot) aren't on
// the list — they're welcome to index the page.
const BAD_UA = [
  "sqlmap",
  "nikto",
  "nmap",
  "masscan",
  "wpscan",
  "acunetix",
  "nessus",
  "netsparker",
  "havij",
  "fuzz",
  "dirbuster",
  "gobuster",
  "wfuzz",
  "zgrab",
  "zmap",
  "semrushbot",
  "mj12bot",
  "ahrefsbot",
  "dotbot",
  "petalbot",
];

const LOCALE_PREFIX = new RegExp(`^/(${LOCALES.join("|")})(?=/|$)`);

function preferredLocaleFromAcceptLanguage(value: string | null): Locale {
  if (!value) return DEFAULT_LOCALE;
  // Accept-Language is a comma-separated list of language tags with
  // optional ;q= quality. Take the first tag that maps to a supported
  // locale; otherwise fall back to the default.
  const tags = value
    .split(",")
    .map((t) => t.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);
  for (const tag of tags) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase() ?? "";

  // Empty UA on /api routes is suspicious. Real browsers always send one.
  if (req.nextUrl.pathname.startsWith("/api/") && ua.trim().length === 0) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (BAD_UA.some((pattern) => ua.includes(pattern))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Skip /api/* — those routes don't have or need a locale.
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Legacy ?lang=ru|de|en query: set the cookie and 308-redirect to the
  // locale-prefixed clean URL. Lets shared / hreflang links land on the
  // right language without polluting analytics with query strings.
  const langParam = req.nextUrl.searchParams.get("lang");
  if (langParam && isLocale(langParam)) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("lang");
    url.pathname = `/${langParam}${url.pathname === "/" ? "" : url.pathname}`;
    const res = NextResponse.redirect(url, 308);
    res.cookies.set("lang", langParam, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  // Detect locale prefix in the URL.
  const match = req.nextUrl.pathname.match(LOCALE_PREFIX);
  if (match) {
    const locale = match[1] as Locale;
    // Refresh the cookie so subsequent visits without a prefix remember
    // the user's last choice.
    const res = NextResponse.next({
      request: {
        headers: new Headers({
          ...Object.fromEntries(req.headers),
          "x-locale": locale,
        }),
      },
    });
    res.cookies.set("lang", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  // No locale prefix → pick one (cookie > Accept-Language > default)
  // and redirect once so the URL truthfully reflects the language.
  const cookieLocale = req.cookies.get("lang")?.value;
  const preferred: Locale = isLocale(cookieLocale)
    ? cookieLocale
    : preferredLocaleFromAcceptLanguage(req.headers.get("accept-language"));

  const url = req.nextUrl.clone();
  url.pathname = `/${preferred}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Protect /api/* and run on every other route (so `/`, `/about`, etc.
  // get redirected to a locale-prefixed URL). Static assets and Next.js
  // internals stay excluded.
  matcher: [
    "/((?!_next/static|_next/image|favicon|opengraph-image|robots.txt|sitemap.xml|.*\\.[a-z]+$).*)",
  ],
};
