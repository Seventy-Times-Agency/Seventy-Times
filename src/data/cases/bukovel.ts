import { u, type CaseItem } from "./types";

export const bukovel: CaseItem = {
    id: "bukovel",
    status: "live",
    region: "europe",
    study: {
      accent: "#60A5FA",
      title: {
        en: "Bukovel Resorts",
        ru: "Курорты Буковеля",
        uk: "Курорти Буковеля",
      },
      tag: u("META ADS · HOSPITALITY"),
      summary: {
        en: "Two winter-resort clients in Bukovel. A 1.5-month Meta campaign on a combined $2,000 budget sold out the season for both — with average bookings of $500–1,500.",
        ru: "Два клиента — зимние курорты в Буковеле. Кампания в Meta за 1,5 месяца на совокупном бюджете $2 000 распродала сезон у обоих — при средней броне $500–1 500.",
        uk: "Два клієнти — зимові курорти в Буковелі. Кампанія в Meta за 1,5 місяця на сукупному бюджеті $2 000 розпродала сезон в обох — за середньої броні $500–1 500.",
      },
      metrics: [
        {
          en: "2 resorts sold out",
          ru: "2 курорта распроданы",
          uk: "2 курорти розпродані",
        },
        {
          en: "$2,000 combined budget",
          ru: "$2 000 совокупный бюджет",
          uk: "$2 000 сукупний бюджет",
        },
        {
          en: "$500–1,500 avg booking",
          ru: "$500–1 500 средняя бронь",
          uk: "$500–1 500 середня броня",
        },
      ],
      headline: {
        en: "Season sold out",
        ru: "Сезон распродан",
        uk: "Сезон розпродано",
      },
      meta: {
        en: "2 resort clients · $2,000 combined budget · 1.5 months",
        ru: "2 клиента-курорта · бюджет $2 000 · 1,5 месяца",
        uk: "2 клієнти-курорти · бюджет $2 000 · 1,5 місяця",
      },
      niche: {
        en: "Hospitality · Europe · Winter",
        ru: "Гостеприимство · Европа · Зима",
        uk: "Гостинність · Європа · Зима",
      },
      stats: [
        {
          value: "$800",
          label: {
            en: "Client 1 budget",
            ru: "Бюджет клиента 1",
            uk: "Бюджет клієнта 1",
          },
        },
        {
          value: "$1,200",
          label: {
            en: "Client 2 budget",
            ru: "Бюджет клиента 2",
            uk: "Бюджет клієнта 2",
          },
        },
        {
          value: "$500–1.5k",
          label: {
            en: "Avg booking",
            ru: "Средняя бронь",
            uk: "Середня броня",
          },
        },
        {
          value: "2×",
          label: {
            en: "Sold out",
            ru: "Распродано",
            uk: "Розпродано",
          },
        },
      ],
      clients: {
        heading: {
          en: "Campaign breakdown",
          ru: "Разбивка кампании",
          uk: "Розбивка кампанії",
        },
        items: [
          {
            label: {
              en: "Client 1 · Private chalet base",
              ru: "Клиент 1 · Частная база шале",
              uk: "Клієнт 1 · Приватна база шале",
            },
            rows: [
              {
                label: {
                  en: "Budget",
                  ru: "Бюджет",
                  uk: "Бюджет",
                },
                value: u("$800"),
              },
              {
                label: {
                  en: "Result",
                  ru: "Результат",
                  uk: "Результат",
                },
                value: {
                  en: "Fully booked",
                  ru: "Полностью заполнен",
                  uk: "Повністю заповнений",
                },
              },
            ],
          },
          {
            label: {
              en: "Client 2 · Mountain resort",
              ru: "Клиент 2 · Горный курорт",
              uk: "Клієнт 2 · Гірський курорт",
            },
            rows: [
              {
                label: {
                  en: "Budget",
                  ru: "Бюджет",
                  uk: "Бюджет",
                },
                value: u("$1,200"),
              },
              {
                label: {
                  en: "Result",
                  ru: "Результат",
                  uk: "Результат",
                },
                value: {
                  en: "Fully booked",
                  ru: "Полностью заполнен",
                  uk: "Повністю заповнений",
                },
              },
            ],
          },
        ],
        resultLabel: {
          en: "Final result",
          ru: "Итоговый результат",
          uk: "Підсумковий результат",
        },
        result: {
          en: "Both clients · seasonal capacity sold out",
          ru: "Оба клиента · сезонная ёмкость распродана",
          uk: "Обидва клієнти · сезонна спроможність розпродана",
        },
      },
      breakdown: {
        heading: {
          en: "Campaign details",
          ru: "Детали кампании",
          uk: "Деталі кампанії",
        },
        rows: [
          {
            label: {
              en: "Avg booking value",
              ru: "Средняя стоимость брони",
              uk: "Середня вартість броні",
            },
            value: u("$500–$1,500"),
          },
          {
            label: {
              en: "Campaign duration",
              ru: "Длительность кампании",
              uk: "Тривалість кампанії",
            },
            value: {
              en: "1.5 months",
              ru: "1,5 месяца",
              uk: "1,5 місяця",
            },
          },
          {
            label: {
              en: "Creatives",
              ru: "Креативы",
              uk: "Креативи",
            },
            value: {
              en: "From raw materials",
              ru: "Из исходников",
              uk: "З вихідних матеріалів",
            },
          },
        ],
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
          en: "Seasonal strategy",
          ru: "Сезонная стратегия",
          uk: "Сезонна стратегія",
        },
      ],
    },
  };
