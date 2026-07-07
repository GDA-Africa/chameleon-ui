/**
 * Chameleon Engine — consumer-project agent rulesets (F64).
 * Writes a condensed Chameleon guide into the consumer's agent instruction
 * files (CLAUDE.md, AGENTS.md, .cursorrules) between marker comments, so ANY
 * coding agent — even without the MCP server registered — knows the catalog,
 * conventions, and discovery commands. Refresh with the same command.
 */

import fs from "fs";
import path from "path";
import { COMPONENTS, TEMPLATES, VALID_THEMES } from "./registry.mjs";
import { RECIPES } from "./recipes.mjs";
import { makeResult, evOk, evInfo, requireConfig } from "./core.mjs";

const START = "<!-- chameleon:start -->";
const END   = "<!-- chameleon:end -->";

const TARGET_FILES = ["CLAUDE.md", "AGENTS.md", ".cursorrules"];

function buildBlock(version, cfg) {
  const byCat = (cat) => Object.entries(COMPONENTS).filter(([, v]) => v.category === cat).map(([k]) => k).join(", ");
  return `${START}
## Chameleon UI (v${version}) — instructions for AI agents

This project uses **@chameleon-ui-lib/react**: a multi-theme React component
library (themes: ${VALID_THEMES.join(", ")}; light+dark; WCAG AA contrast).

### Rules
1. Prefer Chameleon components over hand-rolled UI. Discover them with
   \`npx chameleon list --json\` (or the Chameleon MCP server's \`search_components\`).
2. Scaffold, don't copy: \`npx chameleon add <component>\` / \`npx chameleon template <name>\`.
   Components land in \`${cfg?.dir || "src/components/ui"}\`, pages in \`${cfg?.pagesDir || "src/pages"}\`.
3. For full pages, check recipes first: \`npx chameleon recipes\` then
   \`npx chameleon compose <recipe>\` — or write a ChameleonSpec v1 JSON
   ({ version:1, name, template|blocks[], theme?, mode? }) and run
   \`npx chameleon compose <spec-file>\`. Validate with \`--validate-only\`.
4. After scaffolding, self-check with \`npx chameleon doctor --json\`.
5. Every command supports \`--json\` for machine-readable output.
6. The app must be wrapped in \`<ChameleonProvider initialTheme="${cfg?.theme || "simple"}" initialMode="${cfg?.mode || "light"}">\`
   and the CSS entry must import \`@chameleon-ui-lib/react/styles\`.

### Catalog
- **Atoms:** ${byCat("Atom")}
- **Molecules:** ${byCat("Molecule")}
- **Composites:** ${byCat("Composite")}
- **Templates:** ${Object.keys(TEMPLATES).join(", ")}
- **Recipes:** ${RECIPES.map((r) => r.name).join(", ")}

### MCP server (optional, richer integration)
Register: \`claude mcp add chameleon -- npx -y -p @chameleon-ui-lib/react chameleon mcp\`
Tools: search_components, get_recipe, compose_from_blocks, validate_project, ...
${END}`;
}

/** Write/refresh the Chameleon block in consumer agent files. */
export function agentsInit(ctx, { version }) {
  const r = makeResult();
  const cfg = requireConfig(ctx, r);
  if (!cfg) return r;
  const block = buildBlock(version, cfg);
  const written = [];

  for (const file of TARGET_FILES) {
    const p = path.join(ctx.cwd, file);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, "utf8");
      if (content.includes(START) && content.includes(END)) {
        const updated = content.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block);
        fs.writeFileSync(p, updated, "utf8");
        evOk(r, `${file} — Chameleon block refreshed`);
      } else {
        fs.writeFileSync(p, content.trimEnd() + "\n\n" + block + "\n", "utf8");
        evOk(r, `${file} — Chameleon block appended`);
      }
    } else {
      fs.writeFileSync(p, block + "\n", "utf8");
      evOk(r, `${file} — created with Chameleon block`);
    }
    r.filesWritten.push(file);
    written.push(file);
  }

  evInfo(r, "Existing content outside the chameleon markers is never touched.");
  r.nextSteps.push("Re-run `chameleon agents init` after library upgrades to refresh the block.");
  r.data = { files: written, markers: [START, END] };
  return r;
}
