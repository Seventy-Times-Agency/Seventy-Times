import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/siteConfig";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 80% 60% at 35% 20%, #1c2233 0%, #0a0b10 55%, #06060c 100%)",
          color: "#e8eef4",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Massive 70× watermark on the right edge */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: -40,
            transform: "translateY(-50%)",
            fontSize: 520,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.06em",
            color: "rgba(200, 212, 222, 0.06)",
            display: "flex",
          }}
        >
          70×
        </div>

        {/* Top row — status + brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#a8b4c0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 16px #4ade80",
              }}
            />
            Accepting projects · 2026
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              textTransform: "none",
              color: "#e8eef4",
            }}
          >
            70<span style={{ color: "#c8d4de", fontStyle: "italic" }}>×</span>
          </div>
        </div>

        {/* Headline block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#e8eef4",
            }}
          >
            Marketing × AI × Automation
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#c8d4de",
            }}
          >
            = one growth machine.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 26,
              color: "#a8b4c0",
              maxWidth: 880,
              lineHeight: 1.4,
            }}
          >
            Launched in 30 days, optimised in 90. Ads, AI, automation and sites
            wired into a single working system.
          </div>
        </div>

        {/* Bottom row — services + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#6c7480",
          }}
        >
          <span>Ads · Automation · AI · Sites</span>
          <span style={{ color: "#a8b4c0" }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
