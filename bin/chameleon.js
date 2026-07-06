#!/usr/bin/env node

/**
 * Chameleon CLI — thin skin over the Chameleon Engine (bin/engine/, F59).
 * All catalog/scaffold/health logic lives in the engine; this file only parses
 * arguments and renders engine Results as human (ANSI) or --json output (F58).
 */

import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import {
  COMPONENTS, TEMPLATES, VALID_THEMES,
  createContext, listCatalog, getInfo, listThemes, readConfig,
  addComponents, selectBulk, removeComponent, scaffoldTemplate, setTheme, updateComponents, initProject,
  doctor, diffComponents,
  validateSpec, scaffoldSpec, listRecipes, getRecipe, agentsInit,
  brandInit, brandCheck, brandFromUrl, brandFromLogo, previewSpec,
} from "./engine/index.mjs";

const __filename = fs.realpathSync(fileURLToPath(import.meta.url));
const __dirname = path.dirname(__filename);

// ANSI Colors (Chameleon brand palette)
const c = {
  reset:   "\x1b[0m",
  bold:    "\x1b[1m",
  dim:     "\x1b[2m",
  indigo:  "\x1b[38;2;129;140;248m",
  emerald: "\x1b[38;2;52;211;153m",
  cyan:    "\x1b[38;2;34;211;238m",
  yellow:  "\x1b[38;2;250;204;21m",
  white:   "\x1b[38;2;255;255;255m",
  gray:    "\x1b[38;2;156;163;175m",
  red:     "\x1b[38;2;248;113;113m",
};

// ── F58: machine-readable output mode (--json) ──────────────────────────────
// Envelope: { ok, command, version, data, warnings[], errors[], filesWritten[], nextSteps[] }
// Documented in docs/CLI_JSON.md. Foundation for the MCP server (F60).
const JSON_MODE = process.argv.slice(2).includes("--json");

const LIB_ROOT   = path.resolve(__dirname, "..");
const _pkgJson   = JSON.parse(fs.readFileSync(path.join(LIB_ROOT, "package.json"), "utf8"));
const VERSION    = _pkgJson.version || "0.0.0";
const ctx        = createContext({ cwd: process.cwd(), libRoot: LIB_ROOT });

// ── output helpers ───────────────────────────────────────────────────────────
const log  = (msg) => { if (!JSON_MODE) console.log(msg); };
const ok   = (msg) => log(`  ${c.emerald}✔${c.reset} ${c.white}${msg}${c.reset}`);
const warn = (msg) => log(`  ${c.yellow}⚠${c.reset} ${c.white}${msg}${c.reset}`);
const fail = (msg) => log(`  ${c.red}✖${c.reset} ${c.white}${msg}${c.reset}`);
const info = (msg) => log(`  ${c.gray}${msg}${c.reset}`);

/** Replay engine events through the human formatters. */
function renderEvents(events) {
  for (const e of events) {
    if      (e.level === "ok")     ok(e.message);
    else if (e.level === "warn")   warn(e.message);
    else if (e.level === "error")  fail(e.message);
    else if (e.level === "info")   info(e.message);
    else if (e.level === "dim")    log(`  ${c.dim}${e.message}${c.reset}`);
    else if (e.level === "detail") log(`    ${c.gray}${e.message}${c.reset}`);
  }
}

const banner = `\n${c.emerald}▧${c.reset} ${c.bold}${c.white}Chameleon UI${c.reset} ${c.dim}v${VERSION}${c.reset}\n`;

