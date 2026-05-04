---
name: Product Vision & Requirements (v1.0.9)
description: Vision for composite-first architecture with hierarchical prop customization
type: vision
status: populated
confidence: high
last_updated: "2026-05-03"
---

# Product Vision: Composite-First Architecture

## Problem Statement

**Current State (v1.0.7):**
- Templates are **monolithic** — each is a single, non-decomposable component
- Composites folder is **empty** — no reusable sections extracted
- **No prop-based customization** at the template or composite level
- **Developers can't reuse sections** from one template in another
- **AI agents have no building blocks** to compose UIs from

**Impact:**
- Low reusability → code duplication across projects
- High customization cost → must fork or rewrite templates
- Not AI-friendly → agents can't query what composites exist
- Template bundle is monolithic → can't tree-shake individual sections

---

## Product Vision (v1.0.9)

### Core Concept

**Composites are the fundamental unit of the design system.**

- **Composites** = sections composed of molecules (e.g., HeroSection, StatsCard, FeatureCards)
- **Templates** = pre-built pages that showcase composites + provide entry point for beginners
- **Hierarchical props** allow customization at any level without rewriting

### Target Users

#### 1. **Frontend Developers**
- **Goal:** Build custom UIs by composing pre-built sections
- **Pain:** Currently must choose: use template as-is OR fork & rewrite
- **Solution:** Import individual composites, customize via props, mix & match across templates

#### 2. **AI Coding Agents**
- **Goal:** Generate correct UI code in one pass, no trial-and-error
- **Pain:** Most libraries lack machine-readable component catalogs
- **Solution:** AI manifest catalogs all composites with prop schemas, types, examples

#### 3. **Design System Consumers**
- **Goal:** Maintain visual consistency across product family
- **Pain:** Can't extract reusable patterns from existing pages
- **Solution:** Composites from templates become shared library for other projects

---

## User Stories

### Story 1: Developer Uses Full Template
**As a** developer  
**I want to** import a complete template (e.g., Landing page) and customize it via props  
**So that** I can use a battle-tested layout without building from scratch

**Acceptance Criteria:**
```typescript
import { Landing, type LandingStyleConfig } from '@chamelelon-ui/templates';

const Landing = () => (
  <Landing
    styleConfig={{
      heroSection: { backgroundColor: 'primary' },
      featureCards: { cardBgColor: 'surface' }
    }}
  />
);
// ✅ Template renders with custom styles
// ✅ All 5 themes work (Material, Simple, Minimalist, Glassy, Liquid)
// ✅ Dark & light modes work
// ✅ Animations respect intensity prop
```

### Story 2: Developer Reuses Individual Composite
**As a** developer  
**I want to** import a single composite (e.g., HeroSection) from a template  
**So that** I can reuse it on multiple pages without duplicating code

**Acceptance Criteria:**
```typescript
import { HeroSection } from '@chamelelon-ui/composites';

function CustomPage() {
  return (
    <HeroSection
      heading="My Custom Hero"
      backgroundColor="secondary"
      padding="lg"
      animated
    />
  );
}
// ✅ HeroSection works standalone
// ✅ Props customize appearance
// ✅ Works across all 5 themes + modes
```

### Story 3: Developer Mix-Matches Composites from Different Templates
**As a** developer  
**I want to** combine composites from Landing, Dashboard, and Auth templates  
**So that** I can build custom pages with pre-built sections

**Acceptance Criteria:**
```typescript
import {
  HeroSection,      // from Landing
  StatsCard,        // from Dashboard
  LoginForm,        // from Auth
} from '@chamelelon-ui/composites';

function CustomPage() {
  return (
    <div>
      <HeroSection heading="Admin Dashboard" />
      <StatsCard label="Users" value={1250} />
      <LoginForm />
    </div>
  );
}
// ✅ All 3 composites render together
// ✅ All use same theme & mode
// ✅ No conflicts or styling issues
```

### Story 4: AI Agent Generates Correct Code
**As an** AI coding agent  
**I want to** query the composite catalog with prop schemas  
**So that** I can generate correct UI code in one pass

**Acceptance Criteria:**
```typescript
// AI reads AI manifest
const manifest = await import('@chamelelon-ui/composites/ai-manifest');

// AI knows exact prop shape
const heroProps = manifest.HeroSection.props;
// {
//   heading: { type: 'string', required: true },
//   backgroundColor: { type: 'string', options: [...] },
//   padding: { type: 'string', options: [...] },
//   animationIntensity: { type: 'number', min: 0, max: 1 },
//   animated: { type: 'boolean', default: true }
// }

// AI generates correct code
const code = ai.generate({
  component: 'HeroSection',
  theme: 'Glassy',
  props: { heading: '...', backgroundColor: 'primary', ... }
});
// ✅ Generated code is correct first try
// ✅ No trial & error
// ✅ Props are validated before generation
```

