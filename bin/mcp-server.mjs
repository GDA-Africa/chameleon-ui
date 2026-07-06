#!/usr/bin/env node

/**
 * Chameleon MCP Server (F60) — Model Context Protocol server over the
 * Chameleon Engine (bin/engine/). Zero runtime dependencies: a minimal
 * JSON-RPC 2.0 / stdio implementation of the MCP surface agents need
 * (initialize, tools/list, tools/call, ping).
 *
 * Launch:  chameleon mcp        (or: node bin/mcp-server.mjs)
 * Register with Claude Code:
 *   claude mcp add chameleon -- npx -y -p @chameleon-ui-lib/react chameleon mcp
 *
 * CRITICAL: stdout carries JSON-RPC only. Engine functions never print —
 * anything else must go to stderr. (See knowledge.md, F59 pattern.)
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import readline from "node:readline";
import { fileURLToPath } from "node:url";
import {
  createContext, listCatalog, getInfo, listThemes, searchCatalog,
  addComponents, scaffoldTemplate, setTheme, initProject,
  doctor, validateSpec, scaffoldSpec, listRecipes, getRecipe, searchRecipes,
  brandInit, brandCheck, readBrand, brandFromUrl, brandFromLogo,
  previewSpec, specUrl,
  searchRemoteRegistry, addRegistryItem,
} from "./engine/index.mjs";

const __dirname = path.dirname(fs.realpathSync(fileURLToPath(import.meta.url)));
const LIB_ROOT  = path.resolve(__dirname, "..");
const VERSION   = JSON.parse(fs.readFileSync(path.join(LIB_ROOT, "package.json"), "utf8")).version || "0.0.0";
const PROTOCOL  = "2025-06-18";

const ctx = () => createContext({ cwd: process.cwd(), libRoot: LIB_ROOT });

// ── MCP Apps (SEP-1865) — EXPERIMENTAL, gated until the spec finalizes ───────
// Enable with CHAMELEON_MCP_APPS=1 after `npm run build:widget`. One audited
// template (dist-widget/widget.html) renders any ChameleonSpec.
const WIDGET_URI  = "ui://chameleon/widget.html";
const WIDGET_PATH = path.join(LIB_ROOT, "dist-widget", "widget.html");
const APPS_ENABLED = process.env.CHAMELEON_MCP_APPS === "1" && fs.existsSync(WIDGET_PATH);
const uiMeta = () =>
  APPS_ENABLED
    ? { _meta: { "ui/template": WIDGET_URI, "openai/outputTemplate": WIDGET_URI } }
    : {};

// ── tool definitions ─────────────────────────────────────────────────────────
const str = (description) => ({ type: "string", description });

const TOOLS = [
  {
    name: "search_components",
    description: "Search the Chameleon UI catalog (components, templates, recipes) by keywords, e.g. 'login form' or 'kpi dashboard'. Returns ranked matches. Use this first to resolve a UI request to a scaffoldable item.",
    inputSchema: { type: "object", properties: { query: str("Keywords describing the UI you need") }, required: ["query"] },
    handler: ({ query }) => {
      const items = searchCatalog(query).slice(0, 10);
      const recipes = searchRecipes(query).slice(0, 5);
      return { matches: items, recipes, hint: recipes.length ? "A recipe is a stored page spec — scaffold it with compose_from_blocks(get_recipe(...).spec) or the compose tool." : undefined };
    },
  },
  {
    name: "list_catalog",
    description: "List the full Chameleon UI catalog: 29 components (atoms/molecules/composites), 14 page templates, 5 themes.",
    inputSchema: { type: "object", properties: {} },
    handler: () => listCatalog(),
  },
  {
    name: "get_component_info",
    description: "Get details for one component or template: category, description, variants, dependencies, export name.",
    inputSchema: { type: "object", properties: { name: str("Component or template name, e.g. 'button' or 'auth-flow'") }, required: ["name"] },
    handler: ({ name }) => {
      const data = getInfo(name);
      if (!data) throw { code: "UNKNOWN_ITEM", message: `Unknown item: '${name}'. Use list_catalog or search_components.` };
      return data;
    },
  },
  {
    name: "scaffold_component",
    description: "Scaffold a component into the current project (requires chameleon.config.json — run init_project first if missing). Writes <dir>/<name>.tsx and refreshes the barrel index.",
    inputSchema: { type: "object", properties: { name: str("Component name from the catalog") }, required: ["name"] },
    handler: ({ name }) => run(addComponents(ctx(), [name])),
  },
  {
    name: "scaffold_template",
    description: "Scaffold a full-page template into the project's pages directory.",
    inputSchema: { type: "object", properties: { name: str("Template name, e.g. 'auth-flow'") }, required: ["name"] },
    handler: ({ name }) => run(scaffoldTemplate(ctx(), name)),
  },
  {
    name: "list_recipes",
    description: "List composition recipes — stored, validated ChameleonSpec page patterns (login-form, analytics-overview, team-members, ...).",
    inputSchema: { type: "object", properties: {} },
    handler: () => ({ recipes: listRecipes() }),
  },
  {
    name: "get_recipe",
    description: "Get a recipe's full ChameleonSpec. Pass the spec to compose_from_blocks (optionally after editing props) to scaffold it.",
    inputSchema: { type: "object", properties: { name: str("Recipe name from list_recipes") }, required: ["name"] },
    handler: ({ name }) => {
      const rcp = getRecipe(name);
      if (!rcp) throw { code: "UNKNOWN_RECIPE", message: `Unknown recipe: '${name}'.`, recipes: listRecipes().map((x) => x.name) };
      return rcp;
    },
  },
  {
    name: "validate_spec",
    description: "Validate a ChameleonSpec v1 without writing files. Returns pathed errors with suggestions — fix and re-validate before composing.",
    inputSchema: { type: "object", properties: { spec: { type: "object", description: "ChameleonSpec v1 object" } }, required: ["spec"] },
    handler: ({ spec }) => validateSpec(spec),
  },
  {
    name: "compose_from_blocks",
    description: "Scaffold a page from a ChameleonSpec v1: { version:1, name:'kebab-name', template:'...' OR blocks:[{component, props}], theme?, mode? }. Validates first; on success writes components + a composed page file.",
    inputSchema: { type: "object", properties: { spec: { type: "object", description: "ChameleonSpec v1 object" } }, required: ["spec"] },
    handler: ({ spec }) => run(scaffoldSpec(ctx(), spec)),
  },
  {
    name: "init_project",
    description: "Initialize Chameleon UI in the current project: writes chameleon.config.json, creates the components dir, wires Tailwind v4 into vite config.",
    inputSchema: { type: "object", properties: {} },
    handler: () => run(initProject(ctx(), { version: VERSION })),
  },
  {
    name: "set_theme",
    description: "Set the active theme in chameleon.config.json (material | simple | minimalist | glassy | liquid).",
    inputSchema: { type: "object", properties: { theme: str("Theme name") }, required: ["theme"] },
    handler: ({ theme }) => run(setTheme(ctx(), theme)),
  },
  {
    name: "list_themes",
    description: "List the 5 Chameleon design languages with descriptions.",
    inputSchema: { type: "object", properties: {} },
    handler: () => ({ themes: listThemes() }),
  },
  {
    name: "preview_spec",
    description: "Audit a ChameleonSpec before/after composing: validation, brand WCAG contrast, composition notes, and — when Playwright + a running dev server are available — screenshots per theme/mode with render-error detection. Always returns a shareable /play URL to hand to the user.",
    inputSchema: {
      type: "object",
      properties: {
        spec: { type: "object", description: "ChameleonSpec v1 object" },
        baseUrl: str("Render host for screenshots (default http://localhost:5173)"),
        themes: str("'current' (default), 'all', or a theme name"),
      },
      required: ["spec"],
    },
    handler: async ({ spec, baseUrl, themes }) =>
      run(await previewSpec(ctx(), spec, { baseUrl: baseUrl || "http://localhost:5173", themes: [themes || "current"] })),
  },
  {
    name: "get_playground_url",
    description: "Get a shareable chameleon.glenhalton.com/play URL that renders a ChameleonSpec live in the browser — hand this to the user so they can see the page BEFORE files are written.",
    inputSchema: { type: "object", properties: { spec: { type: "object", description: "ChameleonSpec v1 object" } }, required: ["spec"] },
    handler: ({ spec }) => ({ playUrl: specUrl(spec, {}), renderUrl: specUrl(spec, { page: "render" }) }),
  },
  {
    name: "set_brand",
    description: "Persist brand tokens (F62): writes brand.config.json + chameleon-brand.css and runs a WCAG AA contrast audit. Colors are hex. The consumer passes the config to <ChameleonProvider brand={...}>.",
    inputSchema: {
      type: "object",
      properties: {
        primaryColor: str("Primary brand color, e.g. #FF6B35"),
        secondaryColor: str("Optional secondary color"),
        accentColor: str("Optional accent color"),
        fontFamily: str("Optional font family name, e.g. Sora"),
        radius: str("Optional radius, e.g. 0.75rem"),
      },
      required: ["primaryColor"],
    },
    handler: (args) => run(brandInit(ctx(), args)),
  },
  {
    name: "get_brand",
    description: "Read the project's persisted brand tokens (brand.config.json), or null if none.",
    inputSchema: { type: "object", properties: {} },
    handler: () => ({ brand: readBrand(ctx()) }),
  },
  {
    name: "check_brand_contrast",
    description: "WCAG AA audit of the persisted brand: contrast ratios for every brand pair. Run after set_brand or when adjusting colors.",
    inputSchema: { type: "object", properties: {} },
    handler: () => {
      const r = brandCheck(ctx());
      if (r.errors[0]?.code === "NO_BRAND") throw r.errors[0];
      return r.data; // includes per-pair ratios even when failing
    },
  },
  {
    name: "extract_brand",
    description: "Extract brand candidates (colors with occurrence counts, fonts) from a website URL or a local SVG logo. Returns SUGGESTIONS with provenance — confirm with the user, then call set_brand.",
    inputSchema: {
      type: "object",
      properties: { url: str("Website URL (http/https)"), logoPath: str("Path to a local .svg logo") },
    },
    handler: async ({ url, logoPath }) => {
      if (url) return run(await brandFromUrl(url));
      if (logoPath) return run(brandFromLogo(ctx(), logoPath));
      throw { code: "MISSING_ARGUMENT", message: "Provide either 'url' or 'logoPath'." };
    },
  },
  {
    name: "search_registry",
    description: "Search the remote Chameleon registry (community/first-party specs and source components) by keywords. Complements search_components for patterns not shipped in the library.",
    inputSchema: { type: "object", properties: { query: str("Keywords"), registry: str("Registry URL override (optional)") }, required: ["query"] },
    handler: async ({ query, registry }) => run(await searchRemoteRegistry(query, registry)),
  },
  {
    name: "add_registry_item",
    description: "Install a registry item. Spec items are schema-validated and safe. Source items REQUIRE confirmed:true — before setting it, show the user the CONFIRM_REQUIRED preview (file paths + content excerpts) and get their approval.",
    inputSchema: {
      type: "object",
      properties: {
        name: str("Item name from search_registry"),
        registry: str("Registry URL override (optional)"),
        confirmed: { type: "boolean", description: "Set true ONLY after the user approved the source-item preview" },
      },
      required: ["name"],
    },
    handler: async ({ name, registry, confirmed }) => run(await addRegistryItem(ctx(), name, { source: registry, confirmed: !!confirmed })),
  },
  {
    name: "validate_project",
    description: "Run health checks on the current project (config, deps, Tailwind wiring, CSS imports, generated-code lint risks). Run this after scaffolding to self-verify.",
    inputSchema: { type: "object", properties: {} },
    handler: () => doctor(ctx()).data,
  },
];

/** Convert an engine Result into a tool payload; throw on failure. */
function run(result) {
  if (!result.ok) throw { code: result.errors[0]?.code || "ERROR", message: result.errors[0]?.message || "Operation failed", errors: result.errors };
  return {
    ...result.data,
    filesWritten: result.filesWritten,
    ...(result.filesDeleted.length ? { filesDeleted: result.filesDeleted } : {}),
    ...(result.nextSteps.length ? { nextSteps: result.nextSteps } : {}),
    ...(result.events.some((e) => e.level === "warn") ? { warnings: result.events.filter((e) => e.level === "warn").map((e) => e.message) } : {}),
  };
}

