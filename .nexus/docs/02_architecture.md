---
nexus_doc: true
id: "02_architecture"
title: "System Architecture"
status: populated
confidence: high
last_updated: "2026-04-14"
---

# System Architecture

**Project:** Chameleon UI
**Framework:** React 19 + Vite 6
**Data Strategy:** cloud-first (component library — no backend DB)
**Architecture Type:** Monolithic component library with Atomic Design hierarchy

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     ChameleonProvider                            │
│  (Theme + Mode + Lang + Intensity state via React Context)      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Templates ──▶ Organisms ──▶ Molecules ──▶ Atoms               │
│   (Full pages)  (Complex)    (Composed)   (Primitives)          │
│                                                                  │
├──────────────────────┬──────────────────────────────────────────┤
│  Theme Token Maps    │  Ambient Backgrounds (Glassy/Liquid)     │
│  (CSS Variables)     │  Pure CSS @keyframes — React.memo        │
│                      │  box-shadow glow, NO backdrop-blur       │
├──────────────────────┴──────────────────────────────────────────┤
│  useThemeClasses() hook — provides theme-aware CSS class maps   │
├─────────────────────────────────────────────────────────────────┤
│  Radix UI Primitives (Dialog, Tabs, Select, etc.)               │
├─────────────────────────────────────────────────────────────────┤
│  Tailwind CSS v4 + tw-animate-css                               │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

| Component             | Technology             | Version              | Rationale                                         |
| --------------------- | ---------------------- | -------------------- | ------------------------------------------------- |
| UI Framework          | React                  | 19.2.4               | Latest stable; hooks-first architecture           |
| Build Tool            | Vite                   | 6.3.5                | Fast HMR, native ESM, excellent DX                |
| Styling               | Tailwind CSS           | 4.1.12               | Utility-first, v4 with `@tailwindcss/vite` plugin |
| CSS Architecture      | CSS Variables (tokens) | —                    | Runtime theme switching without rebuild           |
| Accessible Primitives | Radix UI               | Various              | WAI-ARIA compliant headless components            |
| Animations            | Motion (Framer Motion) | 12.23.24             | Theme-specific physics, GPU-accelerated           |
| Charts                | Recharts               | 2.15.2               | Composable React chart components                 |
| Drag & Drop           | react-dnd              | 16.0.1               | Kanban board, sortable lists                      |
| Icons                 | Lucide React           | 0.487.0              | Consistent, tree-shakeable icon set               |
| Utilities             | clsx + tailwind-merge  | —                    | Class composition with deduplication              |
| Type Safety           | TypeScript             | 6.0.2                | Strict mode + `noUncheckedIndexedAccess`          |
| Testing               | Vitest + RTL           | Configured           | jsdom env, atoms + utils tests passing            |
| Package Manager       | pnpm                   | —                    | Workspace support, disk-efficient                 |
| Language              | TypeScript (ESM)       | —                    | `"type": "module"` in package.json                |

### Additional Technologies

- **class-variance-authority (CVA)** — variant-based component styling
- **cmdk** — Command palette primitives
- **date-fns** — Date utilities for Calendar component
- **react-day-picker** — Calendar date picker
- **embla-carousel-react** — Carousel component
- **react-responsive-masonry** — Image gallery layouts
- **vaul** — Drawer component primitives
- **sonner** — Toast notifications
- **input-otp** — OTP input for 2FA
- **react-hook-form** — Form management
- **next-themes** — (included but Chameleon uses its own theme system)

## 📁 Directory Structure

