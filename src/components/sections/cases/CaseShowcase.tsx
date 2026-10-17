"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useT } from "@/i18n/context";
import type { Locale } from "@/i18n/config";
import type { CaseItem, CaseShowcase as Showcase } from "@/data/cases";
import styles from "./CaseShowcase.module.css";

// Interface copy that belongs to this layout only.
const UI: Record<
  "start" | "finish" | "more" | "details" | "close" | "shots" | "scheme" | "site",
  Record<Locale, string>
> = {
  start: { en: "Start", ru: "Старт", uk: "Старт" },
  finish: { en: "Finish", ru: "Финиш", uk: "Фініш" },
  more: { en: "Case details", ru: "Подробнее о кейсе", uk: "Детальніше про кейс" },
  details: { en: "Details", ru: "Подробности", uk: "Подробиці" },
  close: { en: "Close", ru: "Закрыть", uk: "Закрити" },
  shots: { en: "Screenshots", ru: "Скриншоты", uk: "Скриншоти" },
  scheme: { en: "The niche at a glance", ru: "Схема ниши", uk: "Схема ніші" },
  site: { en: "Website", ru: "Сайт", uk: "Сайт" },
};

type Props = { item: CaseItem; showcase: Showcase };

// Long names (e.g. "Пассажирские") get a smaller title on desktop.
const LONG_NAME = 10;

/**
 * One-screen case page: brand, start → finish, the key figure, two
 * tilted screenshots (or, without screenshots, a route board and a
 * funnel), and a drawer with the numbers and the story.
 */
export default function CaseShowcase({ item, showcase: s }: Props) {
  const { locale, localePath } = useT();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Tells site-wide chrome (scroll progress) that this page never scrolls.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.oneScreen = "";
    return () => {
      delete root.dataset.oneScreen;
    };
  }, []);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", onKey);
      wasOpen.current = true;
      return () => document.removeEventListener("keydown", onKey);
    }
    if (wasOpen.current) openRef.current?.focus();
  }, [open]);

  const [before, after] = s.spendNote[locale].split("{spend}");
  const name = s.name.map((n) => (typeof n === "string" ? n : n[locale]));
  const long = name.some((n) => n.length > LONG_NAME);
  const rootStyle = { "--case-accent": item.study.accent } as CSSProperties;

  return (
    <>
      <main id="main-content" className={`${styles.theme} ${styles.page}`} style={rootStyle}>
        <section className={styles.left}>
          <div className={styles.top}>
            <Link href={localePath("/")} className={styles.mark}>
              SEVENTY<b>·</b>TIMES
            </Link>
            <span className={styles.chip}>{s.chip[locale]}</span>
          </div>

          <h1 className={`${styles.title} ${long ? styles.long : ""}`}>
            {name[0]}
            <span>{name[1]}</span>
          </h1>

          <div className={styles.path}>
            <div className={`${styles.point} ${styles.start}`}>
              <div className={styles.label}>{UI.start[locale]}</div>
              <p>{s.start[locale]}</p>
            </div>
            <div className={styles.arrow} aria-hidden="true">
              →
            </div>
            <div className={`${styles.point} ${styles.finish}`}>
              <div className={styles.label}>{UI.finish[locale]}</div>
              <p>{s.finish[locale]}</p>
            </div>
          </div>

          <div className={styles.money}>
            <div className={styles.label}>{s.revenueLabel[locale]}</div>
            <span className={styles.sum}>{s.revenue[locale]}</span>
            <div className={styles.note}>
              {before}
              <b>{s.spend[locale]}</b>
              {after}
            </div>
          </div>

          <div className={styles.cta}>
            <button
              ref={openRef}
              type="button"
              className={styles.btn}
              aria-expanded={open}
              aria-controls="case-details"
              onClick={() => setOpen(true)}
            >
              {UI.more[locale]} <i aria-hidden="true">↗</i>
            </button>
          </div>
        </section>

        <section
          className={styles.right}
          aria-label={(s.shots ? UI.shots : UI.scheme)[locale]}
        >
          <div className={styles.well} />
          {s.shots && <Shots shots={s.shots} locale={locale} />}
          {s.scheme && <Scheme scheme={s.scheme} locale={locale} />}
          <div className={`${styles.sticker} ${styles.stickerTop}`}>
            {s.stickers.top.value[locale]}
            <small>{s.stickers.top.label[locale]}</small>
          </div>
          {s.stickers.bottom && (
            <div className={`${styles.sticker} ${styles.stickerBottom}`}>
              {s.stickers.bottom.value[locale]}
              <small>{s.stickers.bottom.label[locale]}</small>
            </div>
          )}
        </section>
      </main>

      <div
        className={styles.overlay}
        style={rootStyle}
        hidden={!open}
        onClick={() => setOpen(false)}
      />
      <aside
        id="case-details"
        className={`${styles.theme} ${styles.drawer}`}
        style={rootStyle}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label={UI.details[locale]}
        data-lenis-prevent
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          aria-label={UI.close[locale]}
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <div>
          <div className={styles.label}>{item.study.title[locale]}</div>
          <h2>{UI.details[locale]}</h2>
        </div>
        <div className={styles.facts}>
          {s.details.map((d) => (
            <div key={d.label.en}>
              <b>{d.value[locale]}</b>
              <span>{d.label[locale]}</span>
            </div>
          ))}
        </div>
        {s.source && <p className={styles.fine}>{s.source[locale]}</p>}
        <div className={styles.story}>
          <h3>{s.story.heading[locale]}</h3>
          {s.story.paragraphs.map((p) => (
            <p key={p.en}>{p[locale]}</p>
          ))}
        </div>
      </aside>
    </>
  );
}

