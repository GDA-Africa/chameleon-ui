#!/usr/bin/env node
/**
 * build-registry.mjs (F72) — generate the first-party registry index from the
 * built-in recipes. Served at chameleon.glenhalton.com/registry.json.
 * Community items land here via PR review (no open submission endpoint).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RECIPES } from "../bin/engine/recipes.mjs";
import { packageRegistryItem } from "../bin/engine/remote-registry.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "registry.json");

const index = {
  version: 1,
  name: "chameleon-first-party",
  generated: new Date().toISOString().slice(0, 10),
  items: RECIPES.map((r) =>
    packageRegistryItem({ name: r.name, description: r.description, keywords: r.keywords, spec: r.spec }),
  ),
};

fs.writeFileSync(OUT, JSON.stringify(index, null, 2) + "\n", "utf8");
console.log(`✔ public/registry.json — ${index.items.length} item(s)`);
