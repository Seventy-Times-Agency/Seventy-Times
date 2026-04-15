"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

type Props = {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** Pad the rendered number with leading zeros to this width. */
  pad?: number;
};

/**
 * Counts from `from` up to `to` once the element scrolls into view.
 *
 * Uses a native IntersectionObserver with an immediate
 * getBoundingClientRect check on mount to avoid the race condition
 * in framer-motion's useInView where elements already in the
 * viewport sometimes never fire, leaving the counter frozen at 0.
 * Renders the current value into a span via direct text mutation
 * (no React re-renders during the animation).
 */
export default function Counter({
  from = 0,
  to,
  duration = 1.8,
  prefix = "",
  suffix = "",
  pad = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  // Decide when to start: visible in viewport or already on screen at mount
  useEffect(() => {
    const node = ref.current;
    if (!node || started) return;

    // Immediate check — if element is already in view on mount, fire now
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.1, rootMargin: "-5% 0px" }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [started]);

  // Run the animation once we know we should start
  useEffect(() => {
    if (!started || !ref.current) return;
    const node = ref.current;

    const controls = animate(from, to, {
      duration,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate(value) {
        const rounded = Math.floor(value);
        const padded =
          pad > 0 ? String(rounded).padStart(pad, "0") : String(rounded);
        node.textContent = `${prefix}${padded}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [started, from, to, duration, prefix, suffix, pad]);

  return (
    <span ref={ref}>
      {prefix}
      {pad > 0 ? String(from).padStart(pad, "0") : from}
      {suffix}
    </span>
  );
}
