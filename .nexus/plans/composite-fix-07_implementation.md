---
name: Implementation Plan (v1.0.9)
description: Phase-by-phase execution plan with file-by-file tasks for Claude Code
type: implementation
status: populated
confidence: high
last_updated: "2026-05-04"
---

# Implementation Plan: Composite-First Architecture (v1.0.9)

## Overview

This document is the **execution roadmap** for Claude Code. It breaks v1.0.9 into 4 phases with specific, atomic tasks. Each task is numbered and includes acceptance criteria.

### Execution Note — 2026-05-04

- Completed final template runtime propagation in `src/app/components/chameleon/comprehensive-templates-part2.tsx` where `styleConfig` was previously typed but not applied (`void styleConfig` placeholders).
- Updated frontend docs in `src/app/components/chameleon/documentation.tsx` and `src/app/components/chameleon/component-docs-directory-page.tsx` to document end-to-end atoms → molecules → composites → templates styling flow with examples.
- Validated with local quality gates: typecheck, tests, lint, and build all passing.

---

## Phase 1: Composite Extraction Foundation

**Duration:** 2–3 days  
**Goal:** Extract composites from all 10 templates, establish prop interfaces, create central registry  
**Status:** ✅ Verified Complete (implemented under `src/app/components/chameleon/composites/`)

### Task 1.1: Create Composites Folder & Types
**File:** `src/composites/types.ts`  
**Acceptance:**
- [ ] File exists at `src/composites/types.ts`
- [ ] Contains `CompositeBaseProps` interface (animated, animationIntensity, className)
- [ ] Contains prop interfaces for all 40–50 composites (see catalog below)
- [ ] All interfaces extend CompositeBaseProps
- [ ] `npx tsc --noEmit` passes
- [ ] No `any` types

**Composite Prop Interfaces Needed:**

**Landing Composites:**
- `HeroSectionProps` — heading, subheading, ctaLabel, onCTAClick, backgroundColor, textColor, padding, animated, animationIntensity, buttonVariant, buttonSize
- `FeatureCardsProps` — features: Feature[], cardBgColor, shadowIntensity, borderRadius, padding, animated
- `CTASectionProps` — heading, ctaLabel, onCTAClick, backgroundColor, textColor, animated
- `TestimonialCarouselProps` — testimonials: Testimonial[], autoScroll, delay, animated
- `PricingTableProps` — tiers: PricingTier[], highlightColor, currencySymbol, animated

**Dashboard Composites:**
- `StatsCardProps` — label, value, icon, backgroundColor, textColor, trend, animated
- `BarChartProps` — data: ChartData[], xAxisLabel, yAxisLabel, animated, animationIntensity
- `LineChartProps` — data: ChartData[], xAxisLabel, yAxisLabel, animated
- `SideNavProps` — items: NavItem[], activeItem, onSelect, backgroundColor, textColor
- `TopBarProps` — title, userMenu, notifications, searchPlaceholder, backgroundColor
- `DataTableCompositeProps` — columns, data, sortable, filterable, paginated, backgroundColor

**Auth Composites:**
- `LoginFormProps` — onSubmit, rememberMe, socialLoginOptions, animated
- `SignupFormProps` — onSubmit, passwordStrengthIndicator, animated
- `TwoFactorFormProps` — onSubmit, method: 'sms' | 'email' | 'app'
- `MagicLinkFormProps` — onSubmit, email
- `PasswordRecoveryFormProps` — onSubmit, email

**Settings Composites:**
- `ProfileSectionProps` — user: User, onSave, editable
- `SettingsListProps` — settings: Setting[], onToggle
- `PreferencePanelProps` — preferences: Preference[], onSave
- `DangerZoneProps` — actions: DangerAction[], onConfirm

**E-Commerce Composites:**
- `ProductGridProps` — products: Product[], onProductClick, searchable, filterable
- `ProductCardProps` — product: Product, onAddToCart
- `CartSummaryProps` — items: CartItem[], subtotal, tax, total
- `CheckoutFormProps` — onSubmit, countries
- `OrderConfirmationProps` — order: Order

**Shared Composites:**
- `PageHeaderProps` — title, breadcrumbs, subtitle
- `EmptyStateProps` — icon, title, description, actionLabel, onAction
- `LoadingStateProps` — label, variant: 'spinner' | 'skeleton'
- `ErrorBoundaryProps` — title, message, onRetry
- `ModalProps` — title, children, onClose, isOpen, size
- `ToastProps` — message, type: 'success' | 'error' | 'info' | 'warning', duration