function printHelp() {
  log(banner);
  log(`  ${c.gray}The beautiful, modular, and themeable React UI library.${c.reset}\n`);
  log(`  ${c.bold}${c.white}USAGE${c.reset}`);
  log(`    $ ${c.emerald}chameleon${c.reset} <command> [options]\n`);
  log(`  ${c.bold}${c.white}CORE COMMANDS${c.reset}`);
  log(`    ${c.emerald}init${c.reset}                    Initialize your project with Chameleon UI`);
  log(`    ${c.emerald}add${c.reset} ${c.indigo}<component>${c.reset}       Scaffold a component into your project`);
  log(`    ${c.emerald}remove${c.reset} ${c.indigo}<component>${c.reset}    Remove a scaffolded component`);
  log(`    ${c.emerald}list${c.reset}                    Show all available components and templates\n`);
  log(`  ${c.bold}${c.white}THEMING & TEMPLATES${c.reset}`);
  log(`    ${c.emerald}theme${c.reset} ${c.indigo}<name>${c.reset}           Set the active theme`);
  log(`    ${c.emerald}themes${c.reset}                  List all available Chameleon themes`);
  log(`    ${c.emerald}template${c.reset} ${c.indigo}<name>${c.reset}        Scaffold a full-page template`);
  log(`    ${c.emerald}recipes${c.reset}                 List composition recipes (stored ChameleonSpecs)`);
  log(`    ${c.emerald}compose${c.reset} ${c.indigo}<spec|recipe>${c.reset}   Scaffold a page from a spec file or recipe name\n`);
  log(`  ${c.bold}${c.white}UTILS & DIAGNOSTICS${c.reset}`);
  log(`    ${c.emerald}info${c.reset} ${c.indigo}<component>${c.reset}       Show details, props, and deps for a component`);
  log(`    ${c.emerald}doctor${c.reset}                  Check project health and dependencies`);
  log(`    ${c.emerald}diff${c.reset}                    Compare local components to latest library source`);
  log(`    ${c.emerald}update${c.reset}                  Re-sync outdated scaffolded components`);
  log(`    ${c.emerald}config${c.reset}                  Show or manage chameleon.config.json`);
  log(`    ${c.emerald}dev${c.reset}                     Launch the local component playground`);
  log(`    ${c.emerald}mcp${c.reset}                     Start the MCP server for AI agents (stdio)`);
  log(`    ${c.emerald}agents init${c.reset}             Write Chameleon rulesets for coding agents (CLAUDE.md, ...)\n`);
  log(`  ${c.bold}${c.white}OPTIONS${c.reset}`);
  log(`    ${c.emerald}-h, --help${c.reset}              Show this help message`);
  log(`    ${c.emerald}-v, --version${c.reset}           Show the version number`);
  log(`    ${c.emerald}--json${c.reset}                  Machine-readable JSON output (for scripts & AI agents)\n`);
  log(`  ${c.bold}${c.white}EXAMPLES${c.reset}`);
  log(`    $ ${c.emerald}chameleon init${c.reset}`);
  log(`    $ ${c.emerald}chameleon add button${c.reset}`);
  log(`    $ ${c.emerald}chameleon add --all-atoms${c.reset}       ${c.dim}# scaffold all 8 atoms${c.reset}`);
  log(`    $ ${c.emerald}chameleon add --all-molecules${c.reset}   ${c.dim}# scaffold all molecules${c.reset}`);
  log(`    $ ${c.emerald}chameleon add --all-composites${c.reset}  ${c.dim}# scaffold all composites${c.reset}`);
  log(`    $ ${c.emerald}chameleon add --all${c.reset}             ${c.dim}# scaffold every component${c.reset}`);
  log(`    $ ${c.emerald}chameleon theme glassy${c.reset}`);
  log(`    $ ${c.emerald}chameleon template auth-flow${c.reset}\n`);
}

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === "-h" || args[0] === "--help") { printHelp(); process.exit(0); }
if (args[0] === "-v" || args[0] === "--version") {
  if (JSON_MODE) { process.stdout.write(JSON.stringify({ ok: true, command: "version", version: VERSION, data: { cli: VERSION, library: VERSION } }, null, 2) + "\n"); process.exit(0); }
  log(`${c.emerald}Chameleon CLI${c.reset}     v${VERSION}`);
  log(`${c.indigo}Chameleon UI lib${c.reset}   v${VERSION}`);
  process.exit(0);
}

const cmd   = args[0];
const item  = args.slice(1).find(a => !a.startsWith("--"));
const flags = new Set(args.slice(1).filter(a => a.startsWith("--")));
/** Value flags: `--primary #fff` → getFlagValue("--primary") === "#fff" */
function getFlagValue(name) {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : undefined;
}

// ── F58: JSON envelope emitters ──────────────────────────────────────────────
function emitJsonRaw(envelope) {
  process.stdout.write(JSON.stringify(envelope, null, 2) + "\n");
  process.exit(envelope.ok ? 0 : 1);
}

/** Convert an engine Result into the stable --json envelope and exit. */
function finishJson(result, okOverride) {
  const checks   = result.events.filter(e => ["ok", "warn", "error"].includes(e.level)).map(e => ({ level: e.level, message: e.message }));
  const warnings = result.events.filter(e => e.level === "warn").map(e => e.message);
  const errors   = [...result.errors];
  for (const e of result.events) {
    if (e.level === "error" && !errors.some(err => err.message === e.message)) {
      errors.push({ code: "ERROR", message: e.message });
    }
  }
  const okFlag = okOverride !== undefined ? okOverride : result.ok;
  const envelope = { ok: okFlag, command: cmd, version: VERSION, data: result.data, warnings, errors };
  if (result.filesWritten.length) envelope.filesWritten = result.filesWritten;
  if (result.filesDeleted.length) envelope.filesDeleted = result.filesDeleted;
  if (result.nextSteps.length)    envelope.nextSteps    = result.nextSteps;
  // doctor exposes its checks in data; other commands surface them here for parity
  void checks;
  emitJsonRaw(envelope);
}

