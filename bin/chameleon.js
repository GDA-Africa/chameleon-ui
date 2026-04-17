#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
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

const VERSION = "0.0.1";
const LIB_ROOT   = path.resolve(__dirname, "..");
const LIB_SRC    = path.join(LIB_ROOT, "src", "app", "components", "chameleon");
const CONFIG_FILE = path.join(process.cwd(), "chameleon.config.json");

// Real Component Registry — sourced from atoms.tsx, molecules.tsx, composites.tsx
const COMPONENTS = {
  button:              { file: "atoms.tsx",      category: "Atom",      deps: ["@radix-ui/react-slot", "motion"],            variants: ["primary","secondary","ghost","outline"],     desc: "Interactive button with theme adaptation and animations." },
  input:               { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["default","error","disabled"],                desc: "Form text input with full theme token support." },
  badge:               { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["default","success","warning","error"],       desc: "Compact status/label indicator." },
  spinner:             { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["sm","md","lg"],                              desc: "Loading spinner with size variants." },
  avatar:              { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["sm","md","lg"],                              desc: "User avatar with image and fallback initials." },
  toggle:              { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["default","sm"],                              desc: "Boolean on/off toggle switch." },
  progress:            { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["default","animated"],                        desc: "Linear progress bar with animated fill." },
  tooltip:             { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["top","bottom","left","right"],               desc: "Contextual hover tooltip for any element." },
  card:                { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["default","elevated","animated"],             desc: "Versatile content container with header/footer slots." },
  tabs:                { file: "molecules.tsx",  category: "Molecule",  deps: ["@radix-ui/react-tabs"],                      variants: ["default"],                                  desc: "Tabbed navigation panel." },
  dialog:              { file: "molecules.tsx",  category: "Molecule",  deps: ["@radix-ui/react-dialog"],                    variants: ["default"],                                  desc: "Accessible modal dialog overlay." },
  "stat-card":         { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["default","trending"],                        desc: "KPI/metric card with trend indicator." },
  "pricing-card":      { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["default","featured"],                        desc: "Pricing tier card with feature list." },
  alert:               { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["info","success","warning","error"],          desc: "Inline alert/notification banner." },
  separator:           { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["horizontal","vertical"],                     desc: "Visual divider line." },
  breadcrumb:          { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["default"],                                  desc: "Hierarchical navigation breadcrumb trail." },
  select:              { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["default","error"],                           desc: "Styled select dropdown." },
  textarea:            { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["default","error"],                           desc: "Multiline text input." },
  "data-table":        { file: "composites.tsx", category: "Composite", deps: [],                                            variants: ["default","striped"],                         desc: "Sortable, filterable data table with pagination." },
  "theme-chart":       { file: "composites.tsx", category: "Composite", deps: ["recharts"],                                  variants: ["bar","line","area"],                         desc: "Themed recharts wrapper with full token support." },
  "command-palette":   { file: "composites.tsx", category: "Composite", deps: ["cmdk"],                                      variants: ["default"],                                  desc: "CMD+K command palette with fuzzy search." },
  "kanban-board":      { file: "composites.tsx", category: "Composite", deps: ["react-dnd","react-dnd-html5-backend"],       variants: ["default"],                                  desc: "Drag-and-drop kanban board." },
  timeline:            { file: "composites.tsx", category: "Composite", deps: [],                                            variants: ["default","animated"],                        desc: "Vertical timeline of events." },
  "file-uploader":     { file: "composites.tsx", category: "Composite", deps: [],                                            variants: ["default","drag-drop"],                       desc: "File upload zone with preview and progress." },
  "notification-feed": { file: "composites.tsx", category: "Composite", deps: [],                                            variants: ["default"],                                  desc: "Real-time notification feed list." },
  "multi-step-form":   { file: "composites.tsx", category: "Composite", deps: ["react-hook-form"],                           variants: ["default"],                                  desc: "Wizard-style multi-step form with validation." },
  "calendar-widget":   { file: "composites.tsx", category: "Composite", deps: ["react-day-picker","date-fns"],               variants: ["default"],                                  desc: "Interactive calendar picker widget." },
  "media-gallery":     { file: "composites.tsx", category: "Composite", deps: [],                                            variants: ["grid","masonry"],                            desc: "Responsive image/media gallery." },
};

