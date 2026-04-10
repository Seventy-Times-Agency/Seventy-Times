"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./AnimatedBackground.module.css";

/**
 * Layered animated background with scroll-linked parallax.
 * Each layer moves at a different speed to create depth.
 */
export default function AnimatedBackground() {
  const { scrollY } = useScroll();

  // Different speeds for each layer — slower layers feel further away
  const yGrid = useTransform(scrollY, [0, 3000], [0, -120]);
  const yGlowA = useTransform(scrollY, [0, 3000], [0, -360]);
  const yGlowB = useTransform(scrollY, [0, 3000], [0, -180]);
  const yNoise = useTransform(scrollY, [0, 3000], [0, -60]);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.topLight} />
      <motion.div className={styles.grid} style={{ y: yGrid }} />
      <motion.div
        className={`${styles.glow} ${styles.glowA}`}
        style={{ y: yGlowA }}
      />
      <motion.div
        className={`${styles.glow} ${styles.glowB}`}
        style={{ y: yGlowB }}
      />
      <motion.div className={styles.noise} style={{ y: yNoise }} />
    </div>
  );
}
