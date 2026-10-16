import { u, type CaseItem } from "./types";

// Early-experience niche case (2020–2021, pre-war Ukraine market):
// Meta Ads for four bus carriers running Ukraine ⇄ Europe. The ad
// accounts no longer exist, so every number here is from the team's
// memory and the page says so; the showcase uses a route board and a
// funnel instead of screenshots. Carriers' own sales are not claimed.
export const passengerTransport: CaseItem = {
    id: "passenger-transport",
    status: "live",
    region: "europe",
    era: "early",
    study: {
      accent: "#4d8dff",
      title: {
        en: "Passenger Transport",
        ru: "Пассажирские перевозки",
        uk: "Пасажирські перевезення",
      },
      tag: u("META ADS · UKRAINE ⇄ EUROPE · 2020–2021"),
      summary: {
        en: "One of our first niches (2020–2021): Meta Ads for four bus carriers running from Ukraine across Europe and back. Creatives made for each group of passengers and bookings taken right in the profile gave each carrier about 10 requests a day at roughly $1 each.",
        ru: "Одна из наших первых ниш (2020–2021): Meta Ads для четырёх автобусных перевозчиков из Украины по Европе и обратно. Креативы под каждую группу пассажиров и бронь прямо в профиле дали каждому около 10 заявок в день примерно по $1.",
        uk: "Одна з наших перших ніш (2020–2021): Meta Ads для чотирьох автобусних перевізників з України Європою й назад. Креативи під кожну групу пасажирів і бронювання просто в профілі дали кожному близько 10 заявок на день приблизно по $1.",
      },
      metrics: [
        {
          en: "~10 requests a day per carrier",
          ru: "~10 заявок в день у каждого перевозчика",
          uk: "~10 заявок на день у кожного перевізника",
        },
        {
          en: "~$1 per request",
          ru: "~$1 за заявку",
          uk: "~$1 за заявку",
        },
        {
          en: "4 carriers, similar numbers",
          ru: "4 перевозчика, похожие цифры",
          uk: "4 перевізники, схожі цифри",
        },
      ],
      headline: {
        en: "~10 requests a day at ~$1 each",
        ru: "~10 заявок в день по ~$1",
        uk: "~10 заявок на день по ~$1",
      },
      meta: {
        en: "Ukraine ⇄ Europe · 2020–2021 · 4 carriers",
        ru: "Украина ⇄ Европа · 2020–2021 · 4 перевозчика",
        uk: "Україна ⇄ Європа · 2020–2021 · 4 перевізники",
      },
      niche: {
        en: "Transportation · Ukraine",
        ru: "Перевозки · Украина",
        uk: "Перевезення · Україна",
      },
      showcase: {
        chip: {
          en: "Niche · Meta Ads · 2020–2021",
          ru: "Ниша · Meta Ads · 2020–2021",
          uk: "Ніша · Meta Ads · 2020–2021",
        },
        name: [
          { en: "Passenger", ru: "Пассажирские", uk: "Пасажирські" },
          { en: "transport", ru: "перевозки", uk: "перевезення" },
        ],
        start: {
          en: "Bus routes from Ukraine across Europe. Seats have to sell every week.",
          ru: "Рейсы из Украины по Европе. Места надо продавать каждую неделю.",
          uk: "Рейси з України Європою. Місця треба продавати щотижня.",
        },
        finish: {
          en: "~10 requests a day for each of the 4 carriers.",
          ru: "~10 заявок в день у каждого из 4 перевозчиков.",
          uk: "~10 заявок на день у кожного з 4 перевізників.",
        },
        revenueLabel: {
          en: "Cost of one request",
          ru: "Цена одной заявки",
          uk: "Ціна однієї заявки",
        },
        revenue: u("~$1"),
        spendNote: {
          en: "{spend} requests became a booking at ~$200",
          ru: "{spend} заявок становились бронью по ~$200",
          uk: "{spend} заявок ставали бронюванням по ~$200",
        },
        spend: { en: "2–3 of 10", ru: "2–3 из 10", uk: "2–3 з 10" },
        scheme: {
          label: { en: "Route", ru: "Маршрут", uk: "Маршрут" },
          caption: {
            en: "there and back",
            ru: "рейсы туда и обратно",
            uk: "рейси туди й назад",
          },
          route: [
            { en: "Ukraine", ru: "Украина", uk: "Україна" },
            { en: "Europe", ru: "Европа", uk: "Європа" },
          ],
          rows: [
            {
              label: { en: "Channel", ru: "Канал", uk: "Канал" },
              value: {
                en: "Meta Ads only",
                ru: "только Meta Ads",
                uk: "лише Meta Ads",
              },
            },
            {
              label: { en: "Carriers", ru: "Перевозчиков", uk: "Перевізників" },
              value: u("4"),
            },
            {
              label: { en: "Booking", ru: "Бронь", uk: "Бронювання" },
              value: {
                en: "right in the profile",
                ru: "прямо в профиле",
                uk: "просто в профілі",
              },
            },
          ],
          funnelLabel: {
            en: "A day's economics",
            ru: "Экономика дня",
            uk: "Економіка дня",
          },
          funnel: [
            {
              value: u("~$10"),
              label: { en: "ads per day", ru: "реклама в день", uk: "реклама на день" },
            },
            {
              value: u("~10"),
              label: { en: "requests", ru: "заявок", uk: "заявок" },
            },
            {
              value: u("2–3"),
              label: { en: "bookings", ru: "броней", uk: "бронювань" },
            },
            {
              value: u("$300–400"),
              label: {
                en: "revenue per day",
                ru: "выручка в день",
                uk: "виручка на день",
              },
            },
          ],
        },
        stickers: {
          top: {
            value: u("4"),
            label: { en: "carriers", ru: "перевозчика", uk: "перевізники" },
          },
        },
        details: [
          {
            value: u("4"),
            label: {
              en: "carriers, similar numbers",
              ru: "перевозчика, похожие цифры",
              uk: "перевізники, схожі цифри",
            },
          },
          {
            value: { en: "~10 a day", ru: "~10 в день", uk: "~10 на день" },
            label: {
              en: "requests for each",
              ru: "заявок у каждого",
              uk: "заявок у кожного",
            },
          },
          {
            value: u("~$1"),
            label: { en: "per request", ru: "за заявку", uk: "за заявку" },
          },
          {
            value: u("~$200"),
            label: {
              en: "average booking",
              ru: "средняя бронь",
              uk: "середнє бронювання",
            },
          },
        ],
        source: {
          en: "From the team's memory. The 2020–2021 ad accounts are gone, and no screenshots survived.",
          ru: "По памяти команды. Кабинетов 2020–2021 годов больше нет, скринов не осталось.",
          uk: "З пам'яті команди. Кабінетів 2020–2021 років більше немає, скринів не залишилося.",
        },
        story: {
          heading: { en: "How it went", ru: "Как это было", uk: "Як це було" },
          paragraphs: [
            {
              en: "This is one of our first niches. In 2020–2021 we ran ads for four carriers whose buses went from Ukraine all over Europe and back.",
              ru: "Это одна из наших первых ниш. В 2020–2021 годах мы вели рекламу для четырёх перевозчиков. Их автобусы ходили из Украины по всей Европе и возвращались обратно.",
              uk: "Це одна з наших перших ніш. У 2020–2021 роках ми вели рекламу для чотирьох перевізників. Їхні автобуси ходили з України всією Європою й поверталися назад.",
            },
            {
              en: "Budgets were small, so a request had to cost pennies. Trendy template creatives didn't work here; people just scrolled past them.",
              ru: "Бюджеты были маленькие, поэтому заявка должна была стоить копейки. Модные шаблонные креативы тут не работали, их просто пролистывали.",
              uk: "Бюджети були маленькі, тож заявка мала коштувати копійки. Модні шаблонні креативи тут не працювали, їх просто гортали.",
            },
            {
              en: "What worked was different. We made the creatives ourselves, separately for each group of passengers, and showed them where people are comfortable seeing that kind of ad. We set up each carrier's profile so a booking could be left right in it.",
              ru: "Сработало другое. Креативы мы делали сами, отдельно под каждую группу пассажиров, и показывали их там, где человеку удобно увидеть такую рекламу. Профиль перевозчика упаковали так, чтобы бронь можно было оставить прямо в нём.",
              uk: "Спрацювало інше. Креативи ми робили самі, окремо під кожну групу пасажирів, і показували їх там, де людині зручно побачити таку рекламу. Профіль перевізника упакували так, щоб бронювання можна було залишити просто в ньому.",
            },
            {
              en: "Each carrier ended up with about 10 requests a day at roughly a dollar each. Two or three in ten became a booking, $200 on average. All four had similar numbers.",
              ru: "В итоге у каждого было около 10 заявок в день примерно по доллару. Две-три из десяти становились бронью, в среднем на $200. У всех четырёх цифры были похожие.",
              uk: "У підсумку в кожного було близько 10 заявок на день приблизно по долару. Дві-три з десяти ставали бронюванням, у середньому на $200. У всіх чотирьох цифри були схожі.",
            },
            {
              en: "No screenshots survived six years. The experience did, and it still works.",
              ru: "Скринов за шесть лет не осталось. Остался опыт, который работает и сейчас.",
              uk: "Скринів за шість років не залишилося. Залишився досвід, який працює й зараз.",
            },
          ],
        },
      },
    },
};