---

### Task 1.2: Extract HeroSection Composite
**File:** `src/composites/HeroSection.tsx`  
**Acceptance:**
- [ ] File exists with complete HeroSection component
- [ ] Implements `HeroSectionProps` interface (from 1.1)
- [ ] Uses Heading molecule (import from `src/molecules/`)
- [ ] Uses Button molecule
- [ ] Uses Paragraph text
- [ ] Respects `backgroundColor`, `textColor`, `padding` props
- [ ] Respects `animated` & `animationIntensity`
- [ ] Works in all 5 themes (Material, Simple, Minimalist, Glassy, Liquid)
- [ ] Works in light & dark modes
- [ ] `npx tsc --noEmit` passes
- [ ] No prop drilling beyond one level

**Example Structure:**
```typescript
export const HeroSection: React.FC<HeroSectionProps> = ({
  heading,
  subheading,
  ctaLabel = 'Get Started',
  backgroundColor = 'surface',
  padding = 'xl',
  animated = true,
  animationIntensity = 0.8,
  buttonVariant = 'primary',
  ...props
}) => {
  const { theme, mode } = useTheme();
  
  return (
    <div style={{ /* theme-aware styles */ }}>
      {/* Heading molecule */}
      {/* Paragraph text */}
      {/* Button molecule */}
    </div>
  );
};
```

---

### Task 1.3: Extract FeatureCards Composite
**File:** `src/composites/FeatureCards.tsx`  
**Acceptance:** (same as 1.2, but for FeatureCards)
- [ ] Implements FeatureCardsProps interface
- [ ] Renders grid of Card molecules
- [ ] Respects `cardBgColor`, `shadowIntensity`, `borderRadius`, `padding`
- [ ] `npx tsc --noEmit` passes
- [ ] Works across all 5 themes + 2 modes

---

### Task 1.4: Extract CTASection Composite
**File:** `src/composites/CTASection.tsx`  
**Acceptance:** (follow same pattern)

---

### Task 1.5: Extract TestimonialCarousel Composite
**File:** `src/composites/TestimonialCarousel.tsx`  
**Acceptance:** (follow same pattern)

---

### Task 1.6: Extract PricingTable Composite
**File:** `src/composites/PricingTable.tsx`  
**Acceptance:** (follow same pattern)

---

### Task 1.7: Extract Dashboard Composites (6 total)
**Files:** 
- `src/composites/StatsCard.tsx`
- `src/composites/BarChart.tsx`
- `src/composites/LineChart.tsx`
- `src/composites/SideNav.tsx`
- `src/composites/TopBar.tsx`
- `src/composites/DataTableComposite.tsx`

**Acceptance:** (same pattern as 1.2–1.6)

---

### Task 1.8: Extract Auth Composites (5 total)
**Files:**
- `src/composites/LoginForm.tsx`
- `src/composites/SignupForm.tsx`
- `src/composites/TwoFactorForm.tsx`
- `src/composites/MagicLinkForm.tsx`
- `src/composites/PasswordRecoveryForm.tsx`

**Acceptance:** (same pattern)

---

### Task 1.9: Extract Settings Composites (4 total)
**Files:**
- `src/composites/ProfileSection.tsx`
- `src/composites/SettingsList.tsx`
- `src/composites/PreferencePanel.tsx`
- `src/composites/DangerZone.tsx`

---

### Task 1.10: Extract E-Commerce Composites (5 total)
**Files:**
- `src/composites/ProductGrid.tsx`
- `src/composites/ProductCard.tsx`
- `src/composites/CartSummary.tsx`
- `src/composites/CheckoutForm.tsx`
- `src/composites/OrderConfirmation.tsx`

---

### Task 1.11: Extract Shared Composites (6 total)
**Files:**
- `src/composites/PageHeader.tsx`
- `src/composites/EmptyState.tsx`
- `src/composites/LoadingState.tsx`
- `src/composites/ErrorBoundary.tsx`
- `src/composites/Modal.tsx`
- `src/composites/Toast.tsx`

---

