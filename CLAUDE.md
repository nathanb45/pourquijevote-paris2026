# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Pour qui je vote ?" — a Paris 2026 municipal election tool with two features: an AI chat interface (Claude-powered) for candidate analysis, and a political alignment quiz. Built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, and shadcn/ui.

## Commands

```bash
bun dev          # Start dev server
bun run build    # Production build
bun run lint     # ESLint
bun run format   # Prettier format all files
bun start        # Start production server
```

Package manager is **Bun** (not npm/yarn). Never use npm or yarn.

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
- All UI text must be in **French**

## Environment Variables

- `ANTHROPIC_API_KEY` — Required for the chat API route

## Code Style

- Prettier: single quotes, no semicolons, trailing commas, 100 char width
- **Never use emojis** in code, UI text, comments, or commit messages

---

## STRICT RULES

These rules are **mandatory**. Never break them.

### Always Pull First

At the start of every session, **before doing anything else**, run:

```bash
git pull
```

This ensures you're working on the latest code. Never start coding on a stale branch.

### Always Plan First

Before implementing ANY non-trivial task, **use the `EnterPlanMode` tool** to plan the approach and get user approval. This includes: new features, multi-file changes, refactors, new pages, new components, and anything touching more than 2-3 lines. Only skip planning for single-line fixes or typos.

### Always Use Context7

Before implementing anything that involves a library (Next.js, React, Tailwind, shadcn, Radix, etc.), **use the context7 MCP server** (`resolve-library-id` then `query-docs`) to fetch up-to-date documentation. Do not rely on memory alone — always verify with context7 first.

### Styling: shadcn/ui + Tailwind ONLY

- **Every UI element** must use shadcn/ui components (`components/ui/`) or Tailwind CSS classes. No exceptions.
- Before creating any new UI element, check if a shadcn component already exists in `components/ui/`. If not, add it via `bunx shadcn@latest add <component>`.
- Never install other CSS/UI libraries (no Material UI, no Chakra, no Ant Design, no Bootstrap, no Mantine, no styled-components, no CSS modules, no raw `<style>` tags).
- Always use the `cn()` utility from `@/lib/utils` for conditional class merging.
- Respect the existing design tokens in `app/globals.css` (colors, fonts, spacing, border-radius).

### Existing Design System

