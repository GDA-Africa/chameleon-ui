import React, { useMemo, useState } from "react";
import { Search, Code, Copy, Check, Wrench } from "lucide-react";
import { Button, Input, Badge } from "./atoms";
import { Alert } from "./molecules";
import { useThemeClasses } from "./context";
import { cn } from "./utils";
import { CopyPageForAIPanel } from "./ai-helpers";

type DocsKind = "hook" | "provider" | "utility" | "constant" | "type";
type KindFilter = "all" | DocsKind;

interface ApiRow {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  default?: string;
}

interface DocsEntry {
  id: string;
  name: string;
  kind: DocsKind;
  description: string;
  importPath: string;
  apiRows: ApiRow[];
  exampleMinimal: string;
  exampleFull: string;
  keywords: string[];
  useCases: string[];
}

const kindOrder: KindFilter[] = ["all", "hook", "provider", "utility", "constant", "type"];
const kindLabel: Record<KindFilter, string> = {
  all: "All",
  hook: "Hooks",
  provider: "Providers",
  utility: "Utils",
  constant: "Constants",
  type: "Types",
};

const HOOKS_UTILS_DOCS_MARKDOWN = `# Chameleon UI — Hooks & Utils Directory

Search hooks and utilities, inspect full APIs, and copy context for AI.

## Hooks
- useChameleon
- useThemeClasses
- useAnimation

## Provider
- ChameleonProvider

## Utilities
- cn
- hexToRgb
- generateVariations
- getContrastColor

## Constants
- animationPresets
- translations

## Types
- ChameleonTheme
- ChameleonMode
- ChameleonLang
- ThemeAnimationPreset`;

