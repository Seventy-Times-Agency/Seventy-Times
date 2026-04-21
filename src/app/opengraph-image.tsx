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
          padding: "80px",
          background:
            "radial-gradient(circle at 30% 20%, #1a1f2e 0%, #0a0b10 60%, #000000 100%)",
          color: "#e8eef4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#a8b4c0",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#7be495",
              boxShadow: "0 0 16px #7be495",
            }}
          />
          {siteConfig.shortName}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 128,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 500,
              color: "#a8b4c0",
              letterSpacing: "-0.01em",
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#6c7480",
          }}
        >
          <span>Ads · Automation · AI</span>
          <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
