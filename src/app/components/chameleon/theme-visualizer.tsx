/**
 * Theme Visualizer v2.0 — the brand cockpit.
 *
 * Set your brand once and the ENTIRE workshop rebrands — backgrounds, cards,
 * borders, ambient blends, every demo component on every page. Then walk the
 * platform: Components, Composites and Templates all render in YOUR brand, and
 * everything you copy (code or ChameleonSpec JSON) carries it. Agents pick it
 * up from brand.config.json / the spec's brand field and build the rest.
 */

import React, { useMemo, useState } from "react";
import { Palette, Wand2, Check, Copy, X, Sparkles, Type, CircleDot, Eye, Bot } from "lucide-react";
import { cn, deriveBrandPalette, brandPaletteToCss, contrastRatio, getContrastColor } from "./utils";
import { useChameleon, useThemeClasses, type ChameleonBrand } from "./context";
import { Button, Badge } from "./atoms";
import { Card, CardContent } from "./molecules";
import { RenderSpec, type ChameleonSpec } from "./render-spec";

const PRESETS: { name: string; brand: ChameleonBrand }[] = [
  { name: "Indigo SaaS",  brand: { primaryColor: "#635bff", accentColor: "#00d4ff", fontFamily: "Inter",   radius: "0.75rem" } },
  { name: "Forest",       brand: { primaryColor: "#16a34a", secondaryColor: "#365314", fontFamily: "Sora", radius: "1rem" } },
  { name: "Sunset",       brand: { primaryColor: "#f97316", secondaryColor: "#be123c", fontFamily: "Poppins", radius: "1.25rem" } },
  { name: "Royal",        brand: { primaryColor: "#7c3aed", accentColor: "#c026d3",  fontFamily: "Manrope", radius: "0.5rem" } },
  { name: "Banking",      brand: { primaryColor: "#0a2540", secondaryColor: "#635bff", fontFamily: "IBM Plex Sans", radius: "0.375rem" } },
  { name: "Bakery",       brand: { primaryColor: "#8b4513", accentColor: "#d97706",  fontFamily: "Lora",    radius: "1rem" } },
];

const FONTS = ["Inter", "Sora", "Poppins", "Manrope", "Lora", "IBM Plex Sans", "system-ui"];
const RADII = ["0rem", "0.375rem", "0.75rem", "1rem", "1.5rem"];

const PREVIEW_SPEC: ChameleonSpec = {
  version: 1,
  name: "brand-preview",
  blocks: [
    { component: "stat-card", props: { label: "Monthly Revenue", value: "$48,210", trend: "up", trendValue: "+12.4%" } },
    { component: "badge", props: { children: "Your brand, live" } },
    {
      component: "data-table",
      props: {
        title: "Recent Activity",
        pageSize: 3,
        data: [
          { event: "Brand applied", surface: "Entire workshop", status: "Live" },
          { event: "Palette derived", surface: "14 tokens × 2 modes", status: "Done" },
          { event: "WCAG audit", surface: "All pairs", status: "Checked" },
        ],
        columns: [
          { key: "event", label: "Event" },
          { key: "surface", label: "Surface" },
          { key: "status", label: "Status" },
        ],
      },
    },
  ],
};

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => { void navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="font-bold"
    >
      {copied ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
      {copied ? "Copied" : label}
    </Button>
  );
}

function Swatch({ name, hex, on }: { name: string; hex: string; on: string }) {
  // Label color derives from the panel background it sits on, so the dark-mode
  // palette stays legible even while the page is in light mode (and vice versa).
  const label = getContrastColor(on);
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-lg shrink-0 border" style={{ background: hex, borderColor: label === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)" }} />
      <div className="min-w-0">
        <div className="text-xs font-bold" style={{ color: label }}>{name}</div>
        <div className="text-[10px] font-mono truncate" style={{ color: label, opacity: 0.6 }}>{hex}</div>
      </div>
    </div>
  );
}

