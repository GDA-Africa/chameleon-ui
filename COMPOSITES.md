# Chameleon UI Composites Guide

Chameleon UI ships reusable **composites** (section-level UI blocks) that sit between molecules and full templates.

- Use them standalone in custom pages
- Mix them across templates
- Customize them with props and template `styleConfig`

## Import paths

```ts
import { HeroSection, StatsCard, SettingsList } from "@chameleon-ui-lib/react";
```

Subpath imports (added in this phase) are also available:

```ts
import { HeroSection, ProductGrid } from "@chameleon-ui-lib/react/composites";
import type { HeroSectionProps } from "@chameleon-ui-lib/react/types";
```

## Composite Catalog

### Landing composites

- `HeroSection` — Hero heading/subheading + CTA controls
- `FeatureCards` — Grid of feature cards
- `CTASection` — Focused call-to-action banner
- `TestimonialCarousel` — Testimonial grid/carousel block
- `PricingTable` — Tier comparison and CTA selection

### Dashboard composites

- `StatsCard` — KPI card with optional trend
- `BarChartSection` — Bar chart section
- `LineChartSection` — Line chart section
- `SideNav` — Navigation section with item selection
- `TopBar` — Search/actions/notification top bar
- `DataTableComposite` — Sortable/filterable data table

### Settings composites

- `ProfileSection` — Editable profile block
- `SettingsList` — Toggle settings group
- `PreferencePanel` — Select-based preferences
- `DangerZone` — Confirmed destructive actions

### E-commerce composites

- `ProductGrid` — Search/filter product listing
- `ProductCard` — Individual product tile
- `CartSummary` — Totals, quantities and checkout CTA
- `CheckoutForm` — Contact/shipping/payment form
- `OrderConfirmation` — Post-purchase confirmation

### Shared composites

- `PageHeader` — Title, subtitle and breadcrumbs
- `EmptyState` — Empty data fallback with optional action
- `LoadingState` — Spinner/skeleton/dots loading visuals
- `ErrorBoundaryComposite` — Error block with retry CTA
- `ModalComposite` — Dialog wrapper
- `ToastComposite` — Inline toast notification block

## Usage patterns

### 1) Standalone composition

```tsx
import {
  HeroSection,
  StatsCard,
  EmptyState,
  ChameleonProvider,
} from "@chameleon-ui-lib/react";

export function MarketingDashboard() {
  return (
    <ChameleonProvider initialTheme="glassy" initialMode="dark">
      <HeroSection heading="Growth Command Center" ctaLabel="Run campaign" />
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <StatsCard label="MRR" value="$42,100" trend={7.2} />
        <StatsCard label="Conversion" value="4.9%" trend={0.8} />
        <StatsCard label="Churn" value="1.6%" trend={-0.2} />
      </div>
      <EmptyState title="No incidents" description="Your system is healthy." className="mt-8" />
    </ChameleonProvider>
  );
}
```

### 2) Template-level style overrides

```tsx
import { LandingPageTemplate } from "@chameleon-ui-lib/react";

<LandingPageTemplate
  styleConfig={{
    heroSection: {
      heading: "Ship UI 10x faster",
      ctaLabel: "Start now",
    },
    featureCards: {
      columns: 4,
    },
    ctaSection: {
      heading: "Ready to launch?",
    },
  }}
/>;
```

### 3) Cross-template mixing

```tsx
import { HeroSection, ProductGrid, SettingsList } from "@chameleon-ui-lib/react/composites";

<div className="space-y-10">
  <HeroSection heading="Creator Marketplace" />
  <ProductGrid heading="Trending packs" />
  <SettingsList heading="Marketplace Preferences" />
</div>;
```

## Animation controls

All composites inherit `CompositeBaseProps`:

- `animated?: boolean`
- `animationIntensity?: number`
- `className?: string`

Recommended defaults:

- Landing/marketing sections: `animated={true}`
- Dense dashboard layouts: `animated={false}` for perf-sensitive views
- Keep `animationIntensity` between `0.4` and `0.8` for subtle motion

## AI manifest

Machine-readable metadata is available at:

- `src/app/components/chameleon/composites/ai-manifest.ts`

This is used by AI assistants to discover component names, prop schema hints, and usage snippets.

## See also

- API reference: `docs/COMPOSITES_API.md`
- Types reference: `docs/TYPES.md`
- Migration notes: `docs/MIGRATION_v1.0.9.md`
- Interactive workshop page: `src/app/components/chameleon/composite-showcase.tsx`
