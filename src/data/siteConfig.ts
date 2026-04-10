/**
 * Конфиг сайта: контакты, соцсети, имя.
 * Контакты сейчас — заглушки. Замени на реальные когда будут готовы.
 */

export const siteConfig = {
  name: "Aicore",
  tagline: "AI + Marketing Agency",
  description:
    "Таргетированная реклама, автоматизация процессов и AI-боты для роста бизнеса.",
  url: "https://aicore.example",

  contacts: {
    // TODO: заменить на реальные контакты
    telegram: {
      handle: "@aicore_team",
      url: "https://t.me/aicore_team",
    },
    email: {
      address: "hello@aicore.ai",
      url: "mailto:hello@aicore.ai",
    },
  },

  stats: [
    { value: "50+", label: "Клиентов" },
    { value: "24/7", label: "AI-поддержка" },
    { value: "3x", label: "Рост конверсий" },
  ],
} as const;
