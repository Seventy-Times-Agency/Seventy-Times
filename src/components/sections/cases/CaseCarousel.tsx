"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import styles from "@/components/sections/Cases.module.css";

type Props = {
  children: ReactNode;
  label: string;
  prevLabel: string;
  nextLabel: string;
  /** Slide centred on first paint. */
  initialIndex?: number;
};

/** Side slides shrink and fade with their distance from the centre. */
const SIDE_SCALE = 0.84;
const SIDE_OPACITY = 0.55;

/**
 * Horizontal case carousel. Native scroll + scroll-snap does the swiping
 * (touch, trackpad, shift+wheel); arrows, dots, keyboard and mouse drag
 * drive the same scroll. Scale/opacity are written to the slides directly
 * on every scroll frame (no React state in the loop), so the centre card
 * grows smoothly as it slides in.
 */
export default function CaseCarousel({
  children,
  label,
  prevLabel,
  nextLabel,
  initialIndex = 0,
}: Props) {
  const slides = Children.toArray(children);
  const count = slides.length;

  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(initialIndex);
  const activeRef = useRef(initialIndex);

  const reducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Scroll offset that centres slide `i` in the track. */
  const offsetFor = (i: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[i];
    if (!track || !slide) return 0;
    return slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2;
  };

  const goTo = useCallback(
    (i: number, smooth = true) => {
      const track = trackRef.current;
      if (!track) return;
      const target = Math.max(0, Math.min(count - 1, i));
      track.scrollTo({
        left: offsetFor(target),
        behavior: smooth && !reducedMotion() ? "smooth" : "auto",
      });
    },
    [count],
  );

  // Paint scale/opacity from the current scroll position.
  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const centre = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    slideRefs.current.forEach((slide, i) => {
      if (!slide) return;
      const mid = slide.offsetLeft + slide.offsetWidth / 2;
      const d = (mid - centre) / slide.offsetWidth;
      const k = Math.min(1, Math.abs(d));
      slide.style.transform = `scale(${1 - (1 - SIDE_SCALE) * k})`;
      slide.style.opacity = String(1 - (1 - SIDE_OPACITY) * k);
      if (Math.abs(d) < best) {
        best = Math.abs(d);
        nearest = i;
      }
    });
    if (nearest !== activeRef.current) {
      activeRef.current = nearest;
      setActive(nearest);
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    };
    const onResize = () => {
      goTo(activeRef.current, false);
      onScroll();
    };
    goTo(initialIndex, false);
    paint();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [goTo, paint, initialIndex]);

  // ── Mouse drag (touch already swipes natively) ─────────────
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { on: true, x: e.clientX, left: track.scrollLeft, moved: false };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d.on || !track) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      track.setPointerCapture(e.pointerId);
      track.dataset.dragging = "true";
    }
    if (d.moved) track.scrollLeft = d.left - dx;
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d.on || !track) return;
    d.on = false;
    if (!d.moved) return;
    if (track.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }
    delete track.dataset.dragging;
    goTo(activeRef.current);
  };

  // A drag must not count as a click; a click on a side card brings it
  // to the centre instead of opening it.
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
      return;
    }
    const slide = (e.target as HTMLElement).closest<HTMLElement>("[data-slide]");
    if (!slide) return;
    const i = Number(slide.dataset.slide);
    if (i !== activeRef.current) {
      e.preventDefault();
      e.stopPropagation();
      goTo(i);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(activeRef.current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(activeRef.current - 1);
    }
  };

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
      >
        {slides.map((child, i) => (
          <div
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className={styles.slide}
            data-slide={i}
            data-active={i === active ? "true" : undefined}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}`}
          >
            {child}
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label={prevLabel}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={styles.dot}
              data-active={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
              aria-label={`${i + 1} / ${count}`}
              aria-current={i === active ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.navBtn}
          onClick={() => goTo(active + 1)}
          disabled={active === count - 1}
          aria-label={nextLabel}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
