---
nexus_doc: true
id: "06_test_strategy"
title: "Test Strategy"
status: populated
confidence: medium
last_updated: "2026-04-05"
---

# Test Strategy

**Project:** Chameleon UI
**Framework:** Vitest (not yet installed)

---

## 🧪 Testing Philosophy

**Coverage Target:** 80%+

Chameleon UI currently has **zero automated tests**. Vitest is declared as the intended test framework but is not yet installed or configured. This is the #1 priority gap.

### What Gets Tested:

- **Atoms:** Render correctly with all variant/size combinations; theme classes applied; animated mode works
- **Molecules:** Compose atoms correctly; Radix primitives accessible; Dialog open/close; Tabs switch
- **Organisms:** DataTable filtering, sorting, pagination; Chart rendering
- **Context:** `ChameleonProvider` sets correct CSS vars; `useThemeClasses()` returns correct classes per theme/mode
- **Utils:** `cn()` merges classes correctly

### What Doesn't Get Tested (V1):

- Visual regression (no snapshot tests initially)
- Ambient backgrounds (Glassy/Liquid animation rendering)
- Browser-specific behavior

## 📋 Test Types

| Type        | Tool                           | Coverage                         |
| ----------- | ------------------------------ | -------------------------------- |
| Unit        | Vitest + React Testing Library | Atoms, Molecules, utils, context |
| Integration | Vitest + RTL                   | Organisms (DataTable, Charts)    |
| Component   | Vitest + RTL                   | Templates render without errors  |
| E2E         | Playwright (future)            | Theme switching, full page flows |

## 🏃 Running Tests

```bash
pnpm test              # Run all tests
pnpm test -- --watch   # Watch mode
pnpm test -- --coverage # Coverage report
```

## 📂 Test File Conventions

Tests live alongside source in `__tests__/` directories.

## 🔧 Setup Required

1. Install: `pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
2. Create `vitest.config.ts` with `jsdom` environment
3. Add `"test": "vitest"` script to `package.json`
4. Create test setup file for RTL matchers
