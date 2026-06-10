"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

const variants: Variants = {
  hidden: (custom: { delay: number; y: number }) => ({
    opacity: 0,
    y: custom.y,
  }),
  visible: (custom: { delay: number; y: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: custom.delay,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
};

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: Props) {
  const reduceMotion = useReducedMotion();
  // On phones the IntersectionObserver fires late relative to scroll
  // velocity — `whileInView` lets the element render at `opacity: 0`
  // for a frame before the animation catches up, which reads as the
  // "black flicker" / "winking" on fast scrolls. Desktop has enough
  // CPU headroom for the animation to land before the user perceives
  // the off state, so the scroll-reveal stays there.
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setAnimate(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setAnimate(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!animate || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={{ delay, y }}
    >
      {children}
    </motion.div>
  );
}
