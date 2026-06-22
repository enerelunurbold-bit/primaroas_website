# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (flat config, eslint.config.mjs)
```

## Tech Stack

- **Next.js 16** with App Router (React 19, TypeScript 5)
- **Tailwind CSS v4** via `@tailwindcss/postcss` plugin
- Path alias: `@/*` maps to project root

## Architecture

This is a single-page marketing site for PrimaRoas (software development company). The entire site lives in:

- `app/layout.tsx` — Root layout with global metadata
- `app/page.tsx` — All page content: nav, hero, services, AI integration, resources, footer
- `app/globals.css` — Complete styling: Tailwind import + extensive custom CSS with CSS custom properties and keyframe animations

There are no additional routes, components, or API endpoints. All UI is in `page.tsx` as a single `Home` component with inline data arrays for cards/solutions/stories.

## Styling

CSS uses custom properties defined in `:root` (`--blue`, `--navy`, `--ink`, `--mist`, `--line`). The stylesheet is large (~1700 lines) with elaborate SVG/CSS animations for the hero section network visualization and responsive breakpoints at 760px. Tailwind classes are used sparingly alongside custom CSS.
