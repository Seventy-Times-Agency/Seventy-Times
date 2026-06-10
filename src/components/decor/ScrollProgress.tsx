"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useT } from "@/i18n/context";
import styles from "@/components/decor/ScrollProgress.module.css";

export default function ScrollProgress() {
  const { t } = useT();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 32,
    mass: 0.4,
  });

  return (
    <>
      <div className={styles.track} aria-hidden="true">
        <motion.div className={styles.bar} style={{ scaleY }} />
      </div>
      <span className={styles.label} aria-hidden="true">
        {t.scrollLabel}
      </span>
    </>
  );
}
