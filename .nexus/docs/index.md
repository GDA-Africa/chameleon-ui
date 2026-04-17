---
nexus_doc: true
id: "project_index"
title: "Project Index — AI Agent Brain"
status: populated
confidence: high
last_updated: "2026-04-15"
---

# Chameleon UI — Project Index

> **🧠 THIS IS THE AI AGENT'S BRAIN.**
> Read this file before every task. Update it after every task. No exceptions.

**Project:** Chameleon UI (`@chameleon-ui-lib/react`)
**Framework:** React 19 + Vite 6
**Package Manager:** pnpm
**Created:** 2026-04-04
**Status:** 🟢 v0.0.3 released — full mobile responsiveness baked into every component, composite, and template

---

## 🎯 Current Objective

**Current Phase:** Phase 7 — Consumer Integration Quality ✅ COMPLETE
**Active Task:** None — all F21–F27 shipped
**Blocked:** None
**Next Up:** Phase 8 — NPM publish + version bump, or new backlog items

---

## 📊 Project Status Matrix

| Area                           | Status                        | Notes                                                        |
| ------------------------------ | ----------------------------- | ------------------------------------------------------------ |
| 📋 Vision & Requirements       | ✅ Populated                  | See `.nexus/docs/01_vision.md`                               |
| 🏗️ Architecture                | ✅ Populated                  | See `.nexus/docs/02_architecture.md`                         |
| 📊 Data Contracts              | ✅ Populated                  | See `.nexus/docs/03_data_contracts.md`                       |
| 🔌 API Contracts               | ✅ Populated                  | See `.nexus/docs/04_api_contracts.md`                        |
| 📐 Business Logic              | ✅ Populated                  | See `.nexus/docs/05_business_logic.md`                       |
| 🧪 Test Strategy               | ✅ Populated                  | See `.nexus/docs/06_test_strategy.md`                        |
| 🔨 Implementation Plan         | ✅ Populated                  | See `.nexus/docs/07_implementation.md`                       |
| 🚀 Deployment                  | ✅ Populated                  | See `.nexus/docs/08_deployment.md`                           |
| 🏠 Core Components             | ✅ 45+ components built       | Atoms (8), Molecules (10), Composites (10), Auth (7)         |
| 🎨 Theme System                | ✅ 5 themes × 2 modes         | Material, Simple, Minimalist, Glassy, Liquid                 |
| 🤖 AI Integration              | ✅ Manifest + helpers + guide | `ai-manifest.ts`, `AI_INTEGRATION_GUIDE.md`                  |
| 🌍 i18n                        | ✅ EN, ES, FR                 | Translations in `context.tsx`                                |
| 🎭 Animations                  | ✅ Theme-specific             | 5 animation types with physics                               |
| 🎭 Performance (Glassy/Liquid) | ✅ Fixed (3 rounds)           | backdrop-blur removed from shell, contain:paint, React.memo  |
| 🔐 Auth Components             | ✅ 7 components               | Login, Signup, 2FA, Magic Link, ForgotPassword, etc.         |
| ⚙️ TypeScript Config           | ✅ Strict mode                | tsconfig.json + 0 errors (`tsc --noEmit` passes)             |
| 🧪 Tests                       | ✅ Configured + Setup         | Vitest + RTL, utils and atoms tested                         |
| 📏 Linting                     | ✅ Configured                 | ESLint (flat config) + Prettier                              |
| 📦 NPM Package                 | ✅ Configured                 | Vite lib mode — ESM + CJS + types in `dist/`                 |
| 🖥️ CLI Tool                    | ✅ Phase 7 Complete          | F21–F25 all shipped: Tailwind auto-config, self-contained add, CSS exports, strict types, doctor checks |
| 🚀 CI/CD Pipeline              | ✅ Configured                 | `.github/workflows/ci.yml` + `publish.yml`                   |
| 🖼️ Workshop UI                 | ✅ Production-ready           | 7 pages, 4 sidebar groups, clean navigation                  |
| 📄 README                      | ✅ Updated                    | Minimal, high-value npm-facing copy                          |

---

## 🗂️ Feature Backlog

