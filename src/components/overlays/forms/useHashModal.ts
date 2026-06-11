"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Shared open/close lifecycle for the hash-triggered modals
 * (#lead / #callback / #review). Handles:
 * - opening whenever the URL hash matches (so any `href="#lead"`-style
 *   element anywhere on the page acts as a trigger),
 * - locking body scroll while open,
 * - closing on Escape,
 * - stripping the hash on close without adding a history entry,
 * - running `onAfterClose` once the exit animation finishes — and
 *   cancelling it if the modal reopens mid-animation, so a fresh open
 *   doesn't get its state wiped mid-flight.
 *
 * `onAfterClose` is read through a ref, so callers can pass an inline
 * function without re-arming the effects on every render.
 */
export function useHashModal(
  hash: string,
  onAfterClose: () => void,
  resetDelayMs = 400,
) {
  const [open, setOpen] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);
  const afterClose = useRef(onAfterClose);
  afterClose.current = onAfterClose;

  // Listen to URL hash to know when to open.
  useEffect(() => {
    const check = () => setOpen(window.location.hash === hash);
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, [hash]);

  // Lock body scroll while open; cancel a pending post-close reset if
  // the modal reopened within the exit animation.
  useEffect(() => {
    if (!open) return;
    window.clearTimeout(resetTimer.current);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = useCallback(() => {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
    setOpen(false);
    resetTimer.current = window.setTimeout(
      () => afterClose.current(),
      resetDelayMs,
    );
  }, [resetDelayMs]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return { open, close };
}
