"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/i18n/context";
import styles from "./ChatWidget.module.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "st-chat-history-v1";
const MAX_STORED = 50;

export default function ChatWidget() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.chatGreeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hydrate history from localStorage once on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed.slice(-MAX_STORED));
        }
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration, to avoid overwriting with greeting)
  useEffect(() => {
    if (!hydrated) return;
    try {
      const tail = messages.slice(-MAX_STORED);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tail));
    } catch {
      // ignore quota errors
    }
  }, [messages, hydrated]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-venesa", handler);
    return () => window.removeEventListener("open-venesa", handler);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    // Retry transient network / 5xx errors with exponential backoff.
    // Rate-limit (429) and client errors (4xx other than 408) are
    // surfaced immediately — no point in retrying a banned request.
    const DELAYS_MS = [0, 800, 2000];

    let reply = t.chatError;
    for (let attempt = 0; attempt < DELAYS_MS.length; attempt++) {
      if (DELAYS_MS[attempt] > 0) {
        await new Promise((r) => setTimeout(r, DELAYS_MS[attempt]));
      }
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok && typeof data.reply === "string" && data.reply.length > 0) {
          reply = data.reply;
          break;
        }

        const retriable = res.status >= 500 || res.status === 408;
        if (!retriable) {
          reply = data.error || t.chatFallback;
          break;
        }
      } catch {
        // network error — fall through to retry
      }
    }

    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setLoading(false);
    inputRef.current?.focus();
  }, [input, loading, messages, t.chatError, t.chatFallback]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className={styles.widget}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className={styles.header}>
              <div className={styles.avatar}>
                <Image
                  src="/venesa.jpg"
                  alt={t.chatAlt}
                  className={styles.avatarImg}
                  width={48}
                  height={48}
                  priority={false}
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.name}>{t.chatName}</span>
                <span className={styles.status}>
                  <span className={styles.statusDot} /> {t.chatStatus}
                </span>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setOpen(false)}
                aria-label={t.chatClose}
                type="button"
              >
                ×
              </button>
            </div>

            <div className={styles.messages}>
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className={`${styles.bubble} ${
                      msg.role === "user" ? styles.userBubble : styles.botBubble
                    }`}
                  >
                    {msg.content}
                  </motion.div>
                ))}
                {loading && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={styles.typing}
                  >
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={endRef} />
            </div>

            <div className={styles.inputRow}>
              <input
                ref={inputRef}
                className={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t.chatPh}
                maxLength={2000}
                aria-label={t.chatMessage}
              />
              <button
                className={styles.sendBtn}
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label={t.chatSend}
                type="button"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.chatClose : t.chatOpen}
        type="button"
      >
        <Image
          src="/venesa.jpg"
          alt=""
          className={styles.toggleImg}
          width={56}
          height={56}
          priority={false}
          aria-hidden="true"
        />
        <span className={styles.toggleDot} />
        {!open && <span className={styles.toggleLabel}>{t.chatLabel}</span>}
      </button>
    </div>
  );
}
