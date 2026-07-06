# NEXUS Roadmap — v1.2.0 → v2.0.0: The Agent SDK Arc

**Status:** Approved 2026-07-05
**Master doc** — supersedes `NEXUS_PLAN_v1.2.0.md` (kept as Phase 11 detail reference).
**Phase plans:** `.nexus/plans/phase-11-agent-callable.md` … `phase-16-app-spec.md`

---

## 🎯 The Arc

Chameleon UI becomes the **surface AI agents touch to build UIs** — the way an Agent SDK
tool dispatches "create a note", an agent should dispatch "create a login form" (and by
2.0, "build me the app"). Chameleon never becomes an AI: agents supply natural-language
understanding, Chameleon supplies callable tools, a validated spec language, verification,
brand correctness, and live rendering.

**Keystone:** the **ChameleonSpec** — a declarative, manifest-validated JSON description of
a page (v1) and application (v2). Every flagship below is either a producer or consumer of
specs: recipes are stored specs, previews render specs, playground links encode specs,
registry items are specs, chat widgets receive specs, apps are trees of specs.

## 🗺️ Version Ladder

| Version | Phase | Flagship | Features | Plan |
|---|---|---|---|---|
| v1.2.0 | 11 | **Agents can call Chameleon** | F58–F61, F64 | `phase-11-agent-callable.md` |
| v1.3.0 | 12 | **Any brand, guaranteed legible** | F62, F63, F65 | `phase-12-brand.md` |
| v1.4.0 | 13 | **Agents can see their work** | F66–F69 | `phase-13-render-verify-share.md` |
| v1.5.0 | 14 | **Chameleon lives in the chat** | F70, F71 | `phase-14-mcp-apps.md` |
| v1.6.0 | 15 | **The catalog becomes an ecosystem** | F72, F73 | `phase-15-registry.md` |
| v2.0.0 | 16 | **Sentence → application** | F74–F76 | `phase-16-app-spec.md` |

## 📋 Feature Register (F58–F76)

| # | Feature | Phase | Priority |
|---|---|---|---|
| F58 | `--json` output mode for CLI | 11 | P0 |
| F59 | Shared engine extraction (`lib-src/engine/`) | 11 | P0 |
| F60 | `@chameleon-ui-lib/mcp` MCP server | 11 | P0 |
| F61 | ChameleonSpec v1 + recipes-as-specs + `renderSpec`/`scaffoldSpec` | 11 | P0 |
| F64 | `chameleon agents init` — consumer agent rulesets | 11 | P1 |
| F62 | `chameleon brand` token pipeline (init/check, WCAG AA) | 12 | P0 |
| F63 | MCP brand tools + agent docs refresh | 12 | P1 |
| F65 | Brand extraction — `brand from-url` / `from-logo` (candidates, not oracle) | 12 | P1 |
| F66 | `/render?spec=` route in workshop app | 13 | P0 |
| F67 | `preview(spec)` MCP tool — screenshot + axe + contrast audit | 13 | P0 |
| F68 | `/play?spec=` shareable playground links (lz-string) | 13 | P1 |
| F69 | Visual regression CI — component × theme × mode screenshot matrix | 13 | P2 |
| F70 | MCP Apps spike — `renderSpec` in a SEP-1865 widget template | 14 | P0 |
| F71 | `@chameleon-ui-lib/apps` package + `actions` field in spec | 14 | P0 |
| F72 | Registry format + first-party hosted registry | 15 | P1 |
| F73 | `chameleon add` remote items (spec items validated; source items gated) | 15 | P1 |
| F74 | AppSpec v2 — pages, routes, nav, appShell, dataSlots | 16 | P0 |
| F75 | `scaffold_app` MCP tool + `chameleon new` command | 16 | P0 |
| F76 | v2.0 breaking cleanups + migration guide | 16 | P0 |

## 🧱 Standing Design Decisions

1. **One engine, many skins.** CLI, MCP server, and any future interface consume
   `lib-src/engine/` — scaffold/catalog logic is never forked.
2. **Spec before code.** Agents emit specs; Chameleon validates against the manifest before
   any file is written or any pixel rendered. Validation errors are structured and
   agent-actionable.
3. **Recipes are data.** Stored specs in the manifest — crawlable (`llms.txt`), versioned
   with the library, servable by tools.
4. **Brand is a token layer, not a 6th theme.** Brands compose with the 5 design languages.
5. **Extraction suggests, humans/agents confirm.** `from-url`/`from-logo` return candidates.
6. **The `/render` route is shared infrastructure** for preview (F67), playground (F68),
   visual-regression CI (F69), and the MCP Apps template (F70/71).
7. **Registry trust model:** spec items are safe by construction (schema-validated);
   source items require diff preview + explicit confirmation.
8. **2.0 breaking changes are earned, not accumulated:** spec v1→v2, engine as the only
   public contract, `customBrandColor` → brand tokens, legacy `composites.tsx` split.

## ⚠️ Cross-Phase Risks

- **Manifest drift** — CI check (Phase 11): every exported component must have a manifest
  entry; build fails otherwise.
- **Spec expressiveness creep** — v1 stays flat (template + composite slots + props). No
  arbitrary nesting, no raw JSX. Pressure for more is signal for v2 design, not v1 patches.
- **MCP Apps timing** — SEP-1865 finalizes 2026-07-28; Phase 14 spike should happen near
  Phase 12/13 if the window matters. Re-check host support before starting.
- **Headless flakiness** — F67 degrades gracefully: full visual when Playwright available,
  axe + contrast math otherwise.
- **Scope feast at 2.0** — Phase 16 adds a schema over shipped subsystems, not new
  machinery. If a lower rung slips, 2.0 slips.

## ✅ 2.0 Definition of Done

In a clean environment, an agent with the Chameleon MCP server can execute:
*"Build me a CRM for my bakery — brand from bakery-site.com"* →
brand extracted and AA-verified (F65/F62) → app spec composed from recipes (F74/F61) →
validated, previewed, playground link delivered (F67/F68) → app scaffolded with routing +
nav, `tsc`/lint/test green (F75) → dashboard page renders live in a chat host (F71) —
**zero manual file edits**.