// Real Template Registry — sourced from templates.tsx, comprehensive-templates.tsx, comprehensive-templates-part2.tsx
const TEMPLATES = {
  "auth":               { file: "templates.tsx",                    export: "AuthTemplate",               desc: "Login and signup forms with validation." },
  "settings":           { file: "templates.tsx",                    export: "SettingsTemplate",            desc: "User settings panel with sections." },
  "ecommerce":          { file: "templates.tsx",                    export: "EcommerceTemplate",           desc: "Product listing and cart page." },
  "analytics-dashboard":{ file: "templates.tsx",                    export: "AnalyticsDashboardTemplate",  desc: "KPI dashboard with charts and metrics." },
  "landing-page":       { file: "comprehensive-templates.tsx",      export: "LandingPageTemplate",         desc: "Full marketing landing page." },
  "blog-article":       { file: "comprehensive-templates.tsx",      export: "BlogArticleTemplate",         desc: "Article/blog post layout." },
  "pricing-page":       { file: "comprehensive-templates.tsx",      export: "PricingPageTemplate",         desc: "Pricing tiers with comparison table." },
  "contact-support":    { file: "comprehensive-templates.tsx",      export: "ContactSupportTemplate",      desc: "Contact form and support FAQ layout." },
  "user-profile":       { file: "comprehensive-templates-part2.tsx",export: "UserProfileTemplate",         desc: "User profile with avatar, bio and activity." },
  "admin-dashboard":    { file: "comprehensive-templates-part2.tsx",export: "AdminDashboardTemplate",      desc: "Admin panel with sidebar and data tables." },
  "ecommerce-product":  { file: "comprehensive-templates-part2.tsx",export: "EcommerceProductTemplate",    desc: "Single product detail page." },
  "settings-panel":     { file: "comprehensive-templates-part2.tsx",export: "SettingsPanelTemplate",       desc: "Comprehensive settings with nested tabs." },
  "auth-flow":          { file: "comprehensive-templates-part2.tsx",export: "AuthFlowTemplate",            desc: "Multi-step auth flow (login, 2FA, reset)." },
  "documentation":      { file: "comprehensive-templates-part2.tsx",export: "DocumentationTemplate",       desc: "Docs layout with sidebar navigation." },
};

const VALID_THEMES = ["material", "simple", "minimalist", "glassy", "liquid"];

// Helpers
const log  = (msg) => console.log(msg);
const ok   = (msg) => log(`  ${c.emerald}✔${c.reset} ${c.white}${msg}${c.reset}`);
const warn = (msg) => log(`  ${c.yellow}⚠${c.reset} ${c.white}${msg}${c.reset}`);
const fail = (msg) => log(`  ${c.red}✖${c.reset} ${c.white}${msg}${c.reset}`);
const info = (msg) => log(`  ${c.gray}${msg}${c.reset}`);
const toPascalCase = (str) => str.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("");

function readConfig() {
  if (!fs.existsSync(CONFIG_FILE)) return null;
  try { return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8")); } catch { return null; }
}
function writeConfig(cfg) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2) + "\n", "utf8");
}
function readProjectPkg() {
  const p = path.join(process.cwd(), "package.json");
  if (!fs.existsSync(p)) return null;
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return null; }
}

const banner = `\n${c.emerald}▧${c.reset} ${c.bold}${c.white}Chameleon UI${c.reset} ${c.dim}v${VERSION}${c.reset}\n`;

function autoConfigureTailwindVite() {
  const dir = process.cwd();
  const viteConf = ["vite.config.ts", "vite.config.js", "vite.config.mjs"].find(f => fs.existsSync(path.join(dir, f)));
  if (!viteConf) {
    warn("No Vite config found. Make sure to configure @tailwindcss/vite manually.");
    return false;
  }

  const confPath = path.join(dir, viteConf);
  let content = fs.readFileSync(confPath, "utf8");
  
  if (content.includes("@tailwindcss/vite") || content.includes("tailwindcss()")) {
    ok(`Tailwind v4 plugin already configured in ${viteConf}`);
    return true;
  }

  log(`  ${c.dim}Injecting Tailwind v4 Vite plugin into ${viteConf}...${c.reset}`);

  // Inject import
  if (!content.includes("import tailwindcss")) {
    const importMatch = [...content.matchAll(/import\s+.*?from\s+['"][^'"]+['"];?/gs)];
    if (importMatch.length > 0) {
      const lastImport = importMatch[importMatch.length - 1][0];
      content = content.replace(lastImport, `${lastImport}\nimport tailwindcss from "@tailwindcss/vite";`);
    } else {
      content = `import tailwindcss from "@tailwindcss/vite";\n` + content;
    }
  }

  // Inject plugin
  const pluginsMatch = content.match(/plugins:\s*\[(.*?)\]/s);
  if (pluginsMatch) {
    let currentPlugins = pluginsMatch[1].trim();
    if (currentPlugins && !currentPlugins.endsWith(",")) {
      currentPlugins += ", ";
    }
    const newPlugins = currentPlugins ? `${currentPlugins}tailwindcss()` : `tailwindcss()`;
    content = content.replace(/plugins:\s*\[.*?\]/s, `plugins: [${newPlugins}]`);
    
    fs.writeFileSync(confPath, content, "utf8");
    ok(`Successfully updated ${viteConf}`);
    return true;
  } else {
    warn(`Could not automatically add tailwindcss() to plugins in ${viteConf}. Add it manually.`);
    return false;
  }
}

