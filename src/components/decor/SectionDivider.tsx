"use client";

import { motion } from "framer-motion";
import styles from "@/components/decor/SectionDivider.module.css";

type Props = {
  label?: string;
};

/**
 * A thin divider line that draws itself horizontally when scrolled
 * into view. Optionally shows an editorial label in the middle.
 */
export default function SectionDivider({ label }: Props) {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <motion.div
        className={styles.line}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      />
      {label && (
        <>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {label}
          </motion.span>
          <motion.div
            className={styles.line}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
        </>
      )}
    </div>
  );
}
