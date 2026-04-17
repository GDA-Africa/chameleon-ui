#!/usr/bin/env node
/**
 * build-css.mjs
 *
 * Produces dist/styles.css — the single consolidated CSS entry for
 * @chameleon-ui-lib/react/styles.
 *
 * Layer order (matters for cascade correctness):
 *   1. @custom-variant declarations  (from fonts.css — Tailwind dark-mode variant)
 *   2. Theme tokens                  (from theme.css — CSS custom properties)
 *   3. App-level base styles         (from index.css — ambient, scrollbar, layout)
 *
 * The Tailwind @import directives are intentionally excluded here because they
 * must be added by the consumer's own CSS entry so Tailwind can scan their
 * source files.  The correct consumer setup is:
 *
 *   @import "tailwindcss";                    // consumer owns this
 *   @import "@chameleon-ui-lib/react/styles"; // this file
 *
 * This order avoids the PostCSS "@import must precede all other rules" warning.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "dist");
const OUT_FILE = path.join(OUT_DIR, "styles.css");

// Source files in cascade order
const SOURCES = [
  path.join(ROOT, "src", "styles", "fonts.css"),
  path.join(ROOT, "src", "styles", "theme.css"),
  path.join(ROOT, "src", "styles", "index.css"),
];

// Lines in index.css that import other CSS — must NOT be in the bundle
// (they reference files relative to the library source tree)
const SKIP_PATTERNS = [
  /^@import\s+["']\.\/fonts\.css["']/,
  /^@import\s+["']\.\/tailwind\.css["']/,
  /^@import\s+["']tailwindcss["']/,
  /^@import\s+["']tw-animate-css["']/,
  /^@import\s+["']\.\/theme\.css["']/,
];

function readSource(filePath) {
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf8");
}

function processSource(content) {
  return content
    .split("\n")
    .filter((line) => !SKIP_PATTERNS.some((p) => p.test(line.trim())))
    .join("\n");
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const banner = `/*! @chameleon-ui-lib/react — styles
 * Generated: ${new Date().toISOString()}
 *
 * IMPORTANT — Consumer CSS entry order:
 *   @import "tailwindcss";
 *   @import "@chameleon-ui-lib/react/styles";
 *
 * The Tailwind @import MUST precede this import to avoid PostCSS warnings.
 */\n\n`;

const parts = SOURCES.map((src) => {
  const raw = readSource(src);
  const label = `/* ── ${path.basename(src)} ${"─".repeat(Math.max(0, 56 - path.basename(src).length))} */\n\n`;
  return label + processSource(raw).trim();
}).filter(Boolean);

fs.writeFileSync(OUT_FILE, banner + parts.join("\n\n") + "\n", "utf8");
console.log(`✔  dist/styles.css written (${fs.statSync(OUT_FILE).size} bytes)`);