| #   | Feature                      | Priority | Status      | Phase | Notes                                          |
| --- | ---------------------------- | -------- | ----------- | ----- | ---------------------------------------------- |
| F1  | Multi-Theme Component System | P0       | ✅ Done     | 1     | 5 themes × 2 modes                             |
| F2  | Atom Components (8)          | P0       | ✅ Done     | 1     | Button, Input, Badge, Progress, etc.           |
| F3  | Molecule Components (10)     | P0       | ✅ Done     | 1     | Card, Tabs, Dialog, Alert, StatCard, etc.      |
| F4  | Organism/Composite Components (10) | P0 | ✅ Done     | 1     | DataTable, Charts, KanbanBoard, Calendar, etc. |
| F5  | Template Pages (14)          | P0       | ✅ Done     | 1     | Dashboard, Landing, Auth, Settings, etc.       |
| F6  | AI Agent Integration         | P0       | ✅ Done     | 1     | Manifest, helpers, guide                       |
| F7  | Animation System             | P1       | ✅ Done     | 1     | Theme-specific physics                         |
| F8  | i18n Support (EN, ES, FR)    | P1       | ✅ Done     | 1     | Translations in context                        |
| F9  | Theme Intensity Controls     | P1       | ✅ Done     | 1     | Glassy blur slider, Liquid speed               |
| F10 | Auth Components (7)          | P1       | ✅ Done     | 1     | Complete auth flow                             |
| F11 | TypeScript Strict Mode       | P0       | ✅ Done     | 2     | tsconfig.json + 0 errors                       |
| F12 | Automated Test Suite         | P0       | ✅ Done     | 2     | Vitest + RTL configured                        |
| F13 | Linting & Formatting         | P1       | ✅ Done     | 2     | ESLint flat config + Prettier                  |
| F14 | CI/CD Pipeline               | P1       | ✅ Done     | 2     | GitHub Actions: CI + publish                   |
| F15 | NPM Package Publication      | P1       | ✅ Done     | 3     | Vite lib mode — `@chameleon-ui-lib/react`      |
| F16 | CLI Tool (13 commands)       | P2       | ✅ Done     | 4     | All commands real FS ops, ANSI polish          |
| F17 | Workshop UI Reorganization   | P1       | ✅ Done     | 5     | 2 doc pages, 4 sidebar groups, 7 routes        |
| F18 | Glassy Light Mode Visibility | P1       | ✅ Done     | 5     | Mode-branched sidebar/header/token fixes       |
| F19 | Glassy/Liquid Freeze Fix     | P0       | ✅ Done     | 5     | backdrop-blur removed, contain:paint, memo     |
| F20 | README for npm               | P1       | ✅ Done     | 5     | Minimal, pure-value copy                       |
| F21 | `chameleon init` Tailwind v4 auto-config | P0 | ✅ Done | 7  | Detect + inject `@tailwindcss/vite` in host vite.config |
| F22 | Self-contained generated components | P0  | ✅ Done | 7  | `chameleon add` maps internal deps to npm package exports |
| F23 | Stable public CSS/component exports | P0  | ✅ Done | 7  | `@chameleon-ui-lib/react/styles` public entry point      |
| F24 | Strict-mode-safe code generation | P1     | ✅ Done    | 7  | Generated files pass strict TS + ESLint out of the box   |
| F25 | `chameleon doctor` integration checks | P1 | ✅ Done    | 7  | Detect missing plugin, CSS import, dep issues, lint risk |
| F26 | Framework quickstart guides  | P2       | ✅ Done    | 7  | Vite + React + TS + Tailwind v4 known-good snippets      |
| F27 | CSS `@import` ordering / single entry | P2 | ✅ Done    | 7  | Consolidated CSS entry to avoid PostCSS warnings         |

---

## 📁 What Has Been Built

### Source Files

