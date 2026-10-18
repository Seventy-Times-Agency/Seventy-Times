"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/MarqueeStack.module.css";

// Front tape — bold, brand presence: what we do. Stays English (proper
// nouns or industry-standard tags).
const TOP_ITEMS = [
  "Performance Marketing",
  "AI Automation",
  "Conversion-Driven",
  "Lead Engine",
  "Meta Ads",
  "Google Ads",
  "Telegram Bots",
  "CRM Integration",
  "Funnel Design",
  "Growth Systems",
  "Always Iterating",
];

// Back tape — the tools and patterns we actually work with.
const BOTTOM_ITEMS = [
  "GPT",
  "Gemini",
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Stripe",
  "Vercel",
  "Telegram Bot API",
  "n8n",
  "Make.com",
  "Zapier",
  "Conversion Attribution",
  "A/B Testing",
  "Pixel Tracking",
];

/**
 * Two crossed tapes running in opposite directions. The scroll loop is
 * plain CSS (cheap, compositor-only); the tilt follows page scroll so the
 * cross opens up and closes as the strip passes through the viewport.
 */
export default function MarqueeStack() {
  const { t } = useT();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const tiltFront = useTransform(scrollYProgress, [0, 1], [-1.5, -4]);
  const tiltBack = useTransform(scrollYProgress, [0, 1], [1.5, 4]);

  // Double the lists so the linear keyframe (0 → -50%) loops without
  // a visible seam.
  const topDoubled = [...TOP_ITEMS, ...TOP_ITEMS];
  const bottomDoubled = [...BOTTOM_ITEMS, ...BOTTOM_ITEMS];

  return (
    <section ref={ref} className={styles.wrap} aria-label={t.trustAria}>
      <motion.div
        className={`${styles.tape} ${styles.tapeBack}`}
        style={reduce ? { rotate: 3 } : { rotate: tiltBack }}
      >
        <div className={`${styles.track} ${styles.rowBottom}`}>
          {bottomDoubled.map((item, i) => (
            <span key={`b-${item}-${i}`} className={styles.itemBottom}>
              {item}
              <span className={styles.dotSm} />
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className={`${styles.tape} ${styles.tapeFront}`}
        style={reduce ? { rotate: -3 } : { rotate: tiltFront }}
      >
        <div className={`${styles.track} ${styles.rowTop}`}>
          {topDoubled.map((item, i) => (
            <span key={`t-${item}-${i}`} className={styles.itemTop}>
              {item}
              <span className={styles.dot} aria-hidden="true" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
