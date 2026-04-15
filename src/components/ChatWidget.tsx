"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/i18n/context";
import styles from "./ChatWidget.module.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.chatGreeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Allow other components to open the chat via custom event
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

  // Close on Escape
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

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      const reply =
        typeof data.reply === "string" && data.reply.length > 0
          ? data.reply
          : data.error || t.chatFallback;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t.chatError },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [input, loading, messages]);

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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/venesa.jpg"
                  alt="Венеса"
                  className={styles.avatarImg}
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
                aria-label="Закрыть чат"
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
                aria-label="Сообщение"
              />
              <button
                className={styles.sendBtn}
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Отправить"
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
        aria-label={open ? "Закрыть чат" : "Написать Венесе"}
        type="button"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/venesa.jpg" alt="" className={styles.toggleImg} />
        <span className={styles.toggleDot} />
        {!open && <span className={styles.toggleLabel}>{t.chatLabel}</span>}
      </button>
    </div>
  );
}
