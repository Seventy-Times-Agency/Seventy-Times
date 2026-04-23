"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global smooth scroll via Lenis, wheel only.
 *
 * Skipped on:
 *   - prefers-reduced-motion (accessibility)
 *   - coarse pointers / touch devices — mobile browsers already have
 *     momentum scrolling and Lenis's rAF loop competes with the
 *     native compositor, producing jank on exactly the devices that
 *     are least able to absorb it.
 *
 * Mounts once at the layout level. Native scroll position still
 * advances under the hood, so framer-motion useScroll, sticky
 * positioning and anchor links keep working.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
