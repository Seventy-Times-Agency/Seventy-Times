"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./CustomCursor.module.css";

/**
 * Two-element cursor: a tiny dot that pins exactly to the cursor and
 * a larger ring that lags behind via a spring. The ring scales up
 * over interactive elements (a, button, [role=button], inputs).
 *
 * mix-blend-mode: difference makes both elements invert whatever
 * they pass over, so the cursor stays visible on dark and light
 * areas without changing color.
 *
 * Disabled on touch devices and narrow viewports via CSS.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 320, damping: 28, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 320, damping: 28, mass: 0.4 });
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 320, damping: 25 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.innerWidth < 820) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, label"
      );
      scale.set(interactive ? 2.4 : 1);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [dotX, dotY, scale]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className={styles.dot}
        style={{ x: dotX, y: dotY }}
        aria-hidden="true"
      />
      <motion.div
        className={styles.ring}
        style={{ x: ringX, y: ringY, scale: springScale }}
        aria-hidden="true"
      />
    </>
  );
}
