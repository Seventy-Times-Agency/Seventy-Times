"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./LeadForm.module.css";

type Status = "idle" | "loading" | "success" | "error";

const INITIAL = {
  name: "",
  contact: "",
  business: "",
  request: "",
};

/**
 * Global lead-capture modal. Opens whenever the URL hash is `#lead`,
 * so any element with `href="#lead"` anywhere on the page acts as a
 * trigger. Also closable by Escape or clicking the backdrop.
 *
 * Mounted once at the layout level.
 */
export default function LeadForm() {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Listen to URL hash to know when to open.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setOpen(window.location.hash === "#lead");
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  // Lock body scroll while modal is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = useCallback(() => {
    if (typeof window !== "undefined") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setOpen(false);
    // Reset ephemeral UI state after the exit animation finishes
    window.setTimeout(() => {
      setStatus("idle");
      setError("");
    }, 400);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const setField = (key: keyof typeof INITIAL) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const name = fields.name.trim();
    const contact = fields.contact.trim();
    const business = fields.business.trim();
    const request = fields.request.trim();

    if (!name || !contact || !business || !request) {
      setError("Пожалуйста, заполни все поля");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, business, request }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Что-то пошло не так. Попробуй ещё раз.");
      }

      setStatus("success");
      setFields(INITIAL);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Ошибка соединения. Попробуй позже."
      );
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-form-title"
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={close}
              aria-label="Закрыть форму"
              type="button"
            >
              ×
            </button>

            {status === "success" ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Заявка отправлена</h3>
                <p className={styles.successText}>
                  Спасибо! Мы получили твою заявку и ответим в течение часа в
                  рабочее время. До связи 👋
                </p>
                <button
                  className={styles.successCloseBtn}
                  onClick={close}
                  type="button"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <div className={styles.header}>
                  <span className={styles.eyebrow}>— Оставить заявку</span>
                  <h3 className={styles.title} id="lead-form-title">
                    Расскажи о{" "}
                    <span className={styles.titleItalic}>задаче</span>
                  </h3>
                  <p className={styles.subtitle}>
                    Ответим в течение часа в рабочее время. Все поля обязательны.
                  </p>
                </div>

                <form onSubmit={submit} className={styles.form} noValidate>
                  <label className={styles.field}>
                    <span className={styles.label}>Имя</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.name}
                      onChange={setField("name")}
                      placeholder="Как к вам обращаться"
                      maxLength={100}
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Контакт</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.contact}
                      onChange={setField("contact")}
                      placeholder="@username в Telegram или email"
                      maxLength={200}
                      autoComplete="email"
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Ваш бизнес</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.business}
                      onChange={setField("business")}
                      placeholder="Название, сайт, чем занимаетесь"
                      maxLength={500}
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Задача</span>
                    <textarea
                      className={styles.textarea}
                      value={fields.request}
                      onChange={setField("request")}
                      placeholder="Что нужно: реклама, автоматизация, AI-бот, или что-то другое. Чем подробнее — тем точнее ответим."
                      maxLength={2000}
                      rows={5}
                      required
                    />
                  </label>

                  {error && <div className={styles.error}>{error}</div>}

                  <button
                    type="submit"
                    className={styles.submit}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      "Отправляем…"
                    ) : (
                      <>
                        Отправить заявку <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>

                  <p className={styles.note}>
                    Нажимая «Отправить», вы соглашаетесь на обработку контактных
                    данных для обратной связи.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
