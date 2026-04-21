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
    navOpenMenu: "Открыть меню",
    navCloseMenu: "Закрыть меню",

    // Hero meta
    heroMeta1: "Реклама · Автоматизация · AI",
    heroMeta2: "Принимаем проекты · 2026",
    heroMeta3: "США → Весь мир",
    heroTitle1: "Автоматизируем",
    heroTitle2: "рост",
    heroTitle3: "вашего",
    heroTitle4: "бизнеса.",
    heroSub:
      "Seventy Times превращает рекламу, автоматизацию и AI в поток клиентов для вашего бизнеса. От первого звонка до первых лидов — 2–3 недели. Без долгих контрактов, с понятными цифрами каждую неделю.",
    heroCta1: "Запустить консультацию",
    heroCta2: "Поговорить с Венесой",
    heroHint: "Ответ за 10 секунд · Без обязательств",
    statGoal: "Потенциал роста",
    statServices: "Направления",
    statSupport: "AI на связи",
    statLaunch: "Запуск",

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
      "Первые лиды обычно за 3–7 дней после запуска",
      "Рекламные кабинеты на Meta, Google и TikTok под ключ",
      "Проверенные креативы: баннеры и тексты с A/B-тестами",
      "Аудитории и таргетинг — точно под вашего клиента",
      "Еженедельная оптимизация: режем то, что не окупается",
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
      "Аудит процессов: находим где утекают время и деньги",
      "Автоматизация одного ключевого процесса — от заявки до ответа клиенту",
      "10–20 часов в неделю обратно команде — без ручного копипаста",
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
    svc3Tag: "Умный помощник, который работает за вас 24/7",
    svc3Note: null as string | null,
    svc3Inc: [
      "Клиент получает ответ за секунды — в Telegram, Instagram, Facebook или на сайте",
      "AI-консультант обучен под ваш бизнес, говорит вашим голосом",
      "Контакты автоматически падают в Google Sheets или CRM — ничего не теряется",
      "24/7 на любом языке, без выходных и больничных",
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
      "Знает ваш бизнес изнутри — обучена на ваших материалах и тоне",
      "Отвечает на любом языке, работает 24/7 без выходных",
      "Сама квалифицирует лиды и складывает их в CRM или Telegram",
      "До 10–15 часов в неделю, которые команда не тратит на первую коммуникацию",
    ],
    venCta: "Написать Венесе",
    venBadgeLabel: "AI Agent",
    venBadgeName: "Венеса",
    venBadgeRole: "AI-консультант · Онлайн",

    // Principles (was Testimonials — honest replacement since we're new)
    testEyebrow: "— Принципы / Обещания",
    testTitle1: "Что",
    testTitle2: "мы",
    testTitle3: "обещаем",
    testLead:
      "Мы только запускаемся и не ставим сюда выдуманные отзывы. Вместо этого — четыре принципа, которыми реально руководствуемся в работе.",
    testReviewBtn: "Стать первым клиентом",
    testPrev: "Предыдущий принцип",
    testNext: "Следующий принцип",
    prin1Title: "Начинаем с малого",
    prin1Body: "Запускаем одну услугу, показываем результат за 2–3 недели, потом расширяемся. Вас не запирают в длинный контракт — можно остановиться в любой момент.",
    prin1Badge: "01",
    prin2Title: "Цифры каждый понедельник",
    prin2Body: "Еженедельный отчёт с понятными KPI. Видно что сработало, что нет и что меняем на следующей неделе. Никакого тумана и общих слов.",
    prin2Badge: "02",
    prin3Title: "Без гарантий чудес",
    prin3Body: "Мы не обещаем «×100 за неделю» — это было бы враньём. Обещаем измеримый прогресс и честную итерацию. Результат зависит от ниши, бюджета и рынка.",
    prin3Badge: "03",
    prin4Title: "Стоп-лосс зашит",
    prin4Body: "Если за 6–8 недель подход не работает — мы сами говорим первыми. Бюджет ваш остаётся, репутация наша — тоже. Этика важнее выставленного счёта.",
    prin4Badge: "04",

    // FAQ
    faqEyebrow: "— Частые вопросы",
    faqTitle1: "Частые",
    faqTitle2: "вопросы",
    faqLead:
      "Самое частое, что спрашивают перед стартом. Если не нашли свой вопрос — напишите напрямую, ответим в течение часа.",
    faqNote: "Нужен ответ быстрее?",
    faqNoteLink: "Напишите в Telegram →",
    faqStill: "Не нашли свой вопрос?",
    faqStillCta: "Задайте его нам напрямую →",
    faq1q: "Сколько стоят ваши услуги?",
    faq1a:
      "Мы не называем цены заранее — обсуждаем их после брифинга, чтобы предложить вилку под конкретную задачу. Типичные проекты стартуют от $1000 в месяц, но точная цифра зависит от масштаба и целей.",
    faq2q: "Когда будут первые результаты?",
    faq2a:
      "По рекламе — первые лиды обычно за 3–7 дней после запуска. За 2–3 недели уже ясно какие объявления тянут, а какие нет — масштабируем то что работает. По автоматизации и AI-ботам — отдача с первого дня. К концу первого месяца у вас будет рабочая стратегия, а не догадки.",
    faq3q: "Работаете ли с моей нишей?",
    faq3a:
      "Наша методология рассчитана на e-commerce, услуги, перевозки, ритейл одежды, авто-аксессуары и beauty-индустрию. Если вашей ниши нет в списке — всё равно пишите, обсудим как можем помочь.",
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

    // Growth Simulator (levels-based with concrete descriptions)
    simEyebrow: "— 70× Симулятор роста",
    simTitle1: "Соберите",
    simTitle2: "свой",
    simTitle3: "стек.",
    simLead:
      "Калькулятор вашего роста. Выберите уровень каждого направления — посмотрите как они перемножаются в итоговый рост за 6 месяцев. В основе — средние отраслевые эффекты digital-каналов.",
    simCurrent: "Что это включает",
    simContribution: "Вклад в рост",
    simAdsTag: "01 / Реклама",
    simAdsName: "Реклама",
    simAdsDesc: "Сколько платных каналов мы ведём",
    simAdsLvl0: "Нет",
    simAdsLvl0Desc: "Платной рекламы нет — только органический приток",
    simAdsLvl1: "Старт",
    simAdsLvl1Desc: "Один канал (Meta или Google) с базовой настройкой",
    simAdsLvl2: "Стандарт",
    simAdsLvl2Desc: "Два канала (Meta + Google) с регулярной оптимизацией",
    simAdsLvl3: "Полный",
    simAdsLvl3Desc: "Meta + Google + TikTok с креативами и A/B-тестами",
    simAutoTag: "02 / Автоматизация",
    simAutoName: "Автоматизация",
    simAutoDesc: "Какие процессы автоматизированы",
    simAutoLvl0: "Нет",
    simAutoLvl0Desc: "Всё вручную — лиды обрабатываются людьми",
    simAutoLvl1: "Базово",
    simAutoLvl1Desc: "Приём заявки → уведомление → таблица",
    simAutoLvl2: "Средне",
    simAutoLvl2Desc: "+ CRM-интеграция, авто-отчёты, напоминания",
    simAutoLvl3: "Полный",
    simAutoLvl3Desc: "Комплексная система: лиды, CRM, счета, аналитика",
    simAiTag: "03 / AI",
    simAiName: "AI-консультант",
    simAiDesc: "Где работает Венеса",
    simAiLvl0: "Нет",
    simAiLvl0Desc: "Без AI-консультанта — коммуникация только от людей",
    simAiLvl1: "Сайт",
    simAiLvl1Desc: "Венеса на сайте — квалифицирует посетителей",
    simAiLvl2: "Мульти",
    simAiLvl2Desc: "+ Telegram/Instagram — единый AI через все каналы",
    simAiLvl3: "Полный",
    simAiLvl3Desc: "AI на всех входящих + автогенерация материалов",
    simResultEyebrow: "— Совокупный коэффициент",
    simMultiLabel: "к вашему текущему потоку лидов через 6 месяцев",
    simCompareLabel: "Сейчас",
    simCompareLabelAfter: "Через 6 мес.",
    simDeltaLabel: "Прирост",
    simLeadsUnit: "лидов/мес",
    simFormula: "Как считаем",
    simFormulaDesc: "Каждое направление даёт свой % прироста. Они перемножаются — так работает compounding. Базовое значение 100 лидов/мес — просто для наглядности, у вас будет ваше.",
    simDisclaimer:
      "Это прогноз на основе реальных digital-бенчмарков, не гарантия. Ваш результат зависит от ниши, рынка, бюджета и качества исполнения. Мы даём честные ориентиры, не обещания чудес.",
    simCta: "Обсудить мой стек с Венесой",

    // CTA
    ctaEyebrow: "— Связаться",
    ctaEnd: "70× / 2026 →",
    ctaTitle1: "Готовы",
    ctaTitle2: "к росту",
    ctaTitle3: "?",
    ctaSub:
      "Напишите в Telegram или на почту — обсудим задачу, расскажем как можем помочь, и в течение часа дадим первые идеи. Без обязательств, без воды.",
    ctaPrimary: "Оставить заявку",
    ctaChannelsLabel: "или пишите напрямую",
    ctaTelegram: "Telegram",
    ctaMeta1: "Seventy Times · Реклама × Автоматизация × AI",
    ctaMeta2: "Принимаем проекты · США → Весь мир",

    // Footer
    ftServices: "Услуги",
    ftAds: "Реклама / Таргет",
    ftAutomation: "Автоматизация",
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
    ftDisclaimer: "Любые проекции роста и числовые ориентиры на сайте носят иллюстративный характер. Реальные результаты зависят от ниши, бюджета и качества исполнения — Seventy Times не гарантирует конкретных цифр.",

    // Dividers
    divNext: "— дальше",
    divMeet: "— знакомьтесь",
    divProof: "— отзывы",
    divQuestions: "— вопросы",
    divTalk: "— связаться",
    divSimulator: "— посчитайте свой рост",

    // Intro
    introTag1: "Реклама",
    introTag2: "Автоматизация",
    introTag3: "AI",
    introLocation: "США → Весь мир",
    introLoading: "Загружаем…",
    introSkip: "Пропустить",

    // Lead form
    leadEyebrow: "— Оставить заявку",
    leadTitle: "Расскажите о",
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
      "Спасибо! Мы получили вашу заявку и ответим в течение часа в рабочее время. До связи 👋",
    leadClose: "Закрыть",
    leadFillAll: "Пожалуйста, заполните все поля",

    // Chat widget
    chatGreeting:
      "Привет 👋 Меня зовут Венеса, я AI-консультант Seventy Times.\n\nРасскажи немного о своём бизнесе — подберу решение под твои задачи.",
    chatName: "Венеса · AI-консультант",
    chatStatus: "Онлайн",
    chatPh: "Напишите сообщение...",
    chatLabel: "Венеса",
    chatError: "Ошибка соединения. Попробуй чуть позже.",
    chatFallback: "Что-то пошло не так. Попробуй снова.",
    chatOpen: "Написать Венесе",
    chatClose: "Закрыть чат",
    chatSend: "Отправить",
    chatMessage: "Сообщение",
    chatAlt: "Венеса — AI-консультант Seventy Times",

    // Consent (shared between forms)
    consentPrefix: "Я согласен(на) с ",
    consentPrivacy: "Политикой конфиденциальности",
    consentAnd: " и ",
    consentTerms: "Условиями использования",
    consentSuffix: ".",
    consentRequired: "Нужно согласиться с Политикой и Условиями",

    // Lead form extras
    leadInvalidContact: "Похоже, контакт не похож на email или @username — проверьте",
    leadTooMany: "Слишком много заявок. Попробуйте через час.",
    leadCloseAria: "Закрыть форму",

    // Review form
    reviewEyebrow: "— Оставить отзыв",
    reviewTitle: "Поделитесь",
    reviewTitleAccent: "опытом",
    reviewSub:
      "Отзыв могут оставить только реальные клиенты — нужен персональный код, который мы выдаём после завершения проекта. Нет кода? Напишите нам в Telegram, мы вышлем.",
    reviewCode: "Код клиента",
    reviewCodePh: "Персональный код, например ST-XYZ-42",
    reviewName: "Имя",
    reviewNamePh: "Как подписать отзыв",
    reviewRole: "Должность и компания",
    reviewRolePh: "Например: Основатель, Becker Studio",
    reviewLocation: "Локация",
    reviewLocationPh: "Город, страна",
    reviewContent: "Отзыв",
    reviewContentPh:
      "Коротко — что сделали, какие были результаты, как вам работалось с командой.",
    reviewSubmit: "Отправить отзыв",
    reviewSubmitting: "Проверяем код…",
    reviewSuccessTitle: "Отзыв принят",
    reviewSuccessText:
      "Спасибо за тёплые слова! Мы получили отзыв и добавим его в ленту после быстрой модерации.",
    reviewClose: "Закрыть",
    reviewFillAll: "Пожалуйста, заполни все поля",
    reviewNote:
      "Отзывы проходят модерацию и добавляются в ленту вручную — мы хотим показывать только реальные истории.",
    reviewError: "Ошибка соединения. Попробуй позже.",
    reviewCloseAria: "Закрыть форму",
    reviewTooMany: "Слишком много попыток. Попробуйте позже.",

    // Footer — legal links
    ftLegal: "Правовое",
    ftPrivacy: "Политика конфиденциальности",
    ftTerms: "Условия использования",

    // Privacy Policy page
    privacyTitle: "Политика конфиденциальности",
    privacyUpdated: "Обновлено: 20 апреля 2026",
    privacyDraftNote:
      "Это рабочий черновик для ранней стадии. Он будет пересмотрен совместно с юристом после регистрации компании.",
    privacyBody: [
      {
        heading: "Кто мы",
        text: 'Seventy Times — малый бизнес, работающий из США как индивидуальное предприятие (sole proprietorship); официальная регистрация запланирована на более позднюю стадию. Связаться можно по адресу info@seventy-times.com.',
      },
      {
        heading: "Какие данные мы собираем",
        text: 'Через форму заявки: ваше имя, контакт (email или Telegram), название бизнеса, описание задачи. Через форму отзыва: имя, должность, локация, текст отзыва и персональный код клиента. Через чат с Венесой: текст сообщений, отправленных нам. Мы не собираем платежную информацию и не используем cookies для трекинга.',
      },
      {
        heading: "Зачем мы это собираем",
        text: 'Только чтобы связаться с вами и оказать услугу, о которой вы просили. Мы не продаём данные, не делимся ими с рекламными сетями и не используем для профилирования.',
      },
      {
        heading: "Где хранятся данные",
        text: 'Заявки и отзывы пересылаются в наш внутренний Telegram-чат. Логи сайта хранятся у нашего хостинг-провайдера (Vercel) в техническом виде и не содержат персональных данных. Чат с Венесой обрабатывается через API Anthropic для генерации ответов.',
      },
      {
        heading: "Как долго хранятся",
        text: 'Заявки и отзывы — до завершения задачи и плюс год, после чего удаляются. История чата хранится только в вашем браузере и очищается когда вы её удаляете.',
      },
      {
        heading: "Ваши права",
        text: 'Вы можете в любой момент написать на info@seventy-times.com и попросить: посмотреть какие ваши данные у нас есть, исправить их или удалить. Мы ответим в течение 30 дней.',
      },
      {
        heading: "Cookies",
        text: 'Мы используем один технический cookie: запоминаем выбранный язык интерфейса. Это не трекинг — только для удобства.',
      },
      {
        heading: "Дети",
        text: 'Сайт не предназначен для детей младше 16 лет. Мы не собираем данные детей.',
      },
      {
        heading: "Изменения",
        text: 'Когда бизнес будет зарегистрирован официально, эта политика будет обновлена совместно с юристом. Текущая версия — честный минимум для ранней стадии.',
      },
    ],

    // Terms of Use page
    termsTitle: "Условия использования",
    termsUpdated: "Обновлено: 20 апреля 2026",
    termsDraftNote:
      "Это рабочий черновик для ранней стадии. Он будет пересмотрен совместно с юристом после регистрации компании.",
    termsBody: [
      {
        heading: "Общее",
        text: 'Сайт seventy-times.com принадлежит Seventy Times — малому бизнесу из США. Используя сайт, вы соглашаетесь с этими условиями.',
      },
      {
        heading: "Что мы обещаем",
        text: 'Мы честно описываем наши услуги, цены обсуждаем индивидуально, результаты — конкретные KPI, которые оговариваем до старта. Чат с Венесой — вспомогательный инструмент, а не юридическое предложение.',
      },
      {
        heading: "Чего мы не обещаем",
        text: 'Никаких «гарантированных 100× за неделю». Реальные результаты зависят от ниши, бюджета, рынка и качества исполнения. Все цифры на сайте и в Growth Simulator — иллюстративные.',
      },
      {
        heading: "Интеллектуальная собственность",
        text: 'Все тексты, дизайн и код сайта принадлежат Seventy Times. Копировать и использовать без разрешения нельзя. Бренд «Seventy Times», «70×» и связанные элементы — наша собственность.',
      },
      {
        heading: "Формы и отзывы",
        text: 'Заполняя форму заявки, вы подтверждаете что данные достоверны и предоставлены добровольно. Отзывы принимаются только с персональным кодом от реального клиента; фальшивые отзывы не публикуются.',
      },
      {
        heading: "Ограничение ответственности",
        text: 'Сайт предоставляется «как есть». Мы стараемся чтобы всё работало, но не гарантируем что сайт будет доступен 24/7 или что информация всегда на 100% актуальна. Решения на основе материалов сайта — на вашей ответственности.',
      },
      {
        heading: "Применимое право",
        text: 'К этим условиям применяется право США. Споры, по возможности, решаются прямым диалогом — пишите на info@seventy-times.com.',
      },
      {
        heading: "Изменения",
        text: 'Мы можем обновлять эти условия. Существенные изменения будут отмечены датой вверху страницы.',
      },
    ],

    legalBack: "← Назад на главную",
  },

  en: {
    // Nav
    navServices: "Services",
    navProcess: "Process",
    navVenesa: "Venesa",
    navFaq: "FAQ",
    navStatus: "Accepting projects",
    navCta: "Get a quote",
    navOpenMenu: "Open menu",
    navCloseMenu: "Close menu",

    // Hero meta
    heroMeta1: "Ads · Automation · AI",
    heroMeta2: "Accepting projects · 2026",
    heroMeta3: "USA → Worldwide",
    heroTitle1: "We automate",
    heroTitle2: "your",
    heroTitle3: "business",
    heroTitle4: "growth.",
    heroSub:
      "Seventy Times turns ads, automation, and AI into a steady flow of qualified clients. From first call to first leads — 2–3 weeks. No long contracts, weekly numbers, no fluff.",
    heroCta1: "Book a free strategy call",
    heroCta2: "Talk to Venesa",
    heroHint: "Response in 10 seconds · No obligations",
    statGoal: "Growth potential",
    statServices: "Core services",
    statSupport: "AI always on",
    statLaunch: "Est.",

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
      "First leads typically within 3–7 days after launch",
      "Turnkey ad accounts on Meta, Google & TikTok",
      "A/B-tested creatives: banners and copy that actually pull",
      "Audiences and targeting built around your real customer",
      "Weekly optimization — we cut what doesn't earn",
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
      "Audit first: we find where hours and dollars leak out",
      "One key workflow automated end-to-end — lead → alert → sheet → reply",
      "10–20 hours a week back to your team, no manual copy-paste",
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
      "Replies in seconds — Telegram, Instagram, Facebook, or your website",
      "Trained on your business and tone; it sounds like your team",
      "Contacts drop straight into Google Sheets or CRM — nothing lost",
      "24/7, any language, no sick days",
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
      "Knows your business inside out — trained on your materials and tone",
      "Responds in any language, works 24/7 without breaks",
      "Qualifies leads and drops them straight into your CRM or Telegram",
      "Frees up ~10–15 hours a week your team spends on first-touch chats",
    ],
    venCta: "Talk to Venesa",
    venBadgeLabel: "AI Agent",
    venBadgeName: "Venesa",
    venBadgeRole: "AI consultant · Online",

    // Principles
    testEyebrow: "— Principles / Promises",
    testTitle1: "What",
    testTitle2: "we",
    testTitle3: "promise",
    testLead:
      "We're a new studio and we won't post fake testimonials. Instead — four principles we actually run on.",
    testReviewBtn: "Be our first client",
    testPrev: "Previous principle",
    testNext: "Next principle",
    prin1Title: "Start small, prove first",
    prin1Body: "We launch with a single service, show results in 2–3 weeks, then expand. No long contracts — you can stop at any time.",
    prin1Badge: "01",
    prin2Title: "Numbers every Monday",
    prin2Body: "Weekly report with clear KPIs. You see what worked, what didn't, and what we'll change next week. No fog, no fluff.",
    prin2Badge: "02",
    prin3Title: "No guaranteed miracles",
    prin3Body: "We don't promise '100× in a week' — that would be a lie. We promise measurable progress and honest iteration. Outcomes depend on niche, budget and market.",
    prin3Badge: "03",
    prin4Title: "Stop-loss built in",
    prin4Body: "If the approach isn't working after 6–8 weeks, we tell you first. Your budget stays yours, our ethics stay ours. Integrity over invoice.",
    prin4Badge: "04",

    // FAQ
    faqEyebrow: "— Frequently asked questions",
    faqTitle1: "Common",
    faqTitle2: "questions",
    faqLead:
      "The most common things people ask before getting started. Didn't find your answer? Reach out — we reply within an hour.",
    faqNote: "Need a faster answer?",
    faqNoteLink: "Message us on Telegram →",
    faqStill: "Don't see your question?",
    faqStillCta: "Ask us directly →",
    faq1q: "How much do your services cost?",
    faq1a:
      "We don't quote prices upfront — we discuss them after the briefing to offer a range tailored to your specific task. Typical projects start from around $1,000/month, but the exact figure depends on scope and goals.",
    faq2q: "When will I see results?",
    faq2a:
      "For ads — first leads typically come within 3–7 days of launch. By week 2–3 it's clear which ads pull and which don't — we scale the winners. Automation and AI bots pay off from day one. By end of month one you have a working strategy, not guesses.",
    faq3q: "Do you work with my industry?",
    faq3a:
      "Our methodology is built for e-commerce, services, transportation, fashion retail, auto accessories and beauty industry. If your niche isn't listed — reach out anyway, we'll discuss how we can help.",
    faq4q: "What if the ads don't work?",
    faq4a:
      "We don't promise '100% leads in a week' — that would be empty words. But we work on transparent KPIs, show numbers weekly, and if a campaign isn't performing — we pivot quickly instead of burning through the budget for months.",
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

    // Growth Simulator (levels-based with concrete descriptions)
    simEyebrow: "— 70× Growth Simulator",
    simTitle1: "Build",
    simTitle2: "your",
    simTitle3: "stack.",
    simLead:
      "Your growth calculator. Pick a level for each pillar — see how they compound into 6-month growth. Built on industry-average digital channel benchmarks.",
    simCurrent: "What's included",
    simContribution: "Growth contribution",
    simAdsTag: "01 / Ads",
    simAdsName: "Ads",
    simAdsDesc: "How many paid channels we run",
    simAdsLvl0: "None",
    simAdsLvl0Desc: "No paid advertising — organic traffic only",
    simAdsLvl1: "Starter",
    simAdsLvl1Desc: "One channel (Meta or Google) with basic setup",
    simAdsLvl2: "Standard",
    simAdsLvl2Desc: "Two channels (Meta + Google) with regular optimization",
    simAdsLvl3: "Full",
    simAdsLvl3Desc: "Meta + Google + TikTok with creatives and A/B tests",
    simAutoTag: "02 / Automation",
    simAutoName: "Automation",
    simAutoDesc: "Which processes are automated",
    simAutoLvl0: "None",
    simAutoLvl0Desc: "Everything manual — people handle leads",
    simAutoLvl1: "Basic",
    simAutoLvl1Desc: "Intake → notification → spreadsheet",
    simAutoLvl2: "Medium",
    simAutoLvl2Desc: "+ CRM integration, auto-reports, reminders",
    simAutoLvl3: "Full",
    simAutoLvl3Desc: "Complete system: leads, CRM, invoicing, analytics",
    simAiTag: "03 / AI",
    simAiName: "AI consultant",
    simAiDesc: "Where Venesa works",
    simAiLvl0: "None",
    simAiLvl0Desc: "No AI consultant — human-only communication",
    simAiLvl1: "Website",
    simAiLvl1Desc: "Venesa on your site — qualifies visitors",
    simAiLvl2: "Multi-channel",
    simAiLvl2Desc: "+ Telegram/Instagram — one AI across all channels",
    simAiLvl3: "Full",
    simAiLvl3Desc: "AI on every inbound + content auto-generation",
    simResultEyebrow: "— Combined multiplier",
    simMultiLabel: "of your current monthly lead flow in 6 months",
    simCompareLabel: "Today",
    simCompareLabelAfter: "In 6 months",
    simDeltaLabel: "Delta",
    simLeadsUnit: "leads/mo",
    simFormula: "How we calculate",
    simFormulaDesc: "Each pillar adds its own growth %. They multiply together — that's how compounding works. The baseline 100 leads/mo is an illustrative anchor; your actual number is yours.",
    simDisclaimer:
      "A projection based on real digital marketing benchmarks, not a guarantee. Your results depend on niche, market, budget, and execution. We give honest numbers, not miracle promises.",
    simCta: "Discuss my stack with Venesa",

    // CTA
    ctaEyebrow: "— Get in touch",
    ctaEnd: "70× / 2026 →",
    ctaTitle1: "Ready",
    ctaTitle2: "to grow",
    ctaTitle3: "?",
    ctaSub:
      "Write us on Telegram or email — we'll discuss your task, explain how we can help, and share first ideas within an hour. No obligations, no fluff.",
    ctaPrimary: "Get a quote",
    ctaChannelsLabel: "or reach us directly",
    ctaTelegram: "Telegram",
    ctaMeta1: "Seventy Times · Ads × Automation × AI",
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
    ftDisclaimer: "Any growth projections and numbers on this site are illustrative. Actual results depend on niche, budget and execution quality — Seventy Times does not guarantee specific numbers.",

    // Dividers
    divNext: "— next",
    divMeet: "— meet venesa",
    divProof: "— testimonials",
    divQuestions: "— questions",
    divTalk: "— get in touch",
    divSimulator: "— model your growth",

    // Intro
    introTag1: "Ads",
    introTag2: "Automation",
    introTag3: "AI",
    introLocation: "USA → Worldwide",
    introLoading: "Loading…",
    introSkip: "Skip",

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
      "Hi 👋 My name is Venesa, I'm the AI consultant at Seventy Times.\n\nTell me a bit about your business — I'll suggest the right solution for your goals.",
    chatName: "Venesa · AI consultant",
    chatStatus: "Online",
    chatPh: "Type a message...",
    chatLabel: "Venesa",
    chatError: "Connection error. Please try again later.",
    chatFallback: "Something went wrong. Please try again.",
    chatOpen: "Talk to Venesa",
    chatClose: "Close chat",
    chatSend: "Send",
    chatMessage: "Message",
    chatAlt: "Venesa — AI consultant at Seventy Times",

    // Consent (shared between forms)
    consentPrefix: "I agree to the ",
    consentPrivacy: "Privacy Policy",
    consentAnd: " and ",
    consentTerms: "Terms of Use",
    consentSuffix: ".",
    consentRequired: "Please agree to the Privacy Policy and Terms of Use",

    // Lead form extras
    leadInvalidContact: "That doesn't look like an email or @username — please check",
    leadTooMany: "Too many requests. Please try again in an hour.",
    leadCloseAria: "Close form",

    // Review form
    reviewEyebrow: "— Leave a review",
    reviewTitle: "Share your",
    reviewTitleAccent: "experience",
    reviewSub:
      "Reviews can only be left by real clients — we issue a personal code after every project. No code yet? Message us on Telegram and we'll send one.",
    reviewCode: "Client code",
    reviewCodePh: "Your personal code, e.g. ST-XYZ-42",
    reviewName: "Name",
    reviewNamePh: "How to sign the review",
    reviewRole: "Role & company",
    reviewRolePh: "E.g. Founder, Becker Studio",
    reviewLocation: "Location",
    reviewLocationPh: "City, country",
    reviewContent: "Review",
    reviewContentPh:
      "Briefly — what we did, what results you got, how working with us felt.",
    reviewSubmit: "Submit review",
    reviewSubmitting: "Verifying code…",
    reviewSuccessTitle: "Review received",
    reviewSuccessText:
      "Thank you for the kind words! We got it and will add it to the feed after a quick moderation pass.",
    reviewClose: "Close",
    reviewFillAll: "Please fill in all fields",
    reviewNote:
      "Reviews are moderated and added manually — we only show real stories.",
    reviewError: "Connection error. Please try again later.",
    reviewCloseAria: "Close form",
    reviewTooMany: "Too many attempts. Please try again later.",

    // Footer — legal links
    ftLegal: "Legal",
    ftPrivacy: "Privacy Policy",
    ftTerms: "Terms of Use",

    // Privacy Policy page
    privacyTitle: "Privacy Policy",
    privacyUpdated: "Last updated: April 20, 2026",
    privacyDraftNote:
      "This is a working draft for the early stage of the business. It will be revised with legal counsel once the company is formally registered.",
    privacyBody: [
      {
        heading: "Who we are",
        text: 'Seventy Times is a small business operating from the United States as a sole proprietorship; formal incorporation is planned at a later stage. You can reach us at info@seventy-times.com.',
      },
      {
        heading: "What data we collect",
        text: 'Through the request form: your name, contact (email or Telegram), business name, and a description of your task. Through the review form: name, role, location, review text, and a personal client code. Through the chat with Venesa: the text of messages you send us. We do not collect payment information and do not use tracking cookies.',
      },
      {
        heading: "Why we collect it",
        text: 'Only to get back to you and deliver the service you requested. We do not sell your data, share it with ad networks, or use it for profiling.',
      },
      {
        heading: "Where it is stored",
        text: 'Requests and reviews are forwarded to our internal Telegram chat. Website logs are stored in technical form by our hosting provider (Vercel) and do not contain personal data. Chat with Venesa is processed via the Anthropic API to generate responses.',
      },
      {
        heading: "How long we keep it",
        text: 'Requests and reviews — for the duration of the engagement plus one year, then deleted. Chat history is kept only in your browser and is cleared when you clear it.',
      },
      {
        heading: "Your rights",
        text: 'You can email info@seventy-times.com at any time to: see what data we hold about you, correct it, or delete it. We will respond within 30 days.',
      },
      {
        heading: "Cookies",
        text: 'We use a single technical cookie to remember your chosen interface language. This is not tracking — purely for convenience.',
      },
      {
        heading: "Children",
        text: 'The site is not intended for children under 16. We do not knowingly collect data from minors.',
      },
      {
        heading: "Changes",
        text: 'Once the business is formally registered, this policy will be revised with legal counsel. The current version is an honest minimum for the early stage.',
      },
    ],

    // Terms of Use page
    termsTitle: "Terms of Use",
    termsUpdated: "Last updated: April 20, 2026",
    termsDraftNote:
      "This is a working draft for the early stage of the business. It will be revised with legal counsel once the company is formally registered.",
    termsBody: [
      {
        heading: "General",
        text: 'The site seventy-times.com is operated by Seventy Times, a small business in the United States. By using the site you accept these terms.',
      },
      {
        heading: "What we promise",
        text: 'We describe our services honestly, discuss prices individually, and agree on specific KPIs before we start. The chat with Venesa is a helper tool, not a legal offer.',
      },
      {
        heading: "What we do not promise",
        text: "No ‘guaranteed 100× in a week’. Actual results depend on niche, budget, market, and execution quality. All numbers on the site and in the Growth Simulator are illustrative.",
      },
      {
        heading: "Intellectual property",
        text: 'All texts, design, and code of this site belong to Seventy Times. You may not copy or reuse them without permission. The brand "Seventy Times", "70×", and related elements are our property.',
      },
      {
        heading: "Forms and reviews",
        text: 'By submitting a request form you confirm that the information is accurate and provided voluntarily. Reviews require a personal code issued to a real client; fake reviews are not published.',
      },
      {
        heading: "Limitation of liability",
        text: 'The site is provided "as is". We do our best to keep everything working, but we do not guarantee 24/7 availability or that every piece of information is always 100% current. Decisions based on site content are your responsibility.',
      },
      {
        heading: "Applicable law",
        text: 'These terms are governed by the laws of the United States. Disputes are resolved, where possible, through direct dialogue — write to info@seventy-times.com.',
      },
      {
        heading: "Changes",
        text: 'We may update these terms. Substantial changes will be marked by an updated date at the top of the page.',
      },
    ],

    legalBack: "← Back to home",
  },

  de: {
    // Nav
    navServices: "Leistungen",
    navProcess: "Prozess",
    navVenesa: "Venesa",
    navFaq: "FAQ",
    navStatus: "Projekte willkommen",
    navCta: "Anfrage",
    navOpenMenu: "Menü öffnen",
    navCloseMenu: "Menü schließen",

    // Hero meta
    heroMeta1: "Werbung · Automatisierung · KI",
    heroMeta2: "Projekte willkommen · 2026",
    heroMeta3: "USA → Weltweit",
    heroTitle1: "Wachstum",
    heroTitle2: "automatisiert",
    heroTitle3: "f\u00FCr Ihr",
    heroTitle4: "Unternehmen.",
    heroSub:
      "Seventy Times verwandelt Werbung, Automatisierung und KI in einen stabilen Strom qualifizierter Kunden. Vom ersten Gespräch bis zu ersten Leads — 2–3 Wochen. Keine langen Verträge, wöchentliche Zahlen, keine Floskeln.",
    heroCta1: "Kostenlose Beratung starten",
    heroCta2: "Mit Venesa sprechen",
    heroHint: "Antwort in 10 Sekunden · Unverbindlich",
    statGoal: "Wachstumspotenzial",
    statServices: "Leistungen",
    statSupport: "KI jederzeit",
    statLaunch: "Gegr.",

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
      "Erste Leads in der Regel nach 3–7 Tagen nach Start",
      "Werbekonten auf Meta, Google & TikTok schlüsselfertig",
      "A/B-getestete Kreative: Banner und Texte, die wirklich ziehen",
      "Zielgruppen und Targeting exakt auf Ihren echten Kunden",
      "Wöchentliche Optimierung — wir streichen, was sich nicht rechnet",
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
      "Audit zuerst: wir finden, wo Stunden und Euro verloren gehen",
      "Ein Kernprozess end-to-end automatisiert — Lead → Alert → Tabelle → Antwort",
      "10–20 Stunden pro Woche zurück an Ihr Team, kein manuelles Copy-Paste",
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
      "Antwortet in Sekunden — Telegram, Instagram, Facebook oder Website",
      "Trainiert auf Ihr Business und Ihren Ton, klingt wie Ihr Team",
      "Kontakte laufen direkt in Google Sheets oder CRM — nichts geht verloren",
      "24/7, jede Sprache, keine Krankheitstage",
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
      "Wir analysieren Ihr Gesch\u00E4ft, Ziele, Zielgruppe und bestehende Trichter. Wir finden, wo Geld verloren geht und wo Wachstum versteckt ist.",
    proc1t: "1–2 Tage",
    proc2: "Strategie",
    proc2d:
      "Wir schlagen einen Plan vor: Kan\u00E4le, Angebote, KPIs, Budget. Wir stimmen ab, was wann gestartet und wie gemessen wird.",
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
      "Kennt Ihr Business von innen — trainiert auf Ihre Materialien und Tonalität",
      "Antwortet in jeder Sprache, arbeitet 24/7 ohne Pause",
      "Qualifiziert Leads und legt sie direkt ins CRM oder Telegram",
      "Spart rund 10–15 Stunden pro Woche, die Ihr Team sonst auf Erstkontakte verwendet",
    ],
    venCta: "Mit Venesa sprechen",
    venBadgeLabel: "KI-Agent",
    venBadgeName: "Venesa",
    venBadgeRole: "KI-Beraterin · Online",

    // Principles
    testEyebrow: "— Prinzipien / Versprechen",
    testTitle1: "Was",
    testTitle2: "wir",
    testTitle3: "versprechen",
    testLead:
      "Wir sind ein neues Studio und posten keine erfundenen Bewertungen. Stattdessen — vier Prinzipien, nach denen wir wirklich arbeiten.",
    testReviewBtn: "Erster Kunde werden",
    testPrev: "Vorheriges Prinzip",
    testNext: "Nächstes Prinzip",
    prin1Title: "Klein starten, dann skalieren",
    prin1Body: "Wir starten mit einer Leistung, zeigen Ergebnisse in 2–3 Wochen, dann erweitern wir. Keine langen Verträge — Sie können jederzeit stoppen.",
    prin1Badge: "01",
    prin2Title: "Zahlen jeden Montag",
    prin2Body: "Wöchentlicher Bericht mit klaren KPIs. Sie sehen was funktioniert hat, was nicht, und was wir in der nächsten Woche ändern. Kein Nebel, keine Floskeln.",
    prin2Badge: "02",
    prin3Title: "Keine garantierten Wunder",
    prin3Body: "Wir versprechen kein '100× in einer Woche' — das wäre gelogen. Wir versprechen messbaren Fortschritt und ehrliche Iteration. Ergebnisse hängen von Nische, Budget und Markt ab.",
    prin3Badge: "03",
    prin4Title: "Stopp-Loss eingebaut",
    prin4Body: "Wenn der Ansatz nach 6–8 Wochen nicht funktioniert, sagen wir es als Erste. Ihr Budget bleibt Ihnen, unsere Ethik bleibt uns. Integrität vor Rechnung.",
    prin4Badge: "04",

    // FAQ
    faqEyebrow: "— Häufige Fragen",
    faqTitle1: "Häufige",
    faqTitle2: "Fragen",
    faqLead:
      "Die häufigsten Fragen vor dem Start. Keine passende Antwort gefunden? Schreiben Sie uns — wir antworten innerhalb einer Stunde.",
    faqNote: "Schnellere Antwort nötig?",
    faqNoteLink: "Schreiben Sie uns auf Telegram →",
    faqStill: "Ihre Frage nicht dabei?",
    faqStillCta: "Fragen Sie uns direkt →",
    faq1q: "Was kosten Ihre Leistungen?",
    faq1a:
      "Wir nennen keine Preise vorab — wir besprechen sie nach dem Briefing, um eine auf Ihre Aufgabe zugeschnittene Preisspanne anzubieten. Typische Projekte starten ab ca. 1.000 $/Monat, der genaue Betrag hängt von Umfang und Zielen ab.",
    faq2q: "Wann sehe ich erste Ergebnisse?",
    faq2a:
      "Bei Werbung — erste Leads in der Regel nach 3–7 Tagen. Nach 2–3 Wochen ist klar, welche Anzeigen ziehen und welche nicht — wir skalieren die Gewinner. Automatisierung und KI-Bots wirken ab Tag eins. Bis Monatsende haben Sie eine belastbare Strategie, keine Vermutungen.",
    faq3q: "Arbeiten Sie mit meiner Branche?",
    faq3a:
      "Unsere Methodik ist ausgelegt für E-Commerce, Dienstleistungen, Transport, Mode-Einzelhandel, Auto-Zubehör und Beauty-Branche. Wenn Ihre Nische nicht dabei ist — kontaktieren Sie uns trotzdem, wir besprechen wie wir helfen können.",
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

    // Growth Simulator (levels-based with concrete descriptions)
    simEyebrow: "— 70× Wachstumssimulator",
    simTitle1: "Bauen",
    simTitle2: "Sie Ihren",
    simTitle3: "Stack.",
    simLead:
      "Ihr Wachstums-Kalkulator. Wählen Sie ein Level für jede Säule — sehen Sie, wie sie sich über 6 Monate multiplizieren. Basierend auf branchenüblichen Digital-Benchmarks.",
    simCurrent: "Was enthalten ist",
    simContribution: "Wachstumsbeitrag",
    simAdsTag: "01 / Werbung",
    simAdsName: "Werbung",
    simAdsDesc: "Wie viele bezahlte Kanäle wir betreiben",
    simAdsLvl0: "Keine",
    simAdsLvl0Desc: "Keine bezahlte Werbung — nur organischer Traffic",
    simAdsLvl1: "Starter",
    simAdsLvl1Desc: "Ein Kanal (Meta oder Google) mit Basis-Setup",
    simAdsLvl2: "Standard",
    simAdsLvl2Desc: "Zwei Kanäle (Meta + Google) mit regelmäßiger Optimierung",
    simAdsLvl3: "Voll",
    simAdsLvl3Desc: "Meta + Google + TikTok mit Kreativen und A/B-Tests",
    simAutoTag: "02 / Automatisierung",
    simAutoName: "Automatisierung",
    simAutoDesc: "Welche Prozesse automatisiert sind",
    simAutoLvl0: "Keine",
    simAutoLvl0Desc: "Alles manuell — Menschen bearbeiten Leads",
    simAutoLvl1: "Basis",
    simAutoLvl1Desc: "Annahme → Benachrichtigung → Tabelle",
    simAutoLvl2: "Mittel",
    simAutoLvl2Desc: "+ CRM-Integration, Auto-Berichte, Erinnerungen",
    simAutoLvl3: "Voll",
    simAutoLvl3Desc: "Komplettsystem: Leads, CRM, Rechnungen, Analytik",
    simAiTag: "03 / KI",
    simAiName: "KI-Beraterin",
    simAiDesc: "Wo Venesa arbeitet",
    simAiLvl0: "Keine",
    simAiLvl0Desc: "Keine KI-Beraterin — nur menschliche Kommunikation",
    simAiLvl1: "Website",
    simAiLvl1Desc: "Venesa auf der Website — qualifiziert Besucher",
    simAiLvl2: "Multi-Kanal",
    simAiLvl2Desc: "+ Telegram/Instagram — eine KI über alle Kanäle",
    simAiLvl3: "Voll",
    simAiLvl3Desc: "KI auf allen Eingängen + Content-Generierung",
    simResultEyebrow: "— Kombinierter Multiplikator",
    simMultiLabel: "Ihres aktuellen monatlichen Lead-Flows in 6 Monaten",
    simCompareLabel: "Heute",
    simCompareLabelAfter: "In 6 Monaten",
    simDeltaLabel: "Differenz",
    simLeadsUnit: "Leads/Monat",
    simFormula: "So rechnen wir",
    simFormulaDesc: "Jede Säule fügt ihren eigenen Wachstums-% hinzu. Sie werden miteinander multipliziert — so funktioniert Compounding. Die Basis von 100 Leads/Monat ist nur ein illustrativer Anker; Ihre tatsächliche Zahl gehört Ihnen.",
    simDisclaimer:
      "Eine Prognose auf Basis echter Digital-Marketing-Benchmarks, keine Garantie. Ihr Ergebnis hängt von Nische, Markt, Budget und Umsetzung ab. Wir geben ehrliche Zahlen, keine Wunderversprechen.",
    simCta: "Meinen Stack mit Venesa besprechen",

    // CTA
    ctaEyebrow: "— Kontakt aufnehmen",
    ctaEnd: "70× / 2026 →",
    ctaTitle1: "Bereit",
    ctaTitle2: "zu wachsen",
    ctaTitle3: "?",
    ctaSub:
      "Schreiben Sie uns auf Telegram oder per E-Mail — wir besprechen Ihre Aufgabe, erklären wie wir helfen können und teilen erste Ideen innerhalb einer Stunde. Unverbindlich, ohne Floskeln.",
    ctaPrimary: "Anfrage senden",
    ctaChannelsLabel: "oder schreiben Sie uns direkt",
    ctaTelegram: "Telegram",
    ctaMeta1: "Seventy Times · Werbung × Automatisierung × KI",
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
    ftDisclaimer: "Alle Wachstumsprognosen und Zahlen auf dieser Seite sind illustrativ. Tatsächliche Ergebnisse hängen von Nische, Budget und Umsetzungsqualität ab — Seventy Times garantiert keine konkreten Zahlen.",

    // Dividers
    divNext: "— weiter",
    divMeet: "— lernen Sie Venesa kennen",
    divProof: "— Kundenstimmen",
    divQuestions: "— Fragen",
    divTalk: "— Kontakt",
    divSimulator: "— modellieren Sie Ihr Wachstum",

    // Intro
    introTag1: "Werbung",
    introTag2: "Automatisierung",
    introTag3: "KI",
    introLocation: "USA → Weltweit",
    introLoading: "Laden…",
    introSkip: "Überspringen",

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
      "Hallo 👋 Mein Name ist Venesa, ich bin die KI-Beraterin bei Seventy Times.\n\nErzählen Sie mir ein wenig über Ihr Unternehmen — ich schlage die passende Lösung für Ihre Ziele vor.",
    chatName: "Venesa · KI-Beraterin",
    chatStatus: "Online",
    chatPh: "Nachricht eingeben...",
    chatLabel: "Venesa",
    chatError: "Verbindungsfehler. Bitte versuchen Sie es später erneut.",
    chatFallback: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    chatOpen: "Mit Venesa sprechen",
    chatClose: "Chat schließen",
    chatSend: "Senden",
    chatMessage: "Nachricht",
    chatAlt: "Venesa — KI-Beraterin bei Seventy Times",

    // Consent (shared between forms)
    consentPrefix: "Ich stimme der ",
    consentPrivacy: "Datenschutzerklärung",
    consentAnd: " und den ",
    consentTerms: "Nutzungsbedingungen",
    consentSuffix: " zu.",
    consentRequired:
      "Bitte stimmen Sie der Datenschutzerklärung und den Nutzungsbedingungen zu",

    // Lead form extras
    leadInvalidContact:
      "Das sieht nicht wie eine E-Mail oder ein @Benutzername aus — bitte prüfen",
    leadTooMany: "Zu viele Anfragen. Bitte versuchen Sie es in einer Stunde erneut.",
    leadCloseAria: "Formular schließen",

    // Review form
    reviewEyebrow: "— Bewertung abgeben",
    reviewTitle: "Teilen Sie Ihre",
    reviewTitleAccent: "Erfahrung",
    reviewSub:
      "Bewertungen können nur echte Kunden hinterlassen — wir vergeben einen persönlichen Code nach jedem Projekt. Noch keinen Code? Schreiben Sie uns auf Telegram, wir schicken einen.",
    reviewCode: "Kundencode",
    reviewCodePh: "Ihr persönlicher Code, z.B. ST-XYZ-42",
    reviewName: "Name",
    reviewNamePh: "Wie die Bewertung unterzeichnen",
    reviewRole: "Position & Unternehmen",
    reviewRolePh: "Z.B. Gründer, Becker Studio",
    reviewLocation: "Standort",
    reviewLocationPh: "Stadt, Land",
    reviewContent: "Bewertung",
    reviewContentPh:
      "Kurz — was wir gemacht haben, welche Ergebnisse, wie die Zusammenarbeit war.",
    reviewSubmit: "Bewertung senden",
    reviewSubmitting: "Code wird geprüft…",
    reviewSuccessTitle: "Bewertung erhalten",
    reviewSuccessText:
      "Vielen Dank für die netten Worte! Wir haben sie erhalten und fügen sie nach einer kurzen Moderation hinzu.",
    reviewClose: "Schließen",
    reviewFillAll: "Bitte füllen Sie alle Felder aus",
    reviewNote:
      "Bewertungen werden moderiert und manuell hinzugefügt — wir zeigen nur echte Geschichten.",
    reviewError: "Verbindungsfehler. Bitte versuchen Sie es später erneut.",
    reviewCloseAria: "Formular schließen",
    reviewTooMany:
      "Zu viele Versuche. Bitte versuchen Sie es später erneut.",

    // Footer — legal links
    ftLegal: "Rechtliches",
    ftPrivacy: "Datenschutzerklärung",
    ftTerms: "Nutzungsbedingungen",

    // Privacy Policy page
    privacyTitle: "Datenschutzerklärung",
    privacyUpdated: "Zuletzt aktualisiert: 20. April 2026",
    privacyDraftNote:
      "Dies ist ein Arbeitsentwurf für die frühe Geschäftsphase. Er wird nach der offiziellen Registrierung des Unternehmens mit einem Anwalt überarbeitet.",
    privacyBody: [
      {
        heading: "Wer wir sind",
        text: 'Seventy Times ist ein kleines Unternehmen mit Sitz in den USA, das als Einzelunternehmen (sole proprietorship) geführt wird; die offizielle Eintragung ist für eine spätere Phase geplant. Sie erreichen uns unter info@seventy-times.com.',
      },
      {
        heading: "Welche Daten wir erheben",
        text: 'Über das Anfrageformular: Ihren Namen, Kontakt (E-Mail oder Telegram), Firmennamen und eine Beschreibung Ihrer Aufgabe. Über das Bewertungsformular: Name, Position, Standort, Bewertungstext und persönlichen Kundencode. Über den Chat mit Venesa: den Text der an uns gesendeten Nachrichten. Wir erheben keine Zahlungsdaten und verwenden keine Tracking-Cookies.',
      },
      {
        heading: "Warum wir Daten erheben",
        text: 'Ausschließlich um uns bei Ihnen zu melden und die angeforderte Leistung zu erbringen. Wir verkaufen keine Daten, geben sie nicht an Werbenetzwerke weiter und nutzen sie nicht zum Profiling.',
      },
      {
        heading: "Wo Daten gespeichert werden",
        text: 'Anfragen und Bewertungen werden an unseren internen Telegram-Chat weitergeleitet. Website-Logs werden bei unserem Hosting-Anbieter (Vercel) in technischer Form gespeichert und enthalten keine persönlichen Daten. Der Chat mit Venesa wird über die Anthropic-API für die Antwortgenerierung verarbeitet.',
      },
      {
        heading: "Wie lange wir Daten aufbewahren",
        text: 'Anfragen und Bewertungen — für die Dauer des Projekts plus ein Jahr, danach werden sie gelöscht. Der Chat-Verlauf wird nur in Ihrem Browser gespeichert und gelöscht, wenn Sie ihn löschen.',
      },
      {
        heading: "Ihre Rechte",
        text: 'Sie können jederzeit an info@seventy-times.com schreiben und Folgendes anfordern: Einsicht, welche Daten wir über Sie haben; Korrektur; oder Löschung. Wir antworten innerhalb von 30 Tagen.',
      },
      {
        heading: "Cookies",
        text: 'Wir verwenden einen einzigen technischen Cookie, um Ihre gewählte Oberflächensprache zu speichern. Kein Tracking — rein zur Bequemlichkeit.',
      },
      {
        heading: "Kinder",
        text: 'Die Website richtet sich nicht an Kinder unter 16 Jahren. Wir erheben wissentlich keine Daten von Minderjährigen.',
      },
      {
        heading: "Änderungen",
        text: 'Sobald das Unternehmen offiziell registriert ist, wird diese Richtlinie mit einem Anwalt überarbeitet. Die aktuelle Version ist ein ehrliches Minimum für die frühe Phase.',
      },
    ],

    // Terms of Use page
    termsTitle: "Nutzungsbedingungen",
    termsUpdated: "Zuletzt aktualisiert: 20. April 2026",
    termsDraftNote:
      "Dies ist ein Arbeitsentwurf für die frühe Geschäftsphase. Er wird nach der offiziellen Registrierung des Unternehmens mit einem Anwalt überarbeitet.",
    termsBody: [
      {
        heading: "Allgemeines",
        text: 'Die Seite seventy-times.com wird von Seventy Times betrieben, einem kleinen Unternehmen in den USA. Durch die Nutzung der Website akzeptieren Sie diese Bedingungen.',
      },
      {
        heading: "Was wir versprechen",
        text: 'Wir beschreiben unsere Leistungen ehrlich, besprechen Preise individuell und vereinbaren konkrete KPIs vor dem Start. Der Chat mit Venesa ist ein Hilfswerkzeug, kein rechtliches Angebot.',
      },
      {
        heading: "Was wir nicht versprechen",
        text: "Kein ‚garantiertes 100× in einer Woche‘. Die tatsächlichen Ergebnisse hängen von Nische, Budget, Markt und Umsetzungsqualität ab. Alle Zahlen auf der Website und im Growth Simulator sind illustrativ.",
      },
      {
        heading: "Geistiges Eigentum",
        text: 'Alle Texte, Designs und der Code dieser Seite gehören Seventy Times. Kopieren oder Wiederverwenden ist ohne Erlaubnis nicht gestattet. Die Marken "Seventy Times", "70×" und verwandte Elemente sind unser Eigentum.',
      },
      {
        heading: "Formulare und Bewertungen",
        text: 'Mit dem Absenden des Anfrageformulars bestätigen Sie, dass die Angaben korrekt und freiwillig gemacht sind. Bewertungen erfordern einen persönlichen Code, der an echte Kunden vergeben wird; gefälschte Bewertungen werden nicht veröffentlicht.',
      },
      {
        heading: "Haftungsbeschränkung",
        text: 'Die Website wird „wie besehen" bereitgestellt. Wir bemühen uns, dass alles funktioniert, garantieren aber keine 24/7-Verfügbarkeit und nicht, dass alle Informationen zu 100% aktuell sind. Entscheidungen auf Basis der Website-Inhalte liegen in Ihrer Verantwortung.',
      },
      {
        heading: "Anwendbares Recht",
        text: 'Diese Bedingungen unterliegen dem Recht der USA. Streitigkeiten werden, wenn möglich, im direkten Dialog gelöst — schreiben Sie an info@seventy-times.com.',
      },
      {
        heading: "Änderungen",
        text: 'Wir können diese Bedingungen aktualisieren. Wesentliche Änderungen werden durch ein aktualisiertes Datum oben auf der Seite markiert.',
      },
    ],

    legalBack: "← Zurück zur Startseite",
  },
};

export type Dictionary = typeof dict.ru;

export function getDictionary(locale: Locale): Dictionary {
  return dict[locale] as Dictionary;
}
