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
        uk: "Пасажирські перевезення",
      },
      tag: u("META ADS · EUROPE"),
      summary: {
        en: "A European passenger-transport operator. On a lean $200/mo Meta Ads budget we drove a steady 7–15 booking requests a day — enough that demand outran the available fleet, and the campaign was paused more than once to let operations catch up. Nine months in, the client is still with us and has referred two more businesses.",
        ru: "Европейский оператор пассажирских перевозок. На скромном бюджете Meta Ads $200/мес мы стабильно приносили 7–15 заявок на бронь в день — спрос превышал доступный автопарк, и кампанию не раз ставили на паузу, чтобы операции успевали. За девять месяцев клиент по-прежнему с нами и порекомендовал нас ещё двум бизнесам.",
        uk: "Європейський оператор пасажирських перевезень. На скромному бюджеті Meta Ads $200/міс ми стабільно приносили 7–15 заявок на бронювання щодня — попит перевищував доступний автопарк, і кампанію не раз ставили на паузу, щоб операції встигали. За дев'ять місяців клієнт досі з нами й порекомендував нас ще двом бізнесам.",
      },
      metrics: [
        {
          en: "7–15 leads per day",
          ru: "7–15 лидов в день",
          uk: "7–15 лідів на день",
        },
        {
          en: "~$7 daily ad spend",
          ru: "~$7 расходов в день",
          uk: "~$7 витрат на день",
        },
        {
          en: "9-month partnership, 2 referrals",
          ru: "9 месяцев сотрудничества, 2 реферала",
          uk: "9 місяців співпраці, 2 реферали",
        },
      ],
      headline: {
        en: "7–15 leads per day",
        ru: "7–15 лидов в день",
        uk: "7–15 лідів на день",
      },
      meta: {
        en: "$200/mo budget · 9 months · 2 referral clients",
        ru: "Бюджет $200/мес · 9 месяцев · 2 клиента по рекомендации",
        uk: "Бюджет $200/міс · 9 місяців · 2 клієнти за рекомендацією",
      },
      niche: {
        en: "Transportation · Europe",
        ru: "Перевозки · Европа",
        uk: "Перевезення · Європа",
      },
      stats: [
        {
          value: "$200",
          label: {
            en: "Monthly budget",
            ru: "Бюджет в месяц",
            uk: "Бюджет на місяць",
          },
        },
        {
          value: "~$7",
          label: {
            en: "Daily spend",
            ru: "Расход в день",
            uk: "Витрати на день",
          },
        },
        {
          value: "2–3",
          label: {
            en: "Bookings / day",
            ru: "Брони в день",
            uk: "Броні на день",
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
            value: u("$200"),
          },
          {
            label: {
              en: "Daily spend",
              ru: "Расход в день",
              uk: "Витрати на день",
            },
            value: u("~$6–7"),
          },
          {
            label: {
              en: "Leads generated",
              ru: "Лидов получено",
              uk: "Згенеровано лідів",
            },
            value: {
              en: "7–15 / day",
              ru: "7–15 / день",
              uk: "7–15 / день",
            },
          },
          {
            label: {
              en: "Bookings closed",
              ru: "Закрытых броней",
              uk: "Закритих броней",
            },
            value: {
              en: "2–3 / day",
              ru: "2–3 / день",
              uk: "2–3 / день",
            },
          },
          {
            label: {
              en: "Avg ticket",
              ru: "Средний чек",
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
          uk: "Оцінка виручки",
        },
        rows: [
          {
            label: {
              en: "2 bookings × €180",
              ru: "2 брони × €180",
              uk: "2 броні × €180",
            },
            value: {
              en: "€360 / day",
              ru: "€360 / день",
              uk: "€360 / день",
            },
          },
          {
            label: {
              en: "× 25 working days",
              ru: "× 25 рабочих дней",
              uk: "× 25 робочих днів",
            },
            value: {
              en: "~€9,000 / mo",
              ru: "~€9 000 / мес",
              uk: "~€9 000 / міс",
            },
          },
        ],
        roasLabel: {
          en: "Est. ROAS",
          ru: "Оценка ROAS",
          uk: "Орієнтовний ROAS",
        },
        roas: "~45×",
        roasNote: {
          en: "illustrative — from the figures above, before operational costs",
          ru: "иллюстративно — из цифр выше, без операционных расходов",
          uk: "ілюстративно — з цифр вище, без операційних витрат",
        },
      },
      insight: {
        en: "The real constraint here was never demand — it was capacity. Lead flow consistently outpaced what the fleet could serve, which is the kind of problem most operators would like to have.",
        ru: "Настоящим ограничением был не спрос, а ёмкость. Поток заявок стабильно превышал то, что мог обслужить автопарк, — проблема, которую большинство операторов хотели бы иметь.",
        uk: "Справжнім обмеженням був не попит, а спроможність. Потік заявок стабільно перевищував те, що міг обслужити автопарк, — проблема, яку більшість операторів хотіли б мати.",
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
