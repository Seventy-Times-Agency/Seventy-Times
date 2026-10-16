import { u, type CaseItem } from "./types";

// Early-experience case (pre-war Ukraine market). Deliberately
// descriptive and number-free: the campaign data from that period was
// not preserved, so we describe what was done, when and where — and
// claim nothing we cannot back up. The showcase uses a board + steps
// (scheme) instead of screenshots.
export const bukovel: CaseItem = {
    id: "bukovel",
    status: "live",
    region: "europe",
    era: "early",
    study: {
      accent: "#5ec8e8",
      title: {
        en: "Bukovel Resorts",
        ru: "Курорты Буковеля",
        uk: "Курорти Буковеля",
      },
      tag: u("META ADS · UKRAINE · 2020–2021"),
      summary: {
        en: "Two winter-resort clients in Bukovel, Ukraine's biggest ski destination — an early project from the 2020–2021 period. We ran seasonal Meta Ads campaigns for both: creatives produced from the resorts' raw materials, audiences built around the winter-holiday demand window. Campaign data from that period wasn't preserved, so this case is descriptive by choice.",
        ru: "Два клиента — зимние курорты в Буковеле, крупнейшем горнолыжном направлении Украины. Ранний проект периода 2020–2021. Мы вели сезонные кампании Meta Ads для обоих: креативы собирали из исходников курортов, аудитории строили под окно зимнего спроса. Данные кампаний того периода не сохранились, поэтому кейс намеренно описательный.",
        uk: "Два клієнти — зимові курорти в Буковелі, найбільшому гірськолижному напрямку України. Ранній проєкт періоду 2020–2021. Ми вели сезонні кампанії Meta Ads для обох: креативи збирали з вихідних матеріалів курортів, аудиторії будували під вікно зимового попиту. Дані кампаній того періоду не збереглися, тому кейс навмисно описовий.",
      },
      metrics: [
        {
          en: "2 winter-resort clients",
          ru: "2 клиента-курорта",
          uk: "2 клієнти-курорти",
        },
        {
          en: "Seasonal Meta Ads campaigns",
          ru: "Сезонные кампании Meta Ads",
          uk: "Сезонні кампанії Meta Ads",
        },
        {
          en: "Pre-war Ukraine market, 2020–2021",
          ru: "Довоенный рынок Украины, 2020–2021",
          uk: "Довоєнний ринок України, 2020–2021",
        },
      ],
      headline: {
        en: "Seasonal campaigns for two resorts",
        ru: "Сезонные кампании для двух курортов",
        uk: "Сезонні кампанії для двох курортів",
      },
      meta: {
        en: "Ukraine · 2020–2021 · winter season · 2 clients",
        ru: "Украина · 2020–2021 · зимний сезон · 2 клиента",
        uk: "Україна · 2020–2021 · зимовий сезон · 2 клієнти",
      },
      niche: {
        en: "Hospitality · Ukraine · Winter",
        ru: "Гостеприимство · Украина · Зима",
        uk: "Гостинність · Україна · Зима",
      },
      showcase: {
        chip: {
          en: "Case · Meta Ads · Carpathians",
          ru: "Кейс · Meta Ads · Карпаты",
          uk: "Кейс · Meta Ads · Карпати",
        },
        name: [
          { en: "Bukovel", ru: "Курорты", uk: "Курорти" },
          { en: "resorts", ru: "Буковеля", uk: "Буковеля" },
        ],
        start: {
          en: "Two resorts in Bukovel. A short season: rooms must sell before spring.",
          ru: "Два курорта в\u00a0Буковеле. Сезон короткий, места надо продать до\u00a0весны.",
          uk: "Два курорти в\u00a0Буковелі. Сезон короткий, місця треба продати до\u00a0весни.",
        },
        finish: {
          en: "Seasonal ads for both, with creatives made from their own footage.",
          ru: "Сезонная реклама для обоих, креативы из\u00a0их\u00a0исходников.",
          uk: "Сезонна реклама для обох, креативи з\u00a0їхніх\u00a0матеріалів.",
        },
        revenueLabel: {
          en: "Resorts in one destination",
          ru: "Курорта в одном направлении",
          uk: "Курорти в одному напрямку",
        },
        revenue: u("2"),
        spendNote: {
          en: "{spend}, one winter season",
          ru: "{spend}, один зимний сезон",
          uk: "{spend}, один зимовий сезон",
        },
        spend: {
          en: "a chalet base and a mountain resort",
          ru: "база шале и горный курорт",
          uk: "база шале й гірський курорт",
        },
        scheme: {
          label: { en: "Destination", ru: "Направление", uk: "Напрямок" },
          caption: {
            en: "seasonal demand",
            ru: "сезонный спрос",
            uk: "сезонний попит",
          },
          route: [
            { en: "City", ru: "Город", uk: "Місто" },
            { en: "Mountains", ru: "Горы", uk: "Гори" },
          ],
          rows: [
            {
              label: { en: "Channel", ru: "Канал", uk: "Канал" },
              value: u("Meta Ads"),
            },
            {
              label: { en: "Clients", ru: "Клиенты", uk: "Клієнти" },
              value: {
                en: "chalet base and resort",
                ru: "база шале и курорт",
                uk: "база шале й курорт",
              },
            },
            {
              label: { en: "Period", ru: "Период", uk: "Період" },
              value: {
                en: "winter 2020–2021",
                ru: "зима 2020–2021",
                uk: "зима 2020–2021",
              },
            },
          ],
          funnelLabel: {
            en: "How we worked",
            ru: "Как работали",
            uk: "Як працювали",
          },
          funnel: [
            {
              value: { en: "Footage", ru: "Исходники", uk: "Матеріали" },
              label: { en: "took", ru: "взяли", uk: "взяли" },
            },
            {
              value: { en: "Creatives", ru: "Креативы", uk: "Креативи" },
              label: { en: "made", ru: "собрали", uk: "зібрали" },
            },
            {
              value: { en: "Audiences", ru: "Аудитории", uk: "Аудиторії" },
              label: { en: "found", ru: "нашли", uk: "знайшли" },
            },
            {
              value: { en: "Bookings", ru: "Брони", uk: "Бронювання" },
              label: { en: "the goal", ru: "ради чего", uk: "заради чого" },
            },
          ],
        },
        stickers: {
          top: {
            value: u("2020–21"),
            label: { en: "winter season", ru: "зимний сезон", uk: "зимовий сезон" },
          },
        },
        details: [
          {
            value: u("2"),
            label: {
              en: "clients in Bukovel",
              ru: "клиента в Буковеле",
              uk: "клієнти в Буковелі",
            },
          },
          {
            value: u("Meta Ads"),
            label: {
              en: "the only channel",
              ru: "единственный канал",
              uk: "єдиний канал",
            },
          },
          {
            value: { en: "Winter", ru: "Зима", uk: "Зима" },
            label: {
              en: "season 2020–2021",
              ru: "сезон 2020–2021",
              uk: "сезон 2020–2021",
            },
          },
          {
            value: { en: "Our own", ru: "Свои", uk: "Свої" },
            label: {
              en: "creatives from their footage",
              ru: "креативы из исходников",
              uk: "креативи з матеріалів",
            },
          },
        ],
        source: {
          en: "Campaign data from that period wasn't preserved, so there are no result numbers here.",
          ru: "Данные кампаний того периода не сохранились, поэтому цифр результата здесь нет.",
          uk: "Дані кампаній того періоду не збереглися, тому цифр результату тут немає.",
        },
        story: {
          heading: { en: "How it went", ru: "Как это было", uk: "Як це було" },
          paragraphs: [
            {
              en: "This is an early project, winter 2020–2021. Two clients in Bukovel, Ukraine's biggest ski resort, trusted us with their ads at once: a private chalet base and a mountain resort.",
              ru: "Это наш ранний проект, зима 2020–2021. Нам доверили рекламу сразу два клиента в Буковеле, самом большом горнолыжном курорте Украины: частная база шале и горный курорт.",
              uk: "Це наш ранній проєкт, зима 2020–2021. Нам довірили рекламу одразу два клієнти в Буковелі, найбільшому гірськолижному курорті України: приватна база шале й гірський курорт.",
            },
            {
              en: "In winter everything comes down to a short window. People book a few weeks before the trip, and if you're not visible then, the season goes to the neighbours.",
              ru: "Зимой у них всё решает короткое окно. Люди бронируют отдых за несколько недель до поездки, и если в этот момент тебя не видно, сезон уходит к соседям.",
              uk: "Взимку в них усе вирішує коротке вікно. Люди бронюють відпочинок за кілька тижнів до поїздки, і якщо в цей момент тебе не видно, сезон іде до сусідів.",
            },
            {
              en: "We ran seasonal Meta Ads campaigns for both. We made the creatives ourselves from what the resorts gave us: photos, videos, views from the windows. Audiences were built around people planning a winter holiday right then.",
              ru: "Мы вели сезонные кампании в Meta Ads для обоих. Креативы собирали сами из того, что дали курорты: фото, видео, виды из окон. Аудитории строили под тех, кто как раз планирует зимний отдых.",
              uk: "Ми вели сезонні кампанії в Meta Ads для обох. Креативи збирали самі з того, що дали курорти: фото, відео, краєвиди з вікон. Аудиторії будували під тих, хто якраз планує зимовий відпочинок.",
            },
            {
              en: "That season's numbers weren't preserved, and we won't make them up. What remains is the experience of working with seasonal demand.",
              ru: "Цифры того сезона не сохранились, и выдумывать их мы не будем. Остался опыт работы с сезонным спросом.",
              uk: "Цифри того сезону не збереглися, і вигадувати їх ми не будемо. Залишився досвід роботи із сезонним попитом.",
            },
          ],
        },
      },
    },
  };
