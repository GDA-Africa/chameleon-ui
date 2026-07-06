/**
 * Chameleon Engine — ChameleonSpec v1 (F61).
 *
 * A ChameleonSpec is a declarative, validated description of a page:
 *   {
 *     "version": 1,
 *     "name": "team-dashboard",            // kebab-case page name (required)
 *     "template": "admin-dashboard",        // EITHER a template...
 *     "blocks": [                           // ...OR flat composed blocks
 *       { "component": "stat-card", "props": { "label": "Users", "value": "1,204" } }
 *     ],
 *     "theme": "glassy",                    // optional
 *     "mode": "dark",                       // optional
 *     "brand": { ... }                      // optional, reserved for F62
 *   }
 *
 * v1 is deliberately flat: template + blocks + props. No nesting, no raw JSX.
 * Specs are the shared contract for recipes (this file), the MCP compose tools
 * (F60), preview (F67), playground links (F68), and MCP Apps widgets (F70/71).
 */

import fs from "fs";
import path from "path";
import { COMPONENTS, TEMPLATES, VALID_THEMES, LOCAL_DEPS_TEMPLATES, toPascalCase } from "./registry.mjs";
import { makeResult, addError, evOk, evInfo, requireConfig } from "./core.mjs";
import { RECIPES } from "./recipes.mjs";

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

function suggest(name, candidates) {
  const n = String(name).toLowerCase();
  const direct = candidates.find((c) => c.includes(n) || n.includes(c));
  if (direct) return direct;
  // fall back to longest shared prefix (≥3 chars) — catches typos like "buttn"
  let best = null, bestLen = 2;
  for (const cand of candidates) {
    let i = 0;
    while (i < n.length && i < cand.length && n[i] === cand[i]) i++;
    if (i > bestLen) { bestLen = i; best = cand; }
  }
  return best;
}

/**
 * Validate a ChameleonSpec v1. Returns { valid, errors: [{path, message, suggestion?}] }.
 * Structural + name validation; prop-schema validation arrives when the AI
 * manifest prop data is consumable from the engine (tracked in Phase 11 plan).
 */
export function validateSpec(spec) {
  const errors = [];
  const err = (p, message, suggestion) => errors.push({ path: p, message, ...(suggestion ? { suggestion } : {}) });

  if (typeof spec !== "object" || spec === null || Array.isArray(spec)) {
    return { valid: false, errors: [{ path: "$", message: "Spec must be a JSON object." }] };
  }
  if (spec.version !== 1) err("$.version", `Unsupported spec version: ${JSON.stringify(spec.version)}. Expected 1.`);
  if (typeof spec.name !== "string" || !KEBAB.test(spec.name)) {
    err("$.name", "Spec requires a kebab-case 'name' (e.g. \"team-dashboard\").");
  }

  const hasTemplate = spec.template !== undefined;
  const hasBlocks   = spec.blocks !== undefined;
  if (hasTemplate === hasBlocks) {
    err("$", "Spec must define exactly one of 'template' or 'blocks'.");
  }

  if (hasTemplate && !TEMPLATES[spec.template]) {
    err("$.template", `Unknown template: '${spec.template}'.`, suggest(spec.template, Object.keys(TEMPLATES)));
  }

  if (hasBlocks) {
    if (!Array.isArray(spec.blocks) || spec.blocks.length === 0) {
      err("$.blocks", "'blocks' must be a non-empty array.");
    } else {
      spec.blocks.forEach((b, i) => {
        if (typeof b !== "object" || b === null) { err(`$.blocks[${i}]`, "Block must be an object."); return; }
        if (!b.component || !COMPONENTS[b.component]) {
          err(`$.blocks[${i}].component`, `Unknown component: '${b.component}'.`, suggest(b.component, Object.keys(COMPONENTS)));
        }
        if (b.props !== undefined && (typeof b.props !== "object" || b.props === null || Array.isArray(b.props))) {
          err(`$.blocks[${i}].props`, "'props' must be an object.");
        }
        const variant = b.props?.variant;
        const meta = COMPONENTS[b.component];
        if (variant && meta?.variants && !meta.variants.includes(variant)) {
          err(`$.blocks[${i}].props.variant`, `'${variant}' is not a variant of ${b.component}.`, meta.variants.join(", "));
        }
      });
    }
  }

  if (spec.theme !== undefined && !VALID_THEMES.includes(spec.theme)) {
    err("$.theme", `Invalid theme: '${spec.theme}'.`, VALID_THEMES.join(", "));
  }
  if (spec.mode !== undefined && !["light", "dark"].includes(spec.mode)) {
    err("$.mode", `Invalid mode: '${spec.mode}'. Expected "light" or "dark".`);
  }

  return { valid: errors.length === 0, errors };
}

/** Serialize a props object into JSX attributes (children handled separately). */
function propsToJsx(props = {}) {
  const attrs = [];
  for (const [k, v] of Object.entries(props)) {
    if (k === "children") continue;
    if (typeof v === "string" && !v.includes('"') && !v.includes("\n")) attrs.push(`${k}="${v}"`);
    else attrs.push(`${k}={${JSON.stringify(v)}}`);
  }
  return attrs.length ? " " + attrs.join(" ") : "";
}

/**
 * Scaffold a spec into a consumer project: template specs copy the template,
 * block specs scaffold each component and generate a composed page file.
 */
