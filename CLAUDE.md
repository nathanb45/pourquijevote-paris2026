# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Pour qui je vote ?" — a Paris 2026 municipal election tool with two features: an AI chat interface (Claude-powered) for candidate analysis, and a political alignment quiz. Built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, and shadcn/ui.

## Commands

```bash
bun dev          # Start dev server
bun run build    # Production build
bun run lint     # ESLint
bun start        # Start production server
```

Package manager is **Bun** (not npm/yarn).

## Architecture

- **`app/`** — Next.js App Router pages and API routes
  - `page.tsx` — Home/chat page
  - `quiz/page.tsx` — Quiz page
  - `api/chat/route.ts` — Streaming Claude API endpoint (uses prompt caching via `anthropic-beta` header, system prompt from `system_prompt.md`)
- **`components/`** — Feature-based organization
  - `chat/` — Chat UI (candidate cards, analysis boxes, suggested/follow-up questions)
  - `quiz/` — Quiz flow (intro → questions → results with scoring)
  - `ai-elements/` — Reusable AI chat primitives (conversation, message, prompt-input)
  - `ui/` — shadcn/ui components (new-york style)
- **`lib/`** — Utilities and data
  - `data/candidates.ts` — 6 Paris 2026 candidates
  - `data/quiz-questions.ts` — Questions with candidate positions
  - `quiz-scoring.ts` — Weighted scoring algorithm (priority-based, normalized 0-100%)
  - `types.ts` — Shared TypeScript interfaces

## Key Patterns

- Server Components by default; `'use client'` only for interactive components
- Chat API streams JSON responses from Claude, parsed and rendered client-side
- Quiz uses local React state (no global store): view transitions, answer accumulation, then scoring
- Path alias: `@/*` maps to project root
- Styling: Tailwind CSS 4 with CSS variables, custom palette (navy, red-accent, beige), fonts DM Sans + DM Serif Display

## Environment Variables

- `ANTHROPIC_API_KEY` — Required for the chat API route

## Code Style

- Prettier: single quotes, no semicolons, trailing commas, 100 char width
