/**
 * Chameleon Engine — catalog queries (F59).
 */

import { COMPONENTS, TEMPLATES, VALID_THEMES, THEME_DESCRIPTIONS } from "./registry.mjs";

/** Full catalog as plain data. */
export function listCatalog() {
  return {
    components: Object.entries(COMPONENTS).map(([name, m]) => ({
      name, category: m.category, description: m.desc, variants: m.variants, dependencies: m.deps, sourceFile: m.file,
    })),
    templates: Object.entries(TEMPLATES).map(([name, m]) => ({
      name, export: m.export, description: m.desc, sourceFile: m.file,
    })),
    themes: VALID_THEMES,
  };
}

/** Info for a component or template, or null. */
export function getInfo(name) {
  const key = String(name).toLowerCase();
  const meta = COMPONENTS[key] || TEMPLATES[key];
  if (!meta) return null;
  return {
    name: key,
    kind: COMPONENTS[key] ? "component" : "template",
    category: meta.category || "Template",
    description: meta.desc,
    sourceFile: `src/app/components/chameleon/${meta.file}`,
    ...(meta.variants ? { variants: meta.variants } : {}),
    ...(meta.deps ? { dependencies: meta.deps } : {}),
    ...(meta.export ? { export: meta.export } : {}),
  };
}

export function listThemes() {
  return Object.entries(THEME_DESCRIPTIONS).map(([name, description]) => ({ name, description }));
}

/**
 * Keyword search across components and templates (name, description, category,
 * variants). Returns matches ranked: exact name > name substring > description.
 * Foundation for the MCP `search_components` tool (F60).
 */
export function searchCatalog(query) {
  const q = String(query).toLowerCase().trim();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const score = (name, hay) => {
    let s = 0;
    if (name === q) s += 100;
    if (name.includes(q)) s += 40;
    for (const t of terms) {
      if (name.includes(t)) s += 20;
      if (hay.includes(t)) s += 5;
    }
    return s;
  };
  const results = [];
  for (const [name, m] of Object.entries(COMPONENTS)) {
    const hay = `${m.desc} ${m.category} ${(m.variants || []).join(" ")}`.toLowerCase();
    const s = score(name, hay);
    if (s > 0) results.push({ name, kind: "component", category: m.category, description: m.desc, score: s });
  }
  for (const [name, m] of Object.entries(TEMPLATES)) {
    const hay = `${m.desc} template page`.toLowerCase();
    const s = score(name, hay);
    if (s > 0) results.push({ name, kind: "template", category: "Template", description: m.desc, score: s });
  }
  return results.sort((a, b) => b.score - a.score);
}
