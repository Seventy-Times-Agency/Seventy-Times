import type { Locale } from "@/i18n/config";

type LocaleMeta = {
  description: string;
  keywords: string[];
  ogLocale: string;
};

const META: Record<Locale, LocaleMeta> = {
  en: {
    description:
      "Seventy Times turns AI and performance marketing into a predictable stream of qualified clients — ads, automation, and smart bots built around your growth.",
    keywords: [
      "Seventy Times",
      "AI marketing agency",
      "performance marketing",
      "marketing automation",
      "AI chatbot",
      "digital marketing",
      "targeted advertising",
      "Meta ads",
      "Google ads",
      "Claude AI",
    ],
    ogLocale: "en_US",
  },
  ru: {
    description:
      "Seventy Times превращает AI и digital-маркетинг в предсказуемый поток квалифицированных клиентов: реклама, автоматизация и умные боты — всё работает на одну метрику: ваш рост.",
    keywords: [
      "Seventy Times",
      "AI агентство",
      "маркетинговое агентство",
      "таргетированная реклама",
      "автоматизация бизнеса",
      "AI-бот",
      "чат-бот",
      "performance маркетинг",
      "Meta реклама",
      "Google реклама",
      "Claude",
    ],
    ogLocale: "ru_RU",
  },
  de: {
    description:
      "Seventy Times verwandelt KI und Performance-Marketing in einen planbaren Strom qualifizierter Kunden — Werbung, Automatisierung und smarte Bots, ausgerichtet auf Ihr Wachstum.",
    keywords: [
      "Seventy Times",
      "KI-Marketing-Agentur",
      "Performance Marketing",
      "Marketing-Automatisierung",
      "KI-Chatbot",
      "Digital Marketing",
      "Zielgerichtete Werbung",
      "Meta Ads",
      "Google Ads",
      "Claude KI",
    ],
    ogLocale: "de_DE",
  },
};

export function getLocaleMeta(locale: Locale): LocaleMeta {
  return META[locale] ?? META.en;
}