---

## Feature Requirements

### F1: Composite Extraction & Typing
**Requirement:** All composites are extracted from templates, fully typed with TypeScript strict mode

- [ ] 40–50 composites identified across 10 templates
- [ ] Each composite has complete `Props` interface
- [ ] All props are documented with JSDoc
- [ ] No `any` types, no implicit returns
- [ ] Compile without `--skipLibCheck`

### F2: Hierarchical Prop Customization
**Requirement:** Props flow hierarchically: Template → Composite → Molecule → Atom

- [ ] Templates accept `styleConfig` prop
- [ ] styleConfig is object with shape `{ compositeA?: {}, compositeB?: {} }`
- [ ] Composites pass through props to child molecules
- [ ] Each level can override appearance without rewriting
- [ ] Props are validated at each level

### F3: Composite Central Index
**Requirement:** Single source of truth for all composites

- [ ] `src/composites/index.ts` exports all 40–50 composites
- [ ] Types exported separately (`export type *`)
- [ ] IDE autocomplete works for all composites
- [ ] No naming conflicts or duplicates

### F4: Template Re-Exports
**Requirement:** Templates export their component AND extracted composites

- [ ] Landing exports `<Landing />` and `<HeroSection />`, `<FeatureCards />`, etc.
- [ ] Dashboard exports `<Dashboard />` and `<StatsCard />`, `<BarChart />`, etc.
- [ ] All 10 templates have re-exports
- [ ] Re-exports don't break import paths

### F5: AI Manifest
**Requirement:** Machine-readable catalog for AI agents

- [ ] `src/composites/ai-manifest.ts` catalogs all composites
- [ ] Each composite includes: name, description, props schema, examples
- [ ] Props schema includes: type, required, default, options, validation
- [ ] Examples show correct usage in all 5 themes
- [ ] Manifest is auto-generated or manually maintained with validation

### F6: Unit Tests (80%+ Coverage)
**Requirement:** All composites have unit tests validating prop behavior

- [ ] Each composite has ≥1 test file
- [ ] Tests cover: default props, custom props, theme application, animations
- [ ] Coverage is 80%+ for composites folder
- [ ] All tests pass across Material, Simple, Minimalist, Glassy, Liquid themes
- [ ] Tests pass in both light & dark modes

### F7: Zero Breaking Changes
**Requirement:** Existing public API is not broken

- [ ] All existing atoms & molecules still work as before
- [ ] Existing template imports still work (backward compatible)
- [ ] New props are optional with sensible defaults
- [ ] No removed or renamed public exports

---

## Success Metrics

| Metric | v1.0.7 | v1.0.9 Target | Measurement |
|--------|--------|---------------|-----------  |
| Composites Available | 0 | 40–50 | Count in `src/composites/` |
| Composites Typed (strict) | 0% | 100% | `npx tsc --noEmit` passes |
| Composite Unit Coverage | N/A | 80%+ | `yarn test --coverage` |
| Template Customizability | Low (fork/rewrite) | High (props-based) | Can customize template without code changes |
| Cross-Template Reuse | Not possible | Fully possible | Can import composite from any template |
| AI Agent Usability | Poor (no catalog) | Excellent (AI manifest) | AI generates correct code first try |
| Bundle Size Increase | Baseline | <50KB (gzipped) | Measure before/after publish |
| npm Downloads | 100/week | 200+/week (post-launch) | Track monthly downloads |

---

## Out of Scope (v1.0.9)

- Storybook integration (v1.1)
- Playwright E2E tests (v1.1)
- CLI enhancements beyond existing (v1.1)
- SSR / Next.js support (v2.0)
- Email templates (v2.0)

---

## Dependencies & Risks

### Dependencies (Must Exist Before v1.0.9)
- ✅ Atoms (Button, Input, Badge, etc.) — Ready
- ✅ Molecules (Card, Tabs, Dialog, etc.) — Ready
- ✅ Theme system (5 themes × 2 modes) — Ready
- ✅ Animation system — Ready

### Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Composites are too many (>50) → scope creep | Low | High | Start with Phase 1, 2; cut less-used composites for v1.0.9 |
| Props become too granular → prop drilling | Medium | Medium | Limit props to top-level customization; use CSS variables for deep theming |
| Template API breaks existing code | High | High | Make styleConfig optional; keep default behavior unchanged |
| AI manifest falls out of sync | Medium | Medium | Auto-generate from type definitions + maintain validation test |
| Bundle size grows >50KB | Low | Medium | Tree-shake unused composites; lazy-load templates |

---

## Timeline & Commitment

**Target Completion:** 2026-05-15 (2 weeks)  
**Implementation:** Claude Code (autonomous agent)  
**Review & Publish:** Halton  
**Fallback:** If blocked, v1.0.9-rc released; v1.0.9 stable in 1 week

---

*Vision Document — Last Updated: 2026-05-03*
