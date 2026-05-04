#!/usr/bin/env node
/**
 * build-src.mjs
 *
 * Copies the scaffoldable source files (atoms, molecules, composites, templates)
 * into lib-src/ at the package root so they are included in the published npm
 * package and accessible by the chameleon CLI at runtime.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src", "app", "components", "chameleon");
const OUT = path.join(ROOT, "lib-src");

const FILES = [
  "utils.ts",
  "context.tsx",
  "animations.tsx",
  "atoms.tsx",
  "molecules.tsx",
  "composites.tsx",
  "auth-components.tsx",
  "auth-showcase.tsx",
  "templates.tsx",
  "comprehensive-templates.tsx",
  "comprehensive-templates-part2.tsx",
];

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

for (const file of FILES) {
  const src = path.join(SRC, file);
  const dest = path.join(OUT, file);
  if (!fs.existsSync(src)) {
    console.error(`✖  Missing source: ${src}`);
    process.exit(1);
  }
  fs.copyFileSync(src, dest);
  console.log(`✔  lib-src/${file} (${fs.statSync(dest).size} bytes)`);
}