// ── JSON-RPC over stdio ──────────────────────────────────────────────────────
const send = (msg) => process.stdout.write(JSON.stringify(msg) + "\n");
const reply = (id, result) => send({ jsonrpc: "2.0", id, result });
const replyErr = (id, code, message, data) => send({ jsonrpc: "2.0", id, error: { code, message, ...(data ? { data } : {}) } });

function handle(msg) {
  const { id, method, params } = msg;
  if (method === "initialize") {
    return reply(id, {
      protocolVersion: (params && params.protocolVersion) || PROTOCOL,
      capabilities: { tools: {} },
      serverInfo: { name: "chameleon-ui", version: VERSION },
      instructions: "Chameleon UI — multi-theme React component library as callable tools. Typical flow: search_components → scaffold_component/scaffold_template, or get_recipe → compose_from_blocks. Run init_project once per project, validate_project after scaffolding.",
    });
  }
  if (method === "notifications/initialized" || method === "notifications/cancelled") return; // notifications: no response
  if (method === "ping") return reply(id, {});
  if (method === "tools/list") {
    const UI_TOOLS = new Set(["get_recipe", "compose_from_blocks", "preview_spec", "get_playground_url"]);
    return reply(id, {
      tools: TOOLS.map(({ name, description, inputSchema }) => ({
        name, description, inputSchema,
        ...(UI_TOOLS.has(name) ? uiMeta() : {}),
      })),
    });
  }
  if (method === "resources/list") {
    return reply(id, {
      resources: APPS_ENABLED
        ? [{ uri: WIDGET_URI, name: "Chameleon spec widget", mimeType: "text/html;profile=mcp-app" }]
        : [],
    });
  }
  if (method === "resources/read") {
    if (APPS_ENABLED && params?.uri === WIDGET_URI) {
      return reply(id, { contents: [{ uri: WIDGET_URI, mimeType: "text/html;profile=mcp-app", text: fs.readFileSync(WIDGET_PATH, "utf8") }] });
    }
    return replyErr(id, -32602, `Unknown resource: ${params?.uri}`);
  }
  if (method === "tools/call") {
    const tool = TOOLS.find((t) => t.name === params?.name);
    if (!tool) return replyErr(id, -32602, `Unknown tool: ${params?.name}`);
    return Promise.resolve()
      .then(() => tool.handler(params.arguments || {}))
      .then((out) => reply(id, { content: [{ type: "text", text: JSON.stringify(out, null, 2) }], structuredContent: out, isError: false }))
      .catch((e) => {
        const payload = e && e.code ? e : { code: "INTERNAL", message: String(e?.message || e) };
        reply(id, { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }], structuredContent: payload, isError: true });
      });
  }
  if (id !== undefined) replyErr(id, -32601, `Method not found: ${method}`);
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let msg;
  try { msg = JSON.parse(trimmed); } catch { return replyErr(null, -32700, "Parse error"); }
  try { handle(msg); } catch (e) { if (msg.id !== undefined) replyErr(msg.id, -32603, String(e?.message || e)); }
});
rl.on("close", () => process.exit(0));

process.stderr.write(`chameleon-ui MCP server v${VERSION} ready (stdio)\n`);
