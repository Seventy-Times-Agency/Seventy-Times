# Aicore Website

Лендинг AI-маркетингового агентства Aicore на Next.js 14 с живым AI-консультантом на базе Claude.

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
| Контакты (Telegram, email) | `src/data/siteConfig.ts` |
| Системный промпт AI-консультанта | `src/lib/systemPrompt.ts` |
| Модель Claude | env `ANTHROPIC_MODEL` или `src/app/api/chat/route.ts` |

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
