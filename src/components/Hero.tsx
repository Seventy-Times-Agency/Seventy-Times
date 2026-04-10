"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import styles from "./Hero.module.css";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <motion.div variants={container} initial="hidden" animate="visible">
        <motion.div variants={item} className={styles.badge}>
          <span className={styles.dot} />
          {siteConfig.tagline}
        </motion.div>

        <motion.h1 variants={item} className={styles.h1}>
          Автоматизируем <span className={styles.accent}>рост</span>
          <br />
          вашего бизнеса
        </motion.h1>

        <motion.p variants={item} className={styles.sub}>
          Таргетированная реклама, автоматизация процессов и AI-боты — всё, что
          нужно для масштабирования без хаоса и лишних сотрудников.
        </motion.p>

        <motion.div variants={item} className={styles.ctas}>
          <a href="#chat" className={styles.primary}>
            Поговорить с AI <span aria-hidden="true">→</span>
          </a>
          <a href="#services" className={styles.secondary}>
            Наши услуги
          </a>
        </motion.div>

        <motion.div variants={item} className={styles.stats}>
          {siteConfig.stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