| Module              | File(s)                                                  | Lines  | Description                                                          |
| ------------------- | -------------------------------------------------------- | ------ | -------------------------------------------------------------------- |
| Theme System        | `context.tsx`                                            | ~706   | Provider, hooks, tokens, translations, GlassyBackground, LiquidBackground (both React.memo + useMemo) |
| Atoms               | `atoms.tsx`                                              | ~412   | Button, Input, Badge, Progress — full theme adaptation               |
| Molecules           | `molecules.tsx`                                          | ~557   | Card, Tabs, Dialog, Alert, StatCard, PricingCard, Avatar, Tooltip    |
| Composites/Organisms | `composites.tsx`                                        | ~1800  | DataTable, Charts, KanbanBoard, Calendar, FileUpload, Gallery        |
| Auth                | `auth-components.tsx`                                    | —      | 7 auth flow components                                               |
| Animations          | `animations.tsx`                                         | —      | `Animated`, `AnimatedList`, 5 theme-specific presets                 |
| Templates           | `templates.tsx` + `comprehensive-templates*.tsx`         | —      | 14 full-page layouts                                                 |
| AI Manifest         | `ai-manifest.ts`                                         | ~909   | Machine-readable component catalog for AI agents                     |
| Workshop App        | `App.tsx`                                                | ~558   | 7 pages, 4 sidebar groups, all glassy dark-hardcodes removed         |
| CLI Docs Page       | `cli-docs-page.tsx`                                      | ~400   | 13-command reference, two-panel, search, quick-ref table             |
| Component Docs Page | `component-docs-page.tsx`                                | ~380   | 4-tab unified docs (Atoms, Molecules, Composites, Auth)              |
| CLI Binary          | `bin/chameleon.js`                                       | —      | 13 commands, real FS ops, ANSI polish. Registered via `bin` in package.json |
| Styles              | `styles/` (4 files)                                      | —      | Tailwind v4, theme CSS, fonts, keyframe animations                   |
| NEXUS docs          | `.nexus/docs/` (10 files)                                | —      | All populated                                                        |

### CLI Commands (all working, real FS operations)

| Command | Category | What it does |
|---|---|---|
| `chameleon init` | Setup | Interactive setup, writes `chameleon.config.json` |
| `chameleon add <component>` | Scaffold | Copies component file into your project |
| `chameleon remove <component>` | Scaffold | Deletes component file from your project |
| `chameleon template <name>` | Scaffold | Copies full-page template into your project |
| `chameleon list` | Discovery | Lists all 28 components and 14 templates |
| `chameleon info <component>` | Discovery | Shows component details and flags |
| `chameleon themes` | Discovery | Lists all 5 themes with descriptions |
| `chameleon theme <name>` | Config | Sets active theme in `chameleon.config.json` |
| `chameleon config` | Config | Shows current config file contents |
| `chameleon doctor` | Health | Checks package install, config, and source directory |
| `chameleon diff <component>` | Health | Compares your local file to the library source |
| `chameleon update <component>` | Scaffold | Overwrites component with latest library version |
| `chameleon dev` | Dev | Launches the Vite dev server (workshop) |

### Tests

| File              | Tests | Covers                         |
| ----------------- | ----- | ------------------------------ |
| `atoms.test.tsx`  | 4     | Button, Input, Badge, Progress |
| `utils.test.ts`   | 3     | `cn` utility                   |

---

## 🔄 Progress Log

### 2026-04-04 — Project Created
- ✅ Scaffolded with NEXUS CLI (React + Vite, cloud-first)
- ✅ Generated project structure, configs, landing page, CI/CD
- ✅ Generated NEXUS documentation system (8 template docs)

### 2026-04-05 — Project Adopted by Nexus Agent
- ✅ Full codebase scan — 45 components, 5 themes, workshop app
- ✅ Populated all 8 NEXUS docs from codebase analysis
- ✅ Built feature backlog (16 features: 10 done, 6 remaining)
- ✅ Set Phase 2 (Quality & Tooling) as current objective

### 2026-04-05 — P0 Performance Fix (Glassy/Liquid Freeze Round 1)
- ✅ Replaced motion.div backgrounds → pure CSS @keyframes with `contain: strict`
- ✅ Removed global `*` CSS selectors → scoped to interactive elements only
- ✅ Memoized `useThemeClasses()` with `useMemo([theme, mode])`
- ✅ Downgraded backdrop-blur levels on dialogs/overlays/gallery

### 2026-04-05 — P0 Performance Fix Round 2 (Scroll Jank)
- ✅ Removed backdrop-blur from App.tsx header, sidebar, footer (was backdrop-blur-2xl)
- ✅ Replaced GlassyBackground/LiquidBackground filter:blur → box-shadow glow
- ✅ Removed border-radius animation from liquid keyframes → transform-only
- ✅ Stripped all backdrop-blur from `useThemeClasses` glassy classes (15 instances)

