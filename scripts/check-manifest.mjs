#!/usr/bin/env node
/**
 * check-manifest.mjs — catalog completeness gate (Phase 11 wrap-up).
 *
 * Guards against catalog drift, the roadmap's #1 cross-phase risk:
 *  1. Every engine-registry component maps to a real source file and its
 *     PascalCase export exists in that file.
 *  2. Every engine-registry template's export exists in its source file.
 *  3. Every registry component is cataloged in ai-manifest.ts.
 *  4. Every stored recipe spec validates against the registry.
 *
 * Run: npm run check:manifest   (wired into CI)
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { COMPONENTS, TEMPLATES, componentExport, RECIPES } from "../bin/engine/index.mjs";
import { validateSpec } from "../bin/engine/spec.mjs";

// Missing ai-manifest.ts entries are warnings until the manifest backfill (F77)
// lands; pass --strict to make them failures (CI flips to strict after F77).
const STRICT = process.argv.includes("--strict");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC  = path.join(ROOT, "src", "app", "components", "chameleon");

const problems = [];
const warnings = [];
const sourceCache = new Map();
const read = (file) => {
  if (!sourceCache.has(file)) {
    const p = path.join(SRC, file);
    sourceCache.set(file, fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);
  }
  return sourceCache.get(file);
};

// 1. Registry components → source exports
for (const [name, meta] of Object.entries(COMPONENTS)) {
  const src = read(meta.file);
  if (src === null) { problems.push(`component '${name}': source file missing (${meta.file})`); continue; }
  const exportName = componentExport(name);
  const re = new RegExp(`export\\s+(const|function|class)\\s+${exportName}\\b`);
  if (!re.test(src)) problems.push(`component '${name}': export '${exportName}' not found in ${meta.file}`);
}

// 2. Registry templates → source exports
for (const [name, meta] of Object.entries(TEMPLATES)) {
  const src = read(meta.file);
  if (src === null) { problems.push(`template '${name}': source file missing (${meta.file})`); continue; }
  const re = new RegExp(`export\\s+(const|function|class)\\s+${meta.export}\\b`);
  if (!re.test(src)) problems.push(`template '${name}': export '${meta.export}' not found in ${meta.file}`);
}

// 3. Registry components → ai-manifest.ts entries
const manifestSrc = fs.existsSync(path.join(SRC, "ai-manifest.ts"))
  ? fs.readFileSync(path.join(SRC, "ai-manifest.ts"), "utf8")
  : null;
if (manifestSrc === null) {
  problems.push("ai-manifest.ts not found");
} else {
  for (const name of Object.keys(COMPONENTS)) {
    const exportName = componentExport(name);
    if (!manifestSrc.includes(`"${name}"`) && !manifestSrc.includes(`'${name}'`) && !manifestSrc.includes(exportName)) {
      (STRICT ? problems : warnings).push(`component '${name}': no entry in ai-manifest.ts`);
    }
  }
}

// 4. RenderSpec runtime maps cover the full registry
const renderSpecSrc = fs.existsSync(path.join(SRC, "render-spec.tsx"))
  ? fs.readFileSync(path.join(SRC, "render-spec.tsx"), "utf8")
  : null;
if (renderSpecSrc === null) {
  problems.push("render-spec.tsx not found");
} else {
  for (const name of Object.keys(COMPONENTS)) {
    if (!renderSpecSrc.includes(`"${name}":`)) problems.push(`component '${name}': missing from render-spec.tsx SPEC_COMPONENTS`);
  }
  for (const name of Object.keys(TEMPLATES)) {
    if (!renderSpecSrc.includes(`"${name}":`)) problems.push(`template '${name}': missing from render-spec.tsx SPEC_TEMPLATES`);
  }
}

// 5. Recipes validate
for (const rcp of RECIPES) {
  const v = validateSpec(rcp.spec);
  if (!v.valid) problems.push(`recipe '${rcp.name}': invalid spec — ${v.errors.map((e) => `${e.path}: ${e.message}`).join("; ")}`);
}

if (warnings.length) {
  console.warn(`⚠ ${warnings.length} warning(s) (failures under --strict; backfill tracked as F77):`);
  for (const w of warnings) console.warn(`  - ${w}`);
}
if (problems.length) {
  console.error(`\n✖ Catalog check failed (${problems.length} problem(s)):\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`\n✔ Catalog check passed: ${Object.keys(COMPONENTS).length} components, ${Object.keys(TEMPLATES).length} templates, ${RECIPES.length} recipes consistent across registry and sources.`);
