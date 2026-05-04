# Migration Guide: v1.0.7 → v1.0.9

## ✅ Backward compatibility

v1.0.9 is backward compatible with existing consumers.

- Existing imports from `@chameleon-ui-lib/react` continue to work
- Existing template usage continues to work
- New customization is additive via optional `styleConfig`

## What’s new

### 1) Composite-first architecture

Composites are now first-class reusable building blocks, organized under:

- `src/app/components/chameleon/composites/*`
- central registry: `src/app/components/chameleon/composites/index.ts`

### 2) Template style configuration

Templates expose typed style configuration contracts in:

- `src/app/components/chameleon/template-styles.ts`

### 3) AI-readable composite manifest

Composite metadata is available in:

- `src/app/components/chameleon/composites/ai-manifest.ts`

### 4) New package subpath exports

- `@chameleon-ui-lib/react/composites`
- `@chameleon-ui-lib/react/templates`
- `@chameleon-ui-lib/react/types`

## Before / after examples

### Before (v1.0.7)

```tsx
import { LandingPageTemplate } from "@chameleon-ui-lib/react";

<LandingPageTemplate />;
```

### After (v1.0.9)

```tsx
import {
  LandingPageTemplate,
  HeroSection,
  StatsCard,
} from "@chameleon-ui-lib/react";

<LandingPageTemplate
  styleConfig={{
    heroSection: { heading: "Ship faster" },
  }}
/>;

<div className="mt-8">
  <HeroSection heading="Reusable section" />
  <StatsCard label="Users" value={1250} />
</div>;
```

## Upgrade steps

1. Update package

```bash
npm install @chameleon-ui-lib/react@latest
```

2. Keep your existing usage as-is (no breaking changes)
3. Optionally adopt composites and typed `styleConfig`

## Validation checklist

- [ ] App compiles under strict TypeScript
- [ ] Existing template pages still render
- [ ] Theme switching still works in light/dark
- [ ] New subpath imports resolve in your app

## Useful references

- `COMPOSITES.md`
- `docs/COMPOSITES_API.md`
- `docs/TYPES.md`
