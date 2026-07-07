/**
 * Chameleon Engine — remote registry (F72/F73, Phase 15).
 *
 * Registry index (registry.json):
 *   {
 *     "version": 1, "name": "chameleon-first-party",
 *     "items": [
 *       { "name": "hero-parallax", "type": "spec",   "version": "1.0.0",
 *         "description": "...", "keywords": [...], "chameleonVersion": ">=1.2.0",
 *         "spec": { ...ChameleonSpec v1, inline... } },
 *       { "name": "fancy-button", "type": "source", "version": "1.0.0",
 *         "description": "...", "keywords": [...], "chameleonVersion": ">=1.2.0",
 *         "integrity": "<sha256 hex of concatenated file contents>",
 *         "files": [{ "path": "src/components/ui/fancy-button.tsx", "contentBase64": "..." }] }
 *     ]
 *   }
 *
 * Trust model: spec items are safe by construction (schema-validated, no code).
 * Source items REQUIRE integrity verification + explicit confirmation
 * (engine returns CONFIRM_REQUIRED with a preview unless opts.confirmed).
 */

import fs from "fs";
import path from "path";
import crypto from "node:crypto";
import { Buffer } from "node:buffer";
import { makeResult, addError, evOk, evInfo, requireConfig, readConfig, writeConfig } from "./core.mjs";
import { validateSpec, scaffoldSpec } from "./spec.mjs";

export const DEFAULT_REGISTRY = "https://chameleon.glenhalton.com/registry.json";
const fetch = globalThis.fetch;

