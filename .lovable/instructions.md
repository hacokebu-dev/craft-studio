# HACO & KEBU (H·C·K·B) Website — Workspace Instructions

## Project Overview

HACO & KEBU is a bilingual (Korean/English) portfolio and blog website for a solo design studio. The brand stands for "Have Conviction and Keep Building."

- **Live URL**: https://hacokebu.com
- **Deployment**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **No backend** — purely static site, no database or auth needed

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui components
- react-router-dom (SPA with client-side routing)
- react-i18next (i18n — Korean/English)
- react-markdown + rehype-raw + remark-gfm (Markdown rendering)
- react-helmet-async (SEO meta tags)
- framer-motion (animations)
- SUIT Variable font (Korean/English)

## Design System

### Color Palette (Black, Ivory, Red)
- **Black** `#111110` — `--black: 60 4% 7%` (background)
- **Ivory** `#FFFFDF` — `--ivory: 60 100% 94%` (foreground/text)
- **Red** `#B82D1E` — `--red: 4 74% 42%` (primary/accent)
- **Red Active** — `--red-active: 4 86% 58%` (hover state)

### Rules
- Always use semantic CSS variables (`--background`, `--foreground`, `--primary`, `--accent`, `--ivory`, `--red`, etc.)
- Never hardcode colors like `text-white`, `bg-black` in components
- All colors are HSL format in `index.css` and `tailwind.config.ts`
- Dark-on-light design — ivory text on black background
- No light mode; single dark theme only

### Typography
- Font: `SUIT Variable` (loaded externally)
- Bold, oversized headings are part of the brand identity

### Layout
- Max container width: `1400px` (`.container-main`)
- Responsive padding: `px-8` (desktop), `px-4` (mobile)

## Routing & i18n

- English routes: `/`, `/project`, `/project/:id`, `/blog`, `/blog/:id`
- Korean routes: `/ko`, `/ko/project`, `/ko/project/:id`, `/ko/blog`, `/ko/blog/:id`
- Language is determined by URL prefix (`/ko` = Korean, otherwise English)
- Translations live in `src/i18n/locales/en.json` and `src/i18n/locales/ko.json`

## Content (Markdown-based)

- **Blog posts**: `src/content/blog/en/*.md` and `src/content/blog/ko/*.md`
- **Projects**: `src/content/projects/en/*.md` and `src/content/projects/ko/*.md`
- Frontmatter fields: `id`, `title`, `date`, `category` (blog) or `number`, `thumbnail` (projects)
- Content is loaded via Vite's `import.meta.glob` with `?raw` query
- Parsed by custom frontmatter parser in `src/lib/content.ts`

### Adding new content
1. Create `.md` file in both `en/` and `ko/` directories
2. Include proper frontmatter with unique `id`
3. Content will auto-appear — no routing changes needed

## Build Scripts (run during production build)

- `scripts/generate-sitemap.ts` — generates `dist/sitemap.xml` with hreflang alternates
- `scripts/generate-rss.ts` — generates `dist/rss.xml` feed
- `scripts/generate-spa-redirects.ts` — generates `index.html` copies for SPA routing on GitHub Pages (static routes + dynamic blog/project routes auto-detected from markdown `id` fields)

## Static Files

- `public/` — static assets served at root (images, favicon, privacy page, robots.txt, etc.)
- `public/privacy/index.html` — standalone privacy policy page (not part of React SPA)
- `public/assets/` — blog/project images referenced in Markdown as `/assets/filename.jpg`

## Key Conventions

- Keep components small and focused
- Use `@/` path alias for imports
- Blog images use `<img src="/assets/...">` format (standard HTML, no space around `=`)
- SEO: each page sets meta tags via react-helmet-async
- hreflang: `HreflangTags` component in `Layout` auto-inserts `<link rel="alternate" hreflang="en|ko|x-default">` and `<html lang>` on every page
- **Trailing Slash**: 모든 URL(sitemap, canonical, hreflang, og:url)은 반드시 `/`로 끝나야 함. GitHub Pages의 301 리디렉션으로 인한 Google 색인 오류 방지를 위한 필수 규칙
- Unicorn Studio script is embedded in the Hero section
