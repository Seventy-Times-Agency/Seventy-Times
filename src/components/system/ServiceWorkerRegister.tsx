"use client";

import { useEffect } from "react";

/**
 * Registers the stale-while-revalidate service worker once on mount,
 * skipping anything that isn't a real production page (Next dev
 * server hot-reloads cause SW caching weirdness, and crawlers /
 * test runners don't need it). Idempotent — registering twice is a
 * no-op since the browser de-duplicates on the same scope.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (window.location.hostname === "localhost") return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch(() => {
        // Registration can fail on private-mode / older Safari — silently
        // fine, the site still works without offline support.
      });
  }, []);

  return null;
}
