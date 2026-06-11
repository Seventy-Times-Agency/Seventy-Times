import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/siteConfig";
import { getLocaleMeta } from "@/lib/localizedMeta";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: { locale: string } };

// Localized og:image:alt — the card itself is also rendered in the
// page's language below.
export function generateImageMetadata({ params }: Props) {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  return [
    {
      id: "og",
      alt: getLocaleMeta(locale).ogImageAlt,
      size,
      contentType,
    },
  ];
}

export default function OpengraphImage({ params }: Props) {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  // "Marketing · AI · Automation" → "Marketing × AI × Automation":
  // same string the hero uses, with the brand's × as the separator.
  const headline = t.heroMeta1.replace(/·/g, "×");
  const services = [t.ftAds, t.ftAutomation, t.ftBots].join(" · ");

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
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 16px #4ade80",
              }}
            />
            {t.navStatus} · 2026
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
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#e8eef4",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#c8d4de",
            }}
          >
            {t.heroTitle4}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 24,
              color: "#a8b4c0",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {t.heroSub}
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
          <span>{services}</span>
          <span style={{ color: "#a8b4c0" }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
