# Phase 14 — Chameleon Lives in the Chat (v1.5.0)

**Features:** F70, F71 · **Roadmap:** `NEXUS_ROADMAP_v2.0.md`
**Context:** MCP Apps (SEP-1865) — first official MCP extension, finalized 2026-07-28.
Servers ship HTML templates rendered in sandboxed iframes; widget ↔ host over JSON-RPC/
postMessage; UI-initiated actions go through the normal tool-consent path. Hosts shipped:
ChatGPT, Claude, Goose, VS Code.

**Timing note:** the spike (F70) may be pulled forward to run alongside Phase 12/13 —
early libraries win tutorial mindshare. Re-verify host support + spec status before
starting (spec was RC at planning time).

## Build order

### F70 — Spike (timebox: 1 week)
Wrap `renderSpec` in a SEP-1865 widget template: one self-contained HTML file (compiled
React + registry + theme CSS) declared as a tool UI resource by the Chameleon MCP server.
Tool result carries a ChameleonSpec as structured content; widget renders it.
Demo: themed StatCard + DataTable live inside Claude and ChatGPT. Publish demo (site +
README + short video). **Exit criteria:** render works in ≥2 hosts; bundle size measured;
host theming signals (dark/light) received and applied. Decision: proceed to F71 or park.

### F71 — `@chameleon-ui-lib/apps`
- `packages/apps` — builds `chameleon-widget.html`: the one audited, prefetchable template
  through which all Chameleon UI renders. Strict budget: track gzipped size; target the
  library's <150KB discipline.
- Spec addition: `actions` field — `{ onClick: { tool, args } }` per block; widget forwards
  events over the bridge so "retry payment" in a card dispatches a real tool call (with
  host consent flow).
- Host adaptation: read host theme/mode via bridge, map to Chameleon mode; respect
  container sizing; no localStorage assumptions.
- MCP server: tools opt into UI via template declaration (`get_recipe`, `compose_from_blocks`,
  `preview` results become renderable inline).
- Docs: "Build an MCP App with Chameleon" guide — aimed at MCP app builders (new audience),
  not React devs.

## Risks
- Spec/host churn right after finalization — pin versions, one bridge adapter file.
- Bundle bloat from shipping the full registry — code-split per-component chunks inside
  the template if needed, or a curated "chat-safe" subset first.
- Sandbox CSP variance across hosts — test matrix: Claude, ChatGPT, VS Code, Goose.

## Success criteria
1. A Chameleon MCP tool result renders a live, themed, brand-aware widget inline in two
   hosts, adapting to host dark/light automatically.
2. An `actions`-wired button in the widget triggers a follow-up tool call through the
   host consent flow.
3. Widget template passes a security review checklist (no external fetches except declared,
   no storage, deterministic build).
