import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

const SUPPORTED_LOCALES = new Set(["en", "ru", "de"]);

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase() ?? "";

  // Empty UA on /api routes is suspicious. Real browsers always send one.
  if (req.nextUrl.pathname.startsWith("/api/") && ua.trim().length === 0) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (BAD_UA.some((pattern) => ua.includes(pattern))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // ?lang=ru|de|en sets the locale cookie and 308-redirects to the clean
  // URL. Lets shared / hreflang links land on the right language without
  // polluting analytics with query strings.
  //
  // Note on Vary: ideally we'd append `Vary: Cookie` here so shared caches
  // key on the locale, but Next.js App Router rewrites the Vary header for
  // its own RSC streaming after middleware runs, so a custom Vary doesn't
  // survive. The cookie-based SSR + ?lang= redirect still gives every
  // visitor the right content; full proper locale routing (e.g. /ru, /de
  // path prefixes) is the next-iteration fix.
  const langParam = req.nextUrl.searchParams.get("lang");
  if (langParam && SUPPORTED_LOCALES.has(langParam)) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("lang");
    const res = NextResponse.redirect(url, 308);
    res.cookies.set("lang", langParam, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  // Run on the root doc (so scanners that probe `/` bounce, and ?lang=
  // redirects work) and on /api/* (where the real damage happens). Static
  // assets and Next.js internals are excluded.
  matcher: ["/", "/api/:path*"],
};
