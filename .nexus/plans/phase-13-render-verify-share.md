# Phase 13 — Agents Can See Their Work (v1.4.0)

**Features:** F66, F67, F68, F69 · **Roadmap:** `NEXUS_ROADMAP_v2.0.md`
**Core insight:** one `/render` route serves preview tooling, playground links, visual CI,
and (Phase 14) the MCP Apps widget template.

## Build order

### F66 — `/render?spec=` route
Workshop app route that decodes an lz-string-compressed ChameleonSpec from the query,
validates it, and mounts `renderSpec`. Bare chrome (no sidebar/header) — it's a canvas.
Query params: `spec`, `theme`, `mode`, `brand`. Invalid specs render the structured
validation errors (useful to agents screenshotting failures).

### F67 — `preview(spec)` MCP tool
- Engine: `preview.ts` spins the workshop dev server (or hits a running one), drives
  headless Playwright to `/render`, captures screenshots across requested theme/mode combos.
- Returns: images + axe-core violations + contrast report per variant.
- **Graceful degradation:** no Playwright available → skip screenshots, still return
  axe-less contrast-math audit computed from tokens; tool result says which level ran.
- CLI twin: `chameleon preview <spec-file> [--themes all] [--json]`.

### F68 — `/play?spec=` playground links
`/play` wraps `/render` with chrome: theme/mode switcher, brand toggle, "copy spec",
"copy CLI command" (`chameleon compose spec.json`), "open in /render". MCP tools return a
playground URL alongside scaffold results so agents can hand humans a preview *before*
files are written. lz-string keeps specs within URL limits; no backend.

### F69 — Visual regression CI (stretch, P2)
GitHub Actions job: screenshot matrix (all components × 5 themes × 2 modes) via the same
`/render` route, diff against committed baselines (`playwright test --update-snapshots`
workflow). Would have caught the Glassy light-mode regressions (F18) before release.
Start with atoms + top-10 composites to keep CI time sane.

## File plan
```
src/app/pages/render.tsx        F66 (bare canvas)
src/app/pages/play.tsx          F68 (canvas + chrome)
lib-src/engine/preview.ts       F67
packages/mcp/src/tools/preview.ts
tests/visual/                   F69 baselines + config
.github/workflows/visual.yml    F69
```

## Success criteria
1. Agent generates a spec → calls `preview` → receives screenshot + audit → fixes a
   deliberate contrast violation → re-preview passes. (The self-correction loop, demoed.)
2. Playground link from an MCP result opens on chameleon.glenhalton.com and matches what
   scaffolding later produces.
3. Degraded mode works on a machine with no browsers installed.
4. F69: a deliberate style regression on Button fails CI with a visible diff.