const entries: DocsEntry[] = [
  {
    id: "useChameleon",
    name: "useChameleon",
    kind: "hook",
    description:
      "Primary context hook for reading and updating active theme, mode, language, and intensity controls.",
    importPath: "@chameleon-ui-lib/react",
    apiRows: [
      { name: "theme", type: "ChameleonTheme", description: "Current active theme" },
      { name: "setTheme", type: "(theme: ChameleonTheme) => void", description: "Switch active theme" },
      { name: "mode", type: "ChameleonMode", description: "Current mode" },
      { name: "setMode", type: "(mode: ChameleonMode) => void", description: "Switch mode" },
      { name: "lang", type: "ChameleonLang", description: "Current language" },
      { name: "setLang", type: "(lang: ChameleonLang) => void", description: "Switch language" },
      { name: "customBrandColor", type: "string | null", description: "Custom brand color" },
      {
        name: "setCustomBrandColor",
        type: "(value: string | null) => void",
        description: "Set or reset brand color",
      },
      { name: "glassyIntensity", type: "number", description: "Glassy intensity (0–100)" },
      {
        name: "setGlassyIntensity",
        type: "(value: number) => void",
        description: "Set glassy intensity",
      },
      { name: "liquidIntensity", type: "number", description: "Liquid intensity (0–100)" },
      {
        name: "setLiquidIntensity",
        type: "(value: number) => void",
        description: "Set liquid intensity",
      },
    ],
    exampleMinimal: `import { useChameleon } from "@chameleon-ui-lib/react";

const { theme, setTheme } = useChameleon();`,
    exampleFull: `import { useChameleon } from "@chameleon-ui-lib/react";

function ThemeControls() {
  const { theme, setTheme, mode, setMode, lang } = useChameleon();

  return (
    <div>
      <p>{theme} / {mode} / {lang}</p>
      <button onClick={() => setTheme("glassy")}>Use glassy</button>
      <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>Toggle mode</button>
    </div>
  );
}`,
    keywords: ["theme", "mode", "language", "context"],
    useCases: ["theme switchers", "mode toggles", "localized UI"],
  },
  {
    id: "useThemeClasses",
    name: "useThemeClasses",
    kind: "hook",
    description: "Returns ready-to-use theme-aware class strings for text, cards, buttons, and inputs.",
    importPath: "@chameleon-ui-lib/react",
    apiRows: [
      { name: "cardClass", type: "string", description: "Card base classes" },
      { name: "buttonPrimary", type: "string", description: "Primary button classes" },
      { name: "inputClass", type: "string", description: "Input classes" },
      { name: "textPrimary", type: "string", description: "Primary text classes" },
      { name: "textMuted", type: "string", description: "Muted text classes" },
      { name: "theme", type: "ChameleonTheme", description: "Current theme" },
      { name: "mode", type: "ChameleonMode", description: "Current mode" },
      { name: "isDark", type: "boolean", description: "Mode shortcut" },
    ],
    exampleMinimal: `import { useThemeClasses } from "@chameleon-ui-lib/react";

const { cardClass, textPrimary } = useThemeClasses();`,
    exampleFull: `import { useThemeClasses } from "@chameleon-ui-lib/react";

function ThemeCard() {
  const { cardClass, textPrimary, textMuted, buttonPrimary } = useThemeClasses();

  return (
    <div className={cardClass}>
      <h2 className={textPrimary}>Title</h2>
      <p className={textMuted}>Description</p>
      <button className={buttonPrimary}>Action</button>
    </div>
  );
}`,
    keywords: ["classes", "tokens", "styling"],
    useCases: ["theme-safe styling", "rapid theming"],
  },
  {
    id: "useAnimation",
    name: "useAnimation",
    kind: "hook",
    description: "Returns the active theme animation preset for enter, hover, tap, and staged motion variants.",
    importPath: "@chameleon-ui-lib/react",
    apiRows: [
      { name: "enter", type: "object", description: "Enter transition token" },
      { name: "hover", type: "object", description: "Hover transition token" },
      { name: "tap", type: "object", description: "Tap transition token" },
      { name: "fadeUp", type: "object", description: "Fade-up preset" },
      { name: "stagger", type: "object", description: "Staggered list preset" },
    ],
    exampleMinimal: `import { useAnimation } from "@chameleon-ui-lib/react";

const preset = useAnimation();`,
    exampleFull: `import { useAnimation } from "@chameleon-ui-lib/react";
import { motion } from "motion/react";

function AnimatedPanel({ children }: { children: React.ReactNode }) {
  const preset = useAnimation();

  return (
    <motion.div
      initial={preset.fadeUp.initial}
      animate={preset.fadeUp.animate}
      transition={preset.fadeUp.transition}
      whileHover={preset.hover}
    >
      {children}
    </motion.div>
  );
}`,
    keywords: ["motion", "presets", "animation"],
    useCases: ["theme-aware transitions", "motion consistency"],
  },
  {
    id: "ChameleonProvider",
    name: "ChameleonProvider",
    kind: "provider",
    description: "Root provider that initializes theme/mode/language context for all components.",
    importPath: "@chameleon-ui-lib/react",
    apiRows: [
      { name: "children", type: "ReactNode", description: "Application subtree", required: true },
      { name: "initialTheme", type: "ChameleonTheme", description: "Initial theme", default: '"material"' },
      { name: "initialMode", type: "ChameleonMode", description: "Initial mode", default: '"light"' },
      { name: "initialLang", type: "ChameleonLang", description: "Initial language", default: '"en"' },
    ],
    exampleMinimal: `import { ChameleonProvider } from "@chameleon-ui-lib/react";

<ChameleonProvider>
  <App />
</ChameleonProvider>;`,
    exampleFull: `import { ChameleonProvider } from "@chameleon-ui-lib/react";

function Root() {
  return (
    <ChameleonProvider initialTheme="glassy" initialMode="dark" initialLang="fr">
      <App />
    </ChameleonProvider>
  );
}`,
    keywords: ["provider", "context", "root"],
    useCases: ["app setup", "global theming"],
  },
  {
    id: "cn",
    name: "cn",
    kind: "utility",
    description: "Classname merger utility (clsx + tailwind-merge) for conditional Tailwind composition.",
    importPath: "@chameleon-ui-lib/react",
    apiRows: [
      { name: "...inputs", type: "ClassValue[]", description: "Class inputs", required: true },
      { name: "returns", type: "string", description: "Merged class string" },
    ],
    exampleMinimal: `import { cn } from "@chameleon-ui-lib/react";

cn("px-4", isActive && "bg-violet-600");`,
    exampleFull: `import { cn } from "@chameleon-ui-lib/react";

const buttonClass = cn(
  "px-4 py-2 rounded-md",
  isPrimary ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-900",
  disabled && "opacity-50 cursor-not-allowed"
);`,
    keywords: ["classnames", "tailwind merge"],
    useCases: ["conditional styles", "variant composition"],
  },
  {
    id: "hexToRgb",
    name: "hexToRgb",
    kind: "utility",
    description: "Converts a hex color string to RGB channels.",
    importPath: "@chameleon-ui-lib/react",
    apiRows: [
      { name: "hex", type: "string", description: "Hex color string", required: true },
      { name: "returns", type: "{ r: number; g: number; b: number } | null", description: "RGB or null" },
    ],
    exampleMinimal: `import { hexToRgb } from "@chameleon-ui-lib/react";

hexToRgb("#6200ee");`,
    exampleFull: `import { hexToRgb } from "@chameleon-ui-lib/react";

const rgb = hexToRgb("#ff5733");
// { r: 255, g: 87, b: 51 }`,
    keywords: ["color", "hex", "rgb"],
    useCases: ["color conversions"],
  },
  {
    id: "generateVariations",
    name: "generateVariations",
    kind: "utility",
    description: "Creates lighter and darker variants from a base hex color.",
    importPath: "@chameleon-ui-lib/react",
    apiRows: [
      { name: "baseColor", type: "string", description: "Base color", required: true },
      { name: "returns", type: "{ light: string; dark: string }", description: "Derived variants" },
    ],
    exampleMinimal: `import { generateVariations } from "@chameleon-ui-lib/react";

generateVariations("#6200ee");`,
    exampleFull: `import { generateVariations } from "@chameleon-ui-lib/react";

const { light, dark } = generateVariations("#6200ee");`,
    keywords: ["palette", "brand color"],
    useCases: ["custom theme generation"],
  },
  {
    id: "getContrastColor",
    name: "getContrastColor",
    kind: "utility",
    description: "Returns black or white for best text contrast against a background color.",
    importPath: "@chameleon-ui-lib/react",
    apiRows: [
      { name: "hex", type: "string", description: "Background color", required: true },
      { name: "returns", type: '"#000000" | "#ffffff"', description: "Best contrast text color" },
    ],
    exampleMinimal: `import { getContrastColor } from "@chameleon-ui-lib/react";

getContrastColor("#6200ee");`,
    exampleFull: `import { getContrastColor } from "@chameleon-ui-lib/react";

const textColor = getContrastColor("#03dac6");`,
    keywords: ["a11y", "contrast"],
    useCases: ["accessible color pairing"],
  },
  {
    id: "animationPresets",
    name: "animationPresets",
    kind: "constant",
    description: "Theme-keyed map of animation preset objects.",
    importPath: "@chameleon-ui-lib/react",
    apiRows: [
      { name: "type", type: "Record<ChameleonTheme, ThemeAnimationPreset>", description: "Preset map" },
      {
        name: "keys",
        type: '"material" | "simple" | "minimalist" | "glassy" | "liquid"',
        description: "Supported themes",
      },
    ],
    exampleMinimal: `import { animationPresets } from "@chameleon-ui-lib/react";

const enter = animationPresets.material.enter;`,
    exampleFull: `import { animationPresets } from "@chameleon-ui-lib/react";

const glassyHover = animationPresets.glassy.hover;
const liquidStagger = animationPresets.liquid.stagger;`,
    keywords: ["constants", "animation"],
    useCases: ["preset reuse outside hooks"],
  },
  {
    id: "translations",
    name: "translations",
    kind: "constant",
    description: "Built-in EN/ES/FR translation dictionary for common UI labels.",
    importPath: "@chameleon-ui-lib/react",
    apiRows: [
      {
        name: "type",
        type: "Record<ChameleonLang, Record<string, string>>",
        description: "Language map",
      },
      { name: "languages", type: '"en" | "es" | "fr"', description: "Supported languages" },
    ],
    exampleMinimal: `import { translations, useChameleon } from "@chameleon-ui-lib/react";

const { lang } = useChameleon();
const t = translations[lang];`,
    exampleFull: `import { translations, useChameleon } from "@chameleon-ui-lib/react";

function LoginButton() {
  const { lang } = useChameleon();
  const t = translations[lang];
  return <button>{t.signIn}</button>;
}`,
    keywords: ["i18n", "language"],
    useCases: ["localized labels"],
  },
  {
    id: "exported-types",
    name: "Exported Types",
    kind: "type",
    description: "Core public TypeScript contracts for themes, mode, language, and animation presets.",
    importPath: "@chameleon-ui-lib/react",
    apiRows: [
      {
        name: "ChameleonTheme",
        type: '"material" | "simple" | "minimalist" | "glassy" | "liquid"',
        description: "Theme union",
      },
      { name: "ChameleonMode", type: '"light" | "dark"', description: "Mode union" },
      { name: "ChameleonLang", type: '"en" | "es" | "fr"', description: "Language union" },
      { name: "ThemeAnimationPreset", type: "interface", description: "Animation token contract" },
    ],
    exampleMinimal: `import type { ChameleonTheme, ChameleonMode } from "@chameleon-ui-lib/react";`,
    exampleFull: `import type { ChameleonTheme, ThemeAnimationPreset } from "@chameleon-ui-lib/react";

const theme: ChameleonTheme = "material";

function applyPreset(preset: ThemeAnimationPreset) {
  return preset.fadeUp;
}`,
    keywords: ["typescript", "contracts"],
    useCases: ["typed integrations"],
  },
];

