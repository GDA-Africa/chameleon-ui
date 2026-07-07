/**
 * Chameleon Engine — AppSpec v2 + full application scaffolding (F74/F75, Phase 16).
 *
 * AppSpec v2 composes v1 page specs — no new machinery:
 *   {
 *     "version": 2,
 *     "app": { "name": "bakery-crm", "brand": { "primaryColor": "#..." } },
 *     "shell": { "nav": "sidebar" | "topbar" | "none", "theme": "glassy", "mode": "light" },
 *     "pages": [ { "route": "/", "title": "Dashboard", "spec": { ...ChameleonSpec v1... } } ],
 *     "dataSlots": [ { "id": "customers", "shape": "table", "mock": true } ]
 *   }
 *
 * dataSlots are v2.0-scope MOCK ONLY: typed sample data + a clearly marked
 * seam (// CHAMELEON-DATA) — backend integration stays out of scope.
 */

import fs from "fs";
import path from "path";
import process from "node:process";
import { VALID_THEMES, toPascalCase } from "./registry.mjs";
import { makeResult, addError, evOk, evInfo, createContext, writeConfig } from "./core.mjs";
import { validateSpec, scaffoldSpec } from "./spec.mjs";
import { brandCheckData } from "./brand.mjs";
import { agentsInit } from "./agents.mjs";

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

export function validateAppSpec(appSpec) {
  const errors = [];
  const err = (p, message) => errors.push({ path: p, message });
  if (typeof appSpec !== "object" || appSpec === null) return { valid: false, errors: [{ path: "$", message: "AppSpec must be an object." }] };
  if (appSpec.version !== 2) err("$.version", `Unsupported app spec version: ${JSON.stringify(appSpec.version)}. Expected 2.`);
  if (!appSpec.app || typeof appSpec.app.name !== "string" || !KEBAB.test(appSpec.app.name)) err("$.app.name", "app.name must be kebab-case.");
  const nav = appSpec.shell?.nav ?? "sidebar";
  if (!["sidebar", "topbar", "none"].includes(nav)) err("$.shell.nav", `nav must be sidebar | topbar | none, got '${nav}'.`);
  if (appSpec.shell?.theme && !VALID_THEMES.includes(appSpec.shell.theme)) err("$.shell.theme", `Invalid theme '${appSpec.shell.theme}'.`);
  if (!Array.isArray(appSpec.pages) || appSpec.pages.length === 0) {
    err("$.pages", "pages must be a non-empty array.");
  } else {
    const routes = new Set();
    appSpec.pages.forEach((p, i) => {
      if (typeof p.route !== "string" || !p.route.startsWith("/")) err(`$.pages[${i}].route`, "route must start with '/'.");
      else if (routes.has(p.route)) err(`$.pages[${i}].route`, `duplicate route '${p.route}'.`);
      else routes.add(p.route);
      if (typeof p.title !== "string" || !p.title) err(`$.pages[${i}].title`, "title is required.");
      const v = validateSpec(p.spec);
      for (const e of v.errors) err(`$.pages[${i}].spec${e.path.slice(1)}`, e.message);
    });
  }
  if (appSpec.dataSlots !== undefined) {
    if (!Array.isArray(appSpec.dataSlots)) err("$.dataSlots", "dataSlots must be an array.");
    else {
      const ids = new Set();
      appSpec.dataSlots.forEach((s, i) => {
        if (typeof s.id !== "string" || !KEBAB.test(s.id)) err(`$.dataSlots[${i}].id`, "id must be kebab-case.");
        else if (ids.has(s.id)) err(`$.dataSlots[${i}].id`, `duplicate id '${s.id}'.`);
        else ids.add(s.id);
        if (s.shape && !["table", "list", "stats"].includes(s.shape)) err(`$.dataSlots[${i}].shape`, "shape must be table | list | stats.");
      });
    }
  }
  if (appSpec.app?.brand && typeof appSpec.app.brand.primaryColor !== "string") err("$.app.brand.primaryColor", "brand requires primaryColor.");
  return { valid: errors.length === 0, errors };
}