```
UILibrary/
├── .github/
│   ├── copilot-instructions.md        # AI agent instructions (NEXUS)
│   └── workflows/
│       ├── ci.yml                     # Lint + typecheck + test + build on PR/push
│       └── publish.yml                # npm publish on tag v*
├── .nexus/                            # NEXUS documentation system
│   ├── ai/                            # AI config files
│   ├── docs/                          # 8 spec docs + index + knowledge
│   ├── skills/                        # Task execution skills
│   └── manifest.json                  # Project metadata
├── bin/
│   └── chameleon.js                   # CLI binary — 13 commands, real FS ops
├── src/
│   ├── main.tsx                       # App entry point
│   ├── styles/
│   │   ├── index.css                  # Keyframe animations, color-scheme rules
│   │   ├── tailwind.css               # Tailwind v4 config
│   │   ├── theme.css                  # shadcn/ui base tokens (fallback)
│   │   └── fonts.css                  # Font imports
│   └── app/
│       ├── App.tsx                    # Workshop shell — 7 pages, 4 sidebar groups (~558 lines)
│       └── components/
│           ├── chameleon/             # 🎨 CORE LIBRARY
│           │   ├── context.tsx        # ChameleonProvider, useChameleon, useThemeClasses, GlassyBackground, LiquidBackground
│           │   ├── atoms.tsx          # Button, Input, Badge, Progress (+ more)
│           │   ├── molecules.tsx      # Card, Tabs, Dialog, Alert, StatCard, PricingCard
│           │   ├── composites.tsx     # DataTable, Charts, KanbanBoard, Calendar, FileUpload, etc.
│           │   ├── templates.tsx      # AuthTemplate, SettingsTemplate + re-exports
│           │   ├── comprehensive-templates.tsx     # Landing, Blog, Pricing, Contact, Profile
│           │   ├── comprehensive-templates-part2.tsx # Dashboard, E-commerce, Auth, Docs
│           │   ├── animations.tsx     # AnimationPresets, Animated, AnimatedList
│           │   ├── auth-components.tsx # 7 auth flow components
│           │   ├── component-docs-page.tsx # 4-tab unified component docs (Atoms/Molecules/Composites/Auth)
│           │   ├── cli-docs-page.tsx  # 13-command CLI reference, two-panel layout
│           │   ├── ai-manifest.ts     # Machine-readable component catalog
│           │   ├── ai-helpers.tsx     # AI validation utilities
│           │   ├── ai-docs-page.tsx   # Interactive AI docs
│           │   ├── utils.ts           # cn() utility (clsx + twMerge)
│           │   ├── cli.tsx            # CLIMockup component
│           │   ├── theme-visualizer.tsx # Theme token visualizer
│           │   ├── documentation.tsx  # Getting started / docs page
│           │   ├── enhanced-landing.tsx # Landing page
│           │   └── __tests__/         # Vitest test files
│           ├── figma/                 # Figma integration components
│           │   └── ImageWithFallback.tsx
│           └── ui/                    # shadcn/ui base components (unused/fallback)
│               └── (40+ shadcn components)
├── package.json                       # Dependencies, scripts, bin field
├── vite.config.ts                     # Vite lib mode + React + Tailwind plugins
├── tsconfig.json                      # TypeScript strict + noUncheckedIndexedAccess
├── postcss.config.mjs                 # Empty (Tailwind v4 handles PostCSS)
├── pnpm-workspace.yaml                # pnpm workspace config
├── chameleon.config.json              # CLI project config (written by chameleon init)
├── README.md                          # npm-facing docs
├── CHANGELOG.md                       # Semantic versioning log
├── AI_INTEGRATION_GUIDE.md            # AI agent quick-start guide
└── LIBRARY_STATUS.md                  # Component inventory and status
```

## 🔄 Data Flow

```
User selects theme/mode/lang
        ↓
ChameleonProvider (React Context)
        ↓
Sets CSS variables on wrapper div via style prop
Sets data-chameleon-theme / data-chameleon-mode attributes
        ↓
useThemeClasses() hook reads context
Returns theme-specific CSS class maps (cardClass, buttonPrimary, inputClass, etc.)
        ↓
Components consume classes → auto-adapt to active theme
        ↓
Ambient backgrounds (Glassy/Liquid) render animated orbs/blobs behind content
```

**Key architectural decisions:**

1. **CSS Variables for tokens** — enables runtime theme switching with zero JS overhead
2. **`useThemeClasses()` pattern** — centralizes all theme → CSS class mappings in one hook, memoized with `useMemo([theme, mode])`
3. **No CSS-in-JS** — pure Tailwind utility classes + CSS vars for performance
4. **Radix UI foundations** — accessibility baked in at the primitive level
5. **Atomic Design** — clear hierarchy prevents circular dependencies
6. **No `backdrop-blur` on shell elements** — sidebar, header, footer use solid semi-transparent backgrounds; `backdrop-blur` reserved only for modals/dialogs (where scroll is blocked anyway)
7. **Ambient backgrounds use CSS `@keyframes` + `box-shadow` glow** — not `filter:blur`, not `motion.div`. Wrapped in `React.memo` with `useMemo` internals. `contain: paint` prevents overflow without creating scroll containers.
8. **CLI is plain Node.js ESM** — no external framework (no Commander.js, no chalk); native `fs`/`path`/`child_process` only. Registered in `bin` field for global `chameleon` access.