### Task 1.12: Create Composites Central Index
**File:** `src/composites/index.ts`  
**Acceptance:**
- [ ] Exports all 40–50 composites by name
- [ ] Exports all types (`export type *`)
- [ ] File length ~150 lines
- [ ] Import paths are correct (relative)
- [ ] No re-exports from molecules/atoms (only composites)
- [ ] `npx tsc --noEmit` passes
- [ ] IDE autocomplete works for all composites

**Example:**
```typescript
// src/composites/index.ts
export { HeroSection } from './HeroSection';
export { FeatureCards } from './FeatureCards';
export { CTASection } from './CTASection';
// ... [all 40–50]
export type * from './types';
```

---

## Phase 2: Template Updates

**Duration:** 1–2 days  
**Goal:** Update all 10 templates with styleConfig prop, re-export composites  
**Status:** ✅ Verified Complete

### Task 2.1: Update Landing Template
**Files:**
- `src/templates/Landing/Landing.tsx` (modify)
- `src/templates/Landing/types.ts` (create/update)
- `src/templates/Landing/composites.ts` (create)
- `src/templates/Landing/constants.ts` (update if needed)

**Acceptance:**
- [ ] Landing component accepts `styleConfig?: LandingStyleConfig` prop
- [ ] styleConfig shape: `{ heroSection?: {}, featureCards?: {}, ... }`
- [ ] Props pass through to composites: `<HeroSection {...styleConfig.heroSection} />`
- [ ] composites.ts re-exports HeroSection, FeatureCards, etc.
- [ ] Landing.tsx re-exports composites: `export { HeroSection } from './composites'`
- [ ] Default behavior unchanged (backward compatible)
- [ ] All 5 themes + 2 modes work
- [ ] `npx tsc --noEmit && yarn test` pass

**Example Landing.tsx Pattern:**
```typescript
export interface LandingStyleConfig {
  heroSection?: Partial<HeroSectionProps>;
  featureCards?: Partial<FeatureCardsProps>;
  ctaSection?: Partial<CTASectionProps>;
  testimonialCarousel?: Partial<TestimonialCarouselProps>;
  pricingTable?: Partial<PricingTableProps>;
}

export interface LandingProps {
  hero?: { heading: string; subheading: string };
  features?: Feature[];
  testimonials?: Testimonial[];
  pricing?: PricingTier[];
  styleConfig?: LandingStyleConfig;
  animated?: boolean;
  animationIntensity?: number;
}

export const Landing: React.FC<LandingProps> = ({
  hero = DEFAULT_HERO,
  features = DEFAULT_FEATURES,
  testimonials = DEFAULT_TESTIMONIALS,
  pricing = DEFAULT_PRICING,
  styleConfig = {},
  animated = true,
  animationIntensity = 0.8,
}) => {
  return (
    <Page animated={animated}>
      <HeroSection
        heading={hero.heading}
        subheading={hero.subheading}
        animated={animated}
        {...styleConfig.heroSection}
      />
      <FeatureCards features={features} {...styleConfig.featureCards} />
      {/* ... more composites ... */}
    </Page>
  );
};

// Re-export composites
export { HeroSection } from './composites';
export { FeatureCards } from './composites';
// ... [all composites]
```

---

### Task 2.2: Update Dashboard Template
**Files:** (same pattern as 2.1)

---

### Task 2.3: Update Auth Template
**Files:** (same pattern as 2.1)

---

### Task 2.4: Update Settings Template
**Files:** (same pattern as 2.1)

---

### Task 2.5: Update E-Commerce Template
**Files:** (same pattern as 2.1)

---

### Task 2.6: Update 5 Remaining Templates
**Files:** Accounts, Profile, Admin, Onboarding, Legal (or whatever the other 5 are)

---

### Task 2.7: Create Templates Central Index
**File:** `src/templates/index.ts`  
**Acceptance:**
- [ ] Exports all 10 templates by name
- [ ] Exports all template types
- [ ] Also re-exports key composites for convenience
- [ ] `npx tsc --noEmit` passes
- [ ] File ~80 lines

**Example:**
```typescript
// src/templates/index.ts
export { Landing } from './Landing/Landing';
export type { LandingProps, LandingStyleConfig } from './Landing/types';

export { Dashboard } from './Dashboard/Dashboard';
export type { DashboardProps, DashboardStyleConfig } from './Dashboard/types';

// ... [all 10 templates]
```

---

### Task 2.8: Update Root Index
**File:** `src/index.ts` (modify)  
**Acceptance:**
- [ ] Exports composites: `export * from './composites'`
- [ ] Exports templates: `export * from './templates'`
- [ ] Atoms, molecules still exported
- [ ] Types exported
- [ ] `npx tsc --noEmit` passes

