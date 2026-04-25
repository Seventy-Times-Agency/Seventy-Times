export const siteConfig = {
  name: "Seventy Times",
  shortName: "70×",
  tagline: "Ads · Automation · AI",
  description:
    "Реклама, автоматизация и AI-боты для роста бизнеса.",
  url: "https://seventy-times.com",

  contacts: {
    telegram: {
      handle: "@seventytimes",
      url: "https://t.me/seventytimes",
    },
    email: {
      address: "info@seventy-times.com",
      url: "mailto:info@seventy-times.com",
    },
    whatsapp: {
      handle: "+1 (000) 000-0000",
      url: "https://wa.me/10000000000",
    },
    instagram: {
      handle: "@seventytimes",
      url: "https://instagram.com/seventytimes",
    },
    facebook: {
      handle: "Seventy Times",
      url: "https://facebook.com/seventytimes",
    },
  },

  // Hero ring values in display order. Labels live in i18n
  // (statGoal/statServices/statSupport/statLaunch). The Hero
  // overrides count-up targets per ring; non-numeric values like
  // "24/7" stay static.
  stats: [
    { value: "30", label: "Запуск (дней)" },
    { value: "24/7", label: "AI на связи" },
    { value: "3", label: "Платформы" },
    { value: "25%", label: "Эффект комбо" },
  ],
} as const;
