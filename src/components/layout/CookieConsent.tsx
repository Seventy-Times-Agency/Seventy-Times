"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/i18n/context";
import styles from "@/components/layout/CookieConsent.module.css";

const STORAGE_KEY = "st-cookie-consent-v1";

type Choice = "accepted" | "essential";

/**
 * Lightweight cookie banner. We currently set only essential cookies
 * (the `lang` locale preference), but having an explicit acceptance
 * record makes adding analytics later (GA4 / Meta Pixel) a matter of
 * gating the script tag on this consent value rather than retrofitting
 * a banner under live traffic. Decision is persisted in localStorage.
 */
export default function CookieConsent() {
  const { t } = useT();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Slight delay so the banner doesn't fight the intro overlay.
        const t = window.setTimeout(() => setShow(true), 1400);
        return () => window.clearTimeout(t);
      }
    } catch {
      // localStorage may be blocked; just don't show the banner.
    }
  }, []);

  const decide = (choice: Choice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore — banner just won't reappear in this session
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.banner}
          role="dialog"
          aria-live="polite"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className={styles.text}>
            <strong>{t.cookieTitle}</strong> {t.cookieBody}{" "}
            <Link href="/privacy" className={styles.link}>
              {t.cookieLink}
            </Link>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btn}
              onClick={() => decide("essential")}
            >
              {t.cookieEssential}
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => decide("accepted")}
            >
              {t.cookieAccept}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
