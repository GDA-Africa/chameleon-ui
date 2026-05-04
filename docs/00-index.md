---
title: Chameleon UI Knowledge Base
audience: AI coding agents
version: 1.0.9
last_updated: 2026-05-01
---

# Chameleon UI — Knowledge Base for AI Agents

This knowledge base is optimized for **LLM-based coding assistants** generating Chameleon UI code. Every section is structured to be loaded into context, retrieved by keyword, and cross-referenced with the machine-readable manifest at `src/app/components/chameleon/ai-manifest.ts`.

If you are an AI agent generating code that imports `@chameleon-ui-lib/react`, start with `01-overview.md`, then load the specific document you need from the index below.

## Document Index

| File | Purpose | When to load |
|------|---------|--------------|
| `01-overview.md` | What Chameleon UI is, what it ships, where it lives. | Always — first read |
| `02-architecture.md` | Module layout, exports, build pipeline, how components compose. | Before adding/modifying components |
| `03-themes.md` | Theme tokens, the 5 design languages, dark mode contracts, intensity controls. | Any styling/theming task |
| `04-components-catalog.md` | Auto-extracted catalog of every exported component with prop signatures. | Picking a component, validating props |
| `05-ai-integration.md` | The AI manifest, validators, helper utilities, and how to query them. | Generating code, validating output |
| `06-recipes.md` | Copy-paste-ready code patterns (forms, dashboards, auth, etc.). | Composing higher-level UIs |
| `07-development.md` | Setup, scripts, tests, lint, build, publish. | Local dev, troubleshooting |
| `08-glossary.md` | Terminology used across the codebase. | Disambiguating prop names, jargon |

## Source-of-Truth Files

These are the files an agent should treat as canonical when its training data and the docs disagree:

- **Theme tokens & provider:** `src/app/components/chameleon/context.tsx`
- **Atom components:** `src/app/components/chameleon/atoms.tsx`
- **Molecule components:** `src/app/components/chameleon/molecules.tsx`
- **Composite/organism components:** `src/app/components/chameleon/composites.tsx`
- **Templates:** `src/app/components/chameleon/templates.tsx` (re-exports `comprehensive-templates.tsx` and `comprehensive-templates-part2.tsx`)
- **Auth components:** `src/app/components/chameleon/auth-components.tsx`
- **Animations:** `src/app/components/chameleon/animations.tsx`
- **Public barrel:** `src/app/components/chameleon/index.ts`
- **AI manifest (authoritative for agents):** `src/app/components/chameleon/ai-manifest.ts`
- **AI helpers:** `src/app/components/chameleon/ai-helpers.tsx`

## Hard Rules for AI-Generated Code

1. **Never hardcode colors.** Use CSS variables: `var(--foreground)`, `var(--background)`, `var(--primary)`, `var(--card)`, `var(--card-foreground)`, `var(--muted)`, `var(--muted-foreground)`, `var(--border)`, `var(--accent)`, `var(--ring)`, `var(--radius)`. The token map for every theme/mode lives in `context.tsx`.
2. **Wrap your tree in `<ChameleonProvider>`** — components throw if mounted outside it.
3. **Use `useThemeClasses()`** rather than authoring per-theme CSS. The hook returns ready-made class strings that already encode the 5 design languages.
4. **Pass `animated` rather than re-implementing motion.** It is wired into `animationPresets[theme]` for theme-specific physics.
5. **Tailwind v4 is required** — there is no `tailwind.config.ts`. Configuration is via the Vite plugin and CSS directives.
6. **Peer deps are React 18.3.1.** Do not assume React 19 features even though `@types/react` resolves to 19.

## Dependency Surface (top-level)

`react@18.3.1`, `react-dom@18.3.1`, Radix UI primitives (Tabs, Dialog, Popover, etc.), `motion@12` (formerly framer-motion), `recharts@2.15`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `date-fns`, `react-hook-form`, `react-day-picker`, `react-dnd`, `embla-carousel-react`, `vaul`, `cmdk`, `sonner`. Full list: `package.json`.