### 2026-04-05 — Phase 2: TypeScript Strict Mode + Quality Tooling
- ✅ Created `tsconfig.json` — strict, `noUncheckedIndexedAccess`, bundler resolution
- ✅ Fixed 57 real type errors across 7 files
- ✅ Installed Vitest + RTL — atoms and utils tests passing
- ✅ ESLint flat config + Prettier — codebase formatted
- ✅ GitHub Actions CI: lint, format, typecheck, tests, build

### 2026-04-05 — Phase 3: NPM Package
- ✅ Vite lib mode: ESM + CJS + types in `dist/`
- ✅ `package.json` → name `@chameleon-ui-lib/react`, exports map, React as peerDep
- ✅ `vite-plugin-dts` for auto type emission
- ✅ `CHANGELOG.md` + `publish.yml` GitHub Action

### 2026-04-05 → 2026-04-14 — Phase 4: CLI Tool (13 commands)
- ✅ Built `bin/chameleon.js` — ESM, native Node.js fs/path/child_process
- ✅ ANSI color polish: emerald/indigo/cyan/yellow/red palette
- ✅ All 13 commands with real FS operations verified working
- ✅ `COMPONENTS` registry: 28 entries. `TEMPLATES` registry: 14 entries
- ✅ `chameleon dev` uses `child_process.spawn` on actual Vite binary
- ✅ Registered in `package.json` `bin` field — accessible as `chameleon` after `npm link`

### 2026-04-14 — Phase 5: Workshop UI Reorganization
- ✅ Created `cli-docs-page.tsx` — 13-command reference, two-panel layout, search, quick-ref table
- ✅ Created `component-docs-page.tsx` — 4-tab unified component docs replacing 4 scattered pages
- ✅ Rewrote `App.tsx` — 7 pages, 4 sidebar groups, removed 300+ lines of dead inline pages
- ✅ Page type: `"landing" | "component-docs" | "cli-docs" | "docs" | "visualizer" | "animations" | "templates"`
- ✅ `tsc --noEmit` passes — 0 errors

### 2026-04-14 — Glassy Light Mode Visibility Fix
- ✅ Mode-branched all 5 hardcoded dark glassy values in App.tsx (sidebar, header, userCard, footer, searchInput)
- ✅ `--muted` token: `rgba(255,255,255,0.5)` → `rgba(237,230,255,0.85)` (visible lavender)
- ✅ `--border` token: `rgba(124,58,237,0.25)` → `rgba(124,58,237,0.30)` (stronger tab demarcation)
- ✅ `cardClass` glassy light: improved shadow, added backdrop-blur via CSS var

### 2026-04-14 — P0 Performance Fix Round 3 (Glassy Scroll Lock)
- ✅ **Root cause 1:** `backdrop-blur` on fixed sidebar + sticky header → full-layer composite every scroll tick → scroll locked. Removed all backdrop-blur from App.tsx shell (sidebar, header, footer). Replaced with opaque solid backgrounds.
- ✅ **Root cause 2:** `contain: "strict"` on GlassyBackground → creates scroll container → swallows scroll events. Changed to `contain: "paint"` on both GlassyBackground and LiquidBackground.
- ✅ **Root cause 3:** `backdrop-blur` on every card (via `cardClass` glassy). Removed.
- ✅ **Previous fixes still in place:** `React.memo` + `useMemo` on both backgrounds, no `will-change`, `color-scheme` split by mode
- ✅ 0 TypeScript errors after all changes

### 2026-04-14 — README + Brain Updated
- ✅ README rewritten: minimal, npm-facing, pure value — install, quick start, component table, CLI, tokens
- ✅ Brain updated to reflect full project state through Phase 5

### 2026-04-14 — v0.0.2 Released 🎉
- ✅ `package.json` version bumped: `0.0.1` → `0.0.2`
- ✅ `CHANGELOG.md` updated with full [0.0.2] entry (CLI, Workshop UI, perf fixes, TypeScript, auth, tests)
- ✅ `dist/` built with Vite lib mode — `index.js` (805 kB), `index.cjs` (571 kB), types emitted
- ✅ Git commit `feat: release v0.0.2`, tag `v0.0.2` created and pushed

