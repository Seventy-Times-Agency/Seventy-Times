"use client";

import { useEffect } from "react";

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
            We've been notified and are looking into it. Refresh, or come back
            in a moment.
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