export function scaffoldSpec(ctx, spec) {
  const r = makeResult();
  const cfg = requireConfig(ctx, r);
  if (!cfg) return r;

  const { valid, errors } = validateSpec(spec);
  if (!valid) {
    return addError(r, "INVALID_SPEC", `Spec failed validation with ${errors.length} error(s).`, { validationErrors: errors });
  }

  const pagesDir = cfg.pagesDir || "src/pages";
  const outDir   = path.join(ctx.cwd, pagesDir);
  fs.mkdirSync(outDir, { recursive: true });
  const pageFile = `${spec.name}.tsx`;
  const exportName = `${toPascalCase(spec.name)}Page`;

  if (spec.template) {
    const meta = TEMPLATES[spec.template];
    const srcFile = path.join(ctx.libSrc, meta.file);
    if (!fs.existsSync(srcFile)) return addError(r, "SOURCE_NOT_FOUND", `Source file not found: ${meta.file}`);
    let content = fs.readFileSync(srcFile, "utf8");
    content = content.replace(/from\s+['"]\.\/.*?['"]/g, 'from "@chameleon-ui-lib/react"');
    fs.writeFileSync(path.join(outDir, pageFile), content, "utf8");
    r.filesWritten.push(`${pagesDir}/${pageFile}`);
    evOk(r, `${pagesDir}/${pageFile} created from template '${spec.template}'`);
    r.nextSteps.push(`Import via: import { ${meta.export} } from './pages/${spec.name}'`);
    r.data = { name: spec.name, source: "template", template: spec.template, export: meta.export, file: `${pagesDir}/${pageFile}` };
    void LOCAL_DEPS_TEMPLATES;
  } else {
    // Ensure block components exist in the project (idempotent), then compose.
    const unique = [...new Set(spec.blocks.map((b) => b.component))];
    for (const key of unique) {
      const meta = COMPONENTS[key];
      const srcFile = path.join(ctx.libSrc, meta.file);
      if (!fs.existsSync(srcFile)) return addError(r, "SOURCE_NOT_FOUND", `Source file not found: ${meta.file}`);
      let content = fs.readFileSync(srcFile, "utf8");
      content = content.replace(/from\s+['"]\.\/.*?['"]/g, 'from "@chameleon-ui-lib/react"');
      fs.writeFileSync(path.join(ctx.cwd, cfg.dir, `${key}.tsx`), content, "utf8");
      r.filesWritten.push(`${cfg.dir}/${key}.tsx`);
      evOk(r, `${cfg.dir}/${key}.tsx scaffolded`);
    }
    // Barrel refresh
    const compDir = path.join(ctx.cwd, cfg.dir);
    const files = fs.readdirSync(compDir).filter((f) => f.endsWith(".tsx") && f !== "index.ts");
    fs.writeFileSync(path.join(compDir, "index.ts"),
      `// Auto-generated by Chameleon UI CLI — do not edit manually\n${files.map((f) => `export * from './${f.replace(".tsx", "")}';`).join("\n")}\n`, "utf8");
    r.filesWritten.push(`${cfg.dir}/index.ts`);

    const importPath = path.relative(outDir, compDir).split(path.sep).join("/");
    const imports = [...new Set(spec.blocks.map((b) => toPascalCase(b.component)))].join(", ");
    const body = spec.blocks.map((b) => {
      const tag = toPascalCase(b.component);
      const children = b.props?.children;
      return children !== undefined
        ? `      <${tag}${propsToJsx(b.props)}>${children}</${tag}>`
        : `      <${tag}${propsToJsx(b.props)} />`;
    }).join("\n");

    const page = `// Generated by Chameleon UI from ChameleonSpec v1 — "${spec.name}"
// Regenerate: chameleon compose <spec-file>
import { ${imports} } from "${importPath}";

export function ${exportName}() {
  return (
    <div className="flex flex-col gap-6 p-6">
${body}
    </div>
  );
}
`;
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, pageFile), page, "utf8");
    r.filesWritten.push(`${pagesDir}/${pageFile}`);
    evOk(r, `${pagesDir}/${pageFile} composed from ${spec.blocks.length} block(s)`);
    r.nextSteps.push(`Import via: import { ${exportName} } from './pages/${spec.name}'`);
    r.data = { name: spec.name, source: "blocks", blocks: unique, export: exportName, file: `${pagesDir}/${pageFile}` };
  }

  if (spec.theme || spec.mode) {
    evInfo(r, `Spec requests theme/mode: ${[spec.theme, spec.mode].filter(Boolean).join(" / ")}`);
    r.nextSteps.push(`Set <ChameleonProvider initialTheme="${spec.theme || "simple"}" initialMode="${spec.mode || "light"}">`);
  }
  return r;
}

/** Recipe accessors — recipes are stored, named specs. */
export function listRecipes() {
  return RECIPES.map(({ name, description, keywords }) => ({ name, description, keywords }));
}

export function getRecipe(name) {
  return RECIPES.find((rcp) => rcp.name === String(name).toLowerCase()) || null;
}

export function searchRecipes(query) {
  const q = String(query).toLowerCase().trim();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return RECIPES
    .map((rcp) => {
      const hay = `${rcp.name} ${rcp.description} ${rcp.keywords.join(" ")}`.toLowerCase();
      let score = 0;
      if (rcp.name === q) score += 100;
      for (const t of terms) { if (rcp.name.includes(t)) score += 20; if (hay.includes(t)) score += 5; }
      return { name: rcp.name, description: rcp.description, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
}
