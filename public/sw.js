// Minimal stale-while-revalidate service worker.
// Goals (kept narrow on purpose):
//   1. Same-origin GET requests get a fast cached response when one
//      exists, with the network response refreshing the cache in the
//      background. Repeat visits feel instant; cache stays fresh.
//   2. Navigation requests fall back to the previously cached HTML
//      when the network is unavailable, so the site keeps loading
//      on flaky connections.
// Anything HTML-form (POST), API calls, opaque cross-origin requests
// pass straight through — never cached.

const CACHE = "st-cache-v1";

self.addEventListener("install", () => {
  // Claim the new SW as soon as install finishes; old controllers
  // get retired in the next event loop turn.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Drop any caches that don't match the current version key.
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
          // Only cache 200 responses — partials and errors poison the cache.
          if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
          return res;
        })
        .catch(() => null);

      if (cached) {
        // Don't await the network refresh — return the cache fast.
        networkPromise.catch(() => {});
        return cached;
      }

      const network = await networkPromise;
      if (network) return network;

      // Last resort: try a cached navigation entry so the user at
      // least sees the previous version of the page they wanted.
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
