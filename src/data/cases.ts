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
const u = (s: string): Loc => ({ en: s, ru: s, de: s, ua: s });

/** Where the work was delivered. Shown as a location badge — we keep
 *  it to the region level (no city) on purpose. */
export type Region = "usa" | "europe";

export const REGION_LABELS: Record<Region, Loc> = {
  usa: { en: "USA", ru: "США", de: "USA", ua: "США" },
  europe: { en: "Europe", ru: "Европа", de: "Europa", ua: "Європа" },
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
        ua: "Пасажирські перевезення",
      },
      tag: u("META ADS · EUROPE"),
      summary: {
        en: "A small passenger-transport business in Europe. Meta Ads on a $200/mo budget brought 7–15 booking requests a day — demand outran capacity and the campaign was paused more than once.",
        ru: "Небольшой бизнес пассажирских перевозок в Европе. Реклама в Meta на бюджете $200/мес приносила 7–15 заявок в день — спрос превышал ёмкость, и кампанию не раз ставили на паузу.",
        de: "Ein kleines Personenbeförderungsunternehmen in Europa. Meta Ads mit 200 $/Monat Budget brachten 7–15 Buchungsanfragen pro Tag — die Nachfrage überstieg die Kapazität, die Kampagne wurde mehrfach pausiert.",
        ua: "Невеликий бізнес пасажирських перевезень у Європі. Реклама в Meta на бюджеті $200/міс приносила 7–15 заявок на день — попит перевищував спроможність, і кампанію не раз ставили на паузу.",
      },
      metrics: [
        {
          en: "7–15 leads per day",
          ru: "7–15 лидов в день",
          de: "7–15 Leads pro Tag",
          ua: "7–15 лідів на день",
        },
        {
          en: "~$7 daily ad spend",
          ru: "~$7 расходов в день",
          de: "~7 $ Tagesbudget",
          ua: "~$7 витрат на день",
        },
        {
          en: "9-month partnership, 2 referrals",
          ru: "9 месяцев сотрудничества, 2 реферала",
          de: "9 Monate Partnerschaft, 2 Empfehlungen",
          ua: "9 місяців співпраці, 2 реферали",
        },
      ],
      headline: {
        en: "7–15 leads per day",
        ru: "7–15 лидов в день",
        de: "7–15 Leads pro Tag",
        ua: "7–15 лідів на день",
      },
      meta: {
        en: "$200/mo budget · 9 months · 2 referral clients",
        ru: "Бюджет $200/мес · 9 месяцев · 2 клиента по рекомендации",
        de: "200 $/Monat Budget · 9 Monate · 2 Empfehlungskunden",
        ua: "Бюджет $200/міс · 9 місяців · 2 клієнти за рекомендацією",
      },
      niche: {
        en: "Transportation · Europe",
        ru: "Перевозки · Европа",
        de: "Beförderung · Europa",
        ua: "Перевезення · Європа",
      },
      stats: [
        {
          value: "$200",
          label: {
            en: "Monthly budget",
            ru: "Бюджет в месяц",
            de: "Monatsbudget",
            ua: "Бюджет на місяць",
          },
        },
        {
          value: "~$7",
          label: {
            en: "Daily spend",
            ru: "Расход в день",
            de: "Tagesausgaben",
            ua: "Витрати на день",
          },
        },
        {
          value: "2–3",
          label: {
            en: "Bookings / day",
            ru: "Брони в день",
            de: "Buchungen / Tag",
            ua: "Броні на день",
          },
        },
        {
          value: "9 mo",
          label: {
            en: "Partnership",
            ru: "Сотрудничество",
            de: "Partnerschaft",
            ua: "Співпраця",
          },
        },
      ],
      breakdown: {
        heading: {
          en: "Campaign details",
          ru: "Детали кампании",
          de: "Kampagnendetails",
          ua: "Деталі кампанії",
        },
        rows: [
          {
            label: {
              en: "Monthly ad budget",
              ru: "Рекламный бюджет в месяц",
              de: "Monatliches Werbebudget",
              ua: "Рекламний бюджет на місяць",
            },
            value: u("$200"),
          },
          {
            label: {
              en: "Daily spend",
              ru: "Расход в день",
              de: "Tagesausgaben",
              ua: "Витрати на день",
            },
            value: u("~$6–7"),
          },
          {
            label: {
              en: "Leads generated",
              ru: "Лидов получено",
              de: "Generierte Leads",
              ua: "Згенеровано лідів",
            },
            value: {
              en: "7–15 / day",
              ru: "7–15 / день",
              de: "7–15 / Tag",
              ua: "7–15 / день",
            },
          },
          {
            label: {
              en: "Bookings closed",
              ru: "Закрытых броней",
              de: "Abgeschlossene Buchungen",
              ua: "Закритих броней",
            },
            value: {
              en: "2–3 / day",
              ru: "2–3 / день",
              de: "2–3 / Tag",
              ua: "2–3 / день",
            },
          },
          {
            label: {
              en: "Avg ticket",
              ru: "Средний чек",
              de: "Durchschnittl. Ticket",
              ua: "Середній чек",
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
          ua: "Оцінка виручки",
        },
        rows: [
          {
            label: {
              en: "2 bookings × €180",
              ru: "2 брони × €180",
              de: "2 Buchungen × 180 €",
              ua: "2 броні × €180",
            },
            value: {
              en: "€360 / day",
              ru: "€360 / день",
              de: "360 € / Tag",
              ua: "€360 / день",
            },
          },
          {
            label: {
              en: "× 25 working days",
              ru: "× 25 рабочих дней",
              de: "× 25 Arbeitstage",
              ua: "× 25 робочих днів",
            },
            value: {
              en: "~€9,000 / mo",
              ru: "~€9 000 / мес",
              de: "~9.000 € / Mon.",
              ua: "~€9 000 / міс",
            },
          },
        ],
        roasLabel: {
          en: "Est. ROAS",
          ru: "Оценка ROAS",
          de: "Geschätzter ROAS",
          ua: "Орієнтовний ROAS",
        },
        roas: "~45×",
        roasNote: {
          en: "excl. operational costs",
          ru: "без учёта операционных расходов",
          de: "ohne Betriebskosten",
          ua: "без операційних витрат",
        },
      },
      insight: {
        en: "Results exceeded capacity — the campaign was paused several times. The client referred me to two more businesses.",
        ru: "Результаты превышали ёмкость — кампанию несколько раз ставили на паузу. Клиент порекомендовал меня ещё двум бизнесам.",
        de: "Die Ergebnisse überstiegen die Kapazität — die Kampagne wurde mehrfach pausiert. Der Kunde empfahl mich an zwei weitere Unternehmen.",
        ua: "Результати перевищували спроможність — кампанію кілька разів ставили на паузу. Клієнт порекомендував мене ще двом бізнесам.",
      },
      services: [
        {
          en: "Meta Ads setup",
          ru: "Настройка Meta Ads",
          de: "Meta-Ads-Setup",
          ua: "Налаштування Meta Ads",
        },
        {
          en: "Creative production",
          ru: "Продакшн креативов",
          de: "Creative-Produktion",
          ua: "Продакшн креативів",
        },
        {
          en: "Audience targeting",
          ru: "Таргетинг аудитории",
          de: "Zielgruppen-Targeting",
          ua: "Таргетинг аудиторії",
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
        ua: "Дитяча мода",
      },
      tag: u("META ADS · CREATIVE"),
      summary: {
        en: "A children's fashion local retailer. End-to-end: I organized the photoshoot, produced every ad creative, and ran the Meta campaign — about $1 cost per lead on a local budget.",
        ru: "Локальный ритейлер детской моды. Под ключ: организовал фотосессию, отснял все креативы и вёл кампанию в Meta — около $1 за лид на локальном бюджете.",
        de: "Ein lokaler Händler für Kindermode. Alles aus einer Hand: Fotoshooting organisiert, alle Creatives produziert und die Meta-Kampagne betreut — rund 1 $ pro Lead bei lokalem Budget.",
        ua: "Локальний ритейлер дитячої моди. Під ключ: організував фотосесію, відзняв усі креативи й вів кампанію в Meta — близько $1 за лід на локальному бюджеті.",
      },
      metrics: [
        {
          en: "~$1 cost per lead",
          ru: "~$1 за лид",
          de: "~1 $ pro Lead",
          ua: "~$1 за лід",
        },
        {
          en: "$250/mo local budget",
          ru: "$250/мес локальный бюджет",
          de: "250 $/Monat lokales Budget",
          ua: "$250/міс локальний бюджет",
        },
        {
          en: "Full creative production",
          ru: "Полный продакшн креативов",
          de: "Komplette Creative-Produktion",
          ua: "Повний продакшн креативів",
        },
      ],
      headline: {
        en: "Ads + full creative",
        ru: "Реклама + весь креатив",
        de: "Ads + komplettes Creative",
        ua: "Реклама + весь креатив",
      },
      meta: {
        en: "$250/mo budget · 3 months · end-to-end production",
        ru: "Бюджет $250/мес · 3 месяца · продакшн под ключ",
        de: "250 $/Monat Budget · 3 Monate · Produktion aus einer Hand",
        ua: "Бюджет $250/міс · 3 місяці · продакшн під ключ",
      },
      niche: {
        en: "Fashion · Local retail",
        ru: "Мода · Локальный ритейл",
        de: "Mode · Lokaler Handel",
        ua: "Мода · Локальний ритейл",
      },
      stats: [
        {
          value: "$250",
          label: {
            en: "Monthly budget",
            ru: "Бюджет в месяц",
            de: "Monatsbudget",
            ua: "Бюджет на місяць",
          },
        },
        {
          value: "~$10",
          label: {
            en: "Daily spend",
            ru: "Расход в день",
            de: "Tagesausgaben",
            ua: "Витрати на день",
          },
        },
        {
          value: "~$1",
          label: {
            en: "Cost per lead",
            ru: "Стоимость лида",
            de: "Kosten pro Lead",
            ua: "Вартість ліда",
          },
        },
        {
          value: "3 mo",
          label: {
            en: "Duration",
            ru: "Длительность",
            de: "Dauer",
            ua: "Тривалість",
          },
        },
      ],
      breakdown: {
        heading: {
          en: "Campaign details",
          ru: "Детали кампании",
          de: "Kampagnendetails",
          ua: "Деталі кампанії",
        },
        rows: [
          {
            label: {
              en: "Monthly budget",
              ru: "Бюджет в месяц",
              de: "Monatsbudget",
              ua: "Бюджет на місяць",
            },
            value: {
              en: "$250 / mo",
              ru: "$250 / мес",
              de: "250 $ / Mon.",
              ua: "$250 / міс",
            },
          },
          {
            label: {
              en: "Daily spend",
              ru: "Расход в день",
              de: "Tagesausgaben",
              ua: "Витрати на день",
            },
            value: u("~$10"),
          },
          {
            label: {
              en: "Cost per lead",
              ru: "Стоимость лида",
              de: "Kosten pro Lead",
              ua: "Вартість ліда",
            },
            value: u("~$1"),
          },
          {
            label: {
              en: "Traffic type",
              ru: "Тип трафика",
              de: "Traffic-Typ",
              ua: "Тип трафіку",
            },
            value: {
              en: "Local geo-targeted",
              ru: "Локальный гео-таргет",
              de: "Lokal geo-targetiert",
              ua: "Локальний гео-таргет",
            },
          },
          {
            label: {
              en: "Duration",
              ru: "Длительность",
              de: "Dauer",
              ua: "Тривалість",
            },
            value: {
              en: "3 months",
              ru: "3 месяца",
              de: "3 Monate",
              ua: "3 місяці",
            },
          },
        ],
      },
      deliverables: {
        heading: {
          en: "What I delivered",
          ru: "Что я сделал",
          de: "Was ich geliefert habe",
          ua: "Що я зробив",
        },
        items: [
          {
            en: "Organized a full photoshoot (photographer + models)",
            ru: "Организовал полноценную фотосессию (фотограф + модели)",
            de: "Komplettes Fotoshooting organisiert (Fotograf + Models)",
            ua: "Організував повноцінну фотосесію (фотограф + моделі)",
          },
          {
            en: "Produced all ad creatives from the shoot",
            ru: "Сделал все рекламные креативы с этой съёмки",
            de: "Alle Werbe-Creatives aus dem Shooting produziert",
            ua: "Зробив усі рекламні креативи з цієї зйомки",
          },
          {
            en: "Built and managed the Meta Ads campaign",
            ru: "Собрал и вёл кампанию в Meta Ads",
            de: "Meta-Ads-Kampagne aufgebaut und betreut",
            ua: "Зібрав і вів кампанію в Meta Ads",
          },
          {
            en: "Generated high-volume DM and profile-visit traffic",
            ru: "Сгенерировал большой поток сообщений и переходов в профиль",
            de: "Hohes Volumen an DMs und Profilbesuchen generiert",
            ua: "Згенерував великий потік повідомлень і переходів у профіль",
          },
        ],
      },
      insight: {
        en: "About $1 cost per lead on a local budget. Engagement volume was high — I ended the campaign because of client-side processing limits.",
        ru: "Около $1 за лид на локальном бюджете. Поток заявок был большой — я завершил кампанию из-за ограничений на стороне клиента по обработке.",
        de: "Rund 1 $ pro Lead bei lokalem Budget. Das Engagement-Volumen war hoch — ich beendete die Kampagne wegen Bearbeitungsgrenzen aufseiten des Kunden.",
        ua: "Близько $1 за лід на локальному бюджеті. Потік заявок був великий — я завершив кампанію через обмеження з боку клієнта в обробці.",
      },
      services: [
        {
          en: "Meta Ads management",
          ru: "Ведение Meta Ads",
          de: "Meta-Ads-Management",
          ua: "Ведення Meta Ads",
        },
        {
          en: "Photoshoot organization",
          ru: "Организация фотосессии",
          de: "Fotoshooting-Organisation",
          ua: "Організація фотосесії",
        },
        {
          en: "Creative production",
          ru: "Продакшн креативов",
          de: "Creative-Produktion",
          ua: "Продакшн креативів",
        },
        {
          en: "Local geo targeting",
          ru: "Локальный гео-таргетинг",
          de: "Lokales Geo-Targeting",
          ua: "Локальний гео-таргетинг",
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
        ua: "Курорти Буковеля",
      },
      tag: u("META ADS · HOSPITALITY"),
      summary: {
        en: "Two winter-resort clients in Bukovel. A 1.5-month Meta campaign on a combined $2,000 budget sold out seasonal capacity for both.",
        ru: "Два клиента — зимние курорты в Буковеле. Кампания в Meta за 1,5 месяца на совокупном бюджете $2 000 распродала сезонную ёмкость у обоих.",
        de: "Zwei Winterresort-Kunden in Bukovel. Eine 1,5-monatige Meta-Kampagne mit insgesamt 2.000 $ Budget machte bei beiden die Saisonkapazität ausverkauft.",
        ua: "Два клієнти — зимові курорти в Буковелі. Кампанія в Meta за 1,5 місяця на сукупному бюджеті $2 000 розпродала сезонну спроможність в обох.",
      },
      metrics: [
        {
          en: "2 resorts sold out",
          ru: "2 курорта распроданы",
          de: "2 Resorts ausverkauft",
          ua: "2 курорти розпродані",
        },
        {
          en: "$2,000 combined budget",
          ru: "$2 000 совокупный бюджет",
          de: "2.000 $ Gesamtbudget",
          ua: "$2 000 сукупний бюджет",
        },
        {
          en: "$500–1,500 avg booking",
          ru: "$500–1 500 средняя бронь",
          de: "500–1.500 $ Ø-Buchung",
          ua: "$500–1 500 середня броня",
        },
      ],
      headline: {
        en: "Season sold out",
        ru: "Сезон распродан",
        de: "Saison ausverkauft",
        ua: "Сезон розпродано",
      },
      meta: {
        en: "2 resort clients · $2,000 combined budget · 1.5 months",
        ru: "2 клиента-курорта · бюджет $2 000 · 1,5 месяца",
        de: "2 Resort-Kunden · 2.000 $ Gesamtbudget · 1,5 Monate",
        ua: "2 клієнти-курорти · бюджет $2 000 · 1,5 місяця",
      },
      niche: {
        en: "Hospitality · Europe · Winter",
        ru: "Гостеприимство · Европа · Зима",
        de: "Hospitality · Europa · Winter",
        ua: "Гостинність · Європа · Зима",
      },
      stats: [
        {
          value: "$800",
          label: {
            en: "Client 1 budget",
            ru: "Бюджет клиента 1",
            de: "Budget Kunde 1",
            ua: "Бюджет клієнта 1",
          },
        },
        {
          value: "$1,200",
          label: {
            en: "Client 2 budget",
            ru: "Бюджет клиента 2",
            de: "Budget Kunde 2",
            ua: "Бюджет клієнта 2",
          },
        },
        {
          value: "$500–1.5k",
          label: {
            en: "Avg booking",
            ru: "Средняя бронь",
            de: "Ø-Buchung",
            ua: "Середня броня",
          },
        },
        {
          value: "2×",
          label: {
            en: "Sold out",
            ru: "Распродано",
            de: "Ausverkauft",
            ua: "Розпродано",
          },
        },
      ],
      clients: {
        heading: {
          en: "Campaign breakdown",
          ru: "Разбивка кампании",
          de: "Kampagnen-Aufschlüsselung",
          ua: "Розбивка кампанії",
        },
        items: [
          {
            label: {
              en: "Client 1 · Private chalet base",
              ru: "Клиент 1 · Частная база шале",
              de: "Kunde 1 · Private Chalet-Basis",
              ua: "Клієнт 1 · Приватна база шале",
            },
            rows: [
              {
                label: {
                  en: "Budget",
                  ru: "Бюджет",
                  de: "Budget",
                  ua: "Бюджет",
                },
                value: u("$800"),
              },
              {
                label: {
                  en: "Result",
                  ru: "Результат",
                  de: "Ergebnis",
                  ua: "Результат",
                },
                value: {
                  en: "Fully booked",
                  ru: "Полностью заполнен",
                  de: "Voll ausgebucht",
                  ua: "Повністю заповнений",
                },
              },
            ],
          },
          {
            label: {
              en: "Client 2 · Mountain resort",
              ru: "Клиент 2 · Горный курорт",
              de: "Kunde 2 · Bergresort",
              ua: "Клієнт 2 · Гірський курорт",
            },
            rows: [
              {
                label: {
                  en: "Budget",
                  ru: "Бюджет",
                  de: "Budget",
                  ua: "Бюджет",
                },
                value: u("$1,200"),
              },
              {
                label: {
                  en: "Result",
                  ru: "Результат",
                  de: "Ergebnis",
                  ua: "Результат",
                },
                value: {
                  en: "Fully booked",
                  ru: "Полностью заполнен",
                  de: "Voll ausgebucht",
                  ua: "Повністю заповнений",
                },
              },
            ],
          },
        ],
        resultLabel: {
          en: "Final result",
          ru: "Итоговый результат",
          de: "Endergebnis",
          ua: "Підсумковий результат",
        },
        result: {
          en: "Both clients · seasonal capacity sold out",
          ru: "Оба клиента · сезонная ёмкость распродана",
          de: "Beide Kunden · Saisonkapazität ausverkauft",
          ua: "Обидва клієнти · сезонна спроможність розпродана",
        },
      },
      breakdown: {
        heading: {
          en: "Campaign details",
          ru: "Детали кампании",
          de: "Kampagnendetails",
          ua: "Деталі кампанії",
        },
        rows: [
          {
            label: {
              en: "Avg booking value",
              ru: "Средняя стоимость брони",
              de: "Ø-Buchungswert",
              ua: "Середня вартість броні",
            },
            value: u("$500–$1,500"),
          },
          {
            label: {
              en: "Campaign duration",
              ru: "Длительность кампании",
              de: "Kampagnendauer",
              ua: "Тривалість кампанії",
            },
            value: {
              en: "1.5 months",
              ru: "1,5 месяца",
              de: "1,5 Monate",
              ua: "1,5 місяця",
            },
          },
          {
            label: {
              en: "Creatives",
              ru: "Креативы",
              de: "Creatives",
              ua: "Креативи",
            },
            value: {
              en: "From raw materials",
              ru: "Из исходников",
              de: "Aus Rohmaterial",
              ua: "З вихідних матеріалів",
            },
          },
        ],
      },
      services: [
        {
          en: "Meta Ads setup",
          ru: "Настройка Meta Ads",
          de: "Meta-Ads-Setup",
          ua: "Налаштування Meta Ads",
        },
        {
          en: "Creative production",
          ru: "Продакшн креативов",
          de: "Creative-Produktion",
          ua: "Продакшн креативів",
        },
        {
          en: "Seasonal strategy",
          ru: "Сезонная стратегия",
          de: "Saisonstrategie",
          ua: "Сезонна стратегія",
        },
      ],
    },
  },

  // ── Seventy Times · this site ─────────────────────────────
  {
    id: "seventy-times",
    status: "live",
    region: "usa",
    study: {
      accent: "#818cf8",
      title: u("Seventy Times"),
      tag: u("NEXT.JS · CLAUDE AI"),
      summary: {
        en: "This very site. A multilingual Next.js 14 build with Tess — a Claude-powered AI consultant — an interactive ROI simulator, and motion throughout.",
        ru: "Этот самый сайт. Многоязычный проект на Next.js 14: Тесс — ИИ-консультант на базе Claude, интерактивный ROI-симулятор и анимации повсюду.",
        de: "Genau diese Website. Ein mehrsprachiges Next.js-14-Projekt mit Tess — einem KI-Berater auf Claude-Basis — einem interaktiven ROI-Simulator und Animationen überall.",
        ua: "Цей самий сайт. Багатомовний проєкт на Next.js 14: Тесс — ШІ-консультант на базі Claude, інтерактивний ROI-симулятор та анімації всюди.",
      },
      metrics: [
        {
          en: "4 languages — EN / RU / DE / UA",
          ru: "4 языка — EN / RU / DE / UA",
          de: "4 Sprachen — EN / RU / DE / UA",
          ua: "4 мови — EN / RU / DE / UA",
        },
        {
          en: "Tess — Claude AI consultant, 24/7",
          ru: "Тесс — ИИ-консультант на Claude, 24/7",
          de: "Tess — Claude-KI-Berater, 24/7",
          ua: "Тесс — ШІ-консультант на Claude, 24/7",
        },
        {
          en: "Interactive ROI simulator",
          ru: "Интерактивный ROI-симулятор",
          de: "Interaktiver ROI-Simulator",
          ua: "Інтерактивний ROI-симулятор",
        },
      ],
      headline: {
        en: "Agency site + AI consultant",
        ru: "Сайт агентства + ИИ-консультант",
        de: "Agentur-Website + KI-Berater",
        ua: "Сайт агенції + ШІ-консультант",
      },
      meta: {
        en: "Full build · Next.js 14 · Claude API · 4 languages · live",
        ru: "Полная разработка · Next.js 14 · Claude API · 4 языка · в проде",
        de: "Komplett-Build · Next.js 14 · Claude API · 4 Sprachen · live",
        ua: "Повна розробка · Next.js 14 · Claude API · 4 мови · у проді",
      },
      niche: {
        en: "Agency · AI · Web dev",
        ru: "Агентство · ИИ · Веб-разработка",
        de: "Agentur · KI · Webentwicklung",
        ua: "Агенція · ШІ · Веброзробка",
      },
      features: [
        {
          icon: "🌐",
          text: {
            en: "Multi-language — EN / RU / DE / UA across the whole site",
            ru: "Мультиязычность — EN / RU / DE / UA по всему сайту",
            de: "Mehrsprachig — EN / RU / DE / UA auf der ganzen Seite",
            ua: "Багатомовність — EN / RU / DE / UA по всьому сайту",
          },
        },
        {
          icon: "🤖",
          text: {
            en: "Tess — Claude-powered lead qualifier, online 24/7",
            ru: "Тесс — квалификатор лидов на Claude, онлайн 24/7",
            de: "Tess — Lead-Qualifizierer auf Claude-Basis, 24/7 online",
            ua: "Тесс — кваліфікатор лідів на Claude, онлайн 24/7",
          },
        },
        {
          icon: "📊",
          text: {
            en: "ROI calculator — interactive growth simulator per pillar",
            ru: "ROI-калькулятор — интерактивный симулятор роста по направлениям",
            de: "ROI-Rechner — interaktiver Wachstumssimulator je Bereich",
            ua: "ROI-калькулятор — інтерактивний симулятор зростання за напрямами",
          },
        },
        {
          icon: "⚡",
          text: {
            en: "Framer Motion animation · SSR · edge functions",
            ru: "Анимации Framer Motion · SSR · edge-функции",
            de: "Framer-Motion-Animationen · SSR · Edge Functions",
            ua: "Анімації Framer Motion · SSR · edge-функції",
          },
        },
      ],
      chat: {
        title: {
          en: "AI consultant · live",
          ru: "ИИ-консультант · онлайн",
          de: "KI-Berater · live",
          ua: "ШІ-консультант · онлайн",
        },
        messages: [
          {
            role: "bot",
            text: {
              en: "Hi! I'm Tess, the Seventy Times AI consultant. Tell me about your business — I'll help figure out what you actually need.",
              ru: "Привет! Я Тесс, ИИ-консультант Seventy Times. Расскажите о вашем бизнесе — помогу понять, что вам действительно нужно.",
              de: "Hi! Ich bin Tess, die KI-Beraterin von Seventy Times. Erzähl mir von deinem Unternehmen — ich helfe herauszufinden, was du wirklich brauchst.",
              ua: "Привіт! Я Тесс, ШІ-консультант Seventy Times. Розкажіть про ваш бізнес — допоможу зрозуміти, що вам справді потрібно.",
            },
          },
          {
            role: "user",
            text: {
              en: "We run a roofing company and want more leads from Meta Ads.",
              ru: "У нас кровельная компания, хотим больше лидов из Meta Ads.",
              de: "Wir haben eine Dachdeckerfirma und wollen mehr Leads über Meta Ads.",
              ua: "У нас покрівельна компанія, хочемо більше лідів із Meta Ads.",
            },
          },
          {
            role: "bot",
            text: {
              en: "Got it — roofing is a great fit for lead gen on Meta. What's your monthly ad budget, and do you already have a landing page?",
              ru: "Понятно — кровля отлично подходит для лидогенерации в Meta. Какой у вас месячный рекламный бюджет и есть ли уже лендинг?",
              de: "Verstanden — Dachdeckerei eignet sich super für Leadgen auf Meta. Wie hoch ist dein monatliches Werbebudget, und hast du schon eine Landingpage?",
              ua: "Зрозуміло — покрівля чудово підходить для лідогенерації в Meta. Який у вас місячний рекламний бюджет і чи є вже лендинг?",
            },
          },
        ],
      },
      stack: [
        "Next.js 14",
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
    study: {
      accent: "#D4A54A",
      title: u("Elite Car Mats"),
      tag: u("CUSTOM E-COMMERCE · USA"),
      summary: {
        en: "A custom-built e-commerce store for a car-mat manufacturer entering the U.S. market. A Next.js storefront with a full vehicle configurator across ~60 brands and ~700 models, Stripe checkout, and an operator dashboard. Paid ads are a separate later phase — this case is the build.",
        ru: "Кастомный интернет-магазин для производителя автоковриков, выходящего на рынок США. Витрина на Next.js с полным конфигуратором под авто — ~60 брендов и ~700 моделей, оплата через Stripe и операторская панель. Платная реклама — отдельный поздний этап, этот кейс про саму разработку.",
        de: "Ein maßgeschneiderter Onlineshop für einen Fußmatten-Hersteller beim Markteintritt in den USA. Ein Next.js-Storefront mit vollem Fahrzeug-Konfigurator über ~60 Marken und ~700 Modelle, Stripe-Checkout und Betreiber-Dashboard. Bezahlte Werbung ist eine separate, spätere Phase — dieser Case ist der Build.",
        ua: "Кастомний інтернет-магазин для виробника автомобільних килимків, що виходить на ринок США. Вітрина на Next.js з повним конфігуратором під авто — ~60 брендів і ~700 моделей, оплата через Stripe та операторська панель. Платна реклама — окремий пізніший етап, цей кейс про саму розробку.",
      },
      metrics: [
        {
          en: "~700 vehicle models, ~60 brands",
          ru: "~700 моделей авто, ~60 брендов",
          de: "~700 Fahrzeugmodelle, ~60 Marken",
          ua: "~700 моделей авто, ~60 брендів",
        },
        {
          en: "Full vehicle configurator + Stripe",
          ru: "Полный конфигуратор под авто + Stripe",
          de: "Voller Fahrzeug-Konfigurator + Stripe",
          ua: "Повний конфігуратор під авто + Stripe",
        },
        {
          en: "Custom Next.js build, 3 languages",
          ru: "Кастомная разработка на Next.js, 3 языка",
          de: "Individueller Next.js-Build, 3 Sprachen",
          ua: "Кастомна розробка на Next.js, 3 мови",
        },
      ],
      headline: {
        en: "Custom car-mat store, built end-to-end",
        ru: "Магазин автоковриков под ключ",
        de: "Automatten-Shop, komplett gebaut",
        ua: "Магазин автокилимків під ключ",
      },
      meta: {
        en: "Next.js · ~60 brands / ~700 models · Stripe · 3 languages",
        ru: "Next.js · ~60 брендов / ~700 моделей · Stripe · 3 языка",
        de: "Next.js · ~60 Marken / ~700 Modelle · Stripe · 3 Sprachen",
        ua: "Next.js · ~60 брендів / ~700 моделей · Stripe · 3 мови",
      },
      niche: {
        en: "Auto · E-commerce · USA",
        ru: "Авто · E-commerce · США",
        de: "Auto · E-Commerce · USA",
        ua: "Авто · E-commerce · США",
      },
      stats: [
        {
          value: "~700",
          label: {
            en: "Vehicle models",
            ru: "Моделей авто",
            de: "Fahrzeugmodelle",
            ua: "Моделей авто",
          },
        },
        {
          value: "~60",
          label: {
            en: "Car brands",
            ru: "Брендов авто",
            de: "Automarken",
            ua: "Брендів авто",
          },
        },
        {
          value: "3",
          label: {
            en: "Languages",
            ru: "Языка",
            de: "Sprachen",
            ua: "Мови",
          },
        },
        {
          value: "100%",
          label: {
            en: "Custom build",
            ru: "Кастомная",
            de: "Custom-Build",
            ua: "Кастомна",
          },
        },
      ],
      features: [
        {
          icon: "🚗",
          text: {
            en: "Vehicle configurator — year, set type, mat & edge colour, optional brand badge",
            ru: "Конфигуратор под авто — год, тип комплекта, цвет коврика и окантовки, опц. шильдик бренда",
            de: "Fahrzeug-Konfigurator — Jahr, Set-Typ, Matten- und Kantenfarbe, optionales Marken-Badge",
            ua: "Конфігуратор під авто — рік, тип комплекта, колір килимка й окантовки, опц. шильдик бренда",
          },
        },
        {
          icon: "🔎",
          text: {
            en: "Catalog of ~60 brands / ~700 models with body-type filters and ⌘K search",
            ru: "Каталог ~60 брендов / ~700 моделей с фильтрами по кузову и поиском ⌘K",
            de: "Katalog mit ~60 Marken / ~700 Modellen, Karosserie-Filtern und ⌘K-Suche",
            ua: "Каталог ~60 брендів / ~700 моделей з фільтрами за кузовом і пошуком ⌘K",
          },
        },
        {
          icon: "💳",
          text: {
            en: "Cart with promo codes and Stripe Checkout",
            ru: "Корзина с промокодами и оплатой через Stripe Checkout",
            de: "Warenkorb mit Promo-Codes und Stripe Checkout",
            ua: "Кошик з промокодами та оплатою через Stripe Checkout",
          },
        },
        {
          icon: "📦",
          text: {
            en: "Order tracking, wishlist, and a custom-order form for vehicles not in the catalog",
            ru: "Отслеживание заказа, вишлист и форма кастом-заказа для авто не из каталога",
            de: "Bestellverfolgung, Wunschliste und Sonderbestellformular für Fahrzeuge außerhalb des Katalogs",
            ua: "Відстеження замовлення, список бажань і форма кастом-замовлення для авто не з каталогу",
          },
        },
        {
          icon: "📰",
          text: {
            en: "Markdown blog and 3 languages (EN / RU / UK), WCAG-accessible",
            ru: "Блог на Markdown и 3 языка (EN / RU / UK), доступность по WCAG",
            de: "Markdown-Blog und 3 Sprachen (EN / RU / UK), WCAG-konform",
            ua: "Блог на Markdown і 3 мови (EN / RU / UK), доступність за WCAG",
          },
        },
        {
          icon: "🔒",
          text: {
            en: "Full SEO — Schema.org, sitemap, and a Google Merchant Center product feed",
            ru: "Полное SEO — Schema.org, sitemap и продуктовый фид Google Merchant Center",
            de: "Vollständiges SEO — Schema.org, Sitemap und Google-Merchant-Center-Produktfeed",
            ua: "Повне SEO — Schema.org, sitemap і продуктовий фід Google Merchant Center",
          },
        },
      ],
      deliverables: {
        heading: {
          en: "Operator dashboard",
          ru: "Операторская панель",
          de: "Betreiber-Dashboard",
          ua: "Операторська панель",
        },
        items: [
          {
            en: "Revenue dashboard — daily / weekly / monthly, AOV, top models",
            ru: "Дашборд выручки — день / неделя / месяц, средний чек, топ-модели",
            de: "Umsatz-Dashboard — täglich / wöchentlich / monatlich, AOV, Top-Modelle",
            ua: "Дашборд виручки — день / тиждень / місяць, середній чек, топ-моделі",
          },
          {
            en: "Order management with status timeline and tracking numbers",
            ru: "Управление заказами со статус-таймлайном и трек-номерами",
            de: "Bestellverwaltung mit Status-Timeline und Sendungsnummern",
            ua: "Керування замовленнями зі статус-таймлайном і трек-номерами",
          },
          {
            en: "Live price editor with per-vehicle overrides",
            ru: "Живой редактор цен с переопределениями по типам авто",
            de: "Live-Preiseditor mit Überschreibungen je Fahrzeug",
            ua: "Живий редактор цін з перевизначеннями за типами авто",
          },
          {
            en: "Catalog CRUD, blog editor, promo codes, review moderation, newsletter",
            ru: "CRUD каталога, редактор блога, промокоды, модерация отзывов, рассылка",
            de: "Katalog-CRUD, Blog-Editor, Promo-Codes, Bewertungs-Moderation, Newsletter",
            ua: "CRUD каталогу, редактор блога, промокоди, модерація відгуків, розсилка",
          },
        ],
      },
      insight: {
        en: "Scope here was the storefront — design, build, catalog, payments and the admin panel. Paid acquisition is a separate, later phase, so this case is about what we shipped rather than campaign numbers.",
        ru: "Скоуп здесь — сама витрина: дизайн, разработка, каталог, оплата и админ-панель. Платное продвижение — отдельный, более поздний этап, поэтому кейс про то, что мы построили, а не про рекламные метрики.",
        de: "Der Umfang hier war der Shop selbst — Design, Build, Katalog, Zahlungen und das Admin-Panel. Bezahlte Akquise ist eine separate, spätere Phase, deshalb geht es in diesem Case um das Gelieferte und nicht um Kampagnenzahlen.",
        ua: "Скоуп тут — сама вітрина: дизайн, розробка, каталог, оплата та адмін-панель. Платне просування — окремий, пізніший етап, тому кейс про те, що ми побудували, а не про рекламні метрики.",
      },
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind",
        "Prisma + Neon",
        "Stripe",
        "Resend",
        "Vercel",
      ],
    },
  },

  // ── Reworking separately — left untouched for now ─────────
  {
    id: "convioo",
    titleKey: "case1Title",
    tagKey: "case1Tag",
    summaryKey: "case1Summary",
    metricsKey: "case1Metrics",
    status: "progress",
    region: "usa",
  },
];
