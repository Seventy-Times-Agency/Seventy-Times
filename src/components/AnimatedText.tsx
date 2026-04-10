"use client";

import { motion } from "framer-motion";

/**
 * Mask-clip word reveal.
 * Each word is wrapped in an `overflow: hidden` span, and its content
 * slides up from below the baseline. Supports per-word classNames for
 * inline styling (italic, outlined, shimmer, etc.).
 */

export type AnimatedWord = string | { text: string; className?: string };

type Props = {
  words: AnimatedWord[];
  className?: string;
  /** Delay before the first word starts, in seconds. */
  delay?: number;
  /** Gap between each word's animation, in seconds. */
  stagger?: number;
  /** Duration of each word's slide. */
  duration?: number;
  /** Animate immediately on mount rather than on scroll-in. */
  immediate?: boolean;
  /** Only animate once per page load. */
  once?: boolean;
};

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export default function AnimatedText({
  words,
  className,
  delay = 0,
  stagger = 0.09,
  duration = 0.95,
  immediate = false,
  once = true,
}: Props) {
  return (
    <span className={className}>
      {words.map((w, i) => {
        const text = typeof w === "string" ? w : w.text;
        const wordClass = typeof w === "string" ? undefined : w.className;
        const isLast = i === words.length - 1;

        const inner = (
          <motion.span
            className={wordClass}
            style={{ display: "inline-block" }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: EASE,
            }}
            {...(immediate
              ? { initial: { y: "110%" }, animate: { y: 0 } }
              : {
                  initial: { y: "110%" },
                  whileInView: { y: 0 },
                  viewport: { once, margin: "-10%" },
                })}
          >
            {text}
            {!isLast ? "\u00A0" : ""}
          </motion.span>
        );

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              paddingTop: "0.18em",
              marginTop: "-0.18em",
              paddingBottom: "0.18em",
              marginBottom: "-0.18em",
              lineHeight: "inherit",
            }}
          >
            {inner}
          </span>
        );
      })}
    </span>
  );
}
