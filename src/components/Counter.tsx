"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

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
  const inView = useInView(ref, { once: true, margin: "-15%" });

  useEffect(() => {
    if (!inView || !ref.current) return;

    const node = ref.current;
    const controls = animate(from, to, {
      duration,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate(value) {
        const rounded = Math.floor(value);
        const padded = pad > 0 ? String(rounded).padStart(pad, "0") : String(rounded);
        node.textContent = `${prefix}${padded}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, from, to, duration, prefix, suffix, pad]);

  return (
    <span ref={ref}>
      {prefix}
      {pad > 0 ? String(from).padStart(pad, "0") : from}
      {suffix}
    </span>
  );
}
