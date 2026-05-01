---
title: Theme System
purpose: Tokens, CSS variables, the 5 design languages, dark mode contracts.
---

# Theme System

## The 5 themes at a glance

| Theme | Personality | Hallmarks |
|-------|-------------|-----------|
| `material` | Google Material Design 3 | Elevation shadows, uppercase button text, sharp 0.25rem radius, `#6200ee` purple. Buttons have a layered shadow that lifts on hover. Inputs are bottom-bordered (no box). |
| `simple` | Default / Shadcn-flavored | Soft 0.5rem radius, neutral slate palette, light shadows. Inputs have a filled muted background with a focus ring. |
| `minimalist` | Editorial / Brutalist-lite | Zero radius (`0px`), monochrome black-on-white (or white-on-black), border-driven separation. Buttons are transparent with a black border that inverts on hover. Inputs are bottom-bordered only. |
| `glassy` | Frosted glass | Translucent surfaces with `backdrop-filter: blur(...)`, ambient lavender background, white-on-purple in dark mode. Cards have `rgba(255,255,255,0.82)` light or `rgba(255,255,255,0.06)` dark. |
| `liquid` | Bubbly / iOS-flavored | 1.5rem-2rem radii, gradient fills (`from-[var(--primary)] to-violet-500`), pill-shaped buttons, subtle scale on hover. Ambient violet aurora background. |

Switch by calling `useChameleon().setTheme("liquid")`. The `<ChameleonProvider>` will swap CSS variables and ambient backgrounds; no remount required.

## CSS variable contract

Every theme defines the same 14-15 CSS custom properties. Component code reads these variables via Tailwind arbitrary values like `bg-[var(--primary)]`. The contract guarantees:

- `--foreground` always contrasts `--background`
- `--card-foreground` always contrasts `--card`
- `--primary-foreground` always contrasts `--primary`
- `--muted-foreground` is readable on `--muted`

| Variable | Meaning | Always-true |
|----------|---------|-------------|
| `--primary` | Brand accent color | Buttons/highlights/badges |
| `--primary-foreground` | Text/icon on primary | Contrasts `--primary` |
| `--secondary` | Secondary accent | Variant buttons, badges |
| `--secondary-foreground` | Text on secondary | Contrasts `--secondary` |
| `--background` | Page background | Bottom of stacking |
| `--foreground` | Primary text | Contrasts `--background` |
| `--card` | Card surface | Above `--background` |
| `--card-foreground` | Text on cards | Contrasts `--card` |
| `--muted` | Subtle surface (chips, list rows) | Slightly off `--background` |
| `--muted-foreground` | Secondary text | Lower-emphasis on `--muted` |
| `--border` | Border lines | |
| `--accent` | Hover/active surface | |
| `--accent-foreground` | Text on accent | Contrasts `--accent` |
| `--ring` | Focus ring color | Visible on `--background` |
| `--radius` | Default border radius | Theme-specific |
| `--glass-blur` | Backdrop blur amount | Glassy theme only, computed from `glassyIntensity` |

Full token map for every theme/mode is in `src/app/components/chameleon/context.tsx::themeTokens`. Below is a reference snapshot.

### Material

| Token | Light | Dark |
|-------|-------|------|
| `--primary` | `#6200ee` | `#bb86fc` |
| `--primary-foreground` | `#ffffff` | `#000000` |
| `--background` | `#fafafa` | `#121212` |
| `--foreground` | `#1a1a1a` | `#f3f3f3` |
| `--card` | `#ffffff` | `#1e1e1e` |
| `--radius` | `0.25rem` | `0.25rem` |

### Simple

| Token | Light | Dark |
|-------|-------|------|
| `--primary` | `#0f172a` | `#f8fafc` |
| `--primary-foreground` | `#ffffff` | `#020617` |
| `--background` | `#ffffff` | `#020617` |
| `--foreground` | `#0f172a` | `#f8fafc` |
| `--card` | `#ffffff` | `#0f172a` |
| `--radius` | `0.5rem` | `0.5rem` |

### Minimalist

| Token | Light | Dark |
|-------|-------|------|
| `--primary` | `#000000` | `#ffffff` |
| `--primary-foreground` | `#ffffff` | `#000000` |
| `--background` | `#ffffff` | `#000000` |
| `--foreground` | `#000000` | `#ffffff` |
| `--card` | `#ffffff` | `#0a0a0a` |
| `--radius` | `0px` | `0px` |

### Glassy

| Token | Light | Dark |
|-------|-------|------|
| `--primary` | `#7c3aed` | `#a78bfa` |
| `--primary-foreground` | `#ffffff` | `#1a0533` |
| `--background` | `transparent` | `transparent` |
| `--foreground` | `#2d1b69` | `#f0e6ff` |
| `--card` | `rgba(255,255,255,0.82)` | `rgba(255,255,255,0.06)` |
| `--radius` | `1rem` | `1rem` |
| `--glass-blur` | `20px` (dynamic) | `24px` (dynamic) |

