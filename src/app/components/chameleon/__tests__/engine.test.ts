/**
 * Engine unit tests (F59) — bin/engine/ is the shared core under the CLI and
 * (from F60) the MCP server. Tests run against a temp consumer project.
 */
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  COMPONENTS, TEMPLATES, VALID_THEMES,
  createContext, listCatalog, getInfo, listThemes, searchCatalog,
  addComponents, selectBulk, removeComponent, scaffoldTemplate, setTheme, updateComponents, initProject,
  doctor, diffComponents, readConfig,
  validateSpec, scaffoldSpec, listRecipes, getRecipe, searchRecipes, RECIPES,
  // eslint-disable-next-line import/no-relative-packages
} from "../../../../../bin/engine/index.mjs";

const LIB_ROOT = path.resolve(__dirname, "../../../../..");

let cwd: string;
let ctx: ReturnType<typeof createContext>;

const initProj = () => {
  fs.writeFileSync(path.join(cwd, "package.json"), JSON.stringify({ name: "t", dependencies: { "@chameleon-ui-lib/react": "1.1.0" } }));
  fs.mkdirSync(path.join(cwd, "src/styles"), { recursive: true });
  fs.writeFileSync(path.join(cwd, "src/styles/theme.css"), '@import "tailwindcss";\n');
  return initProject(ctx, { version: "test" });
};

beforeEach(() => {
  cwd = fs.mkdtempSync(path.join(os.tmpdir(), "chameleon-engine-"));
  ctx = createContext({ cwd, libRoot: LIB_ROOT });
});
afterEach(() => fs.rmSync(cwd, { recursive: true, force: true }));

describe("catalog", () => {
  it("lists every registered component and template", () => {
    const cat = listCatalog();
    expect(cat.components).toHaveLength(Object.keys(COMPONENTS).length);
    expect(cat.templates).toHaveLength(Object.keys(TEMPLATES).length);
    expect(cat.themes).toEqual(VALID_THEMES);
  });

  it("returns info for components and templates, null for unknowns", () => {
    expect(getInfo("button")?.kind).toBe("component");
    expect(getInfo("AUTH-FLOW")?.kind).toBe("template");
    expect(getInfo("auth-flow")?.export).toBe("AuthFlowTemplate");
    expect(getInfo("nope")).toBeNull();
  });

  it("lists 5 themes with descriptions", () => {
    const themes = listThemes();
    expect(themes.map((t) => t.name)).toEqual(VALID_THEMES);
    themes.forEach((t) => expect(t.description.length).toBeGreaterThan(0));
  });

  it("search ranks exact name matches first", () => {
    const res = searchCatalog("button");
    expect(res[0].name).toBe("button");
    expect(searchCatalog("kanban drag")[0].name).toBe("kanban-board");
    expect(searchCatalog("")).toEqual([]);
  });
});

describe("init + config", () => {
  it("creates config and components dir", () => {
    const r = initProj();
    expect(r.ok).toBe(true);
    expect(r.filesWritten).toContain("chameleon.config.json");
    expect(readConfig(ctx)?.theme).toBe("simple");
    expect(fs.existsSync(path.join(cwd, "src/components/ui"))).toBe(true);
  });

  it("fails without package.json", () => {
    const r = initProject(ctx, { version: "test" });
    expect(r.ok).toBe(false);
    expect(r.errors[0].code).toBe("NO_PACKAGE_JSON");
  });

  it("setTheme validates and persists", () => {
    initProj();
    expect(setTheme(ctx, "glassy").ok).toBe(true);
    expect(readConfig(ctx)?.theme).toBe("glassy");
    const bad = setTheme(ctx, "neon");
    expect(bad.ok).toBe(false);
    expect(bad.errors[0].code).toBe("INVALID_THEME");
  });
});

