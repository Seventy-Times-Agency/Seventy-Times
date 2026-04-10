"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import styles from "./ChatDemo.module.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Привет 👋  Я AI-консультант Aicore.\n\nРасскажи немного о своём бизнесе — подберём решение под твои задачи.",
};

const BULLETS = [
  "Обучен на материалах и тон-оф-войсе бренда",
  "Отвечает на любом языке, работает 24/7",
  "Собирает заявки прямо в CRM или Google Sheets",
];

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
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
          : data.error || "Что-то пошло не так. Попробуй снова.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ошибка соединения. Попробуй чуть позже.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="chat" className={styles.section}>
      <div className={styles.layout}>
        <Reveal>
          <div className={styles.intro}>
            <span className="eyebrow">— Live Demo / Claude</span>
            <h2 className={styles.title}>
              Поговори{" "}
              <span className={styles.titleItalic}>с нашим</span>
              <br />
              AI.
            </h2>
            <p className={styles.lead}>
              Это живой консультант на Claude. Такого же — обученного на ваших
              материалах — мы ставим вам на сайт, в Telegram или Instagram.
            </p>
            <div className={styles.bullets}>
              {BULLETS.map((b) => (
                <div key={b} className={styles.bullet}>
                  <span className={styles.bulletIcon}>→</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.box}>
            <div className={styles.chatHeader}>
              <div className={styles.avatar}>A</div>
              <div className={styles.chatMeta}>
                <span className={styles.chatName}>Aicore · AI-консультант</span>
                <span className={styles.chatStatus}>онлайн · отвечает сразу</span>
              </div>
              <span className={styles.chatBadge}>Live</span>
            </div>

            <div className={styles.messages}>
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
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
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={styles.typing}
                    aria-label="AI печатает"
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
                placeholder="Напишите сообщение..."
                maxLength={2000}
                aria-label="Сообщение"
              />
              <button
                className={styles.sendBtn}
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Отправить"
              >
                →
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
