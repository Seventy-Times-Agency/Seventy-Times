"use client";

import { useT } from "@/i18n/context";
import styles from "@/components/sections/TrustBar.module.css";

// Honest trust signals only — every entry is something we actually
// integrate with or run campaigns on. No partner / certification badges
// without the matching credentials. Keep it that way.
const POWERED_BY = [
  { name: "Claude", label: "Claude" },
  { name: "Next.js", label: "Next.js" },
  { name: "Vercel", label: "Vercel" },
  { name: "Telegram", label: "Telegram API" },
  { name: "Notion", label: "Notion API" },
];

const ADS_PLATFORMS = [
  { name: "Meta", label: "Meta Ads" },
  { name: "Google", label: "Google Ads" },
  { name: "TikTok", label: "TikTok Ads" },
];

export default function TrustBar() {
  const { t } = useT();

  return (
    <section className={styles.section} aria-label={t.trustAria}>
      <div className={styles.row}>
        <span className={styles.label}>{t.trustPoweredBy}</span>
        <div className={styles.items}>
          {POWERED_BY.map((item) => (
            <span key={item.name} className={styles.item}>
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.row}>
        <span className={styles.label}>{t.trustWeRunAdsOn}</span>
        <div className={styles.items}>
          {ADS_PLATFORMS.map((item) => (
            <span key={item.name} className={styles.item}>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