The provider renders a `<GlassyBackground />` ambient layer behind children when `theme === "glassy"`.

### Liquid

| Token | Light | Dark |
|-------|-------|------|
| `--primary` | `#7c3aed` | `#a78bfa` |
| `--primary-foreground` | `#ffffff` | `#0f0a1e` |
| `--background` | `transparent` | `transparent` |
| `--foreground` | `#1e1b4b` | (dark variant) |
| `--card` | `rgba(255,255,255,0.88)` | (dark variant) |
| `--radius` | `1.5rem` | `1.5rem` |

Renders a `<LiquidBackground />` ambient layer with a violet aurora effect.

## Provider API

```tsx
<ChameleonProvider
  initialTheme="simple"        // material | simple | minimalist | glassy | liquid
  initialMode="light"          // light | dark
  initialLang="en"             // en | es | fr
>
  {children}
</ChameleonProvider>
```

Inside the tree:

```tsx
const {
  theme, setTheme,
  mode, setMode,
  lang, setLang,
  customBrandColor, setCustomBrandColor,
  glassyIntensity, setGlassyIntensity,    // 0–100, controls --glass-blur
  liquidIntensity, setLiquidIntensity,    // 0–100, controls aurora animation amplitude
} = useChameleon();
```

## Custom brand color

Setting `customBrandColor` to a hex string overrides `--primary` and `--secondary` for the active theme. The provider runs `generateVariations()` and `getContrastColor()` from `utils.ts` to compute matching foreground colors:

```tsx
const { setCustomBrandColor } = useChameleon();
setCustomBrandColor("#ff5722");  // Material orange
```

Pass `null` to clear and revert to the theme's default primary.

## Dark mode mechanics

- The provider toggles `document.documentElement.classList` between `"dark"` and the absence of that class based on `mode`.
- This drives Tailwind's `dark:` variant, which Chameleon components use sparingly (most theming is via CSS variables, not `dark:` classes).
- Auth and template files use `dark:text-*` classes for status colors (e.g. `text-emerald-700 dark:text-emerald-400`) where literal Tailwind colors are needed.

## How `useThemeClasses()` shapes components

The hook returns a memoized bundle of pre-baked class strings:

```ts
{
  cardClass,        // base card surface (per-theme rounding, shadow, border)
  buttonPrimary,    // primary button class
  buttonSecondary,  // secondary button class
  buttonOutline,    // outline button class
  buttonGhost,      // ghost button class
  inputClass,       // input field class
  badgeClass,       // badge class
  textPrimary,      // text-[var(--foreground)]
  textMuted,        // text-[var(--muted-foreground)]
  textOnCard,       // text-[var(--card-foreground)]
  textOnPrimary,    // text-[var(--primary-foreground)]
  surfaceClass,     // generic raised surface
  theme,            // current theme name
  mode,             // current mode
  isDark,           // mode === "dark"
}
```

Use these instead of writing your own theme branches. If you find yourself writing `theme === "material" ? ... : theme === "glassy" ? ... : ...`, the hook probably already has a class string for what you want. The exception is when a component needs theme-specific layout (not just color) — in that case, branch on `theme` directly. Examples in code: `TabsList`, `Alert` (for the `minimalist` left-border variant).

## Adding a new theme

1. Add its name to the `ChameleonTheme` union in `context.tsx`.
2. Add a complete `themeTokens["yourTheme"][light|dark]` block — every variable.
3. Add an entry for every key returned by `useThemeClasses()` (cardClass, buttonPrimary, …, surfaceClass).
4. Add a matching preset to `animationPresets` in `animations.tsx`.
5. Update the manifest's `themeCompatibility` arrays in `ai-manifest.ts` and the `themes` list in `CHAMELEON_AI_SUMMARY`.
6. Add an entry to `04-components-catalog.md`.

If any of those are missed, the type system will surface most omissions, but `useThemeClasses()` will fall through to `undefined` for the missed entry — so test with the new theme set as the active theme.

## Adding a new theme token

1. Add it to every `themeTokens[*][*]` block.
2. Reference it via `var(--your-token)` in component code.
3. Document it in this file's "CSS variable contract" table.

## Animation tokens

Each theme has its own physics in `animations.tsx::animationPresets`. The shape is `Record<ChameleonTheme, ThemeAnimationPreset>` — see `02-architecture.md::How animation works` for the full preset surface.

Examples:
- `material`: tween easing `[0.4, 0, 0.2, 1]`, 0.28s enter
- `simple`: spring with low stiffness for natural feel
- `minimalist`: faster tweens with no scale change
- `glassy`: longer fades with backdrop transitions
- `liquid`: bouncier springs, larger scale deltas
