import { u, type CaseItem } from "./types";

export const seventyTimes: CaseItem = {
    id: "seventy-times",
    status: "live",
    region: "usa",
    url: "https://seventy-times.com",
    study: {
      accent: "#818cf8",
      title: u("Seventy Times"),
      tag: u("NEXT.JS · AI ASSISTANT"),
      summary: {
        en: "This very site. A multilingual Next.js 15 build with Vanessa — our AI consultant who qualifies and hands off leads — an interactive ROI simulator, and motion throughout.",
        ru: "Этот самый сайт. Многоязычный проект на Next.js 15: Ванесса — наш AI-консультант, которая квалифицирует и передаёт лиды, интерактивный ROI-симулятор и анимации повсюду.",
        uk: "Цей самий сайт. Багатомовний проєкт на Next.js 15: Ванесса — наш AI-консультант, яка кваліфікує та передає ліди, інтерактивний ROI-симулятор та анімації всюди.",
      },
      metrics: [
        {
          en: "4 languages — EN / RU / DE / UA",
          ru: "4 языка — EN / RU / DE / UA",
          uk: "4 мови — EN / RU / DE / UA",
        },
        {
          en: "Vanessa — AI closer: qualifies & captures leads, 24/7",
          ru: "Ванесса — AI-клоузер: квалифицирует и захватывает лиды, 24/7",
          uk: "Ванесса — AI-клоузер: кваліфікує та захоплює ліди, 24/7",
        },
        {
          en: "Interactive ROI simulator",
          ru: "Интерактивный ROI-симулятор",
          uk: "Інтерактивний ROI-симулятор",
        },
      ],
      headline: {
        en: "Agency site + AI consultant",
        ru: "Сайт агентства + ИИ-консультант",
        uk: "Сайт агенції + ШІ-консультант",
      },
      meta: {
        en: "Full build · Next.js 15 · AI assistant · 3 languages · live",
        ru: "Полная разработка · Next.js 15 · AI-ассистент · 3 языка · в проде",
        uk: "Повна розробка · Next.js 15 · AI-асистент · 3 мови · у проді",
      },
      niche: {
        en: "Agency · AI · Web dev",
        ru: "Агентство · ИИ · Веб-разработка",
        uk: "Агенція · ШІ · Веброзробка",
      },
      features: [
        {
          icon: "🌐",
          text: {
            en: "Multi-language — EN / RU / DE / UA across the whole site",
            ru: "Мультиязычность — EN / RU / DE / UA по всему сайту",
            uk: "Багатомовність — EN / RU / DE / UA по всьому сайту",
          },
        },
        {
          icon: "🤖",
          text: {
            en: "Vanessa — our AI consultant: qualifies, captures & hands off leads, 24/7",
            ru: "Ванесса — наш AI-консультант: квалифицирует, захватывает и передаёт лиды, 24/7",
            uk: "Ванесса — наш AI-консультант: кваліфікує, захоплює й передає ліди, 24/7",
          },
        },
        {
          icon: "📊",
          text: {
            en: "ROI calculator — interactive growth simulator per pillar",
            ru: "ROI-калькулятор — интерактивный симулятор роста по направлениям",
            uk: "ROI-калькулятор — інтерактивний симулятор зростання за напрямами",
          },
        },
        {
          icon: "⚡",
          text: {
            en: "Framer Motion animation · SSR · edge functions",
            ru: "Анимации Framer Motion · SSR · edge-функции",
            uk: "Анімації Framer Motion · SSR · edge-функції",
          },
        },
        {
          icon: "✉️",
          text: {
            en: "Captured leads land in the team's Telegram in real time",
            ru: "Захваченные лиды прилетают команде в Telegram в реальном времени",
            uk: "Захоплені ліди прилітають команді в Telegram у реальному часі",
          },
        },
      ],
      chat: {
        title: {
          en: "AI consultant · live",
          ru: "ИИ-консультант · онлайн",
          uk: "ШІ-консультант · онлайн",
        },
        messages: [
          {
            role: "bot",
            text: {
              en: "Hi! I'm Vanessa, the Seventy Times AI consultant. Tell me about your business — I'll help figure out what you actually need.",
              ru: "Привет! Я Ванесса, ИИ-консультант Seventy Times. Расскажите о вашем бизнесе — помогу понять, что вам действительно нужно.",
              uk: "Привіт! Я Ванесса, ШІ-консультант Seventy Times. Розкажіть про ваш бізнес — допоможу зрозуміти, що вам справді потрібно.",
            },
          },
          {
            role: "user",
            text: {
              en: "We run a roofing company and want more leads from Meta Ads.",
              ru: "У нас кровельная компания, хотим больше лидов из Meta Ads.",
              uk: "У нас покрівельна компанія, хочемо більше лідів із Meta Ads.",
            },
          },
          {
            role: "bot",
            text: {
              en: "Got it — roofing is a great fit for Meta lead gen. What's your monthly ad budget? Share a contact and I'll have the team send a tailored plan.",
              ru: "Понятно — кровля отлично подходит для лидогенерации в Meta. Какой у вас месячный рекламный бюджет? Оставьте контакт — и команда пришлёт план под вас.",
              uk: "Зрозуміло — покрівля чудово підходить для лідогенерації в Meta. Який у вас місячний рекламний бюджет? Залиште контакт — і команда надішле план під вас.",
            },
          },
        ],
      },
      stack: [
        "Next.js 15",
        "TypeScript",
        "AI API",
        "Framer Motion",
        "CSS Modules",
        "Vercel",
      ],
    },
  };
