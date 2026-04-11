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
  code: "",
  name: "",
  role: "",
  location: "",
  content: "",
};

/**
 * Client review submission modal. Only people with a valid client
 * code (issued manually by the agency after a real project) can
 * submit a review. Opens whenever the URL hash becomes `#review`.
 */
export default function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setOpen(window.location.hash === "#review");
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

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
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
    setOpen(false);
    window.setTimeout(() => {
      setStatus("idle");
      setError("");
    }, 400);
  }, []);

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

    const payload = {
      code: fields.code.trim(),
      name: fields.name.trim(),
      role: fields.role.trim(),
      location: fields.location.trim(),
      content: fields.content.trim(),
    };

    if (
      !payload.code ||
      !payload.name ||
      !payload.role ||
      !payload.location ||
      !payload.content
    ) {
      setError("Пожалуйста, заполни все поля");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || "Что-то пошло не так. Попробуй ещё раз."
        );
      }

      setStatus("success");
      setFields(INITIAL);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Ошибка соединения. Попробуй позже."
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
          aria-labelledby="review-form-title"
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
                <h3 className={styles.successTitle}>Отзыв принят</h3>
                <p className={styles.successText}>
                  Спасибо за тёплые слова! Мы получили отзыв и добавим его в
                  ленту после быстрой модерации.
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
                  <span className={styles.eyebrow}>— Оставить отзыв</span>
                  <h3 className={styles.title} id="review-form-title">
                    Поделитесь{" "}
                    <span className={styles.titleItalic}>опытом</span>
                  </h3>
                  <p className={styles.subtitle}>
                    Отзыв могут оставить только реальные клиенты — нужен
                    персональный код, который мы выдаём после завершения
                    проекта. Нет кода? Напишите нам в Telegram, мы вышлем.
                  </p>
                </div>

                <form onSubmit={submit} className={styles.form} noValidate>
                  <label className={styles.field}>
                    <span className={styles.label}>Код клиента</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.code}
                      onChange={setField("code")}
                      placeholder="Персональный код, например IAA-XYZ-42"
                      maxLength={64}
                      autoComplete="off"
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Имя</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.name}
                      onChange={setField("name")}
                      placeholder="Как подписать отзыв"
                      maxLength={100}
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Должность и компания</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.role}
                      onChange={setField("role")}
                      placeholder="Например: Основатель, Becker Studio"
                      maxLength={150}
                      autoComplete="organization"
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Локация</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.location}
                      onChange={setField("location")}
                      placeholder="Город, страна"
                      maxLength={120}
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Отзыв</span>
                    <textarea
                      className={styles.textarea}
                      value={fields.content}
                      onChange={setField("content")}
                      placeholder="Коротко — что сделали, какие были результаты, как вам работалось с командой."
                      maxLength={1200}
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
                      "Проверяем код…"
                    ) : (
                      <>
                        Отправить отзыв <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>

                  <p className={styles.note}>
                    Отзывы проходят модерацию и добавляются в ленту вручную —
                    мы хотим показывать только реальные истории.
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
