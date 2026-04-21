"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/i18n/context";
import styles from "./PageIntro.module.css";

const EASE = [0.85, 0, 0.15, 1] as const;
const INTRO_DURATION = 1200;

/**
 * Cinematic intro shown once per browser session. User can press any
 * key or the Skip button to dismiss early.
 *
 * Dispatches a `st-intro-gone` event the moment the overlay starts
 * exiting, so scroll-linked animations in the hero wait until the
 * user can actually see them.
 */
export default function PageIntro() {
  const [visible, setVisible] = useState(true);
  const { t } = useT();

  const markGone = () => {
    try {
      sessionStorage.setItem("st-intro-seen", "1");
    } catch {
      // ignore
    }
    try {
      window.dispatchEvent(new Event("st-intro-gone"));
    } catch {
      // ignore
    }
  };

  const dismiss = useCallback(() => {
    setVisible(false);
    markGone();
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem("st-intro-seen");
    if (seen) {
      setVisible(false);
      // Fire the event on next tick so hero mounts can subscribe first.
      setTimeout(() => {
        window.dispatchEvent(new Event("st-intro-gone"));
      }, 0);
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setVisible(false);
      markGone();
      document.body.style.overflow = prevOverflow;
    }, INTRO_DURATION);

    const onKey = () => {
      window.clearTimeout(timer);
      setVisible(false);
      markGone();
      document.body.style.overflow = prevOverflow;
    };
    window.addEventListener("keydown", onKey, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
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
          transition={{ duration: 0.8, ease: EASE }}
        >
          <button
            type="button"
            className={styles.skipBtn}
            onClick={dismiss}
            aria-label="Skip"
          >
            Skip →
          </button>

          <div className={styles.content}>
            <motion.div
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Seventy Times / 2026
            </motion.div>

            <motion.div
              className={styles.wordmark}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            >
              70<span className={styles.outline}>×</span>
            </motion.div>

            <motion.div
              className={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
            >
              {t.introTag1} <span className={styles.taglineDot} /> {t.introTag2}{" "}
              <span className={styles.taglineDot} /> {t.introTag3}
            </motion.div>
          </div>

          <motion.div
            className={styles.bottomLine}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <span>{t.introLocation}</span>
            <span>{t.introLoading}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
