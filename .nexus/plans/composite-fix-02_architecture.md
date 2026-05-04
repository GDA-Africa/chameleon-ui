---
name: Architecture & Folder Structure (v1.0.9)
description: Tech stack, folder layout, data flow, and component hierarchy
type: architecture
status: populated
confidence: high
last_updated: "2026-05-03"
---

# Architecture: Composite-First Design System

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Language** | TypeScript | 5.x | Strict type safety (no `any`) |
| **Framework** | React | 18.x | UI rendering |
| **Build Tool** | Vite | 4.x | Fast HMR, optimized bundles |
| **Testing** | Vitest | 0.34.x | Fast unit tests + coverage |
| **Package Manager** | Yarn | 3.x | Workspaces, strict deps |
| **Linting** | ESLint | 8.x | Code quality |
| **Formatting** | Prettier | 3.x | Code consistency |

---

## Folder Structure (v1.0.9)

```
src/
├─ atoms/
│  ├─ index.ts                    [export all atoms]
│  ├─ Button.tsx
│  ├─ Input.tsx
│  ├─ Badge.tsx
│  ├─ Progress.tsx
│  ├─ Toggle.tsx
│  ├─ Spinner.tsx
│  ├─ Avatar.tsx
│  ├─ Label.tsx
│  └─ types.ts                    [atom types]
│
├─ molecules/
│  ├─ index.ts                    [export all molecules]
│  ├─ Card.tsx
│  ├─ Tabs.tsx
│  ├─ Dialog.tsx
│  ├─ Alert.tsx
│  ├─ StatCard.tsx
│  ├─ PricingCard.tsx
│  ├─ Modal.tsx
│  ├─ Toast.tsx
│  ├─ Dropdown.tsx
│  ├─ Pagination.tsx
│  ├─ Avatar Group.tsx
│  ├─ Breadcrumb.tsx
│  ├─ Checkbox.tsx
│  ├─ RadioButton.tsx
│  └─ types.ts                    [molecule types]
│
├─ composites/                    [🆕 NEW IN v1.0.9]
│  ├─ index.ts                    [central registry: export all composites]
│  ├─ types.ts                    [all composite prop interfaces]
│  │
│  ├─ HeroSection.tsx             [from Landing]
│  ├─ FeatureCards.tsx
│  ├─ CTASection.tsx
│  ├─ TestimonialCarousel.tsx
│  ├─ PricingTable.tsx
│  │
│  ├─ StatsCard.tsx               [from Dashboard]
│  ├─ BarChart.tsx
│  ├─ LineChart.tsx
│  ├─ SideNav.tsx
│  ├─ TopBar.tsx
│  ├─ DataTableComposite.tsx
│  │
│  ├─ LoginForm.tsx               [from Auth]
│  ├─ SignupForm.tsx
│  ├─ TwoFactorForm.tsx
│  ├─ MagicLinkForm.tsx
│  ├─ PasswordRecoveryForm.tsx
│  │
│  ├─ ProfileSection.tsx           [from Settings]
│  ├─ SettingsList.tsx
│  ├─ PreferencePanel.tsx
│  ├─ DangerZone.tsx
│  │
│  ├─ ProductGrid.tsx              [from E-Commerce]
│  ├─ ProductCard.tsx
│  ├─ CartSummary.tsx
│  ├─ CheckoutForm.tsx
│  ├─ OrderConfirmation.tsx
│  │
│  ├─ PageHeader.tsx               [shared]
│  ├─ EmptyState.tsx
│  ├─ LoadingState.tsx
│  ├─ ErrorBoundary.tsx
│  ├─ Modal.tsx
│  └─ Toast.tsx
│
├─ templates/                     [🆕 UPDATED IN v1.0.9]
│  ├─ index.ts                    [central template registry]
│  │
│  ├─ Landing/
│  │  ├─ Landing.tsx              [main template: accepts styleConfig]
│  │  ├─ composites.ts            [re-exports: HeroSection, FeatureCards, ...]
│  │  ├─ types.ts                 [LandingProps, HeroSectionProps, ...]
│  │  └─ constants.ts             [DEFAULT_HERO, DEFAULT_FEATURES, ...]
│  │
│  ├─ Dashboard/
│  │  ├─ Dashboard.tsx
│  │  ├─ composites.ts
│  │  ├─ types.ts
│  │  └─ constants.ts
│  │
│  ├─ Auth/
│  │  ├─ Auth.tsx
│  │  ├─ composites.ts
│  │  ├─ types.ts
│  │  └─ constants.ts
│  │
│  ├─ Settings/
│  │  ├─ Settings.tsx
│  │  ├─ composites.ts
│  │  ├─ types.ts
│  │  └─ constants.ts
│  │
│  ├─ ECommerce/
│  │  ├─ ECommerce.tsx
│  │  ├─ composites.ts
│  │  ├─ types.ts
│  │  └─ constants.ts
│  │
│  └─ ... [5 more templates]
│
├─ hooks/
│  ├─ useTheme.ts                [access current theme & mode]
│  ├─ useAnimation.ts             [animation utilities]
│  └─ ... [other hooks]
│
├─ context/
│  ├─ ThemeContext.tsx
│  ├─ AnimationContext.tsx
│  └─ ChameleonProvider.tsx
│
├─ types/
│  ├─ theme.ts                   [theme token types]
│  ├─ animation.ts               [animation system types]
│  ├─ composites.ts              [shared composite types]
│  └─ templates.ts               [shared template types]
│
├─ utils/
│  ├─ theme.ts                   [theme utilities]
│  ├─ validation.ts              [prop validation]
│  └─ ... [other utilities]
│
├─ styles/
│  ├─ base.css                   [reset, global styles]
│  ├─ animations.css             [animation definitions]
│  └─ themes.css                 [theme-specific styles]
│
├─ index.ts                       [main export]
└─ __tests__/
   ├─ atoms/
   ├─ molecules/
   ├─ composites/                 [🆕 NEW]
   ├─ templates/                  [🆕 UPDATED]
   └─ integration/
```

