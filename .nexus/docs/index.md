---
nexus_doc: true
id: "project_index"
title: "Project Index — AI Agent Brain"
status: populated
confidence: high
last_updated: "2026-05-04"
---

# Chameleon UI — Project Index

> **🧠 THIS IS THE AI AGENT'S BRAIN.**
> Read this file before every task. Update it after every task. No exceptions.

**Project:** Chameleon UI (`@chameleon-ui-lib/react`)
**Framework:** React 18.3 + Vite 6.3 (TypeScript 6.0)
**Package Manager:** pnpm (yarn supported via lock-compat scripts)
**Created:** 2026-04-04
**Latest Release:** v1.1.0 (2026-05-06) · Notification overhaul in progress (2026-05-06)
**Working Tree:** dirty — agent ruleset files (`CLAUDE.md`, `.clinerules`, `.cursorrules`, `.windsurfrules`, `AGENTS.md`) and v1.0.9 composite plan are uncommitted
**Status:** � v1.1.0 shipped · Notification system, MultiStepForm hardening, Auth controlled mode, composite/hooks docs directory UX, full styleConfig propagation

---

## 🎯 Current Objective

**Current Phase:** Phase 11 — **Agents Can Call Chameleon (v1.2.0)** — see `NEXUS_ROADMAP_v2.0.md` (master, Phases 11–16 → v2.0.0) + `.nexus/plans/phase-11-agent-callable.md`
**Active Task:** None — F58 + F59 shipped 2026-07-05; next is F61 (ChameleonSpec v1)
**Blocked:** None
**Next Up:** F61 ChameleonSpec v1 → F60 MCP server → F64 agents init. Then Phases 12–16 per roadmap. Deferred: Liquid light-mode audit, `--all-templates` flag, Playwright E2E (folds into F69)

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
| 🚀 CI/CD Pipeline              | ✅ Green                      | Lockfile + TS 6 incompat fixed (2026-05-03, `b0d8c23`)       |
| 🖼️ Workshop UI                 | ✅ Production-ready           | 7 pages + collapsible sidebar, PWA + SEO + logo branding     |
| 📄 README                      | ✅ Updated                    | Minimal, high-value npm-facing copy + hosted logo            |
| 📱 PWA + SEO                   | ✅ Shipped (2026-05-03)       | `vite-plugin-pwa`, OG/Twitter tags, JSON-LD, full icon set   |
| 🤖 Agent Rulesets              | ✅ Generated, untracked       | `CLAUDE.md`, `.clinerules`, `.cursorrules`, `.windsurfrules`, `AGENTS.md` from `.nexus/ai/instructions.md` |
| 🧪 Consumer Smoke Test         | ✅ `npm run verify:consumer`  | `scripts/verify-consumer.mjs` packs lib + verifies in temp app |
| 📦 Published Source (`lib-src/`)| ✅ Bundled in tarball        | CLI scaffolding sources copied at build time, fixes `chameleon add/template` "not found" |
| 🧩 Composites Folder           | ✅ Populated in `chameleon/composites/` | 26 extracted composites + central index + types + AI manifest in `src/app/components/chameleon/composites/` |

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
| F28 | DatePicker atom + AI crawl files | P1   | ✅ Done    | 8  | DatePicker shipped, `public/llms.txt`/`context.md`/`manifest.json`/`sitemap.xml`, AI copy button |
| F29 | Hooks & Utils public exports + docs page | P1 | ✅ Done | 8  | `b8b5ffe` — exposed library hooks/utils + dedicated docs page |
| F30 | `dist/index.d.ts` rollup        | P0       | ✅ Done    | 8  | `cc31731` — fixes consumer `TS2307` from missing types   |
| F31 | Bulk `chameleon add` flags + barrel `index.ts` | P1 | ✅ Done | 8 | `f4d9224` — `--all-atoms/--all-molecules/--all-composites/--all` |
| F32 | `CopyPageForAIPanel` across docs | P1     | ✅ Done    | 8  | `67a4206` — one-click copy on every docs page            |
| F33 | Header theme dropdown switcher  | P2       | ✅ Done    | 8  | `49bab1d` — replaces static badge                        |
| F34 | Custom brand color + color utils | P1     | ✅ Done    | 8  | `36f4544`/`c2afc90` — global brand color, shared utilities |
| F35 | Templates Library directory page | P1     | ✅ Done    | 8  | v1.0.6/1.0.9 `TemplateShowcase` searchable directory     |
| F36 | Auth Showcase nav restoration   | P1       | ✅ Done    | 8  | Sidebar + footer + Templates CTA wired (2026-05-03)      |
| F37 | Component docs directory rebuild | P1     | ✅ Done    | 8  | Searchable per-component dropdowns + AI copy             |
| F38 | `lib-src/` published bundle     | P0       | ✅ Done    | 8  | v1.0.7 — fixes `chameleon add/template` "Source not found" in installed packages |
| F39 | `npm run verify:consumer`       | P0       | ✅ Done    | 8  | Pack + temp-install smoke test catches packaging regressions |
| F40 | `package.json files` whitelist + `prepare` | P0 | ✅ Done | 8  | v1.0.9 — fixes consumer TS2307 from missing `dist/`     |
| F41 | PWA + Logo + Full SEO           | P1       | ✅ Done    | 8  | v1.0.7 (`ec1420b`) — `vite-plugin-pwa`, OG/Twitter, JSON-LD |
| F42 | Mobile `min-h-dvh` white-space fix | P1   | ✅ Done    | 8  | v1.0.7 — switches outer wrapper to actual visual viewport |
| F43 | Collapsible sidebar navigation  | P2       | ✅ Done    | 8  | v1.0.7 (`b7ade33`) — sidebar collapse for desktop        |
| F44 | TypeScript 6 + lockfile CI fix  | P0       | ✅ Done    | 8  | `b0d8c23` — disabled rollupTypes (api-extractor TS5/6 mismatch), restored corrupted transitive deps |
| F45 | Composite-First Architecture (v1.0.9) | P0 | ✅ Done | 9 | Phases 1–4 complete; shipped in v1.0.9 |
| F46 | Composite registry + types | P0   | ✅ Done | 9  | Implemented under `src/app/components/chameleon/composites/` (`types.ts`, per-composite files, `index.ts`) |
| F47 | Templates accept `styleConfig` prop | P0  | ✅ Done | 9  | Typed style config contracts in `template-styles.ts`; templates accept optional `styleConfig` |
| F48 | Composite unit tests (80%+ coverage target) | P1 | ✅ Done | 9 | Composite import/reuse/unit tests present; suite passing |
| F49 | `COMPOSITES.md` + API/TYPES/MIGRATION docs | P1 | ✅ Done | 9 | Added `COMPOSITES.md`, `docs/COMPOSITES_API.md`, `docs/TYPES.md`, `docs/MIGRATION_v1.0.9.md`, README/CLAUDE updates |
| F50 | Subpath exports `/composites`, `/templates`, `/types` | P1 | ✅ Done | 9 | Added subpath exports in `package.json` |
| F51 | NotificationCenter (toast system) | P0 | ✅ Done | 10 | v1.1.0 — provider/hook API, typed variants, position control, rich payloads |
| F52 | NotificationInbox (actionable inbox) | P1 | ✅ Done | 10 | v1.1.0 — search, filters, unread toggle, read/archive state |
| F53 | MultiStepForm API hardening | P1 | ✅ Done | 10 | v1.1.0 — controlled/uncontrolled data, external step control, per-step validation |
| F54 | Auth controlled mode + slot overrides | P1 | ✅ Done | 10 | v1.1.0 — `value`/`onChange`/`defaultValue` + `classNames`/`styles` slot props |
| F55 | Composite docs directory page | P1 | ✅ Done | 10 | v1.1.0 — searchable expandable docs matching component docs UX |
| F56 | Hooks & Utils docs directory | P1 | ✅ Done | 10 | v1.1.0 — standardised directory format with search, API tables, AI copy |
| F57 | Full `styleConfig` propagation (part2 templates) | P0 | ✅ Done | 10 | v1.1.0 — all 6 templates in `comprehensive-templates-part2.tsx` wired |
| F58 | `--json` output mode for CLI | P0 | ✅ Done | 11 | 2026-07-05 — envelope on all 13 commands + version, structured error codes, `docs/CLI_JSON.md` |
| F59 | Shared engine extraction (`bin/engine/`) | P0 | ✅ Done | 11 | 2026-07-05 — registry/catalog/scaffold/health/core modules, `./engine` subpath export, CLI is a thin skin; golden-diff parity verified |
| F60 | `@chameleon-ui-lib/mcp` MCP server | P0 | 📋 Planned | 11 | `packages/mcp` — search/scaffold/validate tools so agents can "create a login form" via tool calls |
| F61 | ChameleonSpec v1 + recipes-as-specs | P0 | 📋 Planned | 11 | REVISED — declarative page spec, zod validator from manifest, `renderSpec`/`scaffoldSpec`, ~10 recipes as stored specs |
| F62 | `chameleon brand` token pipeline | P0 | 📋 Planned | 12 | `brand init/check` — colors, font, radius, density → persisted tokens, WCAG AA checked; extends F34 |
| F63 | MCP brand tools + agent docs refresh | P1 | 📋 Planned | 12 | `set_brand`/`check_brand_contrast`/`extract_brand` tools; update `AI_INTEGRATION_GUIDE.md`, `llms.txt`, `context.md` |
| F64 | `chameleon agents init` | P1 | 📋 Planned | 11 | Consumer-project agent rulesets between `<!-- chameleon:start/end -->` markers |
| F65 | Brand extraction `from-url`/`from-logo` | P1 | 📋 Planned | 12 | Candidates-with-provenance, never auto-applied; feeds F62 |
| F66 | `/render?spec=` route | P0 | 📋 Planned | 13 | Bare canvas rendering ChameleonSpec — shared by F67/F68/F69/F70 |
| F67 | `preview(spec)` MCP tool | P0 | 📋 Planned | 13 | Playwright screenshots + axe + contrast audit; graceful degradation |
| F68 | `/play?spec=` playground links | P1 | 📋 Planned | 13 | lz-string encoded, theme switcher, copy-CLI; agents share before scaffolding |
| F69 | Visual regression CI | P2 | 📋 Planned | 13 | Component × theme × mode screenshot matrix (absorbs deferred Playwright E2E) |
| F70 | MCP Apps spike (SEP-1865) | P0 | 📋 Planned | 14 | 1-week timebox — `renderSpec` in widget template, demo in 2 hosts; may pull forward |
| F71 | `@chameleon-ui-lib/apps` package | P0 | 📋 Planned | 14 | Widget template + `actions` spec field → live UI in Claude/ChatGPT/VS Code |
| F72 | Registry format + first-party registry | P1 | 📋 Planned | 15 | `registry.json`, spec vs source item types, GitHub-hosted, PR-gated |
| F73 | `chameleon add` remote items | P1 | 📋 Planned | 15 | Spec items auto-validated; source items diff + confirm; integrity hashes |
| F74 | AppSpec v2 | P0 | 📋 Planned | 16 | Pages, routes, nav, shell, mock dataSlots — embeds v1 page specs |
| F75 | `scaffold_app` + `chameleon new` | P0 | 📋 Planned | 16 | Runnable multi-page app: routing, nav, brand, green tsc/lint/test |
| F76 | v2.0 breaking cleanups + migration | P0 | 📋 Planned | 16 | Remove `customBrandColor`, split legacy composites.tsx, engine-only contract, MIGRATION_v2 |

