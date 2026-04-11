/**
 * Конфиг сайта: контакты, соцсети, имя.
 * Контакты сейчас — заглушки. Замени на реальные когда будут готовы.
 */

export const siteConfig = {
  name: "IAA agency",
  shortName: "iaa",
  tagline: "Ads · Automation · AI",
  description:
    "Реклама, автоматизация процессов и AI-боты для роста бизнеса.",
  url: "https://iaa.example",

  contacts: {
    // TODO: заменить на реальные контакты
    telegram: {
      handle: "@iaa_agency",
      url: "https://t.me/iaa_agency",
    },
    email: {
      address: "hello@iaa.agency",
      url: "mailto:hello@iaa.agency",
    },
  },

  stats: [
    { value: "50+", label: "Клиентов" },
    { value: "24/7", label: "AI-поддержка" },
    { value: "3×", label: "Рост конверсий" },
  ],
} as const;
