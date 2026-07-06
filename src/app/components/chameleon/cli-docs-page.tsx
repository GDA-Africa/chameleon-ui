/**
 * CLI Documentation Page
 * Full reference for the Chameleon CLI — all 13 commands with usage, flags, and examples.
 */

import React, { useState } from "react";
import {
  Terminal,
  Copy,
  Check,
  ChevronRight,
  Download,
  Package,
  Search,
  Plus,
  Trash2,
  Info,
  Stethoscope,
  GitCompare,
  RefreshCw,
  Layers,
  FileCode,
  Settings,
  Play,
  Palette,
  List,
} from "lucide-react";
import { CLIMockup } from "./cli";
import { useThemeClasses } from "./context";
import { cn } from "./utils";
import { Badge } from "./atoms";
import { CopyPageForAIPanel } from "./ai-helpers";

// ─── Command Data ─────────────────────────────────────────────────────────────

const CLI_COMMANDS = [
  {
    cmd: "mcp",
    usage: "chameleon mcp",
    icon: Download,
    category: "AI Agents",
    badge: "v2.0",
    desc: "Start the MCP server (stdio) — 23 tools that let AI agents search the catalog, compose specs, apply brands, preview pages, and scaffold whole apps. Register once: `claude mcp add chameleon -- npx -y -p @chameleon-ui-lib/react chameleon mcp`.",
    example: `chameleon mcp
# chameleon-ui MCP server ready (stdio)
# tools: search_components, compose_from_blocks, scaffold_app, ...`,
    flags: [],
  },
  {
    cmd: "compose",
    usage: "chameleon compose <spec-file | recipe>",
    icon: Plus,
    category: "AI Agents",
    badge: "v2.0",
    desc: "Scaffold a page from a ChameleonSpec v1 — a validated JSON description ({ version:1, name, template|blocks[] }). Pass a recipe name (see `chameleon recipes`) or a spec file. `--validate-only` checks without writing.",
    example: `chameleon compose team-members
# ✓ src/pages/team-members.tsx composed from 2 block(s)`,
    flags: ["--validate-only", "--json"],
  },
  {
    cmd: "recipes",
    usage: "chameleon recipes",
    icon: Download,
    category: "AI Agents",
    badge: "v2.0",
    desc: "List the 10 built-in composition recipes — stored, validated page specs (login-form, analytics-overview, kanban-workspace, ...).",
    example: `chameleon recipes
# login-form        Login and signup forms with validation.`,
    flags: ["--json"],
  },
  {
    cmd: "new",
    usage: "chameleon new <dir> --app-spec <file>",
    icon: Plus,
    category: "AI Agents",
    badge: "v2.0",
    desc: "Scaffold a complete runnable application from an AppSpec v2: Vite + React + TS + Tailwind, router and nav generated from pages, brand applied, mock dataSlots with replacement seams, agent rulesets included.",
    example: `chameleon new bakery-crm --app-spec app.json
# ✓ 21 files — cd bakery-crm && npm install && npm run dev`,
    flags: ["--validate-only", "--json"],
  },
  {
    cmd: "brand",
    usage: "chameleon brand <init|check|from-url|from-logo>",
    icon: Download,
    category: "Config",
    badge: "v2.0",
    desc: "Brand token pipeline: `init` persists colors/font/radius (brand.config.json + CSS layer) and audits WCAG AA contrast; `check` re-audits; `from-url`/`from-logo` extract candidate palettes with provenance — never auto-applied.",
    example: `chameleon brand init --primary "#635BFF" --font Sora
# ✓ brand.config.json created — pass to <ChameleonProvider brand={...}>`,
    flags: ["--primary", "--secondary", "--accent", "--font", "--radius", "--json"],
  },
  {
    cmd: "preview",
    usage: "chameleon preview <spec-file | recipe>",
    icon: Download,
    category: "AI Agents",
    badge: "v2.0",
    desc: "Audit a spec before scaffolding: validation + brand contrast always; Playwright screenshots per theme/mode with render-error detection when available. Returns a shareable /play URL.",
    example: `chameleon preview analytics-overview
# ✓ Spec is valid — Playground: chameleon.glenhalton.com/play?spec=...`,
    flags: ["--base-url", "--themes", "--json"],
  },
  {
    cmd: "registry",
    usage: "chameleon registry · chameleon add @chameleon/<name>",
    icon: Download,
    category: "Scaffold",
    badge: "v2.0",
    desc: "Browse and install remote registry items. Spec items are schema-validated (safe by construction); source items are sha256-verified and require an explicit `--yes` after a diff preview.",
    example: `chameleon add @chameleon/kanban-workspace
# ✓ Installed — provenance recorded in chameleon.config.json`,
    flags: ["--registry", "--yes", "--json"],
  },
  {
    cmd: "agents init",
    usage: "chameleon agents init",
    icon: Download,
    category: "AI Agents",
    badge: "v2.0",
    desc: "Write the Chameleon catalog + workflow into your project's CLAUDE.md, AGENTS.md, and .cursorrules between marker comments — every coding agent learns the library, even without MCP. Idempotent refresh.",
    example: `chameleon agents init
# ✓ CLAUDE.md — Chameleon block appended`,
    flags: ["--json"],
  },
  {
    cmd: "init",
    usage: "chameleon init",
    icon: Download,
    category: "Setup",
    badge: "interactive",
    desc: "Scaffold a fresh `chameleon.config.json` in your project root. Walks you through theme, mode, output directory, and CSS path.",
    example: `chameleon init
# ✓ Created chameleon.config.json
# theme: material | mode: dark | dir: src/components/ui`,
    flags: [],
  },
  {
    cmd: "add",
    usage: "chameleon add <component>",
    icon: Plus,
    category: "Scaffold",
    badge: "filesystem",
    desc: "Copy a component (Atom, Molecule, or Composite) or a template into your project's output directory as defined in `chameleon.config.json`.",
    example: `chameleon add button
# ✓ Copied atoms.tsx → src/components/ui/atoms.tsx

chameleon add auth-form
# ✓ Copied templates/auth-flow.tsx → src/components/ui/auth-flow.tsx`,
    flags: [],
  },
  {
    cmd: "remove",
    usage: "chameleon remove <component>",
    icon: Trash2,
    category: "Scaffold",
    badge: "filesystem",
    desc: "Delete a previously scaffolded component file from your output directory.",
    example: `chameleon remove button
# ✓ Removed src/components/ui/atoms.tsx`,
    flags: [],
  },
  {
    cmd: "list",
    usage: "chameleon list [--templates]",
    icon: List,
    category: "Discovery",
    badge: "read-only",
    desc: "Print all available components and templates. Add `--templates` to show only templates.",
    example: `chameleon list
# ATOMS (8)  button, badge, input, progress ...
# MOLECULES (10)  card, tabs, dialog ...
# COMPOSITES (10)  kanban-board, data-table ...

chameleon list --templates
# TEMPLATES (14)  auth-flow, dashboard, settings ...`,
    flags: ["--templates — show only templates"],
  },
  {
    cmd: "info",
    usage: "chameleon info <component>",
    icon: Info,
    category: "Discovery",
    badge: "read-only",
    desc: "Show detailed metadata for a component or template: description, category, dependencies, and available variants.",
    example: `chameleon info kanban-board
# Name: kanban-board
# Category: Composite
# Deps: @dnd-kit/core, @dnd-kit/sortable
# Variants: default`,
    flags: [],
  },
  {
    cmd: "themes",
    usage: "chameleon themes",
    icon: Palette,
    category: "Discovery",
    badge: "read-only",
    desc: "List all 5 built-in Chameleon themes with a one-line description of each.",
    example: `chameleon themes
# material   — Elevated surfaces, deep shadows
# simple     — Clean & classic
# minimalist — Zero decoration, pure typography
# glassy     — Frosted glass + depth
# liquid     — Organic fluid morphism`,
    flags: [],
  },
  {
    cmd: "theme",
    usage: "chameleon theme <name>",
    icon: Palette,
    category: "Config",
    badge: "writes config",
    desc: "Switch the active theme in `chameleon.config.json`. Accepts: material, simple, minimalist, glassy, liquid.",
    example: `chameleon theme glassy
# ✓ Theme set to: glassy`,
    flags: [],
  },
  {
    cmd: "config",
    usage: "chameleon config",
    icon: Settings,
    category: "Config",
    badge: "read-only",
    desc: "Pretty-print the current `chameleon.config.json` values. Useful for debugging your setup.",
    example: `chameleon config
# theme:    material
# mode:     dark
# lang:     en
# dir:      src/components/ui
# pagesDir: src/pages
# css:      src/styles/theme.css
# version:  0.0.1`,
    flags: [],
  },
  {
    cmd: "doctor",
    usage: "chameleon doctor",
    icon: Stethoscope,
    category: "Health",
    badge: "diagnostic",
    desc: "Run a health check on your project: verifies `package.json`, `node_modules`, Tailwind config, `chameleon.config.json`, and your output directory.",
    example: `chameleon doctor
# ✓ package.json found
# ✓ node_modules present
# ✓ Tailwind config detected
# ✓ chameleon.config.json found
# ✓ Output dir: src/components/ui`,
    flags: [],
  },
  {
    cmd: "diff",
    usage: "chameleon diff",
    icon: GitCompare,
    category: "Health",
    badge: "diagnostic",
    desc: "Compare every scaffolded file in your output directory against the library source. Reports files that are in sync, modified, or missing.",
    example: `chameleon diff
# ✓ atoms.tsx  — in sync
# ✎ molecules.tsx  — modified locally
# ✗ composites.tsx  — missing`,
    flags: [],
  },
  {
    cmd: "update",
    usage: "chameleon update",
    icon: RefreshCw,
    category: "Health",
    badge: "filesystem",
    desc: "Re-copy any scaffolded files that have diverged from the library source (detected by `diff`). Leaves locally-unchanged files untouched.",
    example: `chameleon update
# ✓ atoms.tsx  — already up to date
# ↑ molecules.tsx  — updated from library source`,
    flags: [],
  },
  {
    cmd: "template",
    usage: "chameleon template <name>",
    icon: FileCode,
    category: "Scaffold",
    badge: "filesystem",
    desc: "Scaffold a full page template into your pages directory (`pagesDir` in config). Includes the template file and notes on required dependencies.",
    example: `chameleon template auth-flow
# ✓ Scaffolded auth-flow.tsx → src/pages/auth-flow.tsx`,
    flags: [],
  },
  {
    cmd: "dev",
    usage: "chameleon dev",
    icon: Play,
    category: "Dev",
    badge: "server",
    desc: "Boot the Chameleon Workshop dev server (Vite) directly from the library. Opens the live component explorer at `http://localhost:5173`.",
    example: `chameleon dev
# ➜ Chameleon Workshop running at http://localhost:5173`,
    flags: [],
  },
];

