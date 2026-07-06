/**
 * Chameleon Engine (F59) — the single programmatic surface over the component
 * catalog and scaffolding operations. Consumed by:
 *   - bin/chameleon.js       (human + --json CLI skins)
 *   - @chameleon-ui-lib/mcp  (MCP server tools, F60)
 *
 * Import from the package: `import { ... } from "@chameleon-ui-lib/react/engine"`.
 * Engine functions never print and never call process.exit.
 */

export { COMPONENTS, TEMPLATES, VALID_THEMES, THEME_DESCRIPTIONS, toPascalCase } from "./registry.mjs";
export { createContext, makeResult, addError, readConfig, writeConfig, readProjectPkg, requireConfig } from "./core.mjs";
export { listCatalog, getInfo, listThemes, searchCatalog } from "./catalog.mjs";
export { addComponents, selectBulk, removeComponent, scaffoldTemplate, setTheme, updateComponents, initProject } from "./scaffold.mjs";
export { doctor, diffComponents } from "./health.mjs";
export { validateSpec, scaffoldSpec, listRecipes, getRecipe, searchRecipes } from "./spec.mjs";
export { RECIPES } from "./recipes.mjs";
