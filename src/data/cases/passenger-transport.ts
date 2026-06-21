import { u, type CaseItem } from "./types";

export const passengerTransport: CaseItem = {
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
  };
