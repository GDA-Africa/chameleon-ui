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

### [architecture] Dual component systems exist

**2026-04-05** — There are two component directories: `src/app/components/chameleon/` (the actual library, ~45 components) and `src/app/components/ui/` (40+ shadcn/ui base components, mostly unused). The Chameleon components are the real library; the `ui/` directory appears to be scaffolding from Figma export. Do not confuse them.

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
