/**
 * Chameleon Engine — project health checks and source diffing (F59).
 */

import fs from "fs";
import path from "path";
import { COMPONENTS } from "./registry.mjs";
import { makeResult, evOk, evWarn, evErr, evInfo, readConfig, readProjectPkg, requireConfig, addError } from "./core.mjs";

const rewriteImports = (content) => content.replace(/from\s+['"]\.\/.*?['"]/g, 'from "@chameleon-ui-lib/react"');

/** Run all doctor checks. data: { healthy, issues, checks }. ok mirrors healthy. */
export function doctor(ctx) {
  const r = makeResult();
  let issues = 0;

  const pkg = readProjectPkg(ctx);
  if (pkg) evOk(r, "package.json found");
  else { evErr(r, "No package.json found"); issues++; }

  const cfg = readConfig(ctx);
  if (cfg) evOk(r, `chameleon.config.json found (theme: ${cfg.theme}, mode: ${cfg.mode})`);
  else { evWarn(r, "No chameleon.config.json — run chameleon init"); issues++; }

  if (pkg) {
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    if (allDeps["@chameleon-ui-lib/react"]) evOk(r, "@chameleon-ui-lib/react installed");
    else { evWarn(r, "@chameleon-ui-lib/react not in package.json"); issues++; }
  }

  if (fs.existsSync(path.join(ctx.cwd, "node_modules"))) evOk(r, "node_modules present");
  else { evErr(r, "node_modules not found — run npm install"); issues++; }

  // 1. Bundler / Tailwind config
  const viteConfigJs = path.join(ctx.cwd, "vite.config.js");
  const viteConfigTs = path.join(ctx.cwd, "vite.config.ts");
  const viteConfig = fs.existsSync(viteConfigTs) ? viteConfigTs : (fs.existsSync(viteConfigJs) ? viteConfigJs : null);

  const twFiles = ["tailwind.config.js", "tailwind.config.ts", "tailwind.config.mjs"];
  const hasTwConfig = twFiles.some((f) => fs.existsSync(path.join(ctx.cwd, f)));

  let hasTwVitePlugin = false;
  if (viteConfig) {
    const vc = fs.readFileSync(viteConfig, "utf8");
    if (vc.includes("@tailwindcss/vite")) hasTwVitePlugin = true;
  }

  if (hasTwConfig || hasTwVitePlugin) {
    evOk(r, "Tailwind CSS configured");
  } else {
    evWarn(r, "No Tailwind CSS config found (no tailwind.config or @tailwindcss/vite in vite.config)");
    issues++;
  }

  // 2. Missing CSS import
  if (cfg && cfg.css) {
    const cssPath = path.join(ctx.cwd, cfg.css);
    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, "utf8");
      if (cssContent.includes("@chameleon-ui-lib/react/styles")) {
        evOk(r, `Library CSS imported correctly in ${cfg.css}`);
      } else {
        evWarn(r, `Library CSS not imported in ${cfg.css}. Add: @import "@chameleon-ui-lib/react/styles";`);
        issues++;
      }

      // F27: @import ordering — no rules may precede @import lines
      const lines = cssContent.split("\n");
      let firstRuleLine = -1;
      let firstImportAfterRule = -1;
      for (let i = 0; i < lines.length; i++) {
        const t = lines[i].trim();
        if (!t || t.startsWith("/*") || t.startsWith("*") || t.startsWith("//")) continue;
        if (t.startsWith("@import")) {
          if (firstRuleLine !== -1 && firstImportAfterRule === -1) firstImportAfterRule = i + 1;
        } else {
          if (firstRuleLine === -1) firstRuleLine = i + 1;
        }
      }
      if (firstImportAfterRule !== -1) {
        evWarn(r, `CSS @import ordering issue in ${cfg.css} (line ${firstImportAfterRule}): @import must precede all other rules. PostCSS will warn about this.`);
        evInfo(r, `  Fix: move all @import lines to the very top of ${cfg.css}`);
        issues++;
      } else {
        evOk(r, `CSS @import order is correct in ${cfg.css}`);
      }
    } else {
      evWarn(r, `Configured CSS file not found: ${cfg.css}`);
      issues++;
    }
  }

  // 3 & 4. Generated components — unresolved deps & lint risks
  if (cfg) {
    const outDir = path.join(ctx.cwd, cfg.dir);
    if (fs.existsSync(outDir)) {
      evOk(r, `Components directory exists: ${cfg.dir}`);

      const scaffolded = fs.readdirSync(outDir).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
      const unresolvedPaths = [];
      const lintRisks = [];

      for (const t of scaffolded) {
        const code = fs.readFileSync(path.join(outDir, t), "utf8");
        const importRegex = /from\s+["'](\.\/[^"']+)["']/g;
        let match;
        while ((match = importRegex.exec(code)) !== null) {
          const importPath = match[1];
          const targetPathBase = path.join(outDir, importPath);
          if (!fs.existsSync(targetPathBase + ".tsx") && !fs.existsSync(targetPathBase + ".ts")) {
            unresolvedPaths.push({ file: t, import: importPath });
          }
        }
        if (code.includes(" as any") || code.includes(": any") || code.includes("@ts-ignore")) {
          lintRisks.push(t);
        }
      }

      if (unresolvedPaths.length === 0) {
        evOk(r, "All local cross-component imports resolved");
      } else {
        evWarn(r, `Found unresolved local imports in ${unresolvedPaths.length} file(s)`);
        unresolvedPaths.forEach((up) => r.events.push({ level: "detail", message: `${up.file} -> ${up.import}` }));
        issues++;
      }

      if (lintRisks.length === 0) {
        evOk(r, "No explicit lint-risk patterns found in generated code");
      } else {
        evWarn(r, `Found lint-risk patterns (any/ts-ignore) in: ${lintRisks.join(", ")}`);
        issues++;
      }
    } else {
      evWarn(r, `Components directory missing: ${cfg.dir} — run chameleon add`);
    }
  }

  const checks = r.events.filter((e) => e.level === "ok" || e.level === "warn" || e.level === "error")
                         .map((e) => ({ level: e.level, message: e.message }));
  r.ok = issues === 0;
  r.data = { healthy: issues === 0, issues, checks };
  return r;
}

