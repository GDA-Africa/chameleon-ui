# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.2] - 2026-04-14

### Added
- **CLI Tool (13 commands)** — `bin/chameleon.js` with real filesystem operations, ANSI colour polish, and native Node.js `fs`/`path`/`child_process` implementation.
  - `init`, `add`, `remove`, `template`, `list`, `info`, `themes`, `theme`, `config`, `doctor`, `diff`, `update`, `dev`
  - 28-component registry + 14-template registry built into the CLI
  - Registered in `package.json` `bin` field as `chameleon` / `chameleon-cli`
- **Workshop UI — CLI Docs Page** (`cli-docs-page.tsx`) — 13-command reference, two-panel layout, live search, quick-reference table.
- **Workshop UI — Component Docs Page** (`component-docs-page.tsx`) — 4-tab unified docs replacing 4 scattered pages (Atoms, Molecules, Composites, Auth).
- **Auth Components** — 7 full authentication-flow components (Login, Signup, 2FA, Magic Link, Forgot Password, Reset Password, Verify Email).
- **CI/CD** — GitHub Actions workflows: `ci.yml` (lint, format, typecheck, tests, build) and `publish.yml` (npm publish on release).
- **TypeScript strict mode** — `tsconfig.json` with `strict: true`, `noUncheckedIndexedAccess`, bundler resolution; 0 type errors across all source files.
- **Test suite** — Vitest + React Testing Library configured; `atoms.test.tsx` (4 tests) and `utils.test.ts` (3 tests).
- **ESLint + Prettier** — flat config ESLint with TypeScript rules, Prettier formatting across all source files.
- **README** rewritten — minimal, npm-focused, pure-value copy with install, quick start, component table, CLI, and token reference.

### Changed
- **App.tsx** fully rewritten — 7 pages, 4 sidebar groups (`Overview`, `Components`, `Resources`, `Settings`), removed 300+ lines of dead inline page code.
  - Page types: `landing | component-docs | cli-docs | docs | visualizer | animations | templates`
- **Workshop navigation** — sidebar restructured to 4 collapsible groups with proper routing.

### Fixed
- **P0 — Glassy/Liquid scroll lock (Round 3):** Removed all `backdrop-blur` from App.tsx shell (sidebar, header, footer) — these fixed/sticky elements were forcing full-layer GPU compositing on every scroll tick, locking the thread. Replaced with opaque solid backgrounds.
- **P0 — `contain: strict` scroll swallow:** `GlassyBackground` and `LiquidBackground` used `contain: strict` which creates its own scroll container and swallowed scroll events. Changed to `contain: paint` on both backgrounds.
- **P0 — Card `backdrop-blur` compositing:** Removed `backdrop-blur` from every card via `cardClass` glassy styles — dozens of simultaneous compositing layers caused jank.
- **P0 — Round 2:** Removed `backdrop-blur` from all 15 instances in `useThemeClasses` glassy styles; replaced `filter: blur()` on background orbs/blobs with `box-shadow` glow effects; removed `border-radius` animation from liquid keyframes (transform-only now).
- **P0 — Round 1:** Replaced Framer Motion (`motion.div`) background animations with pure CSS `@keyframes`; removed `[data-chameleon-theme] *` global transition selectors (scoped to interactive elements only); memoized `useThemeClasses()` with `useMemo`.
- **Glassy light mode visibility:** Mode-branched all 5 hardcoded dark values in App.tsx (sidebar, header, user card, footer, search input); fixed `--muted` token to visible lavender in light mode; improved `--border` token contrast.
- **TypeScript** — resolved 57 type errors across 7 source files.

## [0.0.1] - 2026-04-05

### Added
- Multi-theme component system supporting 5 themes (material, simple, minimalist, glassy, liquid).
- Atoms: Button, Input, Badge, Progress, Spinner.
- Molecules: Card, Tabs, Dialog, Alert, StatCard, PricingCard, Separator, Avatar, Tooltip, Select, Textarea.
- Organisms: DataTable, Charts, Kanban, FileUpload, etc.
- Templates for full layouts.
- Initial NPM library configuration.
