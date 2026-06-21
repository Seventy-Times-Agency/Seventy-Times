import { u, type CaseItem } from "./types";

export const seventyTimes: CaseItem = {
    id: "seventy-times",
    status: "live",
    region: "usa",
    url: "https://seventy-times.com",
    study: {
      accent: "#818cf8",
      title: u("Seventy Times"),
      tag: u("NEXT.JS · CLAUDE AI"),
      summary: {
        en: "This very site. A multilingual Next.js 15 build with Vanessa — a Claude-powered AI consultant that qualifies and hands off leads — an interactive ROI simulator, and motion throughout.",
        ru: "Этот самый сайт. Многоязычный проект на Next.js 15: Ванесса — ИИ-консультант на базе Claude, которая квалифицирует и передаёт лиды, интерактивный ROI-симулятор и анимации повсюду.",
        de: "Genau diese Website. Ein mehrsprachiges Next.js-15-Projekt mit Vanessa — einer Claude-KI-Beraterin, die Leads qualifiziert und übergibt —, einem interaktiven ROI-Simulator und Animationen überall.",
        uk: "Цей самий сайт. Багатомовний проєкт на Next.js 15: Ванесса — ШІ-консультант на базі Claude, яка кваліфікує та передає ліди, інтерактивний ROI-симулятор та анімації всюди.",
      },
      metrics: [
        {
          en: "4 languages — EN / RU / DE / UA",
          ru: "4 языка — EN / RU / DE / UA",
          de: "4 Sprachen — EN / RU / DE / UA",
          uk: "4 мови — EN / RU / DE / UA",
        },
        {
          en: "Vanessa — AI closer: qualifies & captures leads, 24/7",
          ru: "Ванесса — AI-клоузер: квалифицирует и захватывает лиды, 24/7",
          de: "Vanessa — KI-Closer: qualifiziert & erfasst Leads, 24/7",
          uk: "Ванесса — AI-клоузер: кваліфікує та захоплює ліди, 24/7",
        },
        {
          en: "Interactive ROI simulator",
          ru: "Интерактивный ROI-симулятор",
          de: "Interaktiver ROI-Simulator",
          uk: "Інтерактивний ROI-симулятор",
        },
      ],
      headline: {
        en: "Agency site + AI consultant",
        ru: "Сайт агентства + ИИ-консультант",
        de: "Agentur-Website + KI-Berater",
        uk: "Сайт агенції + ШІ-консультант",
      },
      meta: {
        en: "Full build · Next.js 15 · Claude API · 4 languages · live",
        ru: "Полная разработка · Next.js 15 · Claude API · 4 языка · в проде",
        de: "Komplett-Build · Next.js 15 · Claude API · 4 Sprachen · live",
        uk: "Повна розробка · Next.js 15 · Claude API · 4 мови · у проді",
      },
      niche: {
        en: "Agency · AI · Web dev",
        ru: "Агентство · ИИ · Веб-разработка",
        de: "Agentur · KI · Webentwicklung",
        uk: "Агенція · ШІ · Веброзробка",
      },
      features: [
        {
          icon: "🌐",
          text: {
            en: "Multi-language — EN / RU / DE / UA across the whole site",
            ru: "Мультиязычность — EN / RU / DE / UA по всему сайту",
            de: "Mehrsprachig — EN / RU / DE / UA auf der ganzen Seite",
            uk: "Багатомовність — EN / RU / DE / UA по всьому сайту",
          },
        },
        {
          icon: "🤖",
          text: {
            en: "Vanessa — Claude-powered AI that qualifies, captures & hands off leads, 24/7",
            ru: "Ванесса — ИИ на Claude: квалифицирует, захватывает и передаёт лиды, 24/7",
            de: "Vanessa — Claude-KI: qualifiziert, erfasst und übergibt Leads, 24/7",
            uk: "Ванесса — ШІ на Claude: кваліфікує, захоплює й передає ліди, 24/7",
          },
        },
        {
          icon: "📊",
          text: {
            en: "ROI calculator — interactive growth simulator per pillar",
            ru: "ROI-калькулятор — интерактивный симулятор роста по направлениям",
            de: "ROI-Rechner — interaktiver Wachstumssimulator je Bereich",
            uk: "ROI-калькулятор — інтерактивний симулятор зростання за напрямами",
          },
        },
        {
          icon: "⚡",
          text: {
            en: "Framer Motion animation · SSR · edge functions",
            ru: "Анимации Framer Motion · SSR · edge-функции",
            de: "Framer-Motion-Animationen · SSR · Edge Functions",
            uk: "Анімації Framer Motion · SSR · edge-функції",
          },
        },
        {
          icon: "✉️",
          text: {
            en: "Captured leads fan out to Telegram, Notion & email in real time",
            ru: "Захваченные лиды уходят в Telegram, Notion и на почту в реальном времени",
            de: "Erfasste Leads gehen in Echtzeit an Telegram, Notion und E-Mail",
            uk: "Захоплені ліди йдуть у Telegram, Notion і на пошту в реальному часі",
          },
        },
      ],
      chat: {
        title: {
          en: "AI consultant · live",
          ru: "ИИ-консультант · онлайн",
          de: "KI-Berater · live",
          uk: "ШІ-консультант · онлайн",
        },
        messages: [
          {
            role: "bot",
            text: {
              en: "Hi! I'm Vanessa, the Seventy Times AI consultant. Tell me about your business — I'll help figure out what you actually need.",
              ru: "Привет! Я Ванесса, ИИ-консультант Seventy Times. Расскажите о вашем бизнесе — помогу понять, что вам действительно нужно.",
              de: "Hi! Ich bin Vanessa, die KI-Beraterin von Seventy Times. Erzähl mir von deinem Unternehmen — ich helfe herauszufinden, was du wirklich brauchst.",
              uk: "Привіт! Я Ванесса, ШІ-консультант Seventy Times. Розкажіть про ваш бізнес — допоможу зрозуміти, що вам справді потрібно.",
            },
          },
          {
            role: "user",
            text: {
              en: "We run a roofing company and want more leads from Meta Ads.",
              ru: "У нас кровельная компания, хотим больше лидов из Meta Ads.",
              de: "Wir haben eine Dachdeckerfirma und wollen mehr Leads über Meta Ads.",
              uk: "У нас покрівельна компанія, хочемо більше лідів із Meta Ads.",
            },
          },
          {
            role: "bot",
            text: {
              en: "Got it — roofing is a great fit for Meta lead gen. What's your monthly ad budget? Share a contact and I'll have the team send a tailored plan.",
              ru: "Понятно — кровля отлично подходит для лидогенерации в Meta. Какой у вас месячный рекламный бюджет? Оставьте контакт — и команда пришлёт план под вас.",
              de: "Verstanden — Dachdeckerei eignet sich super für Meta-Leadgen. Wie hoch ist dein monatliches Werbebudget? Hinterlass einen Kontakt, dann schickt dir das Team einen passenden Plan.",
              uk: "Зрозуміло — покрівля чудово підходить для лідогенерації в Meta. Який у вас місячний рекламний бюджет? Залиште контакт — і команда надішле план під вас.",
            },
          },
        ],
      },
      stack: [
        "Next.js 15",
        "TypeScript",
        "Claude API",
        "Framer Motion",
        "CSS Modules",
        "Vercel",
      ],
    },
  };
