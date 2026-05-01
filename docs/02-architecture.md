---
title: Architecture
purpose: How the codebase is laid out, how components compose, and how the build works.
---

# Architecture

## Repository layout

```
chameleon-ui/
├── src/
│   ├── main.tsx                       # Demo app entry (not shipped)
│   ├── app/
│   │   ├── App.tsx                    # Demo app root
│   │   └── components/
│   │       ├── chameleon/             # ★ THE LIBRARY ★
│   │       │   ├── index.ts                       # Public barrel
│   │       │   ├── context.tsx                    # Provider, theme tokens, hooks, i18n
│   │       │   ├── atoms.tsx                      # 9 atom components
│   │       │   ├── molecules.tsx                  # 11 molecule components
│   │       │   ├── composites.tsx                 # 10 organism-tier components
│   │       │   ├── templates.tsx                  # 4 simple templates + re-exports
│   │       │   ├── comprehensive-templates.tsx    # 4 advanced templates
│   │       │   ├── comprehensive-templates-part2.tsx  # 6 more templates
│   │       │   ├── auth-components.tsx            # 10 auth UI components
│   │       │   ├── animations.tsx                 # Motion presets + Animated wrappers
│   │       │   ├── utils.ts                       # cn(), color helpers
│   │       │   ├── ai-manifest.ts                 # ⚙️  Machine-readable component catalog
│   │       │   ├── ai-helpers.tsx                 # Validators + discovery utilities
│   │       │   ├── *-docs-page.tsx                # In-app documentation pages (demo)
│   │       │   ├── showcase*.tsx                  # Demo galleries
│   │       │   └── __tests__/                     # Vitest unit tests
│   │       ├── ui/                                # shadcn-style primitives (52 files)
│   │       └── figma/ImageWithFallback.tsx        # Figma-import fallback
│   ├── pages/auth-flow.tsx            # Demo auth flow page
│   └── styles/                        # Demo app styles
├── packages/cli/                      # `chameleon` CLI scaffolding tool
├── bin/chameleon.js                   # CLI entry shim
├── dist/                              # Build output (npm artifact)
├── dist-app/                          # Demo app build output (deployed at chameleon.glenhalton.com)
├── scripts/build-css.mjs              # Compiles Tailwind to dist/styles.css
├── public/                            # Static assets for demo
├── package.json                       # @chameleon-ui-lib/react
├── vite.config.ts                     # Library build config
├── vite.config.app.ts                 # Demo app build config
├── tsconfig.json + tsconfig.lib.json  # Type-checking configs
├── eslint.config.mjs                  # Flat ESLint config
└── .nexus/                            # Project knowledge artifacts (vision, manifests)
```

The library lives entirely under `src/app/components/chameleon/`. The `src/app/components/ui/` directory contains shadcn-style primitives consumed by the demo app — they are not part of the published package.

## Composition rules

Each layer imports only from the layer below it. This is enforced by code review, not lint, but holds throughout the codebase:

- **Atoms** → import from `context.tsx`, `animations.tsx`, `utils.ts`. Never from `molecules.tsx` or higher.
- **Molecules** → may import atoms.
- **Composites** → may import atoms and molecules.
- **Templates** → may import anything.
- **Auth components** → may import atoms and molecules. (They live as a peer to composites because they share that complexity tier but have a focused domain.)

## Theme engine flow

```
ChameleonProvider
  ├─ holds: theme, mode, lang, customBrandColor, glassyIntensity, liquidIntensity
  ├─ computes: cssVars (memoized) — picks tokens from themeTokens[theme][mode]
  │            and overrides --primary if customBrandColor set
  ├─ injects: <div data-chameleon-theme={theme} style={cssVars}>
  ├─ renders ambient backgrounds for "glassy" and "liquid" themes
  │
  └─ children consume via:
       useChameleon()      → raw context (theme, setTheme, mode, lang, ...)
       useThemeClasses()   → memoized class-string bundle for each theme
                             { cardClass, buttonPrimary, buttonSecondary,
                               buttonOutline, buttonGhost, inputClass,
                               badgeClass, textPrimary, textMuted,
                               textOnCard, textOnPrimary, surfaceClass,
                               theme, mode, isDark }
```

`useThemeClasses()` is the seam every component uses. Component code looks like:

```tsx
const { buttonPrimary } = useThemeClasses();
return <button className={cn("...layout classes...", buttonPrimary, className)} />;
```

The hook is `useMemo`-cached on `[theme, mode]` because it's called dozens of times per render. The class strings are pre-baked Tailwind utilities — no runtime CSS generation.

## How animation works

`animations.tsx` exports `animationPresets: Record<ChameleonTheme, ThemeAnimationPreset>`. Each preset bundles:

- `enter`, `fadeUp`, `scaleIn`, `slideIn`, `rotateIn` — initial/animate/transition triplets
- `stagger` — Variants for parent + child
- `hover`, `tap` — interaction states
- `bounce`, `pulse`, `shake` — looping or attention animations

Components opt in by accepting an `animated?: boolean` prop and reading `animationPresets[theme]` at render time. Most atoms use `motion.create(element)` from the `motion` package (formerly framer-motion) and pass `whileHover={preset.hover}` and `whileTap={preset.tap}`.

The standalone wrappers `<Animated>`, `<AnimatedList>`, `<AnimatedPage>` apply enter/stagger animations to arbitrary children using `whileInView` with `once: true` for performance.

## Build pipeline

| Command | What it does |
|---------|--------------|
| `npm run dev` | `vite` dev server for the demo app |
| `npm run build` | `vite build` (library) + `node scripts/build-css.mjs` |
| `npm run build:app` | `vite build --config vite.config.app.ts` (demo deployable) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | `vitest run` |
| `npm run lint` | `eslint .` |
| `npm run format` | `prettier --write .` |

`vite.config.ts` is the library build (entry: `src/app/components/chameleon/index.ts`, externalizes `react`/`react-dom`, emits ESM + CJS via `vite-plugin-dts` for type generation).

`vite.config.app.ts` is the demo build that ships to `chameleon.glenhalton.com` (`deploy.sh`).

## Testing

Vitest with jsdom. Two test files at the time of writing:

- `__tests__/utils.test.ts` — color/contrast helpers
- `__tests__/atoms.test.tsx` — atom-level rendering

Coverage target per the vision is 80%+ in V1.1. Test setup: `vitest.setup.ts` (one-line file importing `@testing-library/jest-dom`).

## CLI tool

Located in `packages/cli/`. Entry is `bin/chameleon.js` (shim) → `packages/cli/src/index.ts`. Provides `chameleon init` and `chameleon add <component>` commands. The CLI is shipped via the `bin` field in the root `package.json`.

## TypeScript configuration

- `tsconfig.json` — Strict mode for development (`strict: true`).
- `tsconfig.lib.json` — Library build config used by `vite-plugin-dts` for emitting `.d.ts` files.

Strict mode is enforced. Avoid `any` — most codepaths use proper generics (e.g., `DataTable<T>`).

## i18n

Translations are a flat dictionary in `context.tsx::translations` keyed by `en | es | fr`. `lang` is set on the provider via `initialLang` and at runtime via `useChameleon().setLang()`. Components consume translations by reading `lang` and indexing into `translations[lang]`. Adding a key requires editing all three locales — there is no fallback chain.
