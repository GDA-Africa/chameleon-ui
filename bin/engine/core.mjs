/**
 * Chameleon Engine — core context, config I/O, and result shape (F59).
 *
 * Every engine operation returns a Result:
 *   {
 *     ok:           boolean,
 *     data:         object,                 // operation-specific payload
 *     events:       [{ level, message }],  // ordered log: "ok"|"warn"|"error"|"info"|"dim"
 *     filesWritten: string[],
 *     filesDeleted: string[],
 *     nextSteps:    string[],
 *     errors:       [{ code, message, ...extra }],
 *   }
 *
 * Engine functions NEVER print and NEVER call process.exit — skins (CLI, MCP)
 * render events/errors however they like.
 */

import fs from "fs";
import path from "path";
import process from "node:process";

/** Create an engine context rooted at a consumer project + the library install. */
export function createContext({ cwd = process.cwd(), libRoot }) {
  const libSrc = fs.existsSync(path.join(libRoot, "lib-src"))
    ? path.join(libRoot, "lib-src")
    : path.join(libRoot, "src", "app", "components", "chameleon");
  return { cwd, libRoot, libSrc, configFile: path.join(cwd, "chameleon.config.json") };
}

/** Create an empty Result. */
export function makeResult() {
  return { ok: true, data: {}, events: [], filesWritten: [], filesDeleted: [], nextSteps: [], errors: [] };
}

export const evOk   = (r, message) => r.events.push({ level: "ok", message });
export const evWarn = (r, message) => r.events.push({ level: "warn", message });
export const evInfo = (r, message) => r.events.push({ level: "info", message });
export const evDim  = (r, message) => r.events.push({ level: "dim", message });
export const evErr  = (r, message) => r.events.push({ level: "error", message });

/** Record a fatal error; sets ok=false. */
export function addError(r, code, message, extra = {}) {
  r.ok = false;
  r.errors.push({ code, message, ...extra });
  return r;
}

export function readConfig(ctx) {
  if (!fs.existsSync(ctx.configFile)) return null;
  try { return JSON.parse(fs.readFileSync(ctx.configFile, "utf8")); } catch { return null; }
}

export function writeConfig(ctx, cfg, r) {
  fs.writeFileSync(ctx.configFile, JSON.stringify(cfg, null, 2) + "\n", "utf8");
  if (r) r.filesWritten.push("chameleon.config.json");
}

export function readProjectPkg(ctx) {
  const p = path.join(ctx.cwd, "package.json");
  if (!fs.existsSync(p)) return null;
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return null; }
}

/** Guard: require chameleon.config.json; returns cfg or records NOT_INITIALIZED. */
export function requireConfig(ctx, r) {
  const cfg = readConfig(ctx);
  if (!cfg) addError(r, "NOT_INITIALIZED", "No chameleon.config.json found. Run `chameleon init` first.");
  return cfg;
}
