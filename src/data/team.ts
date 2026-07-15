// Team members. Add real people here and they render on
// /<locale>/team automatically, each with Person JSON-LD for search
// engines (wired in app/[locale]/team/page.tsx).
//
// Intentionally empty until we have real bios — we don't invent team
// members. While it's empty the page shows the localized placeholder copy
// (teamPlaceholder); the moment an entry is added, the grid + JSON-LD
// light up. No i18n dictionary changes are needed — bios live inline here,
// like the case studies.

import type { Locale } from "@/i18n/config";

/** A string translated into every supported locale. */
type Loc = Record<Locale, string>;

export type TeamMember = {
  /** Stable id — used as the React key. */
  id: string;
  /** Real name — not translated. */
  name: string;
  /** Role / title, localized. */
  role: Loc;
  /** Short bio, localized. */
  bio: Loc;
  /** Optional portrait in /public (e.g. "/team/jane.jpg"). */
  photo?: string;
  /** Optional profile link — shown on the card and in Person `sameAs`. */
  linkedin?: string;
};

// Example shape (copy, fill, uncomment):
//
// {
//   id: "jane-doe",
//   name: "Jane Doe",
//   role: {
//     en: "Founder & Performance Lead",
//     ru: "Основатель и руководитель перформанса",
//     de: "Gründerin & Performance-Lead",
//     uk: "Засновниця та керівниця перформансу",
//   },
//   bio: {
//     en: "…",
//     ru: "…",
//     de: "…",
//     uk: "…",
//   },
//   photo: "/team/jane.jpg",
//   linkedin: "https://www.linkedin.com/in/…",
// },
export const TEAM: TeamMember[] = [];
