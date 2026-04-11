"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import styles from "./VelocityTicker.module.css";

const ROW_A = [
  "Ads",
  "Automation",
  "AI",
  "Meta",
  "Google",
  "TikTok",
];

const ROW_B = [
  "Telegram bots",
  "Instagram",
  "CRM",
  "Analytics",
  "Funnels",
  "Landing pages",
];

type RowProps = {
  items: string[];
  baseVelocity: number;
  muted?: boolean;
};

function VelocityRow({ items, baseVelocity, muted = false }: RowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Maps fast scroll to a multiplier on the base ticker speed.
  // clamp:false lets the user really blast it on aggressive scroll.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Wrap the translateX so the row loops seamlessly. The two -25/-75
  // numbers correspond to half the duplicated row width.
  const x = useTransform(baseX, (v) => `${wrap(-25, -75, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Reverse direction based on scroll velocity sign so the ticker
    // visually follows the user's scroll motion.
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Repeat items 4 times so the wrap math always has content to show.
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <motion.div
      className={`${styles.row} ${muted ? styles.rowMuted : ""}`}
      style={{ x }}
    >
      {repeated.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className={`${styles.item} ${muted ? styles.itemOutline : ""}`}
        >
          {item}
          <span className={styles.dot} />
        </span>
      ))}
    </motion.div>
  );
}

export default function VelocityTicker() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <VelocityRow items={ROW_A} baseVelocity={2} />
      <VelocityRow items={ROW_B} baseVelocity={-2} muted />
    </div>
  );
}
