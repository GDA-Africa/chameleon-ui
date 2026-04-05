---
nexus_doc: true
id: "04_api_contracts"
title: "API Contracts"
status: populated
confidence: high
last_updated: "2026-04-05"
---

# API Contracts

**Project:** Chameleon UI

> Chameleon UI is a component library — its "API" is the set of exported components, hooks, and utilities.

---

## 🔌 Component APIs

### Context & Hooks

| Export              | Source        | Description                                                                                                                                                                                                                   |
| ------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ChameleonProvider` | `context.tsx` | Root provider — wraps app, manages theme/mode/lang/intensity state                                                                                                                                                            |
| `useChameleon()`    | `context.tsx` | Returns `{ theme, setTheme, mode, setMode, lang, setLang, glassyIntensity, setGlassyIntensity, liquidIntensity, setLiquidIntensity }`                                                                                         |
| `useThemeClasses()` | `context.tsx` | Returns theme-aware CSS class maps: `{ cardClass, buttonPrimary, buttonSecondary, buttonOutline, buttonGhost, inputClass, badgeClass, textPrimary, textMuted, textOnCard, textOnPrimary, surfaceClass, theme, mode, isDark }` |
| `translations`      | `context.tsx` | i18n translation object keyed by `ChameleonLang`                                                                                                                                                                              |
| `cn()`              | `utils.ts`    | Class name merge utility (clsx + tailwind-merge)                                                                                                                                                                              |

### Atom Components (atoms.tsx)

| Component  | Key Props                                            | Variants                                              |
| ---------- | ---------------------------------------------------- | ----------------------------------------------------- |
| `Button`   | `variant`, `size`, `animated`, `asChild`, `disabled` | primary, secondary, ghost, outline × sm, md, lg, icon |
| `Input`    | `animated`, `type`, all HTML input attrs             | —                                                     |
| `Badge`    | `animated`, `className`                              | Styled via className overrides                        |
| `Progress` | `value` (0-100), `label`, `showValue`, `animated`    | —                                                     |

### Molecule Components (molecules.tsx)

| Component                                                                 | Key Props                                                      |
| ------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `Card`                                                                    | `animated`, `elevation` (0-3, material only)                   |
| `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | `className`                                                    |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`                          | Radix Tabs API                                                 |
| `Dialog`, `DialogTrigger`, `DialogContent`, `DialogClose`                 | Radix Dialog API, `animated`                                   |
| `Alert`                                                                   | `variant` (success, warning, error, info), `title`, `animated` |
| `StatCard`                                                                | `label`, `value`, `trend` (up/down), `trendValue`, `animated`  |
| `PricingCard`                                                             | `tier`, `price`, `features[]`, `recommended`, `animated`       |
| `Separator`                                                               | `orientation` (horizontal/vertical)                            |

### Organism Components (composites.tsx)

| Component            | Key Props                                                                      |
| -------------------- | ------------------------------------------------------------------------------ |
| `DataTable<T>`       | `data`, `columns`, `title`, `searchable`, `exportable`, `pageSize`, `animated` |
| `ThemeChart`         | `type` (line/bar/area/pie/donut/radar/scatter), `data`, `title`                |
| `KanbanBoard`        | `columns`, `onDragEnd`                                                         |
| `Calendar`           | `view` (month/week/day), `events`                                              |
| `FileUpload`         | `accept`, `maxSize`, `onUpload`                                                |
| `ImageGallery`       | `images`, `columns`                                                            |
| `CommandPalette`     | `commands`, `onSelect`                                                         |
| `StepIndicator`      | `steps`, `currentStep`                                                         |
| `TimelineView`       | `events`                                                                       |
| `SearchBar`          | `onSearch`, `filters`                                                          |
| `NotificationCenter` | `notifications`                                                                |
| `UserMenu`           | `user`, `onLogout`                                                             |

### Template Components

| Component                | Source                              |
| ------------------------ | ----------------------------------- |
| `AuthTemplate`           | `templates.tsx`                     |
| `SettingsTemplate`       | `templates.tsx`                     |
| `LandingPageTemplate`    | `comprehensive-templates.tsx`       |
| `BlogTemplate`           | `comprehensive-templates.tsx`       |
| `PricingPageTemplate`    | `comprehensive-templates.tsx`       |
| `ContactTemplate`        | `comprehensive-templates.tsx`       |
| `UserProfileTemplate`    | `comprehensive-templates.tsx`       |
| `AdminDashboardTemplate` | `comprehensive-templates-part2.tsx` |
| `EcommerceTemplate`      | `comprehensive-templates-part2.tsx` |
| `DocumentationTemplate`  | `comprehensive-templates-part2.tsx` |

### Animation Exports (animations.tsx)

| Export             | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `animationPresets` | Theme-indexed animation configs (`hover`, `tap` per theme) |
| `AnimationPresets` | Component rendering animation demos                        |
| `Animated`         | Wrapper component for entrance animations                  |
| `AnimatedList`     | Staggered list animation wrapper                           |

## 📋 Import Patterns

```tsx
// Atoms
import { Button, Input, Badge, Progress } from "./components/chameleon/atoms";

// Molecules
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  Alert,
  StatCard,
  PricingCard,
  Separator,
} from "./components/chameleon/molecules";

// Organisms
import { DataTable, ThemeChart, KanbanBoard } from "./components/chameleon/composites";

// Templates
import { AuthTemplate, SettingsTemplate } from "./components/chameleon/templates";

// Context
import {
  ChameleonProvider,
  useChameleon,
  useThemeClasses,
  translations,
} from "./components/chameleon/context";

// Utilities
import { cn } from "./components/chameleon/utils";

// AI Manifest
import { CHAMELEON_AI_MANIFEST } from "./components/chameleon/ai-manifest";
```