function jsonDie(code, message, extra = {}) {
  emitJsonRaw({ ok: false, command: cmd, version: VERSION, data: {}, warnings: [], errors: [{ code, message, ...extra }] });
}

/** Shared human renderings for engine error codes; returns true if handled. */
function renderCommonError(result) {
  const err = result.errors[0];
  if (!err) return false;
  if (err.code === "NOT_INITIALIZED") { log(`\n${c.yellow}⚠ Run ${c.emerald}chameleon init${c.yellow} first.${c.reset}\n`); return true; }
  return false;
}

// ── init ──────────────────────────────────────────────────────────────────────
if (cmd === "init") {
  const result = initProject(ctx, { version: VERSION });
  if (JSON_MODE) finishJson(result);
  if (!result.ok && result.errors[0]?.code === "NO_PACKAGE_JSON") {
    log(`\n${c.emerald}➜${c.reset} ${c.indigo}Initializing Chameleon UI in your project...${c.reset}\n`);
    fail(result.errors[0].message); process.exit(1);
  }
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Initializing Chameleon UI in your project...${c.reset}\n`);
  renderEvents(result.events);
  log(`\n${c.emerald}✔ Chameleon UI ready!${c.reset}\n`);
  log(`${c.bold}${c.white}Next steps:${c.reset}`);
  log(`  ${c.gray}1.${c.reset} Make sure your CSS entry file starts with:`);
  log(`       ${c.cyan}@import "tailwindcss";`);
  log(`       @import "@chameleon-ui-lib/react/styles";${c.reset}`);
  log(`  ${c.gray}2.${c.reset} Wrap your app:  ${c.cyan}<ChameleonProvider initialTheme="simple" initialMode="light">${c.reset}`);
  log(`  ${c.gray}3.${c.reset} Add components: ${c.emerald}chameleon add button${c.reset}`);
  log(`  ${c.gray}4.${c.reset} Full page:      ${c.emerald}chameleon template dashboard${c.reset}`);
  log(`  ${c.gray}5.${c.reset} Health check:   ${c.emerald}chameleon doctor${c.reset}`);
  log(`  ${c.gray}6.${c.reset} See all:        ${c.emerald}chameleon list${c.reset}\n`);

// ── list ──────────────────────────────────────────────────────────────────────
} else if (cmd === "list") {
  const catalog = listCatalog();
  if (JSON_MODE) emitJsonRaw({ ok: true, command: cmd, version: VERSION, data: catalog, warnings: [], errors: [] });
  log(`\n${c.emerald}➜${c.reset} ${c.bold}${c.white}Chameleon UI Component Registry${c.reset}\n`);
  for (const group of ["Atom", "Molecule", "Composite"]) {
    const members = catalog.components.filter(m => m.category === group);
    log(`  ${c.bold}${c.cyan}${group}s (${members.length})${c.reset}`);
    for (const m of members) log(`  ${c.emerald}${m.name.padEnd(22)}${c.reset}${c.dim}${m.description}${c.reset}`);
    log("");
  }
  log(`  ${c.bold}${c.cyan}Templates (${catalog.templates.length})${c.reset}`);
  for (const m of catalog.templates) log(`  ${c.indigo}${m.name.padEnd(22)}${c.reset}${c.dim}${m.description}${c.reset}`);
  log("");
  info(`Use ${c.emerald}chameleon add <component>${c.gray} or ${c.emerald}chameleon template <name>${c.gray} to scaffold.`);
  log("");

// ── add ───────────────────────────────────────────────────────────────────────
} else if (cmd === "add") {
  const bulkFlag = [...flags].find(f => selectBulk(f));

  if (bulkFlag) {
    const keys = selectBulk(bulkFlag);
    const result = addComponents(ctx, keys, { bulk: true });
    if (JSON_MODE) finishJson(result);
    if (!result.ok) { if (!renderCommonError(result)) fail(result.errors[0].message); process.exit(1); }
    log(`\n${c.emerald}➜${c.reset} ${c.indigo}Adding ${keys.length} component(s) to your project...${c.reset}\n`);
    renderEvents(result.events);
    const added = result.data.added;
    log(`\n${c.emerald}Done!${c.reset} ${c.gray}${added.length} component(s) scaffolded.${c.reset}`);
    log(`${c.gray}Import all via:  ${c.cyan}import { ${added.slice(0, 3).map(r => r.export).join(", ")}${added.length > 3 ? ", ..." : ""} } from '${result.data.dir}'${c.reset}\n`);
    process.exit(0);
  }

  if (!item) {
    if (JSON_MODE) jsonDie("MISSING_ARGUMENT", "Missing component name. Usage: chameleon add <component> [--json]");
    log(`\n${c.red}✖ Missing component name${c.reset}\n  ${c.gray}Usage: ${c.emerald}chameleon add ${c.indigo}<component>${c.reset}`);
    log(`  ${c.gray}       ${c.emerald}chameleon add ${c.indigo}--all-atoms${c.gray}  (or --all-molecules, --all-composites, --all)${c.reset}\n`);
    process.exit(1);
  }
  const key = item.toLowerCase();
  if (!COMPONENTS[key]) {
    if (JSON_MODE) jsonDie("UNKNOWN_COMPONENT", `Unknown component: '${item}'. Run \`chameleon list --json\` for the catalog.`);
    log(`\n${c.red}✖ Unknown component: '${item}'${c.reset}`); info(`Run ${c.emerald}chameleon list${c.gray} to see all available components.`); log(""); process.exit(1);
  }
  const result = addComponents(ctx, [key]);
  if (JSON_MODE) finishJson(result);
  if (!result.ok) { if (!renderCommonError(result)) { log(""); renderEvents(result.events); log(""); } process.exit(1); }
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Adding ${c.white}${key}${c.indigo} to your project...${c.reset}\n`);
  renderEvents(result.events);
  log(`\n${c.emerald}Ready!${c.reset} ${c.gray}Import: ${c.cyan}import { ${result.data.added[0].export} } from '${result.data.dir}'${c.reset}\n`);

// ── remove ────────────────────────────────────────────────────────────────────
} else if (cmd === "remove") {
  if (!item) {
    if (JSON_MODE) jsonDie("MISSING_ARGUMENT", "Missing component name. Usage: chameleon remove <component> [--json]");
    log(`\n${c.red}✖ Missing component name${c.reset}\n  ${c.gray}Usage: ${c.emerald}chameleon remove ${c.indigo}<component>${c.reset}\n`); process.exit(1);
  }
  const result = removeComponent(ctx, item);
  if (JSON_MODE) finishJson(result);
  if (!result.ok) { renderCommonError(result); process.exit(1); }
  log(`\n${c.emerald}➜${c.reset} ${c.red}Removing ${c.white}${item.toLowerCase()}${c.red}...${c.reset}\n`);
  renderEvents(result.events);
  if (result.data.removed === null) { log(""); process.exit(0); }
  log(`\n${c.emerald}Done.${c.reset} ${c.gray}Component removed cleanly.${c.reset}\n`);

// ── theme ─────────────────────────────────────────────────────────────────────
} else if (cmd === "theme") {
  if (!item) {
    if (JSON_MODE) jsonDie("MISSING_ARGUMENT", "Missing theme name. Usage: chameleon theme <name> [--json]", { validThemes: VALID_THEMES });
    log(`\n${c.red}✖ Missing theme name${c.reset}\n  ${c.gray}Usage: ${c.emerald}chameleon theme ${c.indigo}<name>${c.reset}\n`); process.exit(1);
  }
  const result = setTheme(ctx, item);
  if (JSON_MODE) finishJson(result);
  if (!result.ok) {
    const err = result.errors[0];
    if (err.code === "INVALID_THEME") { log(`\n${c.red}✖ Invalid theme: '${item}'${c.reset}`); info(`Valid: ${VALID_THEMES.join(", ")}`); log(""); }
    else renderCommonError(result);
    process.exit(1);
  }
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Setting theme to ${c.bold}${c.white}${item}${c.reset}...\n`);
  renderEvents(result.events);
  log(`\n${c.emerald}Success!${c.reset} ${c.gray}Now using the ${c.cyan}${item}${c.gray} theme.${c.reset}\n`);

