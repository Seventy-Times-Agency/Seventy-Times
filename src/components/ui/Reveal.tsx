"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
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
