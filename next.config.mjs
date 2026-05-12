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
const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = isDev
  ? "'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live"
  : "'self' 'unsafe-inline' https://vercel.live";
const CSP = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://vercel.live",
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