// ── themes ────────────────────────────────────────────────────────────────────
} else if (cmd === "themes") {
  const themes = listThemes();
  if (JSON_MODE) emitJsonRaw({ ok: true, command: cmd, version: VERSION, data: { themes }, warnings: [], errors: [] });
  log(`\n${c.emerald}➜${c.reset} ${c.bold}${c.white}Chameleon UI Themes${c.reset}\n`);
  for (const t of themes) log(`  ${c.cyan}${t.name.padEnd(14)}${c.reset}${c.dim}${t.description}${c.reset}`);
  log("");
  info(`Use ${c.emerald}chameleon theme <name>${c.gray} to apply.`);
  log("");

// ── template ──────────────────────────────────────────────────────────────────
} else if (cmd === "template") {
  if (!item) {
    if (JSON_MODE) jsonDie("MISSING_ARGUMENT", "Missing template name. Usage: chameleon template <name> [--json]", { available: Object.keys(TEMPLATES) });
    log(`\n${c.red}✖ Missing template name${c.reset}\n  ${c.gray}Usage: ${c.emerald}chameleon template ${c.indigo}<name>${c.reset}\n`);
    log(`  ${c.gray}Available: ${Object.keys(TEMPLATES).join(", ")}${c.reset}\n`);
    process.exit(1);
  }
  const result = scaffoldTemplate(ctx, item);
  if (JSON_MODE) finishJson(result);
  if (!result.ok) {
    const err = result.errors[0];
    if (err.code === "UNKNOWN_TEMPLATE") { log(`\n${c.red}✖ Unknown template: '${item}'${c.reset}`); info(`Available: ${Object.keys(TEMPLATES).join(", ")}`); log(""); }
    else if (err.code === "SOURCE_NOT_FOUND") { log(`\n${c.emerald}➜${c.reset} ${c.indigo}Scaffolding template: ${c.white}${item.toLowerCase()}${c.reset}...\n`); fail(err.message); }
    else renderCommonError(result);
    process.exit(1);
  }
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Scaffolding template: ${c.white}${result.data.template}${c.reset}...\n`);
  renderEvents(result.events);
  log(`\n${c.emerald}Success!${c.reset} ${c.gray}Import: ${c.cyan}import { ${result.data.export} } from './pages/${result.data.template}'${c.reset}\n`);

// ── info ──────────────────────────────────────────────────────────────────────
} else if (cmd === "info") {
  if (!item) {
    if (JSON_MODE) jsonDie("MISSING_ARGUMENT", "Missing component name. Usage: chameleon info <component> [--json]");
    log(`\n${c.red}✖ Missing component name${c.reset}\n  ${c.gray}Usage: ${c.emerald}chameleon info ${c.indigo}<component>${c.reset}\n`); process.exit(1);
  }
  const data = getInfo(item);
  if (!data) {
    if (JSON_MODE) jsonDie("UNKNOWN_ITEM", `Unknown item: '${item}'. Run \`chameleon list --json\` for the catalog.`);
    log(`\n${c.red}✖ Unknown item: '${item}'${c.reset}`); info(`Run ${c.emerald}chameleon list${c.gray} to see all available items.`); log(""); process.exit(1);
  }
  if (JSON_MODE) emitJsonRaw({ ok: true, command: cmd, version: VERSION, data, warnings: [], errors: [] });
  log(`\n${c.emerald}➜${c.reset} ${c.bold}${c.white}${data.name}${c.reset}\n`);
  log(`  ${c.gray}Category:${c.reset}     ${data.category}`);
  log(`  ${c.gray}Description:${c.reset}  ${data.description}`);
  log(`  ${c.gray}Source file:${c.reset}  ${data.sourceFile}`);
  if (data.variants)     log(`  ${c.gray}Variants:${c.reset}     ${data.variants.join(", ")}`);
  if (data.dependencies) log(`  ${c.gray}Dependencies:${c.reset} ${data.dependencies.length > 0 ? data.dependencies.join(", ") : "none (self-contained)"}`);
  if (data.export)       log(`  ${c.gray}Export name:${c.reset}  ${data.export}`);
  log("");

