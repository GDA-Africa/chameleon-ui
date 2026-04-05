---
nexus_doc: true
id: "02_architecture"
title: "System Architecture"
status: populated
confidence: high
last_updated: "2026-04-05"
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
│  (CSS Variables)     │  (motion.div animations)                 │
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
| Type Safety           | TypeScript             | (via Vite)           | Strict mode planned                               |
| Testing               | Vitest                 | (not yet configured) | Fast, Vite-native test runner                     |
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
├── .github/copilot-instructions.md    # AI agent instructions (NEXUS)
├── .nexus/                            # NEXUS documentation system
│   ├── ai/                            # AI config files
│   ├── docs/                          # 8 spec docs + index + knowledge
│   ├── skills/                        # Task execution skills
│   └── manifest.json                  # Project metadata
├── src/
│   ├── main.tsx                       # App entry point
│   ├── styles/
│   │   ├── index.css                  # Import aggregator
│   │   ├── tailwind.css               # Tailwind v4 config
│   │   ├── theme.css                  # shadcn/ui base tokens (fallback)
│   │   └── fonts.css                  # Font imports
│   └── app/
│       ├── App.tsx                    # Root app with routing/navigation
│       └── components/
│           ├── chameleon/             # 🎨 CORE LIBRARY
│           │   ├── context.tsx        # ChameleonProvider, useChameleon, useThemeClasses, translations
│           │   ├── atoms.tsx          # Button, Input, Badge, Progress (+ more)
│           │   ├── molecules.tsx      # Card, Tabs, Dialog, Alert, StatCard, PricingCard
│           │   ├── composites.tsx     # DataTable, Charts, KanbanBoard, Calendar, FileUpload, etc.
│           │   ├── templates.tsx      # AuthTemplate, SettingsTemplate + re-exports
│           │   ├── comprehensive-templates.tsx     # Landing, Blog, Pricing, Contact, Profile
│           │   ├── comprehensive-templates-part2.tsx # Dashboard, E-commerce, Auth, Docs
│           │   ├── animations.tsx     # AnimationPresets, Animated, AnimatedList
│           │   ├── auth-components.tsx # 8 auth components (Login, Signup, 2FA, etc.)
│           │   ├── ai-manifest.ts     # Machine-readable component catalog
│           │   ├── ai-helpers.tsx      # AI validation utilities
│           │   ├── ai-docs-page.tsx   # Interactive AI docs
│           │   ├── utils.ts           # cn() utility (clsx + twMerge)
│           │   ├── cli.tsx            # CLI mockup component
│           │   ├── theme-visualizer.tsx # Theme token visualizer
│           │   ├── showcase.tsx       # Component showcase
│           │   ├── showcase-examples.tsx # Showcase examples
│           │   ├── auth-showcase.tsx   # Auth component showcase
│           │   ├── template-showcase.tsx # Template gallery
│           │   ├── documentation.tsx  # Documentation page
│           │   └── enhanced-landing.tsx # Enhanced landing page
│           ├── figma/                 # Figma integration components
│           │   └── ImageWithFallback.tsx
│           └── ui/                    # shadcn/ui base components (unused/fallback)
│               └── (40+ shadcn components)
├── package.json                       # Dependencies, scripts
├── vite.config.ts                     # Vite + React + Tailwind plugins, @ alias
├── postcss.config.mjs                 # Empty (Tailwind v4 handles PostCSS)
├── pnpm-workspace.yaml                # pnpm workspace config
├── AI_INTEGRATION_GUIDE.md            # AI agent quick-start guide
├── LIBRARY_STATUS.md                  # Component inventory and status
└── ATTRIBUTIONS.md                    # Third-party attributions
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
2. **`useThemeClasses()` pattern** — centralizes all theme → CSS class mappings in one hook
3. **No CSS-in-JS** — pure Tailwind utility classes + CSS vars for performance
4. **Radix UI foundations** — accessibility baked in at the primitive level
5. **Atomic Design** — clear hierarchy prevents circular dependencies
