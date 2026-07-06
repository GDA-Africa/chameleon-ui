> **⚠️ SUPERSEDED (2026-07-05):** master roadmap is now `NEXUS_ROADMAP_v2.0.md` (Phases 11–16 → v2.0.0).
> Phase 11 execution follows `.nexus/plans/phase-11-agent-callable.md`, which revises F61
> (recipes → ChameleonSpec v1) and adds F64 (`chameleon agents init`). This doc kept as
> detail reference for F58–F60 and the Phase 12 brand pipeline.

# NEXUS Plan — Agent SDK Vision: MCP Server + Brand Pipeline

**Target releases:** v1.2.0 (Phase 11 — MCP Server) · v1.3.0 (Phase 12 — Brand Pipeline)
**Status:** Planned
**Created:** 2026-07-05
**Owner features:** F58–F63

---

## 🎯 Vision

Make Chameleon UI the **tool surface AI agents call to build UIs**. An agent should handle
"create a login form" the way it handles "create a note in Notes": resolve intent → call a
tool → files appear, themed and brand-correct.

Chameleon does NOT need to become an AI. The agent (Claude, Copilot, Cursor) supplies the
natural-language understanding; Chameleon supplies a **machine-callable interface** over what
already exists:

| Vision requirement | Existing asset | Gap |
|---|---|---|
| Resolve "login form" → component | `ai-manifest.ts` (keywords, props, complexity) | Not callable — agent must read source |
| Dispatch generation | CLI: `add`, `template`, `list`, `info`, `doctor` | Human-facing output; no JSON, no MCP |
| Compose blocks when no template fits | 26 composites + registry + `styleConfig` | No composition recipes; no `compose` tool |
| Brand customization | `customBrandColor` + `generateVariations` (context.tsx), F34 | Color-only; no fonts/radius/density; no CLI/persisted token file |

**Strategy: two phases.** Phase 11 makes Chameleon agent-callable (MCP). Phase 12 makes
output brand-correct (token pipeline). MCP first — it's the unlock; brand rides on it.

---

## 📦 Phase 11 — MCP Server (v1.2.0)

### F58 — `--json` output mode for CLI

Every read command (`list`, `info`, `themes`, `doctor`, `diff`, `config`) accepts `--json`
and prints a stable, versioned JSON envelope to stdout (no ANSI, no spinners). Write
commands (`add`, `template`, `remove`, `update`, `theme`) return
`{ ok, filesWritten[], warnings[], nextSteps[] }`. This is the machine interface foundation —
useful on its own for scripting, required by F60.

### F59 — Extract shared engine from CLI

Refactor `bin/chameleon.js` internals into `lib-src/engine/` (mirrored like other lib
sources): `catalog.ts` (manifest queries: search by keyword, get info, list),
`scaffold.ts` (FS operations: add/remove/update/template), `health.ts` (doctor/diff logic).
CLI and MCP server both call the engine — one code path, no drift. CLI behavior unchanged
(existing commands are thin wrappers).

### F60 — `@chameleon-ui-lib/mcp` server

New package `packages/mcp` using `@modelcontextprotocol/sdk`, stdio transport, launched via
`npx @chameleon-ui-lib/mcp` (and `chameleon mcp` alias). Tools, all backed by the F59 engine:

| Tool | Wraps | Purpose |
|---|---|---|
| `search_components(query)` | catalog keyword search | "login form" → LoginCard, auth-flow, ranked by keyword match + complexity |
| `get_component_info(name)` | `info --json` | Prop schema, deps, usage example |
| `list_catalog(kind?)` | `list --json` | Atoms/molecules/composites/templates |
| `scaffold_component(name, path?)` | `add` | Writes component into host project |
| `scaffold_template(name, path?)` | `template` | Writes full page |
| `get_recipe(pattern)` | F61 recipes | Copy-paste composition for named patterns |
| `set_theme(name)` / `list_themes()` | `theme` / `themes` | Theme control |
| `validate_project()` | `doctor --json` | Post-generation check the agent can self-run |

Server README documents registration for Claude Code (`claude mcp add`), Cursor, and
generic MCP clients.

### F61 — Composition recipes in the AI manifest