// ── doctor ────────────────────────────────────────────────────────────────────
} else if (cmd === "doctor") {
  const result = doctor(ctx);
  if (JSON_MODE) finishJson(result, result.data.healthy);
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Running Chameleon diagnostics...${c.reset}\n`);
  renderEvents(result.events);
  if (result.data.issues === 0) { log(`\n${c.emerald}All checks passed!${c.reset} ${c.gray}Your project is healthy.${c.reset}\n`); }
  else { log(`\n${c.yellow}${result.data.issues} issue(s) found.${c.reset} ${c.gray}Address the warnings above.${c.reset}\n`); }

// ── diff ──────────────────────────────────────────────────────────────────────
} else if (cmd === "diff") {
  const result = diffComponents(ctx);
  if (JSON_MODE) finishJson(result);
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Comparing local components to library source...${c.reset}\n`);
  if (!result.ok) { renderCommonError(result); process.exit(1); }
  renderEvents(result.events);
  if (result.data.components.length === 0) { log(""); process.exit(0); }
  if (result.data.outOfSync === 0) { log(`\n${c.emerald}All components are in sync.${c.reset}\n`); }
  else { log(`\n${c.yellow}${result.data.outOfSync} component(s) out of sync.${c.reset} ${c.gray}Run ${c.emerald}chameleon update${c.gray} to fix.${c.reset}\n`); }

