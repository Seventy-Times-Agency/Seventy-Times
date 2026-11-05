"use client";

import { useLit } from "@/components/ui/useLit";

/**
 * Word-by-word brightening. The words are on the page from the first
 * paint, dim, and light up in turn once the heading reaches the screen.
 * Supports per-word classNames for inline styling (italic, outlined…).
 */

export type AnimatedWord = string | { text: string; className?: string };

type Props = {
  words: AnimatedWord[];
  className?: string;
  /** Delay before the first word starts, in seconds. */
  delay?: number;
  /** Gap between each word's animation, in seconds. */
  stagger?: number;
  /** Kept for the hero: a heading on the first screen lights up on load. */
  immediate?: boolean;
};

export default function AnimatedText({
  words,
  className,
  delay = 0,
  stagger = 0.09,
}: Props) {
  const { ref, lit } = useLit<HTMLSpanElement>();

  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => {
        const text = typeof w === "string" ? w : w.text;
        const wordClass = typeof w === "string" ? "" : (w.className ?? "");
        const isLast = i === words.length - 1;
        return (
          <span
            key={i}
            className={`dimText${lit ? " dimTextLit" : ""}${wordClass ? ` ${wordClass}` : ""}`}
            style={{ display: "inline-block", transitionDelay: `${delay + i * stagger}s` }}
          >
            {text}
            {!isLast ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}