export function ThemeVisualizer() {
  const { brandOverride, setBrandOverride, mode, setMode } = useChameleon();
  const { textPrimary, textMuted } = useThemeClasses();

  const [draft, setDraft] = useState<ChameleonBrand>(
    brandOverride ?? { primaryColor: "#635bff", fontFamily: "Inter", radius: "0.75rem" },
  );
  const applied = brandOverride !== null;

  const light = useMemo(() => deriveBrandPalette(draft, "light"), [draft]);
  const dark  = useMemo(() => deriveBrandPalette(draft, "dark"), [draft]);

  const audit = useMemo(() => {
    const rows: { pair: string; ratio: number; required: number }[] = [];
    const push = (pair: string, fg: string, bg: string, required = 4.5) => rows.push({ pair, ratio: contrastRatio(fg, bg), required });
    push("Primary text on primary", getContrastColor(draft.primaryColor), draft.primaryColor);
    push("Foreground on background · light", light["--foreground"]!, light["--background"]!);
    push("Foreground on background · dark", dark["--foreground"]!, dark["--background"]!);
    push("Muted text on background · light", light["--muted-foreground"]!, light["--background"]!);
    push("Muted text on background · dark", dark["--muted-foreground"]!, dark["--background"]!);
    push("Primary on background · light", light["--primary"]!, light["--background"]!, 3.0);
    push("Primary on background · dark", dark["--primary"]!, dark["--background"]!, 3.0);
    return rows;
  }, [draft, light, dark]);
  const allPass = audit.every((r) => r.ratio >= r.required);

  const brandJson = JSON.stringify({ version: 1, ...draft }, null, 2);
  const cliCmd = [
    `npx chameleon brand init --primary "${draft.primaryColor}"`,
    draft.secondaryColor ? `--secondary "${draft.secondaryColor}"` : "",
    draft.accentColor ? `--accent "${draft.accentColor}"` : "",
    draft.fontFamily ? `--font "${draft.fontFamily}"` : "",
    draft.radius ? `--radius ${draft.radius}` : "",
  ].filter(Boolean).join(" ");
  const specSnippet = JSON.stringify(
    { version: 1, name: "my-page", blocks: [{ component: "stat-card", props: { label: "Hello", value: "Brand" } }], brand: draft },
    null, 2,
  );
  const playUrl = `/play?spec=${btoa(JSON.stringify({ ...PREVIEW_SPEC, brand: draft })).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}`;

  const colorField = (label: string, key: "primaryColor" | "secondaryColor" | "accentColor", optional = false) => (
    <div className="space-y-1.5">
      <label className={cn("text-[10px] font-black uppercase tracking-widest", textMuted)}>{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={draft[key] ?? draft.primaryColor}
          onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
          className="w-10 h-10 rounded-lg border border-[var(--border)] bg-transparent cursor-pointer"
          aria-label={label}
        />
        <input
          type="text"
          value={draft[key] ?? ""}
          placeholder={optional ? "auto-derived" : "#635bff"}
          onChange={(e) => setDraft({ ...draft, [key]: e.target.value || undefined })}
          className="flex-1 h-10 px-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] font-mono text-sm"
        />
        {optional && draft[key] && (
          <button onClick={() => setDraft({ ...draft, [key]: undefined })} aria-label={`clear ${label}`} className="p-2 text-[var(--muted-foreground)]">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 sm:justify-between">
        <div className="flex items-center gap-3">
          <Palette className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--primary)] shrink-0" />
          <div>
            <h1 className={cn("text-2xl sm:text-3xl font-black", textPrimary)}>Theme Visualizer</h1>
            <p className={cn("text-sm", textMuted)}>Set your brand once — the whole platform becomes your design system.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {applied && <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30">● Brand live on entire site</Badge>}
          <Button variant="outline" size="sm" onClick={() => setMode(mode === "dark" ? "light" : "dark")} className="font-bold">
            {mode === "dark" ? "☾ Dark" : "☀ Light"}
          </Button>
        </div>
      </div>

      {/* The pitch */}
      <Card>
        <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-x-6 sm:gap-y-2 text-xs sm:text-sm">
          <span className={cn("font-black", textPrimary)}><Sparkles className="w-4 h-4 inline mr-1 text-[var(--primary)]" />How it works:</span>
          <span className={textMuted}>1 · Pick your brand</span>
          <span className={textMuted}>2 · Apply — every demo, template & composite on the site rebrands</span>
          <span className={textMuted}>3 · Walk the platform and copy any component — code or agent-ready JSON — your brand is already in it</span>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Controls */}
        <Card className="lg:col-span-2">
          <CardContent className="p-4 sm:p-5 space-y-5">
            <div className="space-y-2">
              <label className={cn("text-[10px] font-black uppercase tracking-widest", textMuted)}>Presets</label>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setDraft(p.brand)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border)] text-xs font-bold text-[var(--foreground)] hover:border-[var(--primary)] transition-colors"
                  >
                    <span className="w-3 h-3 rounded-full" style={{ background: p.brand.primaryColor }} />
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {colorField("Primary", "primaryColor")}
            {colorField("Secondary (optional)", "secondaryColor", true)}
            {colorField("Accent (optional)", "accentColor", true)}

            <div className="space-y-1.5">
              <label className={cn("text-[10px] font-black uppercase tracking-widest flex items-center gap-1", textMuted)}><Type className="w-3 h-3" />Font family</label>
              <div className="flex flex-wrap gap-1.5">
                {FONTS.map((f) => (
                  <button key={f} onClick={() => setDraft({ ...draft, fontFamily: f })}
                    className={cn("px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-colors",
                      draft.fontFamily === f ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]" : "border-[var(--border)] text-[var(--foreground)]")}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={cn("text-[10px] font-black uppercase tracking-widest flex items-center gap-1", textMuted)}><CircleDot className="w-3 h-3" />Corner radius</label>
              <div className="flex flex-wrap gap-1.5">
                {RADII.map((r) => (
                  <button key={r} onClick={() => setDraft({ ...draft, radius: r })}
                    className={cn("px-2.5 py-1.5 border text-xs font-mono font-bold transition-colors",
                      draft.radius === r ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]" : "border-[var(--border)] text-[var(--foreground)]")}
                    style={{ borderRadius: r === "0rem" ? 0 : r }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button animated onClick={() => setBrandOverride(draft)} className="flex-1 font-black">
                <Wand2 className="w-4 h-4 mr-2" />
                {applied ? "Update site brand" : "Apply to entire site"}
              </Button>
              {applied && (
                <Button variant="outline" onClick={() => setBrandOverride(null)} className="font-bold">
                  <X className="w-4 h-4 mr-1" /> Reset
                </Button>
              )}
            </div>
            <p className={cn("text-[11px] leading-relaxed", textMuted)}>
              Applies a full derived palette — background, cards, borders, muted tones and the ambient theme blends — across every page. Browse Components, Composites and Templates to see <em>your</em> product, not ours.
            </p>
          </CardContent>
        </Card>

        {/* Palette + audit */}
        <Card className="lg:col-span-3">
          <CardContent className="p-4 sm:p-5 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {([["Light mode", light], ["Dark mode", dark]] as const).map(([label, vars]) => (
                <div key={label} className="space-y-3">
                  <div className={cn("text-[10px] font-black uppercase tracking-widest", textMuted)}>{label}</div>
                  <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2.5 rounded-xl border border-[var(--border)] p-3" style={{ background: vars["--background"] }}>
                    {["--primary", "--secondary", "--accent", "--card", "--muted", "--border", "--foreground", "--muted-foreground"].map((k) => (
                      <Swatch key={k} name={k.replace("--", "")} hex={vars[k]!} on={vars["--background"]!} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={cn("text-[10px] font-black uppercase tracking-widest", textMuted)}>WCAG contrast audit</span>
                <Badge className={allPass ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" : "bg-amber-500/10 text-amber-500 border-amber-500/30"}>
                  {allPass ? "All pairs pass" : "Review needed"}
                </Badge>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                {audit.map((r) => (
                  <div key={r.pair} className="flex items-center justify-between text-xs py-1 border-b border-[var(--border)]/50">
                    <span className={cn("min-w-0 truncate pr-2", textMuted)}>{r.pair}</span>
                    <span className={cn("font-mono font-bold shrink-0 whitespace-nowrap", r.ratio >= r.required ? "text-emerald-500" : "text-amber-500")}>
                      {r.ratio.toFixed(2)}:1 {r.ratio >= r.required ? "✓" : `< ${r.required}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exports */}
      <Card>
        <CardContent className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-[var(--primary)]" />
              <span className={cn("font-black", textPrimary)}>Take it with you</span>
              <span className={cn("text-sm", textMuted)}>— for your stylesheet, your repo, or your AI agent</span>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full sm:w-auto">
              <CopyButton text={brandPaletteToCss(draft)} label="CSS variables" />
              <CopyButton text={brandJson} label="brand.config.json" />
              <CopyButton text={cliCmd} label="CLI command" />
              <CopyButton text={specSnippet} label="Agent spec (JSON)" />
            </div>
          </div>
          <pre className="p-3 sm:p-4 rounded-xl bg-black/90 text-emerald-300 text-[10px] sm:text-xs overflow-x-auto leading-relaxed">
            <code>{`${cliCmd}
# → brand.config.json + chameleon-brand.css + WCAG audit
# agents: pass "brand" in any ChameleonSpec, or <ChameleonProvider brand={...}>`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Live preview — real components through RenderSpec */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Eye className="w-5 h-5 text-[var(--primary)] shrink-0" />
          <h2 className={cn("text-xl font-black", textPrimary)}>Live preview</h2>
          <span className={cn("text-sm", textMuted)}>
            real components via ChameleonSpec — {applied ? "your brand is applied" : "hit Apply to see your brand"}
          </span>
        </div>
        <div className="rounded-2xl border border-[var(--border)] overflow-x-auto" style={{ background: "var(--background)" }}>
          <RenderSpec spec={PREVIEW_SPEC} />
        </div>
        <p className={cn("text-xs pb-8", textMuted)}>
          Share it: <a className="text-[var(--primary)] underline" href={playUrl} target="_blank" rel="noreferrer">open this preview in the playground</a> — your brand travels inside the spec.
        </p>
      </div>
    </div>
  );
}