type Part<K extends keyof Showcase> = {
  locale: Locale;
} & Record<K, NonNullable<Showcase[K]>>;

function Shots({ shots, locale }: Part<"shots">) {
  return (
    <>
      <span className={`${styles.shotLabel} ${styles.labelSite}`}>
        {UI.site[locale]}
      </span>
      <figure className={`${styles.shot} ${styles.site}`}>
        <div className={styles.bar}>
          <i />
          <i />
          <i />
          <span>{shots.site.host}</span>
        </div>
        <Image
          src={shots.site.src}
          width={shots.site.width}
          height={shots.site.height}
          alt={shots.site.alt[locale]}
          sizes="(min-width: 1024px) 50vw, 80vw"
          priority
        />
      </figure>
      <figure className={`${styles.shot} ${styles.ads}`}>
        <Image
          src={shots.ads.src}
          width={shots.ads.width}
          height={shots.ads.height}
          alt={shots.ads.alt[locale]}
          sizes="(min-width: 1024px) 36vw, 60vw"
        />
      </figure>
      <span className={`${styles.shotLabel} ${styles.labelAds}`}>
        {shots.ads.label}
      </span>
    </>
  );
}

function Scheme({ scheme, locale }: Part<"scheme">) {
  const last = scheme.funnel.length - 1;
  return (
    <>
      <span className={`${styles.shotLabel} ${styles.labelSite}`}>
        {scheme.label[locale]}
      </span>
      <div className={`${styles.shot} ${styles.site} ${styles.board}`}>
        {scheme.photo && (
          <Image
            className={styles.boardPhoto}
            src={scheme.photo.src}
            width={scheme.photo.width}
            height={scheme.photo.height}
            alt={scheme.photo.alt[locale]}
            sizes="(min-width: 1024px) 45vw, 90vw"
          />
        )}
        <div className={styles.bar}>
          <i />
          <i />
          <i />
          <span>{scheme.caption[locale]}</span>
        </div>
        <div className={styles.route}>
          <b>{scheme.route[0][locale]}</b>
          <em aria-hidden="true">⇄</em>
          <b>{scheme.route[1][locale]}</b>
        </div>
        <dl className={styles.rows}>
          {scheme.rows.map((r) => (
            <div key={r.label.en}>
              <dt>{r.label[locale]}</dt>
              <dd>{r.value[locale]}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ol className={`${styles.shot} ${styles.ads} ${styles.funnel}`}>
        {scheme.funnel.map((f, i) => (
          <li key={f.label.en} className={i === last ? styles.hot : undefined}>
            <small>{f.label[locale]}</small>
            <b>{f.value[locale]}</b>
          </li>
        ))}
      </ol>
      <span className={`${styles.shotLabel} ${styles.labelAds}`}>
        {scheme.funnelLabel[locale]}
      </span>
    </>
  );
}
