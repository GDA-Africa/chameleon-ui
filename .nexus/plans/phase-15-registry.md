# Phase 15 — The Catalog Becomes an Ecosystem (v1.6.0)

**Features:** F72, F73 · **Roadmap:** `NEXUS_ROADMAP_v2.0.md`
**Model:** shadcn's registry, with a trust split made possible by ChameleonSpec.

## Build order

### F72 — Registry format + first-party registry
- `registry.json` index schema: items with `name`, `type` (`spec` | `source`), `version`,
  `description`, `keywords`, `chameleonVersion` range, payload URL, integrity hash.
- **Spec items** — ChameleonSpec documents (recipes, pages): validated against the schema,
  safe by construction.
- **Source items** — raw component files: carry hashes, require the F73 trust flow.
- First-party registry hosted from a public GitHub repo (`chameleon-registry`) + served via
  chameleon.glenhalton.com/registry.json. Community contributions via PR review — no
  open submission endpoint (no backend, no moderation problem on day one).
- Seed content: the ~10 built-in recipes republished as registry items + 5 new
  community-style examples.

### F73 — `chameleon add` remote items
- `chameleon add @chameleon/hero-parallax` (namespaced) or `chameleon add <url>`.
- Spec items: fetch → `validateSpec` → `scaffoldSpec` (or install as a named recipe).
- Source items: fetch → integrity check → **diff preview + explicit confirm** before any
  write (`--yes` for agents that already showed the user). Record provenance in
  `chameleon.config.json` so `chameleon update`/`diff` work for remote items too.
- MCP tools: `search_registry(query)`, `add_registry_item(name)` (source items surface the
  confirmation requirement to the host).

## Risks
- Supply-chain: integrity hashes mandatory; source items never auto-install; registry index
  fetched over HTTPS only.
- Version skew: items declare `chameleonVersion` ranges; `doctor` warns on mismatch.
- Ecosystem cold start: seed well, make item authoring a documented 10-minute flow
  (`chameleon registry package <spec-file>` helper).

## Success criteria
1. `chameleon add @chameleon/hero-parallax` in a fresh project installs a working, themed
   section; `chameleon update` refreshes it.
2. A tampered payload (bad hash) is refused with a clear error.
3. An agent via MCP finds a registry recipe by keyword and scaffolds it end-to-end.