function checkCssTailwindImport(configCssPath) {
  const cssPath = path.join(process.cwd(), configCssPath || "src/index.css");
  if (fs.existsSync(cssPath)) {
    let content = fs.readFileSync(cssPath, "utf8");
    if (!content.includes("@import 'tailwindcss'") && !content.includes('@import "tailwindcss"')) {
      content = `@import "tailwindcss";\n` + content;
      fs.writeFileSync(cssPath, content, "utf8");
      ok(`Injected @import "tailwindcss" into ${configCssPath}`);
    } else {
      ok(`Tailwind directives found in ${configCssPath}`);
    }
  } else {
    warn(`CSS entry ${configCssPath} not found. Don't forget to add @import "tailwindcss".`);
  }
}

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
  log(`    ${c.emerald}template${c.reset} ${c.indigo}<name>${c.reset}        Scaffold a full-page template\n`);
  log(`  ${c.bold}${c.white}UTILS & DIAGNOSTICS${c.reset}`);
  log(`    ${c.emerald}info${c.reset} ${c.indigo}<component>${c.reset}       Show details, props, and deps for a component`);
  log(`    ${c.emerald}doctor${c.reset}                  Check project health and dependencies`);
  log(`    ${c.emerald}diff${c.reset}                    Compare local components to latest library source`);
  log(`    ${c.emerald}update${c.reset}                  Re-sync outdated scaffolded components`);
  log(`    ${c.emerald}config${c.reset}                  Show or manage chameleon.config.json`);
  log(`    ${c.emerald}dev${c.reset}                     Launch the local component playground\n`);
  log(`  ${c.bold}${c.white}OPTIONS${c.reset}`);
  log(`    ${c.emerald}-h, --help${c.reset}              Show this help message`);
  log(`    ${c.emerald}-v, --version${c.reset}           Show the version number\n`);
  log(`  ${c.bold}${c.white}EXAMPLES${c.reset}`);
  log(`    $ ${c.emerald}chameleon init${c.reset}`);
  log(`    $ ${c.emerald}chameleon add button${c.reset}`);
  log(`    $ ${c.emerald}chameleon theme glassy${c.reset}`);
  log(`    $ ${c.emerald}chameleon template auth-flow${c.reset}\n`);
}

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === "-h" || args[0] === "--help") { printHelp(); process.exit(0); }
if (args[0] === "-v" || args[0] === "--version") { log(VERSION); process.exit(0); }

const cmd  = args[0];
const item = args[1];