---

## Data Flow: Hierarchical Prop Customization

```
User Props
  │
  ├─ Template Level
  │  └─ <Landing styleConfig={{...}} />
  │      │
  │      ├─ Composite Level
  │      │  └─ <HeroSection {...styleConfig.heroSection} />
  │      │      │
  │      │      ├─ Molecule Level
  │      │      │  └─ <Heading {...moleculeProps} />
  │      │      │      │
  │      │      │      └─ Atom Level
  │      │      │         └─ <Text variant="h1" {...atomProps} />
  │      │      │
  │      │      └─ Molecule Level
  │      │         └─ <Button {...moleculeProps} />
  │      │
  │      └─ ... [more composites]
  │
  └─ Output: Styled UI respecting all theme layers
```

---

## Component Hierarchy

### Level 1: Atoms (Primitive Components)
**What:** Basic building blocks without composition  
**Examples:** Button, Input, Badge, Progress, Toggle, Spinner, Avatar, Label  
**Props:** size, variant, disabled, theme-aware colors  
**Usage:** Used by molecules; rarely used directly by developers

```typescript
<Button variant="primary" size="md" disabled={false} />
```

### Level 2: Molecules (Composed Components)
**What:** Combination of atoms with specific behavior  
**Examples:** Card, Tabs, Dialog, Alert, StatCard, Modal, Toast  
**Props:** Component-specific props (e.g., Card: shadow, borderRadius, padding)  
**Usage:** Used by composites; can be used directly for simple layouts

```typescript
<Card variant="elevated" shadow="high">
  <Heading>Title</Heading>
  <Button>Action</Button>
</Card>
```

### Level 3: Composites (Section Components)
**What:** Pre-built sections composed of molecules (no full pages yet)  
**Examples:** HeroSection, StatsCard, FeatureCards, LoginForm, SideNav, TopBar  
**Props:** Section-specific props (backgroundColor, padding, contentAlignment)  
**Usage:** Main building block for custom pages; can import individually

```typescript
<HeroSection
  heading="Welcome"
  backgroundColor="primary"
  animationIntensity={0.8}
/>
```

### Level 4: Templates (Full Pages)
**What:** Pre-built pages showcasing composites + entry point for beginners  
**Examples:** Landing, Dashboard, Auth, Settings, E-Commerce  
**Props:** `styleConfig` object allowing prop-based customization of all composites  
**Usage:** Drop-in pages; can be customized without forking

```typescript
<Landing
  styleConfig={{
    heroSection: { backgroundColor: 'primary' },
    featureCards: { cardBgColor: 'surface' }
  }}
/>
```

---

## Type Architecture

