# Pour qui je vote ? -- Paris 2026

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Claude AI](https://img.shields.io/badge/Claude_AI-D97757?style=for-the-badge&logo=anthropic&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)

Outil d'aide au vote pour les elections municipales de Paris 2026. Deux fonctionnalites :

- **Chatbot IA** -- Pose des questions sur les candidats et leurs programmes. Analyse comparative alimentee par Claude.
- **Quiz politique** -- Reponds a des questions sur les enjeux parisiens et decouvre avec quel candidat tu es le plus aligne.

## Prerequis

- [Bun](https://bun.sh/) (package manager)
- Cle API Anthropic (`ANTHROPIC_API_KEY`)

## Installation

```bash
git clone <repo-url>
cd pourquijevote-paris2026
bun install
```

Creer un fichier `.env.local` :

```
ANTHROPIC_API_KEY=sk-ant-...
```

## Lancer le projet

```bash
bun dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Description |
|---|---|
| `bun dev` | Serveur de dev |
| `bun run build` | Build production |
| `bun run lint` | ESLint |
| `bun run format` | Prettier |
| `bun run post-gen` | Format + lint fix + build |

## Stack

- **Framework** -- Next.js 16 (App Router)
- **UI** -- shadcn/ui + Tailwind CSS 4
- **IA** -- Anthropic Claude (streaming SSE)
- **Icones** -- Lucide React
- **Fonts** -- DM Sans, DM Serif Display
