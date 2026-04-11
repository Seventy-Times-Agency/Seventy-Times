"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./PageIntro.module.css";

const EASE = [0.85, 0, 0.15, 1] as const;

/**
 * 1.8-second cinematic intro: black screen with the IAA wordmark
 * fading in word by word, then sliding up to reveal the page.
 *
 * Shown only on the very first page load of the session — uses
 * sessionStorage so internal navigation doesn't replay it.
 */
export default function PageIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Replay only once per browser session
    const seen = sessionStorage.getItem("iaa-intro-seen");
    if (seen) {
      setVisible(false);
      return;
    }

    // Lock scroll while the intro is up
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("iaa-intro-seen", "1");
      document.body.style.overflow = prevOverflow;
    }, 1900);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.intro}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className={styles.content}>
            <motion.div
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              IAA agency / 2026
            </motion.div>

            <motion.div
              className={styles.wordmark}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            >
              ia<span className={styles.outline}>a</span>
            </motion.div>

            <motion.div
              className={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.7 }}
            >
              Ads <span className={styles.taglineDot} /> Automation{" "}
              <span className={styles.taglineDot} /> AI
            </motion.div>
          </div>

          <motion.div
            className={styles.bottomLine}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <span>USA → Worldwide</span>
            <span>Loading experience…</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