---

## Phase 3: Integration & Testing

**Duration:** 1–2 days  
**Goal:** Test all exports, cross-template reuse, achieve 80%+ coverage  
**Status:** ✅ Verified Complete

### Task 3.1: Test Composite Imports
**Files:** `src/__tests__/composites/imports.test.ts`  
**Acceptance:**
- [ ] Test file exists
- [ ] Tests that all 40–50 composites can be imported from `src/composites`
- [ ] Tests that all 10 templates can be imported from `src/templates`
- [ ] Tests that composites can be imported from templates (e.g., `import { HeroSection } from '@chamelelon-ui/templates'`)
- [ ] All imports resolve with correct types
- [ ] Tests pass

---

### Task 3.2: Write Composite Unit Tests (80%+ coverage)
**Files:** `src/__tests__/composites/*.test.ts` (one per composite)  
**Acceptance:**
- [ ] All 40–50 composites have ≥1 test file
- [ ] Tests cover: default props, custom props, theme application, animations
- [ ] Test coverage: 80%+ for composites folder
- [ ] `yarn test --coverage` passes
- [ ] All tests pass in all 5 themes + 2 modes (if applicable)

**Example Test Pattern:**
```typescript
// src/__tests__/composites/HeroSection.test.ts
import { render, screen } from '@testing-library/react';
import { HeroSection } from '../../composites/HeroSection';

describe('HeroSection', () => {
  it('renders with default props', () => {
    render(<HeroSection heading="Welcome" />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('applies custom backgroundColor', () => {
    const { container } = render(
      <HeroSection heading="Welcome" backgroundColor="primary" />
    );
    // Assert that backgroundColor was applied
  });

  it('respects animated prop', () => {
    render(<HeroSection heading="Welcome" animated={true} />);
    // Assert animation class or attribute exists
  });
});
```

---

### Task 3.3: Test Template Exports & Re-Exports
**Files:** `src/__tests__/templates/exports.test.ts`  
**Acceptance:**
- [ ] Test that each template exports its composites
- [ ] Test that composites can be imported from template folder
- [ ] Test that styleConfig prop works
- [ ] All imports resolve correctly
- [ ] Tests pass

---

### Task 3.4: Cross-Template Composite Reuse Test
**Files:** `src/__tests__/composites/cross-template-reuse.test.ts`  
**Acceptance:**
- [ ] Test that composites from different templates can be used together
- [ ] Example: render HeroSection (from Landing) + StatsCard (from Dashboard) in same page
- [ ] Test that no conflicts or styling issues occur
- [ ] Tests pass

**Example:**
```typescript
// HeroSection from Landing + StatsCard from Dashboard
import { render } from '@testing-library/react';
import { HeroSection } from '../../composites/HeroSection';
import { StatsCard } from '../../composites/StatsCard';

it('renders composites from different templates together', () => {
  render(
    <div>
      <HeroSection heading="Dashboard" />
      <StatsCard label="Users" value={1250} />
    </div>
  );
  // Assert both render without errors
});
```

---

### Task 3.5: Create AI Manifest
**File:** `src/composites/ai-manifest.ts`  
**Acceptance:**
- [ ] File documents all 40–50 composites
- [ ] Each entry includes: name, description, props schema, examples
- [ ] Props schema includes: type, required, default, options, validation (where applicable)
- [ ] Examples show correct usage in all 5 themes
- [ ] Manifest is structured for AI agents to parse
- [ ] `npx tsc --noEmit` passes

**Example Structure:**
```typescript
// src/composites/ai-manifest.ts
export const COMPOSITES_MANIFEST = {
  HeroSection: {
    name: 'HeroSection',
    description: 'Hero banner with heading, subheading, and CTA button',
    props: {
      heading: { type: 'string', required: true, description: '...' },
      subheading: { type: 'string', required: false, default: undefined },
      backgroundColor: { 
        type: 'string', 
        default: 'surface',
        options: ['surface', 'surfaceVariant', 'primary', 'secondary'],
        description: '...' 
      },
      padding: {
        type: 'string',
        default: 'xl',
        options: ['sm', 'md', 'lg', 'xl', 'xxl'],
      },
      animationIntensity: { type: 'number', min: 0, max: 1, default: 0.8 },
      animated: { type: 'boolean', default: true },
    },
    examples: [
      {
        theme: 'Material',
        mode: 'light',
        code: '<HeroSection heading="Welcome" backgroundColor="primary" />'
      },
      // ... [5 themes × 2 modes = 10 examples]
    ],
  },
  // ... [all 40–50 composites]
};

export type CompositeManifestEntry = typeof COMPOSITES_MANIFEST.HeroSection;
```

