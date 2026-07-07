#!/usr/bin/env node
/**
 * build-widget.mjs (F71) — vite-build the MCP Apps widget, then inline the
 * emitted JS + CSS into one self-contained dist-widget/widget.html and report
 * the gzipped size against the library's budget discipline.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "dist-widget");

console.log("▶ Building widget bundle...");
execSync("npx vite build --config vite.config.widget.ts", { cwd: ROOT, stdio: "inherit" });

const htmlPath = path.join(OUT, "src", "widget", "widget.html");
const htmlOut  = path.join(OUT, "widget.html");
let html = fs.readFileSync(fs.existsSync(htmlPath) ? htmlPath : htmlOut, "utf8");

// Inline every emitted script/stylesheet
html = html.replace(/<script[^>]*src="([^"]+)"[^>]*><\/script>/g, (_, src) => {
  const file = path.join(OUT, src.replace(/^\//, ""));
  return `<script type="module">${fs.readFileSync(file, "utf8")}</script>`;
});
html = html.replace(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (_, href) => {
  const file = path.join(OUT, href.replace(/^\//, ""));
  return `<style>${fs.readFileSync(file, "utf8")}</style>`;
});

fs.writeFileSync(htmlOut, html, "utf8");
const gz = zlib.gzipSync(html).length;
console.log(`✔ dist-widget/widget.html — ${(html.length / 1024).toFixed(0)}KB raw, ${(gz / 1024).toFixed(0)}KB gzipped`);
if (gz > 400 * 1024) console.warn("⚠ Widget exceeds 400KB gzipped — consider a chat-safe component subset.");