---

## 📁 What Has Been Built

### Source Files

> Library source lives in `src/app/components/chameleon/` and is mirrored to `lib-src/` at build time so CLI scaffolding works in installed packages. The v1.0.9 plan (F45) introduces a new top-level `src/composites/` tree — currently empty.

| Module              | File(s)                                                  | Description                                                          |
| ------------------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| Theme System        | `chameleon/context.tsx`                                  | Provider, hooks, tokens, translations, GlassyBackground/LiquidBackground (React.memo + useMemo) |
| Atoms               | `chameleon/atoms.tsx`                                    | Button, Input, Badge, Progress, DatePicker — full theme adaptation   |
| Molecules           | `chameleon/molecules.tsx`                                | Card, Tabs, Dialog, Alert, StatCard, PricingCard, Avatar, Tooltip    |
| Composites/Organisms | `chameleon/composites.tsx` (legacy — to be split in F45) | DataTable, Charts, KanbanBoard, Calendar, FileUpload, Gallery       |
| Auth                | `chameleon/auth-components.tsx` + `auth-showcase.tsx`    | 7 auth flow components + showcase page                               |
| Animations          | `chameleon/animations.tsx`                               | `Animated`, `AnimatedList`, 5 theme-specific presets                 |
| Templates           | `chameleon/templates.tsx` + `comprehensive-templates*.tsx` + `template-showcase.tsx` | 14 full-page layouts + searchable directory page |
| AI Manifest         | `chameleon/ai-manifest.ts`                               | Machine-readable component catalog (`CHAMELEON_AI_SUMMARY.version` synced per release) |
| AI Helpers          | `chameleon/ai-helpers.tsx` + `ai-docs-page.tsx`          | Validation utilities + AI docs page with `CopyPageForAIPanel`        |
| Hooks/Utils Docs    | `chameleon/hooks-utils-docs.tsx`                         | Public hooks + utils documentation page                              |
| Workshop App        | `app/App.tsx`                                            | Workshop shell — 7 pages, collapsible sidebar, PWA, full SEO meta    |
| CLI Docs Page       | `chameleon/cli-docs-page.tsx`                            | 13-command reference, two-panel, search, quick-ref table             |
| Component Docs      | `chameleon/component-docs-directory-page.tsx` (+ thin `component-docs-page.tsx` re-export bridge) | Searchable directory with per-component dropdowns + copy-for-AI |
| CLI Binary          | `bin/chameleon.js`                                       | 13 commands + bulk `--all-*` flags, dynamic version from `package.json`. Registered via `bin` in package.json |
| Styles              | `src/styles/` (4 files) → `dist/styles.css`              | Tailwind v4, theme CSS, fonts, keyframe animations. Public entry: `@chameleon-ui-lib/react/styles` |
| Build Scripts       | `scripts/build-css.mjs`, `scripts/build-src.mjs`, `scripts/verify-consumer.mjs` | CSS bundle, `lib-src/` mirror, consumer smoke test |
| Public AI Files     | `public/llms.txt`, `public/context.md`, `public/manifest.json`, `public/sitemap.xml` | Crawlable by AI agents via chameleon.glenhalton.com   |
| NEXUS docs          | `.nexus/docs/` (10 spec files + index + knowledge) + `.nexus/plans/composite-fix-*.md` (4 v1.0.9 plan docs) | All populated |

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

