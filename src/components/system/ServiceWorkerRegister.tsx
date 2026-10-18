"use client";

import { useEffect } from "react";

/**
 * Used to register a stale-while-revalidate SW that cached the landing
 * HTML; a deploy with new hashed CSS URLs left existing visitors stuck
 * on a page referencing assets that no longer existed — the DOM showed
 * up with no styles at all. /sw.js now serves a kill-switch body that
 * unregisters itself on activate, and we proactively unregister any
 * existing registration here so the slot is freed for visitors whose
 * kill SW has already run.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (window.location.hostname === "localhost") return;

    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => Promise.all(regs.map((r) => r.unregister())))
      .catch(() => {});
  }, []);

  return null;
}
