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
import styles from "@/components/forms/LeadForm.module.css";

type Status = "idle" | "loading" | "success" | "error";

const INITIAL = {
  name: "",
  contact: "",
  business: "",
  request: "",
  // Honeypot: a field real users never see. Bots fill every input they find.
  website: "",
};

/**
 * Accepts common contact formats: email, @username (telegram),
 * or any string containing digits (phone). Anything else we treat
 * as suspicious and ask the user to check.
 */
function isPlausibleContact(value: string): boolean {
  const v = value.trim();
  if (v.length < 3) return false;
  const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const handleLike = /^@[\w.]{2,}$/.test(v);
  const phoneLike = /\d{5,}/.test(v);
  return emailLike || handleLike || phoneLike;
}

/**
 * Global lead-capture modal. Opens whenever the URL hash is `#lead`,
 * so any element with `href="#lead"` anywhere on the page acts as a
 * trigger. Also closable by Escape or clicking the backdrop.
 *
 * Mounted once at the layout level.
 */
export default function LeadForm() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState(INITIAL);
  const [consent, setConsent] = useState(false);
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
      setError(t.leadFillAll);
      return;
    }

    if (!isPlausibleContact(contact)) {
      setError(t.leadInvalidContact);
      return;
    }

    if (!consent) {
      setError(t.consentRequired);
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          business,
          request,
          website: fields.website,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg =
          res.status === 429
            ? t.leadTooMany
            : data.error || t.chatFallback;
        throw new Error(msg);
      }

      setStatus("success");
      setFields(INITIAL);
      setConsent(false);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t.chatError);
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
              aria-label={t.leadCloseAria}
              type="button"
            >
              ×
            </button>

            {status === "success" ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>{t.leadSuccessTitle}</h3>
                <p className={styles.successText}>{t.leadSuccessText}</p>
                <button className={styles.successCloseBtn} onClick={close} type="button">
                  {t.leadClose}
                </button>
              </div>
            ) : (
              <>
                <div className={styles.header}>
                  <span className={styles.eyebrow}>{t.leadEyebrow}</span>
                  <h3 className={styles.title} id="lead-form-title">
                    {t.leadTitle}{" "}
                    <span className={styles.titleItalic}>{t.leadTitleAccent}</span>
                  </h3>
                  <p className={styles.subtitle}>{t.leadSub}</p>
                </div>

                <form onSubmit={submit} className={styles.form} noValidate>
                  {/* Honeypot: invisible to humans (aria-hidden, tabindex=-1,
                      off-screen). Bots fill it → server silently drops. */}
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
                    <span className={styles.label}>{t.leadName}</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.name}
                      onChange={setField("name")}
                      placeholder={t.leadNamePh}
                      maxLength={100}
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>{t.leadContact}</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.contact}
                      onChange={setField("contact")}
                      placeholder={t.leadContactPh}
                      maxLength={200}
                      autoComplete="email"
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>{t.leadBusiness}</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.business}
                      onChange={setField("business")}
                      placeholder={t.leadBusinessPh}
                      maxLength={500}
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>{t.leadTask}</span>
                    <textarea
                      className={styles.textarea}
                      value={fields.request}
                      onChange={setField("request")}
                      placeholder={t.leadTaskPh}
                      maxLength={2000}
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
                      t.leadSubmitting
                    ) : (
                      <>
                        {t.leadSubmit} <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
