# Phase 12 — Any Brand, Guaranteed Legible (v1.3.0)

**Features:** F62, F63, F65 · **Roadmap:** `NEXUS_ROADMAP_v2.0.md`
**Builds on:** existing `customBrandColor` + `generateVariations` in `context.tsx` (F34)

## Build order

### F62 — Brand token pipeline
- `chameleon brand init` — interactive (or flag-driven for agents): primary/secondary/accent
  colors, font family, radius scale, density. Writes `brand.config.json` + generates
  `chameleon-brand.css` (CSS custom properties layered over theme tokens).
- `chameleon brand check` — WCAG AA contrast audit of generated tokens across all
  5 themes × 2 modes; reuses library contrast logic; `--json` support from day one.
- `ChameleonProvider` accepts `brand` prop (auto-loads from config when present).
  `customBrandColor` kept, deprecated — removal is a v2.0 breaking change (F76).
- Brand tokens flow through all themes: Material/Glassy/etc. keep physics and surfaces,
  adopt brand hue, type, radius. Extend `generateVariations` for secondary/accent + fonts.
- Tests: brand hues near contrast boundaries, light/dark branches.

### F65 — Brand extraction (suggestions, not oracle)
- `chameleon brand from-url <site>` — fetch page, read CSS custom properties + computed
  styles: dominant colors, font stacks, radius sampling.
- `chameleon brand from-logo <img>` — color quantization → candidate palette.
- Both return **candidates with provenance** (`#635BFF — buttons, 41 occurrences`), agent
  or human confirms; confirmed set feeds `brand init`. Never auto-applies.
- `brand check` is the safety net for extracted colors.

### F63 — MCP brand tools + agent docs refresh
- MCP tools: `set_brand(tokens)`, `get_brand()`, `check_brand_contrast()`,
  `extract_brand(url_or_image)` (returns candidates).
- Update `AI_INTEGRATION_GUIDE.md`, `public/llms.txt`, `public/context.md` with MCP
  registration + brand workflow + spec format docs.

## File plan
```
lib-src/engine/brand/
├─ tokens.ts        brand.config.json schema + CSS generation
├─ contrast.ts      WCAG audit across theme×mode matrix
├─ extract.ts       from-url / from-logo heuristics
bin/chameleon.js    + `brand` subcommands
packages/mcp/src/tools/brand.ts
```

## Success criteria
1. Agent prompt "match my brand — primary #FF6B35, font Sora, rounded" → persisted brand
   file, all scaffolded components branded, AA verified, across all 10 theme/mode variants,
   no per-component edits.
2. `brand from-url stripe.com` returns plausible ranked candidates; confirming them
   produces a passing `brand check`.
3. Spec `brand` field (F61) round-trips through `renderSpec`/`scaffoldSpec`.
