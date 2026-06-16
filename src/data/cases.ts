// Portfolio cases. Add new entries here — each item references content
// in one of two ways:
//
//  1. Legacy dictionary keys (`titleKey` / `tagKey` / …). The copy lives
//     in `src/i18n/locales/*` and the detail page renders the simple
//     `CaseDetail` layout. Used by the two cases we're reworking later.
//
//  2. An inline localized `study` object. Because a full case study is
//     deeply structured (stat grids, revenue maths, client breakdowns,
//     chat previews) rather than a handful of flat strings, the copy is
//     co-located here as `Record<Locale, string>` values — TypeScript
//     still enforces that every locale is present. These render the rich
//     `CaseStudyDetail` layout.
//
// `url` is optional: when set, the detail page exposes an external link
// (typically a public live project).

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

export type CaseStatus = "live" | "progress" | "soon";

/** A string translated into every supported locale. */
type Loc = Record<Locale, string>;

/** Same text in every locale — for numbers, symbols and brand tokens. */
const u = (s: string): Loc => ({ en: s, ru: s, de: s, uk: s });

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
  // Legacy dictionary-keyed content.
  titleKey?: "case1Title" | "case2Title";
  tagKey?: "case1Tag" | "case2Tag";
  summaryKey?: "case1Summary" | "case2Summary";
  metricsKey?: "case1Metrics" | "case2Metrics";
  // Rich inline-localized study.
  study?: CaseStudy;
};

export type CaseCardContent = {
  title: string;
  tag: string;
  summary: string;
  metrics?: readonly string[];
  region: Region;
  regionLabel: string;
};

/**
 * Resolve the landing-card fields for a case in the active locale,
 * regardless of whether it stores content inline or via the dictionary.
 */
export function caseCardContent(
  item: CaseItem,
  locale: Locale,
  t: Dictionary,
): CaseCardContent {
  const region = item.region;
  const regionLabel = REGION_LABELS[region][locale];
  if (item.study) {
    const s = item.study;
    return {
      title: s.title[locale],
      tag: s.tag[locale],
      summary: s.summary[locale],
      metrics: s.metrics?.map((m) => m[locale]),
      region,
      regionLabel,
    };
  }
  return {
    title: t[item.titleKey!],
    tag: t[item.tagKey!],
    summary: t[item.summaryKey!],
    metrics: item.metricsKey ? t[item.metricsKey] : undefined,
    region,
    regionLabel,
  };
}

