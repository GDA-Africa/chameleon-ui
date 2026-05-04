# Chameleon Ui — Knowledge Base

> **Progressive learning file.** AI agents append entries here as they discover
> project-specific insights. This file grows organically — never delete entries.

---

## How This Works

- **When to add:** After discovering something non-obvious — a bug pattern, an architecture decision, a package quirk, a performance finding, a convention choice
- **When NOT to add:** Routine task completion (that goes in `index.md` Progress Log)
- **Format:** One entry = category tag + one-line insight + optional detail line
- **When to read:** Before making architectural decisions, debugging recurring issues, or choosing packages/patterns — scan for relevant categories first

---

## Categories

| Tag            | Use When                                                |
| -------------- | ------------------------------------------------------- |
| `architecture` | Design decisions, structural choices, why X over Y      |
| `bug-fix`      | Recurring bugs, root causes, things to watch for        |
| `pattern`      | Code patterns that work well (or don't) in this project |
| `package`      | Package quirks, version issues, config gotchas          |
| `performance`  | Bottlenecks found, optimizations applied                |
| `convention`   | Team/project conventions established during development |
| `gotcha`       | Non-obvious traps, edge cases, things that wasted time  |

---

## Entries

<!-- AI: Append new entries below this line. Format:

### [CATEGORY] Short title
**2026-04-04** — One-line insight.
Optional: Brief supporting detail (1-2 sentences max).

-->

### [convention] Project scaffolded with NEXUS CLI

**2026-04-04** — This project was generated with NEXUS CLI. Follow the doc system in `.nexus/docs/` and always read `index.md` (the brain) before each task.

### [gotcha] No tsconfig.json exists

**2026-04-05** — Despite being a TypeScript project, there is no `tsconfig.json` file. Vite handles TS transpilation without it, but strict mode checking (`npx tsc --noEmit`) cannot run without one. This must be created before any CI or type-checking work.

### [gotcha] CI/CD workflow file does not exist

**2026-04-05** — The original index.md claimed `.github/workflows/ci.yml` exists, but only `.github/copilot-instructions.md` is present. The CI pipeline needs to be created from scratch.

### [architecture] Package manager is pnpm, not yarn

**2026-04-05** — Despite NEXUS manifest saying `yarn`, the project has `pnpm-workspace.yaml` and no `yarn.lock`. Use `pnpm` for all package commands.

### [architecture] Crawlable static files for AI agents

**2026-04-17** — Since the workshop is a React SPA, bots can't read the UI. Added `public/llms.txt`, `public/context.md`, `public/manifest.json`, and `public/sitemap.xml` as static crawlable files. `index.html` links to them via `<link rel="alternate">` and `<meta name="ai-context">` tags.

### [pattern] AI briefing copy button pattern

**2026-04-17** — The `CHAMELEON_AI_WRITEUP` constant in `ai-docs-page.tsx` is a markdown string that serves as a one-click context dump for AI agents. Keep it in sync with `public/context.md`. Both files cover the same ground but `context.md` is more detailed (with full examples); the writeup is a compact briefing.

### [package] React 19 with React 18 peer deps

**2026-04-05** — `package.json` has React 19.2.4 in dependencies but declares React 18.3.1 as optional peer dependency. This should be reconciled — either the peer dep should be `^19.0.0` or the dependency should be `^18.0.0`.

### [architecture] Tailwind CSS v4 with @tailwindcss/vite

**2026-04-05** — Uses Tailwind v4's new Vite plugin approach. PostCSS config is intentionally empty. Tailwind is configured via `@import 'tailwindcss' source(none)` in `tailwind.css` with explicit `@source` directive. Do NOT add old-style `tailwind.config.js`.

### [performance] Glassy/Liquid themes caused UI freeze — root causes

**2026-04-05** — Six root causes identified: (1) GlassyBackground used 3 JS-animated motion.div orbs with 60-80px CSS `filter: blur()` running every frame, (2) LiquidBackground used 4 JS-animated blobs with 60+px blur PLUS 6-keyframe borderRadius morphing causing per-frame layout recalc, (3) `[data-chameleon-theme] *` CSS selector applied transitions to every DOM element, (4) `useThemeClasses()` was unmemoized with 50+ call sites, (5) 20+ `backdrop-blur-xl/3xl` compositing layers on screen simultaneously, (6) 20+ Animated wrappers all animating on mount simultaneously.

### [performance] Fix: Replace JS motion.div backgrounds with CSS @keyframes

**2026-04-05** — Replaced GlassyBackground and LiquidBackground `motion.div` elements with plain `<div>` elements using CSS `@keyframes` animations (`chameleon-glassy-drift`, `chameleon-liquid-morph`). CSS animations run on the compositor thread and don't trigger JS-driven per-frame recalculation. Added `contain: strict` on background containers and `contain: layout paint` on individual orbs/blobs.

### [performance] Fix: Scope CSS transition selectors, never use `*`

**2026-04-05** — The `[data-chameleon-theme="liquid"] *` and `[data-chameleon-theme="minimalist"] *` selectors were applying transition-timing-function to every single DOM element. Replaced with scoped selectors targeting only `button, input, select, textarea, a, [role="button"], [data-chameleon-animated]`. Massive style recalculation reduction.

### [performance] Fix: Memoize useThemeClasses with useMemo

**2026-04-05** — Wrapped the entire `useThemeClasses()` return value in `useMemo([theme, mode])`. Previously rebuilt 10+ class string objects on every render across 50+ call sites. Now only recalculates when theme or mode actually changes.

### [performance] Fix: Downgrade backdrop-blur levels for glassy theme

**2026-04-05** — Reduced `backdrop-blur-3xl` (64px) to `backdrop-blur-md` (12px) and `backdrop-blur-xl` (24px) to `backdrop-blur-sm` (4px) on overlays, dialog content, and gallery lightboxes. Each `backdrop-blur` creates a GPU compositing layer. Also reduced background orb blur from 60-80px to 40-55px.

### [performance] Fix: Animated/AnimatedList use whileInView instead of animate

**2026-04-05** — Changed `Animated` and `AnimatedList` components from `animate` (fires on mount) to `whileInView` with `viewport={{ once: true }}`. This prevents 20+ motion.div elements on the landing page from all animating simultaneously on page load.

### [convention] Theme tokens use CSS variables, not Tailwind theme

**2026-04-05** — All theming is done through CSS custom properties (`--primary`, `--card`, etc.) set dynamically via React Context, NOT through Tailwind's theme configuration. Components reference these as `var(--token)` in Tailwind classes like `bg-[var(--card)]`.

### [performance] Round 2: backdrop-blur is the primary scroll jank culprit

**2026-04-05** — After Round 1 fixes reduced freezing, scroll jank persisted on Glassy/Liquid. Root cause: `backdrop-blur` was applied to 20+ always-visible elements (header, sidebar, footer, every card, button, input, surface, badge, tabs). Each `backdrop-blur` creates a GPU compositing layer that must re-render the blurred background on every scroll frame. Removing ALL `backdrop-blur` from always-visible elements and keeping only semi-transparent `bg-white/X` backgrounds preserves the glassy look without GPU thrashing. Dialogs/modals can keep `backdrop-blur` since they block scrolling.

### [performance] Round 2: Replace filter:blur with box-shadow glow

**2026-04-05** — Background orbs/blobs in GlassyBackground and LiquidBackground used `filter: blur(40-55px)` on 60-90px elements. Even with CSS animations (not JS), `filter: blur` forces per-frame repaint of blurred pixels. Replaced with tiny elements (8-10px) using massive `box-shadow` spread (80-150px) for glow effect. Box-shadow on small elements with `will-change: transform` is essentially free — no pixel sampling, just a pre-rasterized glow that moves with the compositor.

### [performance] Round 2: border-radius animation triggers layout recalc

**2026-04-05** — The `chameleon-liquid-morph` keyframe animated `border-radius` across 6 keyframe stops. Changing `border-radius` triggers layout recalculation on every frame. Replaced with transform-only keyframes (translateX, translateY, scale, rotate). The blobs now morph via transform compositing, not geometry changes.

### [package] TypeScript 6 deprecates baseUrl

**2026-04-05** — TypeScript 6.0 deprecates the `baseUrl` compiler option. Use `paths` alone (e.g., `"@/*": ["./src/*"]`) without `baseUrl`. If you need `baseUrl`, add `"ignoreDeprecations": "6.0"` to silence the warning.

### [gotcha] motion/react event handler conflicts with React HTML props

**2026-04-05** — Spreading `...props` from `React.HTMLAttributes<HTMLDivElement>` onto `motion.div` causes type errors because motion redefines `onDrag`, `onDragStart`, `onAnimationStart` etc. with incompatible signatures. Don't spread HTML props onto motion components. Instead, pass only the specific props you need (className, children, etc.).

### [convention] noUncheckedIndexedAccess requires non-null assertions for arrays

**2026-04-05** — With `noUncheckedIndexedAccess: true`, every array index access returns `T | undefined`. For known-safe accesses (e.g., `steps[current]` where current is bounded), use the non-null assertion operator (`!`). For chart color arrays, we created a safe `color(i)` accessor function that wraps the index and asserts non-null.

### [package] React 19 ref callbacks must return void

**2026-04-05** — In React 19 + @types/react 19, ref callbacks must return `void` or a cleanup function. The pattern `ref={el => array[i] = el}` fails because the assignment expression returns the value. Fix: `ref={el => { array[i] = el; }}` (wrap in block statement).

### [performance] backdrop-filter on fixed/sticky elements kills scroll performance

**2026-04-14** — `backdrop-filter: blur()` on `position: fixed` or `position: sticky` elements forces the browser to re-composite the entire layer on EVERY scroll event. With a fixed sidebar (h-screen) + sticky header both using `backdrop-blur-xl`, glassy mode became completely unscrollable. Fix: remove `backdrop-blur` from all shell layout elements (sidebar, header, footer). The orb glow from box-shadow spread provides the glassy visual without any backdrop sampling.

### [gotcha] CSS contain:strict blocks scrolling in child elements

**2026-04-14** — `contain: strict` implies `contain: size layout paint style` — the `size` containment makes the element act as a scroll container. When applied to a `position: fixed` full-viewport background div, it silently blocked scrolling in the main content area. Fix: use `contain: paint` instead, which restricts overflow painting without creating a scroll container.

### [architecture] Workshop UI navigation — 7 pages, 4 sidebar groups

**2026-04-14** — App.tsx was reorganised from 9 scattered pages (831 lines) to 7 purposeful pages (558 lines). Page type: `"landing" | "component-docs" | "cli-docs" | "docs" | "visualizer" | "animations" | "templates"`. Sidebar has 4 named groups: Overview, Components, Documentation, Theme Tools. Two new page files created: `cli-docs-page.tsx` and `component-docs-page.tsx`.

### [gotcha] Glassy light mode — all shell values were hardcoded dark

**2026-04-14** — The original glassy sidebar/header/footer/userCard/searchInput strings were single dark-only values (e.g. `"bg-[#0d0a1a]/85 backdrop-blur-2xl"`). With no mode branch, switching to light mode left the sidebar black. Fix: all 5 glassy shell strings in App.tsx are now ternary-branched on `mode === "dark"`. Also strengthened `--muted` token from `rgba(255,255,255,0.5)` (invisible) to `rgba(237,230,255,0.85)` and `--border` from `0.25` to `0.30` opacity for visible tab demarcation.

### [performance] React.memo + useMemo on GlassyBackground and LiquidBackground

**2026-04-14** — Both ambient background components were re-rendering on every parent state change. Wrapped both in `React.memo()` and moved `spreadSize`, `baseOpacity`, and the `orbs` array into `useMemo` with appropriate dependency arrays. Combined with removing `will-change: transform` (previously forced 6 GPU layers) and fixing `color-scheme: dark` being applied to both modes (caused style recalc storm on light mode).

### [convention] CLI binary lives in bin/chameleon.js — no external framework

**2026-04-14** — The CLI (`bin/chameleon.js`) is a plain ESM Node.js script using only native `fs`, `path`, `child_process`, and `url`. No Commander.js or chalk installed. ANSI colors are hand-written escape codes. Registered in `package.json` `bin` field as both `chameleon` and `chameleon-cli`. Accessible after `npm link` in the repo root. 13 commands, all real FS operations against the `COMPONENTS` (28 entries) and `TEMPLATES` (14 entries) registries.

### [pattern] Mobile-first responsive grid pattern for this project

**2026-04-15** — Standard pattern: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`. Standard padding: `p-4 sm:p-6`. Standard hero heading: `text-3xl sm:text-5xl md:text-6xl`. Standard page content: `px-4 sm:px-6 lg:px-10`. Sidebar collapse breakpoint is `lg:` (1024px), not `md:`, so tablets get the mobile drawer experience.

### [gotcha] replace_string_in_file truncates array literals that share array-start syntax

**2026-04-15** — When an array `[{ ... }]` is inlined in JSX and the oldString starts mid-array (after the `[`), the tool can accidentally drop the first array element. Always include at least the opening `[` and the first element in the oldString to avoid silent data loss. If the replacement breaks JSX parsing, re-read the region and restore the full array.

### [gotcha] Consumer projects require explicit Tailwind v4 Vite plugin — not auto-detected

**2026-04-17** — BrandDrop integration test: the most common "Chameleon looks unstyled" failure is that `@tailwindcss/vite` is not added to the host's `vite.config.ts`. Tailwind v4 does not fall back gracefully — it just produces unstyled HTML. `chameleon init` must detect and fix this automatically (see F21).

### [architecture] Generated files from `chameleon add` are not self-contained

**2026-04-17** — `chameleon add <component>` copies a single file but components import local modules (`context.tsx`, `utils.ts`, `animations.tsx`) that may not exist in the host app. This causes compile errors immediately after scaffolding. Fix (F22): either copy deps automatically or rewrite imports to the package export path.

### [architecture] No stable public CSS export exists yet

**2026-04-17** — The package `exports` map does not include a `"./styles"` entry. Consumers must import internal build paths (e.g. `dist/index.css`), which is fragile and breaks on version bumps. Adding a stable `@chameleon-ui-lib/react/styles` public entry is P0 for adoption (see F23).

### [gotcha] Generated code can fail strict TS + ESLint in host apps

**2026-04-17** — Chameleon-generated files use patterns (implicit `any`, unused imports) that pass in our own relaxed config but break in typical strict consumer setups. All code generation templates in `bin/chameleon.js` must be audited for strict TS compliance before next release (see F24).

### [convention] Release ritual for this project

**2026-04-17** — Release steps: (1) bump `package.json` version, (2) add CHANGELOG entry, (3) `tsc --noEmit && vitest run && eslint .` — all must pass, (4) `git add -A && git commit -m "chore: release vX.Y.Z"`, (5) `git tag vX.Y.Z && git push origin main --tags` — the `v*` tag triggers `publish.yml` on GitHub Actions which runs `npm publish`. Update NEXUS `index.md` after.

**2026-05-03 (extension)** — If a release includes new features/functionality, also update all user-facing surfaces in the same release commit: `README.md`, relevant docs in `docs/`, frontend UI release/version strings, and AI/crawler context (`AI_INTEGRATION_GUIDE.md`, `public/context.md`, `public/llms.txt`, `CHAMELEON_AI_SUMMARY.version`). This prevents version drift between npm metadata and product/docs messaging.

### [gotcha] Light mode buttons with hardcoded white/opacity classes

**2026-04-17** — Buttons styled with `bg-white/5 text-white/60 border-white/10` are invisible in light mode. Use CSS custom properties (`var(--muted)`, `var(--muted-foreground)`, `var(--border)`, `var(--accent)`) instead — these adapt to the active theme and mode automatically.

### [package] npm publish filtering can silently drop dist artifacts

**2026-05-03** — Because `.gitignore` excludes `dist/`, npm publish/pack can omit build outputs unless `package.json` explicitly whitelists them via `files`. This caused consumer `TS2307` errors for `@chameleon-ui-lib/react` since `exports` pointed at missing `dist/index.*` files. Keep a `files` whitelist and verify every release with `npm pack --dry-run`.

### [convention] Release versions must be synchronized across docs and app copy

**2026-05-03** — In addition to bumping `package.json`, release versions are displayed in frontend copy (`enhanced-landing`, docs templates), AI manifest summary, and crawlable context files (`public/context.md`, `public/llms.txt`). Keep these in lockstep during every release to avoid mismatched guidance between npm metadata and app/docs surfaces.

### [convention] Run isolated consumer smoke test before release

**2026-05-03** — Added `npm run verify:consumer` (`scripts/verify-consumer.mjs`) to pack the library, install it in a clean temp app, and verify both TS imports and runtime exports (`ChameleonProvider`, `Button`). Run this before publishing any release to catch packaging/export regressions customers would see.

### [convention] Keep stable page module names during docs IA refactors

**2026-05-03** — When rebuilding large frontend docs pages, keep the old module path as a thin re-export bridge (for example, `component-docs-page.tsx` → `component-docs-directory-page.tsx`) so imports across the app and downstream tooling don't break during migration.

### [package] vite-plugin-dts rollupTypes incompatible with TypeScript 6

**2026-05-03** — `vite-plugin-dts` bundles api-extractor pinned to TypeScript 5.9.3. Enabling `rollupTypes: true` against project TypeScript 6.0.2 fails CI. Workaround applied in `b0d8c23`: leave `rollupTypes` disabled and let `vite-plugin-dts` emit per-file declarations that get rolled up via the package `exports` map. Re-evaluate when api-extractor catches up.

### [gotcha] Global version-bump scripts can corrupt transitive lockfile entries

**2026-05-03** — A simple `sed`-style bump that targets all `"version": "1.0.7"` strings in `pnpm-lock.yaml` will incorrectly rewrite unrelated transitive dependencies (`path-parse`, `available-typed-arrays`, `typed-array-length`) that happen to be at version 1.0.7. The CI fix in `b0d8c23` had to manually restore those. For future bumps, scope the find/replace to the package's own `version:` block at the top of the file, not the whole file.

### [architecture] v1.0.9 composite-first plan — 31 atomic tasks across 4 phases

**2026-05-03** — The v1.0.9 plan lives in `.nexus/plans/composite-fix-*.md` (blueprint, vision, architecture, implementation). Key locked-in decisions: (1) composites are *sections* composed of molecules — not atoms, not pages; (2) props flow Template → Composite → Molecule → Atom via a `styleConfig` object on templates; (3) all 40–50 composites land in a new top-level `src/composites/` tree with central `index.ts` and `types.ts`; (4) zero breaking changes — `styleConfig` is optional and defaults preserve current behavior; (5) subpath exports `/composites`, `/templates`, `/types` ship in package.json. Templates re-export their own composites so downstream code can import from either location.

### [package] Subpath exports can map to root bundle in single-entry builds

**2026-05-04** — With the current Vite library setup using a single entry (`src/app/components/chameleon/index.ts`), subpath exports (`/composites`, `/templates`, `/types`) can safely point to the same compiled `dist/index.*` files to preserve import ergonomics without changing the build graph. If true per-subpath tree shaking is needed later, introduce explicit multi-entry outputs first.

### [bug-fix] Typed template `styleConfig` must be verified for runtime usage

**2026-05-04** — Several templates had valid `styleConfig` typings but still used `void styleConfig` internally, so overrides were silently ignored at runtime. For composite-first work, always verify both type acceptance and actual template-level pass-through behavior.

### [pattern] Auth forms should expose dual-mode state + slot styling APIs

**2026-05-04** — For reusable auth flows, the safest contract is dual-mode state (`value`/`defaultValue`/`onChange`) plus slot-level styling maps (`classNames` and `styles`). This allows turnkey internal handling by default while still supporting full external orchestration and per-element visual customization without forks.

### [convention] Keep composites docs separate from atom/molecule docs

**2026-05-04** — The component directory should focus on primitives (atoms + molecules), while composites live on their own searchable page with full prop/reference detail. This prevents duplicate entries and makes “where to look” unambiguous for users and AI agents.

### [gotcha] Block-commenting legacy JSX can fail on embedded `{/* ... */}`

**2026-05-04** — During large docs-page refactors, wrapping old JSX in a single `/* ... */` block can break unexpectedly because JSX inline comments contain `*/`, which prematurely terminates the outer block comment. For heavily mixed legacy files, prefer one-shot full-file overwrite to avoid parser drift.
