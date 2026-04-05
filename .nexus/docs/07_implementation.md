---
nexus_doc: true
id: "07_implementation"
title: "Implementation Plan"
status: populated
confidence: high
last_updated: "2026-04-05"
---

# Implementation Plan

**Project:** Chameleon UI

---

## 🎯 Current Phase

**Active Phase:** Phase 4 — CLI Tool
**Blocked:** None
**Next Up:** Scaffold `packages/cli`!

---

## 🔨 Build Phases

### Phase 1: Foundation ✅ COMPLETE

**Goal:** Component library with 5 themes, atoms through templates

| Task          | File(s)                                      | Status  | Notes                                            |
| ------------- | -------------------------------------------- | ------- | ------------------------------------------------ |
| Project setup | package.json, vite.config.ts                 | ✅ Done | Vite 6 + React 19 + TW4                          |
| Theme system  | context.tsx                                  | ✅ Done | 5 themes × 2 modes, CSS variable tokens          |
| Atoms         | atoms.tsx                                    | ✅ Done | Button, Input, Badge, Progress                   |
| Molecules     | molecules.tsx                                | ✅ Done | Card, Tabs, Dialog, Alert, StatCard, PricingCard |
| Organisms     | composites.tsx                               | ✅ Done | DataTable, Charts, KanbanBoard, Calendar, etc.   |
| Templates     | templates.tsx, comprehensive-templates\*.tsx | ✅ Done | 10 full-page layouts                             |
| Animations    | animations.tsx                               | ✅ Done | Theme-specific physics                           |
| Auth system   | auth-components.tsx                          | ✅ Done | 8 auth components                                |
| i18n          | context.tsx translations                     | ✅ Done | EN, ES, FR                                       |
| AI manifest   | ai-manifest.ts, ai-helpers.tsx               | ✅ Done | Machine-readable catalog                         |
| Workshop app  | App.tsx + showcase files                     | ✅ Done | Interactive demo with navigation                 |

### Phase 2: Quality & Tooling 🟡 IN PROGRESS

**Goal:** TypeScript strict, testing, linting, package build config

| Task                         | File(s)                      | Status  | Notes                          |
| ---------------------------- | ---------------------------- | ------- | ------------------------------ |
| Add tsconfig.json            | tsconfig.json                | ✅ Done | Strict mode, path aliases      |
| Install & configure vitest   | vitest.config.ts             | ✅ Done | jsdom env, setup file          |
| Write unit tests — utils     | **tests**/utils.test.ts      | ✅ Done | cn() utility                   |
| Write unit tests — context   | **tests**/context.test.tsx   | 🔴 TODO | Provider, hooks                |
| Write unit tests — atoms     | **tests**/atoms.test.tsx     | ✅ Done | Button, Input, Badge, Progress |
| Write unit tests — molecules | **tests**/molecules.test.tsx | 🔴 TODO | Card, Tabs, Dialog, Alert      |
| Add ESLint config            | eslint.config.js             | ✅ Done | TypeScript + React rules       |
| Add Prettier config          | .prettierrc                  | ✅ Done | Consistent formatting          |
| Add lint + test scripts      | package.json                 | ✅ Done | "test", "lint", "typecheck"    |

### Phase 3: Package Publication

**Goal:** NPM-publishable package with proper exports

| Task                      | File(s)                       | Status  | Notes                        |
| ------------------------- | ----------------------------- | ------- | ---------------------------- |
| Library build config      | vite.config.ts (lib mode)     | ✅ Done | External React, tree-shaking |
| Package exports           | package.json exports field    | ✅ Done | ESM entry points             |
| Peer dependencies cleanup | package.json                  | ✅ Done | React as peer dep only       |
| README for npm            | README.md                     | ✅ Done | Installation + quick start   |
| CHANGELOG                 | CHANGELOG.md                  | ✅ Done | Semantic versioning          |
| npm publish workflow      | .github/workflows/publish.yml | ✅ Done | CI publish on tag            |

### Phase 4: CLI Tool

**Goal:** `chameleon` CLI for scaffolding and adding components

| Task                      | File(s)       | Status  | Notes                     |
| ------------------------- | ------------- | ------- | ------------------------- |
| CLI scaffold              | packages/cli/ | 🔴 TODO | Commander.js or similar   |
| `chameleon init` command  | —             | 🔴 TODO | Create new project        |
| `chameleon add` command   | —             | 🔴 TODO | Add individual components |
| `chameleon theme` command | —             | 🔴 TODO | Switch/configure themes   |

---

## 📁 File-by-File Plan (Phase 2 Focus)

| #   | File Path                                                   | Purpose                       | Status  |
| --- | ----------------------------------------------------------- | ----------------------------- | ------- |
| 1   | `tsconfig.json`                                             | TypeScript strict config      | ✅ Done |
| 2   | `vitest.config.ts`                                          | Vitest configuration          | ✅ Done |
| 3   | `src/test-setup.ts`                                         | RTL setup + jest-dom matchers | ✅ Done |
| 4   | `src/app/components/chameleon/__tests__/utils.test.ts`      | cn() tests                    | ✅ Done |
| 5   | `src/app/components/chameleon/__tests__/context.test.tsx`   | Provider + hooks tests        | 🔴 TODO |
| 6   | `src/app/components/chameleon/__tests__/atoms.test.tsx`     | Atom component tests          | ✅ Done |
| 7   | `src/app/components/chameleon/__tests__/molecules.test.tsx` | Molecule component tests      | 🔴 TODO |
| 8   | `eslint.config.js`                                          | ESLint flat config            | ✅ Done |
| 9   | `.prettierrc`                                               | Prettier config               | ✅ Done |

---

## 🧪 Testing Plan

| Test File            | What It Tests                                    | Status  |
| -------------------- | ------------------------------------------------ | ------- |
| `utils.test.ts`      | `cn()` class merging                             | 🔴 TODO |
| `context.test.tsx`   | ChameleonProvider, useChameleon, useThemeClasses | 🔴 TODO |
| `atoms.test.tsx`     | Button variants/sizes, Input, Badge, Progress    | 🔴 TODO |
| `molecules.test.tsx` | Card, Tabs, Dialog, Alert, StatCard              | 🔴 TODO |
