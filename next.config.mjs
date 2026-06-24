/** @type {import('next').NextConfig} */

// Content Security Policy.
// - 'unsafe-inline' on scripts is still needed because Next.js inlines
//   the RSC payload bootstrap on every page. Switching to nonces means
//   wiring `headers()` through a middleware which we'd rather avoid for
//   a static-first marketing site. 'unsafe-eval' is NOT needed —
//   Framer Motion 11's production build does not call eval/new Function.
// - api.anthropic.com and api.telegram.org are server-side only and do
//   not need a connect-src entry.
// - dev mode loosens script-src so HMR can still patch modules.
// Analytics / advertising tag domains. These are listed unconditionally
// — the tags themselves only load when the matching NEXT_PUBLIC_* env var
// is set (see components/system/TagManager.tsx), so allowing the domains
// here is harmless when the tags are absent and avoids a CSP edit later.
//   GTM / GA4: googletagmanager.com (script) + the GA endpoints (connect)
//   Meta Pixel: connect.facebook.net (script + connect), facebook.com (img)
const TAG_SCRIPT_SRC =
  "https://www.googletagmanager.com https://connect.facebook.net";
const TAG_CONNECT_SRC =
  "https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://connect.facebook.net";
const TAG_IMG_SRC = "https://www.facebook.com";

const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = isDev
  ? `'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live ${TAG_SCRIPT_SRC}`
  : `'self' 'unsafe-inline' https://vercel.live ${TAG_SCRIPT_SRC}`;
const CSP = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  `img-src 'self' data: blob: https: ${TAG_IMG_SRC}`,
  `connect-src 'self' https://vercel.live ${TAG_CONNECT_SRC}`,
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