// ── init ──────────────────────────────────────────────────────────────────────
if (cmd === "init") {
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Initializing Chameleon UI in your project...${c.reset}\n`);
  const pkg = readProjectPkg();
  if (!pkg) { fail("No package.json found. Run this inside your project root."); process.exit(1); }
  ok("package.json found");

  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (allDeps["@chameleon-ui-lib/react"]) {
    ok("@chameleon-ui-lib/react is installed");
  } else {
    warn("@chameleon-ui-lib/react not found — run: npm install @chameleon-ui-lib/react");
  }

  if (fs.existsSync(CONFIG_FILE)) {
    warn("chameleon.config.json already exists — skipping");
  } else {
    writeConfig({ theme: "simple", mode: "light", lang: "en", dir: "src/components/ui", pagesDir: "src/pages", css: "src/styles/theme.css", version: VERSION });
    ok("chameleon.config.json created");
  }

  const cfg = readConfig();
  const outDir = path.join(process.cwd(), cfg.dir);
  if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, { recursive: true }); ok(`Created ${cfg.dir}`); }
  else { ok(`Output directory exists: ${cfg.dir}`); }

  // Auto-configure Tailwind v4
  autoConfigureTailwindVite();
  checkCssTailwindImport(cfg.css || "src/index.css");

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
  log(`\n${c.emerald}➜${c.reset} ${c.bold}${c.white}Chameleon UI Component Registry${c.reset}\n`);
  for (const group of ["Atom", "Molecule", "Composite"]) {
    const members = Object.entries(COMPONENTS).filter(([, v]) => v.category === group);
    log(`  ${c.bold}${c.cyan}${group}s (${members.length})${c.reset}`);
    for (const [name, meta] of members) log(`  ${c.emerald}${name.padEnd(22)}${c.reset}${c.dim}${meta.desc}${c.reset}`);
    log("");
  }
  log(`  ${c.bold}${c.cyan}Templates (${Object.keys(TEMPLATES).length})${c.reset}`);
  for (const [name, meta] of Object.entries(TEMPLATES)) log(`  ${c.indigo}${name.padEnd(22)}${c.reset}${c.dim}${meta.desc}${c.reset}`);
  log("");
  info(`Use ${c.emerald}chameleon add <component>${c.gray} or ${c.emerald}chameleon template <name>${c.gray} to scaffold.`);
  log("");

// ── add ───────────────────────────────────────────────────────────────────────
} else if (cmd === "add") {
  if (!item) { log(`\n${c.red}✖ Missing component name${c.reset}\n  ${c.gray}Usage: ${c.emerald}chameleon add ${c.indigo}<component>${c.reset}\n`); process.exit(1); }
  const key  = item.toLowerCase();
  const meta = COMPONENTS[key];
  if (!meta) { log(`\n${c.red}✖ Unknown component: '${item}'${c.reset}`); info(`Run ${c.emerald}chameleon list${c.gray} to see all available components.`); log(""); process.exit(1); }
  const cfg = readConfig();
  if (!cfg) { log(`\n${c.yellow}⚠ Run ${c.emerald}chameleon init${c.yellow} first.${c.reset}\n`); process.exit(1); }
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Adding ${c.white}${key}${c.indigo} to your project...${c.reset}\n`);
  const srcFile = path.join(LIB_SRC, meta.file);
  const outDir  = path.join(process.cwd(), cfg.dir);
  const outFile = path.join(outDir, `${key}.tsx`);
  if (!fs.existsSync(srcFile)) { fail(`Source file not found: ${meta.file}`); process.exit(1); }
  fs.mkdirSync(outDir, { recursive: true });
  
  let content = fs.readFileSync(srcFile, "utf8");
  const localDeps = ["context", "utils", "animations", "atoms", "molecules", "composites"];
  const foundDeps = localDeps.filter(dep => content.includes(`from "./${dep}"`) || content.includes(`from './${dep}'`));
  
  content = content.replace(/from\s+['"]\.\/.*?['"]/g, 'from "@chameleon-ui-lib/react"');
  fs.writeFileSync(outFile, content, "utf8");

  ok(`${cfg.dir}/${key}.tsx created`);
  if (meta.deps.length > 0) info(`External package dependencies: ${meta.deps.join(", ")}`);
  if (foundDeps.length > 0) info(`Mapped local dependencies to package exports: ${foundDeps.join(", ")}`);
  log(`\n${c.emerald}Ready!${c.reset} ${c.gray}Import: ${c.cyan}import { ${toPascalCase(key)} } from './${key}'${c.reset}\n`);

// ── remove ────────────────────────────────────────────────────────────────────
} else if (cmd === "remove") {
  if (!item) { log(`\n${c.red}✖ Missing component name${c.reset}\n  ${c.gray}Usage: ${c.emerald}chameleon remove ${c.indigo}<component>${c.reset}\n`); process.exit(1); }
  const cfg = readConfig();
  if (!cfg) { log(`\n${c.yellow}⚠ Run ${c.emerald}chameleon init${c.yellow} first.${c.reset}\n`); process.exit(1); }
  const key     = item.toLowerCase();
  const outFile = path.join(process.cwd(), cfg.dir, `${key}.tsx`);
  log(`\n${c.emerald}➜${c.reset} ${c.red}Removing ${c.white}${key}${c.red}...${c.reset}\n`);
  if (!fs.existsSync(outFile)) { warn(`${cfg.dir}/${key}.tsx not found — nothing to remove.`); log(""); process.exit(0); }
  fs.unlinkSync(outFile);
  ok(`${cfg.dir}/${key}.tsx deleted`);
  log(`\n${c.emerald}Done.${c.reset} ${c.gray}Component removed cleanly.${c.reset}\n`);

// ── theme ─────────────────────────────────────────────────────────────────────
} else if (cmd === "theme") {
  if (!item) { log(`\n${c.red}✖ Missing theme name${c.reset}\n  ${c.gray}Usage: ${c.emerald}chameleon theme ${c.indigo}<name>${c.reset}\n`); process.exit(1); }
  if (!VALID_THEMES.includes(item)) { log(`\n${c.red}✖ Invalid theme: '${item}'${c.reset}`); info(`Valid: ${VALID_THEMES.join(", ")}`); log(""); process.exit(1); }
  const cfg = readConfig();
  if (!cfg) { log(`\n${c.yellow}⚠ Run ${c.emerald}chameleon init${c.yellow} first.${c.reset}\n`); process.exit(1); }
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Setting theme to ${c.bold}${c.white}${item}${c.reset}...\n`);
  cfg.theme = item;
  writeConfig(cfg);
  ok(`chameleon.config.json updated → theme: ${item}`);
  log(`\n${c.emerald}Success!${c.reset} ${c.gray}Now using the ${c.cyan}${item}${c.gray} theme.${c.reset}\n`);

// ── themes ────────────────────────────────────────────────────────────────────
} else if (cmd === "themes") {
  log(`\n${c.emerald}➜${c.reset} ${c.bold}${c.white}Chameleon UI Themes${c.reset}\n`);
  const descs = {
    material:   "Classic Google-inspired elevation, shadows, and ripple effects.",
    simple:     "Flat, clean, unopinionated — great for custom design systems.",
    minimalist: "High whitespace, stark contrast, elegant typography.",
    glassy:     "Translucent frosted glass with backdrop blur — modern iOS/macOS feel.",
    liquid:     "Organic morphing gradients and fluid animations.",
  };
  for (const [name, desc] of Object.entries(descs)) log(`  ${c.cyan}${name.padEnd(14)}${c.reset}${c.dim}${desc}${c.reset}`);
  log("");
  info(`Use ${c.emerald}chameleon theme <name>${c.gray} to apply.`);
  log("");

// ── template ──────────────────────────────────────────────────────────────────
} else if (cmd === "template") {
  if (!item) {
    log(`\n${c.red}✖ Missing template name${c.reset}\n  ${c.gray}Usage: ${c.emerald}chameleon template ${c.indigo}<name>${c.reset}\n`);
    log(`  ${c.gray}Available: ${Object.keys(TEMPLATES).join(", ")}${c.reset}\n`);
    process.exit(1);
  }
  const key  = item.toLowerCase();
  const meta = TEMPLATES[key];
  if (!meta) { log(`\n${c.red}✖ Unknown template: '${item}'${c.reset}`); info(`Available: ${Object.keys(TEMPLATES).join(", ")}`); log(""); process.exit(1); }
  const cfg = readConfig();
  if (!cfg) { log(`\n${c.yellow}⚠ Run ${c.emerald}chameleon init${c.yellow} first.${c.reset}\n`); process.exit(1); }
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Scaffolding template: ${c.white}${key}${c.reset}...\n`);
  const srcFile = path.join(LIB_SRC, meta.file);
  const outDir  = path.join(process.cwd(), cfg.pagesDir || "src/pages");
  const outFile = path.join(outDir, `${key}.tsx`);
  if (!fs.existsSync(srcFile)) { fail(`Source file not found: ${meta.file}`); process.exit(1); }
  fs.mkdirSync(outDir, { recursive: true });
  
  let content = fs.readFileSync(srcFile, "utf8");
  const localDeps = ["context", "utils", "animations", "atoms", "molecules", "composites", "auth-components"];
  const foundDeps = localDeps.filter(dep => content.includes(`from "./${dep}"`) || content.includes(`from './${dep}'`));
  
  content = content.replace(/from\s+['"]\.\/.*?['"]/g, 'from "@chameleon-ui-lib/react"');
  fs.writeFileSync(outFile, content, "utf8");

  ok(`${cfg.pagesDir || "src/pages"}/${key}.tsx created`);
  ok(`Exported: ${meta.export}`);
  if (foundDeps.length > 0) info(`Mapped local dependencies to package exports: ${foundDeps.join(", ")}`);
  log(`\n${c.emerald}Success!${c.reset} ${c.gray}Import: ${c.cyan}import { ${meta.export} } from './pages/${key}'${c.reset}\n`);

// ── info ──────────────────────────────────────────────────────────────────────
} else if (cmd === "info") {
  if (!item) { log(`\n${c.red}✖ Missing component name${c.reset}\n  ${c.gray}Usage: ${c.emerald}chameleon info ${c.indigo}<component>${c.reset}\n`); process.exit(1); }
  const key  = item.toLowerCase();
  const meta = COMPONENTS[key] || TEMPLATES[key];
  if (!meta) { log(`\n${c.red}✖ Unknown item: '${item}'${c.reset}`); info(`Run ${c.emerald}chameleon list${c.gray} to see all available items.`); log(""); process.exit(1); }
  log(`\n${c.emerald}➜${c.reset} ${c.bold}${c.white}${key}${c.reset}\n`);
  log(`  ${c.gray}Category:${c.reset}     ${meta.category || "Template"}`);
  log(`  ${c.gray}Description:${c.reset}  ${meta.desc}`);
  log(`  ${c.gray}Source file:${c.reset}  src/app/components/chameleon/${meta.file}`);
  if (meta.variants) log(`  ${c.gray}Variants:${c.reset}     ${meta.variants.join(", ")}`);
  if (meta.deps)     log(`  ${c.gray}Dependencies:${c.reset} ${meta.deps.length > 0 ? meta.deps.join(", ") : "none (self-contained)"}`);
  if (meta.export)   log(`  ${c.gray}Export name:${c.reset}  ${meta.export}`);
  log("");

// ── doctor ────────────────────────────────────────────────────────────────────
} else if (cmd === "doctor") {
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Running Chameleon diagnostics...${c.reset}\n`);
  let issues = 0;
  
  const pkg = readProjectPkg();
  if (pkg) { ok("package.json found"); } else { fail("No package.json found"); issues++; }
  
  const cfg = readConfig();
  if (cfg) { ok(`chameleon.config.json found (theme: ${cfg.theme}, mode: ${cfg.mode})`); } else { warn("No chameleon.config.json — run chameleon init"); issues++; }
  
  if (pkg) {
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    if (allDeps["@chameleon-ui-lib/react"]) { ok("@chameleon-ui-lib/react installed"); } else { warn("@chameleon-ui-lib/react not in package.json"); issues++; }
  }
  
  if (fs.existsSync(path.join(process.cwd(), "node_modules"))) { ok("node_modules present"); } else { fail("node_modules not found — run npm install"); issues++; }
  
  // 1. Check Bundler / Tailwind config
  const viteConfigJs = path.join(process.cwd(), "vite.config.js");
  const viteConfigTs = path.join(process.cwd(), "vite.config.ts");
  const viteConfig = fs.existsSync(viteConfigTs) ? viteConfigTs : (fs.existsSync(viteConfigJs) ? viteConfigJs : null);
  
  const twFiles = ["tailwind.config.js","tailwind.config.ts","tailwind.config.mjs"];
  const hasTwConfig = twFiles.some(f => fs.existsSync(path.join(process.cwd(), f)));
  
  let hasTwVitePlugin = false;
  if (viteConfig) {
    const vc = fs.readFileSync(viteConfig, 'utf8');
    if (vc.includes('@tailwindcss/vite')) {
      hasTwVitePlugin = true;
    }
  }

  if (hasTwConfig || hasTwVitePlugin) { 
    ok("Tailwind CSS configured"); 
  } else { 
    warn("No Tailwind CSS config found (no tailwind.config or @tailwindcss/vite in vite.config)"); 
    issues++; 
  }

  // 2. Check missing CSS import
  if (cfg && cfg.css) {
    const cssPath = path.join(process.cwd(), cfg.css);
    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf8');
      if (cssContent.includes('@chameleon-ui-lib/react/styles')) {
        ok(`Library CSS imported correctly in ${cfg.css}`);
      } else {
        warn(`Library CSS not imported in ${cfg.css}. Add: @import "@chameleon-ui-lib/react/styles";`);
        issues++;
      }

      // F27: Check @import ordering — no rules must precede @import lines
      const lines = cssContent.split('\n');
      let firstRuleLine = -1;
      let firstImportAfterRule = -1;
      for (let i = 0; i < lines.length; i++) {
        const t = lines[i].trim();
        if (!t || t.startsWith('/*') || t.startsWith('*') || t.startsWith('//')) continue;
        if (t.startsWith('@import')) {
          if (firstRuleLine !== -1 && firstImportAfterRule === -1) {
            firstImportAfterRule = i + 1;
          }
        } else {
          if (firstRuleLine === -1) firstRuleLine = i + 1;
        }
      }
      if (firstImportAfterRule !== -1) {
        warn(`CSS @import ordering issue in ${cfg.css} (line ${firstImportAfterRule}): @import must precede all other rules. PostCSS will warn about this.`);
        info(`  Fix: move all @import lines to the very top of ${cfg.css}`);
        issues++;
      } else {
        ok(`CSS @import order is correct in ${cfg.css}`);
      }
    } else {
      warn(`Configured CSS file not found: ${cfg.css}`);
      issues++;
    }
  }

  // 3 & 4. Check generated components (unresolved deps & lint risks)
  if (cfg) {
    const outDir = path.join(process.cwd(), cfg.dir);
    if (fs.existsSync(outDir)) {
      ok(`Components directory exists: ${cfg.dir}`);
      
      const scaffolded = fs.readdirSync(outDir).filter(f => f.endsWith(".tsx") || f.endsWith(".ts"));
      let unresolvedPaths = [];
      let lintRisks = [];

      for (const t of scaffolded) {
        const fullPath = path.join(outDir, t);
        const code = fs.readFileSync(fullPath, "utf8");
        
        // Find local imports like: import { ... } from "./atoms"
        const importRegex = /from\s+["'](\.\/[^"']+)["']/g;
        let match;
        while ((match = importRegex.exec(code)) !== null) {
          const importPath = match[1];
          // Simplistic check for .ts or .tsx file existence
          const targetPathBase = path.join(outDir, importPath);
          if (!fs.existsSync(targetPathBase + ".tsx") && !fs.existsSync(targetPathBase + ".ts")) {
            unresolvedPaths.push({ file: t, import: importPath });
          }
        }
        
        // Lint risks
        if (code.includes(" as any") || code.includes(": any") || code.includes("@ts-ignore")) {
          lintRisks.push(t);
        }
      }
      
      if (unresolvedPaths.length === 0) {
        ok("All local cross-component imports resolved");
      } else {
        warn(`Found unresolved local imports in ${unresolvedPaths.length} file(s)`);
        unresolvedPaths.forEach(up => log(`    ${c.gray}${up.file} -> ${up.import}${c.reset}`));
        issues++;
      }
      
      if (lintRisks.length === 0) {
        ok("No explicit lint-risk patterns found in generated code");
      } else {
        warn(`Found lint-risk patterns (any/ts-ignore) in: ${lintRisks.join(", ")}`);
        issues++;
      }

    } else {
      warn(`Components directory missing: ${cfg.dir} — run chameleon add`);
    }
  }

  if (issues === 0) { log(`\n${c.emerald}All checks passed!${c.reset} ${c.gray}Your project is healthy.${c.reset}\n`); }
  else { log(`\n${c.yellow}${issues} issue(s) found.${c.reset} ${c.gray}Address the warnings above.${c.reset}\n`); }

// ── diff ──────────────────────────────────────────────────────────────────────
} else if (cmd === "diff") {
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Comparing local components to library source...${c.reset}\n`);
  const cfg = readConfig();
  if (!cfg) { log(`\n${c.yellow}⚠ Run ${c.emerald}chameleon init${c.yellow} first.${c.reset}\n`); process.exit(1); }
  const outDir = path.join(process.cwd(), cfg.dir);
  if (!fs.existsSync(outDir)) { info(`No scaffolded components found in ${cfg.dir}`); log(""); process.exit(0); }
  const localFiles = fs.readdirSync(outDir).filter(f => f.endsWith(".tsx"));
  if (localFiles.length === 0) { info(`No scaffolded components found in ${cfg.dir}`); log(""); process.exit(0); }
  let diffCount = 0;
  for (const file of localFiles) {
    const key  = file.replace(".tsx","").toLowerCase();
    const meta = COMPONENTS[key];
    if (!meta) continue;
    const localContent  = fs.readFileSync(path.join(outDir, file), "utf8");
    let sourceContent = fs.existsSync(path.join(LIB_SRC, meta.file)) ? fs.readFileSync(path.join(LIB_SRC, meta.file), "utf8") : null;
    if (!sourceContent) continue;
    
    // Apply the same rewrite before comparing
    sourceContent = sourceContent.replace(/from\s+['"]\.\/.*?['"]/g, 'from "@chameleon-ui-lib/react"');

    if (localContent === sourceContent) { ok(`${file} — up to date`); }
    else { warn(`${file} — differs from library source`); diffCount++; }
  }
  if (diffCount === 0) { log(`\n${c.emerald}All components are in sync.${c.reset}\n`); }
  else { log(`\n${c.yellow}${diffCount} component(s) out of sync.${c.reset} ${c.gray}Run ${c.emerald}chameleon update${c.gray} to fix.${c.reset}\n`); }

// ── update ────────────────────────────────────────────────────────────────────
} else if (cmd === "update") {
  log(`\n${c.emerald}➜${c.reset} ${c.indigo}Updating scaffolded components...${c.reset}\n`);
  const cfg = readConfig();
  if (!cfg) { log(`\n${c.yellow}⚠ Run ${c.emerald}chameleon init${c.yellow} first.${c.reset}\n`); process.exit(1); }
  const outDir = path.join(process.cwd(), cfg.dir);
  if (!fs.existsSync(outDir)) { info(`No scaffolded components found in ${cfg.dir}`); log(""); process.exit(0); }
  const localFiles = fs.readdirSync(outDir).filter(f => f.endsWith(".tsx"));
  let updated = 0;
  for (const file of localFiles) {
    const key  = file.replace(".tsx","").toLowerCase();
    const meta = COMPONENTS[key] || TEMPLATES[key]; // Actually templates might not be in dir, but if they are, handle them
    if (!meta) continue;
    const localPath  = path.join(outDir, file);
    const sourcePath = path.join(LIB_SRC, meta.file);
    if (!fs.existsSync(sourcePath)) continue;
    const localContent  = fs.readFileSync(localPath, "utf8");
    let sourceContent = fs.readFileSync(sourcePath, "utf8");
    
    // Apply the same rewrite used in add/template
    sourceContent = sourceContent.replace(/from\s+['"]\.\/.*?['"]/g, 'from "@chameleon-ui-lib/react"');
    
    if (localContent !== sourceContent) { fs.writeFileSync(localPath, sourceContent, "utf8"); ok(`Updated ${file}`); updated++; }
    else { info(`${file} already up to date`); }
  }
  if (updated === 0) { log(`\n${c.emerald}Everything is already up to date.${c.reset}\n`); }
  else { log(`\n${c.emerald}Update complete!${c.reset} ${c.gray}${updated} component(s) updated.${c.reset}\n`); }

// ── config ────────────────────────────────────────────────────────────────────
} else if (cmd === "config") {
  const cfg = readConfig();
  if (!cfg) { log(`\n${c.yellow}⚠ No chameleon.config.json found.${c.reset}`); info(`Run ${c.emerald}chameleon init${c.gray} to create one.`); log(""); process.exit(1); }
  log(`\n${c.emerald}➜${c.reset} ${c.bold}${c.white}chameleon.config.json${c.reset} ${c.dim}(${CONFIG_FILE})${c.reset}\n`);
  const fieldColor = { theme: c.cyan, mode: c.cyan, lang: c.cyan, dir: c.indigo, pagesDir: c.indigo, css: c.indigo, version: c.gray };
  for (const [key, val] of Object.entries(cfg)) log(`  ${(fieldColor[key] || c.white)}${key.padEnd(12)}${c.reset}${c.white}${val}${c.reset}`);
  log("");
  info(`Edit ${c.emerald}chameleon.config.json${c.gray} directly, or use ${c.emerald}chameleon theme <name>${c.gray} to change the theme.`);
  log("");

// ── dev ───────────────────────────────────────────────────────────────────────
} else if (cmd === "dev") {
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
  log(`\n${c.red}✖ Unknown command: '${cmd}'${c.reset}`);
  info(`Run ${c.emerald}chameleon --help${c.gray} for a list of valid commands.`);
  log("");
  process.exit(1);
}
