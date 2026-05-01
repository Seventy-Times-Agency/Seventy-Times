"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/i18n/context";
import styles from "./ExitIntent.module.css";

const SHOWN_KEY = "st-exit-intent-shown-v1";
const ARM_DELAY_MS = 8000; // give the visitor at least 8s before arming

/**
 * Desktop-only exit-intent prompt. Fires once per session when the
 * cursor leaves through the top of the viewport (the canonical
 * "I'm closing this tab / typing in the address bar" signal).
 *
 * The CTA opens the regular lead modal via the #lead hash, so all
 * the existing form, validation, draft persistence and CRM fan-out
 * keep working unchanged.
 */
export default function ExitIntent() {
  const { t, localePath } = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Already shown this session — don't bother the user again.
    try {
      if (sessionStorage.getItem(SHOWN_KEY)) return;
    } catch {
      // sessionStorage blocked — assume not shown, fall through.
    }

    // Don't fire on touch devices (no real concept of "cursor leaving
    // the viewport top"). pointer:fine is the standard query for
    // hardware-pointer environments — desktops + most tablets-with-trackpad.
    const isFinePointer = window.matchMedia?.("(pointer: fine)").matches;
    if (!isFinePointer) return;

    let armed = false;
    const arm = () => {
      armed = true;
    };
    const armTimer = window.setTimeout(arm, ARM_DELAY_MS);

    const onMouseOut = (e: MouseEvent) => {
      if (!armed) return;
      // Only fire when the mouse leaves through the TOP edge — that's
      // the unambiguous "I'm aiming at the address bar / close button"
      // signal. Side or bottom exits are noise.
      if (e.clientY > 0) return;
      // Some browsers fire mouseout when moving over child elements;
      // require the related target to be null (left the document).
      if (e.relatedTarget) return;

      try {
        sessionStorage.setItem(SHOWN_KEY, "1");
      } catch {
        // ignore
      }
      setOpen(true);
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.close}
              onClick={close}
              aria-label={t.exitClose}
            >
              ×
            </button>

            <span className={styles.eyebrow}>{t.exitEyebrow}</span>
            <h3 id="exit-intent-title" className={styles.title}>
              {t.exitTitle}
            </h3>
            <p className={styles.body}>{t.exitBody}</p>

            <div className={styles.actions}>
              <a
                href={`${localePath("/")}#lead`}
                className={styles.primary}
                onClick={close}
              >
                {t.exitCta} <span aria-hidden="true">→</span>
              </a>
              <button
                type="button"
                className={styles.secondary}
                onClick={close}
              >
                {t.exitDismiss}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