const buildEntryContext = (entry: DocsEntry): string => {
  const apiMarkdown = entry.apiRows
    .map((row) => {
      const details = [
        `type: ${row.type}`,
        `required: ${row.required ? "yes" : "no"}`,
        row.default ? `default: ${row.default}` : null,
      ]
        .filter(Boolean)
        .join(" | ");

      return `- ${row.name} — ${details} — ${row.description}`;
    })
    .join("\n");

  return `# ${entry.name}\n\n## API\n${apiMarkdown || "- None"}\n\n## Minimal\n${entry.exampleMinimal}\n\n## Full\n${entry.exampleFull}`;
};

const CodeBlock = ({ code, title }: { code: string; title: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/30 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)] bg-[var(--muted)]/50">
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">{title}</p>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(code.trim());
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
          )}
        </button>
      </div>
      <pre className="p-3 text-xs leading-relaxed overflow-x-auto">{code.trim()}</pre>
    </div>
  );
};

export const HooksUtilsDocsPage: React.FC = () => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");
  const [copiedContextId, setCopiedContextId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return entries.filter((entry) => {
      const kindMatch = kind === "all" || entry.kind === kind;
      if (!kindMatch) return false;
      if (!q) return true;

      return [entry.id, entry.name, entry.description, ...entry.keywords, ...entry.useCases]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [kind, query]);

  const counts = useMemo(() => {
    return entries.reduce<Record<DocsKind, number>>(
      (acc, entry) => {
        acc[entry.kind] += 1;
        return acc;
      },
      { hook: 0, provider: 0, utility: 0, constant: 0, type: 0 },
    );
  }, []);

  return (
    <div className="pb-20 space-y-8">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
              <Code className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <Badge className="text-[10px] font-black uppercase tracking-widest">Hooks & Utils Directory</Badge>
          </div>
          <CopyPageForAIPanel markdown={HOOKS_UTILS_DOCS_MARKDOWN} />
        </div>

        <h1 className={cn("text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3", textPrimary)}>
          Hooks & Utils Docs
        </h1>
        <p className={cn("text-base sm:text-lg max-w-3xl leading-relaxed", textMuted)}>
          Search every exported hook, provider, utility, constant, and type. Expand an item for
          import path, full API rows, and copy-ready usage examples.
        </p>
      </div>

      <Alert variant="info" animated>
        <div className="space-y-1">
          <p className="font-bold text-sm">Consistent docs format</p>
          <p className="text-sm">
            This page follows the same reference structure as component and composite docs for fast
            scanning and AI-ready context copy.
          </p>
        </div>
      </Alert>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)]/20 p-4 sm:p-6 space-y-4">
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by symbol, keyword, or use case..."
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {kindOrder.map((option) => {
            const isActive = kind === option;
            const count = option === "all" ? entries.length : counts[option as DocsKind];

            return (
              <button
                key={option}
                onClick={() => setKind(option)}
                className={cn(
                  "px-3 py-2 rounded-xl text-xs font-bold border transition-all",
                  isActive
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                    : "bg-[var(--card)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)]",
                )}
              >
                {kindLabel[option]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((entry) => (
          <details key={entry.id} className="group rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            <summary className="list-none cursor-pointer p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className={cn("text-base font-black", textPrimary)}>{entry.name}</p>
                  <p className={cn("text-sm mt-0.5", textMuted)}>{entry.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
                <Badge className="text-[9px] uppercase tracking-widest">{entry.kind}</Badge>
                <Badge className="text-[9px] uppercase tracking-widest">{entry.apiRows.length} api rows</Badge>
              </div>
            </summary>

            <div className="px-4 sm:px-5 pb-5 border-t border-[var(--border)] space-y-4">
              <div className="grid lg:grid-cols-[1fr_auto] gap-4 pt-4">
                <div>
                  <p className={cn("text-xs font-black uppercase tracking-widest mb-1.5", textMuted)}>Import</p>
                  <code className="block text-xs rounded-lg border border-[var(--border)] bg-[var(--muted)]/40 px-3 py-2 overflow-x-auto">
                    {`import { ${entry.name} } from "${entry.importPath}";`}
                  </code>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-2 text-xs"
                  onClick={async () => {
                    await navigator.clipboard.writeText(buildEntryContext(entry));
                    setCopiedContextId(entry.id);
                    setTimeout(() => setCopiedContextId(null), 1800);
                  }}
                >
                  {copiedContextId === entry.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      Context copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy context for AI
                    </>
                  )}
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                <CodeBlock title="Minimal usage" code={entry.exampleMinimal} />
                <CodeBlock title="Full usage" code={entry.exampleFull} />
              </div>

              <div className="space-y-2">
                <p className={cn("text-xs font-black uppercase tracking-widest", textMuted)}>Full API list</p>
                <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                  <table className="w-full text-xs">
                    <thead className="bg-[var(--muted)]/40">
                      <tr>
                        <th className="text-left p-2.5 font-black uppercase tracking-wider">Name</th>
                        <th className="text-left p-2.5 font-black uppercase tracking-wider">Type</th>
                        <th className="text-left p-2.5 font-black uppercase tracking-wider">Required</th>
                        <th className="text-left p-2.5 font-black uppercase tracking-wider">Default</th>
                        <th className="text-left p-2.5 font-black uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entry.apiRows.map((row) => (
                        <tr key={row.name} className="border-t border-[var(--border)] align-top">
                          <td className="p-2.5 font-mono">{row.name}</td>
                          <td className="p-2.5 font-mono">{row.type}</td>
                          <td className="p-2.5">{row.required ? "Yes" : "No"}</td>
                          <td className="p-2.5 font-mono">{row.default ?? "—"}</td>
                          <td className="p-2.5">{row.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};