// ── update ────────────────────────────────────────────────────────────────────
} else if (cmd === "update") {
  const result = updateComponents(ctx);
  if (JSON_MODE) finishJson(result);
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Updating scaffolded components...${c.reset}\n`);
  if (!result.ok) { renderCommonError(result); process.exit(1); }
  renderEvents(result.events);
  if (result.data.updated.length === 0 && result.data.upToDate.length === 0) { log(""); process.exit(0); }
  if (result.data.updated.length === 0) { log(`\n${c.emerald}Everything is already up to date.${c.reset}\n`); }
  else { log(`\n${c.emerald}Update complete!${c.reset} ${c.gray}${result.data.updated.length} component(s) updated.${c.reset}\n`); }

// ── recipes ───────────────────────────────────────────────────────────────────
} else if (cmd === "recipes") {
  const recipes = listRecipes();
  if (JSON_MODE) emitJsonRaw({ ok: true, command: cmd, version: VERSION, data: { recipes }, warnings: [], errors: [] });
  log(`\n${c.emerald}➜${c.reset} ${c.bold}${c.white}Chameleon Composition Recipes${c.reset} ${c.dim}(stored ChameleonSpecs)${c.reset}\n`);
  for (const rcp of recipes) log(`  ${c.emerald}${rcp.name.padEnd(20)}${c.reset}${c.dim}${rcp.description}${c.reset}`);
  log("");
  info(`Use ${c.emerald}chameleon compose <recipe>${c.gray} to scaffold, or ${c.emerald}chameleon compose <recipe> --json${c.gray} for the spec.`);
  log("");

// ── compose ───────────────────────────────────────────────────────────────────
} else if (cmd === "compose") {
  if (!item) {
    if (JSON_MODE) jsonDie("MISSING_ARGUMENT", "Missing spec. Usage: chameleon compose <spec-file.json | recipe-name> [--json]");
    log(`\n${c.red}✖ Missing spec${c.reset}\n  ${c.gray}Usage: ${c.emerald}chameleon compose ${c.indigo}<spec-file.json | recipe-name>${c.reset}\n`);
    log(`  ${c.gray}Recipes: ${listRecipes().map(r => r.name).join(", ")}${c.reset}\n`);
    process.exit(1);
  }
  let spec;
  const recipe = getRecipe(item);
  if (recipe) {
    spec = recipe.spec;
  } else if (fs.existsSync(path.resolve(process.cwd(), item))) {
    try { spec = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), item), "utf8")); }
    catch {
      if (JSON_MODE) jsonDie("INVALID_SPEC", `Could not parse JSON from '${item}'.`);
      log(`\n${c.red}✖ Could not parse JSON from '${item}'${c.reset}\n`); process.exit(1);
    }
  } else {
    if (JSON_MODE) jsonDie("UNKNOWN_RECIPE", `'${item}' is neither a recipe nor a spec file.`, { recipes: listRecipes().map(r => r.name) });
    log(`\n${c.red}✖ '${item}' is neither a recipe nor a spec file${c.reset}`);
    info(`Recipes: ${listRecipes().map(r => r.name).join(", ")}`); log(""); process.exit(1);
  }
  if (flags.has("--validate-only")) {
    const v = validateSpec(spec);
    if (JSON_MODE) emitJsonRaw({ ok: v.valid, command: cmd, version: VERSION, data: v, warnings: [], errors: v.valid ? [] : [{ code: "INVALID_SPEC", message: `Spec failed validation with ${v.errors.length} error(s).`, validationErrors: v.errors }] });
    log(`\n${c.emerald}➜${c.reset} ${c.indigo}Validating spec...${c.reset}\n`);
    if (v.valid) { ok("Spec is valid"); log(""); process.exit(0); }
    for (const e of v.errors) fail(`${e.path}: ${e.message}${e.suggestion ? ` (did you mean: ${e.suggestion}?)` : ""}`);
    log(""); process.exit(1);
  }
  const result = scaffoldSpec(ctx, spec);
  if (JSON_MODE) finishJson(result);
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Composing ${c.white}${spec?.name ?? item}${c.indigo} from spec...${c.reset}\n`);
  if (!result.ok) {
    if (!renderCommonError(result)) {
      const err = result.errors[0];
      fail(err.message);
      for (const e of err.validationErrors || []) fail(`${e.path}: ${e.message}${e.suggestion ? ` (did you mean: ${e.suggestion}?)` : ""}`);
    }
    log(""); process.exit(1);
  }
  renderEvents(result.events);
  log(`\n${c.emerald}Success!${c.reset} ${c.gray}${result.nextSteps[0] || ""}${c.reset}\n`);

