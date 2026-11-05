"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  /** How strongly the wrapped element follows the cursor (0–1). */
  strength?: number;
  className?: string;
};

// How far around the button the pull starts, and how far it may travel.
const REACH = 22;
const MAX_SHIFT = 12;

const clamp = (n: number) => Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, n));

/**
 * Magnetic wrapper: the child leans toward the cursor and settles back
 * when it leaves. The outer frame never moves and is larger than the
 * button, so the distance is measured from a fixed point. Measuring the
 * moving element itself made the button twitch and drop the hover at its
 * edge.
 *
 * Becomes a passthrough on touch and small screens.
 */
export default function Magnetic({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 170, damping: 17, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 170, damping: 17, mass: 0.6 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!enabled) {
    return <span className={className} style={{ display: "inline-flex" }}>{children}</span>;
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(clamp((e.clientX - (rect.left + rect.width / 2)) * strength));
    y.set(clamp((e.clientY - (rect.top + rect.height / 2)) * strength));
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "inline-flex", padding: REACH, margin: -REACH }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div style={{ x: springX, y: springY, display: "inline-flex" }}>
        {children}
      </motion.div>
    </div>
  );
}
