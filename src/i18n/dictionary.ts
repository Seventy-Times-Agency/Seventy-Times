import type { Locale } from "./config";

const dict = {
  ru: {
    // Nav
    navServices: "Услуги",
    navProcess: "Процесс",
    navVenesa: "Венеса",
    navFaq: "FAQ",
    navStatus: "Принимаем проекты",
    navCta: "Заявка",

    // Hero meta
    heroMeta1: "Реклама · Автоматизация · AI",
    heroMeta2: "Принимаем проекты · 2026",
    heroMeta3: "США → Весь мир",
    heroTitle1: "Автоматизируем",
    heroTitle2: "рост",
    heroTitle3: "вашего",
    heroTitle4: "бизнеса.",
    heroSub:
      "IAA agency — команда, которая превращает AI и digital-маркетинг в предсказуемый поток клиентов. Реклама, автоматизация и умные боты, настроенные под один KPI — ваш рост.",
    heroCta1: "Оставить заявку",
    heroCta2: "Поговорить с Венесой",
    heroHint: "Ответ за 10 секунд · Без обязательств",
    statClients: "Клиентов",
    statSupport: "AI-поддержка",
    statGrowth: "Рост конверсий",
    statNext: "Следующий виток",

    // Services
    svcEyebrow: "— Услуги / 2026",
    svcTitle1: "Что",
    svcTitle2: "мы",
    svcTitle3: "делаем",
    svcLead:
      "Три направления, которые вместе работают как одна машина роста. Нажмите на карточку, чтобы увидеть детали.",
    svcIncludes: "Что входит",
    svcAddons: "+ Можно добавить",
    svcExpand: "Подробнее",
    svcCollapse: "Свернуть",
    svc1Title: "Таргетированная реклама",
    svc1Tag: "Реклама, которая приводит реальных клиентов",
    svc1Note: "Рекламный бюджет оплачивается отдельно",
    svc1Inc: [
      "Настройка рекламного кабинета с нуля",
      "Ведение рекламы на Meta, Google и TikTok",
      "Креативы — баннеры и тексты объявлений",
      "Настройка аудиторий и таргетинга",
      "Постоянная оптимизация кампаний",
    ],
    svc1Add: [
      "AI-генерация рекламных материалов",
      "A/B тестирование объявлений",
      "Ретаргетинг — возвращаем тех, кто уже интересовался",
      "Landing page под рекламную кампанию",
      "Управление рекламным бюджетом",
    ],
    svc2Title: "Автоматизация",
    svc2Tag: "Убираем рутину — бизнес работает сам",
    svc2Note: null as string | null,
    svc2Inc: [
      "Аудит процессов: находим где теряется время и деньги",
      "Автоматизация одного ключевого процесса",
      "Например: заявка → уведомление → таблица → ответ клиенту",
    ],
    svc2Add: [
      "Автоматизация дополнительных процессов",
      "Интеграция между платформами и сервисами",
      "Авто-отчёты и аналитика",
      "Автоматическое выставление счетов",
      "Интеграция с CRM-системой",
      "Поддержка и обновления после запуска",
    ],
    svc3Title: "AI-Бот",
    svc3Tag: "Умный помощник, который работает за тебя 24/7",
    svc3Note: null as string | null,
    svc3Inc: [
      "Бот на любой платформе: Telegram, Instagram, Facebook или сайт",
      "AI-консультант, обученный под твой бизнес и бренд",
      "Автоматический сбор контактов в Google Sheets или другие программы",
      "Поддержка любого языка",
    ],
    svc3Add: [
      "Онлайн-запись и бронирование",
      "Автоматические напоминания клиентам",
      "Генерация изображений прямо в боте",
      "Реакция на комментарии и сторис",
      "Интеграция с CRM-системой",
      "Воронка продаж",
      "Поддержка и обновления после запуска",
    ],

    // Process
    procEyebrow: "— Как мы работаем",
    procTitle1: "Как",
    procTitle2: "мы",
    procTitle3: "работаем",
    procLead:
      "Простой и прозрачный процесс. От первого звонка до первых лидов — обычно 2–3 недели. Без бюрократии, с понятными KPI.",
    proc1: "Брифинг",
    proc1d:
      "Изучаем бизнес, цели, аудиторию и текущие воронки. Находим точки, где теряются деньги и где скрыт рост.",
    proc1t: "1–2 дня",
    proc2: "Стратегия",
    proc2d:
      "Предлагаем план: каналы, офферы, KPI, бюджет. Согласовываем что запускаем, к какому сроку и по каким цифрам оцениваем.",
    proc2t: "3–5 дней",
    proc3: "Запуск",
    proc3d:
      "Настраиваем кабинеты, пишем тексты, создаём креативы, поднимаем автоматизации и запускаем первые тесты. Подключаем аналитику.",
    proc3t: "1–2 недели",
    proc4: "Оптимизация",
    proc4d:
      "Смотрим цифры еженедельно. Режем неэффективное, масштабируем что работает. Отчёты по понедельникам, доступ к дашборду — всегда.",
    proc4t: "Постоянно",

    // Venesa promo
    venEyebrow: "— Знакомьтесь / Венеса",
    venTitle1: "Ваш",
    venTitle2: "AI-консультант",
    venTitle3: "Венеса.",
    venLead:
      "Венеса — AI-ассистент на базе Claude, обученный под ваш бизнес. Она общается с клиентами на сайте, в Telegram и Instagram, квалифицирует лиды и передаёт горячих вам напрямую. Такого же бота мы создаём под каждый проект.",
    venBullets: [
      "Обучена на материалах и тон-оф-войсе вашего бренда",
      "Отвечает на любом языке, работает 24/7",
      "Собирает заявки прямо в CRM или Telegram",
      "Вы контролируете что она знает и как общается",
    ],
    venCta: "Написать Венесе",
    venBadgeLabel: "AI Agent",
    venBadgeName: "Венеса",
    venBadgeRole: "AI-консультант · Онлайн",

    // Testimonials
    testEyebrow: "— Отзывы / Клиенты",
    testTitle1: "Что",
    testTitle2: "говорят",
    testTitle3: "клиенты",
    testLead:
      "Команды из США и Европы, с которыми мы запускали проекты в последние месяцы.",
    testReviewBtn: "Оставить отзыв",
    testPrev: "Предыдущий отзыв",
    testNext: "Следующий отзыв",

    // FAQ
    faqEyebrow: "— Частые вопросы",
    faqTitle1: "Частые",
    faqTitle2: "вопросы",
    faqLead:
      "Самое частое, что спрашивают перед стартом. Если не нашли свой вопрос — напишите напрямую, ответим в течение часа.",
    faqNote: "Нужен ответ быстрее?",
    faqNoteLink: "Напишите в Telegram →",
    faq1q: "Сколько стоят ваши услуги?",
    faq1a:
      "Мы не называем цены заранее — обсуждаем их после брифинга, чтобы предложить вилку под конкретную задачу. Обычно наши клиенты стартуют с пакета от $1000 в месяц, но точная цифра зависит от масштаба и целей.",
    faq2q: "Когда будут первые результаты?",
    faq2a:
      "По таргету — первые лиды обычно приходят в течение 3–7 дней после запуска. По автоматизации — сразу после внедрения. По AI-ботам — в день запуска. Стабильная динамика в рекламе формируется к концу первого месяца после оптимизации.",
    faq3q: "Работаете ли с моей нишей?",
    faq3a:
      "За последние годы мы запускали проекты в e-commerce, образовании, недвижимости, медицине, услугах и SaaS. Если вашей ниши нет в списке — всё равно пишите, скорее всего у нас есть релевантный опыт.",
    faq4q: "Что если реклама не сработает?",
    faq4a:
      "Мы не даём гарантий «100% лидов за неделю» — это были бы пустые обещания. Но мы работаем по прозрачным KPI, еженедельно показываем цифры, и если кампания не заходит — меняем подход быстро, а не жжём бюджет месяцами.",
    faq5q: "Нужен ли у меня свой маркетолог?",
    faq5a:
      "Нет. Мы берём на себя всю операционку — от создания креативов до отчётов. Ваша задача — давать обратную связь по лидам и согласовывать ключевые решения.",
    faq6q: "Как проходит общение?",
    faq6a:
      "Создаём общий Telegram-чат, еженедельные отчёты по понедельникам, срочные вопросы — в течение часа в рабочее время. Раз в месяц — созвон со стратегией на следующий период.",
    faq7q: "Можно начать только с одной услуги?",
    faq7a:
      "Да. Многие клиенты стартуют только с таргета или только с AI-бота, а остальное подключают через 1–2 месяца, когда видят первые результаты. Мы не навязываем пакеты.",
    faq8q: "Вы подписываете NDA?",
    faq8a:
      "Да, если есть такая необходимость — подписываем NDA до начала работы. Вся информация о проекте остаётся конфиденциальной.",

    // CTA
    ctaEyebrow: "— Связаться",
    ctaEnd: "IAA / 2026 →",
    ctaTitle1: "Готовы",
    ctaTitle2: "к росту",
    ctaTitle3: "?",
    ctaSub:
      "Напишите в Telegram или на почту — обсудим задачу, расскажем как можем помочь, и в течение часа дадим первые идеи. Без обязательств, без воды.",
    ctaPrimary: "Оставить заявку",
    ctaTelegram: "Telegram",
    ctaMeta1: "IAA agency · Реклама × Автоматизация × AI",
    ctaMeta2: "Принимаем проекты · США → Весь мир",

    // Footer
    ftServices: "Услуги",
    ftAds: "Ads / Таргет",
    ftAutomation: "Automation",
    ftBots: "AI-боты",
    ftVenesa: "Венеса",
    ftProcess: "Процесс",
    ftFaq: "FAQ",
    ftContacts: "Контакты",
    ftCompany: "Компания",
    ftAbout: "О нас",
    ftCollab: "Сотрудничество",
    ftAccepting: "Принимаем проекты",
    ftLocation: "США → Весь мир",
    ftRights: "Все права защищены",
    ftUp: "Наверх ↑",
    ftContact: "Связаться",

    // Dividers
    divNext: "— дальше",
    divMeet: "— знакомьтесь",
    divProof: "— отзывы",
    divQuestions: "— вопросы",
    divTalk: "— связаться",

    // Intro
    introTag1: "Реклама",
    introTag2: "Автоматизация",
    introTag3: "AI",
    introLocation: "США → Весь мир",
    introLoading: "Загружаем…",

    // Lead form
    leadEyebrow: "— Оставить заявку",
    leadTitle: "Расскажи о",
    leadTitleAccent: "задаче",
    leadSub: "Ответим в течение часа в рабочее время. Все поля обязательны.",
    leadName: "Имя",
    leadNamePh: "Как к вам обращаться",
    leadContact: "Контакт",
    leadContactPh: "@username в Telegram или email",
    leadBusiness: "Ваш бизнес",
    leadBusinessPh: "Название, сайт, чем занимаетесь",
    leadTask: "Задача",
    leadTaskPh:
      "Что нужно: реклама, автоматизация, AI-бот, или что-то другое. Чем подробнее — тем точнее ответим.",
    leadSubmit: "Отправить заявку",
    leadSubmitting: "Отправляем…",
    leadConsent:
      "Нажимая «Отправить», вы соглашаетесь на обработку контактных данных для обратной связи.",
    leadSuccessTitle: "Заявка отправлена",
    leadSuccessText:
      "Спасибо! Мы получили твою заявку и ответим в течение часа в рабочее время. До связи 👋",
    leadClose: "Закрыть",
    leadFillAll: "Пожалуйста, заполни все поля",

    // Chat widget
    chatGreeting:
      "Привет 👋 Меня зовут Венеса, я AI-консультант IAA agency.\n\nРасскажи немного о своём бизнесе — подберу решение под твои задачи.",
    chatName: "Венеса · AI-консультант",
    chatStatus: "Онлайн",
    chatPh: "Напишите сообщение...",
    chatLabel: "Венеса",
    chatError: "Ошибка соединения. Попробуй чуть позже.",
    chatFallback: "Что-то пошло не так. Попробуй снова.",
  },

  en: {
    // Nav
    navServices: "Services",
    navProcess: "Process",
    navVenesa: "Venesa",
    navFaq: "FAQ",
    navStatus: "Accepting projects",
    navCta: "Get started",

    // Hero meta
    heroMeta1: "Ads · Automation · AI",
    heroMeta2: "Accepting projects · 2026",
    heroMeta3: "USA → Worldwide",
    heroTitle1: "We automate",
    heroTitle2: "your",
    heroTitle3: "business",
    heroTitle4: "growth.",
    heroSub:
      "IAA agency — a team that turns AI and digital marketing into a predictable flow of clients. Ads, automation, and smart bots tuned to one KPI — your growth.",
    heroCta1: "Get a quote",
    heroCta2: "Talk to Venesa",
    heroHint: "Reply in 10 seconds · No obligations",
    statClients: "Clients",
    statSupport: "AI support",
    statGrowth: "Conversion growth",
    statNext: "Next milestone",

    // Services
    svcEyebrow: "— Services / 2026",
    svcTitle1: "What",
    svcTitle2: "we",
    svcTitle3: "do",
    svcLead:
      "Three pillars that work as a single growth engine. Click a card to see the details.",
    svcIncludes: "Included",
    svcAddons: "+ Optional add-ons",
    svcExpand: "Details",
    svcCollapse: "Collapse",
    svc1Title: "Targeted advertising",
    svc1Tag: "Ads that bring real customers",
    svc1Note: "Ad budget is billed separately",
    svc1Inc: [
      "Ad account setup from scratch",
      "Campaign management on Meta, Google & TikTok",
      "Creatives — banners and ad copy",
      "Audience and targeting setup",
      "Ongoing campaign optimization",
    ],
    svc1Add: [
      "AI-generated ad creatives",
      "A/B testing",
      "Retargeting — bring back warm leads",
      "Landing page for ad campaigns",
      "Ad budget management",
    ],
    svc2Title: "Automation",
    svc2Tag: "We eliminate the routine — your business runs itself",
    svc2Note: null as string | null,
    svc2Inc: [
      "Process audit: find where time and money leak",
      "Automation of one key process",
      "Example: lead → notification → spreadsheet → client reply",
    ],
    svc2Add: [
      "Automation of additional processes",
      "Cross-platform integrations",
      "Automated reports and analytics",
      "Automated invoicing",
      "CRM integration",
      "Post-launch support and updates",
    ],
    svc3Title: "AI Bot",
    svc3Tag: "A smart assistant that works for you 24/7",
    svc3Note: null as string | null,
    svc3Inc: [
      "Bot on any platform: Telegram, Instagram, Facebook or website",
      "AI consultant trained for your brand and business",
      "Automated lead capture into Google Sheets or other tools",
      "Multi-language support",
    ],
    svc3Add: [
      "Online booking and scheduling",
      "Automated client reminders",
      "Image generation inside the bot",
      "Comment and story reactions",
      "CRM integration",
      "Sales funnel",
      "Post-launch support and updates",
    ],

    // Process
    procEyebrow: "— How we work",
    procTitle1: "How",
    procTitle2: "we",
    procTitle3: "work",
    procLead:
      "Simple and transparent. From the first call to first leads — usually 2–3 weeks. No bureaucracy, clear KPIs.",
    proc1: "Briefing",
    proc1d:
      "We study your business, goals, audience and current funnels. We find where money is leaking and where growth is hiding.",
    proc1t: "1–2 days",
    proc2: "Strategy",
    proc2d:
      "We propose a plan: channels, offers, KPIs, budget. We align on what to launch, by when, and how to measure.",
    proc2t: "3–5 days",
    proc3: "Launch",
    proc3d:
      "We set up accounts, write copy, create visuals, build automations and run the first tests. Analytics connected.",
    proc3t: "1–2 weeks",
    proc4: "Optimization",
    proc4d:
      "We review numbers weekly. Cut what doesn't work, scale what does. Monday reports, dashboard access — always.",
    proc4t: "Ongoing",

    // Venesa promo
    venEyebrow: "— Meet Venesa",
    venTitle1: "Your",
    venTitle2: "AI consultant",
    venTitle3: "Venesa.",
    venLead:
      "Venesa is a Claude-powered AI assistant trained for your business. She talks to clients on your website, Telegram and Instagram, qualifies leads and passes hot ones directly to you. We build the same bot for every project.",
    venBullets: [
      "Trained on your brand's materials and tone of voice",
      "Responds in any language, works 24/7",
      "Captures leads straight into CRM or Telegram",
      "You control what she knows and how she talks",
    ],
    venCta: "Talk to Venesa",
    venBadgeLabel: "AI Agent",
    venBadgeName: "Venesa",
    venBadgeRole: "AI consultant · Online",

    // Testimonials
    testEyebrow: "— Testimonials / Clients",
    testTitle1: "What",
    testTitle2: "clients",
    testTitle3: "say",
    testLead:
      "Teams from the US and Europe we've launched projects with in recent months.",
    testReviewBtn: "Leave a review",
    testPrev: "Previous review",
    testNext: "Next review",

    // FAQ
    faqEyebrow: "— Frequently asked questions",
    faqTitle1: "Common",
    faqTitle2: "questions",
    faqLead:
      "The most common things people ask before getting started. Didn't find your answer? Reach out — we reply within an hour.",
    faqNote: "Need a faster answer?",
    faqNoteLink: "Message us on Telegram →",
    faq1q: "How much do your services cost?",
    faq1a:
      "We don't quote prices upfront — we discuss them after the briefing to offer a range tailored to your specific task. Most clients start from around $1,000/month, but the exact figure depends on scope and goals.",
    faq2q: "When will I see results?",
    faq2a:
      "For ads — first leads usually come within 3–7 days after launch. For automation — immediately after implementation. For AI bots — on launch day. Stable ad performance forms by the end of the first month after optimization.",
    faq3q: "Do you work with my industry?",
    faq3a:
      "Over the past years we've launched projects in e-commerce, education, real estate, healthcare, services and SaaS. If your niche isn't listed — reach out anyway, we likely have relevant experience.",
    faq4q: "What if the ads don't work?",
    faq4a:
      "We don't promise '100% leads in a week' — that would be empty words. But we work on transparent KPIs, show numbers weekly, and if a campaign isn't performing — we pivot quickly instead of burning budget for months.",
    faq5q: "Do I need my own marketer?",
    faq5a:
      "No. We handle all operations — from creating ads to reporting. Your job is to give feedback on leads and approve key decisions.",
    faq6q: "How does communication work?",
    faq6a:
      "We create a shared Telegram chat, send weekly reports on Mondays, and respond to urgent questions within an hour during business hours. Once a month — a strategy call for the next period.",
    faq7q: "Can I start with just one service?",
    faq7a:
      "Yes. Many clients start with ads only or just an AI bot, then add more 1–2 months later once they see results. We don't push bundles.",
    faq8q: "Do you sign NDAs?",
    faq8a:
      "Yes, if needed — we sign an NDA before starting work. All project information remains confidential.",

    // CTA
    ctaEyebrow: "— Get in touch",
    ctaEnd: "IAA / 2026 →",
    ctaTitle1: "Ready",
    ctaTitle2: "to grow",
    ctaTitle3: "?",
    ctaSub:
      "Write us on Telegram or email — we'll discuss your task, explain how we can help, and share first ideas within an hour. No obligations, no fluff.",
    ctaPrimary: "Get a quote",
    ctaTelegram: "Telegram",
    ctaMeta1: "IAA agency · Ads × Automation × AI",
    ctaMeta2: "Accepting projects · USA → Worldwide",

    // Footer
    ftServices: "Services",
    ftAds: "Ads / Targeting",
    ftAutomation: "Automation",
    ftBots: "AI bots",
    ftVenesa: "Venesa",
    ftProcess: "Process",
    ftFaq: "FAQ",
    ftContacts: "Contacts",
    ftCompany: "Company",
    ftAbout: "About us",
    ftCollab: "Partnerships",
    ftAccepting: "Accepting projects",
    ftLocation: "USA → Worldwide",
    ftRights: "All rights reserved",
    ftUp: "Back to top ↑",
    ftContact: "Contact",

    // Dividers
    divNext: "— next",
    divMeet: "— meet venesa",
    divProof: "— testimonials",
    divQuestions: "— questions",
    divTalk: "— get in touch",

    // Intro
    introTag1: "Ads",
    introTag2: "Automation",
    introTag3: "AI",
    introLocation: "USA → Worldwide",
    introLoading: "Loading…",

    // Lead form
    leadEyebrow: "— Get a quote",
    leadTitle: "Tell us about",
    leadTitleAccent: "your task",
    leadSub: "We'll reply within an hour during business hours. All fields required.",
    leadName: "Name",
    leadNamePh: "What should we call you",
    leadContact: "Contact",
    leadContactPh: "@username on Telegram or email",
    leadBusiness: "Your business",
    leadBusinessPh: "Company name, website, what you do",
    leadTask: "Task",
    leadTaskPh:
      "What you need: ads, automation, AI bot, or something else. The more detail — the more accurate our reply.",
    leadSubmit: "Submit request",
    leadSubmitting: "Sending…",
    leadConsent:
      "By clicking \"Submit\" you agree to have your contact data processed for follow-up.",
    leadSuccessTitle: "Request submitted",
    leadSuccessText:
      "Thank you! We've received your request and will reply within an hour during business hours. Talk soon 👋",
    leadClose: "Close",
    leadFillAll: "Please fill in all fields",

    // Chat widget
    chatGreeting:
      "Hi 👋 My name is Venesa, I'm the AI consultant at IAA agency.\n\nTell me a bit about your business — I'll suggest the right solution for your goals.",
    chatName: "Venesa · AI consultant",
    chatStatus: "Online",
    chatPh: "Type a message...",
    chatLabel: "Venesa",
    chatError: "Connection error. Please try again later.",
    chatFallback: "Something went wrong. Please try again.",
  },

  de: {
    // Nav
    navServices: "Leistungen",
    navProcess: "Prozess",
    navVenesa: "Venesa",
    navFaq: "FAQ",
    navStatus: "Projekte willkommen",
    navCta: "Anfrage",

    // Hero meta
    heroMeta1: "Werbung · Automatisierung · KI",
    heroMeta2: "Projekte willkommen · 2026",
    heroMeta3: "USA → Weltweit",
    heroTitle1: "Wir automatisieren",
    heroTitle2: "das Wachstum",
    heroTitle3: "Ihres",
    heroTitle4: "Unternehmens.",
    heroSub:
      "IAA agency — ein Team, das KI und digitales Marketing in einen planbaren Kundenfluss verwandelt. Werbung, Automatisierung und smarte Bots, ausgerichtet auf ein KPI — Ihr Wachstum.",
    heroCta1: "Anfrage senden",
    heroCta2: "Mit Venesa sprechen",
    heroHint: "Antwort in 10 Sekunden · Unverbindlich",
    statClients: "Kunden",
    statSupport: "KI-Support",
    statGrowth: "Conversion-Wachstum",
    statNext: "Nächster Meilenstein",

    // Services
    svcEyebrow: "— Leistungen / 2026",
    svcTitle1: "Was",
    svcTitle2: "wir",
    svcTitle3: "tun",
    svcLead:
      "Drei Säulen, die als ein einziger Wachstumsmotor funktionieren. Klicken Sie auf eine Karte für Details.",
    svcIncludes: "Inklusive",
    svcAddons: "+ Optionale Extras",
    svcExpand: "Details",
    svcCollapse: "Einklappen",
    svc1Title: "Zielgerichtete Werbung",
    svc1Tag: "Werbung, die echte Kunden bringt",
    svc1Note: "Werbebudget wird separat abgerechnet",
    svc1Inc: [
      "Einrichtung des Werbekontos von Grund auf",
      "Kampagnenmanagement auf Meta, Google & TikTok",
      "Kreativmaterial — Banner und Anzeigentexte",
      "Zielgruppen- und Targeting-Einrichtung",
      "Laufende Kampagnenoptimierung",
    ],
    svc1Add: [
      "KI-generierte Werbematerialien",
      "A/B-Tests",
      "Retargeting — warme Leads zurückholen",
      "Landingpage für Werbekampagnen",
      "Verwaltung des Werbebudgets",
    ],
    svc2Title: "Automatisierung",
    svc2Tag: "Wir eliminieren Routine — Ihr Geschäft läuft von selbst",
    svc2Note: null as string | null,
    svc2Inc: [
      "Prozessaudit: Finden wo Zeit und Geld verloren gehen",
      "Automatisierung eines Schlüsselprozesses",
      "Beispiel: Lead → Benachrichtigung → Tabelle → Kundenantwort",
    ],
    svc2Add: [
      "Automatisierung weiterer Prozesse",
      "Plattformübergreifende Integrationen",
      "Automatisierte Berichte und Analysen",
      "Automatische Rechnungsstellung",
      "CRM-Integration",
      "Support und Updates nach dem Launch",
    ],
    svc3Title: "KI-Bot",
    svc3Tag: "Ein smarter Assistent, der 24/7 für Sie arbeitet",
    svc3Note: null as string | null,
    svc3Inc: [
      "Bot auf jeder Plattform: Telegram, Instagram, Facebook oder Website",
      "KI-Berater, trainiert für Ihre Marke und Ihr Geschäft",
      "Automatische Lead-Erfassung in Google Sheets oder andere Tools",
      "Mehrsprachiger Support",
    ],
    svc3Add: [
      "Online-Buchung und Terminplanung",
      "Automatische Kundenerinnerungen",
      "Bildgenerierung im Bot",
      "Reaktion auf Kommentare und Stories",
      "CRM-Integration",
      "Verkaufstrichter",
      "Support und Updates nach dem Launch",
    ],

    // Process
    procEyebrow: "— So arbeiten wir",
    procTitle1: "So",
    procTitle2: "arbeiten",
    procTitle3: "wir",
    procLead:
      "Einfach und transparent. Vom ersten Gespräch bis zu ersten Leads — in der Regel 2–3 Wochen. Keine Bürokratie, klare KPIs.",
    proc1: "Briefing",
    proc1d:
      "Wir analysieren Ihr Geschäft, Ziele, Zielgruppe und bestehende Trichter. Wir finden wo Geld verloren geht und wo Wachstum versteckt ist.",
    proc1t: "1–2 Tage",
    proc2: "Strategie",
    proc2d:
      "Wir schlagen einen Plan vor: Kanäle, Angebote, KPIs, Budget. Wir stimmen ab was wann gestartet und wie gemessen wird.",
    proc2t: "3–5 Tage",
    proc3: "Launch",
    proc3d:
      "Wir richten Konten ein, schreiben Texte, erstellen Visuals, bauen Automatisierungen und führen erste Tests durch. Analytics angebunden.",
    proc3t: "1–2 Wochen",
    proc4: "Optimierung",
    proc4d:
      "Wir prüfen Zahlen wöchentlich. Streichen was nicht funktioniert, skalieren was funktioniert. Montagsberichte, Dashboard-Zugang — immer.",
    proc4t: "Laufend",

    // Venesa promo
    venEyebrow: "— Lernen Sie Venesa kennen",
    venTitle1: "Ihre",
    venTitle2: "KI-Beraterin",
    venTitle3: "Venesa.",
    venLead:
      "Venesa ist eine KI-Assistentin auf Basis von Claude, trainiert für Ihr Unternehmen. Sie spricht mit Kunden auf Ihrer Website, in Telegram und Instagram, qualifiziert Leads und leitet heiße Kontakte direkt an Sie weiter. Denselben Bot erstellen wir für jedes Projekt.",
    venBullets: [
      "Trainiert auf die Materialien und den Tonfall Ihrer Marke",
      "Antwortet in jeder Sprache, arbeitet 24/7",
      "Erfasst Leads direkt ins CRM oder Telegram",
      "Sie kontrollieren was sie weiß und wie sie kommuniziert",
    ],
    venCta: "Mit Venesa sprechen",
    venBadgeLabel: "KI-Agent",
    venBadgeName: "Venesa",
    venBadgeRole: "KI-Beraterin · Online",

    // Testimonials
    testEyebrow: "— Kundenstimmen",
    testTitle1: "Was",
    testTitle2: "Kunden",
    testTitle3: "sagen",
    testLead:
      "Teams aus den USA und Europa, mit denen wir in den letzten Monaten Projekte gestartet haben.",
    testReviewBtn: "Bewertung abgeben",
    testPrev: "Vorherige Bewertung",
    testNext: "Nächste Bewertung",

    // FAQ
    faqEyebrow: "— Häufige Fragen",
    faqTitle1: "Häufige",
    faqTitle2: "Fragen",
    faqLead:
      "Die häufigsten Fragen vor dem Start. Keine passende Antwort gefunden? Schreiben Sie uns — wir antworten innerhalb einer Stunde.",
    faqNote: "Schnellere Antwort nötig?",
    faqNoteLink: "Schreiben Sie uns auf Telegram →",
    faq1q: "Was kosten Ihre Leistungen?",
    faq1a:
      "Wir nennen keine Preise vorab — wir besprechen sie nach dem Briefing, um eine auf Ihre Aufgabe zugeschnittene Preisspanne anzubieten. Die meisten Kunden starten ab ca. 1.000 $/Monat, der genaue Betrag hängt von Umfang und Zielen ab.",
    faq2q: "Wann sehe ich erste Ergebnisse?",
    faq2a:
      "Bei Werbung — erste Leads kommen in der Regel innerhalb von 3–7 Tagen nach dem Start. Bei Automatisierung — sofort nach der Implementierung. Bei KI-Bots — am Starttag. Stabile Werbeleistung bildet sich bis Ende des ersten Monats nach der Optimierung.",
    faq3q: "Arbeiten Sie mit meiner Branche?",
    faq3a:
      "In den letzten Jahren haben wir Projekte in E-Commerce, Bildung, Immobilien, Gesundheitswesen, Dienstleistungen und SaaS gestartet. Wenn Ihre Nische nicht dabei ist — kontaktieren Sie uns trotzdem, wir haben wahrscheinlich relevante Erfahrung.",
    faq4q: "Was wenn die Werbung nicht funktioniert?",
    faq4a:
      "Wir versprechen keine '100% Leads in einer Woche' — das wären leere Worte. Aber wir arbeiten mit transparenten KPIs, zeigen wöchentlich Zahlen, und wenn eine Kampagne nicht performt — schwenken wir schnell um, statt monatelang Budget zu verbrennen.",
    faq5q: "Brauche ich einen eigenen Marketer?",
    faq5a:
      "Nein. Wir übernehmen den gesamten operativen Betrieb — von der Anzeigenerstellung bis zum Reporting. Ihre Aufgabe ist es, Feedback zu Leads zu geben und wichtige Entscheidungen zu genehmigen.",
    faq6q: "Wie läuft die Kommunikation?",
    faq6a:
      "Wir erstellen einen gemeinsamen Telegram-Chat, senden wöchentliche Berichte am Montag und beantworten dringende Fragen innerhalb einer Stunde während der Geschäftszeiten. Einmal im Monat — ein Strategiegespräch für die nächste Periode.",
    faq7q: "Kann ich mit nur einer Leistung starten?",
    faq7a:
      "Ja. Viele Kunden starten nur mit Werbung oder nur mit einem KI-Bot und fügen 1–2 Monate später mehr hinzu, sobald sie Ergebnisse sehen. Wir drängen keine Pakete auf.",
    faq8q: "Unterzeichnen Sie NDAs?",
    faq8a:
      "Ja, bei Bedarf — wir unterzeichnen ein NDA vor Arbeitsbeginn. Alle Projektinformationen bleiben vertraulich.",

    // CTA
    ctaEyebrow: "— Kontakt aufnehmen",
    ctaEnd: "IAA / 2026 →",
    ctaTitle1: "Bereit",
    ctaTitle2: "zu wachsen",
    ctaTitle3: "?",
    ctaSub:
      "Schreiben Sie uns auf Telegram oder per E-Mail — wir besprechen Ihre Aufgabe, erklären wie wir helfen können und teilen erste Ideen innerhalb einer Stunde. Unverbindlich, ohne Floskeln.",
    ctaPrimary: "Anfrage senden",
    ctaTelegram: "Telegram",
    ctaMeta1: "IAA agency · Werbung × Automatisierung × KI",
    ctaMeta2: "Projekte willkommen · USA → Weltweit",

    // Footer
    ftServices: "Leistungen",
    ftAds: "Werbung / Targeting",
    ftAutomation: "Automatisierung",
    ftBots: "KI-Bots",
    ftVenesa: "Venesa",
    ftProcess: "Prozess",
    ftFaq: "FAQ",
    ftContacts: "Kontakt",
    ftCompany: "Unternehmen",
    ftAbout: "Über uns",
    ftCollab: "Partnerschaften",
    ftAccepting: "Projekte willkommen",
    ftLocation: "USA → Weltweit",
    ftRights: "Alle Rechte vorbehalten",
    ftUp: "Nach oben ↑",
    ftContact: "Kontakt",

    // Dividers
    divNext: "— weiter",
    divMeet: "— lernen Sie Venesa kennen",
    divProof: "— Kundenstimmen",
    divQuestions: "— Fragen",
    divTalk: "— Kontakt",

    // Intro
    introTag1: "Werbung",
    introTag2: "Automatisierung",
    introTag3: "KI",
    introLocation: "USA → Weltweit",
    introLoading: "Laden…",

    // Lead form
    leadEyebrow: "— Anfrage senden",
    leadTitle: "Erzählen Sie uns von",
    leadTitleAccent: "Ihrer Aufgabe",
    leadSub: "Wir antworten innerhalb einer Stunde während der Geschäftszeiten. Alle Felder erforderlich.",
    leadName: "Name",
    leadNamePh: "Wie sollen wir Sie ansprechen",
    leadContact: "Kontakt",
    leadContactPh: "@Benutzername auf Telegram oder E-Mail",
    leadBusiness: "Ihr Unternehmen",
    leadBusinessPh: "Firmenname, Website, was Sie tun",
    leadTask: "Aufgabe",
    leadTaskPh:
      "Was Sie brauchen: Werbung, Automatisierung, KI-Bot oder etwas anderes. Je detaillierter, desto genauer unsere Antwort.",
    leadSubmit: "Anfrage senden",
    leadSubmitting: "Wird gesendet…",
    leadConsent:
      'Mit Klick auf \u201ESenden\u201C stimmen Sie der Verarbeitung Ihrer Kontaktdaten zur R\u00FCckmeldung zu.',
    leadSuccessTitle: "Anfrage gesendet",
    leadSuccessText:
      "Vielen Dank! Wir haben Ihre Anfrage erhalten und antworten innerhalb einer Stunde während der Geschäftszeiten. Bis bald 👋",
    leadClose: "Schließen",
    leadFillAll: "Bitte füllen Sie alle Felder aus",

    // Chat widget
    chatGreeting:
      "Hallo 👋 Mein Name ist Venesa, ich bin die KI-Beraterin bei IAA agency.\n\nErzählen Sie mir ein wenig über Ihr Unternehmen — ich schlage die passende Lösung für Ihre Ziele vor.",
    chatName: "Venesa · KI-Beraterin",
    chatStatus: "Online",
    chatPh: "Nachricht eingeben...",
    chatLabel: "Venesa",
    chatError: "Verbindungsfehler. Bitte versuchen Sie es später erneut.",
    chatFallback: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
  },
};

export type Dictionary = typeof dict.ru;

export function getDictionary(locale: Locale): Dictionary {
  return dict[locale] as Dictionary;
}
