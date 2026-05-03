---
title: Overview
purpose: What Chameleon UI is and how an AI agent should reason about it.
---

# Overview

## What it is

Chameleon UI is a multi-theme React component library distributed as `@chameleon-ui-lib/react`. Every component automatically adapts to **5 design languages** (`material`, `simple`, `minimalist`, `glassy`, `liquid`) in both `light` and `dark` modes — that's 10 visual variants per component, with no per-theme code on the consumer side.

The package is built for **AI-agent consumption**: components ship with JSDoc, a machine-readable manifest (`ai-manifest.ts`), validation helpers (`ai-helpers.tsx`), and copy-paste recipes. An agent generating UI code should be able to do so on the first try without trial-and-error.

## Mental model

Think of it as three layers stacked on top of Tailwind v4 + Radix:

```
┌────────────────────────────────────────────────────┐
│  Templates  (full pages: Auth, Dashboard, etc.)    │
├────────────────────────────────────────────────────┤
│  Composites/Organisms                              │
│  (DataTable, KanbanBoard, ThemeChart, ...)         │
├────────────────────────────────────────────────────┤
│  Molecules  (Card, Tabs, Dialog, Alert, StatCard)  │
├────────────────────────────────────────────────────┤
│  Atoms  (Button, Input, Badge, Avatar, ...)        │
├────────────────────────────────────────────────────┤
│  Theme Engine  (ChameleonProvider + useThemeClasses)│
├────────────────────────────────────────────────────┤
│  Tailwind v4 + CSS variables (--primary, --bg, ...)│
└────────────────────────────────────────────────────┘
```

Each layer composes the one below it. An atom never reaches into Tailwind directly for colors — it pulls class strings from `useThemeClasses()`. A molecule composes atoms. A template composes molecules and organisms.

## What ships

| Category | Count | Where |
|---------|-------|-------|
| Atoms | 9 exported components | `atoms.tsx` |
| Molecules | 11 exported components (+ Card sub-parts) | `molecules.tsx` |
| Composites/Organisms | 10 exported components | `composites.tsx` |
| Templates | 14 exported components | `templates.tsx` (+ `comprehensive-templates*.tsx`) |
| Auth components | 10 exported components | `auth-components.tsx` |
| Animation primitives | 4 components + 1 hook + 1 preset registry | `animations.tsx` |
| Theme primitives | `ChameleonProvider`, `useChameleon`, `useThemeClasses` | `context.tsx` |

The README's "45+ components" figure refers to the user-facing total across categories. The exact list with prop schemas is in `04-components-catalog.md`.

## Public API surface

The package barrel is `src/app/components/chameleon/index.ts`:

```ts
export * from "./context";       // ChameleonProvider, hooks, types, translations
export * from "./atoms";         // Button, Input, Badge, Spinner, Avatar, Toggle, Progress, Tooltip, DatePicker
export * from "./molecules";     // Card*, Tabs*, Dialog*, StatCard, PricingCard, Alert, Separator, Breadcrumb, Select, Textarea
export * from "./composites";    // DataTable, ThemeChart, CommandPalette, KanbanBoard, Timeline, FileUploader, NotificationFeed, MultiStepForm, CalendarWidget, MediaGallery
export * from "./animations";    // Animated, AnimatedList, AnimatedPage, InteractiveCard, useAnimation, animationPresets
export * from "./utils";         // cn, hexToRgb, generateVariations, getContrastColor
```

`templates.tsx` and `auth-components.tsx` are exported from the package as top-level files but are not in the barrel — consumers import them by path.

## Distribution

- npm: `@chameleon-ui-lib/react@1.0.8`
- Built outputs: `dist/index.js` (ESM), `dist/index.cjs` (CJS), `dist/index.d.ts` (types), `dist/styles.css` (compiled Tailwind)
- Build pipeline: `vite build` → `vite-plugin-dts` for types → `scripts/build-css.mjs` for CSS
- Peer deps: `react@18.3.1`, `react-dom@18.3.1` (both marked optional, but required at runtime)

## Out of scope (V1)

The vision document (`.nexus/01-vision.md`) explicitly excludes these from V1. Don't generate code that depends on them:

- Server-side rendering / Next.js app-router specifics
- React Native / native mobile components
- Backend integrations (the auth components are UI-only — `onSubmit` callbacks are user-supplied)
- Storybook (planned V2)
- VS Code extension (planned V2)
- Any language other than `en`, `es`, `fr`

## What "AI-friendly" actually means in this codebase

Concretely, an agent has access to:

1. **Manifest:** `CHAMELEON_AI_MANIFEST` — array of `AIComponentMetadata` with prop schemas, complexity scores, examples, keywords, theme compatibility.
2. **Selectors:** `selectComponentsForTask(desc, maxComplexity)` and `selectRecipeForTask(desc)` — keyword-driven helpers.
3. **Validator:** `validateComponentProps(id, props)` — returns a string error or null. Catches invalid variants, missing required props, unknown prop names.
4. **Recipes:** `AI_COMPONENT_RECIPES` — pre-built code blocks for `dashboard-header`, `form-with-validation`, `pricing-grid`, `tabbed-content`, `alert-stack`, `search-with-results`.
5. **Prompt templates:** `AI_PROMPT_TEMPLATES` — guidance strings keyed by task type (`general`, `buttons`, `forms`, `dashboards`, `layouts`).
6. **Summary:** `CHAMELEON_AI_SUMMARY` — version, counts, key features.

When generating code, prefer querying these structures over guessing — see `05-ai-integration.md` for usage patterns.

## What changes between themes

A single `<Button variant="primary">` renders differently per theme via `buttonPrimary` class strings in `useThemeClasses()`. Highlights:

| Theme | Button | Card | Radius |
|-------|--------|------|--------|
| material | uppercase, elevated shadow | sharp corners, shadow | `0.25rem` |
| simple | rounded, solid fill | rounded, light shadow | `0.5rem` |
| minimalist | transparent + border | bordered, no shadow | `0px` |
| glassy | frosted backdrop blur | translucent, blurred | `1rem` |
| liquid | gradient fill, pill | huge radius, glow | `1.5rem` |

The full token table lives in `03-themes.md`.

## Where to look first

| If the agent's task is... | Read first |
|---------------------------|-----------|
| "Make a login page" | `06-recipes.md` (auth flows) → `templates.tsx::AuthTemplate` or `auth-components.tsx::LoginForm` |
| "Add a chart" | `04-components-catalog.md::ThemeChart` |
| "Switch theme on click" | `03-themes.md` + `useChameleon().setTheme` |
| "Build a settings page" | `templates.tsx::SettingsTemplate` or `comprehensive-templates-part2.tsx::SettingsPanelTemplate` |
| "Validate my code" | `05-ai-integration.md::validateComponentProps` |