const MOCK = {
  table: `[
  { id: "1", name: "Ada Lovelace", status: "Active", value: "$1,204" },
  { id: "2", name: "Grace Hopper", status: "Active", value: "$980" },
  { id: "3", name: "Alan Turing", status: "Pending", value: "$450" },
]`,
  list: `[
  { id: "1", title: "First item", description: "Replace with your data" },
  { id: "2", title: "Second item", description: "Replace with your data" },
]`,
  stats: `[
  { label: "Total", value: "12,480", trend: "up" as const, trendValue: "+8.1%" },
  { label: "Active", value: "8,912", trend: "up" as const, trendValue: "+3.2%" },
]`,
};

/** Scaffold a complete runnable Vite app from an AppSpec v2. */
export function scaffoldApp(libRoot, appSpec, targetDir, { version } = {}) {
  const r = makeResult();
  const v = validateAppSpec(appSpec);
  if (!v.valid) return addError(r, "INVALID_APP_SPEC", `App spec failed validation with ${v.errors.length} error(s).`, { validationErrors: v.errors });

  const dir = path.resolve(targetDir);
  if (fs.existsSync(dir) && fs.readdirSync(dir).length > 0) {
    return addError(r, "DIR_NOT_EMPTY", `Target directory is not empty: ${targetDir}`);
  }
  fs.mkdirSync(path.join(dir, "src", "styles"), { recursive: true });
  const rel = (p) => path.relative(process.cwd(), path.join(dir, p)) || p;
  const write = (p, content) => {
    fs.mkdirSync(path.dirname(path.join(dir, p)), { recursive: true });
    fs.writeFileSync(path.join(dir, p), content, "utf8");
    r.filesWritten.push(rel(p));
  };

  const name = appSpec.app.name;
  const theme = appSpec.shell?.theme || "simple";
  const mode = appSpec.shell?.mode || "light";
  const nav = appSpec.shell?.nav ?? "sidebar";
  const brand = appSpec.app.brand || null;

  // package.json / tooling
  write("package.json", JSON.stringify({
    name, private: true, version: "0.1.0", type: "module",
    scripts: { dev: "vite", build: "tsc -b && vite build", preview: "vite preview", lint: "eslint ." },
    dependencies: {
      "@chameleon-ui-lib/react": `^${(version || "2.0.0").replace(/-.*$/, "")}`,
      react: "^18.3.1", "react-dom": "^18.3.1", "react-router-dom": "^6.28.0",
    },
    devDependencies: {
      "@tailwindcss/vite": "^4.0.0", "@types/react": "^18.3.0", "@types/react-dom": "^18.3.0",
      "@vitejs/plugin-react": "^4.3.0", tailwindcss: "^4.0.0", typescript: "^5.6.0", vite: "^6.0.0",
    },
  }, null, 2) + "\n");
  write("vite.config.ts", `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({ plugins: [react(), tailwindcss()] });
`);
  write("tsconfig.json", JSON.stringify({
    compilerOptions: {
      target: "ES2022", useDefineForClassFields: true, lib: ["ES2022", "DOM", "DOM.Iterable"],
      module: "ESNext", moduleResolution: "bundler", resolveJsonModule: true,
      jsx: "react-jsx", strict: true, noEmit: true, skipLibCheck: true, esModuleInterop: true,
    },
    include: ["src"],
  }, null, 2) + "\n");
  write("index.html", `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);
  write("src/styles/index.css", `@import "tailwindcss";
@import "@chameleon-ui-lib/react/styles";
`);
  evOk(r, "App skeleton created (vite + react + ts + tailwind v4)");

  // chameleon config + brand
  const appCtx = createContext({ cwd: dir, libRoot });
  writeConfig(appCtx, { theme, mode, lang: "en", dir: "src/components/ui", pagesDir: "src/pages", css: "src/styles/index.css", version: version || "2.0.0" }, r);
  evOk(r, "chameleon.config.json created");
  if (brand) {
    write("brand.config.json", JSON.stringify({ version: 1, ...brand }, null, 2) + "\n");
    const contrast = brandCheckData(brand);
    (contrast.allPass ? evOk : evInfo)(r, `Brand tokens written — WCAG AA: ${contrast.checks.filter((x) => x.pass).length}/${contrast.checks.length} pairs pass`);
  }

  // dataSlots (mock-only, typed, with the replacement seam)
  for (const slot of appSpec.dataSlots || []) {
    const constName = toPascalCase(slot.id);
    write(`src/data/${slot.id}.ts`, `// CHAMELEON-DATA: replace with your real data source (fetch/SWR/etc.)
// Generated mock for dataSlot "${slot.id}" (shape: ${slot.shape || "table"})
export const ${constName} = ${MOCK[slot.shape || "table"]};
`);
    evOk(r, `src/data/${slot.id}.ts (mock ${slot.shape || "table"})`);
  }

  // pages via v1 spec scaffolding
  const pages = [];
  for (const page of appSpec.pages) {
    const sub = scaffoldSpec(appCtx, page.spec);
    if (!sub.ok) {
      r.errors.push(...sub.errors);
      r.ok = false;
      return r;
    }
    r.filesWritten.push(...sub.filesWritten.map((f) => rel(f)));
    pages.push({ route: page.route, title: page.title, export: sub.data.export, file: page.spec.name });
    evOk(r, `${page.route} → ${sub.data.export} (${sub.data.source})`);
  }

  // App shell + router
  const navLinks = pages.map((p) => `        <NavLink to="${p.route}" style={({ isActive }) => linkStyle(isActive)}>${p.title}</NavLink>`).join("\n");
  const routes = pages.map((p) => `        <Route path="${p.route}" element={<${p.export} />} />`).join("\n");
  const imports = pages.map((p) => `import { ${p.export} } from "./pages/${p.file}";`).join("\n");
  const shellLayout = nav === "none" ? `
      <main>{routesEl}</main>` : nav === "topbar" ? `
      <nav style={{ display: "flex", gap: 12, padding: "12px 20px", borderBottom: "1px solid var(--border)", background: "var(--card)" }}>
        <strong style={{ marginRight: 12 }}>▧ ${name}</strong>
${navLinks}
      </nav>
      <main>{routesEl}</main>` : `
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8, padding: 20, width: 220, borderRight: "1px solid var(--border)", background: "var(--card)" }}>
          <strong style={{ marginBottom: 12 }}>▧ ${name}</strong>