// ── config ────────────────────────────────────────────────────────────────────
} else if (cmd === "config") {
  const cfg = readConfig(ctx);
  if (!cfg) {
    if (JSON_MODE) jsonDie("NOT_INITIALIZED", "No chameleon.config.json found. Run `chameleon init` to create one.");
    log(`\n${c.yellow}⚠ No chameleon.config.json found.${c.reset}`); info(`Run ${c.emerald}chameleon init${c.gray} to create one.`); log(""); process.exit(1);
  }
  if (JSON_MODE) emitJsonRaw({ ok: true, command: cmd, version: VERSION, data: { config: cfg, path: ctx.configFile }, warnings: [], errors: [] });
  log(`\n${c.emerald}➜${c.reset} ${c.bold}${c.white}chameleon.config.json${c.reset} ${c.dim}(${ctx.configFile})${c.reset}\n`);
  const fieldColor = { theme: c.cyan, mode: c.cyan, lang: c.cyan, dir: c.indigo, pagesDir: c.indigo, css: c.indigo, version: c.gray };
  for (const [key, val] of Object.entries(cfg)) log(`  ${(fieldColor[key] || c.white)}${key.padEnd(12)}${c.reset}${c.white}${val}${c.reset}`);
  log("");
  info(`Edit ${c.emerald}chameleon.config.json${c.gray} directly, or use ${c.emerald}chameleon theme <name>${c.gray} to change the theme.`);
  log("");

// ── preview ───────────────────────────────────────────────────────────────────
} else if (cmd === "preview") {
  if (!item) {
    if (JSON_MODE) jsonDie("MISSING_ARGUMENT", "Usage: chameleon preview <spec-file.json | recipe-name> [--base-url http://localhost:5173] [--themes all] [--json]");
    log(`\n${c.red}✖ Missing spec${c.reset}\n  ${c.gray}Usage: ${c.emerald}chameleon preview ${c.indigo}<spec-file.json | recipe-name>${c.gray} [--base-url ...] [--themes all]${c.reset}\n`); process.exit(1);
  }
  let spec;
  const recipe = getRecipe(item);
  if (recipe) spec = recipe.spec;
  else if (fs.existsSync(path.resolve(process.cwd(), item))) {
    try { spec = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), item), "utf8")); }
    catch { if (JSON_MODE) jsonDie("INVALID_SPEC", `Could not parse JSON from '${item}'.`); log(`\n${c.red}✖ Could not parse JSON from '${item}'${c.reset}\n`); process.exit(1); }
  } else {
    if (JSON_MODE) jsonDie("UNKNOWN_RECIPE", `'${item}' is neither a recipe nor a spec file.`);
    log(`\n${c.red}✖ '${item}' is neither a recipe nor a spec file${c.reset}\n`); process.exit(1);
  }
  const result = await previewSpec(ctx, spec, {
    baseUrl: getFlagValue("--base-url") || "http://localhost:5173",
    themes: [getFlagValue("--themes") || "current"],
  });
  if (JSON_MODE) finishJson(result);
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Previewing ${c.white}${spec?.name ?? item}${c.indigo} (${result.data?.level ?? "static"} audit)...${c.reset}\n`);
  if (!result.ok) {
    fail(result.errors[0].message);
    for (const e of result.errors[0].validationErrors || []) fail(`${e.path}: ${e.message}${e.suggestion ? ` (did you mean: ${e.suggestion}?)` : ""}`);
    log(""); process.exit(1);
  }
  renderEvents(result.events);
  log(`\n${c.emerald}Preview ready.${c.reset} ${c.gray}Playground: ${c.cyan}${result.data.playUrl}${c.reset}\n`);

// ── brand ─────────────────────────────────────────────────────────────────────
} else if (cmd === "brand") {
  const sub = item;
  const usage = () => {
    if (JSON_MODE) jsonDie("MISSING_ARGUMENT", "Usage: chameleon brand <init|check|from-url|from-logo> [options] [--json]");
    log(`\n${c.red}✖ Unknown brand subcommand${c.reset}`);
    log(`  ${c.gray}Usage: ${c.emerald}chameleon brand init ${c.indigo}--primary #hex${c.gray} [--secondary #hex] [--accent #hex] [--font Name] [--radius 0.75rem]${c.reset}`);
    log(`  ${c.gray}       ${c.emerald}chameleon brand check${c.reset}`);
    log(`  ${c.gray}       ${c.emerald}chameleon brand from-url ${c.indigo}<url>${c.reset}`);
    log(`  ${c.gray}       ${c.emerald}chameleon brand from-logo ${c.indigo}<logo.svg>${c.reset}\n`);
    process.exit(1);
  };
  const renderBrandResult = (result, intro, outro) => {
    if (JSON_MODE) finishJson(result);
    log(`\n${c.emerald}➜${c.reset} ${c.indigo}${intro}${c.reset}\n`);
    if (!result.ok && result.errors[0] && !result.events.length) { fail(result.errors[0].message); log(""); process.exit(1); }
    renderEvents(result.events);
    if (!result.ok) { log(`\n${c.yellow}${result.errors[0]?.message || "Check failed."}${c.reset}\n`); process.exit(1); }
    log(`\n${c.emerald}${outro}${c.reset}`);
    for (const s of result.nextSteps) info(s);
    log("");
  };
  if (sub === "init") {
    const result = brandInit(ctx, {
      primaryColor: getFlagValue("--primary"),
      secondaryColor: getFlagValue("--secondary"),
      accentColor: getFlagValue("--accent"),
      fontFamily: getFlagValue("--font"),
      radius: getFlagValue("--radius"),
    });
    renderBrandResult(result, "Initializing brand tokens...", "Brand ready!");
  } else if (sub === "check") {
    renderBrandResult(brandCheck(ctx), "Auditing brand contrast (WCAG AA)...", "All brand pairs pass AA.");
  } else if (sub === "from-url") {
    const url = args.slice(2).find(a => !a.startsWith("--"));
    if (!url) usage();
    const result = await brandFromUrl(url);
    if (JSON_MODE) finishJson(result);
    log(`\n${c.emerald}➜${c.reset} ${c.indigo}Extracting brand candidates from ${c.white}${url}${c.indigo}...${c.reset}\n`);
    if (!result.ok) { fail(result.errors[0].message); log(""); process.exit(1); }
    for (const cc of result.data.colorCandidates) log(`  ${c.cyan}${cc.color}${c.reset}  ${c.dim}×${cc.occurrences} (${cc.sources.join(", ")})${c.reset}`);
    if (result.data.fontCandidates.length) log(`\n  ${c.gray}Fonts:${c.reset} ${result.data.fontCandidates.join(", ")}`);
    log(""); for (const s of result.nextSteps) info(s); log("");
  } else if (sub === "from-logo") {
    const file = args.slice(2).find(a => !a.startsWith("--"));
    if (!file) usage();
    const result = brandFromLogo(ctx, file);
    if (JSON_MODE) finishJson(result);
    log(`\n${c.emerald}➜${c.reset} ${c.indigo}Extracting brand candidates from ${c.white}${file}${c.indigo}...${c.reset}\n`);
    if (!result.ok) { fail(result.errors[0].message); log(""); process.exit(1); }
    for (const cc of result.data.colorCandidates) log(`  ${c.cyan}${cc.color}${c.reset}  ${c.dim}×${cc.occurrences}${c.reset}`);
    log(""); for (const s of result.nextSteps) info(s); log("");
  } else usage();

