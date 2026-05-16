/**
 * Service worker served as a Next route so the cache key can carry
 * the current build's id. Without this the static /sw.js shipped a
 * hardcoded `st-cache-v1` constant — every deploy reused the same
 * cache bucket and stale assets would shadow the new build until the
 * user did a hard reload.
 *
 * The body is identical to the original public/sw.js, with one
 * difference: the cache key is interpolated server-side from the
 * Next BUILD_ID at request time. Each new build gets a unique cache
 * name, the activate handler nukes everything that doesn't match,
 * and the new SW takes over on the next page load.
 */

export const runtime = "nodejs";
export const dynamic = "force-static";

// Stable filename across deploys (same URL the registration uses),
// but the body changes every build because BUILD_VERSION is baked in
// at build time. Browsers diff service workers byte-by-byte, so the
// new bytes trigger a re-install + activate.
const BUILD_VERSION =
  process.env.NEXT_PUBLIC_BUILD_ID ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  Date.now().toString(36);

const SW_BODY = `// Minimal stale-while-revalidate service worker.
// Cache key is build-specific so every deploy invalidates the previous
// bundle without manual version bumps.
const CACHE = "st-cache-${BUILD_VERSION}";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req);
      const networkPromise = fetch(req)
        .then((res) => {
          if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
          return res;
        })
        .catch(() => null);

      if (cached) {
        networkPromise.catch(() => {});
        return cached;
      }

      const network = await networkPromise;
      if (network) return network;

      if (req.mode === "navigate") {
        const fallback = await cache.match("/");
        if (fallback) return fallback;
      }

      return new Response("Offline", {
        status: 503,
        headers: { "Content-Type": "text/plain" },
      });
    })(),
  );
});
`;

export function GET() {
  return new Response(SW_BODY, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      // The route handler itself can be cached at the edge (it's
      // static for the lifetime of the build) but browsers should
      // re-check on every page load so a new build is picked up.
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Service-Worker-Allowed": "/",
    },
  });
}
