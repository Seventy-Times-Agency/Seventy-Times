"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import styles from "./RingCounter.module.css";

type Props = {
  display: string;
  to?: number;
  suffix?: string;
  label: string;
  duration?: number;
  fillPct?: number;
  decimals?: number;
  /** Delay before animation starts (for staggering multiple rings). */
  delay?: number;
  /** Unique id so the gradient defs don't collide across instances. */
  id?: string;
};

const VIEWBOX = 132;
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Stat tile with an animated SVG ring that draws itself with a Casper
 * gradient stroke, plus either a counted-up number or a static display
 * value in the centre.
 *
 * Uses native IntersectionObserver + an immediate getBoundingClientRect
 * check so the animation always fires on first paint.
 */
export default function RingCounter({
  display,
  to,
  suffix = "",
  label,
  duration = 2.5,
  fillPct = 100,
  decimals = 0,
  delay = 0,
  id = "default",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node || started) return;

    // Wait for the PageIntro overlay to clear before starting, so the
    // user actually sees the ring fill from 0 instead of watching the
    // tail end of it behind the curtain.
    let timeoutId = 0;
    let disposed = false;

    const introIsGone = () =>
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("st-intro-seen") === "1";

    const beginViewportCheck = () => {
      if (disposed) return;

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
      cleanup.push(() => observer.disconnect());
    };

    const cleanup: Array<() => void> = [];

    if (introIsGone()) {
      beginViewportCheck();
    } else {
      const onIntroGone = () => {
        // Small buffer so the intro's slide-up is visibly ahead of
        // the ring fill kicking off.
        timeoutId = window.setTimeout(beginViewportCheck, 120);
      };
      window.addEventListener("st-intro-gone", onIntroGone, { once: true });
      cleanup.push(() =>
        window.removeEventListener("st-intro-gone", onIntroGone)
      );
    }

    return () => {
      disposed = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      cleanup.forEach((fn) => fn());
    };
  }, [started]);

  // Ring fill — same easing and duration as the counter below, so the
  // arc and the digit finish exactly together.
  useEffect(() => {
    if (!started) return;
    const controls = animate(0, fillPct, {
      duration,
      delay,
      ease: "easeInOut",
      onUpdate: (v) => setProgress(v),
      onComplete: () => setProgress(fillPct),
    });
    return () => controls.stop();
  }, [started, fillPct, duration, delay]);

  // Counter — synced with the ring. Snaps to the exact `display` on
  // complete so we never end on 3.4 instead of 3.5×.
  useEffect(() => {
    if (!started || to == null || !numberRef.current) return;
    const node = numberRef.current;
    const controls = animate(0, to, {
      duration,
      delay,
      ease: "easeInOut",
      onUpdate(value) {
        const formatted =
          decimals > 0 ? value.toFixed(decimals) : String(Math.floor(value));
        node.textContent = `${formatted}${suffix}`;
      },
      onComplete() {
        node.textContent = display;
      },
    });
    return () => controls.stop();
  }, [started, to, suffix, duration, delay, decimals, display]);

  const strokeOffset = CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100;
  const gradientId = `ringGradient-${id}`;

  // Radial tick marks around the ring (decorative)
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const rOuter = RADIUS + 8;
    const rInner = RADIUS + 4;
    const cx = VIEWBOX / 2;
    const cy = VIEWBOX / 2;
    return {
      x1: cx + Math.cos(angle) * rInner,
      y1: cy + Math.sin(angle) * rInner,
      x2: cx + Math.cos(angle) * rOuter,
      y2: cy + Math.sin(angle) * rOuter,
    };
  });

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.ringWrap}>
        <svg
          className={styles.ringSvg}
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8eef4" />
              <stop offset="60%" stopColor="#c8d4de" />
              <stop offset="100%" stopColor="#8a9aa6" />
            </linearGradient>
          </defs>

          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              className={styles.ringTick}
            />
          ))}

          <circle
            cx={VIEWBOX / 2}
            cy={VIEWBOX / 2}
            r={RADIUS + 6}
            className={styles.ringGuide}
          />
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
              stroke: `url(#${gradientId})`,
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