Do NOT change these unless explicitly asked:
- **Colors:** Navy (#0D1F3C), Red accent (#FF4242), Beige (#F7F6F2), Ink dark/mid/light
- **Fonts:** DM Sans (body), DM Serif Display (headings)
- **Border radius:** 0.625rem base

### No Wild Dependencies

Do not install new packages without asking the user first. Especially:
- No new CSS/UI frameworks
- No state management libraries (no Redux, Zustand, Jotai)
- No new animation libraries (use Tailwind animations or CSS)
- **Icons:** Use `lucide-react` (already installed). No other icon libraries.

### Don't Break Existing Patterns

- Keep the streaming chat architecture as-is (SSE + client-side parsing)
- Keep quiz scoring logic in `lib/quiz-scoring.ts`
- Keep candidate data in `lib/data/candidates.ts`
- Keep types in `lib/types.ts`
- Don't add new pages or API routes without asking

### File & Folder Creation Rules

The project structure is **locked**. Do not create new folders or files outside the existing structure without explicit user approval.

**Allowed folders** (you may add files here):

- `components/chat/` — chat feature components
- `components/quiz/` — quiz feature components
- `components/ai-elements/` — chat primitives
- `components/ui/` — shadcn components ONLY (via `bunx shadcn@latest add`)
- `app/` — pages and layouts (ask before adding new routes)
- `app/api/` — API routes (ask before adding new endpoints)
- `lib/` — utilities and helpers
- `lib/data/` — static data files
- `public/` — static assets

**Forbidden without asking:**

- Creating new top-level folders (no new top-level folders like `hooks/`, `stores/`, `services/`, `utils/`, `styles/`, etc. if they already exist)
- Creating new subfolders inside `components/` (no `components/shared/`, `components/common/`, etc.)
- Creating config files at the root
- Creating `.env` files (tell the user what vars are needed instead)

### When Stuck

If something doesn't work after **2 attempts**, STOP. Do not:

- Try random fixes hoping something sticks
- Install new packages to work around the issue
- Rewrite large chunks of code to avoid the problem
- Delete and recreate files

Instead: **explain what failed, what you tried, and ask the user what to do.**

### Post-Generation Validation

After every code generation or modification, **always run:**

```bash
bun run post-gen
```

This runs lint --fix + build. If it fails, fix the errors before moving on. Never skip this step.

---

## Frontend Design Guidelines

When building or modifying UI, follow these principles to create distinctive, polished interfaces. Avoid generic "AI slop" aesthetics.

### Design Thinking

Before coding UI, consider:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Commit to a clear aesthetic direction that fits the project (this project: clean, editorial, civic — not flashy startup or corporate)
- **Differentiation**: What makes this memorable?

### Aesthetics Rules

- **Typography**: Use the project fonts (DM Sans + DM Serif Display). Never fall back to Inter, Arial, Roboto, or system fonts.
- **Color & Theme**: Use the existing CSS variables. Dominant colors with sharp accents — don't spread colors evenly.
- **Motion**: Subtle, purposeful animations only. CSS transitions preferred. One well-orchestrated entrance > scattered micro-interactions.
- **Spatial Composition**: Generous negative space. Asymmetry is fine. Don't default to boring centered grids.
- **Backgrounds & Details**: Create atmosphere — gradients, subtle textures, layered transparencies. No flat white walls.

### What to NEVER Do

- Generic AI aesthetics: purple gradients on white, Inter font, cookie-cutter card layouts
- Overuse of shadows and rounded corners to fake "modern" look
- Rainbow gradients or neon accents that don't match the civic/editorial tone
- Cluttered layouts with no hierarchy

---

## Git Commits

When committing, always create **atomic commits** (one commit per logical change).

### Flow

1. `git status` + `git diff` to review all changes
2. Split changes into the **smallest possible logical units** — each commit does ONE thing
3. For each chunk: `git add <files>` → `git diff --staged` → `git commit -m "type(scope): description"`
4. Repeat until working tree is clean

### Conventional Commits format

```
type(scope): description
```

Prefixes:

- `feat` — new feature
- `fix` — bug fix
- `refactor` — code change, no behavior change
- `docs` — documentation only
- `test` — tests only
- `perf` — performance
- `chore` — maintenance
- `ci` — CI config
- `build` — build system / deps
- `style` — formatting, whitespace

### Rules

- **Max 60 characters** for the entire message
- Present tense ("add", not "added")
- Be concise: drop filler words ("the", "a", "for")
- Scope is optional but recommended
- **NEVER add "Co-Authored-By" or mention Claude/AI in commits**

### Examples

```bash
feat(icons): add category filter icons     # 38 chars ✓
fix(db): handle null category               # 30 chars ✓
refactor(ui): simplify button styles        # 37 chars ✓
feat(quiz): add priority weighting          # 35 chars ✓
fix(chat): prevent empty message submit     # 38 chars ✓
```

### Atomic splitting examples

- New icons → one commit PER icon if unrelated
- Database: types → one commit, migration → another
- Formatting changes → separate commit from logic changes
- Import cleanup → separate commit

---

## Keep CLAUDE.md Up to Date

**After every structural change**, update this file. This is mandatory. Examples:

- Added a new page → update the Architecture section
- Added a new component folder → update Architecture + Allowed folders
- Added a new lib file → update Architecture
- Changed the color palette or fonts → update Existing Design System
- Added a new environment variable → update Environment Variables
- Installed a new package → mention it in the relevant section

If you don't update CLAUDE.md, the next session (yours or another developer's) will have **stale context** and make wrong decisions. Treat this file as the single source of truth for the project structure.

### Keep README.md Reasonable

If a change affects what a new developer needs to know (new prerequis, stack change, new script, major feature added/removed), update `README.md` too. No need to update it for minor code changes.
