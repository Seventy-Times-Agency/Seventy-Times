"use client";

import { useEffect } from "react";

/**
 * Client-side error reporter. Catches `window.onerror` and unhandled
 * promise rejections and POSTs a compact summary to /api/error, where
 * Vercel logs surface them. No third-party SDK to install or babysit.
 *
 * Throttled per session (max one error every 5s, max 20 per page) so
 * a runaway component can't DoS the endpoint or our own logs.
 */
const SEND_INTERVAL_MS = 5000;
const MAX_PER_SESSION = 20;
// Stale-deploy chunk failures are recoverable by reload and not actionable
// from server logs — drop them before they reach the wire.
const CHUNK_ERROR_RE = /ChunkLoadError|Loading chunk [^ ]+ failed/i;

export default function ErrorReporter() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastSent = 0;
    let sentCount = 0;

    const send = (payload: Record<string, unknown>) => {
      const now = Date.now();
      if (sentCount >= MAX_PER_SESSION) return;
      if (now - lastSent < SEND_INTERVAL_MS) return;
      lastSent = now;
      sentCount++;
      try {
        fetch("/api/error", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            url: window.location.href,
            userAgent: navigator.userAgent,
          }),
          keepalive: true,
        }).catch(() => {});
      } catch {
        // ignore — best effort
      }
    };

    const onError = (e: ErrorEvent) => {
      if (CHUNK_ERROR_RE.test(e.message ?? "")) return;
      send({
        message: e.message,
        source: e.filename,
        line: e.lineno,
        column: e.colno,
        stack: e.error?.stack,
      });
    };

    const onRejection = (e: PromiseRejectionEvent) => {
      const reason = e.reason;
      const message =
        reason instanceof Error
          ? reason.message
          : typeof reason === "string"
            ? reason
            : "Unhandled promise rejection";
      if (CHUNK_ERROR_RE.test(message)) return;
      send({
        message,
        stack: reason instanceof Error ? reason.stack : undefined,
      });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
