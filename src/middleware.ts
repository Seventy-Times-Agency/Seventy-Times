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

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase() ?? "";

  // Empty UA on /api routes is suspicious. Real browsers always send one.
  if (req.nextUrl.pathname.startsWith("/api/") && ua.trim().length === 0) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (BAD_UA.some((pattern) => ua.includes(pattern))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  // Run on API routes (where the real damage happens) and the root doc
  // so scanners that probe `/` also bounce. Static assets and Next.js
  // internals are excluded.
  matcher: ["/", "/api/:path*"],
};