### 2026-07-05 — F59 shipped: shared engine extraction (`bin/engine/`)
- ✅ Engine modules: `registry.mjs` (catalog data, single source of truth), `catalog.mjs` (list/info/themes + `searchCatalog` for F60), `scaffold.mjs` (init/add/remove/template/theme/update), `health.mjs` (doctor/diff), `core.mjs` (Result shape, config I/O)
- ✅ Engine contract: functions never print or `process.exit`; return `{ ok, data, events, filesWritten, filesDeleted, nextSteps, errors }` — CLI replays `events` through ANSI formatters, `--json` maps them to the F58 envelope. MCP server (F60) consumes the same Results
- ✅ `bin/chameleon.js` rewritten as thin skin (~350 lines of logic removed); `./engine` subpath export added to package.json
- ✅ Location deviation from plan: `bin/engine/` not `lib-src/engine/` (lib-src is gitignored + build-generated — logged in knowledge.md)
- ✅ Verified: golden-output diff across 30 command runs (human + JSON + exit codes) — byte-identical except two additive JSON fields (`data.dir`, bulk `externalDependencies`); 22-assertion engine harness green; eslint + `tsc --noEmit` green; vitest suite added (`__tests__/engine.test.ts`, run locally)
- ▶️ Next: F61 — ChameleonSpec v1 (zod schema from manifest, `renderSpec`/`scaffoldSpec`, recipes-as-specs)

