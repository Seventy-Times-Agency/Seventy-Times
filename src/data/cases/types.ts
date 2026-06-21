// Case-study domain types + helpers. Each portfolio case lives in its
// own file in this folder (one `export const <case>: CaseItem`), and
// `index.ts` assembles them into `CASES`. Translatable copy is inline
// as `Record<Locale, string>` so TypeScript enforces every locale.

import type { Locale } from "@/i18n/config";

export type CaseStatus = "live" | "progress" | "soon";

/** A string translated into every supported locale. */
type Loc = Record<Locale, string>;

/** Same text in every locale — for numbers, symbols and brand tokens. */
export const u = (s: string): Loc => ({ en: s, ru: s, de: s, uk: s });

/** Where the work was delivered. Shown as a location badge — we keep
 *  it to the region level (no city) on purpose. */
export type Region = "usa" | "europe";

export const REGION_LABELS: Record<Region, Loc> = {
  usa: { en: "USA", ru: "США", de: "USA", uk: "США" },
  europe: { en: "Europe", ru: "Европа", de: "Europa", uk: "Європа" },
};

type Stat = { value: string; label: Loc };
type Row = { label: Loc; value: Loc };

export type CaseStudy = {
  /** Single accent hue used sparingly on the detail page. */
  accent: string;

  // ── Landing card ──────────────────────────────────────────
  title: Loc;
  tag: Loc;
  summary: Loc;
  metrics?: Loc[];

  // ── Detail hero ───────────────────────────────────────────
  headline: Loc;
  meta: Loc;
  niche: Loc;

  // ── Optional content blocks (rendered when present) ───────
  stats?: Stat[];
  breakdown?: { heading: Loc; rows: Row[] };
  revenue?: {
    heading: Loc;
    rows: Row[];
    roasLabel: Loc;
    roas: string;
    roasNote: Loc;
  };
  deliverables?: { heading: Loc; items: Loc[] };
  /** Extra grouped checklists — used when a build has many features
   *  worth spelling out across several categories. */
  sections?: { heading: Loc; items: Loc[] }[];
  clients?: {
    heading: Loc;
    items: { label: Loc; rows: Row[] }[];
    resultLabel: Loc;
    result: Loc;
  };
  features?: { icon: string; text: Loc }[];
  chat?: { title: Loc; messages: { role: "bot" | "user"; text: Loc }[] };
  stack?: string[];
  services?: Loc[];
  insight?: Loc;
};

export type CaseItem = {
  id: string;
  status: CaseStatus;
  region: Region;
  url?: string;
  study: CaseStudy;
};

export type CaseCardContent = {
  title: string;
  tag: string;
  summary: string;
  metrics?: readonly string[];
  region: Region;
  regionLabel: string;
};

/** Resolve the landing-card fields for a case in the active locale. */
export function caseCardContent(
  item: CaseItem,
  locale: Locale,
): CaseCardContent {
  const s = item.study;
  return {
    title: s.title[locale],
    tag: s.tag[locale],
    summary: s.summary[locale],
    metrics: s.metrics?.map((m) => m[locale]),
    region: item.region,
    regionLabel: REGION_LABELS[item.region][locale],
  };
}
