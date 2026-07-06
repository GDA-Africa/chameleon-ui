/**
 * Agent SDK docs page (v2.0) — the workshop's guide to Chameleon as a tool
 * surface for AI agents: MCP server, ChameleonSpec/AppSpec, brand pipeline,
 * preview/playground, and the registry.
 */

import React, { useState } from "react";
import { Bot, Terminal, FileJson, Palette, Eye, Package, Copy, Check, AppWindow } from "lucide-react";
import { cn } from "./utils";
import { useThemeClasses } from "./context";
import { Badge } from "./atoms";

const MCP_REGISTER = "claude mcp add chameleon -- npx -y -p @chameleon-ui-lib/react chameleon mcp";

const SPEC_EXAMPLE = `{
  "version": 1,
  "name": "team-members",
  "blocks": [
    { "component": "stat-card", "props": { "label": "Team Size", "value": "14" } },
    { "component": "data-table", "props": { "title": "Members",
      "data": [{ "name": "Ada", "role": "Engineering" }],
      "columns": [{ "key": "name", "label": "Name" }, { "key": "role", "label": "Role" }] } }
  ],
  "theme": "glassy", "mode": "dark"
}`;

const APPSPEC_EXAMPLE = `{
  "version": 2,
  "app": { "name": "bakery-crm", "brand": { "primaryColor": "#8B4513", "fontFamily": "Sora" } },
  "shell": { "nav": "sidebar", "theme": "glassy" },
  "pages": [
    { "route": "/", "title": "Dashboard", "spec": { "version": 1, "name": "dashboard", "blocks": [
      { "component": "stat-card", "props": { "label": "Orders Today", "value": "47" } }
    ] } }
  ],
  "dataSlots": [{ "id": "orders", "shape": "table", "mock": true }]
}`;

const TOOL_GROUPS: { group: string; tools: [string, string][] }[] = [
  {
    group: "Discover",
    tools: [
      ["search_components", "Resolve 'login form' to components, templates, and recipes — ranked"],
      ["list_catalog / get_component_info", "Full catalog: 29 components, 14 templates, props, variants"],
      ["list_recipes / get_recipe", "10 stored, validated page specs ready to compose"],
      ["search_registry", "Community/first-party items beyond the built-in library"],
    ],
  },
  {
    group: "Compose & Scaffold",
    tools: [
      ["validate_spec / compose_from_blocks", "Validate a ChameleonSpec (pathed errors + typo suggestions), then write the page"],
      ["scaffold_component / scaffold_template", "Classic shadcn-style file scaffolding"],
      ["validate_app_spec / scaffold_app", "AppSpec v2 → a complete runnable application"],
      ["add_registry_item", "Install registry items — source code requires explicit user approval"],
    ],
  },
  {
    group: "Brand & Verify",
    tools: [
      ["extract_brand", "Candidate palettes + fonts from a website or SVG logo, with provenance"],
      ["set_brand / check_brand_contrast", "Persist brand tokens; WCAG AA audit on every pair"],
      ["preview_spec / get_playground_url", "Screenshots + contrast audit; shareable /play link before files are written"],
      ["validate_project / init_project", "Health checks agents can self-run after scaffolding"],
    ],
  },
];

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      {label && (
        <div className="px-4 pt-3 text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">{label}</div>
      )}
      <pre className="p-4 text-xs leading-relaxed overflow-x-auto text-[var(--card-foreground)]">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => { void navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
        className="absolute top-2 right-2 p-2 rounded-lg border border-[var(--border)] bg-[var(--background)] opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />}
      </button>
    </div>
  );
}

