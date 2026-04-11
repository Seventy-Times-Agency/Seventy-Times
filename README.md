# IAA agency Website

Лендинг AI-маркетингового агентства IAA (ads · automation · AI) на Next.js 14 с живым AI-консультантом на базе Claude.

## Что внутри

- **Next.js 14** (App Router, TypeScript)
- **framer-motion** — scroll-reveal и интерактивные анимации
- **CSS Modules** — изолированные стили без лишних зависимостей
- **Серверный прокси `/api/chat`** — ключ Anthropic хранится в env и не попадает в браузер
- **Claude Sonnet 4.5** — живой диалог прямо на лендинге

## Запуск локально

```bash
npm install
cp .env.example .env.local     # вставить реальный ANTHROPIC_API_KEY
npm run dev
```

Сайт поднимется на http://localhost:3000.

## Деплой на Vercel

1. Подключить репозиторий в Vercel — фреймворк определится автоматически.
2. В `Settings → Environment Variables` добавить `ANTHROPIC_API_KEY`.
3. Deploy.

## Где менять контент

| Что | Где |
|---|---|
| Услуги и их содержимое | `src/data/services.ts` |
| Шаги процесса | `src/data/process.ts` |
| Отзывы (плейсхолдеры) | `src/data/testimonials.ts` |
| FAQ | `src/data/faq.ts` |
| Контакты (Telegram, email) | `src/data/siteConfig.ts` |
| Системный промпт Венесы | `src/lib/systemPrompt.ts` |
| Модель Claude | env `ANTHROPIC_MODEL` или `src/app/api/chat/route.ts` |

## Форма заявки

Любой элемент с `href="#lead"` открывает модалку с формой (имя,
контакт, бизнес, задача). Модалка смонтирована глобально в
`src/app/layout.tsx`, триггеры сейчас стоят в `Nav`, `Hero` и `CTA`.

Обработчик отправки — `src/app/api/lead/route.ts`:

- Валидирует и урезает поля.
- Всегда пишет заявку в консоль сервера (видно в **Vercel → Logs**).
- Если в env заданы `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` —
  дополнительно отправляет форматированное сообщение в указанный
  Telegram-чат. Подробности настройки см. в `.env.example`.

## Структура

```
src/
├── app/
│   ├── api/chat/route.ts    # серверный прокси к Anthropic
│   ├── layout.tsx           # SEO, шрифты, глобальный фон
│   ├── page.tsx             # сборка секций
│   └── globals.css          # reset + переменные + keyframes
├── components/              # Nav, Hero, Services, ChatDemo, CTA, Footer, ...
├── data/                    # контент сайта
└── lib/                     # утилиты и промпты
```
