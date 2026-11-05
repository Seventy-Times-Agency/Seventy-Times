"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Text is always on the page: it sits dim and brightens once it reaches
 * the screen. `lit` flips once and stays. One shared observer serves every
 * caller, so a page full of blocks costs a single IntersectionObserver.
 */
const listeners = new Map<Element, () => void>();
let observer: IntersectionObserver | null = null;

function watch(el: Element, onLit: () => void) {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          listeners.get(e.target)?.();
          listeners.delete(e.target);
          observer?.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
  }
  listeners.set(el, onLit);
  observer.observe(el);
  return () => {
    listeners.delete(el);
    observer?.unobserve(el);
  };
}

export function useLit<T extends Element>() {
  const ref = useRef<T>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return watch(el, () => setLit(true));
  }, []);

  return { ref, lit };
}
