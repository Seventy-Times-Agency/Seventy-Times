"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/i18n/context";
import styles from "./ExitIntent.module.css";

const SHOWN_KEY = "st-exit-intent-shown-v1";
const ARM_DELAY_MS = 45000; // wait ~45s before the prompt is even eligible
const SCROLL_THRESHOLD_PX = 600; // user must scroll past the hero first

/**
 * Desktop-only exit-intent prompt. Fires once per session when the
 * cursor leaves through the top of the viewport (the canonical
 * "I'm closing this tab / typing in the address bar" signal).
 *
 * Arming requires BOTH a delay (so we don't pop up on a fresh visit)
 * AND that the user has scrolled past the hero — otherwise the prompt
 * is more annoying than useful. After a successful fire we both
 * persist the flag and detach the listener so re-entries don't
 * re-trigger it within the same session.
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

    // Already shown (or dismissed) this session — don't bother the user again.
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
    let scrolled = window.scrollY > SCROLL_THRESHOLD_PX;
    let fired = false;

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD_PX) {
        scrolled = true;
        window.removeEventListener("scroll", onScroll);
      }
    };
    if (!scrolled) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const armTimer = window.setTimeout(() => {
      armed = true;
    }, ARM_DELAY_MS);

    const cleanup = () => {
      window.clearTimeout(armTimer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };

    const onMouseOut = (e: MouseEvent) => {
      if (fired || !armed || !scrolled) return;
      // Only fire when the mouse leaves through the TOP edge — that's
      // the unambiguous "I'm aiming at the address bar / close button"
      // signal. Side or bottom exits are noise.
      if (e.clientY > 0) return;
      // Some browsers fire mouseout when moving over child elements;
      // require the related target to be null (left the document).
      if (e.relatedTarget) return;

      fired = true;
      try {
        sessionStorage.setItem(SHOWN_KEY, "1");
      } catch {
        // ignore
      }
      setOpen(true);
      cleanup();
    };

    document.addEventListener("mouseout", onMouseOut);
    return cleanup;
  }, []);

  const close = () => {
    // Re-affirm the dismissal flag. The mouseout handler already wrote
    // it on fire, but if anything cleared it (browser flush, etc.) we
    // make sure the prompt stays gone for the rest of the session.
    try {
      sessionStorage.setItem(SHOWN_KEY, "1");
    } catch {
      // ignore
    }
    setOpen(false);
  };

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
