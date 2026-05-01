---
title: Glossary
purpose: Disambiguate terminology used across the codebase.
---

# Glossary

Terms used in source, docs, and the AI manifest. Listed in the order they typically come up.

## Atomic design tiers

- **Atom** — Smallest reusable component (Button, Input, Badge). Cannot be decomposed further. Lives in `atoms.tsx`.
- **Molecule** — Composition of atoms (Card, Tabs, Alert, StatCard). Lives in `molecules.tsx`.
- **Composite / Organism** — Larger composition with significant logic (DataTable, KanbanBoard, ThemeChart). Lives in `composites.tsx`. The terms are used interchangeably; the manifest uses `organism` as the category name.
- **Template** — Full-page layout (LandingPageTemplate, AuthTemplate). Lives in `templates.tsx` and friends.

## Theme terminology

- **Theme** — One of `material`, `simple`, `minimalist`, `glassy`, `liquid`. A set of CSS variables + class strings + animation preset.
- **Mode** — One of `light` or `dark`. Each theme defines tokens for both.
- **Token** — A named CSS custom property (`--primary`, `--card`, etc.). Defined in `themeTokens` per theme/mode combination.
- **Theme class** — A pre-baked Tailwind class string returned by `useThemeClasses()` (e.g. `buttonPrimary`, `cardClass`). Components use these instead of branching on theme themselves.
- **Intensity** — Per-theme adjustable parameter (0–100). Currently `glassyIntensity` (controls `--glass-blur`) and `liquidIntensity` (controls aurora animation amplitude).
- **Custom brand color** — A hex string that overrides `--primary` and `--secondary` via `setCustomBrandColor()`. Foreground colors are auto-computed.

## Component-prop terminology

- **`animated`** — Boolean prop on most components. When true, the component reads `animationPresets[theme]` and applies hover/tap/enter physics.
- **`variant`** — A union-typed string prop selecting a visual variant (`primary | secondary | ghost | outline` for Button; `info | success | warning | error` for Alert).
- **`size`** — A union-typed sizing prop. Conventional values: `sm | md | lg | icon` for Button, `sm | md | lg | xl` for Avatar.
- **`asChild`** — Radix-pattern prop. When true, the component renders via `Slot` so it inherits children's element type. Used for routing wrappers (`<Button asChild><Link to="/x">…</Link></Button>`).
- **`elevation`** — Material-design-only prop on Card (`0 | 1 | 2 | 3`). Selects a shadow utility. Has no effect outside `material` theme.

## Animation terminology

- **Preset** — A `ThemeAnimationPreset` object holding all motion variants for a theme. Indexed by theme name.
- **Variant** (motion sense) — A named animation state in the `motion` library — distinct from a UI variant. Used in stagger lists.
- **Stagger** — Delayed entry of list children (`stagger.container` + `stagger.item` Variants). Wrapper component is `<AnimatedList>`.
- **`whileInView`** — Motion's "animate when scrolled into view" trigger. Used with `once: true` to avoid re-animating on scroll-back.

## File terminology

- **Manifest** — The `ai-manifest.ts` file. The AI-readable component catalog.
- **Recipe** — A pre-built code snippet in `AI_COMPONENT_RECIPES` (string of JSX). Selected via `selectRecipeForTask()`.
- **Helper** — A utility function in `ai-helpers.tsx` (e.g. `validateComponentProps`).
- **Showcase** — Demo galleries in `showcase.tsx`, `showcase-examples.tsx`, `auth-showcase.tsx`, etc. Not part of the published library.
- **Docs page** — In-app documentation views (`*-docs-page.tsx`). Render the manifest as a browseable UI. Demo-only.

## Build terminology

- **Library build** — Output of `npm run build`. Goes to `dist/`. Externalizes React. Used by npm consumers.
- **App build** — Output of `npm run build:app`. Goes to `dist-app/`. Bundles everything. Used to deploy the demo at `chameleon.glenhalton.com`.
- **Externals** — Packages excluded from the bundle (peer deps). Configured in `vite.config.ts::build.rollupOptions.external`.

## CLI terminology

- **`chameleon init`** — Scaffold a new project with Chameleon UI pre-wired.
- **`chameleon add <component>`** — Copy a component into a target project (shadcn-style).

## Shorthand frequently used

- **CTA** — Call to action (a `variant="primary"` Button).
- **Atomic** — Refers to the Atomic Design methodology, not nuclear physics.
- **`cn()`** — Class-name merge function. Pure utility; pronounced "see-n" or "class-name".
- **`use*()`** — React hook convention; all hooks in this library start with `use`.
- **`as*` / `*Foreground`** — Token convention. `--foreground` always pairs with `--background`; `--card-foreground` always pairs with `--card`. The pair guarantees contrast.

## Aliases that may confuse

- **`Animated` (component)** ≠ **`animated` (prop)**. `<Animated>` is a wrapper that adds entrance animation; the `animated` prop on atoms enables hover/tap motion.
- **Composite** ≠ **Composition**. "Composite" is the tier name; "composition" is the design pattern of building a component from smaller ones.
- **Theme** in this codebase ≠ "color theme" generally. Chameleon themes encode shape, motion, typography, and palette — not just colors.
- **`Tabs`** is the Radix root re-export. **`TabsList`/`TabsTrigger`/`TabsContent`** are themed wrappers around the Radix primitives.
- **`Dialog`** likewise — root is re-exported from Radix; `DialogContent`/`DialogHeader`/`DialogTitle` are themed.

## Things that look like APIs but aren't

- **`window.chameleon`** — Does not exist. The library has no global side effects.
- **`process.env.CHAMELEON_THEME`** — Not read anywhere. Theme is controlled exclusively via `<ChameleonProvider initialTheme="…">` and `useChameleon().setTheme()`.
- **`<ChameleonRoot>`** — Not a thing. The provider is `<ChameleonProvider>`.
- **`@chameleon-ui-lib/react/atoms`** — No subpath exports beyond the top-level `.` and `./styles`. Import everything from `@chameleon-ui-lib/react`.