The "no template? build from blocks" path is only as reliable as its recipes. Add a
`recipes` section to `ai-manifest.ts`: named patterns (`login-form`, `pricing-page`,
`settings-panel`, `dashboard-shell`, `signup-with-2fa`, ~10 to start), each listing the
composites/molecules used, wiring code, and required props. `get_recipe` serves these;
`search_components` falls back to recipe matches when no single component fits.

### Phase 11 success criteria

1. In a fresh Vite app with the MCP server registered, prompting Claude Code
   "add a login form using chameleon" produces a working, themed LoginCard **with zero
   manual file edits** — resolved via `search_components` → `scaffold_component` →
   `validate_project`.
2. A prompt with no matching template ("build me a team-members settings page") succeeds
   via `get_recipe`/`compose` path.
3. `verify:consumer` extended to smoke-test the MCP server (spawn, call `list_catalog`,
   assert schema).
4. All existing CLI behavior unchanged; `npx tsc --noEmit && yarn test && yarn lint` green.

---

## 🎨 Phase 12 — Brand Pipeline (v1.3.0)

### F62 — `chameleon brand` command + brand token file

Extend the existing `customBrandColor`/`generateVariations` system from a runtime-only,
color-only feature to a persisted, full-token pipeline:

- `chameleon brand init` — interactive: primary/secondary/accent colors, font family,
  radius scale, density. Writes `brand.config.json` + generates `chameleon-brand.css`
  (CSS custom properties layered over theme tokens).
- `chameleon brand check` — WCAG AA contrast audit of generated tokens against all
  5 themes × 2 modes (reuses the library's contrast guarantee logic).
- `ChameleonProvider` accepts `brand` prop (or auto-loads from config) — supersedes and
  wraps `customBrandColor` (kept, deprecated).
- Brand tokens flow through all themes: Material/Glassy/etc. keep their physics and
  surfaces but adopt brand hue, type, and radius.

### F63 — MCP brand tools + agent docs refresh

- MCP tools: `set_brand(tokens)`, `get_brand()`, `check_brand_contrast()`.
- Update `AI_INTEGRATION_GUIDE.md`, `public/llms.txt`, `public/context.md` with MCP
  registration + brand workflow so crawling agents discover the new surface.

### Phase 12 success criteria

1. Agent prompt "make it match my brand — primary #FF6B35, font Sora, rounded" results in
   a persisted brand file + all scaffolded components rendering with the brand, contrast
   AA verified.
2. Brand applies across all 10 theme/mode variants without per-component edits.

---

## 🧱 Design decisions

1. **MCP over bespoke agent API** — MCP is the emerging standard all major coding agents
   speak; zero client-side work for consumers.
2. **Engine extraction before MCP** — avoids forked logic between CLI and server; CLI
   becomes the human skin, MCP the machine skin, over one engine.
3. **Recipes live in the manifest, not the server** — data, not code; crawlable via
   `llms.txt`, versioned with the library.
4. **Brand = token layer, not theme #6** — brands compose with the 5 design languages
   rather than replacing them; preserves the core multi-theme promise.
5. **stdio transport first** — HTTP/SSE deferred until a hosted use case exists.

## ⚠️ Risks

- **Manifest drift** — manifest is hand-maintained; add a CI check that every exported
  component has a manifest entry (fail build otherwise).
- **MCP SDK churn** — pin `@modelcontextprotocol/sdk`, wrap it in one adapter file.
- **Dark-mode brand contrast** — `generateVariations` already branches light/dark; extend
  tests to cover brand hues near the contrast boundary.

## 🗂️ File plan (Phase 11)

```
packages/mcp/
├─ package.json            @chameleon-ui-lib/mcp
├─ src/server.ts           MCP server, tool registration
├─ src/tools/*.ts          one file per tool, thin over engine
├─ README.md               client registration guide
lib-src/engine/
├─ catalog.ts  scaffold.ts  health.ts  index.ts
bin/chameleon.js           refactor to call engine; add --json + `mcp` alias
src/app/components/chameleon/ai-manifest.ts   + recipes section
scripts/verify-consumer.mjs                   + MCP smoke test
```

---

*Plan follows NEXUS conventions — update `.nexus/docs/index.md` after each phase task;
append discoveries to `.nexus/docs/knowledge.md`.*
