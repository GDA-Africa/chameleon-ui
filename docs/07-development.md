---
title: Development
purpose: Local setup, scripts, tests, build, publish — everything a contributor needs.
---

# Development

## Setup

```bash
git clone <repo-url>
cd chameleon-ui
npm install        # or pnpm install / yarn — all three lockfiles are present
```

Node ≥18 recommended. The project uses `"type": "module"` so most scripts are ESM.

## Quickstart

```bash
npm run dev        # Vite dev server (demo app at http://localhost:5173)
npm run typecheck  # tsc --noEmit
npm run test       # vitest run
npm run lint       # eslint .
npm run format     # prettier --write .
```

## Scripts reference

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Demo app dev server |
| `build` | `vite build && npm run build:css` | Library build → `dist/` |
| `build:css` | `node scripts/build-css.mjs` | Compile Tailwind to `dist/styles.css` |
| `build:app` | `vite build --config vite.config.app.ts` | Demo app build → `dist-app/` |
| `typecheck` | `tsc --noEmit` | Strict type check (must pass before publish) |
| `test` | `vitest run` | One-off test run |
| `test:watch` | `vitest` | Watch mode for TDD |
| `lint` | `eslint .` | Flat ESLint config |
| `format` | `prettier --write .` | Format all files |

## Project conventions

### File naming
- Component files: kebab-case (`auth-components.tsx`).
- Component exports: PascalCase (`LoginForm`).
- Hooks: camelCase prefixed with `use` (`useThemeClasses`).
- Type-only files end in `.ts`, files with JSX in `.tsx`.

### Imports
- Within the library, use relative imports (`./atoms`, `./context`).
- Never import from `@chameleon-ui-lib/react` inside the library itself — that creates a self-cycle in the build.
- External UI primitives are pinned to specific versions in `package.json` (Radix, Recharts, motion).

### Styling
- All colors come from CSS variables. Hex values are forbidden in component code except in `themeTokens` and color-utility tests.
- Use `cn()` from `utils.ts` for class merging — it wraps `twMerge(clsx(...))` for proper Tailwind override resolution.
- Theme branching: prefer `useThemeClasses()`. Branch on `theme` directly only when the difference is structural (layout, not color).

### Animation
- Default to `animated={false}` on atoms — opt-in.
- Default to `animated={true}` on composites/molecules where the feel of the UI depends on motion (e.g. `MultiStepForm`, `KanbanBoard`).
- Use `animationPresets[theme]` rather than hardcoding transition values.

### Accessibility
- Keyboard navigation must work for any component the user can click.
- ARIA roles are required where Radix doesn't provide them (`role="separator"`, `role="progressbar"`, `role="switch"`).
- Focus rings use `--ring` and a 2px offset by convention.

## Build pipeline

`npm run build` does:

1. **`vite build`** — uses `vite.config.ts` (library mode):
   - Entry: `src/app/components/chameleon/index.ts`
   - Output: ESM (`dist/index.js`), CJS (`dist/index.cjs`)
   - Externalizes: `react`, `react-dom`, all peer-eligible packages
   - Type emission: `vite-plugin-dts` → `dist/index.d.ts`
2. **`scripts/build-css.mjs`** — compiles Tailwind v4 utilities used by the library to `dist/styles.css` so consumers can import `@chameleon-ui-lib/react/styles`.

`vite.config.app.ts` is for the demo app — it bundles everything (no externals) and emits to `dist-app/`. That's what `deploy.sh` ships to `chameleon.glenhalton.com`.

## Testing

Tests live in `src/app/components/chameleon/__tests__/`:
- `utils.test.ts` — color helpers (`hexToRgb`, `getContrastColor`, `generateVariations`)
- `atoms.test.tsx` — atom rendering with `@testing-library/react`

Run a single test file:

```bash
npx vitest run src/app/components/chameleon/__tests__/atoms.test.tsx
```

