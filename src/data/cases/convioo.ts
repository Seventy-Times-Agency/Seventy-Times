import { u, type CaseItem } from "./types";

export const convioo: CaseItem = {
    id: "convioo",
    status: "progress",
    region: "usa",
    url: "https://convioo.com",
    study: {
      accent: "#6366F1",
      title: u("Convioo"),
      tag: u("AI LEAD-GEN · CRM"),
      summary: {
        en: "Our own B2B lead-gen platform with a lightweight CRM, built for marketing agencies. A Next.js app over a Python backend: search via Google Places, deep enrichment, AI scoring and outreach drafts, and Henry — a built-in AI assistant.",
        ru: "Наш собственный продукт — B2B-платформа лидогенерации с лёгкой CRM для маркетинговых агентств. Веб-аппа на Next.js поверх Python-бэкенда: поиск через Google Places, глубокий enrichment, AI-скоринг и черновики outreach, и Henry — встроенный AI-ассистент.",
        uk: "Наш власний продукт — B2B-платформа лідогенерації з легкою CRM для маркетингових агенцій. Вебзастосунок на Next.js поверх Python-бекенду: пошук через Google Places, глибокий enrichment, AI-скоринг і чернетки outreach, та Henry — вбудований AI-асистент.",
      },
      metrics: [
        {
          en: "AI scoring + outreach drafts",
          ru: "AI-скоринг + черновики outreach",
          uk: "AI-скоринг + чернетки outreach",
        },
        {
          en: "Google Places search + deep enrichment",
          ru: "Поиск Google Places + глубокий enrichment",
          uk: "Пошук Google Places + глибокий enrichment",
        },
        {
          en: "Full CRM + Henry AI assistant",
          ru: "Полноценная CRM + AI-ассистент Henry",
          uk: "Повноцінна CRM + AI-асистент Henry",
        },
      ],
      headline: {
        en: "AI lead-gen + CRM platform",
        ru: "Платформа AI-лидогена + CRM",
        uk: "Платформа AI-лідогена + CRM",
      },
      meta: {
        en: "Our product · Next.js + Python · Google Places · AI",
        ru: "Наш продукт · Next.js + Python · Google Places · AI",
        uk: "Наш продукт · Next.js + Python · Google Places · AI",
      },
      niche: {
        en: "SaaS · AI · B2B lead-gen",
        ru: "SaaS · ИИ · B2B-лидоген",
        uk: "SaaS · ШІ · B2B-лідоген",
      },
      stats: [
        {
          value: "≤50",
          label: {
            en: "Leads enriched / search",
            ru: "Лидов с enrichment / поиск",
            uk: "Лідів з enrichment / пошук",
          },
        },
        {
          value: "AI",
          label: {
            en: "AI scoring engine",
            ru: "Движок AI-скоринга",
            uk: "Рушій AI-скорингу",
          },
        },
        {
          value: "Henry",
          label: {
            en: "Built-in AI assistant",
            ru: "Встроенный AI-ассистент",
            uk: "Вбудований AI-асистент",
          },
        },
        {
          value: "CSV · XLSX",
          label: {
            en: "Data export",
            ru: "Экспорт данных",
            uk: "Експорт даних",
          },
        },
      ],
      features: [
        {
          icon: "🔎",
          text: {
            en: "B2B lead search — niche + region, sourced from Google Places",
            ru: "Поиск B2B-лидов — ниша + регион, выдача из Google Places",
            uk: "Пошук B2B-лідів — ніша + регіон, видача з Google Places",
          },
        },
        {
          icon: "🧠",
          text: {
            en: "Deep enrichment of up to 50 leads — website, socials, reviews, decision-maker",
            ru: "Глубокий enrichment до 50 лидов — сайт, соцсети, отзывы, decision-maker",
            uk: "Глибокий enrichment до 50 лідів — сайт, соцмережі, відгуки, decision-maker",
          },
        },
        {
          icon: "⭐",
          text: {
            en: "AI scoring and outreach drafts built in",
            ru: "AI-скоринг и черновики outreach из коробки",
            uk: "AI-скоринг і чернетки outreach з коробки",
          },
        },
        {
          icon: "🤖",
          text: {
            en: "Henry — built-in AI assistant: chat, weekly check-in, per-lead research",
            ru: "Henry — встроенный AI-ассистент: чат, еженедельный check-in, ресёрч по лиду",
            uk: "Henry — вбудований AI-асистент: чат, щотижневий check-in, ресерч за лідом",
          },
        },
        {
          icon: "🗂️",
          text: {
            en: "Full CRM — statuses, notes, custom fields, tasks, activity timeline",
            ru: "Полноценная CRM — статусы, заметки, кастом-поля, задачи, активити-таймлайн",
            uk: "Повноцінна CRM — статуси, нотатки, кастом-поля, задачі, активіті-таймлайн",
          },
        },
        {
          icon: "📤",
          text: {
            en: "Excel + CSV export of a session or the whole CRM",
            ru: "Excel + CSV экспорт сессии или всей CRM",
            uk: "Excel + CSV експорт сесії або всієї CRM",
          },
        },
      ],
      chat: {
        title: {
          en: "Henry · AI assistant",
          ru: "Henry · AI-ассистент",
          uk: "Henry · AI-асистент",
        },
        messages: [
          {
            role: "bot",
            text: {
              en: "Hi, I'm Henry. Tell me the niche and region you're targeting and I'll pull a first batch of leads.",
              ru: "Привет, я Henry. Назови нишу и регион — соберу первую партию лидов.",
              uk: "Привіт, я Henry. Назви нішу й регіон — зберу першу партію лідів.",
            },
          },
          {
            role: "user",
            text: {
              en: "Dental clinics in Austin, TX.",
              ru: "Стоматологии в Остине, Техас.",
              uk: "Стоматології в Остіні, Техас.",
            },
          },
          {
            role: "bot",
            text: {
              en: "On it — searching Google Places, then enriching and scoring the top 50 by fit. Want outreach drafts for the hottest ones?",
              ru: "Уже ищу через Google Places, потом обогащу и оценю топ-50 по релевантности. Сделать черновики outreach для самых горячих?",
              uk: "Уже шукаю через Google Places, потім збагачу й оціню топ-50 за релевантністю. Зробити чернетки outreach для найгарячіших?",
            },
          },
        ],
      },
      sections: [
        {
          heading: {
            en: "Teams & data",
            ru: "Команды и данные",
            uk: "Команди та дані",
          },
          items: [
            {
              en: "Teams with email-verified invitations (Resend)",
              ru: "Команды с приглашениями и верификацией по email (Resend)",
              uk: "Команди із запрошеннями та верифікацією по email (Resend)",
            },
            {
              en: "GDPR data export",
              ru: "GDPR-экспорт данных",
              uk: "GDPR-експорт даних",
            },
            {
              en: "Audit log of actions",
              ru: "Audit log действий",
              uk: "Audit log дій",
            },
          ],
        },
        {
          heading: {
            en: "Engineering & reliability",
            ru: "Инженерия и надёжность",
            uk: "Інженерія та надійність",
          },
          items: [
            {
              en: "Next.js frontend over a FastAPI Python backend",
              ru: "Фронтенд на Next.js поверх Python-бэкенда FastAPI",
              uk: "Фронтенд на Next.js поверх Python-бекенду FastAPI",
            },
            {
              en: "PostgreSQL with Alembic migrations",
              ru: "PostgreSQL с миграциями Alembic",
              uk: "PostgreSQL з міграціями Alembic",
            },
            {
              en: "Background searches via Redis + arq worker",
              ru: "Фоновые поиски через Redis + воркер arq",
              uk: "Фонові пошуки через Redis + воркер arq",
            },
            {
              en: "Startup-recovery — a stuck search is auto-marked failed",
              ru: "Startup-recovery — зависший поиск авто-помечается как failed",
              uk: "Startup-recovery — завислий пошук авто-позначається як failed",
            },
            {
              en: "CI on every push — postgres, migrations, ruff lint, pytest",
              ru: "CI на каждый push — postgres, миграции, линт ruff, pytest",
              uk: "CI на кожен push — postgres, міграції, лінт ruff, pytest",
            },
          ],
        },
      ],
      insight: {
        en: "Convioo is our own product — we build it, run it, and use it to source leads ourselves. Currently in active development.",
        ru: "Convioo — наш собственный продукт: мы его делаем, держим в проде и сами используем для поиска лидов. Сейчас в активной разработке.",
        uk: "Convioo — наш власний продукт: ми його робимо, тримаємо в проді й самі використовуємо для пошуку лідів. Зараз в активній розробці.",
      },
      stack: [
        "Next.js",
        "Python / FastAPI",
        "PostgreSQL",
        "LLM API",
        "Google Places API",
        "Redis / arq",
        "Resend",
        "Railway",
        "Vercel",
      ],
    },
  };
