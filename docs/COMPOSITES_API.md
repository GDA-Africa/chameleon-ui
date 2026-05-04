# Composite API Reference

This reference covers the composite components currently exposed from `src/app/components/chameleon/composites`.

## Shared base props

Most composites accept:

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `animated` | `boolean` | No | `true` (component dependent) | Enables section animation |
| `animationIntensity` | `number` | No | `0.8` (component dependent) | Motion strength |
| `className` | `string` | No | `undefined` | Additional class names |

## Landing

### `HeroSection`

| Prop | Type | Required | Default |
|---|---|---|---|
| `heading` | `ReactNode` | No | `"Build Better Products"` |
| `subheading` | `string` | No | internal default |
| `ctaLabel` | `string` | No | `"Get Started"` |
| `secondaryCtaLabel` | `string` | No | `"Learn More"` |
| `badge` | `string` | No | internal default |
| `trustLogos` | `string[]` | No | `[]` |

```tsx
<HeroSection heading="Welcome" ctaLabel="Start" />
```

### `FeatureCards`

| Prop | Type | Required | Default |
|---|---|---|---|
| `features` | `Feature[]` | No | internal defaults |
| `columns` | `2 \| 3 \| 4` | No | `3` |
| `heading` | `string` | No | internal default |

```tsx
<FeatureCards columns={4} />
```

### `CTASection`

| Prop | Type | Required | Default |
|---|---|---|---|
| `heading` | `string` | No | internal default |
| `subheading` | `string` | No | internal default |
| `ctaLabel` | `string` | No | internal default |
| `onCTAClick` | `() => void` | No | `undefined` |

### `TestimonialCarousel`

| Prop | Type | Required | Default |
|---|---|---|---|
| `testimonials` | `Testimonial[]` | No | internal defaults |
| `columns` | `1 \| 2 \| 3` | No | `3` |
| `autoScroll` | `boolean` | No | `false` |
| `delay` | `number` | No | `4000` |

### `PricingTable`

| Prop | Type | Required | Default |
|---|---|---|---|
| `tiers` | `PricingTier[]` | No | internal defaults |
| `currencySymbol` | `string` | No | `$` |
| `onSelectTier` | `(tier: PricingTier) => void` | No | `undefined` |

## Dashboard

### `StatsCard`

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `value` | `string \| number` | Yes | — |
| `trend` | `number` | No | `undefined` |
| `trendLabel` | `string` | No | `undefined` |

### `BarChartSection` / `LineChartSection`

| Prop | Type | Required | Default |
|---|---|---|---|
| `heading` | `string` | No | internal default |
| `data` | `ChartDataPoint[]` | No | internal defaults |
| `height` | `number` | No | `300` |

### `SideNav`

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `NavItem[]` | No | internal defaults |
| `activeItem` | `string` | No | `undefined` |
| `onSelect` | `(item: NavItem) => void` | No | `undefined` |

### `TopBar`

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | No | `undefined` |
| `subtitle` | `string` | No | `undefined` |
| `onSearch` | `(query: string) => void` | No | `undefined` |

### `DataTableComposite`

| Prop | Type | Required | Default |
|---|---|---|---|
| `columns` | `TableColumn<T>[]` | No | `[]` |
| `data` | `T[]` | No | `[]` |
| `sortable` | `boolean` | No | `true` |
| `filterable` | `boolean` | No | `true` |
| `paginated` | `boolean` | No | `true` |

## Settings

`ProfileSection`, `SettingsList`, `PreferencePanel`, and `DangerZone` follow their interfaces in `composites/types.ts` and are designed for settings/account pages.

## E-commerce

`ProductGrid`, `ProductCard`, `CartSummary`, `CheckoutForm`, and `OrderConfirmation` provide catalog, cart, checkout, and post-purchase sections.

## Shared

`PageHeader`, `EmptyState`, `LoadingState`, `ErrorBoundaryComposite`, `ModalComposite`, and `ToastComposite` are reusable across all template types.

## Import examples

```tsx
import {
  HeroSection,
  StatsCard,
  ProductGrid,
  EmptyState,
} from "@chameleon-ui-lib/react/composites";
```

```ts
import type {
  HeroSectionProps,
  StatsCardCompositeProps,
  ProductGridProps,
} from "@chameleon-ui-lib/react/types";
```
