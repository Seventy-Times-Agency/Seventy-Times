"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/i18n/context";
import { isPlausibleContact } from "@/lib/contactValidation";
import {
  clearLeadDraft,
  LEAD_MODE_KEY,
  readLeadDraft,
  writeLeadDraft,
  type LeadBudget,
  type LeadPackage,
} from "@/lib/leadDraft";
import { useHashModal } from "@/components/overlays/forms/useHashModal";
import styles from "@/components/overlays/forms/LeadForm.module.css";

type Status = "idle" | "loading" | "success" | "error";

const INITIAL = {
  name: "",
  contact: "",
  business: "",
  request: "",
  package: "not_sure" as LeadPackage,
  budget: "not_sure" as LeadBudget,
  // Honeypot: a field real users never see. Bots fill every input they find.
  website: "",
};

type FormMode = "steps" | "all";

const TOTAL_STEPS = 3;

/**
 * Global lead-capture modal. Opens whenever the URL hash is `#lead`,
 * so any element with `href="#lead"` anywhere on the page acts as a
 * trigger. Also closable by Escape or clicking the backdrop.
 *
 * Mounted once at the layout level. Defaults to a 3-step wizard
 * (smaller cognitive load per screen, higher completion rate);
 * users can toggle to "all fields at once" via the footer link.
 */
