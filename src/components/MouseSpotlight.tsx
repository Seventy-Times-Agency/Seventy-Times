"use client";

import { useEffect, useRef } from "react";
import styles from "./MouseSpotlight.module.css";

/**
 * Soft radial spotlight that follows the cursor.
 * Runs purely via CSS variables + ref to avoid re-renders on every
 * mouse move. Disabled on touch devices and narrow viewports.
 */
export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;

    const apply = () => {
      el.style.setProperty("--mx", `${pendingX}px`);
      el.style.setProperty("--my", `${pendingY}px`);
      rafId = 0;
    };

    const onMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      el.style.opacity = "1";
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={ref} className={styles.spotlight} aria-hidden="true" />;
}
