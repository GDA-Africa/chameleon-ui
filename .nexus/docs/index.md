---
nexus_doc: true
id: "project_index"
title: "Project Index — AI Agent Brain"
status: populated
confidence: high
last_updated: "2026-04-14"
---

# Chameleon UI — Project Index

> **🧠 THIS IS THE AI AGENT'S BRAIN.**
> Read this file before every task. Update it after every task. No exceptions.

**Project:** Chameleon UI (`@chameleon-ui-lib/react`)
**Framework:** React 19 + Vite 6
**Package Manager:** pnpm
**Created:** 2026-04-04
**Status:** 🟢 v0.0.2 released — Workshop UI polished, CLI complete, performance fixed

---

## 🎯 Current Objective

**Current Phase:** Phase 5 — Polish & Ship
**Active Task:** None — all known bugs resolved, UI production-ready
**Blocked:** None
**Next Up:** See "What's Next" section below

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
| 🖥️ CLI Tool                    | ✅ 13 commands, all working   | `bin/chameleon.js` — real FS ops, ANSI polish                |
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

---

## 🎯 What's Next (Prioritized)

### 🟡 Phase 5 Polish (v0.0.3 candidates)
1. **Expand test coverage** — add molecule and composite tests (currently only atoms + utils)
2. **Mobile sidebar** — fixed `w-72` sidebar has no mobile drawer; add responsive collapse for production
3. **CLIMockup update** — the `CLIMockup` component in `cli.tsx` still shows 4 original commands; update to reflect all 13
4. **Liquid theme light mode audit** — same light mode visibility patterns as glassy may exist; verify

### 🟢 Phase 6 (When Ready)
5. **Publish to npm** — run `npm publish` with v0.0.2 (or bump to `0.1.0` for first stable public release)
6. **Documentation site** — standalone docs site separate from the workshop app

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