export default function LeadForm() {
  const { t, localePath } = useT();
  const [fields, setFields] = useState(INITIAL);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [mode, setMode] = useState<FormMode>("steps");
  const [step, setStep] = useState(0);

  // Open/close lifecycle (hash trigger, scroll lock, Escape, reset
  // after the exit animation) — shared with the other modals.
  const { open, close } = useHashModal("#lead", () => {
    setStatus("idle");
    setError("");
    setStep(0);
  });

  // Restore the user's draft (everything except the honeypot) and
  // their preferred form mode on mount.
  useEffect(() => {
    const draft = readLeadDraft();
    if (draft) setFields((prev) => ({ ...prev, ...draft }));
    try {
      const saved = window.localStorage.getItem(LEAD_MODE_KEY);
      if (saved === "all" || saved === "steps") setMode(saved);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist any user-typed changes — survives accidental reloads,
  // navigation, or coming back tomorrow. Cleared after a successful
  // submit (see `submit` below).
  useEffect(() => {
    if (!hydrated) return;
    writeLeadDraft({
      name: fields.name,
      contact: fields.contact,
      business: fields.business,
      request: fields.request,
      package: fields.package,
      budget: fields.budget,
    });
  }, [hydrated, fields.name, fields.contact, fields.business, fields.request, fields.package, fields.budget]);

  // Persist the user's chosen form mode.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(LEAD_MODE_KEY, mode);
    } catch {
      // ignore
    }
  }, [hydrated, mode]);

  const setField = (key: keyof typeof INITIAL) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const setPackage = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFields((prev) => ({ ...prev, package: e.target.value as LeadPackage }));

  const setBudget = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFields((prev) => ({ ...prev, budget: e.target.value as LeadBudget }));

  // Track how many of the four required fields are filled, for the
  // progress bar at the top of the modal.
  const filledCount = useMemo(() => {
    let n = 0;
    if (fields.name.trim()) n++;
    if (fields.contact.trim()) n++;
    if (fields.business.trim()) n++;
    if (fields.request.trim()) n++;
    return n;
  }, [fields.name, fields.contact, fields.business, fields.request]);
  const totalFields = 4;
  const progressPct = (filledCount / totalFields) * 100;

  const submit = useCallback(async () => {
    // Guard against a triple-tap on slow networks — the disabled
    // state on the button takes effect on the next render, by which
    // point a fast finger has already double-tapped.
    if (status === "loading") return;

    const name = fields.name.trim();
    const contact = fields.contact.trim();
    const business = fields.business.trim();
    const request = fields.request.trim();

    if (!name || !contact || !business || !request) {
      setError(t.leadFillAll);
      // Bounce the user back to the first step that still has empty
      // required fields.
      if (mode === "steps") {
        if (!name || !contact) setStep(0);
        else if (!business) setStep(1);
        else setStep(2);
      }
      return;
    }

    if (!isPlausibleContact(contact)) {
      setError(t.leadInvalidContact);
      if (mode === "steps") setStep(0);
      return;
    }

    if (!consent) {
      setError(t.consentRequired);
      if (mode === "steps") setStep(2);
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
          package: fields.package,
          budget: fields.budget,
          website: fields.website,
        }),
      });

      if (!res.ok) {
        // Map the stable server-side code (English, e.g. "TOO_LONG")
        // to the active locale's user-facing string. Falls back to a
        // generic message for unknown codes so we never display the
        // raw code to the user.
        let code = "";
        try {
          const data = (await res.json()) as { error?: string };
          code = typeof data.error === "string" ? data.error : "";
        } catch {
          // body wasn't JSON
        }
        const msg =
          res.status === 429
            ? t.leadTooMany
            : code === "TOO_LONG"
              ? t.leadTooLong
              : code === "NOT_CONFIGURED"
                ? t.leadNotConfigured
                : code === "MISSING_FIELDS"
                  ? t.leadFillAll
                  : t.chatFallback;
        throw new Error(msg);
      }

      setStatus("success");
      setFields(INITIAL);
      setConsent(false);
      setStep(0);
      clearLeadDraft();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t.chatError);
    }
  }, [fields, consent, mode, status, t]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "all" || step === TOTAL_STEPS - 1) {
      submit();
    } else {
      goNext();
    }
  };

  // Step-by-step mode helpers.
  const validateStep = (n: number): string | null => {
    if (n === 0) {
      const name = fields.name.trim();
      const contact = fields.contact.trim();
      if (!name) return t.leadFillStep1;
      if (!contact) return t.leadFillStep1;
      if (!isPlausibleContact(contact)) return t.leadInvalidContact;
    }
    if (n === 1) {
      if (!fields.business.trim()) return t.leadFillStep2;
    }
    if (n === 2) {
      if (!fields.request.trim()) return t.leadFillStep3;
    }
    return null;
  };

  const goNext = () => {
    const err = validateStep(step);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const stepLabel = t.leadStepLabel
    .replace("{n}", String(step + 1))
    .replace("{total}", String(TOTAL_STEPS));

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
                  <span className={styles.eyebrow}>
                    {mode === "steps" ? stepLabel : t.leadEyebrow}
                  </span>
                  <h3 className={styles.title} id="lead-form-title">
                    {t.leadTitle}{" "}
                    <span className={styles.titleItalic}>{t.leadTitleAccent}</span>
                  </h3>
                  <p className={styles.subtitle}>
                    {mode === "steps"
                      ? step === 0
                        ? t.leadStep1Sub
                        : step === 1
                          ? t.leadStep2Sub
                          : t.leadStep3Sub
                      : t.leadSub}
                  </p>
                </div>

                <div
                  className={styles.progress}
                  role="progressbar"
                  aria-valuenow={
                    mode === "steps" ? step + 1 : filledCount
                  }
                  aria-valuemin={0}
                  aria-valuemax={mode === "steps" ? TOTAL_STEPS : totalFields}
                  aria-label={t.leadProgressAria}
                >
                  <div
                    className={styles.progressBar}
                    style={{
                      width: `${
                        mode === "steps"
                          ? ((step + 1) / TOTAL_STEPS) * 100
                          : progressPct
                      }%`,
                    }}
                  />
                </div>

                <form onSubmit={handleFormSubmit} className={styles.form} noValidate>
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

                  {(mode === "all" || step === 0) && (
                    <>
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
                          autoFocus={mode === "steps" && step === 0}
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
                    </>
                  )}

                  {(mode === "all" || step === 1) && (
                    <>
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
                          autoFocus={mode === "steps" && step === 1}
                        />
                      </label>

                      <label className={styles.field}>
                        <span className={styles.label}>{t.leadPackage}</span>
                        <select
                          className={styles.input}
                          value={fields.package}
                          onChange={setPackage}
                        >
                          <option value="not_sure">{t.leadPackageNotSure}</option>
                          <option value="launch">{t.leadPackageLaunch}</option>
                          <option value="growth">{t.leadPackageGrowth}</option>
                          <option value="scale">{t.leadPackageScale}</option>
                          <option value="standalone">{t.leadPackageStandalone}</option>
                        </select>
                      </label>

                      <label className={styles.field}>
                        <span className={styles.label}>{t.leadBudget}</span>
                        <select
                          className={styles.input}
                          value={fields.budget}
                          onChange={setBudget}
                        >
                          <option value="not_sure">{t.leadBudgetNotSure}</option>
                          <option value="under_1k">{t.leadBudgetUnder1k}</option>
                          <option value="1k_3k">{t.leadBudget1k3k}</option>
                          <option value="3k_10k">{t.leadBudget3k10k}</option>
                          <option value="10k_plus">{t.leadBudget10kPlus}</option>
                        </select>
                      </label>
                    </>
                  )}

                  {(mode === "all" || step === 2) && (
                    <>
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
                          autoFocus={mode === "steps" && step === 2}
                        />
                      </label>

                      <label className={styles.consent}>
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          required
                          aria-required="true"
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
                    </>
                  )}

                  {error && (
                    <div className={styles.error} role="alert" aria-live="polite">
                      {error}
                    </div>
                  )}

                  <div className={styles.actions}>
                    {mode === "steps" && step > 0 && (
                      <button
                        type="button"
                        className={styles.back}
                        onClick={goBack}
                      >
                        ← {t.leadBack}
                      </button>
                    )}

                    <button
                      type="submit"
                      className={styles.submit}
                      disabled={
                        status === "loading" ||
                        ((mode === "all" || step === TOTAL_STEPS - 1) &&
                          !consent)
                      }
                    >
                      {status === "loading" ? (
                        t.leadSubmitting
                      ) : mode === "steps" && step < TOTAL_STEPS - 1 ? (
                        <>
                          {t.leadNext} <span aria-hidden="true">→</span>
                        </>
                      ) : (
                        <>
                          {t.leadSubmit} <span aria-hidden="true">→</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    className={styles.modeToggle}
                    onClick={() =>
                      setMode((m) => (m === "steps" ? "all" : "steps"))
                    }
                  >
                    {mode === "steps" ? t.leadModeAll : t.leadModeSteps}
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
