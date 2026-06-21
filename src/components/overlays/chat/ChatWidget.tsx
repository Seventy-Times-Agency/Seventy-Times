"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/i18n/context";
import styles from "@/components/overlays/chat/ChatWidget.module.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "st-chat-history-v1";
const SESSION_KEY = "st-chat-session-v1";
const NUDGE_KEY = "st-chat-nudge-v1";
const MAX_STORED = 50;
// How long the visitor sits on the page before Vanessa offers a hand.
const NUDGE_DELAY_MS = 18_000;

function getSessionId(): string {
  try {
    const existing = window.localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const fresh =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    return `s-${Date.now().toString(36)}`;
  }
}

export default function ChatWidget() {
  const { t, locale } = useT();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.chatGreeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastLocaleRef = useRef(locale);

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

  // Persist on change (after hydration, to avoid overwriting with greeting).
  // Streamed assistant replies push state on every token — without a
  // debounce we'd hit localStorage ~50–200 times per reply, which is
  // synchronous and blocks the main thread on slower devices. We also
  // flush the latest state on unmount so a fast-close-after-streaming
  // doesn't drop the last few tokens of context.
  useEffect(() => {
    if (!hydrated) return;
    const writeNow = () => {
      try {
        const tail = messages.slice(-MAX_STORED);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tail));
      } catch {
        // ignore quota errors
      }
    };
    const handle = window.setTimeout(writeNow, 400);
    return () => {
      window.clearTimeout(handle);
      // If the component unmounts while the timer is still pending,
      // make one last synchronous write so nothing is lost.
      writeNow();
    };
  }, [messages, hydrated]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  // Proactive teaser: after a short dwell, offer a hand — once per
  // browser session, only while the chat is closed. Keeps it from
  // nagging returning visitors or anyone who already engaged.
  useEffect(() => {
    if (open) return;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(NUDGE_KEY) === "1";
    } catch {
      // sessionStorage blocked — just skip the nudge.
      return;
    }
    if (seen) return;
    const timer = window.setTimeout(() => setShowNudge(true), NUDGE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  // Mark the nudge as spent (so it won't reappear this session) the
  // moment the visitor opens the chat by any route.
  useEffect(() => {
    if (!open) return;
    setShowNudge(false);
    try {
      window.sessionStorage.setItem(NUDGE_KEY, "1");
    } catch {
      // ignore
    }
  }, [open]);

  const dismissNudge = useCallback(() => {
    setShowNudge(false);
    try {
      window.sessionStorage.setItem(NUDGE_KEY, "1");
    } catch {
      // ignore
    }
  }, []);

  // React to a UI language change. If the chat is still on the
  // greeting (no user turns yet), swap the greeting for the new
  // locale's version. If the conversation is already going, drop in
  // a one-line "switching to <lang>" note from Vanessa so the next
  // streamed reply visibly continues in the new language.
  useEffect(() => {
    if (!hydrated) return;
    if (lastLocaleRef.current === locale) return;
    lastLocaleRef.current = locale;
    setMessages((prev) => {
      const hasUserTurn = prev.some((m) => m.role === "user");
      if (!hasUserTurn) {
        return [{ role: "assistant", content: t.chatGreeting }];
      }
      return [
        ...prev,
        { role: "assistant", content: t.chatLanguageSwitched },
      ];
    });
  }, [locale, hydrated, t.chatGreeting, t.chatLanguageSwitched]);

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

  const send = useCallback(async (override?: string) => {
    const trimmed = (override ?? input).trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    // Append an empty assistant bubble we can stream into.
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    let streamed = "";
    let errored = false;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next,
          sessionId: getSessionId(),
          locale,
        }),
      });

      if (!res.ok || !res.body) {
        errored = true;
      } else {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // Server sends one JSON object per line — parse complete
          // lines, stash any trailing partial line back into the buffer.
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.trim()) continue;
            let parsed: {
              text?: string;
              done?: boolean;
              error?: string;
              action?: string;
            };
            try {
              parsed = JSON.parse(line);
            } catch {
              continue;
            }
            if (parsed.error) {
              errored = true;
              continue;
            }
            // Vanessa asked to open the full lead form for the visitor —
            // the #lead hash trigger drives the shared modal lifecycle.
            if (parsed.action === "open_form") {
              window.location.hash = "#lead";
              continue;
            }
            if (parsed.text) {
              streamed += parsed.text;
              const current = streamed;
              // Update the last (assistant) bubble with what we have so
              // far. React batches these so the DOM stays smooth.
              setMessages((prev) => {
                const copy = prev.slice(0, -1);
                copy.push({ role: "assistant", content: current });
                return copy;
              });
            }
          }
        }
      }
    } catch {
      errored = true;
    }

    if (errored || streamed.length === 0) {
      const fallback = streamed.length === 0 ? t.chatError : t.chatFallback;
      setMessages((prev) => {
        const copy = prev.slice(0, -1);
        copy.push({ role: "assistant", content: fallback });
        return copy;
      });
    }

    setLoading(false);
    inputRef.current?.focus();
    // Depend on the full `t` object instead of cherry-picked fields:
    // the dictionary returned by `useT()` is a stable reference per
    // locale, but cherry-picking creates dependency holes if the
    // strings used inside `send` ever expand.
  }, [input, loading, messages, locale, t]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Show the quick-prompt chips only on a fresh chat — once the
  // conversation has any user turn, they get out of the way.
  const showSuggestions =
    !loading && messages.every((m) => m.role !== "user");
  const suggestions = [
    t.chatSuggestPricing,
    t.chatSuggestCases,
    t.chatSuggestGrowth,
    t.chatSuggestBot,
  ];

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
                  src="/vanessa.jpg"
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

            {/* The visual list is NOT a live region — streaming would
                flood a screen reader token-by-token. A dedicated polite
                announcer below reads the finished reply once. */}
            <div className={styles.messages} aria-busy={loading}>
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
                    role="status"
                    aria-label={t.chatStatus}
                  >
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={endRef} />
            </div>

            {/* Screen-reader announcer: reads the latest assistant reply
                once it finishes streaming (loading flips false), instead
                of every streamed token. */}
            <p
              aria-live="polite"
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                margin: -1,
                padding: 0,
                overflow: "hidden",
                clip: "rect(0 0 0 0)",
                whiteSpace: "nowrap",
                border: 0,
              }}
            >
              {!loading &&
              messages.length > 0 &&
              messages[messages.length - 1].role === "assistant"
                ? messages[messages.length - 1].content
                : ""}
            </p>

            {showSuggestions && (
              <div className={styles.suggestions} aria-label={t.chatSuggestAria}>
                {suggestions.map((label) => (
                  <button
                    key={label}
                    type="button"
                    className={styles.suggestion}
                    onClick={() => send(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

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
                onClick={() => send()}
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

      <AnimatePresence>
        {showNudge && !open && (
          <motion.div
            key="nudge"
            className={styles.nudge}
            role="button"
            tabIndex={0}
            onClick={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(true);
              }
            }}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <button
              className={styles.nudgeClose}
              onClick={(e) => {
                e.stopPropagation();
                dismissNudge();
              }}
              aria-label={t.chatClose}
              type="button"
            >
              ×
            </button>
            <span className={styles.nudgeText}>{t.chatNudge}</span>
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
          src="/vanessa.jpg"
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