/** Compare scaffolded components against library source. */
export function diffComponents(ctx) {
  const r = makeResult();
  const cfg = requireConfig(ctx, r);
  if (!cfg) return r;
  const outDir = path.join(ctx.cwd, cfg.dir);
  const results = [];
  let outOfSync = 0;
  if (!fs.existsSync(outDir)) {
    evInfo(r, `No scaffolded components found in ${cfg.dir}`);
    r.data = { components: [], outOfSync: 0 };
    return r;
  }
  const localFiles = fs.readdirSync(outDir).filter((f) => f.endsWith(".tsx"));
  if (localFiles.length === 0) {
    evInfo(r, `No scaffolded components found in ${cfg.dir}`);
    r.data = { components: [], outOfSync: 0 };
    return r;
  }
  for (const file of localFiles) {
    const key  = file.replace(".tsx", "").toLowerCase();
    const meta = COMPONENTS[key];
    if (!meta) continue;
    const localContent = fs.readFileSync(path.join(outDir, file), "utf8");
    const srcPath = path.join(ctx.libSrc, meta.file);
    if (!fs.existsSync(srcPath)) continue;
    const sourceContent = rewriteImports(fs.readFileSync(srcPath, "utf8"));
    if (localContent === sourceContent) {
      evOk(r, `${file} — up to date`);
      results.push({ name: key, status: "in-sync" });
    } else {
      evWarn(r, `${file} — differs from library source`);
      results.push({ name: key, status: "out-of-sync" });
      outOfSync++;
    }
  }
  if (outOfSync > 0) r.nextSteps.push("Run `chameleon update --json` to re-sync out-of-sync components.");
  r.data = { components: results, outOfSync };
  return r;
}

export { addError };