---

## Phase 4: Documentation & Publishing

**Duration:** 1 day  
**Goal:** Document composites, publish v1.0.9 to npm  
**Status:** � Implementation Complete, Publish Step Pending

### Task 4.1: Create COMPOSITES.md Guide
**File:** `COMPOSITES.md` (new file at project root)  
**Acceptance:**
- [ ] File exists with complete composite catalog
- [ ] Lists all 40–50 composites with descriptions
- [ ] Includes usage examples for each
- [ ] Shows customization patterns
- [ ] Shows cross-template reuse examples
- [ ] Includes prop reference for each composite
- [ ] File ~500–800 lines

---

### Task 4.2: Update README.md
**File:** `README.md` (modify)  
**Acceptance:**
- [ ] Highlights composite-first approach
- [ ] Includes link to COMPOSITES.md
- [ ] Shows quick example of template + composite usage
- [ ] Mentions v1.0.9 features

---

### Task 4.3: Update CLAUDE.md
**File:** `CLAUDE.md` (modify)  
**Acceptance:**
- [ ] Adds section on composite architecture
- [ ] Explains how composites are organized
- [ ] Notes on AI integration (mention AI manifest)
- [ ] Links to implementation files

---

### Task 4.4: Validate Bundle Size
**Script:** Run build and measure gzipped bundle size  
**Acceptance:**
- [ ] Bundle size increase is <50KB (gzipped)
- [ ] Tree-shaking works (unused composites don't bloat bundle)
- [ ] Measure before: v1.0.7 baseline
- [ ] Measure after: v1.0.9 with composites
- [ ] Report difference

**Command:**
```bash
yarn build
# Measure dist/index.js.gz size
# Should be <50KB increase from baseline
```

---

### Task 4.5: Run Full Test Suite
**Command:** `yarn test && yarn lint`  
**Acceptance:**
- [ ] All tests pass
- [ ] No linting errors
- [ ] Coverage 80%+ for composites folder
- [ ] TypeScript strict mode: `npx tsc --noEmit` passes
- [ ] No warnings or deprecations

---

### Task 4.6: Create Version Tag & Publish
**Commands:**
```bash
git tag v1.0.9
npm publish --tag latest
```

**Acceptance:**
- [ ] Package published to npm
- [ ] v1.0.9 tag created
- [ ] Package installable: `npm install @chamelelon-ui@latest`
- [ ] All files included in package (composites, templates, types)
- [ ] package.json updated with v1.0.9

---

## Validation Checklist (Before Publishing)

Run this checklist to confirm v1.0.9 is ready:

- [ ] **Composites:** 40–50 extracted, all in `src/composites/`
- [ ] **Typing:** All composites have prop interfaces, `npx tsc --noEmit` passes
- [ ] **Templates:** All 10 updated with `styleConfig` prop
- [ ] **Re-exports:** Templates re-export their composites, can import from templates
- [ ] **Central Indices:** `src/composites/index.ts` & `src/templates/index.ts` exist
- [ ] **Unit Tests:** 80%+ coverage for composites, `yarn test` passes
- [ ] **AI Manifest:** Complete, machine-readable, documented
- [ ] **No Breaking Changes:** Existing API still works
- [ ] **Bundle Size:** <50KB increase (gzipped)
- [ ] **Documentation:** COMPOSITES.md, README, CLAUDE.md updated
- [ ] **Linting:** `yarn lint` passes
- [ ] **Manual Test:** Import template + custom composite in same page, works

---

## Rollback Plan (If Issues Found)

If blocker found during Phase 3 or 4:

1. **Hold v1.0.9 release**
2. **Create v1.0.9-rc** (release candidate) on npm
3. **Fix issue** in dedicated branch
4. **Re-test** Phase 3 + 4
5. **Publish v1.0.9 stable** once all checks pass

---

*Implementation Plan — Last Updated: 2026-05-03*

---

## Phase 4 (Extended): Documentation & Frontend Updates

### Task 4.7: Create Composites Showcase Page (Frontend)
**File:** `src/demo/CompositeShowcase.tsx` (new)  
**Acceptance:**
- [ ] Interactive page showcasing all 40–50 composites
- [ ] Each composite has: description, live preview, prop controls, code snippet
- [ ] Supports theme switcher (all 5 themes × 2 modes)
- [ ] Supports animation intensity slider
- [ ] Users can copy code for any composite
- [ ] Page is responsive (mobile, tablet, desktop)
- [ ] TypeScript strict mode passes

**Content:**
- Grid/list of all composites
- Live rendering with editable props
- Theme/mode selector
- Copy-to-clipboard for generated code
- Links to COMPOSITES.md for each composite

---

### Task 4.8: Create Composite API Documentation
**File:** `docs/COMPOSITES_API.md` (new)  
**Acceptance:**
- [ ] Complete API reference for all 40–50 composites
- [ ] For each composite: name, description, props table, usage example
- [ ] Props table includes: name, type, required, default, description
- [ ] Usage examples cover: basic, themed, with animations, prop customization
- [ ] Cross-references between related composites
- [ ] Import statements for each composite
- [ ] File ~300+ lines

**Structure:**
```markdown
# Composite API Reference

## HeroSection
**Description:** Hero banner with heading, subheading, and CTA button

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| heading | string | Yes | — | Hero heading text |
| backgroundColor | string | No | 'surface' | Background color token |
| ... | ... | ... | ... | ... |

**Usage:**
\`\`\`typescript
<HeroSection heading="Welcome" backgroundColor="primary" />
\`\`\`

---

## FeatureCards
...
```

---

### Task 4.9: Update README with Composites Section
**File:** `README.md` (modify)  
**Acceptance:**
- [ ] Add "Composites" section explaining hierarchical architecture
- [ ] Show quick example: full template + individual composite
- [ ] Add link to COMPOSITES.md guide
- [ ] Add link to CompositeShowcase interactive demo
- [ ] Add section on "Prop-Driven Customization"
- [ ] Show example of mixing composites from different templates

**Example Section:**
```markdown
## 🧩 Composites: Building Blocks for Any UI

Chameleon UI v1.0.9+ includes 40+ reusable composites (sections) that can be used standalone or within templates.

### Use a Full Template
\`\`\`typescript
import { Landing } from '@chamelelon-ui/templates';

<Landing
  styleConfig={{
    heroSection: { backgroundColor: 'primary' },
    featureCards: { cardBgColor: 'surface' }
  }}
/>
\`\`\`

### Use Individual Composites
\`\`\`typescript
import { HeroSection, StatsCard, LoginForm } from '@chamelelon-ui/composites';

<div>
  <HeroSection heading="Dashboard" />
  <StatsCard label="Users" value={1250} />
  <LoginForm />
</div>
\`\`\`

[See all composites →](./COMPOSITES.md) | [Try interactive demo →](./src/demo/CompositeShowcase.tsx)
```

---

### Task 4.10: Create Type Definitions Export Documentation
**File:** `docs/TYPES.md` (new)  
**Acceptance:**
- [ ] Documents all exported types for composites & templates
- [ ] Shows how to import and use types in user projects
- [ ] Includes TypeScript strict mode best practices
- [ ] Examples: extend CompositeProps, create custom wrappers, etc.

**Example:**
```markdown
# Type Definitions

## Composite Props Types

All composite prop interfaces are exported from `@chamelelon-ui/composites`:

\`\`\`typescript
import type {
  HeroSectionProps,
  FeatureCardsProps,
  StatsCardProps,
  // ... 40+ more types
} from '@chamelelon-ui/composites';

// Create a custom wrapper
interface MyCustomHeroProps extends HeroSectionProps {
  customBrand?: string;
}

export const MyHero: React.FC<MyCustomHeroProps> = ({ 
  customBrand, 
  ...heroProps 
}) => {
  return <HeroSection {...heroProps} />;
};
\`\`\`

## Template Props Types
...
```

---

### Task 4.11: Update Package.json Exports
**File:** `package.json` (modify)  
**Acceptance:**
- [ ] Exports now include `/composites` subpath
- [ ] Exports now include `/templates` subpath
- [ ] Exports now include `/types` subpath
- [ ] Tree-shaking still works (`"sideEffects": false`)
- [ ] All exports are ESM only

**Example:**
```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "./composites": {
      "types": "./dist/composites/index.d.ts",
      "default": "./dist/composites/index.js"
    },
    "./templates": {
      "types": "./dist/templates/index.d.ts",
      "default": "./dist/templates/index.js"
    },
    "./types": {
      "types": "./dist/types/index.d.ts",
      "default": "./dist/types/index.js"
    }
  }
}
```

---

### Task 4.12: Create Migration Guide (v1.0.7 → v1.0.9)
**File:** `docs/MIGRATION_v1.0.9.md` (new)  
**Acceptance:**
- [ ] Explains what's new in v1.0.9
- [ ] Shows migration path for existing projects (spoiler: no changes needed)
- [ ] Highlights new features: composites, prop customization, AI manifest
- [ ] Provides upgrade instructions (just `npm install @chamelelon-ui@latest`)
- [ ] Shows before/after for customization pattern

**Content:**
```markdown
# Migration Guide: v1.0.7 → v1.0.9

## ✅ Good News: Backward Compatible!

v1.0.9 is **100% backward compatible**. Existing code continues to work without changes.

## What's New

### 1. Composites (40–50 reusable sections)
Templates now export their composites for reuse elsewhere.

**Old (v1.0.7):**
```typescript
import { Landing } from '@chamelelon-ui/templates';
<Landing /> // Use full template or nothing
```

**New (v1.0.9):**
```typescript
import { Landing, HeroSection } from '@chamelelon-ui/templates';

// Still use full template
<Landing />

// OR use individual composites
<HeroSection heading="Custom" />

// OR mix composites from different templates
<HeroSection /> + <StatsCard /> + <LoginForm />
```

### 2. Prop-Driven Customization
Templates accept `styleConfig` prop for easy customization without forking.

**New (v1.0.9):**
```typescript
<Landing
  styleConfig={{
    heroSection: { backgroundColor: 'primary' },
    featureCards: { cardBgColor: 'surface' }
  }}
/>
```

### 3. AI-Friendly Manifest
Composites are documented in machine-readable format for AI agents.

## Upgrade Steps

1. **Update package:**
   ```bash
   npm install @chamelelon-ui@latest
   ```

2. **That's it!** Your existing code works as-is.

3. **Optional: Try composites**
   ```typescript
   import { HeroSection } from '@chamelelon-ui/composites';
   <HeroSection heading="Welcome" />
   ```

## No Breaking Changes

- ✅ All atoms still work
- ✅ All molecules still work
- ✅ All templates still work
- ✅ New `styleConfig` prop is optional
- ✅ No removed or renamed exports
```

---

## Updated Task List Summary

**Phase 4 now includes 12 tasks (was 6):**

- 4.1: COMPOSITES.md guide
- 4.2: Update README.md
- 4.3: Update CLAUDE.md
- 4.4: Validate bundle size
- 4.5: Run full test suite
- 4.6: Create version tag & publish
- **4.7: Composites showcase page (NEW)**
- **4.8: API documentation (NEW)**
- **4.9: README composites section (NEW)**
- **4.10: Types documentation (NEW)**
- **4.11: Update package.json exports (NEW)**
- **4.12: Migration guide (NEW)**

**Duration:** 1–2 days (expanded from 1 day)

---

## Documentation Checklist Before Publishing

- [x] COMPOSITES.md complete with all 40–50 composites
- [x] COMPOSITES_API.md with full API reference
- [x] README.md highlights composites & links to guides
- [x] TYPES.md explains how to use exported types
- [x] MIGRATION_v1.0.9.md explains what's new + upgrade path
- [x] CLAUDE.md updated with composite architecture notes
- [x] CompositeShowcase interactive demo works in all themes
- [x] package.json exports updated with `/composites`, `/templates`, `/types`
- [x] All links in docs point to correct files/anchors
- [x] TypeScript strict mode passes for all docs examples

### 2026-05-04 execution snapshot

- ✅ Verified Phase 1–3.5 implementation artifacts and tests
- ✅ Completed Phase 4 tasks 4.1–4.5 and 4.7–4.12 in workspace
- ✅ Quality gates passed:
  - `npm run typecheck`
  - `npm run test`
  - `npm run lint`
  - `npm run build`
- ✅ Build bundle measurement recorded: `dist/index.js` gzip = `213.00 kB`
- 🟡 Phase 4.6 (git tag + npm publish) intentionally left pending for explicit release approval/execution

---

