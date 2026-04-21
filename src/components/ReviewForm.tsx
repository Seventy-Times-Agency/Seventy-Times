"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/i18n/context";
import styles from "./LeadForm.module.css";

type Status = "idle" | "loading" | "success" | "error";

const INITIAL = {
  code: "",
  name: "",
  role: "",
  location: "",
  content: "",
  website: "",
};

export default function ReviewForm() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState(INITIAL);
  const [consent, setConsent] = useState(false);
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
      website: fields.website,
    };

    if (
      !payload.code ||
      !payload.name ||
      !payload.role ||
      !payload.location ||
      !payload.content
    ) {
      setError(t.reviewFillAll);
      return;
    }

    if (!consent) {
      setError(t.consentRequired);
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
        const msg =
          res.status === 429
            ? t.reviewTooMany
            : data.error || t.reviewError;
        throw new Error(msg);
      }

      setStatus("success");
      setFields(INITIAL);
      setConsent(false);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t.reviewError);
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
              aria-label={t.reviewCloseAria}
              type="button"
            >
              ×
            </button>

            {status === "success" ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>{t.reviewSuccessTitle}</h3>
                <p className={styles.successText}>{t.reviewSuccessText}</p>
                <button
                  className={styles.successCloseBtn}
                  onClick={close}
                  type="button"
                >
                  {t.reviewClose}
                </button>
              </div>
            ) : (
              <>
                <div className={styles.header}>
                  <span className={styles.eyebrow}>{t.reviewEyebrow}</span>
                  <h3 className={styles.title} id="review-form-title">
                    {t.reviewTitle}{" "}
                    <span className={styles.titleItalic}>
                      {t.reviewTitleAccent}
                    </span>
                  </h3>
                  <p className={styles.subtitle}>{t.reviewSub}</p>
                </div>

                <form onSubmit={submit} className={styles.form} noValidate>
                  {/* Honeypot — see LeadForm for the approach */}
                  <div className={styles.honeypot} aria-hidden="true">
                    <label>
                      Website
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={fields.website}
                        onChange={setField("website")}
                      />
                    </label>
                  </div>

                  <label className={styles.field}>
                    <span className={styles.label}>{t.reviewCode}</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.code}
                      onChange={setField("code")}
                      placeholder={t.reviewCodePh}
                      maxLength={64}
                      autoComplete="off"
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>{t.reviewName}</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.name}
                      onChange={setField("name")}
                      placeholder={t.reviewNamePh}
                      maxLength={100}
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>{t.reviewRole}</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.role}
                      onChange={setField("role")}
                      placeholder={t.reviewRolePh}
                      maxLength={150}
                      autoComplete="organization"
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>{t.reviewLocation}</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.location}
                      onChange={setField("location")}
                      placeholder={t.reviewLocationPh}
                      maxLength={120}
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>{t.reviewContent}</span>
                    <textarea
                      className={styles.textarea}
                      value={fields.content}
                      onChange={setField("content")}
                      placeholder={t.reviewContentPh}
                      maxLength={1200}
                      rows={5}
                      required
                    />
                  </label>

                  <label className={styles.consent}>
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                    />
                    <span>
                      {t.consentPrefix}
                      <Link href="/privacy" target="_blank">
                        {t.consentPrivacy}
                      </Link>
                      {t.consentAnd}
                      <Link href="/terms" target="_blank">
                        {t.consentTerms}
                      </Link>
                      {t.consentSuffix}
                    </span>
                  </label>

                  {error && <div className={styles.error}>{error}</div>}

                  <button
                    type="submit"
                    className={styles.submit}
                    disabled={status === "loading" || !consent}
                  >
                    {status === "loading" ? (
                      t.reviewSubmitting
                    ) : (
                      <>
                        {t.reviewSubmit} <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>

                  <p className={styles.note}>{t.reviewNote}</p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
