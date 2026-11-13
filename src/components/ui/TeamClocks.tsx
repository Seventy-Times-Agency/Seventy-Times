"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/context";
import type { Dictionary } from "@/i18n/dictionary";
import { CALLBACK_REGION_EVENT } from "@/lib/callbackRegion";
import styles from "@/components/ui/TeamClocks.module.css";

/** Working window, local time of each office, Monday–Friday. */
const OPEN_HOUR = 9;
const CLOSE_HOUR = 19;

type Zone = {
  id: string;
  tz: string;
  /** Older engines only know the pre-2022 id for Kyiv. */
  fallbackTz?: string;
  city: keyof Dictionary;
};

const ZONES: Zone[] = [
  { id: "nyc", tz: "America/New_York", city: "clockNewYork" },
  { id: "ber", tz: "Europe/Berlin", city: "clockBerlin" },
  { id: "kyiv", tz: "Europe/Kyiv", fallbackTz: "Europe/Kiev", city: "clockKyiv" },
  { id: "dxb", tz: "Asia/Dubai", city: "clockDubai" },
];


// ── Dial geometry (same 132-unit box as the old stat rings) ──────
const BOX = 132;
const C = BOX / 2;
const R = 54;
const CIRC = 2 * Math.PI * R;
const round = (n: number) => Math.round(n * 1000) / 1000;

/** 24 hour ticks; 00 / 06 / 12 / 18 are longer. 0h sits at the top. */
const TICKS = Array.from({ length: 24 }, (_, h) => {
  const a = (h / 24) * 2 * Math.PI;
  const major = h % 6 === 0;
  const r1 = R + 5;
  const r2 = R + (major ? 11 : 8);
  return {
    major,
    x1: round(C + Math.cos(a) * r1),
    y1: round(C + Math.sin(a) * r1),
    x2: round(C + Math.cos(a) * r2),
    y2: round(C + Math.sin(a) * r2),
  };
});

// Working-hours arc on the 24 h dial.
const WORK_LEN = (CIRC * (CLOSE_HOUR - OPEN_HOUR)) / 24;
const WORK_OFFSET = -(CIRC * OPEN_HOUR) / 24;

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatterFor(zone: Zone): Intl.DateTimeFormat {
  const cached = formatters.get(zone.id);
  if (cached) return cached;
  const opts: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  };
  let f: Intl.DateTimeFormat;
  try {
    f = new Intl.DateTimeFormat("en-GB", { ...opts, timeZone: zone.tz });
  } catch {
    f = new Intl.DateTimeFormat("en-GB", { ...opts, timeZone: zone.fallbackTz ?? "UTC" });
  }
  formatters.set(zone.id, f);
  return f;
}

type Local = { hh: string; mm: string; hours: number; working: boolean; weekend: boolean };

function localTime(zone: Zone, now: Date): Local {
  const parts = formatterFor(zone).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const hh = get("hour");
  const mm = get("minute");
  const h = Number(hh);
  const m = Number(mm);
  const weekend = get("weekday") === "Sat" || get("weekday") === "Sun";
  const working = !weekend && h >= OPEN_HOUR && h < CLOSE_HOUR;
  return { hh, mm, hours: h + m / 60, working, weekend };
}

/**
 * Hero strip: four 24-hour dials, one per team time zone. Each shows the
 * live local time, the 09–19 working window as an arc, and a "now" dot
 * travelling round the dial. Green + pulse while that office is working
 * (weekdays 09:00–19:00 local), muted steel otherwise. Renders as four
 * grid items so it drops straight into the hero's stats grid.
 *
 * Time is client-only: the server and the first client paint show an
 * empty dial ("--:--"), so static HTML never disagrees with hydration.
 */
export default function TeamClocks() {
  const { t } = useT();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    // Tick on the next whole second, then every second.
    let id: number | undefined;
    const lead = window.setTimeout(() => {
      setNow(new Date());
      id = window.setInterval(() => setNow(new Date()), 1000);
    }, 1000 - (Date.now() % 1000));
    return () => {
      window.clearTimeout(lead);
      if (id) window.clearInterval(id);
    };
  }, []);

  const contact = (city: string) => {
    window.dispatchEvent(new CustomEvent(CALLBACK_REGION_EVENT, { detail: city }));
    window.location.hash = "#callback";
  };

  return (
    <>
      {ZONES.map((zone, i) => {
        const city = t[zone.city] as string;
        const local = now ? localTime(zone, now) : null;
        const on = local?.working ?? false;
        const nowDeg = local ? (local.hours / 24) * 360 : 0;

        return (
          <div
            key={zone.id}
            className={styles.clock}
            data-state={local ? (on ? "on" : "off") : "idle"}
            style={{ ["--i" as string]: i }}
          >
            <div className={styles.dial}>
              <svg className={styles.svg} viewBox={`0 0 ${BOX} ${BOX}`} aria-hidden="true">
                <circle className={styles.guide} cx={C} cy={C} r={R + 15} />
                {TICKS.map((tk, h) => (
                  <line
                    key={h}
                    className={tk.major ? styles.tickMajor : styles.tick}
                    x1={tk.x1}
                    y1={tk.y1}
                    x2={tk.x2}
                    y2={tk.y2}
                  />
                ))}
                <circle className={styles.track} cx={C} cy={C} r={R} />
                <circle
                  className={styles.work}
                  cx={C}
                  cy={C}
                  r={R}
                  style={{
                    strokeDasharray: local ? `${WORK_LEN} ${CIRC}` : `0 ${CIRC}`,
                    strokeDashoffset: WORK_OFFSET,
                  }}
                />
                {local && (
                  <g className={styles.hand} style={{ transform: `rotate(${nowDeg}deg)` }}>
                    <circle className={styles.halo} cx={C + R} cy={C} r={7} />
                    <circle className={styles.now} cx={C + R} cy={C} r={4} />
                  </g>
                )}
              </svg>

              <span className={styles.time} aria-hidden={!local}>
                {local ? (
                  <>
                    {local.hh}
                    <span className={styles.colon}>:</span>
                    {local.mm}
                  </>
                ) : (
                  "--:--"
                )}
              </span>
            </div>

            <span className={styles.city}>{city}</span>

            <span className={styles.status} role="status">
              <span className={styles.dot} aria-hidden="true" />
              {local
                ? on
                  ? t.clockOnline
                  : `${t.clockOffline} · ${local.weekend ? t.clockWeekend : t.clockFrom}`
                : " "}
            </span>

            <button
              type="button"
              className={styles.contact}
              onClick={() => contact(city)}
              aria-label={t.clockContactAria.replace("{city}", city)}
            >
              {t.clockContact}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        );
      })}
    </>
  );
}
