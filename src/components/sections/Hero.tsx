"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import TeamClocks from "@/components/ui/TeamClocks";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/Hero.module.css";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0.22 },
  visible: {
      opacity: 1,
    transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function Hero() {
  const { t, localePath } = useT();


  return (
    <section id="top" className={styles.hero}>
      <span className={styles.heroWordmark} aria-hidden="true">
        70<span className={styles.heroWordmarkOutline}>×</span>
      </span>

      <motion.div variants={container} initial="hidden" animate="visible">
        {/* Editorial meta strip */}
        <motion.div variants={item} className={styles.meta}>
          <span className={styles.metaLeft}>
            <span className={styles.metaLine} />
            {t.heroMeta1}
          </span>
          <span className={styles.metaRight}>
            {t.heroMeta3}
            <span className={styles.metaLine} />
          </span>
        </motion.div>

        {/* Massive editorial title with mask-reveal animation */}
        <h1 className={styles.title}>
          <span className={styles.titleBlock}>
            <span className={styles.titleRow}>
              <AnimatedText immediate delay={0.25} words={[t.heroTitle1]} />
            </span>
            <span className={styles.titleRow}>
              <AnimatedText
                immediate
                delay={0.35}
                words={[
                  { text: t.heroTitle2, className: styles.titleOutline },
                  { text: t.heroTitle3, className: "shimmer" },
                ]}
              />
            </span>
            <span className={styles.titleRow}>
              <AnimatedText immediate delay={0.55} words={[t.heroTitle4]} />
            </span>
          </span>
        </h1>

        {/* Sub + CTAs */}
        <motion.div variants={item} className={styles.grid}>
          <p className={styles.sub}>{t.heroSub}</p>

          <div className={styles.actions}>
            <div className={styles.actionsRow}>
              <a href="#lead" className={styles.primary}>
                {t.heroCta1}
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </a>
              <Link href={localePath("/process")} className={styles.secondary}>
                {t.heroCta2}
              </Link>
            </div>
            <span className={styles.hint}>{t.heroHint}</span>
          </div>
        </motion.div>

        {/* Team time zones — live 24 h dials, green while an office works */}
        <motion.div variants={item} className={styles.stats} role="group" aria-label={t.clocksLabel}>
          <TeamClocks />
        </motion.div>
      </motion.div>
    </section>
  );
}