### 2026-07-05 — F58 shipped: `--json` machine-readable CLI output
- ✅ All 13 commands + `--version` emit a stable envelope: `{ ok, command, version, data, warnings, errors, filesWritten, filesDeleted, nextSteps }`
- ✅ Structured error codes (`NOT_INITIALIZED`, `UNKNOWN_COMPONENT`, `INVALID_THEME`, …); exit 0/1 mirrors `ok`; `doctor` sets `ok` = healthy
- ✅ Human output byte-identical without the flag; `item` arg parsing now flag-safe (`add --json button` works)
- ✅ `docs/CLI_JSON.md` documents the contract; help text updated
- ✅ Smoke-tested all commands incl. error paths in a temp project; `tsc --noEmit` + eslint green (vitest not runnable in Linux sandbox — macOS-installed rollup native binary; suite doesn't cover the CLI)
- ▶️ Next: F59 — extract `lib-src/engine/` so CLI and MCP server share one code path

### 2026-07-05 — v2.0 Roadmap approved: six releases, six flagships (Phases 11–16)
- ✅ `NEXUS_ROADMAP_v2.0.md` — master arc v1.2.0 → v2.0.0; ChameleonSpec as keystone
- ✅ Six phase plans in `.nexus/plans/phase-11…16-*.md`; backlog extended to F76
- ✅ F61 revised: composition recipes → full ChameleonSpec v1 (spec format reshapes F60 tool contracts)
- 🧭 Flagships: MCP server → brand → render/verify/share → MCP Apps (SEP-1865, finalizes 2026-07-28) → registry → AppSpec/`chameleon new`
- ▶️ Execution started: F58 `--json` CLI output mode

### 2026-07-05 — Agent SDK plan approved (Phases 11–12)
- ✅ Wrote `NEXUS_PLAN_v1.2.0.md` — MCP server (v1.2.0) + brand pipeline (v1.3.0)
- ✅ Backlog extended F58–F63; Current Objective set to Phase 11
- 🧭 Reframe: Chameleon becomes the *tool surface* agents call (MCP), not an AI itself — manifest, CLI, and composites already cover most of the vision; missing layers are a machine-callable interface and a persisted brand-token pipeline

### 2026-05-06 — Notification system overhaul (post-v1.1.0)
- ✅ Enhanced `NotificationCenterItem`: added `actions[]` array (backward-compat `action` kept), `priority` (critical/high/medium/low), `avatar`, `avatarFallback`, `icon` override
- ✅ Enhanced `NotificationInboxItem`: added `category` (10 types), `priority`, `avatar`, `avatarFallback`, `snoozedUntil`
- ✅ New types: `NotificationPriority`, `NotificationInboxCategory`, `NotificationPanelProps`
- ✅ Upgraded `TopBarProps`: `showNotificationDropdown`, `notificationDropdownItems`, `onViewAllNotifications`, `dropdownMaxItems`
- ✅ Overhauled `NotificationCenter.tsx`: priority ring styles, avatar/initials/custom-icon rendering, multi-action buttons
- ✅ Overhauled `NotificationInbox.tsx`: priority border styles, avatar display, snooze (1h/tomorrow/1week), expandable long messages, bulk actions (mark all read / archive all), stats row
- ✅ Upgraded `TopBar.tsx`: built-in bell dropdown showing mini-inbox (last 5 unread), MiniNotificationRow sub-component, Escape/outside-click dismiss
- ✅ NEW `NotificationPanel.tsx`: full-page template with TopBar + stats strip + category sidebar (10 categories) + enhanced NotificationInbox. Pre-populated with 20 demo notifications covering all 10 modern use cases
- ✅ Added `NotificationPanel` export in `composites/index.ts`
- ✅ Added `NotificationPanel` to `template-showcase.tsx` as template #11
- ✅ Added `notifications` page to `App.tsx` sidebar nav; Bell button in header navigates to full panel
- ✅ Updated `ai-manifest.ts` for all 3 notification components
- ✅ Tests: 12 test files, 87 tests — all passing
- ✅ TypeScript strict: 0 errors

### 2026-05-06 — Release v1.1.0 🎉
- ✅ `package.json` version bumped `1.0.9` → `1.1.0`
- ✅ `CHANGELOG.md` updated with full [1.1.0] entry (NotificationCenter, NotificationInbox, MultiStepForm API, Auth controlled mode, composite/hooks docs directory, styleConfig propagation, CI lockfile fix)
- ✅ All consumer-facing version strings synced: `enhanced-landing.tsx`, `ai-manifest.ts`, `public/context.md`, `public/llms.txt`, `docs/00-index.md`, `docs/01-overview.md`, `AI_INTEGRATION_GUIDE.md`
- ✅ Quality gates passed: typecheck (0 errors), 68 tests passed, lint clean, build successful
- ✅ NEXUS brain updated: status matrix, current objective, progress log
- ✅ Git commit `chore: release v1.1.0`, tag `v1.1.0` pushed → triggers CI publish

### 2026-05-04 — Notification architecture split (toast vs inbox) completed
- ✅ Refactored `NotificationCenter` into a strict transient toast system (one-off popups) with app-wide provider/hook API, typed state (`loading/success/error`), position control, timeout behavior, and closable handling
- ✅ Added a separate actionable `NotificationInbox` module in `src/app/components/chameleon/composites/NotificationInbox.tsx` with search, status/type filters, unread-only toggle, item actions, and read/archive state management
- ✅ Synced frontend discoverability/docs:
	- Added `NotificationInbox` export in `src/app/components/chameleon/composites/index.ts`
	- Updated composite manifest entries in `src/app/components/chameleon/composites/ai-manifest.ts` to document the two distinct notification paradigms
	- Updated App sidebar composite count in `src/app/App.tsx` (`36` → `37`)
- ✅ Added/updated test coverage:
	- New `src/app/components/chameleon/__tests__/composites/notification-inbox.test.tsx`
	- Updated export coverage in `src/app/components/chameleon/__tests__/composites/imports.test.ts`
- ✅ Validation gates passed: `npm run typecheck`, `npm run test`, `npm run lint`

### 2026-05-04 — App-wide NotificationCenter composite shipped
- ✅ Added `NotificationCenter` system in `src/app/components/chameleon/composites/NotificationCenter.tsx` with:
	- Provider + hook API (`NotificationCenterProvider`, `useNotificationCenter`)
	- Global viewport component (`NotificationCenter`) with position control and typed variants (`success`, `info`, `warning`, `error`)
	- Rich notification payload support (`title`, `message`, `duration`, `persistent`, `action`, `read`)
	- Bulk controls (`mark all read`, `clear all`) and dismiss controls
- ✅ Added typed contracts to `src/app/components/chameleon/composites/types.ts` for all NotificationCenter entities/props
- ✅ Wired app-wide display in `src/app/App.tsx` by mounting `NotificationCenterProvider` and `NotificationCenter`, and integrated real triggers from Workshop actions (AI briefing copy success/failure + demo bell)
- ✅ Updated frontend docs surfaces:
	- Composite docs manifest entry in `src/app/components/chameleon/composites/ai-manifest.ts`
	- AI docs summary in `src/app/components/chameleon/ai-docs-page.tsx`
	- Sidebar composite badge count in `src/app/App.tsx` (`35` → `36`)
- ✅ Added tests:
	- `src/app/components/chameleon/__tests__/composites/notification-center.test.tsx`
	- Extended export coverage in `src/app/components/chameleon/__tests__/composites/imports.test.ts`
- ✅ Validation gates passed: `npm run typecheck`, `npm run test`, `npm run lint`

### 2026-05-04 — Composite docs parity + MultiStepForm API hardening
- ✅ Upgraded `MultiStepForm` API in `composites.tsx` with controlled/uncontrolled data support (`value`, `initialData`, `onChange`), step control (`currentStep`, `initialStep`, `onStepChange`), optional per-step validation, custom nav labels, and empty-step fallback handling
- ✅ Added 9 missing legacy composites to `src/app/components/chameleon/composites/ai-manifest.ts` (`ThemeChart`, `CommandPalette`, `KanbanBoard`, `Timeline`, `FileUploader`, `NotificationFeed`, `MultiStepForm`, `CalendarWidget`, `MediaGallery`) so they appear in frontend composite docs
- ✅ Updated sidebar composites badge in `src/app/App.tsx` from `26` → `35` to match documented inventory
- ✅ Added regression tests in `src/app/components/chameleon/__tests__/composites/multi-step-form.test.tsx` for new MultiStepForm behavior and docs visibility
- ✅ Validation gates passed: `npm run typecheck`, `npm run test`, `npm run lint`

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

### 🔴 Phase 9 — Composite-First Architecture (v1.0.9) — ACTIVE

> **Plan source of truth:** `.nexus/plans/composite-fix-07_implementation.md` (31 atomic tasks)
> **Vision:** `.nexus/plans/composite-fix-01_vision.md`
> **Architecture:** `.nexus/plans/composite-fix-02_architecture.md`
> **Blueprint:** `.nexus/plans/composite-fix-00_blueprint.md`
> **Owner-facing summary:** `.nexus/docs/1.0.9-FINAL_SUMMARY.md`

**Goal:** Decompose the monolithic `composites.tsx` and 14 templates into 40–50 standalone, fully-typed, prop-customisable composites. Templates become assemblers that accept a `styleConfig` prop. Zero breaking changes.

| Phase | Tasks | Goal | Status |
| ----- | ----- | ---- | ------ |
| 1     | 1.1–1.12 | Extract composites + central registry (`src/composites/`) | ✅ Verified complete (implemented under `src/app/components/chameleon/composites/`) |
| 2     | 2.1–2.9  | Add `styleConfig` prop to all 10 templates                | ✅ Verified complete |
| 3     | 3.1–3.5  | Unit tests (90%+ coverage) + composite AI manifest        | ✅ Verified complete |
| 4     | 4.1–4.12 | `COMPOSITES.md` + API/TYPES/MIGRATION docs + `CompositeShowcase` page + subpath exports + publish v1.0.9 | 🟡 4.1–4.5 + 4.7–4.12 complete; 4.6 publish/tag pending |

**Estimated:** 5–9 days end-to-end.

### 🟢 Carry-overs (fold into v1.0.9 phases or defer to v1.1)

- **Composite + molecule unit tests** → folded into Phase 3 (F48)
- **Liquid theme light-mode audit** → defer to v1.1 (still outstanding)
- **`--all-templates` CLI flag** → defer to v1.1 (similar to existing `--all-atoms/--all-molecules/--all-composites` shipped in F31)
- **`chameleon doctor` deeper integration checks** → defer to v1.1 unless Phase 4 surfaces gaps
- **Storybook integration** → v1.1+ (out of scope per v1.0.9 vision doc)
- **Playwright E2E tests** → v1.1+

### 🟡 Housekeeping (do alongside v1.0.9)

- Commit the agent ruleset files (`CLAUDE.md`, `.clinerules`, `.cursorrules`, `.windsurfrules`, `AGENTS.md`) so contributors see consistent guidance
- Resolve the 5 doctor warnings in `.nexus/state/doctor.json` (placeholders in `05_business_logic.md` and `07_implementation.md`)
- Re-run `nexus sync` after each merge so Vital Signs (below) stays current

### 2026-05-03 — Workshop docs IA + auth navigation upgrade
- ✅ Restored `Auth Showcase` in sidebar navigation and footer quick links
- ✅ Added direct CTA from Templates page to open `Auth Showcase`
- ✅ Kept auth flow visible inside Templates via `Authentication Flow` template entry
- ✅ Upgraded templates directory UX: searchable list, expandable details, editable color token snippet, copy-ready starter code, AI-copy button
- ✅ Rebuilt component documentation as a searchable directory with per-component dropdown panels showing previews, usage snippets, full props tables, and copy context for AI
- ✅ Added compatibility bridge file (`component-docs-page.tsx`) re-exporting new implementation to avoid import churn
- ✅ Quality gates passed locally after refactor: typecheck, tests, lint

### 2026-05-04 — Phase 4 implementation completion (verification + docs/showcase/exports)
- ✅ Verified Phase 1–3.5 artifacts are present and functional (`composites/types.ts`, composite registry, style config contracts, tests, AI manifest)
- ✅ Added `COMPOSITES.md` composite catalog and usage guide
- ✅ Added `docs/COMPOSITES_API.md`, `docs/TYPES.md`, and `docs/MIGRATION_v1.0.9.md`
- ✅ Added interactive workshop page `src/app/components/chameleon/composite-showcase.tsx` and wired `composites` nav route in `src/app/App.tsx`
- ✅ Updated package subpath exports: `/composites`, `/templates`, `/types`
- ✅ Updated README with composite-first architecture section and links
- ✅ Updated `CLAUDE.md` with composite architecture addendum
- ✅ Quality gates passing locally: `npm run typecheck`, `npm run test`, `npm run lint`, `npm run build`
- ✅ Bundle measurement captured from build: `dist/index.js` gzip **213.00 kB**
- 🟡 Remaining release operation: Phase 4.6 publish/tag (not executed in this task)

### 2026-05-03 — Release v1.0.6 + v1.0.7 (PWA / SEO / Logo / Sidebar / lib-src publishing)
- ✅ v1.0.6 (`31744da`) — canonical release ritual codified, knowledge base extended
- ✅ v1.0.7 (`973cd4f`) — `lib-src/` shipped in tarball: CLI scaffolding sources copied at build time so `chameleon add` / `chameleon template` resolve when installed from npm
- ✅ Fixed `template-showcase.tsx` truncated JSX and TS7053 in `component-docs-directory-page.tsx`
- ✅ Logo + PWA + SEO (`ec1420b`) — `vite-plugin-pwa` (generateSW), `public/site.webmanifest`, full favicon set, OG/Twitter tags, Schema.org JSON-LD; mobile bottom white-space fixed by switching outer wrapper to `min-h-dvh`
- ✅ Collapsible sidebar (`b7ade33`) added to workshop shell

### 2026-05-03 — Release v1.0.9 (initial bump + docs sync)
- ✅ Bumped package metadata to `1.0.9`
- ✅ Updated library-facing docs (`CHANGELOG.md`, `docs/00-index.md`, `docs/01-overview.md`, `AI_INTEGRATION_GUIDE.md`)
- ✅ Updated frontend/app-visible release strings (`enhanced-landing.tsx`, docs callouts, AI summary version)
- ✅ Updated AI crawler context files (`public/context.md`, `public/llms.txt`) to `1.0.9`
- ✅ Quality gates passed locally: typecheck, tests, lint, build

### 2026-05-03 — Release v1.0.9 (CI hotfix)
- ✅ Bumped `package.json` to `1.0.9`, refreshed all docs/UI/AI-context version strings (`46cf4cb`)
- ✅ CI failure fix (`b0d8c23`):
  - Restored `path-parse` / `available-typed-arrays` / `typed-array-length` versions in `pnpm-lock.yaml` that the version-bump script had globally overwritten
  - Removed stale `vite-plugin-pwa` entry from lockfile
  - Disabled `rollupTypes` in `vite-plugin-dts` config — bundled api-extractor uses TypeScript 5.9.3 which is incompatible with project's TypeScript 6.0.2
- ✅ Refactor pass (`5b64188`, `fa16813`) for readability/maintainability
- ✅ All quality gates green; `npm run verify:consumer` passing

### 2026-05-03 — Composite-First Architecture v1.0.9 PLANNED
- ✅ Authored 4 NEXUS planning docs in `.nexus/plans/`:
  - `composite-fix-00_blueprint.md` — full architectural blueprint (hierarchical prop flow, target state)
  - `composite-fix-01_vision.md` — product vision, 4 user stories, 7 feature requirements, success metrics
  - `composite-fix-02_architecture.md` — folder structure, type patterns, export strategy
  - `composite-fix-07_implementation.md` — 31 atomic tasks across 4 phases with acceptance criteria
- ✅ Authored `.nexus/docs/1.0.9-FINAL_SUMMARY.md` summarising the plan for the human owner
- ✅ Generated agent ruleset files from `.nexus/ai/instructions.md`: `CLAUDE.md`, `.clinerules`, `.cursorrules`, `.windsurfrules`, `AGENTS.md` (untracked)
- 🔴 **Implementation NOT started** — `src/composites/` does not yet exist; existing composites still live in legacy `src/app/components/chameleon/composites.tsx`

### 2026-05-04 — Brain refresh (this update)
- ✅ Audited git history since 2026-05-03 — 14 commits accounted for
- ✅ Updated status matrix: PWA/SEO row, agent rulesets row, consumer smoke test row, lib-src publishing row, composite folder row
- ✅ Extended feature backlog F28–F50 (covers everything shipped through v1.0.9 + planned v1.0.9 work)
- ✅ Replaced "What's Next" with v1.0.9 Phase 1 kickoff plus rolled-in carry-overs (test coverage, Liquid light mode audit, `--all-templates` flag)
- ✅ Marked "Source Files" inventory current and noted the v1.0.9 `src/composites/` move

### 2026-05-04 — Composite style propagation completion + frontend docs sync
- ✅ Completed runtime `styleConfig` pass-through for remaining templates in `comprehensive-templates-part2.tsx` (UserProfile, AdminDashboard, EcommerceProduct, SettingsPanel, AuthFlow, Documentation)
- ✅ Removed placeholder-only config paths and applied template-level overrides to headings, stats, profile/user data, danger actions, and side-nav/page header docs wiring
- ✅ Updated frontend docs surfaces (`documentation.tsx`, `component-docs-directory-page.tsx`) with explicit atoms → molecules → composites → templates customization guidance and copyable examples
- ✅ Quality gates green after changes: `npx tsc --noEmit`, `npm run test`, `npm run lint`, `npm run build`

### 2026-05-04 — Auth flow customization upgrade (controlled + internal)
- ✅ Refactored all auth flow components in `src/app/components/chameleon/auth-components.tsx` to support both internal form state and controlled external values (`value` / `defaultValue` / `onChange`) without breaking existing usage
- ✅ Standardized richer submit payload support across auth forms while preserving legacy callback shapes (e.g., login supports object payload with `rememberMe` and legacy `(email, password)`)
- ✅ Added slot-level class/style override hooks per form (`classNames` + `styles`) to support deep per-element customization (inputs, action buttons, submit buttons, etc.)
- ✅ Added auth-focused tests in `src/app/components/chameleon/__tests__/auth-components.test.tsx` covering payload completeness and controlled-mode change behavior
- ✅ Quality gates green after refactor: `npx tsc --noEmit`, `npm run test`, `npm run lint`, `npm run build`

### 2026-05-04 — Composite docs IA split (dedicated directory page)
- ✅ Rebuilt `src/app/components/chameleon/composite-showcase.tsx` to use the same expandable docs-directory structure as component docs (search, import path, minimal/full examples, full props table, copy context)
- ✅ Composite docs are now sourced from `CHAMELEON_AI_MANIFEST` filtered to `category === "organism"`, ensuring each composite appears in one dedicated place
- ✅ Updated `src/app/components/chameleon/component-docs-directory-page.tsx` to focus only on atoms and molecules (removed composite category/listing)
- ✅ Quality gates green after IA split: `npx tsc --noEmit`, `npm run test`, `npm run lint`, `npm run build`

### 2026-05-04 — Composite docs 0/0 hotfix
- ✅ Fixed composites page empty state (`Showing 0 of 0`) by switching `composite-showcase.tsx` to source entries from `src/app/components/chameleon/composites/ai-manifest.ts` (`COMPOSITES_MANIFEST`) instead of relying on root manifest `organism` category entries.
- ✅ Added runtime adapter for composite manifest shape to docs-directory display schema (props table + minimal/full examples + AI context copy).
- ✅ Validation green: `npx tsc --noEmit`, `npm run build`.

### 2026-05-04 — Hooks & Utils docs standardized to directory format
- ✅ Rebuilt `src/app/components/chameleon/hooks-utils-docs.tsx` to match the same docs-directory UX as component/composite pages (search, kind filters, expandable entries, import snippets, minimal/full examples, full API table, AI context copy).
- ✅ Restored page stability after prior partial-edit corruption by performing a hard file overwrite with a single canonical implementation.
- ✅ Quality gates green after migration: `npx tsc --noEmit`, `npm run test`, `npm run lint`, `npm run build`.

### 2026-05-04 — CI install failure hotfix (`ERR_PNPM_FETCH_404`)
- ✅ Diagnosed CI failure fetching unpublished tarball `@types/estree@1.0.9` (404 from npm registry).
- ✅ Added targeted `pnpm.overrides` in `package.json` for corrupted transitive pins:
	- `@types/estree` → `1.0.8`
	- `exsolve` → `1.0.8`
	- `string.prototype.trimstart` → `1.0.8`
- ✅ Regenerated lockfile with `corepack pnpm install --lockfile-only` and validated frozen install with `corepack pnpm install --frozen-lockfile`.
- ✅ Quality gates green post-fix: `corepack pnpm typecheck`, `corepack pnpm test`, `corepack pnpm lint`.

---

## 🚀 Release Ritual (Canonical)

Use this for **every release** (`vX.Y.Z`) so package output, docs, and app UI stay aligned.

1. **Bump version metadata**
	- Update `package.json` version
	- Keep lock metadata in sync when present (`package-lock.json`)
2. **Update release notes**
	- Add a new top entry in `CHANGELOG.md`
3. **Run quality gates (must pass)**
	- `tsc --noEmit`
	- `vitest run`
	- `eslint .`
	- `npm run build`
4. **If new features/functionality shipped, sync all consumer-facing surfaces**
	- **Library docs**: `README.md`, `docs/00-index.md`, `docs/01-overview.md` (and any relevant docs in `docs/`)
	- **Frontend app UI copy**: version strings / release labels in showcase/templates/pages
	- **AI-facing docs/context**: `AI_INTEGRATION_GUIDE.md`, `public/context.md`, `public/llms.txt`, `src/app/components/chameleon/ai-manifest.ts` (`CHAMELEON_AI_SUMMARY.version`)
5. **Update NEXUS memory**
	- Append release progress in `.nexus/docs/index.md`
	- Append non-obvious release learnings in `.nexus/docs/knowledge.md`
6. **Ship**
	- `git add -A`
	- `git commit -m "chore: release vX.Y.Z"`
	- `git tag vX.Y.Z`
	- `git push origin main --tags`

> Tag push is the CI/CD trigger (`publish.yml`) for npm publication.

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
9. **For releases, follow the canonical release ritual above** — especially docs/UI/README/context sync when new functionality ships

---

_Generated by [NEXUS CLI](https://github.com/GDA-Africa/nexus-cli) v0.3.2_

---

<!-- NEXUS:VITAL_SIGNS:START — managed by `nexus sync` -->
## 🩺 Vital Signs (auto)

_Last sync: 2026-05-03T19:18:51.753Z · branch `main` · 0 commits ahead of main · working tree dirty_

| Sensor | Reading |
|--------|---------|
| Last commit | fa16813 — Refactor code structure for improved readability and maintainability · Glenhalton · 57 minutes ago |
| Tests | not yet measured |
| Coverage | not collected · M1 sensor adds `vitest --coverage` parsing |
| Stale folders | src/commands never created · src/utils never created · src/generators never created · tests/e2e never created · tests/unit never created · tests/integration never created |
| Packages | not yet measured |
<!-- NEXUS:VITAL_SIGNS:END -->