const CATEGORY_ORDER = ["AI Agents", "Setup", "Scaffold", "Discovery", "Config", "Health", "Dev"];

const BADGE_COLORS: Record<string, string> = {
  interactive: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  filesystem: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "read-only": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "writes config": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  diagnostic: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  server: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "v2.0": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

// ─── Code Block ───────────────────────────────────────────────────────────────

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 mt-3">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-white/5 hover:bg-white/10"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-white/40" />
        )}
      </button>
      <pre className="p-4 text-xs leading-relaxed text-[#c9d1d9] overflow-x-auto font-mono whitespace-pre">
        {code.trim().split("\n").map((line, i) => {
          if (line.startsWith("#")) {
            return (
              <span key={i} className="block text-white/30">
                {line}
                {"\n"}
              </span>
            );
          }
          if (line.startsWith("chameleon")) {
            const parts = line.split(" ");
            return (
              <span key={i} className="block">
                <span className="text-emerald-400">{parts[0]}</span>
                {parts[1] ? <span className="text-indigo-400"> {parts[1]}</span> : ""}
                {parts.slice(2).join(" ") ? (
                  <span className="text-white"> {parts.slice(2).join(" ")}</span>
                ) : (
                  ""
                )}
                {"\n"}
              </span>
            );
          }
          return (
            <span key={i} className="block text-[#c9d1d9]">
              {line}
              {"\n"}
            </span>
          );
        })}
      </pre>
    </div>
  );
};

