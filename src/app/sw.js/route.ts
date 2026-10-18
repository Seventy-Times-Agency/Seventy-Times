/**
 * Kill-switch service worker.
 *
 * Earlier builds shipped a stale-while-revalidate SW that cached
 * navigations. After a deploy the cached HTML still referenced the
 * previous build's hashed asset URLs (CSS chunks under
 * /_next/static/css/*) which no longer existed — visitors got the page
 * rendered with no styles at all. The build-versioned cache key fixed
 * future deploys but did nothing for clients already controlled by the
 * old SW, who saw a broken page until they reloaded.
 *
 * This body unregisters itself the moment it activates, wipes every
 * cache it owns, and reloads any client it's controlling. Every client
 * still on the old SW will fetch this on the next page load (the
 * registration revalidates `/sw.js` per the must-revalidate header),
 * install it, and self-evict — after that the site loads straight from
 * the network with no SW in the way.
 */

export const runtime = "nodejs";
export const dynamic = "force-static";

const SW_BODY = `self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      for (const client of clients) {
        try { client.navigate(client.url); } catch {}
      }
    })(),
  );
});

self.addEventListener("fetch", () => {});
`;

export function GET() {
  return new Response(SW_BODY, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Service-Worker-Allowed": "/",
    },
  });
}
