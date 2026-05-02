"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/i18n/context";
import { siteConfig } from "@/data/siteConfig";
import styles from "@/components/overlays/forms/LeadForm.module.css";

type Status = "idle" | "loading" | "success" | "error";

const INITIAL = {
  name: "",
  phone: "",
  note: "",
  // Honeypot — bots fill every field they see, real users never see this.
  website: "",
};

const PHONE_RE = /^[+()\d][\d\s().\-]{6,}$/;

/**
 * Compact "request a call" modal. Trigger by setting the URL hash to
 * `#callback` (e.g. <a href="#callback">). Only asks for name + phone
 * + an optional note, then posts to /api/lead with kind="callback" so
 * the same fan-out (Telegram, Notion, email) handles both channels.
 */
export default function CallbackForm() {
  const { t, localePath } = useT();
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState(INITIAL);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setOpen(window.location.hash === "#callback");
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
        window.location.pathname + window.location.search,
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

  const setField =
    (key: keyof typeof INITIAL) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const name = fields.name.trim();
      const phone = fields.phone.trim();
      const note = fields.note.trim();

      if (!name || !phone) {
        setError(t.callbackFillAll);
        return;
      }
      if (!PHONE_RE.test(phone)) {
        setError(t.callbackInvalidPhone);
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
            // /api/lead requires `contact`, `business`, `request`. We
            // populate them in a way the team can recognise instantly
            // in Telegram / Notion as a callback request.
            contact: phone,
            phone,
            business: t.callbackBusinessFiller,
            request: note
              ? `${t.callbackRequestPrefix}\n\n${note}`
              : t.callbackRequestPrefix,
            kind: "callback",
            website: fields.website,
          }),
        });

        if (!res.ok) {
          const msg =
            res.status === 429
              ? t.leadTooMany
              : res.status === 503
                ? t.callbackUnavailable
                : t.chatFallback;
          throw new Error(msg);
        }

        setStatus("success");
        setFields(INITIAL);
        setConsent(false);
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : t.chatError);
      }
    },
    [fields, consent, t],
  );

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
          aria-labelledby="callback-form-title"
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
                <h3 className={styles.successTitle}>
                  {t.callbackSuccessTitle}
                </h3>
                <p className={styles.successText}>{t.callbackSuccessText}</p>
                <button
                  className={styles.successCloseBtn}
                  onClick={close}
                  type="button"
                >
                  {t.leadClose}
                </button>
              </div>
            ) : (
              <>
                <div className={styles.header}>
                  <span className={styles.eyebrow}>{t.callbackEyebrow}</span>
                  <h3 className={styles.title} id="callback-form-title">
                    {t.callbackTitle}{" "}
                    <span className={styles.titleItalic}>
                      {t.callbackTitleAccent}
                    </span>
                  </h3>
                  <p className={styles.subtitle}>{t.callbackSub}</p>
                </div>

                <form onSubmit={submit} className={styles.form} noValidate>
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
                    <span className={styles.label}>{t.callbackName}</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={fields.name}
                      onChange={setField("name")}
                      placeholder={t.callbackNamePh}
                      maxLength={100}
                      autoComplete="name"
                      required
                      autoFocus
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>{t.callbackPhone}</span>
                    <input
                      className={styles.input}
                      type="tel"
                      value={fields.phone}
                      onChange={setField("phone")}
                      placeholder={t.callbackPhonePh}
                      maxLength={40}
                      autoComplete="tel"
                      inputMode="tel"
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>{t.callbackNote}</span>
                    <textarea
                      className={styles.textarea}
                      value={fields.note}
                      onChange={setField("note")}
                      placeholder={t.callbackNotePh}
                      maxLength={1000}
                      rows={3}
                    />
                  </label>

                  <p className={styles.subtitle} style={{ marginTop: 0 }}>
                    {t.callbackOrCall}{" "}
                    <a
                      href={siteConfig.contacts.phone.url}
                      style={{ color: "inherit", textDecoration: "underline" }}
                    >
                      {siteConfig.contacts.phone.label}
                    </a>
                  </p>

                  <label className={styles.consent}>
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                    />
                    <span>
                      {t.consentPrefix}
                      <Link href={localePath("/privacy")} target="_blank">
                        {t.consentPrivacy}
                      </Link>
                      {t.consentAnd}
                      <Link href={localePath("/terms")} target="_blank">
                        {t.consentTerms}
                      </Link>
                      {t.consentSuffix}
                    </span>
                  </label>

                  {error && <div className={styles.error}>{error}</div>}

                  <div className={styles.actions}>
                    <button
                      type="submit"
                      className={styles.submit}
                      disabled={status === "loading" || !consent}
                    >
                      {status === "loading" ? (
                        t.leadSubmitting
                      ) : (
                        <>
                          {t.callbackSubmit}{" "}
                          <span aria-hidden="true">→</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
