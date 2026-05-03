# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.7] - 2026-05-03

### Added
- **Template Library page** — `TemplateShowcase` now includes a searchable directory of all 10 templates with collapsible cards, accent-color picker, copy-paste starter code, and quick usage snippets, above the existing live-preview tabs.
- **`lib-src/` in published package** — CLI scaffoldable source files (`atoms.tsx`, `molecules.tsx`, `composites.tsx`, `templates.tsx`, `comprehensive-templates.tsx`, `comprehensive-templates-part2.tsx`) are now copied into `lib-src/` at build time and included in the npm package, fixing `chameleon template` and `chameleon add` failing with "Source file not found" in consumer projects.

### Fixed
- **`chameleon template <name>` source not found** — CLI `LIB_SRC` path now resolves to the published `lib-src/` directory when installed from npm, falling back to the dev source tree for local development.
- **TS7053 in `component-docs-directory-page.tsx`** — cast `component.category` to `DocsCategory` when indexing `categoryIcon` to satisfy strict TypeScript, since the manifest's `"template"` category is filtered out at runtime but not narrowed by `.filter()`.

## [1.0.6] - 2026-05-03

### Changed
- **Release metadata bumped to 1.0.6** — updated `package.json` and lockfile version metadata for the new publish target.
- **Library docs synchronized** — updated version references in `docs/00-index.md`, `docs/01-overview.md`, `AI_INTEGRATION_GUIDE.md`, `public/context.md`, and `public/llms.txt`.
- **Frontend app release copy updated** — updated visible version labels in `enhanced-landing.tsx` and documentation callouts in `comprehensive-templates-part2.tsx` and `src/pages/auth-flow.tsx`.
- **AI manifest summary updated** — `CHAMELEON_AI_SUMMARY.version` and manifest header now report `1.0.6` for agent-facing integrations.

## [1.0.2] - 2026-04-17

### Fixed
- **TS2307 "Cannot find module" in consumer projects** — `vite-plugin-dts` was outputting declaration files to `dist/src/app/components/chameleon/index.d.ts` instead of `dist/index.d.ts`. Added `outDir: "dist"` and `rollupTypes: true` to the dts plugin config so all types are rolled into a single `dist/index.d.ts` that matches the `"types"` field in `package.json`.
- **TS2882 CSS side-effect import warning in dts** — added `vite-env.d.ts` to the dts `include` list so `declare module "*.css"` is resolved during declaration generation.

## [1.0.1] - 2026-04-17

### Added
- **`DatePicker` atom** — fully theme-aware date picker supporting `single` and `range` modes, month navigation, `minDate`/`maxDate` guards, clear button, and framer-motion popup animation across all 5 themes.
- **AI briefing copy button** — prominent "Copy AI Briefing" button in the AI Docs page hero and a secondary copy button in the Workshop navbar; copies the full `CHAMELEON_AI_WRITEUP` markdown to clipboard in one click.
- **"Copy as Markdown" button** on the CLI Reference page — exports the full CLI command reference as formatted markdown for use in AI context windows or documentation.
- **Crawlable static files** for AI agents: `public/llms.txt`, `public/context.md`, `public/manifest.json`, `public/sitemap.xml` — all served from `chameleon.glenhalton.com` as static assets.
- **`index.html` AI crawler meta tags** — `<link rel="alternate">` for each static AI resource, `<meta name="ai-context">`, `<meta name="llms-txt">`, and `<link rel="sitemap">`.
- **`DatePicker` CLI registration** — `datepicker` entry added to the CLI `COMPONENTS` registry with `single` and `range` variants.
- **`DatePicker` AI manifest entry** — full entry in `CHAMELEON_AI_MANIFEST` with 9 props, minimal + full examples, use cases, and keywords.

### Changed
- **`deploy.sh`** — rewritten from static-file-zipping to a full build-then-deploy flow: runs `npm run build:app` → validates `dist-app/` → zips → `scp` → `ssh` unzip.
- **`CLIMockup`** (`cli.tsx`) — removed `max-w-2xl mx-auto` constraint; component now spans full page width (`w-full`).

### Fixed
- **CLI docs "Copy as Markdown" button — light mode invisible** — replaced hardcoded `bg-white/5 text-white/60 border-white/10` with CSS custom property classes (`var(--muted)`, `var(--muted-foreground)`, `var(--border)`, `var(--accent)`) so the button is visible in all themes and modes.
- **CLI docs page light mode text visibility** — command list sidebar items and search input were using `text-white/80` / `bg-white/3` without a dark backing; both are now inside the always-dark `bg-[#0d1117]` terminal card.

## [1.0.0] - 2026-04-14

### Added
- **Global custom brand color** — select a primary color in the Theme Visualizer and it applies across the entire platform (sidebar, templates, component docs, everything). Resets to theme defaults on clear.
- **Shared color utilities** (`utils.ts`) — `hexToRgb`, `generateVariations`, and `getContrastColor` extracted to a shared module for reuse across the codebase.
- **Reset button** in Theme Visualizer — appears when a custom brand color is active; clears the override instantly.

