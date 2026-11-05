import type { Locale } from "@/i18n/config";

type Loc = Record<Locale, string>;

export type CaseCardCopy = {
  /** What was done, in a couple of words. */
  kind: Loc;
  /** The niche, not the client: the name stays on the case page. */
  title: Loc;
  /** One line about the task. Figures with their qualifiers live on the case page. */
  task: Loc;
};

/** Cards on the shelf, in display order. The shelf closes with "your project". */
export const CASE_CARDS: Record<string, CaseCardCopy> = {
  elitecarmats: {
    kind: { ru: "Разработка", en: "Development", uk: "Розробка" },
    title: { ru: "Магазин автоковриков", en: "Car mat store", uk: "Магазин автокилимків" },
    task: {
      ru: "Витрина и конфигуратор под сотни моделей авто, оплата через Stripe.",
      en: "A storefront and configurator for hundreds of car models, with Stripe checkout.",
      uk: "Вітрина й конфігуратор під сотні моделей авто, оплата через Stripe.",
    },
  },
  lantana: {
    kind: { ru: "Сайт · SEO", en: "Website · SEO", uk: "Сайт · SEO" },
    title: { ru: "Мастерская перетяжки", en: "Upholstery shop", uk: "Майстерня перетяжки" },
    task: {
      ru: "Сайт, страницы услуг, блог и карточка Google для бизнеса на сарафане.",
      en: "A website, service pages, a blog and a Google profile for a referral-only business.",
      uk: "Сайт, сторінки послуг, блог і картка Google для бізнесу на сарафанному радіо.",
    },
  },
  convioo: {
    kind: { ru: "Продукт", en: "Product", uk: "Продукт" },
    title: { ru: "Платформа лидогенерации", en: "Lead generation platform", uk: "Платформа лідогенерації" },
    task: {
      ru: "Наш продукт для агентств: поиск компаний, AI-скоринг и лёгкая CRM.",
      en: "Our own product for agencies: company search, AI scoring and a light CRM.",
      uk: "Наш продукт для агенцій: пошук компаній, AI-скоринг і легка CRM.",
    },
  },
  "passenger-transport": {
    kind: { ru: "Реклама", en: "Ads", uk: "Реклама" },
    title: { ru: "Пассажирские перевозки", en: "Passenger transport", uk: "Пасажирські перевезення" },
    task: {
      ru: "Реклама в Meta для заявок на бронь, девять месяцев подряд. 2020–2021.",
      en: "Meta ads for booking requests, nine months running. 2020–2021.",
      uk: "Реклама в Meta для заявок на бронювання, дев'ять місяців поспіль. 2020–2021.",
    },
  },
  bukovel: {
    kind: { ru: "Реклама", en: "Ads", uk: "Реклама" },
    title: { ru: "Зимние курорты", en: "Winter resorts", uk: "Зимові курорти" },
    task: {
      ru: "Сезонные кампании в Meta для двух курортов. 2020–2021.",
      en: "Seasonal Meta campaigns for two resorts. 2020–2021.",
      uk: "Сезонні кампанії в Meta для двох курортів. 2020–2021.",
    },
  },
};
