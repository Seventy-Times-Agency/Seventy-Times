"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import styles from "./RingCounter.module.css";

type Props = {
  /** Display value: "70×", "24/7", "2026", "3" etc. */
  display: string;
  /** Numeric value to count up to (used for ring fill + counter). */
  to?: number;
  /** Suffix appended after the counted number ("×", "+" etc.). */
  suffix?: string;
  /** Label under the ring. */
  label: string;
  /** Animation duration in seconds. */
  duration?: number;
  /** Ring fill percentage (0-100). Defaults to 100 for static values. */
  fillPct?: number;
};

const RADIUS = 56;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const VIEWBOX = 132;

/**
 * Stat tile with an animated SVG ring that draws itself, and either a
 * counted-up number or a static display value in the center.
 *
 * Uses native IntersectionObserver + an immediate getBoundingClientRect
 * check so it always fires on first paint, even for elements above the
 * fold.
 */
export default function RingCounter({
  display,
  to,
  suffix = "",
  label,
  duration = 1.8,
  fillPct = 100,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  // Trigger when in viewport (or already on-screen at mount)
  useEffect(() => {
    const node = wrapRef.current;
    if (!node || started) return;

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

  // Animate the ring fill (always)
  useEffect(() => {
    if (!started) return;
    const controls = animate(0, fillPct, {
      duration,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate: (v) => setProgress(v),
    });
    return () => controls.stop();
  }, [started, fillPct, duration]);

  // Animate the counter if a numeric `to` was provided
  useEffect(() => {
    if (!started || to == null || !numberRef.current) return;
    const node = numberRef.current;
    const controls = animate(0, to, {
      duration,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate(value) {
        node.textContent = `${Math.floor(value)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [started, to, suffix, duration]);

  // Stroke offset based on progress (0-100)
  const strokeOffset =
    CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100;

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.ringWrap}>
        <svg
          className={styles.ringSvg}
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          aria-hidden="true"
        >
          <circle
            cx={VIEWBOX / 2}
            cy={VIEWBOX / 2}
            r={RADIUS}
            className={styles.ringTrack}
          />
          <circle
            cx={VIEWBOX / 2}
            cy={VIEWBOX / 2}
            r={RADIUS}
            className={styles.ringFill}
            style={{
              strokeDasharray: CIRCUMFERENCE,
              strokeDashoffset: strokeOffset,
            }}
          />
        </svg>
        <span className={styles.value}>
          {to != null ? <span ref={numberRef}>{`0${suffix}`}</span> : display}
        </span>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
