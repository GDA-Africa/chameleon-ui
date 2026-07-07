# Migrating to Chameleon UI v2.0

v2.0 is the **agent SDK release**: ChameleonSpec (page + app), MCP server, brand
pipeline, preview/playground, registry, and `chameleon new`. It is almost fully
additive — existing v1.x component code keeps working.

## Breaking / deprecation summary

| Change | Action |
|---|---|
| `customBrandColor` / `setCustomBrandColor` **deprecated** | Use `<ChameleonProvider brand={{ primaryColor, secondaryColor?, accentColor?, fontFamily?, radius? }}>` (persist with `chameleon brand init`). The old API still works in v2 and is removed in v3. |
| CLI import hints for `datepicker` | Now correctly `DatePicker` (was `Datepicker`). If you scripted around the old hint, update it. |
| `--json` envelope | Unchanged and stable (`docs/CLI_JSON.md`); new fields were added (additive). |

## New surfaces (no migration needed — adopt as you like)

- **ChameleonSpec v1** — declarative pages: `chameleon compose <spec|recipe>`,
  `validateSpec`/`scaffoldSpec`/`RenderSpec` exports.
- **AppSpec v2** — whole applications: `chameleon new <dir> --app-spec app.json`.
  Embeds v1 page specs unchanged. `dataSlots` are mock-only by design — replace
  the `// CHAMELEON-DATA` seams with your data layer.
- **MCP server** — `chameleon mcp` (or `claude mcp add chameleon -- npx -y -p
  @chameleon-ui-lib/react chameleon mcp`); 20+ tools.
- **Brand pipeline** — `chameleon brand init/check/from-url/from-logo`;
  `ChameleonBrand` provider prop.
- **Preview & playground** — `chameleon preview`, `/render` + `/play` routes.
- **Registry** — `chameleon add @chameleon/<name>`; source items require `--yes`
  after review; integrity-checked.
- **MCP Apps widget** (experimental) — `npm run build:widget` +
  `CHAMELEON_MCP_APPS=1` (SEP-1865 finalizes 2026-07-28).

## Deferred to v3

Removal of `customBrandColor`, splitting the legacy `composites.tsx` monolith,
and dropping the CJS build (pending usage data). Tracked in the roadmap.
