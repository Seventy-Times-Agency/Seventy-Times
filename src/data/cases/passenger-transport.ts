import { u, type CaseItem } from "./types";

// Early-experience case (2020–2021, pre-war Ukraine market). Kept
// honest on purpose: lead volume, budget and duration are the numbers
// we can stand behind on a call; the client's own sales are NOT
// claimed anywhere — we didn't have access to them.
export const passengerTransport: CaseItem = {
    id: "passenger-transport",
    status: "live",
    region: "europe",
    era: "early",
    study: {
      accent: "#FF6B35",
      title: {
        en: "Passenger Transport",
        ru: "Пассажирские перевозки",
        uk: "Пасажирські перевезення",
      },
      tag: u("META ADS · UKRAINE · 2020–2021"),
      summary: {
        en: "A Ukrainian passenger-transport operator and one of our first projects (2020–2021). On a lean ~$200/mo Meta Ads budget the campaign brought a steady 7–10 booking requests a day, and the partnership ran for nine months straight.",
        ru: "Украинский оператор пассажирских перевозок — один из наших первых проектов (2020–2021). На скромном бюджете Meta Ads ~$200/мес кампания стабильно приносила 7–10 заявок на бронь в день, а сотрудничество продлилось девять месяцев подряд.",
        uk: "Український оператор пасажирських перевезень — один із наших перших проєктів (2020–2021). На скромному бюджеті Meta Ads ~$200/міс кампанія стабільно приносила 7–10 заявок на бронювання щодня, а співпраця тривала дев'ять місяців поспіль.",
      },
      metrics: [
        {
          en: "7–10 booking requests per day",
          ru: "7–10 заявок в день",
          uk: "7–10 заявок на день",
        },
        {
          en: "~$200/mo ad budget",
          ru: "Бюджет ~$200/мес",
          uk: "Бюджет ~$200/міс",
        },
        {
          en: "9 months of continuous work",
          ru: "9 месяцев непрерывного сотрудничества",
          uk: "9 місяців безперервної співпраці",
        },
      ],
      headline: {
        en: "7–10 booking requests per day",
        ru: "7–10 заявок в день",
        uk: "7–10 заявок на день",
      },
      meta: {
        en: "Ukraine · 2020–2021 · one of our first projects · 9 months",
        ru: "Украина · 2020–2021 · один из первых проектов · 9 месяцев",
        uk: "Україна · 2020–2021 · один із перших проєктів · 9 місяців",
      },
      niche: {
        en: "Transportation · Ukraine",
        ru: "Перевозки · Украина",
        uk: "Перевезення · Україна",
      },
      stats: [
        {
          value: "~$200",
          label: {
            en: "Monthly budget",
            ru: "Бюджет в месяц",
            uk: "Бюджет на місяць",
          },
        },
        {
          value: "7–10",
          label: {
            en: "Requests / day",
            ru: "Заявок в день",
            uk: "Заявок на день",
          },
        },
        {
          value: "9 mo",
          label: {
            en: "Partnership",
            ru: "Сотрудничество",
            uk: "Співпраця",
          },
        },
        {
          value: "2020–21",
          label: {
            en: "Period",
            ru: "Период",
            uk: "Період",
          },
        },
      ],
      breakdown: {
        heading: {
          en: "Campaign details",
          ru: "Детали кампании",
          uk: "Деталі кампанії",
        },
        rows: [
          {
            label: {
              en: "Monthly ad budget",
              ru: "Рекламный бюджет в месяц",
              uk: "Рекламний бюджет на місяць",
            },
            value: u("~$200"),
          },
          {
            label: {
              en: "Booking requests",
              ru: "Заявок на бронь",
              uk: "Заявок на бронювання",
            },
            value: {
              en: "7–10 / day",
              ru: "7–10 / день",
              uk: "7–10 / день",
            },
          },
          {
            label: {
              en: "Duration",
              ru: "Длительность",
              uk: "Тривалість",
            },
            value: {
              en: "9 months, continuous",
              ru: "9 месяцев непрерывно",
              uk: "9 місяців безперервно",
            },
          },
          {
            label: {
              en: "Market",
              ru: "Рынок",
              uk: "Ринок",
            },
            value: {
              en: "Ukraine, pre-war",
              ru: "Украина, довоенный",
              uk: "Україна, довоєнний",
            },
          },
        ],
      },
      insight: {
        en: "An early project we still stand behind: a small budget, a steady stream of requests, and a client who stayed for nine months. We report the lead flow we saw in the ad account — the client's own sales figures were theirs, and we don't claim them.",
        ru: "Ранний проект, за который нам не стыдно: небольшой бюджет, стабильный поток заявок и клиент, оставшийся на девять месяцев. Мы приводим поток заявок, который видели в рекламном кабинете, — продажи клиента были его данными, и мы их не заявляем.",
        uk: "Ранній проєкт, за який нам не соромно: невеликий бюджет, стабільний потік заявок і клієнт, що залишився на дев'ять місяців. Ми наводимо потік заявок, який бачили в рекламному кабінеті, — продажі клієнта були його даними, і ми їх не заявляємо.",
      },
      services: [
        {
          en: "Meta Ads setup",
          ru: "Настройка Meta Ads",
          uk: "Налаштування Meta Ads",
        },
        {
          en: "Creative production",
          ru: "Продакшн креативов",
          uk: "Продакшн креативів",
        },
        {
          en: "Audience targeting",
          ru: "Таргетинг аудитории",
          uk: "Таргетинг аудиторії",
        },
      ],
    },
  };
