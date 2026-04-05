---
nexus_doc: true
id: "05_business_logic"
title: "Business Logic"
status: populated
confidence: high
last_updated: "2026-04-05"
---

# Business Logic

**Project:** Chameleon UI

---

## 📐 Business Rules

### Theme System Rules

1. **Every component MUST use CSS variable tokens** — never hardcode colors
2. **Text contrast is guaranteed** — `--primary-foreground` always contrasts `--primary`, `--card-foreground` always contrasts `--card`, etc.
3. **Theme switching is runtime** — CSS variables are set via React Context `style` prop on a wrapper div
4. **Glassy theme always forces `color-scheme: dark`** — text is always light on glass, regardless of mode
5. **Liquid and Glassy backgrounds use `transparent` as `--background`** — ambient animated backgrounds show through
6. **Components MUST NOT import theme colors directly** — always use `useThemeClasses()` hook

### Component Hierarchy Rules

1. **Atoms** depend on nothing except `context.tsx`, `utils.ts`, and `animations.tsx`
2. **Molecules** may import Atoms and Radix primitives
3. **Organisms** may import Atoms and Molecules
4. **Templates** may import everything
5. **No circular dependencies** — lower layers never import from higher layers

### Animation Rules

1. **`animated` prop is always optional** and defaults to `false`
2. **Each theme has unique animation physics** in `animationPresets`
3. **Material:** elevation changes, shadow transitions
4. **Simple:** subtle scale, clean easing
5. **Minimalist:** translation only, linear timing
6. **Glassy:** soft floating, backdrop blur transitions
7. **Liquid:** organic morphing, elastic spring physics

### i18n Rules

1. **All user-facing label text in templates** uses the `translations` object
2. **Component-level labels** (e.g., "Sign In", "Settings") are translated
3. **Developer-facing labels** (variant names, prop descriptions) remain English
4. **New languages** are added by extending the `translations` object in `context.tsx`

### Accessibility Rules

1. **All interactive elements** are keyboard accessible (Tab, Enter, Space)
2. **Focus rings** use `--ring` token with 2px offset
3. **Disabled state** uses `pointer-events-none` + `opacity-50`
4. **Icon-only buttons** require `aria-label`
5. **Radix primitives** provide ARIA attributes out of the box

## 🔄 State Machines

### Theme State

```
Initial: simple/light/en
         ↓
User selects theme → setTheme() → CSS vars update → all components re-render
User toggles mode → setMode() → dark class on <html> + CSS vars update
User changes lang → setLang() → translation keys resolve to new language
User adjusts intensity → setGlassyIntensity()/setLiquidIntensity() → blur/animation speed changes
```

### DataTable State (composites.tsx)

```
Initial: page=1, search="", sortKey=null, sortDir=null, filters={}
         ↓
User types search → filter data by all columns
User clicks column header → toggle sort (null → asc → desc → null)
User sets filter → intersect with search results
User navigates page → slice filtered data by pageSize
```

### KanbanBoard State

```
Columns: Todo → In Progress → Done
Drag card from column A → drop in column B → update column assignment
```

## 🧮 Algorithms

### Theme Class Resolution (`useThemeClasses`)

- Reads `theme` and `mode` from context
- Returns a flat object of CSS class strings, one per component type
- Each class string is a pre-built combination of Tailwind utilities + CSS variable references
- Components just apply the class — no conditional logic needed at the component level

### CSS Variable Injection

- `themeTokens` is a `Record<ChameleonTheme, Record<ChameleonMode, CSSProperties>>` — a 2D lookup
- On render, `ChameleonProvider` does `themeTokens[theme][mode]` → spreads as `style` on wrapper div
- For Glassy theme, `--glass-blur` is dynamically computed from `glassyIntensity`

### DataTable Filtering + Sorting

- Filtering: `data.filter(row => columns.some(col => String(row[col.key]).includes(search)))`
- Sorting: `data.sort()` with direction toggle
- Pagination: `data.slice((page - 1) * pageSize, page * pageSize)`
