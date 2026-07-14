"use client";

import { useT } from "@/i18n/context";
import styles from "@/components/sections/MarqueeStack.module.css";

// Top row — bold, brand presence. Mixes service positioning with the
// platforms we run on. Stays English (these are proper nouns or
// industry-standard tags).
const TOP_ITEMS = [
  "Performance Marketing",
  "AI Automation",
  "Conversion-Driven",
  "Lead Engine",
  "Meta Ads",
  "Google Ads",
  "TikTok Ads",
  "Telegram Bots",
  "CRM Integration",
  "Funnel Design",
  "Growth Systems",
  "Always Iterating",
];

// Bottom row — smaller, calmer. A tight, recognizable set of the tools
// and patterns we actually work with. Trimmed from a longer word-salad
// (removed obscure jargon and version numbers that age badly — e.g.
// "Next.js 14"/"GPT-4") so it reads as texture, not a bloated tech dump.
const BOTTOM_ITEMS = [
  "Claude",
  "GPT",
  "Gemini",
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Stripe",
  "Vercel",
  "Notion API",
  "Telegram Bot API",
  "n8n",
  "Make.com",
  "Zapier",
  "Conversion Attribution",
  "A/B Testing",
  "Pixel Tracking",
];

export default function MarqueeStack() {
  const { t } = useT();

  // Double the lists so the linear keyframe (0 → -50%) loops without
  // a visible seam.
  const topDoubled = [...TOP_ITEMS, ...TOP_ITEMS];
  const bottomDoubled = [...BOTTOM_ITEMS, ...BOTTOM_ITEMS];

  return (
    <section className={styles.wrap} aria-label={t.trustAria}>
      <div className={styles.rowTop}>
        {topDoubled.map((item, i) => (
          <span key={`t-${item}-${i}`} className={styles.itemTop}>
            {item}
            <span className={styles.dot} />
          </span>
        ))}
      </div>

      <div className={styles.rowBottom}>
        {bottomDoubled.map((item, i) => (
          <span key={`b-${item}-${i}`} className={styles.itemBottom}>
            {item}
            <span className={styles.dotSm} />
          </span>
        ))}
      </div>
    </section>
  );
}
