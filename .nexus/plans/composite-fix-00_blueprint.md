---
name: v1.0.9 Complete Blueprint
description: Full architectural blueprint for composite-first system
type: specification
status: populated
confidence: high
last_updated: "2026-05-03"
---

# Chameleon UI v1.0.9 — Complete Architecture Blueprint

## Executive Vision

**Problem:** Templates currently lack composable, reusable building blocks. Composites folder is empty.

**Solution:** Implement a **hierarchical, prop-driven customization architecture** where:
- **Templates** expose both a complete page component AND extracted, standalone composites
- **Composites** are the building blocks—composed of molecules, fully styleable via props
- **Molecules** are composed of atoms, fully styleable via props
- **Atoms** are the foundation—style-aware, theme-aware, fully styleable

**Outcome:** Users (developers & AI agents) can:
1. Import a complete template and customize it via props
2. Import individual composites from that template, reuse them elsewhere, customize via props
3. Build custom pages from a library of battle-tested composites
4. Achieve **no-rewrite customization** across all hierarchy levels

---

## Target State (v1.0.9)

```
Templates (10)
├─ Landing
│  ├─ Exports: <Landing /> component
│  ├─ Exports: <HeroSection />, <FeatureCards />, <CTASection /> composites
│  └─ Props: landingStyleConfig = { heroSection: {...}, featureCards: {...}, ctaSection: {...} }
│
├─ Dashboard
│  ├─ Exports: <Dashboard /> component
│  ├─ Exports: <StatsCard />, <Chart />, <SideNav />, <TopBar /> composites
│  └─ Props: dashboardStyleConfig = {...}
│
└─ ... (8 more templates)

Composites (40-50)
├─ HeroSection (from Landing)
├─ FeatureCards (from Landing)
├─ CTASection (from Landing)
├─ StatsCard (from Dashboard)
├─ Chart (from Dashboard)
├─ SideNav (from Dashboard)
├─ TopBar (from Dashboard)
└─ ... [shared composites from other templates]

Molecules (15) [already exist]
Atoms (8) [already exist]
```

---

## Customization Hierarchy

```
Template (page-level props)
  └─ Composites (section-level props)
       └─ Molecules (component-level props)
            └─ Atoms (primitive-level props)
```

**Example:**
```typescript
// Level 1: Template with composite style overrides
<Landing
  heroSection={{ 
    backgroundColor: 'surfaceVariant',
    padding: 'xxl',
    animationIntensity: 0.8 
  }}
  featureCards={{
    cardBgColor: 'surface',
    shadowIntensity: 'high',
    borderRadius: 'lg'
  }}
/>

// Level 2: Standalone composite
<HeroSection
  backgroundColor="surfaceVariant"
  padding="xxl"
  animationIntensity={0.8}
/>

// Level 3: Molecule from composite
<Card
  variant="elevated"
  shadow="high"
  borderRadius="lg"
/>

// Level 4: Atom
<Button variant="primary" size="lg" />
```

---

## Composite Catalog (Complete List)

### Landing Template Composites (5)
1. `HeroSection` — Hero banner with heading, subheading, CTA
2. `FeatureCards` — Grid of feature cards (3–4 columns)
3. `CTASection` — Call-to-action section with button
4. `TestimonialCarousel` — Rotating testimonials
5. `PricingTable` — Pricing tiers

### Dashboard Template Composites (6)
1. `StatsCard` — Key metric display (4-up)
2. `BarChart` — Chart composite wrapper
3. `LineChart` — Chart composite wrapper
4. `SideNav` — Left sidebar navigation
5. `TopBar` — Header bar with user menu
6. `DataTableComposite` — Table with sorting/filtering UI

### Auth Template Composites (5)
1. `LoginForm` — Email + password form
2. `SignupForm` — Full signup with validation feedback
3. `2FAForm` — 2FA code input
4. `MagicLinkForm` — Magic link request
5. `PasswordRecoveryForm` — Password reset flow

### Settings Template Composites (4)
1. `ProfileSection` — User avatar, name, bio
2. `SettingsList` — Grouped settings with toggles
3. `PreferencePanel` — Theme/language/notification prefs
4. `DangerZone` — Destructive actions (delete account, etc.)

### E-Commerce Template Composites (5)
1. `ProductGrid` — Searchable, filterable product grid
2. `ProductCard` — Single product (image, price, rating)
3. `CartSummary` — Cart total, shipping estimate
4. `CheckoutForm` — Billing/shipping form
5. `OrderConfirmation` — Success state

### Shared Composites (6)
1. `PageHeader` — Title + breadcrumbs
2. `EmptyState` — Placeholder for empty sections
3. `LoadingState` — Skeleton or spinner overlay
4. `ErrorBoundary` — Error message UI
5. `Modal` — Dialog/modal wrapper
6. `Toast` — Notification composites

**Total: ~40–50 composites**

---

## Key Design Patterns

### Composite Type Pattern

