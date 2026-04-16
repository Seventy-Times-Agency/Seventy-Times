/**
 * Конфиг сайта: контакты, соцсети, имя.
 * Контакты — заглушки, замени на реальные когда будут готовы.
 */

export const siteConfig = {
  name: "Seventy Times",
  shortName: "70×",
  tagline: "Ads · Automation · AI",
  description:
    "Реклама, автоматизация процессов и AI-боты для роста бизнеса.",
  url: "https://seventy-times.com",

  contacts: {
    // TODO: заменить на реальные контакты
    telegram: {
      handle: "@seventytimes",
      url: "https://t.me/seventytimes",
    },
    email: {
      address: "info@seventy-times.com",
      url: "mailto:info@seventy-times.com",
    },
  },

  stats: [
    { value: "70×", label: "Рост" },
    { value: "24/7", label: "AI-поддержка" },
    { value: "3×", label: "Конверсии" },
  ],
} as const;
