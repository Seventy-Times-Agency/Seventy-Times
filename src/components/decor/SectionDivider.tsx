"use client";

import { motion } from "framer-motion";
import { useT } from "@/i18n/context";
import type { Dictionary } from "@/i18n/dictionary";
import styles from "@/components/decor/SectionDivider.module.css";

type Props = {
  /** Resolved literal label. */
  label?: string;
  /** Dictionary key — preferred so the parent can stay a server component. */
  labelKey?: keyof Dictionary;
};

/**
 * A thin divider line that draws itself horizontally when scrolled
 * into view. Optionally shows an editorial label in the middle —
 * either as a literal `label` or via a `labelKey` resolved from i18n.
 */
export default function SectionDivider({ label, labelKey }: Props) {
  const { t } = useT();
  const resolved =
    label ?? (labelKey ? (t[labelKey] as string | undefined) : undefined);
  return (
    <div className={styles.wrap} aria-hidden="true">
      <motion.div
        className={styles.line}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      />
      {resolved && (
        <>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {resolved}
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