Setup: `vitest.setup.ts` (single line: `import "@testing-library/jest-dom"`). Configured via `vite.config.ts`'s `test` field. JSDom environment.

### Coverage target
Vision document says 80%+ for V1.1. Current coverage is well below that — adding tests is one of the open V1.1 tasks.

## Adding a component

1. Decide tier (atom / molecule / composite / template). Use the lowest possible.
2. Add the component to the appropriate `*.tsx` file (or create a new file under `src/app/components/chameleon/` if it's a new domain).
3. **Always** consume theme through `useThemeClasses()`. Never hardcode colors.
4. Add an `animated?: boolean` prop if the component is interactive.
5. Add a JSDoc block with `@component`, `@category`, `@complexity`, `@example` blocks (see existing atoms for the pattern).
6. Export it via `index.ts` if it's library-public.
7. Add an entry to `ai-manifest.ts::CHAMELEON_AI_MANIFEST` with prop schema, examples, keywords, theme compatibility.
8. Add an entry to `docs/04-components-catalog.md`.
9. Add a unit test in `__tests__/`.
10. If it's interactive enough to have animations, ensure all 5 themes have appropriate physics in `animationPresets`.

## Adding a theme

See `docs/03-themes.md::Adding a new theme`.

## Publishing

The package version is in `package.json`. To release:

```bash
# Bump version (manually edit package.json or use npm version)
npm version patch    # or minor / major
npm run build        # produces dist/
npm publish --access public
```

The `prepublishOnly` step is not configured — make sure you run `build` first. The `files` field is implicitly `dist/` plus root files matching the `exports` map, so `dist/` must be present.

## Demo app deploy

```bash
npm run build:app
./deploy.sh          # ships dist-app/ to chameleon.glenhalton.com
```

`deploy.sh` is a shell script in the repo root — read it before running to confirm the target.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| "useChameleon must be used within a ChameleonProvider" | Component rendered outside the provider tree | Wrap your tree in `<ChameleonProvider>` at the app root |
| Glassy theme looks like solid lavender, no blur | Browser doesn't support `backdrop-filter` | Modern Chromium/Safari are fine; older Firefox needs the layout.css.backdrop-filter.enabled flag |
| Tailwind classes not applying | Tailwind v4 plugin missing in Vite config | Add `tailwindcss()` to `vite.config.ts`'s plugins |
| Type errors after `npm install` | Lockfile drift between `package-lock.json` and `pnpm-lock.yaml` | Pick one package manager, delete the other lockfiles |
| Build emits wrong types | `vite-plugin-dts` cache stale | `rm -rf dist node_modules/.vite && npm run build` |

## .nexus directory

The repository includes a `.nexus/` folder with project knowledge documents (vision, architecture decisions, status). These are tracked separately from `docs/` — `docs/` is the consumer-facing knowledge base; `.nexus/` is the internal project memory.

| .nexus path | Purpose |
|-------------|---------|
| `.nexus/manifest.json` | Index of internal docs |
| `.nexus/docs/01_vision.md` | The vision document quoted in this repo's project instructions |
| `.nexus/skills/` | Internal capability descriptions |
| `.nexus/ai/` | AI-related artifacts (separate from `ai-manifest.ts`) |

## Other root-level files

| File | Purpose |
|------|---------|
| `AGENTS.md` | Notes for AI agents working in the repo (similar to this knowledge base, but author-facing) |
| `AI_INTEGRATION_GUIDE.md` | Long-form integration recipes (overlaps with `docs/05-ai-integration.md`) |
| `CHANGELOG.md` | Per-version release notes |
| `LIBRARY_STATUS.md` | Status snapshot of components/themes |
| `integration_review.md` | Review notes for an integration cycle |
| `chameleon.config.json` | CLI's project-level config schema (used by `chameleon init`) |
| `default_shadcn_theme.css` | Reference shadcn theme tokens for parity check |
| `.clinerules` / `.cursorrules` / `.windsurfrules` | Per-IDE rules for AI assistants — same content, different formats |