// ─── Command Card ─────────────────────────────────────────────────────────────

const CommandCard: React.FC<{ cmd: (typeof CLI_COMMANDS)[0]; isActive: boolean; onClick: () => void }> = ({
  cmd,
  isActive,
  onClick,
}) => {
  const Icon = cmd.icon;
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-xl border transition-all duration-200 font-mono",
        isActive
          ? "bg-indigo-500/10 border-indigo-500/30 shadow-lg shadow-indigo-500/5"
          : "bg-white/3 border-white/8 hover:border-white/15 hover:bg-white/5",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
            isActive ? "bg-indigo-500/20" : "bg-white/5",
          )}
        >
          <Icon className={cn("w-4 h-4", isActive ? "text-indigo-400" : "text-white/40")} />
        </div>
        <div className="flex-1 min-w-0">
          <code
            className={cn(
              "text-sm font-bold",
              isActive ? "text-indigo-300" : "text-white/80",
            )}
          >
            {cmd.cmd}
          </code>
        </div>
        <span
          className={cn(
            "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
            BADGE_COLORS[cmd.badge] ?? "bg-white/5 text-white/30 border-white/10",
          )}
        >
          {cmd.badge}
        </span>
      </div>
    </button>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export const CLIDocsPage: React.FC = () => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [search, setSearch] = useState("");
  const [activeCmd, setActiveCmd] = useState("init");
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  const installCmd = "npm install -g @chameleon-ui-lib/react";

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(installCmd);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleCopyMarkdown = () => {
    const md = [
      "# Chameleon CLI — Complete Reference",
      "",
      "> A first-class command-line interface for scaffolding components, managing themes,",
      "> running health checks, and launching the dev server.",
      "",
      "## Install",
      "```bash",
      "npm install -g @chameleon-ui-lib/react",
      "chameleon --version",
      "```",
      "",
      ...CATEGORY_ORDER.flatMap((cat) => {
        const cmds = CLI_COMMANDS.filter((c) => c.category === cat);
        if (!cmds.length) return [];
        return [
          `## ${cat}`,
          "",
          ...cmds.flatMap((c) => [
            `### \`chameleon ${c.cmd}\``,
            "",
            `**Usage:** \`${c.usage}\``,
            "",
            c.desc.replace(/`([^`]+)`/g, "`$1`"),
            "",
            ...(c.flags.length
              ? ["**Flags:**", ...c.flags.map((f) => `- \`${f}\``), ""]
              : []),
            "**Example:**",
            "```bash",
            c.example,
            "```",
            "",
          ]),
        ];
      }),
      "---",
      "## Quick Reference",
      "",
      "| Command | Category | Description |",
      "|---------|----------|-------------|",
      ...CLI_COMMANDS.map(
        (c) => `| \`chameleon ${c.cmd}\` | ${c.category} | ${c.desc.split(".")[0]} |`,
      ),
    ].join("\n");

    navigator.clipboard.writeText(md);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  const filtered = CLI_COMMANDS.filter(
    (c) =>
      c.cmd.includes(search.toLowerCase()) ||
      c.desc.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()),
  );

  const selected = CLI_COMMANDS.find((c) => c.cmd === activeCmd) ?? CLI_COMMANDS[0]!;
  const SelectedIcon = selected.icon;

  const grouped = CATEGORY_ORDER.reduce<Record<string, typeof CLI_COMMANDS>>((acc, cat) => {
    const items = filtered.filter((c) => c.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div className="pb-20 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center border border-indigo-500/20">
              <Terminal className="w-5 h-5 text-indigo-400" />
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] font-black uppercase tracking-widest">
              CLI Reference
            </Badge>
          </div>

          {/* Copy as Markdown */}
          <button
            onClick={handleCopyMarkdown}
            className={cn(
              "shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border",
              copiedMarkdown
                ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/30"
                : "bg-[var(--muted)] text-[var(--muted-foreground)] border-[var(--border)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]",
            )}
          >
            {copiedMarkdown ? (
              <><Check className="w-3.5 h-3.5" /> Copied!</>
            ) : (
              <><Copy className="w-3.5 h-3.5" /> Copy as Markdown</>
            )}
          </button>
        </div>
        <h1 className={cn("text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3", textPrimary)}>
          Chameleon CLI
        </h1>
        <p className={cn("text-xl max-w-2xl leading-relaxed", textMuted)}>
          A first-class command-line interface for scaffolding components, managing themes, running
          health checks, and launching the dev server — all from your terminal.
        </p>
      </div>

      {/* Install card */}
      <div className="rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase ml-2">
            Installation
          </span>
        </div>
        <div className="p-6 space-y-4 font-mono text-sm">
          <p className="text-white/30 text-xs"># Install the Chameleon CLI globally</p>
          <div className="flex items-center justify-between group bg-white/5 px-4 py-3 rounded-xl border border-white/10">
            <code>
              <span className="text-emerald-400">npm install</span>
              <span className="text-white"> -g </span>
              <span className="text-indigo-400">@chameleon-ui-lib/react</span>
            </code>
            <button
              onClick={handleCopyInstall}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-all"
            >
              {copiedInstall ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-white/30 hover:text-white/70" />
              )}
            </button>
          </div>
          <p className="text-white/30 text-xs"># Verify the installation</p>
          <code className="block text-white/60">
            <span className="text-emerald-400">chameleon</span>
            <span className="text-white"> --version</span>
          </code>
        </div>
      </div>

      {/* CLI Mockup */}
        <CLIMockup />


      {/* Command Reference */}
      <div>
        <h2 className={cn("text-2xl font-black tracking-tight mb-1", textPrimary)}>
          Command Reference
        </h2>
        <p className={cn("text-sm mb-6", textMuted)}>
          {CLI_COMMANDS.length} commands available — click any command to see full details.
        </p>

        {/* Search */}
        <div className="relative mb-6 lg:hidden">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commands…"
            className="w-full bg-[#0d1117] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-indigo-500/40 focus:bg-[#0d1117] font-mono"
          />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Left: command list */}
          <div className="rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden p-4 space-y-6">
            {/* Search (inside dark card) */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search commands…"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-indigo-500/40 font-mono"
              />
            </div>

            {Object.entries(grouped).map(([cat, cmds]) => (
              <div key={cat}>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/25 px-1 mb-2">
                  {cat}
                </p>
                <div className="space-y-1.5">
                  {cmds.map((c) => (
                    <CommandCard
                      key={c.cmd}
                      cmd={c}
                      isActive={activeCmd === c.cmd}
                      onClick={() => setActiveCmd(c.cmd)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: detail panel */}
          <div className="rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden sticky top-20 self-start">
            {/* Detail header */}
            <div className="px-6 py-5 border-b border-white/8 bg-[#161b22]/60">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                    <SelectedIcon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <code className="text-xl font-black text-white">{selected.cmd}</code>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">
                      {selected.category}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border",
                    BADGE_COLORS[selected.badge] ?? "bg-white/5 text-white/30 border-white/10",
                  )}
                >
                  {selected.badge}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6 font-mono text-sm">
              {/* Usage */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">
                  Usage
                </p>
                <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/8">
                  <code className="text-emerald-300">{selected.usage}</code>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">
                  Description
                </p>
                <p className="text-white/60 text-sm leading-relaxed font-sans">
                  {selected.desc.replace(/`([^`]+)`/g, (_, m) => m)}
                </p>
              </div>

              {/* Flags */}
              {selected.flags.length > 0 && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">
                    Flags
                  </p>
                  <ul className="space-y-1.5">
                    {selected.flags.map((f) => {
                      const [flag, ...rest] = f.split(" — ");
                      return (
                        <li key={f} className="flex items-start gap-2">
                          <code className="text-cyan-400 text-xs flex-shrink-0">{flag}</code>
                          <span className="text-white/40 text-xs">— {rest.join(" — ")}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Example */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">
                  Example
                </p>
                <CodeBlock code={selected.example} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick reference grid */}
      <div>
        <h2 className={cn("text-2xl font-black tracking-tight mb-6", textPrimary)}>
          Quick Reference
        </h2>
        <div className="rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden overflow-x-auto">
          <div className="min-w-[480px]">
          <div className="grid grid-cols-[1fr_2fr_auto] text-[10px] font-black uppercase tracking-widest text-white/20 px-5 py-3 border-b border-white/5">
            <span>Command</span>
            <span>Description</span>
            <span>Type</span>
          </div>
          {CLI_COMMANDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <button
                key={c.cmd}
                onClick={() => setActiveCmd(c.cmd)}
                className={cn(
                  "w-full grid grid-cols-[1fr_2fr_auto] items-center px-5 py-3.5 text-sm transition-colors text-left",
                  i % 2 === 0 ? "bg-white/[0.01]" : "bg-transparent",
                  "hover:bg-indigo-500/5 border-b border-white/5 last:border-0",
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                  <code className="text-indigo-300 font-bold">chameleon {c.cmd}</code>
                </div>
                <span className="text-white/40 text-xs pr-4 font-sans truncate">{c.desc.split(".")[0]}</span>
                <span
                  className={cn(
                    "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border whitespace-nowrap",
                    BADGE_COLORS[c.badge] ?? "bg-white/5 text-white/30 border-white/10",
                  )}
                >
                  {c.badge}
                </span>
              </button>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
};