### Changed
- **`ChameleonProvider` context** — new `customBrandColor` / `setCustomBrandColor` state; `cssVars` memo now derives `--primary`, `--primary-foreground`, `--secondary`, and `--secondary-foreground` from the custom color when set.
- **Theme Visualizer** — no longer uses local `useState` for the brand color; reads/writes from global context so colour choice persists across page navigation.
- **Showcase components** — `ComponentShowcase` Live Preview and Source Code panels gain `min-w-0`, `max-w-full`, and `overflow-x-auto` to prevent horizontal overflow on mobile.
- **`CodeBlock`** (`showcase.tsx`) — `<pre>` constrained with `w-full max-w-full` to stay within its grid cell.
- **`CodeSnippet`** (`component-docs-page.tsx`) — wrapper div gains `w-full min-w-0 max-w-full`.
- **`App.tsx` main area** — added `min-w-0` to the flex child so content can shrink below its intrinsic width on mobile.

### Fixed
- **Horizontal overflow / "two-tone" background** on Material, Simple, and Minimalist themes — added `overflow-x: hidden` on `html, body` in `index.css`.
- **ESLint CI failure** — added Node.js globals (`process`, `console`) for `**/*.js` files in `eslint.config.mjs`.
- **`auth-flow.tsx`** import paths — corrected relative imports to point to `../app/components/chameleon/` instead of broken sibling references.

## [0.0.3] - 2026-04-15

### Added
- **Full mobile responsiveness** — complete media query implementation across the entire Workshop UI
- **Dynamic viewport height** — `h-dvh` on the sidebar for correct iOS Safari rendering (prevents the url-bar shrink bug)
- **Body scroll lock** — `document.body.style.overflow = "hidden"` applied when mobile drawer is open to prevent background scroll
- **`AnimatePresence` backdrop** — animated semi-transparent overlay behind the mobile drawer with `lg:hidden` guard
- **`vite.config.app.ts`** — new separate Vite config in app-mode that outputs to `dist-app/` for cPanel static deployment
- `build:app` npm script for producing a deployable static site without touching the library build

### Changed
- **Sidebar breakpoint** — switched from `md:` (768px) to `lg:` (1024px) so tablets also get the mobile drawer experience
- **Sidebar animation** — `translate-x-full` → `translate-x-0` slide-in; `lg:translate-x-0` always visible on desktop
- **Main layout** — `ml-72` → `lg:ml-72` so content fills full width on mobile/tablet
- **Header** — `h-14 sm:h-16`, `px-4 sm:px-6`; hamburger `<Menu>` button visible only on `lg:hidden`
- **Content area** — `px-4 sm:px-6 lg:px-10 py-6 lg:py-10`
- **Footer** — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, `px-4 sm:px-6 lg:px-10`
- **Landing hero section** — spacing `space-y-32` → `space-y-16 sm:space-y-24 lg:space-y-32`; section padding scales with viewport; trust-badge row gains `flex-wrap`
- **Theme showcase grid** — `md:grid-cols-5` → `grid-cols-2 sm:grid-cols-3 md:grid-cols-5` for narrow screens
- **Features grid** — `md:grid-cols-3` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **Testimonials grid** — `md:grid-cols-3` → `grid-cols-1 md:grid-cols-3`
- **CTA card padding** — `p-12 md:p-16` → `p-8 sm:p-12 md:p-16`
- **Component Docs page** — page `h1` scales `text-3xl sm:text-4xl lg:text-5xl`; `SectionHeader h2` scales `text-2xl sm:text-3xl`; all preview card containers use `p-4 sm:p-8`; PricingCard demo grid `md:grid-cols-3` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **CLI Docs page** — page `h1` scales `text-3xl sm:text-4xl lg:text-5xl`; Quick Reference table wrapped in `overflow-x-auto` with `min-w-[480px]` inner container to prevent column collapse on mobile
- **`molecules.tsx`** — `DialogContent` constrained with `w-[calc(100%-2rem)] sm:w-full` to prevent edge-clipping on phones; `CardHeader`/`CardContent` padding `p-6` → `p-4 sm:p-6`; `TabsList` gains `flex flex-wrap` + `rounded-2xl` so tabs stack on narrow screens; `StatCard` `p-4 sm:p-6`; `PricingCard` `p-5 sm:p-8`
- **`composites.tsx`** — `KanbanBoard` columns `w-72` → `w-[280px] sm:w-72` for phone-width boards with horizontal scroll
- **`comprehensive-templates.tsx`** — all four templates (`LandingPage`, `BlogArticle`, `PricingPage`, `ContactSupport`) fully responsive: hero h1 `text-3xl sm:text-5xl md:text-6xl`, all `md:grid-cols-3` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, CTA `p-6 sm:p-12 md:p-16`, feature comparison table `overflow-x-auto min-w-[480px]`, newsletter input row stacks `flex-col sm:flex-row`, contact form name fields `grid-cols-1 sm:grid-cols-2`
- **`comprehensive-templates-part2.tsx`** — AdminDashboard header wraps `flex-col sm:flex-row gap-4`, h1 `text-3xl sm:text-4xl`; EcommerceProduct h1 and price `text-3xl sm:text-4xl`, reviews grid `grid-cols-1 sm:grid-cols-2`; Settings h1 scaled, name fields `grid-cols-1 sm:grid-cols-2`; DocsTemplate h1 `text-3xl sm:text-5xl`, components grid `grid-cols-1 sm:grid-cols-2`
- **`templates.tsx`** — `SettingsTemplate` sidebar/content split `md:grid-cols-[200px_1fr]` → `grid-cols-1 md:grid-cols-[200px_1fr]` so nav stacks above content on mobile

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