${navLinks}
        </nav>
        <main style={{ flex: 1 }}>{routesEl}</main>
      </div>`;

  write("src/App.tsx", `// Generated by \`chameleon new\` from AppSpec v2 — "${name}"
import type { CSSProperties } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
${imports}

const linkStyle = (active: boolean): CSSProperties => ({
  padding: "6px 10px", borderRadius: 8, fontSize: 14, textDecoration: "none",
  color: active ? "var(--primary-foreground)" : "var(--foreground)",
  background: active ? "var(--primary)" : "transparent",
});

export default function App() {
  const routesEl = (
    <Routes>
${routes}
      </Routes>
  );
  return (
    <BrowserRouter>${shellLayout}
    </BrowserRouter>
  );
}
`);
  write("src/main.tsx", `import { createRoot } from "react-dom/client";
import { ChameleonProvider } from "@chameleon-ui-lib/react";
${brand ? `import brand from "../brand.config.json";\n` : ""}import App from "./App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ChameleonProvider initialTheme="${theme}" initialMode="${mode}"${brand ? " brand={brand}" : ""}>
    <App />
  </ChameleonProvider>,
);
`);
  evOk(r, `src/App.tsx (${nav} shell, ${pages.length} route(s)) + src/main.tsx`);

  // Agent rulesets (F64) inside the generated app
  const agents = agentsInit(appCtx, { version: version || "2.0.0" });
  if (agents.ok) { r.filesWritten.push(...agents.filesWritten.map((f) => rel(f))); evOk(r, "Agent rulesets written (CLAUDE.md, AGENTS.md, .cursorrules)"); }

  r.nextSteps.push(
    `cd ${targetDir} && npm install && npm run dev`,
    "Replace CHAMELEON-DATA seams in src/data/ with real sources",
    "Validate: npx tsc --noEmit",
  );
  r.data = { name, dir: targetDir, pages, theme, mode, nav, brand: !!brand, dataSlots: (appSpec.dataSlots || []).map((s) => s.id) };
  return r;
}
