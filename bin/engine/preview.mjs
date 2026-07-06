/**
 * Chameleon Engine — spec preview + audit (F67, Phase 13).
 *
 * Levels (graceful degradation, reported in data.level):
 *   "static"  — always: spec validation + brand WCAG audit + composition notes
 *   "visual"  — when Playwright is importable AND a /render host is reachable:
 *               screenshots per theme/mode saved to .chameleon/previews/
 *
 * The /render route (F66) is the shared canvas: preview here, playground
 * links (F68), visual CI (F69), and the MCP Apps widget (F70/71) all hit it.
 */

import fs from "fs";
import path from "path";
import { Buffer } from "node:buffer";
import { URLSearchParams } from "node:url";
import { makeResult, addError, evOk, evWarn, evInfo } from "./core.mjs";
import { validateSpec } from "./spec.mjs";
import { readBrand, brandCheckData } from "./brand.mjs";
import { COMPONENTS, VALID_THEMES } from "./registry.mjs";

const b64url = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

/** Build a /render or /play URL for a spec. */
export function specUrl(spec, { baseUrl = "https://chameleon.glenhalton.com", page = "play", theme, mode } = {}) {
  const qs = new URLSearchParams({ spec: b64url(spec) });
  if (theme) qs.set("theme", theme);
  if (mode) qs.set("mode", mode);
  return `${baseUrl.replace(/\/$/, "")}/${page}?${qs}`;
}

export async function previewSpec(ctx, spec, opts = {}) {
  const r = makeResult();
  const { baseUrl = "http://localhost:5173", themes = ["current"], screenshot = true } = opts;

  // 1. Static: validation
  const v = validateSpec(spec);
  if (!v.valid) {
    return addError(r, "INVALID_SPEC", `Spec failed validation with ${v.errors.length} error(s).`, { validationErrors: v.errors });
  }
  evOk(r, "Spec is valid");

  // 2. Static: composition notes
  const notes = [];
  if (spec.blocks) {
    for (const b of spec.blocks) {
      const meta = COMPONENTS[b.component];
      if (meta?.deps?.length) notes.push(`${b.component} needs external deps: ${meta.deps.join(", ")}`);
    }
  }
  for (const n of notes) evInfo(r, n);

  // 3. Static: brand contrast audit (spec brand > project brand)
  const brand = spec.brand || readBrand(ctx);
  let contrast = null;
  if (brand?.primaryColor) {
    contrast = brandCheckData(brand);
    for (const c of contrast.checks) (c.pass ? evOk : evWarn)(r, `contrast — ${c.pair}: ${c.ratio.toFixed(2)}:1`);
  } else {
    evInfo(r, "No brand tokens — theme defaults carry the library's AA guarantee.");
  }

  // 4. Visual: Playwright screenshots when available
  let level = "static";
  const screenshots = [];
  if (screenshot) {
    let pw = null;
    try { pw = await import("playwright"); } catch { /* not installed — degrade */ }
    if (pw) {
      try {
        const browser = await pw.chromium.launch();
        const pg = await browser.newPage({ viewport: { width: 1280, height: 800 } });
        const outDir = path.join(ctx.cwd, ".chameleon", "previews");
        fs.mkdirSync(outDir, { recursive: true });
        const themeList = themes[0] === "all" ? VALID_THEMES : themes[0] === "current" ? [spec.theme || "simple"] : themes;
        for (const theme of themeList) {
          for (const mode of ["light", "dark"]) {
            const url = specUrl(spec, { baseUrl, page: "render", theme, mode });
            await pg.goto(url, { waitUntil: "networkidle", timeout: 15000 });
            const file = path.join(outDir, `${spec.name}-${theme}-${mode}.png`);
            await pg.screenshot({ path: file, fullPage: true });
            screenshots.push(path.relative(ctx.cwd, file));
            const alerts = await pg.locator('[role="alert"]').count();
            if (alerts > 0) evWarn(r, `${theme}/${mode}: ${alerts} render error box(es) visible`);
            else evOk(r, `${theme}/${mode}: rendered clean`);
          }
        }
        await browser.close();
        level = "visual";
        r.filesWritten.push(...screenshots);
      } catch (e) {
        evWarn(r, `Visual preview unavailable (${e.message.split("\n")[0]}) — is \`chameleon dev\` running at ${baseUrl}?`);
      }
    } else {
      evInfo(r, "Playwright not installed — static audit only. `npm i -D playwright` enables screenshots.");
    }
  }

  r.nextSteps.push(`Share before scaffolding: ${specUrl(spec, {})}`);
  r.data = {
    level,
    valid: true,
    playUrl: specUrl(spec, {}),
    renderUrl: specUrl(spec, { page: "render" }),
    ...(contrast ? { contrast } : {}),
    ...(screenshots.length ? { screenshots } : {}),
    notes,
  };
  return r;
}