// ── agents ────────────────────────────────────────────────────────────────────
} else if (cmd === "agents") {
  if (item !== "init") {
    if (JSON_MODE) jsonDie("MISSING_ARGUMENT", "Usage: chameleon agents init [--json]");
    log(`\n${c.red}✖ Unknown subcommand${c.reset}\n  ${c.gray}Usage: ${c.emerald}chameleon agents init${c.reset}\n`); process.exit(1);
  }
  const result = agentsInit(ctx, { version: VERSION });
  if (JSON_MODE) finishJson(result);
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Writing Chameleon agent rulesets...${c.reset}\n`);
  if (!result.ok) { renderCommonError(result); process.exit(1); }
  renderEvents(result.events);
  log(`\n${c.emerald}Done!${c.reset} ${c.gray}Coding agents in this project now know the Chameleon catalog and workflow.${c.reset}\n`);

// ── mcp ───────────────────────────────────────────────────────────────────────
} else if (cmd === "mcp") {
  // Start the MCP server (F60). stdout must stay clean for JSON-RPC.
  await import("./mcp-server.mjs");

// ── dev ───────────────────────────────────────────────────────────────────────
} else if (cmd === "dev") {
  if (JSON_MODE) jsonDie("INTERACTIVE_COMMAND", "`chameleon dev` launches an interactive dev server and does not support --json.");
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Starting Chameleon UI playground...${c.reset}\n`);
  const viteBin = path.join(LIB_ROOT, "node_modules", ".bin", "vite");
  if (!fs.existsSync(viteBin)) { fail(`Vite not found at ${viteBin}`); process.exit(1); }
  log(`  ${c.gray}Library root: ${LIB_ROOT}${c.reset}`);
  log(`  ${c.bold}➜${c.reset}  ${c.white}Local:${c.reset}   ${c.cyan}http://localhost:5173${c.reset}`);
  log(`  ${c.gray}Press Ctrl+C to stop${c.reset}\n`);
  const child = spawn(viteBin, [], { cwd: LIB_ROOT, stdio: "inherit" });
  child.on("error", (err) => { fail(`Failed to start: ${err.message}`); process.exit(1); });
  child.on("exit", (code) => process.exit(code ?? 0));

// ── unknown ───────────────────────────────────────────────────────────────────
} else {
  if (JSON_MODE) jsonDie("UNKNOWN_COMMAND", `Unknown command: '${cmd}'. Run \`chameleon --help\` for valid commands.`);
  log(`\n${c.red}✖ Unknown command: '${cmd}'${c.reset}`);
  info(`Run ${c.emerald}chameleon --help${c.gray} for a list of valid commands.`);
  log("");
  process.exit(1);
}