```
types/theme.ts
├─ ThemeTokens
│  ├─ colors: { [theme]: { [mode]: { [colorName]: string } } }
│  ├─ spacing: { sm, md, lg, xl, xxl }
│  ├─ typography: { fontSize, fontWeight, lineHeight, ... }
│  ├─ shadows: { low, medium, high }
│  └─ borderRadius: { sm, md, lg, full }
│
└─ Animation
   ├─ duration: { fast, normal, slow }
   ├─ easing: { ease-in, ease-out, ease-in-out }
   └─ effects: { slideUp, fadeIn, scaleUp, ... }

types/composites.ts
├─ CompositeBaseProps (common to all composites)
│  ├─ animated?: boolean
│  ├─ animationIntensity?: number (0–1)
│  └─ className?: string
│
├─ HeroSectionProps extends CompositeBaseProps
│  ├─ heading: ReactNode
│  ├─ backgroundColor?: string
│  ├─ padding?: string
│  └─ ... [5+ more props]
│
├─ FeatureCardsProps extends CompositeBaseProps
├─ StatsCardProps extends CompositeBaseProps
└─ ... [40+ more composites]

types/templates.ts
├─ TemplateBaseProps
│  ├─ animated?: boolean
│  ├─ animationIntensity?: number
│  └─ className?: string
│
├─ LandingProps extends TemplateBaseProps
│  ├─ hero?: { heading, subheading }
│  ├─ features?: Feature[]
│  ├─ styleConfig?: LandingStyleConfig
│  └─ ... [more props]
│
├─ DashboardProps extends TemplateBaseProps
└─ ... [10 templates]
```

---

## Export Pattern

### From Composites
```typescript
// src/composites/index.ts
export { HeroSection } from './HeroSection';
export { FeatureCards } from './FeatureCards';
// ... [all 40–50 composites]
export type * from './types';
```

### From Templates
```typescript
// src/templates/Landing/Landing.tsx
import { HeroSection, FeatureCards, ... } from '../../composites/';

export const Landing: React.FC<LandingProps> = ({ ... }) => { ... };

// Re-export composites at template level
export { HeroSection } from './composites';
export { FeatureCards } from './composites';
export type { HeroSectionProps } from './types';

// src/templates/index.ts
export { Landing } from './Landing/Landing';
export type { LandingProps } from './Landing/types';
export { HeroSection } from './Landing/Landing';  // Make available from templates
```

### From Root
```typescript
// src/index.ts
export * from './atoms';
export * from './molecules';
export * from './composites';        // 🆕 NEW
export * from './templates';         // 🆕 UPDATED
export * from './hooks';
export * from './types';
export { ChameleonProvider } from './context';
```

---

## Customization Layers

### Layer 1: Theme Selection
```typescript
<ChameleonProvider theme="Material" mode="dark">
  <Landing />
</ChameleonProvider>
// All components automatically use Material theme + dark mode
```

### Layer 2: Template-Level Customization
```typescript
<Landing
  styleConfig={{
    heroSection: { backgroundColor: 'primary', padding: 'xl' },
    featureCards: { cardBgColor: 'surface' }
  }}
/>
// Only affects composites within Landing
```

### Layer 3: Composite-Level Customization
```typescript
<HeroSection
  backgroundColor="primary"
  padding="xl"
  animationIntensity={0.8}
/>
// Direct composite usage with full customization
```

### Layer 4: CSS / Inline Styles (Last Resort)
```typescript
<HeroSection className="custom-hero" style={{ marginTop: '2rem' }} />
// For edge cases not covered by props
```

---

## Dependencies Between Layers

```
Templates
  ├─ depend on Composites ✅
  ├─ depend on Molecules ✅
  ├─ depend on Atoms ✅
  └─ depend on Theme/Animation/Context ✅

Composites
  ├─ depend on Molecules ✅
  ├─ depend on Atoms ✅
  └─ depend on Theme/Animation/Context ✅

Molecules
  ├─ depend on Atoms ✅
  └─ depend on Theme/Animation/Context ✅

Atoms
  └─ depend on Theme/Animation/Context only ✅
```

**Circular dependencies:** NONE. Clean layering.

---

## Key Constraints

1. **No prop drilling beyond one level** — composites accept props, molecules accept props, atoms accept props. No multi-level drilling.
2. **All props optional with sensible defaults** — `<HeroSection />` works with zero props
3. **No CSS-in-JS magic** — styles from tokens + theme context only
4. **Strict TypeScript** — no `any`, no implicit returns, `--skipLibCheck: false`
5. **ESM only** — no CommonJS, always `import`/`export`, always with file extensions

---

*Architecture Document — Last Updated: 2026-05-03*
