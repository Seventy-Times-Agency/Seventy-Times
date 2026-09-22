// Team members. Add real people here and they render on
// /<locale>/team automatically, each with Person JSON-LD for search
// engines (wired in app/[locale]/team/page.tsx).
//
// We don't invent team members: entries go live only with confirmed
// public names. Bios live inline here (like the case studies) — no i18n
// dictionary changes are needed.

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

// Photos: TODO — the owner drops real portraits into /public/team/
// (founder.jpg, sales-lead.jpg, ops-lead.jpg) and adds `photo: "/team/…"`
// to each entry. Cards render fine without photos until then.
//
// NAMES: the founder entry is live. The two lead entries are fully
// written but commented out until the owner confirms the public names —
// we don't publish invented people. To ship them: fill `name`,
// uncomment, done.
export const TEAM: TeamMember[] = [
  {
    id: "founder",
    name: "Maksym", // TODO: owner — confirm full public name
    role: {
      en: "Founder · Head of Delivery",
      ru: "Основатель · руководитель отдела доставки",
      uk: "Засновник · керівник відділу доставки",
    },
    bio: {
      en: "Builds the systems the agency sells — ads, AI and custom development. Personally leads every project from briefing to launch.",
      ru: "Строит системы, которые продаёт агентство: реклама, AI и кастомная разработка. Лично ведёт каждый проект от брифинга до запуска.",
      uk: "Будує системи, які продає агенція: реклама, AI та кастомна розробка. Особисто веде кожен проєкт від брифінгу до запуску.",
    },
    // photo: "/team/founder.jpg", // TODO: owner adds the portrait
  },
  // {
  //   id: "sales-lead",
  //   name: "TODO — public name", // TODO: owner — confirm
  //   role: {
  //     en: "Head of Sales",
  //     ru: "Руководитель отдела продаж",
  //     uk: "Керівник відділу продажів",
  //   },
  //   bio: {
  //     en: "Runs the sales team and the first conversation you'll have with us. Makes sure a plan lands in your inbox after the briefing — not a sales pitch.",
  //     ru: "Ведёт отдел продаж и первый разговор, который у вас с нами случится. Следит, чтобы после брифинга приходил план, а не продающий скрипт.",
  //     uk: "Веде відділ продажів і першу розмову, яка у вас з нами відбудеться. Стежить, щоб після брифінгу приходив план, а не продажний скрипт.",
  //   },
  //   // photo: "/team/sales-lead.jpg", // TODO: owner adds the portrait
  // },
  // {
  //   id: "ops-lead",
  //   name: "TODO — public name", // TODO: owner — confirm
  //   role: {
  //     en: "Head of Operations",
  //     ru: "Руководитель операционного отдела",
  //     uk: "Керівник операційного відділу",
  //   },
  //   bio: {
  //     en: "Keeps every project's task history and deadlines in order — the chain of hand-offs that our honest-deadlines policy runs on.",
  //     ru: "Держит в порядке историю задач и сроки каждого проекта — те самые цепочки передач, на которых работает наша политика честных сроков.",
  //     uk: "Тримає в порядку історію задач і терміни кожного проєкту — ті самі ланцюжки передач, на яких працює наша політика чесних термінів.",
  //   },
  //   // photo: "/team/ops-lead.jpg", // TODO: owner adds the portrait
  // },
];