### 2026-04-15 — Full Mobile Responsiveness (v0.0.3)
- ✅ `App.tsx` shell — `lg:` sidebar breakpoint, `h-dvh`, AnimatePresence overlay, body scroll lock, `lg:ml-72`, responsive padding
- ✅ `molecules.tsx` — `DialogContent` no edge-clip, `CardHeader`/`CardContent` `p-4 sm:p-6`, `TabsList` wraps, `StatCard`/`PricingCard` scaled padding
- ✅ `composites.tsx` — `KanbanBoard` columns `w-[280px] sm:w-72` for horizontal scroll on mobile
- ✅ `comprehensive-templates.tsx` — all 4 templates fully responsive (hero h1 scales, all grids `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, CTA padding scales, table `overflow-x-auto`, forms stack on mobile)
- ✅ `comprehensive-templates-part2.tsx` — AdminDashboard header wraps, EcommerceProduct titles/reviews responsive, Settings h1 + name fields responsive, DocsTemplate h1 + component grid responsive
- ✅ `templates.tsx` — SettingsTemplate sidebar stacks on mobile (`grid-cols-1 md:grid-cols-[200px_1fr]`)
- ✅ `CHANGELOG.md` updated with full [0.0.3] entry
- ✅ Git commit `feat: v0.0.3`, tag `v0.0.3` created and pushed

---

## 🎯 What's Next (Prioritized)

### � Phase 7 — Consumer Integration Quality (BrandDrop Review, 2026-04-17)

> These items were surfaced by a real-world integration test. Fix these before the next npm publish.

**Sprint 1 — P0 (unblock consumers)**
1. **F21 — `chameleon init` Tailwind v4 auto-config** — Read host `vite.config.ts`, detect missing `@tailwindcss/vite`, inject plugin automatically. Also check for `@import 'tailwindcss'` in CSS entry.
2. **F22 — Self-contained generated components** — When `chameleon add <component>` is run, auto-detect which local deps it needs (`context.tsx`, `utils.ts`, `animations.tsx`) and either copy them or rewrite imports to `@chameleon-ui-lib/react`. Produce a dependency manifest per component.
3. **F23 — Stable public CSS export** — Add `"./styles"` to the `exports` map in `package.json` pointing to a bundled CSS file. Document the single import: `import '@chameleon-ui-lib/react/styles'`.

**Sprint 2 — P1 (quality)**

4. **F24 — Strict-mode-safe generation** — Audit all generated file templates in `bin/chameleon.js`. Replace all `any` with proper types, remove dead imports, ensure output passes `tsc --noEmit` + ESLint in a strict host app.
5. **F25 — `chameleon doctor` integration checks** — Expand existing doctor command with: (a) Tailwind v4 plugin check, (b) stylesheet import check, (c) unresolved generated dep check, (d) lint-risk pattern scan.

**Sprint 3 — P2 (polish)**

6. **F26 — Framework quickstart guide** — Add a `QUICKSTART.md` (or README section) with a copy-paste known-good setup: Vite + React + TS + Tailwind v4 with exact config snippets.
7. **F27 — Consolidated CSS entry** — Merge all style entry files into a single importable output that avoids PostCSS `@import` ordering warnings in host configs.

### 🟡 Phase 6 Remaining (carry-forward)
- **Expand test coverage** — molecule and composite tests
- **CLIMockup update** — reflect all 13 commands
- **Liquid theme light mode audit**
- **Publish to npm** — bump to `0.1.0` after Phase 7 fixes are in

---

## 🎯 What's Next — Phase 7: Consumer Integration Quality (from BrandDrop Review)

> **Source:** Real-world integration test by BrandDrop coding agent (2026-04-17)
> All items below are P0/P1 — they directly block adoption.

### P0 — Must Fix Before Next Release

| #   | ID  | Title                                       | Effort | Notes                                                                                   |
| --- | --- | ------------------------------------------- | ------ | --------------------------------------------------------------------------------------- |
| 1   | F21 | `chameleon init` auto-configures Tailwind v4 plugin | M | Detect missing `@tailwindcss/vite` in host project — add to `vite.config.ts` automatically |
| 2   | F22 | Self-contained generated components         | L      | `chameleon add` must auto-scaffold all local deps (`context`, `utils`, `animations`) or import from package exports |
| 3   | F23 | Stable public CSS/component exports         | M      | Export `@chameleon-ui-lib/react/styles` as a public entry point; no internal path imports required |

### P1 — Fix in Same Release

| #   | ID  | Title                                       | Effort | Notes                                                                                   |
| --- | --- | ------------------------------------------- | ------ | --------------------------------------------------------------------------------------- |
| 4   | F24 | Strict-mode-safe code generation            | M      | Generated files must pass strict TS + ESLint with zero violations (no `any`, no unused imports) |
| 5   | F25 | `chameleon doctor` integration health checks | M     | Detect: missing bundler plugin, missing CSS import, unresolved generated deps, lint-risk patterns |

### P2 — Next Iteration

| #   | ID  | Title                                       | Effort | Notes                                                                                   |
| --- | --- | ------------------------------------------- | ------ | --------------------------------------------------------------------------------------- |
| 6   | F26 | Framework-specific quickstart guides        | S      | Vite + React + TS + Tailwind v4 known-good config snippet in README/docs                |
| 7   | F27 | CSS `@import` ordering fix / single entry   | S      | Ship a consolidated CSS entry to avoid PostCSS `@import` order warnings in host apps   |

### 2026-04-17 — Phase 7 Planning (BrandDrop Integration Review)
- ✅ Received real-world integration feedback from BrandDrop coding agent
- ✅ Identified 7 new backlog items (F21–F27) across 3 priority tiers
- ✅ Added Phase 7 "Consumer Integration Quality" to roadmap
- ✅ Updated NEXUS index, feature backlog, status matrix, and knowledge base

### 2026-04-17 — Phase 7 F21 Tailwind v4 Auto-Config
- ✅ Modified `chameleon init` to check host `vite.config` and auto-inject `@tailwindcss/vite` import + plugin
- ✅ Added auto-insertion of `@import "tailwindcss"` in the configured CSS file

### 2026-04-17 — Phase 7 F22 Self-contained Generated Components
- ✅ Modified `chameleon add` to dynamically map local component imports (`./utils`, `./atoms`, etc) to `@chameleon-ui-lib/react`
- ✅ Applied same rewrite strategy to `chameleon template` scaffolding
- ✅ Updated `diff` and `update` commands to understand the re-mapped imports and preserve diffing logic
- ✅ CLI now outputs mapped dependency lists upon generation

### 2026-04-17 — Phase 7 F23 Stable Public CSS Exports
- ✅ Created `scripts/build-css.mjs` to aggregate `fonts.css`, `theme.css`, and custom classes from `index.css` without stripping local Tailwind utilities
- ✅ Hooked script into `npm run build:css`
- ✅ Exported `./styles` route in `package.json` pointing to `dist/styles.css`
- ✅ Updated README quickstart to show `import "@chameleon-ui-lib/react/styles"`
- ✅ Completed F24 (Strict-mode-safe generation) by removing `any` from component primitives
- ✅ Resolved testing errors with testing-library overrides
- ✅ Completed F25 (`chameleon doctor` expansion): Handled missing CSS, undefined components, Vite TS setup, and lint checks.
- ✅ Restored `scripts/build-css.mjs` (was accidentally overwritten with stdout text)
- ✅ Completed F26 (Framework quickstart guide): Added 7-step Vite+React+TS+Tailwind v4 setup to README, Troubleshooting section, `chameleon init` now prints next-steps guide
- ✅ Completed F27 (CSS @import ordering): `build-css.mjs` strips all @import lines from bundle, `chameleon doctor` now detects rules-before-imports ordering issues
- 🔲 Phase 7 Sprint 2 & 3 complete — all F21–F27 items shipped

---

## ⚠️ AI Agent Operating Rules

1. **READ this file before EVERY task** — it tells you what to do next
2. **UPDATE this file after EVERY task** — move completed items to Progress Log, update status matrix
3. **DON'T ask "what enhancements would you like?"** — check "What's Next" instead
4. **DON'T treat docs as one-time fill-ins** — they are living documents
5. **The feature backlog is your roadmap** — suggest the next item, don't invent random features
6. **The progress log is your memory** — add entries so the next agent knows what happened
7. **Scan `.nexus/docs/knowledge.md` before big decisions** — it prevents repeating mistakes
8. **After every session, ensure this file reflects reality** — statuses, progress, blockers, next steps

---

_Generated by [NEXUS CLI](https://github.com/GDA-Africa/nexus-cli) v0.3.2_
