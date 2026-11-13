"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import styles from "./ServiceVisual.module.css";

export type ChatLine = { from: "user" | "bot"; text: string };

type Item = { id: string; kind: "msg"; line: ChatLine } | { id: string; kind: "typing" };

// Timings (ms) — paced like a real chat: the client writes, a short
// beat, the bot "types" for a while, then answers.
const BEFORE_FIRST = 500;
const BEFORE_TYPING = 650;
const TYPING_FOR = 1300;
const AFTER_REPLY = 1500;
const HOLD_END = 3600;
const CLEAR_GAP = 700;

const enter = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, transition: { duration: 0.35 } },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
} as const;

/**
 * Messenger imitation for the AI-bot visual. Plays the script strictly
 * in order — user message → typing dots → bot reply → … — then holds,
 * clears and loops. New messages enter at the bottom (fade + slide-up)
 * and push older ones up; `layout` animates that push so nothing jumps.
 * Runs only while on screen; reduced motion shows the finished chat.
 */
export default function ChatSim({ script, className }: { script: ChatLine[]; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [items, setItems] = useState<Item[]>([]);
  // Restart only when the words change (e.g. language), not on every
  // parent render that hands us a fresh array.
  const scriptKey = script.map((l) => `${l.from}:${l.text}`).join("|");
  const scriptRef = useRef(script);
  scriptRef.current = script;

  useEffect(() => {
    const script = scriptRef.current;
    if (reduce || !inView) {
      setItems(
        reduce ? script.map((line, i) => ({ id: `m${i}`, kind: "msg" as const, line })) : [],
      );
      return;
    }

    const timers: number[] = [];
    let alive = true;
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(() => alive && fn(), ms));

    const play = (round: number) => {
      let t = BEFORE_FIRST;
      script.forEach((line, i) => {
        const msg: Item = { id: `${round}-m${i}`, kind: "msg", line };
        if (line.from === "bot") {
          const typing: Item = { id: `${round}-t${i}`, kind: "typing" };
          at((t += BEFORE_TYPING), () => setItems((cur) => [...cur, typing]));
          at((t += TYPING_FOR), () =>
            setItems((cur) => [...cur.filter((it) => it.id !== typing.id), msg]),
          );
          t += AFTER_REPLY;
        } else {
          at(t, () => setItems((cur) => [...cur, msg]));
        }
      });
      at((t += HOLD_END - AFTER_REPLY), () => setItems([]));
      at(t + CLEAR_GAP, () => play(round + 1));
    };

    setItems([]);
    play(0);
    return () => {
      alive = false;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [inView, reduce, scriptKey]);

  return (
    <div ref={ref} className={className}>
      <AnimatePresence initial={false}>
        {items.map((it) =>
          it.kind === "typing" ? (
            <motion.span
              key={it.id}
              layout="position"
              className={styles.typing}
              aria-hidden="true"
              {...enter}
              // The reply takes the dots' place, so they vanish at once
              // instead of fading beside it and making it jump.
              exit={{ opacity: 0, transition: { duration: 0 } }}
            >
              <i />
              <i />
              <i />
            </motion.span>
          ) : (
            <motion.p
              key={it.id}
              layout="position"
              className={`${styles.bubble} ${it.line.from === "user" ? styles.bubbleUser : styles.bubbleBot}`}
              {...enter}
            >
              {it.line.text}
            </motion.p>
          ),
        )}
      </AnimatePresence>
    </div>
  );
}