/** Fetch and parse a registry index from https URL or local path. */
export async function fetchRegistry(source = DEFAULT_REGISTRY) {
  let text;
  if (/^https?:\/\//.test(source)) {
    const res = await fetch(source, { redirect: "follow" });
    if (!res.ok) throw new Error(`Registry fetch failed: ${res.status} ${res.statusText}`);
    text = await res.text();
  } else {
    const p = path.resolve(source.replace(/^file:\/\//, ""));
    if (!fs.existsSync(p)) throw new Error(`Registry file not found: ${p}`);
    text = fs.readFileSync(p, "utf8");
  }
  const idx = JSON.parse(text);
  if (idx.version !== 1 || !Array.isArray(idx.items)) throw new Error("Unsupported registry index format.");
  return idx;
}

export async function listRegistry(source) {
  const r = makeResult();
  let idx;
  try { idx = await fetchRegistry(source); }
  catch (e) { return addError(r, "REGISTRY_UNAVAILABLE", e.message); }
  r.data = {
    registry: idx.name || source || DEFAULT_REGISTRY,
    items: idx.items.map(({ name, type, version, description, keywords }) => ({ name, type, version, description, keywords })),
  };
  return r;
}

export async function searchRegistry(query, source) {
  const r = await listRegistry(source);
  if (!r.ok) return r;
  const q = String(query).toLowerCase();
  const terms = q.split(/\s+/);
  r.data.items = r.data.items
    .map((it) => {
      const hay = `${it.name} ${it.description} ${(it.keywords || []).join(" ")}`.toLowerCase();
      let score = 0;
      if (it.name === q) score += 100;
      for (const t of terms) { if (it.name.includes(t)) score += 20; if (hay.includes(t)) score += 5; }
      return { ...it, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return r;
}

const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");

/**
 * Install a registry item.
 * opts: { source?: registry url/path, confirmed?: boolean }
 * Source items without confirmed:true fail with CONFIRM_REQUIRED + preview.
 */
export async function addRegistryItem(ctx, name, opts = {}) {
  const r = makeResult();
  const cfg = requireConfig(ctx, r);
  if (!cfg) return r;

  let idx;
  try { idx = await fetchRegistry(opts.source); }
  catch (e) { return addError(r, "REGISTRY_UNAVAILABLE", e.message); }

  const item = idx.items.find((x) => x.name === String(name).toLowerCase());
  if (!item) {
    return addError(r, "UNKNOWN_REGISTRY_ITEM", `'${name}' not found in registry '${idx.name || "registry"}'.`, {
      available: idx.items.map((x) => x.name),
    });
  }

  if (item.type === "spec") {
    const v = validateSpec(item.spec);
    if (!v.valid) return addError(r, "INVALID_SPEC", `Registry item '${name}' carries an invalid spec.`, { validationErrors: v.errors });
    evOk(r, `'${name}' is a spec item — validated against the local catalog`);
    const sub = scaffoldSpec(ctx, item.spec);
    // merge sub-result
    r.events.push(...sub.events);
    r.filesWritten.push(...sub.filesWritten);
    r.nextSteps.push(...sub.nextSteps);
    r.errors.push(...sub.errors);
    r.ok = sub.ok;
    r.data = { name: item.name, type: "spec", version: item.version, ...sub.data };
  } else if (item.type === "source") {
    if (!Array.isArray(item.files) || !item.integrity) {
      return addError(r, "MALFORMED_ITEM", `Source item '${name}' is missing files or integrity hash.`);
    }
    const contents = item.files.map((f) => ({ path: f.path, content: Buffer.from(f.contentBase64, "base64") }));
    const digest = sha256(Buffer.concat(contents.map((c) => c.content)));
    if (digest !== item.integrity) {
      return addError(r, "INTEGRITY_MISMATCH", `Integrity check failed for '${name}' — expected ${item.integrity}, got ${digest}. Refusing to install.`);
    }
    evOk(r, `Integrity verified (sha256:${digest.slice(0, 12)}…)`);
    if (!opts.confirmed) {
      return addError(r, "CONFIRM_REQUIRED", `'${name}' installs source code into your project — review and re-run with --yes.`, {
        files: contents.map((c) => ({ path: c.path, bytes: c.content.length, preview: c.content.toString("utf8").slice(0, 400) })),
      });
    }
    for (const c of contents) {
      const target = path.join(ctx.cwd, c.path);
      if (!path.resolve(target).startsWith(path.resolve(ctx.cwd))) {
        return addError(r, "MALFORMED_ITEM", `Refusing path outside project: ${c.path}`);
      }
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, c.content);
      r.filesWritten.push(c.path);
      evOk(r, `${c.path} installed`);
    }
    r.data = { name: item.name, type: "source", version: item.version, files: contents.map((c) => c.path) };
  } else {
    return addError(r, "MALFORMED_ITEM", `Unknown item type: '${item.type}'.`);
  }

  // Provenance for chameleon update/diff of remote items
  if (r.ok) {
    const fresh = readConfig(ctx);
    fresh.remotes = { ...(fresh.remotes || {}), [item.name]: { registry: opts.source || DEFAULT_REGISTRY, version: item.version, type: item.type, installedAt: new Date().toISOString().slice(0, 10) } };
    writeConfig(ctx, fresh, r);
    evInfo(r, "Provenance recorded in chameleon.config.json (remotes)");
  }
  return r;
}

/** Helper for registry authors: package a spec or source dir into an item. */
export function packageRegistryItem({ name, description, keywords = [], version = "1.0.0", spec, files }) {
  if (spec) {
    const v = validateSpec(spec);
    if (!v.valid) throw new Error(`Invalid spec: ${v.errors.map((e) => e.message).join("; ")}`);
    return { name, type: "spec", version, description, keywords, chameleonVersion: ">=1.2.0", spec };
  }
  const contents = files.map((f) => ({ path: f.path, content: fs.readFileSync(f.absPath) }));
  return {
    name, type: "source", version, description, keywords, chameleonVersion: ">=1.2.0",
    integrity: sha256(Buffer.concat(contents.map((c) => c.content))),
    files: contents.map((c) => ({ path: c.path, contentBase64: c.content.toString("base64") })),
  };
}
