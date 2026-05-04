# Exported Types Guide

Chameleon UI exports composite/template prop types from the root package and dedicated subpaths.

## Importing types

```ts
import type {
  HeroSectionProps,
  FeatureCardsProps,
  StatsCardCompositeProps,
  ProductGridProps,
  LandingStyleConfig,
  AdminDashboardStyleConfig,
} from "@chameleon-ui-lib/react/types";
```

You can also import from the root entry if preferred:

```ts
import type { HeroSectionProps, LandingStyleConfig } from "@chameleon-ui-lib/react";
```

## Composite type groups

Defined in `src/app/components/chameleon/composites/types.ts`.

### Base

- `CompositeBaseProps`

### Landing

- `HeroSectionProps`
- `FeatureCardsProps`
- `CTASectionProps`
- `TestimonialCarouselProps`
- `PricingTableProps`

### Dashboard

- `StatsCardCompositeProps`
- `BarChartSectionProps`
- `LineChartSectionProps`
- `SideNavProps`
- `TopBarProps`
- `DataTableCompositeProps<T>`

### Settings

- `ProfileSectionProps`
- `SettingsListProps`
- `PreferencePanelProps`
- `DangerZoneProps`

### E-commerce

- `ProductGridProps`
- `ProductCardProps`
- `CartSummaryProps`
- `CheckoutFormProps`
- `OrderConfirmationProps`

### Shared

- `PageHeaderProps`
- `EmptyStateProps`
- `LoadingStateProps`
- `ErrorBoundaryCompositeProps`
- `ModalCompositeProps`
- `ToastCompositeProps`

## Template style config types

Defined in `src/app/components/chameleon/template-styles.ts`.

- `LandingStyleConfig`
- `BlogStyleConfig`
- `PricingStyleConfig`
- `ContactStyleConfig`
- `UserProfileStyleConfig`
- `AdminDashboardStyleConfig`
- `EcommerceStyleConfig`
- `SettingsStyleConfig`
- `AuthFlowStyleConfig`
- `DocumentationStyleConfig`

## Strict TypeScript patterns

### 1) Extend safely

```ts
import type { HeroSectionProps } from "@chameleon-ui-lib/react/types";

interface MarketingHeroProps extends HeroSectionProps {
  campaignId: string;
}
```

### 2) Use `Partial<>` for style overrides

```ts
import type { LandingStyleConfig } from "@chameleon-ui-lib/react/types";

const styleConfig: LandingStyleConfig = {
  heroSection: {
    heading: "Ship Faster",
  },
};
```

### 3) Keep generic table rows explicit

```ts
import type { DataTableCompositeProps } from "@chameleon-ui-lib/react/types";

type UserRow = { id: string; email: string; role: string };

const props: DataTableCompositeProps<UserRow> = {
  columns: [
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ],
  data: [{ id: "u1", email: "team@example.com", role: "admin" }],
};
```

## Related docs

- `COMPOSITES.md`
- `docs/COMPOSITES_API.md`
- `docs/MIGRATION_v1.0.9.md`