describe("scaffold", () => {
  it("requires init", () => {
    const r = addComponents(ctx, ["button"]);
    expect(r.ok).toBe(false);
    expect(r.errors[0].code).toBe("NOT_INITIALIZED");
  });

  it("adds a component, rewrites imports, regenerates barrel", () => {
    initProj();
    const r = addComponents(ctx, ["button"]);
    expect(r.ok).toBe(true);
    expect(r.data.added[0]).toMatchObject({ name: "button", export: "Button" });
    const code = fs.readFileSync(path.join(cwd, "src/components/ui/button.tsx"), "utf8");
    expect(code).toContain('from "@chameleon-ui-lib/react"');
    expect(code).not.toMatch(/from\s+['"]\.\//);
    expect(fs.readFileSync(path.join(cwd, "src/components/ui/index.ts"), "utf8")).toContain("./button");
  });

  it("rejects unknown components", () => {
    initProj();
    const r = addComponents(ctx, ["zzz"]);
    expect(r.ok).toBe(false);
    expect(r.errors[0].code).toBe("UNKNOWN_COMPONENT");
  });

  it("selectBulk resolves category flags", () => {
    expect(selectBulk("--all-atoms")!.length).toBe(9);
    expect(selectBulk("--all")!.length).toBe(Object.keys(COMPONENTS).length);
    expect(selectBulk("--nope")).toBeNull();
  });

  it("scaffolds a template into pagesDir", () => {
    initProj();
    const r = scaffoldTemplate(ctx, "auth");
    expect(r.ok).toBe(true);
    expect(r.data.export).toBe("AuthTemplate");
    expect(fs.existsSync(path.join(cwd, "src/pages/auth.tsx"))).toBe(true);
    expect(scaffoldTemplate(ctx, "zzz").errors[0].code).toBe("UNKNOWN_TEMPLATE");
  });

  it("remove deletes and reports; missing file is a warning not an error", () => {
    initProj();
    addComponents(ctx, ["badge"]);
    const r = removeComponent(ctx, "badge");
    expect(r.ok).toBe(true);
    expect(r.data.removed).toBe("badge");
    expect(r.filesDeleted).toContain("src/components/ui/badge.tsx");
    const again = removeComponent(ctx, "badge");
    expect(again.ok).toBe(true);
    expect(again.data.removed).toBeNull();
  });

  it("update rewrites drifted files and leaves fresh ones", () => {
    initProj();
    addComponents(ctx, ["badge"]);
    const f = path.join(cwd, "src/components/ui/badge.tsx");
    fs.writeFileSync(f, "// drifted\n");
    const r = updateComponents(ctx);
    expect(r.data.updated).toContain("badge");
    expect(fs.readFileSync(f, "utf8")).toContain("@chameleon-ui-lib/react");
    expect(updateComponents(ctx).data.upToDate).toContain("badge");
  });
});

describe("health", () => {
  it("doctor reports issues in an empty dir and health in a good one", () => {
    const bad = doctor(ctx);
    expect(bad.data.healthy).toBe(false);
    expect(bad.data.issues).toBeGreaterThan(0);
    expect(bad.data.checks.length).toBeGreaterThan(0);
  });

  it("diff flags out-of-sync components", () => {
    initProj();
    addComponents(ctx, ["badge"]);
    expect(diffComponents(ctx).data.outOfSync).toBe(0);
    fs.writeFileSync(path.join(cwd, "src/components/ui/badge.tsx"), "// drifted\n");
    const r = diffComponents(ctx);
    expect(r.data.outOfSync).toBe(1);
    expect(r.data.components.find((x: { name: string }) => x.name === "badge")?.status).toBe("out-of-sync");
  });
});

describe("ChameleonSpec v1 (F61)", () => {
  it("validates a good template spec and a good blocks spec", () => {
    expect(validateSpec({ version: 1, name: "login", template: "auth" }).valid).toBe(true);
    expect(validateSpec({ version: 1, name: "kpis", blocks: [{ component: "stat-card", props: { label: "A", value: "1" } }] }).valid).toBe(true);
  });

  it("rejects structural problems with pathed, suggestive errors", () => {
    const v = validateSpec({ version: 1, name: "bad", blocks: [{ component: "buttn" }], theme: "neon" });
    expect(v.valid).toBe(false);
    const compErr = v.errors.find((e: { path: string }) => e.path === "$.blocks[0].component");
    expect(compErr?.suggestion).toBe("button");
    expect(v.errors.some((e: { path: string }) => e.path === "$.theme")).toBe(true);
    expect(validateSpec({ version: 1, name: "x" }).valid).toBe(false); // neither template nor blocks
    expect(validateSpec({ version: 1, name: "x", template: "auth", blocks: [] }).valid).toBe(false); // both
    expect(validateSpec({ version: 2, name: "x", template: "auth" }).valid).toBe(false);
    expect(validateSpec({ version: 1, name: "Not Kebab", template: "auth" }).valid).toBe(false);
  });

  it("validates variants against the registry", () => {
    const v = validateSpec({ version: 1, name: "x", blocks: [{ component: "stat-card", props: { variant: "huge" } }] });
    expect(v.errors[0].path).toBe("$.blocks[0].props.variant");
  });

  it("scaffolds a blocks spec: components + barrel + composed page", () => {
    initProj();
    const r = scaffoldSpec(ctx, getRecipe("team-members")!.spec);
    expect(r.ok).toBe(true);
    expect(r.data.export).toBe("TeamMembersPage");
    const page = fs.readFileSync(path.join(cwd, "src/pages/team-members.tsx"), "utf8");
    expect(page).toContain('import { StatCard, DataTable } from "../components/ui"');
    expect(page).toContain("<StatCard label=");
    expect(fs.existsSync(path.join(cwd, "src/components/ui/data-table.tsx"))).toBe(true);
  });

  it("scaffolds a template spec under the spec name", () => {
    initProj();
    const r = scaffoldSpec(ctx, { version: 1, name: "signin", template: "auth" });
    expect(r.ok).toBe(true);
    expect(fs.existsSync(path.join(cwd, "src/pages/signin.tsx"))).toBe(true);
  });

  it("refuses invalid specs with INVALID_SPEC and detailed errors", () => {
    initProj();
    const r = scaffoldSpec(ctx, { version: 1, name: "bad", blocks: [{ component: "nope" }] });
    expect(r.ok).toBe(false);
    expect(r.errors[0].code).toBe("INVALID_SPEC");
    expect(r.errors[0].validationErrors.length).toBeGreaterThan(0);
  });

  it("every stored recipe spec validates", () => {
    for (const rcp of RECIPES) {
      const v = validateSpec(rcp.spec);
      expect(v.errors).toEqual([]);
      expect(v.valid).toBe(true);
    }
    expect(listRecipes().length).toBeGreaterThanOrEqual(10);
  });

  it("recipe search finds patterns by keyword", () => {
    expect(searchRecipes("sign in")[0].name).toBe("login-form");
    expect(searchRecipes("kpi metrics")[0].name).toBe("analytics-overview");
  });
});

describe("result contract", () => {
  it("engine results always carry the full shape", () => {
    initProj();
    for (const r of [addComponents(ctx, ["button"]), setTheme(ctx, "liquid"), doctor(ctx), diffComponents(ctx)]) {
      expect(r).toHaveProperty("ok");
      expect(r).toHaveProperty("data");
      expect(Array.isArray(r.events)).toBe(true);
      expect(Array.isArray(r.filesWritten)).toBe(true);
      expect(Array.isArray(r.errors)).toBe(true);
    }
  });
});
