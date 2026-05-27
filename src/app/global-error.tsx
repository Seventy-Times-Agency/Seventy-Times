"use client";

import { useEffect } from "react";

// A stale Vercel deploy leaves the previous HTML referencing chunk URLs
// whose hashed filenames no longer exist on the new build. The user
// can't fix this — but a single hard reload pulls the fresh entry HTML
// and resolves it transparently. Match webpack's ChunkLoadError and the
// generic "Loading chunk N failed" string Next.js surfaces.
const CHUNK_ERROR_RE = /ChunkLoadError|Loading chunk [^ ]+ failed/i;
const RELOAD_GUARD_KEY = "st-chunk-reload-at";
const RELOAD_COOLDOWN_MS = 30_000;

/**
 * Last-resort error boundary for catastrophic render failures.
 * Replaces the entire page (so it must define its own <html> /
 * <body>) and tries to ship the error to /api/error so we can see
 * it in Vercel logs.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const isChunkError = CHUNK_ERROR_RE.test(error.message ?? "");

    if (isChunkError && typeof window !== "undefined") {
      // Guard against an infinite reload loop if the chunk is genuinely
      // gone (e.g. CDN problem rather than a redeploy).
      let last = 0;
      try {
        last = Number(sessionStorage.getItem(RELOAD_GUARD_KEY) ?? "0");
      } catch {
        // sessionStorage can throw in privacy modes — fall through.
      }
      if (Date.now() - last > RELOAD_COOLDOWN_MS) {
        try {
          sessionStorage.setItem(RELOAD_GUARD_KEY, String(Date.now()));
        } catch {
          // ignore
        }
        window.location.reload();
        return;
      }
      // Already reloaded once in the last 30s and it still failed —
      // skip the alert (it's not actionable from our side) and show
      // the static error UI so the user has a way out.
      return;
    }

    try {
      fetch("/api/error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          source: "global-error",
          url:
            typeof window !== "undefined" ? window.location.href : undefined,
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // ignore
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0b10",
          color: "#e8eef4",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <h1
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: -0.04,
              margin: 0,
            }}
          >
            70<span style={{ fontStyle: "italic", opacity: 0.4 }}>×</span>
          </h1>
          <h2 style={{ fontSize: 22, margin: "8px 0 16px" }}>
            Something broke on our side.
          </h2>
          <p style={{ color: "#9aa4b1", lineHeight: 1.55 }}>
            We&apos;ve been notified and are looking into it. Refresh, or come
            back in a moment.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 20,
              padding: "12px 24px",
              borderRadius: 999,
              background: "#c8d4de",
              color: "#0a0b10",
              border: 0,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try again →
          </button>
        </div>
      </body>
    </html>
  );
}