export function AgentSDKPage() {
  const { textPrimary, textMuted } = useThemeClasses();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
      {/* Hero */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8 text-[var(--primary)]" />
          <h1 className={cn("text-3xl font-black", textPrimary)}>The Agent SDK</h1>
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30">v2.0</Badge>
        </div>
        <p className={cn("text-lg max-w-3xl", textMuted)}>
          Chameleon UI is a tool surface AI agents <em>call</em> — not just a library they read about. Say{" "}
          <span className="text-[var(--primary)] font-semibold">“build me a CRM for my bakery — brand from my site”</span>{" "}
          to Claude Code and it lands as a running, branded, WCAG-audited application.
        </p>
        <CodeBlock label="Register the MCP server once" code={MCP_REGISTER} />
        <p className={cn("text-sm", textMuted)}>
          No MCP? <code className="text-[var(--primary)]">npx chameleon agents init</code> teaches any coding agent via CLAUDE.md /
          AGENTS.md / .cursorrules. Every CLI command speaks <code className="text-[var(--primary)]">--json</code>.
        </p>
      </header>

      {/* The flow */}
      <section className="space-y-4">
        <h2 className={cn("text-xl font-bold flex items-center gap-2", textPrimary)}>
          <Terminal className="w-5 h-5 text-[var(--primary)]" /> How an agent builds UI
        </h2>
        <div className="grid md:grid-cols-5 gap-3">
          {[
            ["1 · Search", "search_components(“login form”) — ranked matches + recipes"],
            ["2 · Compose", "get_recipe → edit props → compose_from_blocks"],
            ["3 · Brand", "extract_brand(url) → set_brand → AA contrast audit"],
            ["4 · Preview", "preview_spec → screenshots + a /play link for the human"],
            ["5 · Verify", "validate_project — the agent checks its own work"],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="text-sm font-black text-[var(--primary)] mb-1">{title}</div>
              <div className={cn("text-xs leading-relaxed", textMuted)}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Spec language */}
      <section className="space-y-4">
        <h2 className={cn("text-xl font-bold flex items-center gap-2", textPrimary)}>
          <FileJson className="w-5 h-5 text-[var(--primary)]" /> ChameleonSpec — pages as validated data
        </h2>
        <p className={cn("text-sm max-w-3xl", textMuted)}>
          Agents emit JSON, not JSX. Specs are validated against the component catalog <em>before</em> any file is written or pixel
          rendered — errors come back pathed, with typo suggestions. Deliberately flat: a template <em>or</em> blocks, no nesting.
        </p>
        <CodeBlock label="ChameleonSpec v1 — chameleon compose spec.json" code={SPEC_EXAMPLE} />
        <p className={cn("text-sm", textMuted)}>
          Same spec, three consumers: <code className="text-[var(--primary)]">scaffoldSpec</code> writes real files,{" "}
          <code className="text-[var(--primary)]">&lt;RenderSpec&gt;</code> renders live, and{" "}
          <a href="/play" target="_blank" rel="noreferrer" className="text-[var(--primary)] underline">/play</a> makes it a shareable
          link. Try the built-in recipes: <code className="text-[var(--primary)]">chameleon recipes</code>.
        </p>
      </section>

      {/* AppSpec */}
      <section className="space-y-4">
        <h2 className={cn("text-xl font-bold flex items-center gap-2", textPrimary)}>
          <AppWindow className="w-5 h-5 text-[var(--primary)]" /> AppSpec — sentence → application
        </h2>
        <p className={cn("text-sm max-w-3xl", textMuted)}>
          v2 composes page specs into whole applications: router and nav generated from <code>pages</code>, brand applied everywhere,
          typed mock data with <code className="text-[var(--primary)]">// CHAMELEON-DATA</code> replacement seams, agent rulesets included.
        </p>
        <CodeBlock label="AppSpec v2 — chameleon new bakery-crm --app-spec app.json" code={APPSPEC_EXAMPLE} />
      </section>

      {/* Tools */}
      <section className="space-y-4">
        <h2 className={cn("text-xl font-bold flex items-center gap-2", textPrimary)}>
          <Package className="w-5 h-5 text-[var(--primary)]" /> 23 MCP tools
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {TOOL_GROUPS.map((g) => (
            <div key={g.group} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
              <div className="text-xs font-black uppercase tracking-widest text-[var(--primary)]">{g.group}</div>
              {g.tools.map(([name, desc]) => (
                <div key={name}>
                  <code className={cn("text-xs font-bold", textPrimary)}>{name}</code>
                  <p className={cn("text-xs leading-relaxed mt-0.5", textMuted)}>{desc}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Brand + playground strip */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-2">
          <h3 className={cn("font-bold flex items-center gap-2", textPrimary)}>
            <Palette className="w-4 h-4 text-[var(--primary)]" /> Brand pipeline
          </h3>
          <p className={cn("text-sm leading-relaxed", textMuted)}>
            <code className="text-[var(--primary)]">chameleon brand init --primary "#635BFF" --font Sora</code> persists tokens that
            compose with all 5 themes — the theme keeps its physics, your brand supplies hue, type, and radius. Every pair is
            WCAG-AA audited; extraction from a URL or SVG logo returns <em>candidates with provenance</em>, never auto-applied.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-2">
          <h3 className={cn("font-bold flex items-center gap-2", textPrimary)}>
            <Eye className="w-4 h-4 text-[var(--primary)]" /> Live playground
          </h3>
          <p className={cn("text-sm leading-relaxed", textMuted)}>
            Agents hand you a <a href="/play" target="_blank" rel="noreferrer" className="text-[var(--primary)] underline">/play</a>{" "}
            link so you see the page <em>before</em> files are written — switch themes and modes live, copy the spec or the CLI
            command. The same <code>/render</code> canvas powers screenshot verification and the (experimental) MCP Apps widget that
            renders Chameleon UI inside Claude and ChatGPT.
          </p>
        </div>
      </section>

      <footer className={cn("text-xs pb-8", textMuted)}>
        Full reference: <code>AI_INTEGRATION_GUIDE.md</code> · <code>docs/CLI_JSON.md</code> · <code>docs/MIGRATION_v2.md</code> ·
        machine-readable at <code>/llms.txt</code>
      </footer>
    </div>
  );
}
