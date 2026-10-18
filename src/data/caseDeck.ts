// Landing "deck" of case showcases — the condensed, one-card version of
// each case's showcase page. Copy mirrors the `showcase` blocks of the
// new case files (branch claude/case-lantana-transport-showcase); once
// that branch lands, this can be derived from `CASES[i].study.showcase`.

import type { Locale } from "@/i18n/config";

type Loc = Record<Locale, string>;
const L = (en: string, ru: string, uk: string): Loc => ({ en, ru, uk });
const same = (v: string): Loc => ({ en: v, ru: v, uk: v });

type Sticker = { value: Loc; label: Loc };

export type DeckCase = {
  id: string;
  accent: string;
  chip: Loc;
  name: [Loc, Loc];
  start: Loc;
  finish: Loc;
  figureLabel: Loc;
  figure: Loc;
  /** Line under the figure; `{b}` is replaced by `bold` in bold. */
  note: Loc;
  bold: Loc;
  /** Two screenshots, or a route + funnel scheme when there are none. */
  shots?: { site: { src: string; host: string }; second: { src: string; label: string } };
  scheme?: { route: [Loc, Loc]; funnel: Sticker[]; photo?: string };
  stickers: { top: Sticker; bottom?: Sticker };
};

export const CASE_DECK: readonly DeckCase[] = [
  {
    id: "elitecarmats",
    accent: "#b89a5e",
    chip: L("Case · E-commerce · USA", "Кейс · E-commerce · США", "Кейс · E-commerce · США"),
    name: [same("Elite Car"), same("Mats")],
    start: L(
      "Mats and a warehouse. No website, no brand, no sales.",
      "Коврики и склад. Без сайта, бренда и продаж.",
      "Килимки й склад. Без сайту, бренду та продажів.",
    ),
    finish: L(
      "A store, a brand, ads and 86 orders.",
      "Магазин, бренд, реклама и 86 заказов.",
      "Магазин, бренд, реклама і 86 замовлень.",
    ),
    figureLabel: L("Brought the client in 3 months", "Принесли клиенту за 3 месяца", "Принесли клієнту за 3 місяці"),
    figure: L("$16,188", "$16 188", "$16 188"),
    note: L("on {b} of ad spend", "при {b} на рекламу", "при {b} на рекламу"),
    bold: L("$2,267", "$2 267", "$2 267"),
    shots: {
      site: { src: "/cases/elitecarmats/site-hero.webp", host: "elitecarmats.us" },
      second: { src: "/cases/elitecarmats/meta-ads.webp", label: "Meta Ads" },
    },
    stickers: {
      top: { value: same("86"), label: L("orders", "заказов", "замовлень") },
      bottom: { value: L("7.1×", "7,1×", "7,1×"), label: L("from every $1 of ads", "с каждого $1 рекламы", "з кожного $1 реклами") },
    },
  },
  {
    id: "lantana",
    accent: "#b85a44",
    chip: L("Case · Website & SEO · Florida", "Кейс · Сайт и SEO · Флорида", "Кейс · Сайт і SEO · Флорида"),
    name: [same("Lantana"), same("Upholstery")],
    start: L(
      "20 years of craft. Referrals only, an empty profile, a site Google couldn't find.",
      "20 лет опыта. Сарафан, пустая карточка, сайта нет в Google.",
      "20 років досвіду. Сарафан, порожня картка, сайту немає в Google.",
    ),
    finish: L(
      "#1 in Google Maps and #2 in search for the main query.",
      "№1 в Google Картах и №2 в поиске по главному запросу.",
      "№1 у Google Картах і №2 у пошуку за головним запитом.",
    ),
    figureLabel: L("Google impressions in the first month", "Показов в Google за первый месяц", "Показів у Google за перший місяць"),
    figure: same("0 → 226"),
    note: L("before us the site wasn't in search {b}", "до нас сайта в поиске не было {b}", "до нас сайту в пошуку не було {b}"),
    bold: L("at all", "совсем", "зовсім"),
    shots: {
      site: { src: "/cases/lantana/site-hero.webp", host: "lantanaupholstery.com" },
      second: { src: "/cases/lantana/gsc.webp", label: "Search Console" },
    },
    stickers: {
      top: { value: same("0 → 18"), label: L("clicks from the profile", "переходов с карточки", "переходів з картки") },
      bottom: { value: same("№1"), label: L("in Google Maps", "в Google Картах", "у Google Картах") },
    },
  },
  {
    id: "passenger-transport",
    accent: "#6683ad",
    chip: L("Niche · Meta Ads · 2020–2021", "Ниша · Meta Ads · 2020–2021", "Ніша · Meta Ads · 2020–2021"),
    name: [L("Passenger", "Пассажирские", "Пасажирські"), L("transport", "перевозки", "перевезення")],
    start: L(
      "Bus routes from Ukraine across Europe. Seats have to sell every week.",
      "Рейсы из Украины по Европе. Места надо продавать каждую неделю.",
      "Рейси з України Європою. Місця треба продавати щотижня.",
    ),
    finish: L(
      "~10 requests a day for each of the 4 carriers.",
      "~10 заявок в день у каждого из 4 перевозчиков.",
      "~10 заявок на день у кожного з 4 перевізників.",
    ),
    figureLabel: L("Cost of one request", "Цена одной заявки", "Ціна однієї заявки"),
    figure: same("~$1"),
    note: L("{b} requests became a booking at ~$200", "{b} заявок становились бронью по ~$200", "{b} заявок ставали бронюванням по ~$200"),
    bold: L("2–3 of 10", "2–3 из 10", "2–3 з 10"),
    scheme: {
      route: [L("Ukraine", "Украина", "Україна"), L("Europe", "Европа", "Європа")],
      photo: "/cases/passenger-transport/sprinter.jpg",
      funnel: [
        { value: same("~$10"), label: L("ads per day", "реклама в день", "реклама на день") },
        { value: same("~10"), label: L("requests", "заявок", "заявок") },
        { value: same("2–3"), label: L("bookings", "броней", "бронювань") },
        { value: same("$300–400"), label: L("revenue per day", "выручка в день", "виручка на день") },
      ],
    },
    stickers: { top: { value: same("4"), label: L("carriers", "перевозчика", "перевізники") } },
  },
  {
    id: "bukovel",
    accent: "#5f97a6",
    chip: L("Case · Meta Ads · Carpathians", "Кейс · Meta Ads · Карпаты", "Кейс · Meta Ads · Карпати"),
    name: [L("Bukovel", "Курорты", "Курорти"), L("resorts", "Буковеля", "Буковеля")],
    start: L(
      "Two resorts in Bukovel. A short season: rooms must sell before spring.",
      "Два курорта в Буковеле. Сезон короткий, места надо продать до весны.",
      "Два курорти в Буковелі. Сезон короткий, місця треба продати до весни.",
    ),
    finish: L(
      "Seasonal ads for both, with creatives made from their own footage.",
      "Сезонная реклама для обоих, креативы из их исходников.",
      "Сезонна реклама для обох, креативи з їхніх матеріалів.",
    ),
    figureLabel: L("Resorts in one destination", "Курорта в одном направлении", "Курорти в одному напрямку"),
    figure: same("2"),
    note: L("{b}, one winter season", "{b}, один зимний сезон", "{b}, один зимовий сезон"),
    bold: L("a chalet base and a mountain resort", "база шале и горный курорт", "база шале й гірський курорт"),
    scheme: {
      route: [L("City", "Город", "Місто"), L("Mountains", "Горы", "Гори")],
      photo: "/cases/bukovel/slopes.jpg",
      funnel: [
        { value: L("Footage", "Исходники", "Матеріали"), label: L("took", "взяли", "взяли") },
        { value: L("Creatives", "Креативы", "Креативи"), label: L("made", "собрали", "зібрали") },
        { value: L("Audiences", "Аудитории", "Аудиторії"), label: L("found", "нашли", "знайшли") },
        { value: L("Bookings", "Брони", "Бронювання"), label: L("the goal", "ради чего", "заради чого") },
      ],
    },
    stickers: { top: { value: same("2020–21"), label: L("winter season", "зимний сезон", "зимовий сезон") } },
  },
];
