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

// Bottom row — smaller, calmer. The actual tools, languages and
// patterns we work with. Mix of recognizable brands (Claude, Stripe…)
// and "if you know, you know" technical terms (RAG pipelines, edge
// functions…). The point is texture, not advertising.
const BOTTOM_ITEMS = [
  "Claude",
  "GPT-4",
  "Gemini",
  "Next.js 14",
  "React 18",
  "TypeScript",
  "Python",
  "Node.js",
  "SQL",
  "Tailwind",
  "Framer Motion",
  "Vercel",
  "Notion API",
  "Telegram Bot API",
  "Stripe",
  "n8n",
  "Make.com",
  "Zapier",
  "Airtable",
  "Figma",
  "Server-side Rendering",
  "Edge Functions",
  "Token Streaming",
  "RAG Pipelines",
  "Vector Embeddings",
  "Webhook Orchestration",
  "Conversion Attribution",
  "A/B Testing",
  "Multi-step Workflows",
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