export const CASES: readonly CaseItem[] = [
  // ── Passenger transport · Europe ──────────────────────────
  {
    id: "passenger-transport",
    status: "live",
    region: "europe",
    study: {
      accent: "#FF6B35",
      title: {
        en: "Passenger Transport",
        ru: "Пассажирские перевозки",
        de: "Personenbeförderung",
        uk: "Пасажирські перевезення",
      },
      tag: u("META ADS · EUROPE"),
      summary: {
        en: "A small passenger-transport business in Europe. Meta Ads on a $200/mo budget brought 7–15 booking requests a day — demand outran capacity and the campaign was paused more than once.",
        ru: "Небольшой бизнес пассажирских перевозок в Европе. Реклама в Meta на бюджете $200/мес приносила 7–15 заявок в день — спрос превышал ёмкость, и кампанию не раз ставили на паузу.",
        de: "Ein kleines Personenbeförderungsunternehmen in Europa. Meta Ads mit 200 $/Monat Budget brachten 7–15 Buchungsanfragen pro Tag — die Nachfrage überstieg die Kapazität, die Kampagne wurde mehrfach pausiert.",
        uk: "Невеликий бізнес пасажирських перевезень у Європі. Реклама в Meta на бюджеті $200/міс приносила 7–15 заявок на день — попит перевищував спроможність, і кампанію не раз ставили на паузу.",
      },
      metrics: [
        {
          en: "7–15 leads per day",
          ru: "7–15 лидов в день",
          de: "7–15 Leads pro Tag",
          uk: "7–15 лідів на день",
        },
        {
          en: "~$7 daily ad spend",
          ru: "~$7 расходов в день",
          de: "~7 $ Tagesbudget",
          uk: "~$7 витрат на день",
        },
        {
          en: "9-month partnership, 2 referrals",
          ru: "9 месяцев сотрудничества, 2 реферала",
          de: "9 Monate Partnerschaft, 2 Empfehlungen",
          uk: "9 місяців співпраці, 2 реферали",
        },
      ],
      headline: {
        en: "7–15 leads per day",
        ru: "7–15 лидов в день",
        de: "7–15 Leads pro Tag",
        uk: "7–15 лідів на день",
      },
      meta: {
        en: "$200/mo budget · 9 months · 2 referral clients",
        ru: "Бюджет $200/мес · 9 месяцев · 2 клиента по рекомендации",
        de: "200 $/Monat Budget · 9 Monate · 2 Empfehlungskunden",
        uk: "Бюджет $200/міс · 9 місяців · 2 клієнти за рекомендацією",
      },
      niche: {
        en: "Transportation · Europe",
        ru: "Перевозки · Европа",
        de: "Beförderung · Europa",
        uk: "Перевезення · Європа",
      },
      stats: [
        {
          value: "$200",
          label: {
            en: "Monthly budget",
            ru: "Бюджет в месяц",
            de: "Monatsbudget",
            uk: "Бюджет на місяць",
          },
        },
        {
          value: "~$7",
          label: {
            en: "Daily spend",
            ru: "Расход в день",
            de: "Tagesausgaben",
            uk: "Витрати на день",
          },
        },
        {
          value: "2–3",
          label: {
            en: "Bookings / day",
            ru: "Брони в день",
            de: "Buchungen / Tag",
            uk: "Броні на день",
          },
        },
        {
          value: "9 mo",
          label: {
            en: "Partnership",
            ru: "Сотрудничество",
            de: "Partnerschaft",
            uk: "Співпраця",
          },
        },
      ],
      breakdown: {
        heading: {
          en: "Campaign details",
          ru: "Детали кампании",
          de: "Kampagnendetails",
          uk: "Деталі кампанії",
        },
        rows: [
          {
            label: {
              en: "Monthly ad budget",
              ru: "Рекламный бюджет в месяц",
              de: "Monatliches Werbebudget",
              uk: "Рекламний бюджет на місяць",
            },
            value: u("$200"),
          },
          {
            label: {
              en: "Daily spend",
              ru: "Расход в день",
              de: "Tagesausgaben",
              uk: "Витрати на день",
            },
            value: u("~$6–7"),
          },
          {
            label: {
              en: "Leads generated",
              ru: "Лидов получено",
              de: "Generierte Leads",
              uk: "Згенеровано лідів",
            },
            value: {
              en: "7–15 / day",
              ru: "7–15 / день",
              de: "7–15 / Tag",
              uk: "7–15 / день",
            },
          },
          {
            label: {
              en: "Bookings closed",
              ru: "Закрытых броней",
              de: "Abgeschlossene Buchungen",
              uk: "Закритих броней",
            },
            value: {
              en: "2–3 / day",
              ru: "2–3 / день",
              de: "2–3 / Tag",
              uk: "2–3 / день",
            },
          },
          {
            label: {
              en: "Avg ticket",
              ru: "Средний чек",
              de: "Durchschnittl. Ticket",
              uk: "Середній чек",
            },
            value: u("~€180"),
          },
        ],
      },
      revenue: {
        heading: {
          en: "Revenue estimate",
          ru: "Оценка выручки",
          de: "Umsatzschätzung",
          uk: "Оцінка виручки",
        },
        rows: [
          {
            label: {
              en: "2 bookings × €180",
              ru: "2 брони × €180",
              de: "2 Buchungen × 180 €",
              uk: "2 броні × €180",
            },
            value: {
              en: "€360 / day",
              ru: "€360 / день",
              de: "360 € / Tag",
              uk: "€360 / день",
            },
          },
          {
            label: {
              en: "× 25 working days",
              ru: "× 25 рабочих дней",
              de: "× 25 Arbeitstage",
              uk: "× 25 робочих днів",
            },
            value: {
              en: "~€9,000 / mo",
              ru: "~€9 000 / мес",
              de: "~9.000 € / Mon.",
              uk: "~€9 000 / міс",
            },
          },
        ],
        roasLabel: {
          en: "Est. ROAS",
          ru: "Оценка ROAS",
          de: "Geschätzter ROAS",
          uk: "Орієнтовний ROAS",
        },
        roas: "~45×",
        roasNote: {
          en: "excl. operational costs",
          ru: "без учёта операционных расходов",
          de: "ohne Betriebskosten",
          uk: "без операційних витрат",
        },
      },
      insight: {
        en: "Results exceeded capacity — the campaign was paused several times. The client referred us to two more businesses.",
        ru: "Результаты превышали ёмкость — кампанию несколько раз ставили на паузу. Клиент порекомендовал нас ещё двум бизнесам.",
        de: "Die Ergebnisse überstiegen die Kapazität — die Kampagne wurde mehrfach pausiert. Der Kunde empfahl uns an zwei weitere Unternehmen.",
        uk: "Результати перевищували спроможність — кампанію кілька разів ставили на паузу. Клієнт порекомендував нас ще двом бізнесам.",
      },
      services: [
        {
          en: "Meta Ads setup",
          ru: "Настройка Meta Ads",
          de: "Meta-Ads-Setup",
          uk: "Налаштування Meta Ads",
        },
        {
          en: "Creative production",
          ru: "Продакшн креативов",
          de: "Creative-Produktion",
          uk: "Продакшн креативів",
        },
        {
          en: "Audience targeting",
          ru: "Таргетинг аудитории",
          de: "Zielgruppen-Targeting",
          uk: "Таргетинг аудиторії",
        },
      ],
    },
  },

  // ── Children's fashion · local retail ─────────────────────
  {
    id: "kids-fashion",
    status: "live",
    region: "europe",
    study: {
      accent: "#A855F7",
      title: {
        en: "Kids Fashion",
        ru: "Детская мода",
        de: "Kindermode",
        uk: "Дитяча мода",
      },
      tag: u("META ADS · CREATIVE"),
      summary: {
        en: "A children's fashion local retailer. End-to-end: we organized the photoshoot, produced every ad creative, and ran the Meta campaign — about $1 cost per lead on a local budget.",
        ru: "Локальный ритейлер детской моды. Под ключ: организовали фотосессию, отсняли все креативы и вели кампанию в Meta — около $1 за лид на локальном бюджете.",
        de: "Ein lokaler Händler für Kindermode. Alles aus einer Hand: Wir organisierten das Fotoshooting, produzierten alle Creatives und betreuten die Meta-Kampagne — rund 1 $ pro Lead bei lokalem Budget.",
        uk: "Локальний ритейлер дитячої моди. Під ключ: організували фотосесію, відзняли всі креативи й вели кампанію в Meta — близько $1 за лід на локальному бюджеті.",
      },
      metrics: [
        {
          en: "~$1 cost per lead",
          ru: "~$1 за лид",
          de: "~1 $ pro Lead",
          uk: "~$1 за лід",
        },
        {
          en: "$250/mo local budget",
          ru: "$250/мес локальный бюджет",
          de: "250 $/Monat lokales Budget",
          uk: "$250/міс локальний бюджет",
        },
        {
          en: "Full creative production",
          ru: "Полный продакшн креативов",
          de: "Komplette Creative-Produktion",
          uk: "Повний продакшн креативів",
        },
      ],
      headline: {
        en: "Ads + full creative",
        ru: "Реклама + весь креатив",
        de: "Ads + komplettes Creative",
        uk: "Реклама + весь креатив",
      },
      meta: {
        en: "$250/mo budget · 3 months · end-to-end production",
        ru: "Бюджет $250/мес · 3 месяца · продакшн под ключ",
        de: "250 $/Monat Budget · 3 Monate · Produktion aus einer Hand",
        uk: "Бюджет $250/міс · 3 місяці · продакшн під ключ",
      },
      niche: {
        en: "Fashion · Local retail",
        ru: "Мода · Локальный ритейл",
        de: "Mode · Lokaler Handel",
        uk: "Мода · Локальний ритейл",
      },
      stats: [
        {
          value: "$250",
          label: {
            en: "Monthly budget",
            ru: "Бюджет в месяц",
            de: "Monatsbudget",
            uk: "Бюджет на місяць",
          },
        },
        {
          value: "~$10",
          label: {
            en: "Daily spend",
            ru: "Расход в день",
            de: "Tagesausgaben",
            uk: "Витрати на день",
          },
        },
        {
          value: "~$1",
          label: {
            en: "Cost per lead",
            ru: "Стоимость лида",
            de: "Kosten pro Lead",
            uk: "Вартість ліда",
          },
        },
        {
          value: "3 mo",
          label: {
            en: "Duration",
            ru: "Длительность",
            de: "Dauer",
            uk: "Тривалість",
          },
        },
      ],
      breakdown: {
        heading: {
          en: "Campaign details",
          ru: "Детали кампании",
          de: "Kampagnendetails",
          uk: "Деталі кампанії",
        },
        rows: [
          {
            label: {
              en: "Monthly budget",
              ru: "Бюджет в месяц",
              de: "Monatsbudget",
              uk: "Бюджет на місяць",
            },
            value: {
              en: "$250 / mo",
              ru: "$250 / мес",
              de: "250 $ / Mon.",
              uk: "$250 / міс",
            },
          },
          {
            label: {
              en: "Daily spend",
              ru: "Расход в день",
              de: "Tagesausgaben",
              uk: "Витрати на день",
            },
            value: u("~$10"),
          },
          {
            label: {
              en: "Cost per lead",
              ru: "Стоимость лида",
              de: "Kosten pro Lead",
              uk: "Вартість ліда",
            },
            value: u("~$1"),
          },
          {
            label: {
              en: "Traffic type",
              ru: "Тип трафика",
              de: "Traffic-Typ",
              uk: "Тип трафіку",
            },
            value: {
              en: "Local geo-targeted",
              ru: "Локальный гео-таргет",
              de: "Lokal geo-targetiert",
              uk: "Локальний гео-таргет",
            },
          },
          {
            label: {
              en: "Duration",
              ru: "Длительность",
              de: "Dauer",
              uk: "Тривалість",
            },
            value: {
              en: "3 months",
              ru: "3 месяца",
              de: "3 Monate",
              uk: "3 місяці",
            },
          },
        ],
      },
      deliverables: {
        heading: {
          en: "What we delivered",
          ru: "Что мы сделали",
          de: "Was wir geliefert haben",
          uk: "Що ми зробили",
        },
        items: [
          {
            en: "Organized a full photoshoot (photographer + models)",
            ru: "Организовали полноценную фотосессию (фотограф + модели)",
            de: "Komplettes Fotoshooting organisiert (Fotograf + Models)",
            uk: "Організували повноцінну фотосесію (фотограф + моделі)",
          },
          {
            en: "Produced all ad creatives from the shoot",
            ru: "Сделали все рекламные креативы с этой съёмки",
            de: "Alle Werbe-Creatives aus dem Shooting produziert",
            uk: "Зробили всі рекламні креативи з цієї зйомки",
          },
          {
            en: "Built and managed the Meta Ads campaign",
            ru: "Собрали и вели кампанию в Meta Ads",
            de: "Meta-Ads-Kampagne aufgebaut und betreut",
            uk: "Зібрали й вели кампанію в Meta Ads",
          },
          {
            en: "Generated high-volume DM and profile-visit traffic",
            ru: "Сгенерировали большой поток сообщений и переходов в профиль",
            de: "Hohes Volumen an DMs und Profilbesuchen generiert",
            uk: "Згенерували великий потік повідомлень і переходів у профіль",
          },
        ],
      },
      insight: {
        en: "About $1 cost per lead on a local budget. Engagement volume was high — we ended the campaign because of client-side processing limits.",
        ru: "Около $1 за лид на локальном бюджете. Поток заявок был большой — мы завершили кампанию из-за ограничений на стороне клиента по обработке.",
        de: "Rund 1 $ pro Lead bei lokalem Budget. Das Engagement-Volumen war hoch — wir beendeten die Kampagne wegen Bearbeitungsgrenzen aufseiten des Kunden.",
        uk: "Близько $1 за лід на локальному бюджеті. Потік заявок був великий — ми завершили кампанію через обмеження з боку клієнта в обробці.",
      },
      services: [
        {
          en: "Meta Ads management",
          ru: "Ведение Meta Ads",
          de: "Meta-Ads-Management",
          uk: "Ведення Meta Ads",
        },
        {
          en: "Photoshoot organization",
          ru: "Организация фотосессии",
          de: "Fotoshooting-Organisation",
          uk: "Організація фотосесії",
        },
        {
          en: "Creative production",
          ru: "Продакшн креативов",
          de: "Creative-Produktion",
          uk: "Продакшн креативів",
        },
        {
          en: "Local geo targeting",
          ru: "Локальный гео-таргетинг",
          de: "Lokales Geo-Targeting",
          uk: "Локальний гео-таргетинг",
        },
      ],
    },
  },

  // ── Bukovel · winter resorts ──────────────────────────────
  {
    id: "bukovel",
    status: "live",
    region: "europe",
    study: {
      accent: "#60A5FA",
      title: {
        en: "Bukovel Resorts",
        ru: "Курорты Буковеля",
        de: "Bukovel-Resorts",
        uk: "Курорти Буковеля",
      },
      tag: u("META ADS · HOSPITALITY"),
      summary: {
        en: "Two winter-resort clients in Bukovel. A 1.5-month Meta campaign on a combined $2,000 budget sold out seasonal capacity for both.",
        ru: "Два клиента — зимние курорты в Буковеле. Кампания в Meta за 1,5 месяца на совокупном бюджете $2 000 распродала сезонную ёмкость у обоих.",
        de: "Zwei Winterresort-Kunden in Bukovel. Eine 1,5-monatige Meta-Kampagne mit insgesamt 2.000 $ Budget machte bei beiden die Saisonkapazität ausverkauft.",
        uk: "Два клієнти — зимові курорти в Буковелі. Кампанія в Meta за 1,5 місяця на сукупному бюджеті $2 000 розпродала сезонну спроможність в обох.",
      },
      metrics: [
        {
          en: "2 resorts sold out",
          ru: "2 курорта распроданы",
          de: "2 Resorts ausverkauft",
          uk: "2 курорти розпродані",
        },
        {
          en: "$2,000 combined budget",
          ru: "$2 000 совокупный бюджет",
          de: "2.000 $ Gesamtbudget",
          uk: "$2 000 сукупний бюджет",
        },
        {
          en: "$500–1,500 avg booking",
          ru: "$500–1 500 средняя бронь",
          de: "500–1.500 $ Ø-Buchung",
          uk: "$500–1 500 середня броня",
        },
      ],
      headline: {
        en: "Season sold out",
        ru: "Сезон распродан",
        de: "Saison ausverkauft",
        uk: "Сезон розпродано",
      },
      meta: {
        en: "2 resort clients · $2,000 combined budget · 1.5 months",
        ru: "2 клиента-курорта · бюджет $2 000 · 1,5 месяца",
        de: "2 Resort-Kunden · 2.000 $ Gesamtbudget · 1,5 Monate",
        uk: "2 клієнти-курорти · бюджет $2 000 · 1,5 місяця",
      },
      niche: {
        en: "Hospitality · Europe · Winter",
        ru: "Гостеприимство · Европа · Зима",
        de: "Hospitality · Europa · Winter",
        uk: "Гостинність · Європа · Зима",
      },
      stats: [
        {
          value: "$800",
          label: {
            en: "Client 1 budget",
            ru: "Бюджет клиента 1",
            de: "Budget Kunde 1",
            uk: "Бюджет клієнта 1",
          },
        },
        {
          value: "$1,200",
          label: {
            en: "Client 2 budget",
            ru: "Бюджет клиента 2",
            de: "Budget Kunde 2",
            uk: "Бюджет клієнта 2",
          },
        },
        {
          value: "$500–1.5k",
          label: {
            en: "Avg booking",
            ru: "Средняя бронь",
            de: "Ø-Buchung",
            uk: "Середня броня",
          },
        },
        {
          value: "2×",
          label: {
            en: "Sold out",
            ru: "Распродано",
            de: "Ausverkauft",
            uk: "Розпродано",
          },
        },
      ],
      clients: {
        heading: {
          en: "Campaign breakdown",
          ru: "Разбивка кампании",
          de: "Kampagnen-Aufschlüsselung",
          uk: "Розбивка кампанії",
        },
        items: [
          {
            label: {
              en: "Client 1 · Private chalet base",
              ru: "Клиент 1 · Частная база шале",
              de: "Kunde 1 · Private Chalet-Basis",
              uk: "Клієнт 1 · Приватна база шале",
            },
            rows: [
              {
                label: {
                  en: "Budget",
                  ru: "Бюджет",
                  de: "Budget",
                  uk: "Бюджет",
                },
                value: u("$800"),
              },
              {
                label: {
                  en: "Result",
                  ru: "Результат",
                  de: "Ergebnis",
                  uk: "Результат",
                },
                value: {
                  en: "Fully booked",
                  ru: "Полностью заполнен",
                  de: "Voll ausgebucht",
                  uk: "Повністю заповнений",
                },
              },
            ],
          },
          {
            label: {
              en: "Client 2 · Mountain resort",
              ru: "Клиент 2 · Горный курорт",
              de: "Kunde 2 · Bergresort",
              uk: "Клієнт 2 · Гірський курорт",
            },
            rows: [
              {
                label: {
                  en: "Budget",
                  ru: "Бюджет",
                  de: "Budget",
                  uk: "Бюджет",
                },
                value: u("$1,200"),
              },
              {
                label: {
                  en: "Result",
                  ru: "Результат",
                  de: "Ergebnis",
                  uk: "Результат",
                },
                value: {
                  en: "Fully booked",
                  ru: "Полностью заполнен",
                  de: "Voll ausgebucht",
                  uk: "Повністю заповнений",
                },
              },
            ],
          },
        ],
        resultLabel: {
          en: "Final result",
          ru: "Итоговый результат",
          de: "Endergebnis",
          uk: "Підсумковий результат",
        },
        result: {
          en: "Both clients · seasonal capacity sold out",
          ru: "Оба клиента · сезонная ёмкость распродана",
          de: "Beide Kunden · Saisonkapazität ausverkauft",
          uk: "Обидва клієнти · сезонна спроможність розпродана",
        },
      },
      breakdown: {
        heading: {
          en: "Campaign details",
          ru: "Детали кампании",
          de: "Kampagnendetails",
          uk: "Деталі кампанії",
        },
        rows: [
          {
            label: {
              en: "Avg booking value",
              ru: "Средняя стоимость брони",
              de: "Ø-Buchungswert",
              uk: "Середня вартість броні",
            },
            value: u("$500–$1,500"),
          },
          {
            label: {
              en: "Campaign duration",
              ru: "Длительность кампании",
              de: "Kampagnendauer",
              uk: "Тривалість кампанії",
            },
            value: {
              en: "1.5 months",
              ru: "1,5 месяца",
              de: "1,5 Monate",
              uk: "1,5 місяця",
            },
          },
          {
            label: {
              en: "Creatives",
              ru: "Креативы",
              de: "Creatives",
              uk: "Креативи",
            },
            value: {
              en: "From raw materials",
              ru: "Из исходников",
              de: "Aus Rohmaterial",
              uk: "З вихідних матеріалів",
            },
          },
        ],
      },
      services: [
        {
          en: "Meta Ads setup",
          ru: "Настройка Meta Ads",
          de: "Meta-Ads-Setup",
          uk: "Налаштування Meta Ads",
        },
        {
          en: "Creative production",
          ru: "Продакшн креативов",
          de: "Creative-Produktion",
          uk: "Продакшн креативів",
        },
        {
          en: "Seasonal strategy",
          ru: "Сезонная стратегия",
          de: "Saisonstrategie",
          uk: "Сезонна стратегія",
        },
      ],
    },
  },

  // ── Seventy Times · this site ─────────────────────────────
  {
    id: "seventy-times",
    status: "live",
    region: "usa",
    url: "https://seventy-times.com",
    study: {
      accent: "#818cf8",
      title: u("Seventy Times"),
      tag: u("NEXT.JS · CLAUDE AI"),
      summary: {
        en: "This very site. A multilingual Next.js 15 build with Vanessa — a Claude-powered AI consultant — an interactive ROI simulator, and motion throughout.",
        ru: "Этот самый сайт. Многоязычный проект на Next.js 15: Ванесса — ИИ-консультант на базе Claude, интерактивный ROI-симулятор и анимации повсюду.",
        de: "Genau diese Website. Ein mehrsprachiges Next.js-15-Projekt mit Vanessa — einem KI-Berater auf Claude-Basis — einem interaktiven ROI-Simulator und Animationen überall.",
        uk: "Цей самий сайт. Багатомовний проєкт на Next.js 15: Ванесса — ШІ-консультант на базі Claude, інтерактивний ROI-симулятор та анімації всюди.",
      },
      metrics: [
        {
          en: "4 languages — EN / RU / DE / UA",
          ru: "4 языка — EN / RU / DE / UA",
          de: "4 Sprachen — EN / RU / DE / UA",
          uk: "4 мови — EN / RU / DE / UA",
        },
        {
          en: "Vanessa — Claude AI consultant, 24/7",
          ru: "Ванесса — ИИ-консультант на Claude, 24/7",
          de: "Vanessa — Claude-KI-Berater, 24/7",
          uk: "Ванесса — ШІ-консультант на Claude, 24/7",
        },
        {
          en: "Interactive ROI simulator",
          ru: "Интерактивный ROI-симулятор",
          de: "Interaktiver ROI-Simulator",
          uk: "Інтерактивний ROI-симулятор",
        },
      ],
      headline: {
        en: "Agency site + AI consultant",
        ru: "Сайт агентства + ИИ-консультант",
        de: "Agentur-Website + KI-Berater",
        uk: "Сайт агенції + ШІ-консультант",
      },
      meta: {
        en: "Full build · Next.js 15 · Claude API · 4 languages · live",
        ru: "Полная разработка · Next.js 15 · Claude API · 4 языка · в проде",
        de: "Komplett-Build · Next.js 15 · Claude API · 4 Sprachen · live",
        uk: "Повна розробка · Next.js 15 · Claude API · 4 мови · у проді",
      },
      niche: {
        en: "Agency · AI · Web dev",
        ru: "Агентство · ИИ · Веб-разработка",
        de: "Agentur · KI · Webentwicklung",
        uk: "Агенція · ШІ · Веброзробка",
      },
      features: [
        {
          icon: "🌐",
          text: {
            en: "Multi-language — EN / RU / DE / UA across the whole site",
            ru: "Мультиязычность — EN / RU / DE / UA по всему сайту",
            de: "Mehrsprachig — EN / RU / DE / UA auf der ganzen Seite",
            uk: "Багатомовність — EN / RU / DE / UA по всьому сайту",
          },
        },
        {
          icon: "🤖",
          text: {
            en: "Vanessa — Claude-powered lead qualifier, online 24/7",
            ru: "Ванесса — квалификатор лидов на Claude, онлайн 24/7",
            de: "Vanessa — Lead-Qualifizierer auf Claude-Basis, 24/7 online",
            uk: "Ванесса — кваліфікатор лідів на Claude, онлайн 24/7",
          },
        },
        {
          icon: "📊",
          text: {
            en: "ROI calculator — interactive growth simulator per pillar",
            ru: "ROI-калькулятор — интерактивный симулятор роста по направлениям",
            de: "ROI-Rechner — interaktiver Wachstumssimulator je Bereich",
            uk: "ROI-калькулятор — інтерактивний симулятор зростання за напрямами",
          },
        },
        {
          icon: "⚡",
          text: {
            en: "Framer Motion animation · SSR · edge functions",
            ru: "Анимации Framer Motion · SSR · edge-функции",
            de: "Framer-Motion-Animationen · SSR · Edge Functions",
            uk: "Анімації Framer Motion · SSR · edge-функції",
          },
        },
      ],
      chat: {
        title: {
          en: "AI consultant · live",
          ru: "ИИ-консультант · онлайн",
          de: "KI-Berater · live",
          uk: "ШІ-консультант · онлайн",
        },
        messages: [
          {
            role: "bot",
            text: {
              en: "Hi! I'm Vanessa, the Seventy Times AI consultant. Tell me about your business — I'll help figure out what you actually need.",
              ru: "Привет! Я Ванесса, ИИ-консультант Seventy Times. Расскажите о вашем бизнесе — помогу понять, что вам действительно нужно.",
              de: "Hi! Ich bin Vanessa, die KI-Beraterin von Seventy Times. Erzähl mir von deinem Unternehmen — ich helfe herauszufinden, was du wirklich brauchst.",
              uk: "Привіт! Я Ванесса, ШІ-консультант Seventy Times. Розкажіть про ваш бізнес — допоможу зрозуміти, що вам справді потрібно.",
            },
          },
          {
            role: "user",
            text: {
              en: "We run a roofing company and want more leads from Meta Ads.",
              ru: "У нас кровельная компания, хотим больше лидов из Meta Ads.",
              de: "Wir haben eine Dachdeckerfirma und wollen mehr Leads über Meta Ads.",
              uk: "У нас покрівельна компанія, хочемо більше лідів із Meta Ads.",
            },
          },
          {
            role: "bot",
            text: {
              en: "Got it — roofing is a great fit for lead gen on Meta. What's your monthly ad budget, and do you already have a landing page?",
              ru: "Понятно — кровля отлично подходит для лидогенерации в Meta. Какой у вас месячный рекламный бюджет и есть ли уже лендинг?",
              de: "Verstanden — Dachdeckerei eignet sich super für Leadgen auf Meta. Wie hoch ist dein monatliches Werbebudget, und hast du schon eine Landingpage?",
              uk: "Зрозуміло — покрівля чудово підходить для лідогенерації в Meta. Який у вас місячний рекламний бюджет і чи є вже лендинг?",
            },
          },
        ],
      },
      stack: [
        "Next.js 15",
        "TypeScript",
        "Claude API",
        "Framer Motion",
        "CSS Modules",
        "Vercel",
      ],
    },
  },

  // ── Elite Car Mats · custom e-commerce, USA ───────────────
  {
    id: "elitecarmats",
    status: "progress",
    region: "usa",
    url: "https://elitecarmats.us",
    study: {
      accent: "#D4A54A",
      title: u("Elite Car Mats"),
      tag: u("CUSTOM E-COMMERCE · USA"),
      summary: {
        en: "A custom-built e-commerce store for a car-mat manufacturer entering the U.S. market. A Next.js storefront with a full vehicle configurator across ~60 brands and ~700 models, Stripe checkout, and an operator dashboard. Paid ads are a separate later phase — this case is the build.",
        ru: "Кастомный интернет-магазин для производителя автоковриков, выходящего на рынок США. Витрина на Next.js с полным конфигуратором под авто — ~60 брендов и ~700 моделей, оплата через Stripe и операторская панель. Платная реклама — отдельный поздний этап, этот кейс про саму разработку.",
        de: "Ein maßgeschneiderter Onlineshop für einen Fußmatten-Hersteller beim Markteintritt in den USA. Ein Next.js-Storefront mit vollem Fahrzeug-Konfigurator über ~60 Marken und ~700 Modelle, Stripe-Checkout und Betreiber-Dashboard. Bezahlte Werbung ist eine separate, spätere Phase — dieser Case ist der Build.",
        uk: "Кастомний інтернет-магазин для виробника автомобільних килимків, що виходить на ринок США. Вітрина на Next.js з повним конфігуратором під авто — ~60 брендів і ~700 моделей, оплата через Stripe та операторська панель. Платна реклама — окремий пізніший етап, цей кейс про саму розробку.",
      },
      metrics: [
        {
          en: "~700 vehicle models, ~60 brands",
          ru: "~700 моделей авто, ~60 брендов",
          de: "~700 Fahrzeugmodelle, ~60 Marken",
          uk: "~700 моделей авто, ~60 брендів",
        },
        {
          en: "Full vehicle configurator + Stripe",
          ru: "Полный конфигуратор под авто + Stripe",
          de: "Voller Fahrzeug-Konfigurator + Stripe",
          uk: "Повний конфігуратор під авто + Stripe",
        },
        {
          en: "Custom Next.js build, 3 languages",
          ru: "Кастомная разработка на Next.js, 3 языка",
          de: "Individueller Next.js-Build, 3 Sprachen",
          uk: "Кастомна розробка на Next.js, 3 мови",
        },
      ],
      headline: {
        en: "Custom car-mat store, built end-to-end",
        ru: "Магазин автоковриков под ключ",
        de: "Automatten-Shop, komplett gebaut",
        uk: "Магазин автокилимків під ключ",
      },
      meta: {
        en: "Next.js · ~60 brands / ~700 models · Stripe · 3 languages",
        ru: "Next.js · ~60 брендов / ~700 моделей · Stripe · 3 языка",
        de: "Next.js · ~60 Marken / ~700 Modelle · Stripe · 3 Sprachen",
        uk: "Next.js · ~60 брендів / ~700 моделей · Stripe · 3 мови",
      },
      niche: {
        en: "Auto · E-commerce · USA",
        ru: "Авто · E-commerce · США",
        de: "Auto · E-Commerce · USA",
        uk: "Авто · E-commerce · США",
      },
      stats: [
        {
          value: "~700",
          label: {
            en: "Vehicle models",
            ru: "Моделей авто",
            de: "Fahrzeugmodelle",
            uk: "Моделей авто",
          },
        },
        {
          value: "~60",
          label: {
            en: "Car brands",
            ru: "Брендов авто",
            de: "Automarken",
            uk: "Брендів авто",
          },
        },
        {
          value: "3",
          label: {
            en: "Languages",
            ru: "Языка",
            de: "Sprachen",
            uk: "Мови",
          },
        },
        {
          value: "100%",
          label: {
            en: "Custom build",
            ru: "Кастомная",
            de: "Custom-Build",
            uk: "Кастомна",
          },
        },
      ],
      features: [
        {
          icon: "🚗",
          text: {
            en: "Vehicle configurator — year, set type (profile-aware), mat & edge colour, optional metal brand badge",
            ru: "Конфигуратор под авто — год, тип комплекта (по профилю кузова), цвет коврика и окантовки, опц. металлический шильдик бренда",
            de: "Fahrzeug-Konfigurator — Jahr, Set-Typ (profilabhängig), Matten- und Kantenfarbe, optionales Marken-Badge aus Metall",
            uk: "Конфігуратор під авто — рік, тип комплекта (за профілем кузова), колір килимка й окантовки, опц. металевий шильдик бренда",
          },
        },
        {
          icon: "🔎",
          text: {
            en: "Catalog of ~60 brands / ~700 models — body-type filters and ⌘K search with autocomplete",
            ru: "Каталог ~60 брендов / ~700 моделей — фильтры по типу кузова и поиск ⌘K с автокомплитом",
            de: "Katalog mit ~60 Marken / ~700 Modellen — Karosserie-Filter und ⌘K-Suche mit Autovervollständigung",
            uk: "Каталог ~60 брендів / ~700 моделей — фільтри за типом кузова і пошук ⌘K з автокомплітом",
          },
        },
        {
          icon: "💳",
          text: {
            en: "Cart with promo codes and Stripe Checkout (with manual-confirm fallback)",
            ru: "Корзина с промокодами и оплатой через Stripe Checkout (с резервным ручным подтверждением)",
            de: "Warenkorb mit Promo-Codes und Stripe Checkout (mit manueller Bestätigung als Fallback)",
            uk: "Кошик з промокодами та оплатою через Stripe Checkout (із резервним ручним підтвердженням)",
          },
        },
        {
          icon: "📦",
          text: {
            en: "Order tracking via HMAC links, ShipStation fulfillment, and Resend transactional emails",
            ru: "Отслеживание заказа по HMAC-ссылкам, фулфилмент через ShipStation и транзакционные письма на Resend",
            de: "Bestellverfolgung über HMAC-Links, Fulfillment via ShipStation und transaktionale E-Mails mit Resend",
            uk: "Відстеження замовлення за HMAC-посиланнями, фулфілмент через ShipStation і транзакційні листи на Resend",
          },
        },
        {
          icon: "❤️",
          text: {
            en: "Wishlist and a custom-order form for vehicles outside the catalog",
            ru: "Вишлист и форма кастом-заказа для авто не из каталога",
            de: "Wunschliste und Sonderbestellformular für Fahrzeuge außerhalb des Katalogs",
            uk: "Список бажань і форма кастом-замовлення для авто не з каталогу",
          },
        },
        {
          icon: "🌐",
          text: {
            en: "Three languages (EN / RU / UK), a Markdown blog, and WCAG accessibility",
            ru: "Три языка (EN / RU / UK), блог на Markdown и доступность по WCAG",
            de: "Drei Sprachen (EN / RU / UK), ein Markdown-Blog und WCAG-Barrierefreiheit",
            uk: "Три мови (EN / RU / UK), блог на Markdown і доступність за WCAG",
          },
        },
      ],
      sections: [
        {
          heading: {
            en: "Operator dashboard",
            ru: "Операторская панель",
            de: "Betreiber-Dashboard",
            uk: "Операторська панель",
          },
          items: [
            {
              en: "Revenue dashboard — daily / weekly / monthly, AOV, top models",
              ru: "Дашборд выручки — день / неделя / месяц, средний чек, топ-модели",
              de: "Umsatz-Dashboard — täglich / wöchentlich / monatlich, AOV, Top-Modelle",
              uk: "Дашборд виручки — день / тиждень / місяць, середній чек, топ-моделі",
            },
            {
              en: "Order management — status timeline, tracking numbers, email re-send",
              ru: "Управление заказами — статус-таймлайн, трек-номера, повторная отправка письма",
              de: "Bestellverwaltung — Status-Timeline, Sendungsnummern, E-Mail erneut senden",
              uk: "Керування замовленнями — статус-таймлайн, трек-номери, повторне надсилання листа",
            },
            {
              en: "Live price editor with per-vehicle overrides + Google Shopping feed",
              ru: "Живой редактор цен с переопределениями по типам авто + фид Google Shopping",
              de: "Live-Preiseditor mit Überschreibungen je Fahrzeug + Google-Shopping-Feed",
              uk: "Живий редактор цін з перевизначеннями за типами авто + фід Google Shopping",
            },
            {
              en: "Catalog CRUD, blog editor, promo codes, review moderation, newsletter (CSV)",
              ru: "CRUD каталога, редактор блога, промокоды, модерация отзывов, рассылка (CSV)",
              de: "Katalog-CRUD, Blog-Editor, Promo-Codes, Bewertungs-Moderation, Newsletter (CSV)",
              uk: "CRUD каталогу, редактор блога, промокоди, модерація відгуків, розсилка (CSV)",
            },
          ],
        },
        {
          heading: {
            en: "SEO & marketing",
            ru: "SEO и маркетинг",
            de: "SEO & Marketing",
            uk: "SEO та маркетинг",
          },
          items: [
            {
              en: "Sitemap across brand, model, custom and blog URLs",
              ru: "Sitemap по URL брендов, моделей, кастом-страниц и блога",
              de: "Sitemap über Marken-, Modell-, Custom- und Blog-URLs",
              uk: "Sitemap за URL брендів, моделей, кастом-сторінок і блога",
            },
            {
              en: "Schema.org — Product (+rating), Offer, Organization, Breadcrumb, FAQ, Article",
              ru: "Schema.org — Product (+рейтинг), Offer, Organization, Breadcrumb, FAQ, Article",
              de: "Schema.org — Product (+Bewertung), Offer, Organization, Breadcrumb, FAQ, Article",
              uk: "Schema.org — Product (+рейтинг), Offer, Organization, Breadcrumb, FAQ, Article",
            },
            {
              en: "OpenGraph images per page",
              ru: "OpenGraph-картинки для каждой страницы",
              de: "OpenGraph-Bilder pro Seite",
              uk: "OpenGraph-зображення для кожної сторінки",
            },
            {
              en: "Google Merchant Center product feed that auto-updates with admin prices",
              ru: "Продуктовый фид Google Merchant Center, авто-обновляемый по ценам из админки",
              de: "Google-Merchant-Center-Produktfeed, der sich automatisch an die Admin-Preise anpasst",
              uk: "Продуктовий фід Google Merchant Center, що авто-оновлюється за цінами з адмінки",
            },
          ],
        },
        {
          heading: {
            en: "Security & reliability",
            ru: "Безопасность и надёжность",
            de: "Sicherheit & Zuverlässigkeit",
            uk: "Безпека та надійність",
          },
          items: [
            {
              en: "HMAC admin sessions, scrypt hashing, CSRF protection",
              ru: "HMAC-сессии админа, хеширование scrypt, защита от CSRF",
              de: "HMAC-Admin-Sessions, scrypt-Hashing, CSRF-Schutz",
              uk: "HMAC-сесії адміна, хешування scrypt, захист від CSRF",
            },
            {
              en: "Per-IP rate limiting (Upstash Redis)",
              ru: "Лимит запросов по IP (Upstash Redis)",
              de: "Rate-Limiting pro IP (Upstash Redis)",
              uk: "Ліміт запитів за IP (Upstash Redis)",
            },
            {
              en: "Stripe webhook idempotency ledger",
              ru: "Журнал идемпотентности Stripe-вебхуков",
              de: "Idempotenz-Ledger für Stripe-Webhooks",
              uk: "Журнал ідемпотентності Stripe-вебхуків",
            },
            {
              en: "Hardened security headers and CCPA / CPRA compliance",
              ru: "Усиленные security-заголовки и соответствие CCPA / CPRA",
              de: "Gehärtete Security-Header und CCPA-/CPRA-Konformität",
              uk: "Посилені security-заголовки та відповідність CCPA / CPRA",
            },
          ],
        },
      ],
      insight: {
        en: "Scope here was the storefront — design, build, catalog, payments and the admin panel. Paid acquisition is a separate, later phase, so this case is about what we shipped rather than campaign numbers.",
        ru: "Скоуп здесь — сама витрина: дизайн, разработка, каталог, оплата и админ-панель. Платное продвижение — отдельный, более поздний этап, поэтому кейс про то, что мы построили, а не про рекламные метрики.",
        de: "Der Umfang hier war der Shop selbst — Design, Build, Katalog, Zahlungen und das Admin-Panel. Bezahlte Akquise ist eine separate, spätere Phase, deshalb geht es in diesem Case um das Gelieferte und nicht um Kampagnenzahlen.",
        uk: "Скоуп тут — сама вітрина: дизайн, розробка, каталог, оплата та адмін-панель. Платне просування — окремий, пізніший етап, тому кейс про те, що ми побудували, а не про рекламні метрики.",
      },
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind",
        "Prisma + Neon",
        "Stripe",
        "ShipStation",
        "Resend",
        "Vercel",
      ],
    },
  },

  // ── Convioo · our own AI lead-gen product ─────────────────
  {
    id: "convioo",
    status: "progress",
    region: "usa",
    url: "https://convioo.com",
    study: {
      accent: "#6366F1",
      title: u("Convioo"),
      tag: u("AI LEAD-GEN · CRM"),
      summary: {
        en: "Our own B2B lead-gen platform with a lightweight CRM, built for marketing agencies. A Next.js app over a Python backend: search via Google Places, deep enrichment, AI scoring and outreach drafts from Claude, and Henry — a built-in AI assistant.",
        ru: "Наш собственный продукт — B2B-платформа лидогенерации с лёгкой CRM для маркетинговых агентств. Веб-аппа на Next.js поверх Python-бэкенда: поиск через Google Places, глубокий enrichment, AI-скоринг и черновики outreach от Claude, и Henry — встроенный AI-ассистент.",
        de: "Unser eigenes B2B-Leadgen-Produkt mit schlankem CRM für Marketingagenturen. Eine Next.js-App über einem Python-Backend: Suche über Google Places, tiefes Enrichment, KI-Scoring und Outreach-Entwürfe von Claude sowie Henry — ein integrierter KI-Assistent.",
        uk: "Наш власний продукт — B2B-платформа лідогенерації з легкою CRM для маркетингових агенцій. Вебзастосунок на Next.js поверх Python-бекенду: пошук через Google Places, глибокий enrichment, AI-скоринг і чернетки outreach від Claude, та Henry — вбудований AI-асистент.",
      },
      metrics: [
        {
          en: "AI scoring + outreach drafts (Claude)",
          ru: "AI-скоринг + черновики outreach (Claude)",
          de: "KI-Scoring + Outreach-Entwürfe (Claude)",
          uk: "AI-скоринг + чернетки outreach (Claude)",
        },
        {
          en: "Google Places search + deep enrichment",
          ru: "Поиск Google Places + глубокий enrichment",
          de: "Google-Places-Suche + tiefes Enrichment",
          uk: "Пошук Google Places + глибокий enrichment",
        },
        {
          en: "Full CRM + Henry AI assistant",
          ru: "Полноценная CRM + AI-ассистент Henry",
          de: "Vollwertiges CRM + KI-Assistent Henry",
          uk: "Повноцінна CRM + AI-асистент Henry",
        },
      ],
      headline: {
        en: "AI lead-gen + CRM platform",
        ru: "Платформа AI-лидогена + CRM",
        de: "KI-Leadgen- + CRM-Plattform",
        uk: "Платформа AI-лідогена + CRM",
      },
      meta: {
        en: "Our product · Next.js + Python · Google Places · Claude",
        ru: "Наш продукт · Next.js + Python · Google Places · Claude",
        de: "Unser Produkt · Next.js + Python · Google Places · Claude",
        uk: "Наш продукт · Next.js + Python · Google Places · Claude",
      },
      niche: {
        en: "SaaS · AI · B2B lead-gen",
        ru: "SaaS · ИИ · B2B-лидоген",
        de: "SaaS · KI · B2B-Leadgen",
        uk: "SaaS · ШІ · B2B-лідоген",
      },
      stats: [
        {
          value: "≤50",
          label: {
            en: "Leads enriched / search",
            ru: "Лидов с enrichment / поиск",
            de: "Leads angereichert / Suche",
            uk: "Лідів з enrichment / пошук",
          },
        },
        {
          value: "Claude",
          label: {
            en: "AI scoring engine",
            ru: "Движок AI-скоринга",
            de: "KI-Scoring-Engine",
            uk: "Рушій AI-скорингу",
          },
        },
        {
          value: "Henry",
          label: {
            en: "Built-in AI assistant",
            ru: "Встроенный AI-ассистент",
            de: "Integrierter KI-Assistent",
            uk: "Вбудований AI-асистент",
          },
        },
        {
          value: "CSV · XLSX",
          label: {
            en: "Data export",
            ru: "Экспорт данных",
            de: "Datenexport",
            uk: "Експорт даних",
          },
        },
      ],
      features: [
        {
          icon: "🔎",
          text: {
            en: "B2B lead search — niche + region, sourced from Google Places",
            ru: "Поиск B2B-лидов — ниша + регион, выдача из Google Places",
            de: "B2B-Lead-Suche — Nische + Region, Quelle Google Places",
            uk: "Пошук B2B-лідів — ніша + регіон, видача з Google Places",
          },
        },
        {
          icon: "🧠",
          text: {
            en: "Deep enrichment of up to 50 leads — website, socials, reviews, decision-maker",
            ru: "Глубокий enrichment до 50 лидов — сайт, соцсети, отзывы, decision-maker",
            de: "Tiefes Enrichment von bis zu 50 Leads — Website, Social, Reviews, Decision-Maker",
            uk: "Глибокий enrichment до 50 лідів — сайт, соцмережі, відгуки, decision-maker",
          },
        },
        {
          icon: "⭐",
          text: {
            en: "AI scoring and outreach drafts via Claude Haiku",
            ru: "AI-скоринг и черновики outreach через Claude Haiku",
            de: "KI-Scoring und Outreach-Entwürfe via Claude Haiku",
            uk: "AI-скоринг і чернетки outreach через Claude Haiku",
          },
        },
        {
          icon: "🤖",
          text: {
            en: "Henry — built-in AI assistant: chat, weekly check-in, per-lead research",
            ru: "Henry — встроенный AI-ассистент: чат, еженедельный check-in, ресёрч по лиду",
            de: "Henry — integrierter KI-Assistent: Chat, wöchentliches Check-in, Lead-Recherche",
            uk: "Henry — вбудований AI-асистент: чат, щотижневий check-in, ресерч за лідом",
          },
        },
        {
          icon: "🗂️",
          text: {
            en: "Full CRM — statuses, notes, custom fields, tasks, activity timeline",
            ru: "Полноценная CRM — статусы, заметки, кастом-поля, задачи, активити-таймлайн",
            de: "Vollwertiges CRM — Status, Notizen, Custom-Felder, Aufgaben, Aktivitäts-Timeline",
            uk: "Повноцінна CRM — статуси, нотатки, кастом-поля, задачі, активіті-таймлайн",
          },
        },
        {
          icon: "📤",
          text: {
            en: "Excel + CSV export of a session or the whole CRM",
            ru: "Excel + CSV экспорт сессии или всей CRM",
            de: "Excel- + CSV-Export einer Session oder des gesamten CRM",
            uk: "Excel + CSV експорт сесії або всієї CRM",
          },
        },
      ],
      chat: {
        title: {
          en: "Henry · AI assistant",
          ru: "Henry · AI-ассистент",
          de: "Henry · KI-Assistent",
          uk: "Henry · AI-асистент",
        },
        messages: [
          {
            role: "bot",
            text: {
              en: "Hi, I'm Henry. Tell me the niche and region you're targeting and I'll pull a first batch of leads.",
              ru: "Привет, я Henry. Назови нишу и регион — соберу первую партию лидов.",
              de: "Hi, ich bin Henry. Nenn mir Nische und Region, dann hole ich einen ersten Schwung Leads.",
              uk: "Привіт, я Henry. Назви нішу й регіон — зберу першу партію лідів.",
            },
          },
          {
            role: "user",
            text: {
              en: "Dental clinics in Austin, TX.",
              ru: "Стоматологии в Остине, Техас.",
              de: "Zahnarztpraxen in Austin, TX.",
              uk: "Стоматології в Остіні, Техас.",
            },
          },
          {
            role: "bot",
            text: {
              en: "On it — searching Google Places, then enriching and scoring the top 50 by fit. Want outreach drafts for the hottest ones?",
              ru: "Уже ищу через Google Places, потом обогащу и оценю топ-50 по релевантности. Сделать черновики outreach для самых горячих?",
              de: "Mache ich — Suche über Google Places, dann reichere ich an und score die Top 50 nach Passung. Outreach-Entwürfe für die heißesten?",
              uk: "Уже шукаю через Google Places, потім збагачу й оціню топ-50 за релевантністю. Зробити чернетки outreach для найгарячіших?",
            },
          },
        ],
      },
      sections: [
        {
          heading: {
            en: "Teams & data",
            ru: "Команды и данные",
            de: "Teams & Daten",
            uk: "Команди та дані",
          },
          items: [
            {
              en: "Teams with email-verified invitations (Resend)",
              ru: "Команды с приглашениями и верификацией по email (Resend)",
              de: "Teams mit E-Mail-verifizierten Einladungen (Resend)",
              uk: "Команди із запрошеннями та верифікацією по email (Resend)",
            },
            {
              en: "GDPR data export",
              ru: "GDPR-экспорт данных",
              de: "DSGVO-Datenexport",
              uk: "GDPR-експорт даних",
            },
            {
              en: "Audit log of actions",
              ru: "Audit log действий",
              de: "Audit-Log der Aktionen",
              uk: "Audit log дій",
            },
          ],
        },
        {
          heading: {
            en: "Engineering & reliability",
            ru: "Инженерия и надёжность",
            de: "Engineering & Zuverlässigkeit",
            uk: "Інженерія та надійність",
          },
          items: [
            {
              en: "Next.js frontend over a FastAPI Python backend",
              ru: "Фронтенд на Next.js поверх Python-бэкенда FastAPI",
              de: "Next.js-Frontend über einem FastAPI-Python-Backend",
              uk: "Фронтенд на Next.js поверх Python-бекенду FastAPI",
            },
            {
              en: "PostgreSQL with Alembic migrations",
              ru: "PostgreSQL с миграциями Alembic",
              de: "PostgreSQL mit Alembic-Migrationen",
              uk: "PostgreSQL з міграціями Alembic",
            },
            {
              en: "Background searches via Redis + arq worker",
              ru: "Фоновые поиски через Redis + воркер arq",
              de: "Hintergrundsuchen via Redis + arq-Worker",
              uk: "Фонові пошуки через Redis + воркер arq",
            },
            {
              en: "Startup-recovery — a stuck search is auto-marked failed",
              ru: "Startup-recovery — зависший поиск авто-помечается как failed",
              de: "Startup-Recovery — eine hängende Suche wird automatisch als failed markiert",
              uk: "Startup-recovery — завислий пошук авто-позначається як failed",
            },
            {
              en: "CI on every push — postgres, migrations, ruff lint, pytest",
              ru: "CI на каждый push — postgres, миграции, линт ruff, pytest",
              de: "CI bei jedem Push — Postgres, Migrationen, Ruff-Lint, Pytest",
              uk: "CI на кожен push — postgres, міграції, лінт ruff, pytest",
            },
          ],
        },
      ],
      insight: {
        en: "Convioo is our own product — we build it, run it, and use it to source leads ourselves. Currently in active development.",
        ru: "Convioo — наш собственный продукт: мы его делаем, держим в проде и сами используем для поиска лидов. Сейчас в активной разработке.",
        de: "Convioo ist unser eigenes Produkt — wir entwickeln es, betreiben es und nutzen es selbst zur Lead-Gewinnung. Aktuell in aktiver Entwicklung.",
        uk: "Convioo — наш власний продукт: ми його робимо, тримаємо в проді й самі використовуємо для пошуку лідів. Зараз в активній розробці.",
      },
      stack: [
        "Next.js",
        "Python / FastAPI",
        "PostgreSQL",
        "Claude (Haiku)",
        "Google Places API",
        "Redis / arq",
        "Resend",
        "Railway",
        "Vercel",
      ],
    },
  },
];