```typescript
// src/composites/HeroSection.tsx

export interface HeroSectionProps {
  // Content
  heading: ReactNode;
  subheading?: ReactNode;
  ctaLabel?: string;
  onCTAClick?: () => void;
  
  // Theme & Style Props
  backgroundColor?: 'surface' | 'surfaceVariant' | 'primary' | 'secondary';
  textColor?: 'onSurface' | 'onSurfaceVariant' | 'onPrimary';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  minHeight?: string;
  alignment?: 'left' | 'center' | 'right';
  
  // Animation Props
  animationIntensity?: number;        // 0–1 scale
  animated?: boolean;
  
  // Molecule Props (override for internal molecules)
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  buttonSize?: 'sm' | 'md' | 'lg';
  headingVariant?: 'h1' | 'h2' | 'h3';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heading,
  subheading,
  ctaLabel = 'Get Started',
  backgroundColor = 'surface',
  padding = 'xl',
  textColor = 'onSurface',
  animationIntensity = 0.8,
  buttonVariant = 'primary',
  animated = true,
  ...props
}) => {
  const { theme, mode } = useTheme();
  
  return (
    <div
      style={{
        backgroundColor: theme.colors[mode][backgroundColor],
        color: theme.colors[mode][textColor],
        padding: theme.spacing[padding],
        minHeight: '80vh',
      }}
    >
      {/* Use Heading molecule */}
      <Heading
        variant={headingVariant}
        animated={animated}
        animationIntensity={animationIntensity}
      >
        {heading}
      </Heading>
      
      {subheading && (
        <Paragraph>{subheading}</Paragraph>
      )}
      
      <Button
        variant={buttonVariant}
        size={buttonSize}
        onClick={onCTAClick}
      >
        {ctaLabel}
      </Button>
    </div>
  );
};
```

### Template Export Pattern

```typescript
// src/templates/Landing/Landing.tsx

export interface LandingStyleConfig {
  heroSection?: HeroSectionProps;
  featureCards?: FeatureCardsProps;
  ctaSection?: CTASectionProps;
  testimonialCarousel?: TestimonialCarouselProps;
  pricingTable?: PricingTableProps;
}

export interface LandingProps {
  // Content
  hero?: { heading: string; subheading: string; };
  features?: Feature[];
  testimonials?: Testimonial[];
  pricing?: PricingTier[];
  
  // Style configuration (hierarchical prop override)
  styleConfig?: LandingStyleConfig;
  
  // Theme & layout
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
        animationIntensity={animationIntensity}
        {...styleConfig.heroSection}
      />
      
      <FeatureCards
        features={features}
        animated={animated}
        {...styleConfig.featureCards}
      />
      
      <CTASection
        animated={animated}
        {...styleConfig.ctaSection}
      />
      
      <TestimonialCarousel
        testimonials={testimonials}
        animated={animated}
        {...styleConfig.testimonialCarousel}
      />
      
      <PricingTable
        tiers={pricing}
        animated={animated}
        {...styleConfig.pricingTable}
      />
    </Page>
  );
};

// EXPORT COMPOSITES INDEPENDENTLY
export { HeroSection } from './composites';
export { FeatureCards } from './composites';
export { CTASection } from './composites';
export { TestimonialCarousel } from './composites';
export { PricingTable } from './composites';

// EXPORT TYPES
export type {
  LandingProps,
  LandingStyleConfig,
  HeroSectionProps,
  FeatureCardsProps,
  // ...
} from './types';
```

---

## Usage Examples

### Example 1: Full Template (Page-Level Customization)
```typescript
import { Landing, type LandingStyleConfig } from '@chamelelon-ui/templates';

const customConfig: LandingStyleConfig = {
  heroSection: {
    backgroundColor: 'primary',
    textColor: 'onPrimary',
    padding: 'xxl',
    animationIntensity: 0.6,
  },
  featureCards: {
    cardBgColor: 'surface',
    shadowIntensity: 'high',
  },
  pricingTable: {
    highlightColor: 'secondary',
  },
};

function HomePage() {
  return (
    <Landing
      hero={{ heading: 'Welcome', subheading: 'Build amazing UIs' }}
      features={myFeatures}
      styleConfig={customConfig}
      animated
    />
  );
}
```

### Example 2: Individual Composites
```typescript
import { HeroSection, FeatureCards } from '@chamelelon-ui/composites';

function CustomPage() {
  return (
    <main>
      <HeroSection
        heading="Custom Hero"
        subheading="Reuse it anywhere"
        backgroundColor="secondary"
        padding="lg"
        animated
      />
      
      <FeatureCards
        features={myFeatures}
        cardBgColor="surface"
      />
    </main>
  );
}
```

### Example 3: Mix & Match from Different Templates
```typescript
import {
  HeroSection,      // from Landing
  StatsCard,        // from Dashboard
  LoginForm,        // from Auth
} from '@chamelelon-ui/composites';

function CustomDashboard() {
  return (
    <div>
      <HeroSection heading="Admin Dashboard" />
      <StatsCard label="Users" value={1250} />
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
```

---

## Success Criteria

| Metric | Target | Status |
|--------|--------|--------|
| Component count | 40–50 | TBD |
| Theme coverage | 5 themes × 2 modes | TBD |
| Composites fully typed (strict) | 100% | TBD |
| Composite unit coverage | 80%+ | TBD |
| Template styleConfig prop | All 10 | TBD |
| Zero breaking changes | Yes | TBD |
| Bundle size increase | <50KB (gzipped) | TBD |
| AI manifest complete | Yes | TBD |
| Documentation complete | 6 new guides | TBD |
| Frontend showcase works | Yes | TBD |
| npm v1.0.9 published | Yes | TBD |

---

*Blueprint Document — Last Updated: 2026-05-03*
