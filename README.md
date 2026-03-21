<div align="center">

<img src="public/logo.svg" alt="Zad Logo" width="120"/>

# Zad

**منصة تعليمية إسلامية لتدبر القرآن، ودراسة المتون، والاستماع للبودكاست**

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PWA-Supported-5A0FC8?style=flat-square&logo=pwa&logoColor=white" alt="PWA" />
</p>

</div>

---

## About

Zad is an open-source Islamic web application designed to provide a focused and distraction-free environment for spiritual learning. It combines a live Quran reader, authentic Hadith collections with commentary, Islamic book viewer, podcast library, and a Ramadan daily planner into a single Arabic-first platform.

<p align="center">
  <img src="public/landing.avif" alt="Light Mode" width="48%" style="border-radius: 8px;" />
  <img src="public/landingDark.avif" alt="Dark Mode" width="48%" style="border-radius: 8px;" />
</p>

---

## Features

- **Quran Reader** — Real-time Surah and Ayah fetching via the Quran API with Incremental Static Regeneration (ISR) caching.
- **Hadith Collections** — Specialized viewer for studying Hadith texts with scholarly commentary (e.g., Al-Arba'in An-Nawawiyyah with Ibn Uthaymeen's explanation).
- **Islamic Books Viewer** — Distraction-free reader for annotated Islamic texts rendered from Markdown.
- **Podcast Library** — Integrated audio player with transcript support for Islamic educational podcasts.
- **Ramadan Planner** — Daily task checklist with visual progress tracking for spiritual goals.
- **Exams** — Interactive quizzes to test comprehension of studied content.
- **Dark Mode** — Class-based theme switching with CSS variables for comfortable night reading.
- **PWA Support** — Installable as a Progressive Web App for offline-capable access.
- **RTL-First Design** — Fully right-to-left interface with Arabic typography (Amiri, Aref Ruqaa, Noto Sans Arabic).
- **Static Generation** — Pages pre-rendered at build time via SSG with `generateStaticParams` for instant navigation.

---

## Tech Stack

| Layer     | Technology              |
| --------- | ----------------------- |
| Framework | Next.js 16 (App Router) |
| UI        | React 19                |
| Styling   | Tailwind CSS 4          |
| Language  | TypeScript 5            |
| PWA       | @ducanh2912/next-pwa    |
| Icons     | Lucide React            |
| Markdown  | react-markdown          |
| Email     | EmailJS                 |

---

## Project Structure

```
zad-app/
├── app/                   # Next.js App Router
│   ├── books/             # Islamic books pages
│   ├── exam/              # Interactive exams
│   ├── feedback/          # User feedback form
│   ├── hadiths/           # Hadith collections
│   ├── plan/              # Ramadan daily planner
│   ├── podcast/           # Podcast pages
│   ├── quran/             # Quran reader
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── home/              # Landing page sections
│   ├── layout/            # Header, Footer
│   ├── quran/             # Quran sidebar & UI
│   ├── viewers/           # Content viewers (Books, Hadith, Exam, etc.)
│   ├── ui/                # Shared UI components
│   └── forms/             # Form components
├── lib/
│   ├── services/          # API fetchers (Quran API)
│   ├── content/           # Static content & transcripts
│   ├── contentData.tsx    # Books & sections metadata
│   └── types/             # TypeScript type definitions
├── providers/
│   ├── ThemeProvider.tsx   # Dark/Light mode context
│   └── SidebarProvider.tsx # Sidebar state context
└── public/                # Static assets & PWA manifest
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/OsmanTaher/zad-app.git
cd zad-app
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## License

This project is open source. Feel free to use, modify, and distribute it for educational and Islamic benefit.
