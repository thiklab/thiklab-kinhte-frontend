# Nhịp Kinh Tế (Economic Pulse)

A clean, modern web app that puts Vietnam's economy side by side with the world, year by year from 1986 to 2026.

## Features

- **Parallel timeline** – pick any year and see which economic phase Vietnam and the world were in, plus the key events around it.
- **Event pages** – each event links to a detail page with background from Vietnamese Wikipedia (CC BY-SA 4.0).
- **GDP growth chart** – annual real GDP growth of Vietnam vs. China, the US and Thailand, built with Chart.js.
- **SEO-ready** – per-page metadata, JSON-LD, sitemap and Open Graph images.

## Tech stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Chart.js · optional Redis cache

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Set `REDIS_URL` to enable caching of Wikipedia content (optional).

## Data

Economic figures are approximate, drawn from the World Bank, Vietnam's General Statistics Office and the US BEA; recent years are preliminary. Verify against official sources before citing.
