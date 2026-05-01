---
title: AI Integration
purpose: Programmatic surface for agents — manifest, validators, helpers, prompt templates.
---

# AI Integration

This is the contract between Chameleon UI and the AI agents that consume it. Everything here is exposed at runtime so an agent (or a framework like Cursor/Copilot/Claude Code) can introspect and validate the components it generates.

## Where the AI surface lives

| File | Exports |
|------|---------|
| `src/app/components/chameleon/ai-manifest.ts` | `CHAMELEON_AI_MANIFEST`, `AI_COMPONENT_RECIPES`, `AI_PROMPT_TEMPLATES`, `CHAMELEON_AI_SUMMARY`, `selectComponentsForTask`, `selectRecipeForTask`, `AIComponentMetadata` (type) |
| `src/app/components/chameleon/ai-helpers.tsx` | `validateComponentProps`, `getComponentExample`, `discoverComponents` |

These are exported through the `composites.tsx`/`molecules.tsx` re-export chain via the package barrel. To use them as an agent at runtime:

```ts
import {
  CHAMELEON_AI_MANIFEST,
  selectComponentsForTask,
  selectRecipeForTask,
} from "@chameleon-ui-lib/react";        // re-exported via barrel
```

(They are also imported directly from the source path if you're working inside the repo.)

## `AIComponentMetadata` shape

```ts
interface AIComponentMetadata {
  id: string;                // lowercase identifier (e.g. "button")
  name: string;              // PascalCase component name
  category: "atom" | "molecule" | "organism" | "template";
  complexity: number;        // 0–10 — higher = more props, more composition
  description: string;
  importPath: string;        // relative path within the library

  props: Record<string, {
    type: string;            // TypeScript type string
    required: boolean;
    default?: string;
    description: string;
    options?: string[];      // for union types — enables value validation
  }>;

  exampleMinimal: string;    // single-line usage
  exampleFull: string;       // realistic example
  useCases: string[];
  relatedComponents: string[];
  themeCompatibility: string[];
  a11y: string;
  keywords: string[];        // for `selectComponentsForTask`
}
```

## Querying the manifest

### Find components for a task

```ts
const matches = selectComponentsForTask("login form", 5);
// returns AIComponentMetadata[] where complexity <= 5
// and at least one keyword overlaps with "login" or "form"
// sorted ascending by complexity
```

The matcher does substring overlap on lowercased keywords — both directions (`keyword.includes(k) || k.includes(keyword)`). Pass `maxComplexity` to constrain by tier (atoms ≤ 2, molecules 2–5, organisms 5–8, templates 7+).

### Find a pre-built recipe

```ts
const code = selectRecipeForTask("show pricing tiers");
// returns string code or null
```

Hardcoded keyword routing:

| Keyword(s) | Recipe |
|------------|--------|
| `dashboard`, `stats`, `metrics` | `dashboard-header` |
| `form`, `input`, `submit` | `form-with-validation` |
| `pricing`, `plan`, `subscription` | `pricing-grid` |
| `tab`, `section`, `organize` | `tabbed-content` |
| `alert`, `notification`, `message` | `alert-stack` |
| `search` | `search-with-results` |

Returns `null` if nothing matches.

## Validating generated code

```ts
import { validateComponentProps } from "@chameleon-ui-lib/react";

const error = validateComponentProps("button", {
  variant: "tertiary",       // not in options
  size: "lg",
});
// => "❌ Invalid value \"tertiary\" for prop \"variant\"\n\nValid options: primary, secondary, outline, ghost\n\nExample: <Button variant=\"primary\" size=\"lg\" animated>...</Button>"

if (error) console.warn(error);
```

What it checks:
1. Component ID is in the manifest (suggests alternatives if not).
2. All required props are present.
3. No unknown props (excluding `className`, `style`, `children`).
4. Union-typed prop values are in the declared `options` list.

What it doesn't check:
- Render-time errors (it doesn't render the component).
- Composites and auth components (they're not in the manifest).
- Type compatibility for callback signatures.

## Programmatic discovery

```ts
import { discoverComponents } from "@chameleon-ui-lib/react";

const result = discoverComponents("Build an analytics dashboard");
// {
//   components: AIComponentMetadata[],   // matched components
//   recipe: string | null,               // recipe code if a hit
//   suggestions: string[],               // human-readable tips
// }
```

Suggestions are keyword-routed strings — e.g. "form" → "Wrap in Card for visual grouping". Useful for chat-style prompts where the agent narrates its plan.

## Pulling examples

```ts
import { getComponentExample } from "@chameleon-ui-lib/react";

getComponentExample("statcard", "minimal"); // => "<StatCard label=\"Users\" value=\"1.2K\" />"
getComponentExample("statcard", "full");    // => longer realistic example
```

## Prompt templates

`AI_PROMPT_TEMPLATES` is a flat record of guidance strings keyed by task category:

```ts
AI_PROMPT_TEMPLATES.general    // baseline rules for all Chameleon UI work
AI_PROMPT_TEMPLATES.buttons    // button-specific advice
AI_PROMPT_TEMPLATES.forms      // form-specific advice
AI_PROMPT_TEMPLATES.dashboards // dashboard-specific advice
AI_PROMPT_TEMPLATES.layouts    // template/layout advice
```

Use these as prefixes for sub-prompts when chaining LLM calls. Example:

```
SYSTEM: You are generating React code with Chameleon UI.
{AI_PROMPT_TEMPLATES.general}
{AI_PROMPT_TEMPLATES.forms}

USER: Create a contact form with email and message fields.
```

## CHAMELEON_AI_SUMMARY

```ts
{
  version: "1.0.0",
  totalComponents: number,
  categories: { atoms, molecules, organisms, templates },
  themes: ["material", "simple", "minimalist", "glassy", "liquid"],
  importPaths: { atoms, molecules, templates, context, utils },
  keyFeatures: string[],
}
```

Useful as a single object to dump into a tool-use response when an agent needs an at-a-glance reference.

## Recommended agent workflow

For a new "build me a UI" request:

1. Call `discoverComponents(userRequest)`. Take the `recipe` if non-null.
2. If no recipe matches, walk the `components` list and pick the lowest-complexity items that cover the requirement.
3. Generate code using `exampleFull` as a starting template — replace placeholders with task-specific values.
4. For each component used, call `validateComponentProps(id, props)`. If any return non-null, fix the prop value and retry.
5. Wrap the output in `<ChameleonProvider>` if not already wrapped — components throw without it.
6. Default to `animated` on interactive components (matches the library's intended feel).
7. For colors, use CSS variables (`var(--primary)`, etc.) — never hex.

## Validating end-to-end (integration check)

The `ai-helpers.tsx` file also exports React UI for an in-app docs page (`ai-docs-page.tsx`) where users can browse the manifest visually. That page is part of the demo app, not the library — but it's a useful reference for understanding what's in the manifest.

## Limitations

- The manifest is hand-curated, not auto-generated from source. Keep `04-components-catalog.md` in sync when adding new entries.
- `validateComponentProps` is shallow — it does not type-check function callbacks or runtime React.ReactNode shapes.
- Recipes are static strings — they don't accept parameters. Customize by string-replacing placeholder values.
- Composites (DataTable, ThemeChart, KanbanBoard, etc.) are **not** in the manifest. Use `04-components-catalog.md` for their prop signatures.
