# Phase 16 — Sentence → Application (v2.0.0)

**Features:** F74, F75, F76 · **Roadmap:** `NEXUS_ROADMAP_v2.0.md`
**Principle:** 2.0 adds a schema over shipped subsystems — no new machinery, no AI.
Every prior flagship becomes a subsystem: brand (12), specs/recipes (11), preview (13),
playground (13), chat rendering (14), registry (15).

## Build order

### F74 — AppSpec v2
```jsonc
{
  "version": 2,
  "app": { "name": "...", "brand": { /* F62 tokens or from-url ref */ } },
  "shell": { "nav": "sidebar" | "topbar" | "both", "theme": "...", "mode": "..." },
  "pages": [ { "route": "/", "title": "...", "spec": { /* ChameleonSpec v1 page */ } } ],
  "dataSlots": [ { "id": "customers", "shape": "table", "mock": true } ]
}
```
- v1 page specs embed unchanged — v2 is composition, not replacement.
- `validateAppSpec`: route collisions, nav/page consistency, per-page spec validation,
  dataSlot references resolved.
- `dataSlots` v2.0 scope: **mock data + typed props only** (backend integration stays out
  of scope per vision doc). A slot generates typed mock data and a clearly-marked seam
  (`// CHAMELEON-DATA: replace with your fetch`) — agents wire real data themselves.

### F75 — `scaffold_app` + `chameleon new`
- Engine `app.ts`: emit a runnable Vite + React + TS + Tailwind app — router wired from
  `pages[]`, nav generated from shell + page titles, brand CSS applied, every page via
  `scaffoldSpec`, `chameleon.config.json` + agent rulesets (F64) included, `tsc`/lint/test
  green out of the box.
- CLI: `chameleon new <dir> --app-spec app.json` (or interactive).
- MCP: `scaffold_app(appSpec)`; `preview` (F67) accepts app specs (screenshots per page);
  playground (F68) gains a page switcher for app specs.

### F76 — Breaking cleanups + migration
- Remove `customBrandColor` (superseded by brand tokens — deprecated since v1.3.0).
- Split legacy `chameleon/composites.tsx` monolith into per-composite files everywhere.
- Engine becomes the only public programmatic contract; internal CLI helpers unexported.
- Evaluate dropping CJS build (decide on download/usage data at the time).
- `docs/MIGRATION_v2.md` + codemod for the `customBrandColor` → `brand` prop change.
- Spec v1 documents remain valid (embedded in v2); no spec breakage.

## Risks
- **Scope feast** — anything not expressible as "schema over existing subsystems" is out.
  New component requests during Phase 16 go to the backlog, not the release.
- Router choice (react-router vs tanstack) — pick one, document; don't abstract over both.
- `dataSlots` ambition — mock-only line is explicit in docs to manage expectations.

## Success criteria (the 2.0 Definition of Done, from the roadmap)
*"Build me a CRM for my bakery — brand from bakery-site.com"* executed by an agent with
only Chameleon MCP tools: brand extracted + AA-verified → app spec composed from recipes →
previewed + playground link → `chameleon new` output builds and passes
`npx tsc --noEmit && yarn test && yarn lint` → one page rendered live in a chat host —
zero manual file edits.
