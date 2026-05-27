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

  // No locale prefix → always redirect to the default locale (English).
  // Browser Accept-Language is intentionally ignored: the agency operates
  // in English first, RU/DE/UA are opt-in via the language switcher or
  // a direct /ru / /de / /ua URL. This keeps marketing analytics, ad-link
  // landings and shared screenshots predictable.
  // Set the cookie on the redirect itself so the very next request
  // already carries it — without this every fresh visitor pays for
  // the redirect on every page load.
  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${url.pathname === "/" ? "" : url.pathname}`;
  const res = NextResponse.redirect(url, 307);
  res.cookies.set("lang", DEFAULT_LOCALE, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}

export const config = {
  // Protect /api/* and run on every other route (so `/`, `/about`, etc.
  // get redirected to a locale-prefixed URL). Static assets and Next.js
  // internals stay excluded.
  matcher: [
    "/((?!_next/static|_next/image|favicon|opengraph-image|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
