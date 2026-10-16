// Case-study domain types + helpers. Each portfolio case lives in its
// own file in this folder (one `export const <case>: CaseItem`), and
// `index.ts` assembles them into `CASES`. Translatable copy is inline
// as `Record<Locale, string>` so TypeScript enforces every locale.

import type { Locale } from "@/i18n/config";

export type CaseStatus = "live" | "progress" | "soon";

/** A string translated into every supported locale. */
type Loc = Record<Locale, string>;

/** Same text in every locale — for numbers, symbols and brand tokens. */
export const u = (s: string): Loc => ({ en: s, ru: s, uk: s });

/** Where the work was delivered. Shown as a location badge — we keep
 *  it to the region level (no city) on purpose. */
export type Region = "usa" | "europe";

export const REGION_LABELS: Record<Region, Loc> = {
  usa: { en: "USA", ru: "США", uk: "США" },
  europe: { en: "Europe", ru: "Европа", uk: "Європа" },
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

  /** One-screen showcase layout. When present, the case page renders
   *  `CaseShowcase` (brand, start → finish, revenue, two tilted
   *  screenshots, details drawer) instead of the long detail page. */
  showcase?: CaseShowcase;
};

type Shot = { src: string; alt: Loc; width: number; height: number };
type Fact = { value: Loc; label: Loc };

type Scheme = {
  /** Tag above the board, e.g. "Route". */
  label: Loc;
  /** Small caption in the board's title bar. */
  caption: Loc;
  /** Two ends of the route, drawn as "A ⇄ B". */
  route: [Loc, Loc];
  rows: Row[];
  /** Tag under the funnel card, e.g. "Daily economics". */
  funnelLabel: Loc;
  /** Funnel steps, numbered 01–04; the last one is highlighted. */
  funnel: Fact[];
};

export type CaseShowcase = {
  /** Small pill next to the logo, e.g. "Case · E-commerce · USA". */
  chip: Loc;
  /** Name split in two lines; the second is drawn as outline. A plain
   *  string is a brand name, the same in every locale. */
  name: [string | Loc, string | Loc];
  start: Loc;
  finish: Loc;
  revenueLabel: Loc;
  revenue: Loc;
  /** Line under the revenue figure, e.g. "on $2,267 ad spend". The
   *  `{spend}` token is replaced by `spend` in bold. */
  spendNote: Loc;
  spend: Loc;
  /** Two tilted screenshots on the right. Omit when there are none and
   *  give `scheme` instead. */
  shots?: { site: Shot & { host: string }; ads: Shot & { label: string } };
  /** Screenshot-free right side: a route board and a numbered funnel,
   *  for cases where the ad accounts no longer exist. */
  scheme?: Scheme;
  stickers: { top: Fact; bottom?: Fact };
  details: Fact[];
  /** Fine print under the details: where the numbers come from. */
  source?: Loc;
  story: { heading: Loc; paragraphs: Loc[] };
};

export type CaseItem = {
  id: string;
  status: CaseStatus;
  region: Region;
  url?: string;
  /** "early" marks the 2020–2021 pre-war-Ukraine experience shelf —
   *  rendered as a visually separate group that newer cases displace. */
  era?: "early";
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
