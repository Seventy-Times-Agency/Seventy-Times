"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/i18n/context";
import styles from "./MobileStickyCta.module.css";

/**
 * Mobile-only sticky lead-capture button. Slides in from the bottom
 * once the user has scrolled past the hero and stays glued to the
 * viewport until they scroll back up, open the lead modal, or hit
 * the footer. Desktop is untouched — the regular Nav CTA already
 * lives in the visible chrome there.
 */
export default function MobileStickyCta() {
  const { t, localePath } = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after the user is clearly below the hero. 600px is a
      // safe threshold across phone screen sizes.
      const past = window.scrollY > 600;
      // Hide when the lead modal is open (hash → #lead) — otherwise
      // the button overlaps the modal's submit on mobile.
      const modalOpen = window.location.hash === "#lead";
      // Tuck away near the footer so the bottom CTA on the landing
      // page (CTA section + footer) isn't doubled up.
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 320;
      setVisible(past && !modalOpen && !nearBottom);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="sticky-cta"
          href={`${localePath("/")}#lead`}
          className={styles.cta}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span>{t.heroCta1}</span>
          <span aria-hidden="true">→</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
