import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Palette,
  Layers,
  Zap,
  Type,
  Droplets,
  Hash,
  Globe,
  Wand2,
  Paintbrush,
  Eye,
} from "lucide-react";
import { cn } from "./utils";
import { useChameleon, useThemeClasses } from "./context";
import { CopyPageForAIPanel } from "./ai-helpers";

// ─── Code Block with Copy ────────────────────────────────────────────────────

function CodeBlock({ code, lang = "tsx" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const { mode } = useChameleon();
  const isDark = mode === "dark";

  return (
    <div className={cn(
      "relative rounded-xl overflow-hidden border text-sm font-mono",
      isDark
        ? "bg-[#0d1117] border-white/10 text-gray-300"
        : "bg-[#f6f8fa] border-gray-200 text-gray-800",
    )}>
      <div className={cn(
        "flex items-center justify-between px-4 py-2 border-b text-[10px] font-bold uppercase tracking-widest",
        isDark ? "border-white/10 text-gray-500" : "border-gray-200 text-gray-400",
      )}>
        <span>{lang}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="flex items-center gap-1 hover:text-[var(--primary)] transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─── Collapsible Section ─────────────────────────────────────────────────────

function Section({
  title,
  icon: Icon,
  badge,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const { cardClass, textPrimary, textMuted } = useThemeClasses();

  return (
    <div className={cn(cardClass, "overflow-hidden")}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-[var(--muted)]/30 transition-colors"
      >
        <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
          <Icon className="w-4.5 h-4.5 text-[var(--primary)]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={cn("text-base font-black tracking-tight", textPrimary)}>{title}</h3>
        </div>
        {badge && (
          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] shrink-0">
            {badge}
          </span>
        )}
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className={cn("w-4 h-4 shrink-0", textMuted)} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Props Table ─────────────────────────────────────────────────────────────

function PropsTable({ rows }: { rows: { name: string; type: string; description: string; default?: string }[] }) {
  const { mode } = useChameleon();
  const { textPrimary, textMuted } = useThemeClasses();
  const isDark = mode === "dark";

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className={cn("border-b border-[var(--border)]", isDark ? "bg-white/5" : "bg-[var(--muted)]/50")}>
            <th className={cn("text-left px-4 py-2.5 font-black text-xs uppercase tracking-widest", textMuted)}>Prop</th>
            <th className={cn("text-left px-4 py-2.5 font-black text-xs uppercase tracking-widest", textMuted)}>Type</th>
            <th className={cn("text-left px-4 py-2.5 font-black text-xs uppercase tracking-widest", textMuted)}>Default</th>
            <th className={cn("text-left px-4 py-2.5 font-black text-xs uppercase tracking-widest", textMuted)}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.name} className={cn("border-b border-[var(--border)] last:border-0", i % 2 === 0 ? "" : isDark ? "bg-white/[0.02]" : "bg-[var(--muted)]/20")}>
              <td className={cn("px-4 py-2.5 font-mono font-bold text-[var(--primary)]")}>{row.name}</td>
              <td className={cn("px-4 py-2.5 font-mono text-xs", textMuted)}>{row.type}</td>
              <td className={cn("px-4 py-2.5 font-mono text-xs", textMuted)}>{row.default || "—"}</td>
              <td className={cn("px-4 py-2.5", textPrimary)}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Return Values Table ─────────────────────────────────────────────────────

function ReturnsTable({ rows }: { rows: { name: string; type: string; description: string }[] }) {
  const { mode } = useChameleon();
  const { textPrimary, textMuted } = useThemeClasses();
  const isDark = mode === "dark";

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className={cn("border-b border-[var(--border)]", isDark ? "bg-white/5" : "bg-[var(--muted)]/50")}>
            <th className={cn("text-left px-4 py-2.5 font-black text-xs uppercase tracking-widest", textMuted)}>Property</th>
            <th className={cn("text-left px-4 py-2.5 font-black text-xs uppercase tracking-widest", textMuted)}>Type</th>
            <th className={cn("text-left px-4 py-2.5 font-black text-xs uppercase tracking-widest", textMuted)}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.name} className={cn("border-b border-[var(--border)] last:border-0", i % 2 === 0 ? "" : isDark ? "bg-white/[0.02]" : "bg-[var(--muted)]/20")}>
              <td className="px-4 py-2.5 font-mono font-bold text-[var(--primary)]">{row.name}</td>
              <td className={cn("px-4 py-2.5 font-mono text-xs", textMuted)}>{row.type}</td>
              <td className={cn("px-4 py-2.5", textPrimary)}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const HOOKS_UTILS_MARKDOWN = `# Chameleon UI — Hooks & Utils

## 🪝 Hooks
- \`useChameleon()\`: Access current \`theme\`, \`mode\`, \`lang\`, \`primaryColor\`, \`radius\`, and setter properties.
- \`useThemeClasses()\`: Returns CSS tailwind classes (\`textPrimary\`, \`textMuted\`, etc.) adapted to the active theme. Useful for deep UI customization.
- \`useAnimation()\`: Returns physics-based animation presets (\`hover\`, \`tap\`, \`fadeUp\`, \`stagger\`, etc.) specifically designed for the active theme. Built to be used with \`motion/react\`.

## 🛠️ Utils
- \`cn(...classes)\`: Tailwind's clsx + tailwind-merge utility for safe conditional class rendering. The backbone of all Chameleon atom components.
- \`CSS Variables\`: You can tap into \`var(--primary)\`, \`var(--border)\`, \`var(--card)\`, \`var(--muted)\`, etc. anywhere in your Tailwind classes.

## 🌍 i18n
- \`translations\`: A dictionary of strings (EN, ES, FR) for common UI elements.
- Usage: \`const { lang } = useChameleon(); const t = translations[lang]; return t.signIn;\`.
`;

// ─── Main Page ───────────────────────────────────────────────────────────────

export function HooksUtilsDocsPage() {
  const { textPrimary, textMuted, cardClass } = useThemeClasses();
  const { mode } = useChameleon();

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Hero */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-1 rounded-full">
              API Reference
            </span>
          </div>
          <CopyPageForAIPanel markdown={HOOKS_UTILS_MARKDOWN} />
        </div>
        <h1 className={cn("text-3xl sm:text-4xl font-black tracking-tight", textPrimary)}>
          Hooks & Utilities
        </h1>
        <p className={cn("text-base sm:text-lg leading-relaxed max-w-2xl", textMuted)}>
          Every hook, utility function, and constant exported from{" "}
          <code className="font-mono text-[var(--primary)] bg-[var(--primary)]/10 px-1.5 py-0.5 rounded-md text-sm">
            @chameleon-ui-lib/react
          </code>
          . Use these to build theme-aware, adaptive interfaces.
        </p>
      </div>

      {/* Quick Import */}
      <CodeBlock
        code={`import {
  // Hooks
  useChameleon,
  useThemeClasses,
  useAnimation,

  // Provider
  ChameleonProvider,

  // Utilities
  cn,
  hexToRgb,
  generateVariations,
  getContrastColor,

  // Constants
  animationPresets,
  translations,
} from "@chameleon-ui-lib/react";`}
      />

      {/* ── HOOKS ─────────────────────────────────────────────────────────── */}

      <h2 className={cn("text-xl font-black tracking-tight pt-4 flex items-center gap-2", textPrimary)}>
        <Zap className="w-5 h-5 text-[var(--primary)]" />
        Hooks
      </h2>

      {/* useChameleon */}
      <Section title="useChameleon" icon={Palette} badge="Core" defaultOpen>
        <p className={cn("leading-relaxed", textMuted)}>
          The primary hook for accessing and controlling the Chameleon theme context. Must be used inside a{" "}
          <code className="font-mono text-[var(--primary)]">ChameleonProvider</code>.
        </p>

        <CodeBlock
          code={`import { useChameleon } from "@chameleon-ui-lib/react";

function MyComponent() {
  const {
    theme,              // Current theme: "material" | "simple" | "minimalist" | "glassy" | "liquid"
    setTheme,           // Switch themes programmatically
    mode,               // "light" | "dark"
    setMode,            // Toggle dark/light mode
    lang,               // "en" | "es" | "fr"
    setLang,            // Switch language
    customBrandColor,   // Custom hex brand color or null
    setCustomBrandColor,// Apply a brand color across all themes
    glassyIntensity,    // 0-100 — blur intensity for glassy theme
    setGlassyIntensity,
    liquidIntensity,    // 0-100 — animation intensity for liquid theme
    setLiquidIntensity,
  } = useChameleon();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
        Toggle {mode === "dark" ? "Light" : "Dark"}
      </button>
      <button onClick={() => setTheme("glassy")}>
        Switch to Glassy
      </button>
    </div>
  );
}`}
        />

        <h4 className={cn("text-sm font-black uppercase tracking-widest pt-2", textPrimary)}>Return Values</h4>
        <ReturnsTable
          rows={[
            { name: "theme", type: "ChameleonTheme", description: "Active theme — \"material\" | \"simple\" | \"minimalist\" | \"glassy\" | \"liquid\"" },
            { name: "setTheme", type: "(theme: ChameleonTheme) => void", description: "Change the active theme" },
            { name: "mode", type: "ChameleonMode", description: "Color mode — \"light\" | \"dark\"" },
            { name: "setMode", type: "(mode: ChameleonMode) => void", description: "Toggle between light and dark mode" },
            { name: "lang", type: "ChameleonLang", description: "Active language — \"en\" | \"es\" | \"fr\"" },
            { name: "setLang", type: "(lang: ChameleonLang) => void", description: "Switch the active language" },
            { name: "customBrandColor", type: "string | null", description: "Custom hex brand color applied across all themes, or null for defaults" },
            { name: "setCustomBrandColor", type: "(color: string | null) => void", description: "Apply a custom brand color (hex) or reset to null" },
            { name: "glassyIntensity", type: "number", description: "Blur intensity for glassy theme (0–100)" },
            { name: "setGlassyIntensity", type: "(n: number) => void", description: "Set glassy blur intensity" },
            { name: "liquidIntensity", type: "number", description: "Animation intensity for liquid theme (0–100)" },
            { name: "setLiquidIntensity", type: "(n: number) => void", description: "Set liquid animation intensity" },
          ]}
        />
      </Section>

      {/* useThemeClasses */}
      <Section title="useThemeClasses" icon={Paintbrush} badge="Styling">
        <p className={cn("leading-relaxed", textMuted)}>
          Returns pre-computed CSS class strings for the current theme + mode combination. Every class guarantees
          proper foreground/background contrast. Use these instead of hand-writing conditional theme styles.
        </p>

        <CodeBlock
          code={`import { useThemeClasses } from "@chameleon-ui-lib/react";

function MyCard() {
  const {
    cardClass,        // Card background, border, shadow, radius for current theme
    buttonPrimary,    // Primary button styles
    buttonSecondary,  // Secondary button styles
    buttonOutline,    // Outlined button styles
    buttonGhost,      // Ghost/transparent button styles
    inputClass,       // Input field styles (border, bg, focus ring)
    badgeClass,       // Badge/chip styles
    surfaceClass,     // Muted surface (panels, sidebars)
    textPrimary,      // Primary text color
    textMuted,        // Muted/secondary text color
    textOnCard,       // Text color guaranteed to contrast card background
    textOnPrimary,    // Text color guaranteed to contrast primary color
    theme,            // Current theme name (shortcut)
    mode,             // Current mode (shortcut)
    isDark,           // Boolean shortcut for mode === "dark"
  } = useThemeClasses();

  return (
    <div className={cardClass}>
      <h2 className={textPrimary}>Title</h2>
      <p className={textMuted}>Description text</p>
      <button className={buttonPrimary}>Save</button>
      <button className={buttonOutline}>Cancel</button>
      <input className={inputClass} placeholder="Type here..." />
      <span className={badgeClass}>New</span>
    </div>
  );
}`}
        />

        <h4 className={cn("text-sm font-black uppercase tracking-widest pt-2", textPrimary)}>Return Values</h4>
        <ReturnsTable
          rows={[
            { name: "cardClass", type: "string", description: "Card container with theme-specific bg, border, shadow, and radius" },
            { name: "buttonPrimary", type: "string", description: "Primary CTA button — filled, with hover/active states" },
            { name: "buttonSecondary", type: "string", description: "Secondary button — softer fill" },
            { name: "buttonOutline", type: "string", description: "Outlined button — border only, transparent bg" },
            { name: "buttonGhost", type: "string", description: "Ghost button — no bg, no border, hover reveals" },
            { name: "inputClass", type: "string", description: "Text input — border style, focus ring, placeholder color" },
            { name: "badgeClass", type: "string", description: "Badge/chip — small label with theme-specific shape and color" },
            { name: "surfaceClass", type: "string", description: "Muted surface for panels, sidebars, code blocks" },
            { name: "textPrimary", type: "string", description: "Primary foreground text color" },
            { name: "textMuted", type: "string", description: "Muted/secondary text color" },
            { name: "textOnCard", type: "string", description: "Text color with guaranteed contrast on card bg" },
            { name: "textOnPrimary", type: "string", description: "Text color with guaranteed contrast on primary color" },
            { name: "theme", type: "ChameleonTheme", description: "Current theme (convenience shortcut)" },
            { name: "mode", type: "ChameleonMode", description: "Current mode (convenience shortcut)" },
            { name: "isDark", type: "boolean", description: "true when mode === \"dark\"" },
          ]}
        />
      </Section>

      {/* useAnimation */}
      <Section title="useAnimation" icon={Zap} badge="Motion">
        <p className={cn("leading-relaxed", textMuted)}>
          Returns the animation preset for the current theme. Each theme has physics-accurate, visually distinct
          motion tokens — enter transitions, stagger configs, hover/tap effects, and more.
        </p>

        <CodeBlock
          code={`import { useAnimation } from "@chameleon-ui-lib/react";
import { motion } from "motion/react";

function AnimatedCard({ children }) {
  const preset = useAnimation();

  return (
    <motion.div
      initial={preset.fadeUp.initial}
      animate={preset.fadeUp.animate}
      transition={preset.fadeUp.transition}
      whileHover={preset.hover}
      whileTap={preset.tap}
    >
      {children}
    </motion.div>
  );
}`}
        />

        <h4 className={cn("text-sm font-black uppercase tracking-widest pt-2", textPrimary)}>Return Value — ThemeAnimationPreset</h4>
        <ReturnsTable
          rows={[
            { name: "name", type: "string", description: "Human-readable preset name (e.g. \"Material Motion\")" },
            { name: "description", type: "string", description: "Short description of the motion style" },
            { name: "enter", type: "{ initial, animate, exit, transition }", description: "Full page/element enter animation" },
            { name: "stagger", type: "{ container: Variants, item: Variants }", description: "Staggered children animation — use with AnimatePresence" },
            { name: "hover", type: "TargetAndTransition", description: "Hover effect — pass to whileHover" },
            { name: "tap", type: "TargetAndTransition", description: "Tap/press effect — pass to whileTap" },
            { name: "fadeUp", type: "{ initial, animate, transition }", description: "Fade in from below" },
            { name: "scaleIn", type: "{ initial, animate, transition }", description: "Scale in from small" },
            { name: "slideIn", type: "{ initial, animate, transition }", description: "Slide in from side" },
            { name: "rotateIn", type: "{ initial, animate, transition }", description: "Rotate in" },
            { name: "bounce", type: "{ animate, transition }", description: "Infinite bounce loop" },
            { name: "pulse", type: "{ animate, transition }", description: "Infinite pulse loop" },
            { name: "shake", type: "{ x, rotate?, transition }", description: "Attention-grabbing shake" },
          ]}
        />
      </Section>

      {/* ── PROVIDER ──────────────────────────────────────────────────────── */}

      <h2 className={cn("text-xl font-black tracking-tight pt-4 flex items-center gap-2", textPrimary)}>
        <Layers className="w-5 h-5 text-[var(--primary)]" />
        Provider
      </h2>

      <Section title="ChameleonProvider" icon={Layers} badge="Required">
        <p className={cn("leading-relaxed", textMuted)}>
          Wrap your app root (or any subtree) with this provider. It supplies the theme context, injects CSS variables,
          and renders ambient backgrounds for glassy/liquid themes.
        </p>

        <CodeBlock
          code={`import { ChameleonProvider } from "@chameleon-ui-lib/react";

function App() {
  return (
    <ChameleonProvider
      initialTheme="material"  // optional, default: "material"
      initialMode="light"      // optional, default: "light"
      initialLang="en"         // optional, default: "en"
    >
      <YourApp />
    </ChameleonProvider>
  );
}`}
        />

        <h4 className={cn("text-sm font-black uppercase tracking-widest pt-2", textPrimary)}>Props</h4>
        <PropsTable
          rows={[
            { name: "children", type: "ReactNode", description: "Your application tree", default: "—" },
            { name: "initialTheme", type: "ChameleonTheme", description: "Starting theme", default: '"material"' },
            { name: "initialMode", type: "ChameleonMode", description: "Starting color mode", default: '"light"' },
            { name: "initialLang", type: "ChameleonLang", description: "Starting language", default: '"en"' },
          ]}
        />
      </Section>

      {/* ── UTILITIES ─────────────────────────────────────────────────────── */}

      <h2 className={cn("text-xl font-black tracking-tight pt-4 flex items-center gap-2", textPrimary)}>
        <Wand2 className="w-5 h-5 text-[var(--primary)]" />
        Utility Functions
      </h2>

      {/* cn */}
      <Section title="cn(...inputs)" icon={Type}>
        <p className={cn("leading-relaxed", textMuted)}>
          Merges class names using <code className="font-mono text-[var(--primary)]">clsx</code> +{" "}
          <code className="font-mono text-[var(--primary)]">tailwind-merge</code>. Handles conditional classes,
          arrays, and deduplicates conflicting Tailwind utilities.
        </p>

        <CodeBlock
          code={`import { cn } from "@chameleon-ui-lib/react";

// Basic merging
cn("px-4 py-2", "bg-blue-500");
// => "px-4 py-2 bg-blue-500"

// Conditional classes
cn("base-class", isActive && "bg-primary", !isActive && "bg-muted");

// Tailwind conflict resolution
cn("px-4", "px-6");
// => "px-6"  (tailwind-merge deduplicates)

// With arrays and objects (clsx syntax)
cn(["flex", "items-center"], { "opacity-50": disabled });`}
        />

        <PropsTable
          rows={[
            { name: "...inputs", type: "ClassValue[]", description: "Any number of class strings, arrays, objects, or falsy values" },
          ]}
        />
        <p className={cn("text-xs font-bold", textMuted)}>Returns: <code className="font-mono">string</code> — merged class string</p>
      </Section>

      {/* hexToRgb */}
      <Section title="hexToRgb(hex)" icon={Hash}>
        <p className={cn("leading-relaxed", textMuted)}>
          Converts a hex color string to an RGB object. Returns <code className="font-mono">null</code> if the input is invalid.
        </p>

        <CodeBlock
          code={`import { hexToRgb } from "@chameleon-ui-lib/react";

hexToRgb("#6200ee");
// => { r: 98, g: 0, b: 238 }

hexToRgb("ff5733");
// => { r: 255, g: 87, b: 51 }

hexToRgb("invalid");
// => null`}
        />

        <PropsTable
          rows={[
            { name: "hex", type: "string", description: "Hex color string (with or without #)" },
          ]}
        />
        <p className={cn("text-xs font-bold", textMuted)}>
          Returns: <code className="font-mono">{"{ r: number, g: number, b: number } | null"}</code>
        </p>
      </Section>

      {/* generateVariations */}
      <Section title="generateVariations(baseColor)" icon={Droplets}>
        <p className={cn("leading-relaxed", textMuted)}>
          Takes a hex base color and generates lighter and darker variations. Useful for creating
          theme-aware color pairs from a single brand color.
        </p>

        <CodeBlock
          code={`import { generateVariations } from "@chameleon-ui-lib/react";

generateVariations("#6200ee");
// => { light: "#914cf4", dark: "#4400a6" }

// Use case: custom brand theming
const brand = "#ff5733";
const { light, dark } = generateVariations(brand);
// light = softer version for backgrounds
// dark  = deeper version for dark mode`}
        />

        <PropsTable
          rows={[
            { name: "baseColor", type: "string", description: "Hex color string to derive variations from" },
          ]}
        />
        <p className={cn("text-xs font-bold", textMuted)}>
          Returns: <code className="font-mono">{"{ light: string, dark: string }"}</code>
        </p>
      </Section>

      {/* getContrastColor */}
      <Section title="getContrastColor(hex)" icon={Eye}>
        <p className={cn("leading-relaxed", textMuted)}>
          Returns <code className="font-mono">#000000</code> or <code className="font-mono">#ffffff</code> depending
          on which has better contrast against the given background color. Uses WCAG luminance formula.
        </p>

        <CodeBlock
          code={`import { getContrastColor } from "@chameleon-ui-lib/react";

getContrastColor("#6200ee"); // => "#ffffff" (light text on dark purple)
getContrastColor("#f0f0f0"); // => "#000000" (dark text on light gray)
getContrastColor("#03dac6"); // => "#000000" (dark text on teal)

// Use case: dynamic text on a user-chosen brand color
<div style={{ backgroundColor: brandColor, color: getContrastColor(brandColor) }}>
  Always readable text
</div>`}
        />

        <PropsTable
          rows={[
            { name: "hex", type: "string", description: "Background hex color to compute contrast against" },
          ]}
        />
        <p className={cn("text-xs font-bold", textMuted)}>
          Returns: <code className="font-mono">"#000000" | "#ffffff"</code>
        </p>
      </Section>

      {/* ── CONSTANTS ─────────────────────────────────────────────────────── */}

      <h2 className={cn("text-xl font-black tracking-tight pt-4 flex items-center gap-2", textPrimary)}>
        <Layers className="w-5 h-5 text-[var(--primary)]" />
        Constants
      </h2>

      {/* animationPresets */}
      <Section title="animationPresets" icon={Zap}>
        <p className={cn("leading-relaxed", textMuted)}>
          A <code className="font-mono text-[var(--primary)]">Record&lt;ChameleonTheme, ThemeAnimationPreset&gt;</code>{" "}
          containing all motion presets for every theme. Access directly when you need presets without the hook
          (e.g. outside a component, in a utility, or for a specific theme regardless of context).
        </p>

        <CodeBlock
          code={`import { animationPresets } from "@chameleon-ui-lib/react";

// Get material theme's enter animation
const materialEnter = animationPresets.material.enter;

// Use glassy theme hover regardless of current context
const glassyHover = animationPresets.glassy.hover;

// Available keys per theme:
// "material" | "simple" | "minimalist" | "glassy" | "liquid"
//
// Each contains: name, description, icon, enter, stagger,
// hover, tap, fadeUp, scaleIn, slideIn, rotateIn, bounce, pulse, shake`}
        />
      </Section>

      {/* translations */}
      <Section title="translations" icon={Globe}>
        <p className={cn("leading-relaxed", textMuted)}>
          Built-in i18n translation strings for common UI labels. Supports <code className="font-mono">en</code>,{" "}
          <code className="font-mono">es</code>, and <code className="font-mono">fr</code>.
        </p>

        <CodeBlock
          code={`import { translations, useChameleon } from "@chameleon-ui-lib/react";

function LoginButton() {
  const { lang } = useChameleon();
  const t = translations[lang];

  return <button>{t.signIn}</button>;
  // en => "Sign In"
  // es => "Iniciar sesión"
  // fr => "Se connecter"
}

// Available keys:
// welcome, signIn, signOut, getStarted, settings, profile,
// appearance, language, save, email, password, features,
// pricing, dashboard, theme, mode, light, dark, loginDesc,
// rememberMe, forgotPass, noAccount, signUp, general,
// notifications, security, dangerZone, deleteAccount, confirmDelete`}
        />
      </Section>

      {/* ── TYPES ─────────────────────────────────────────────────────────── */}

      <h2 className={cn("text-xl font-black tracking-tight pt-4 flex items-center gap-2", textPrimary)}>
        <Type className="w-5 h-5 text-[var(--primary)]" />
        Types
      </h2>

      <Section title="Exported Types" icon={Type}>
        <CodeBlock
          lang="ts"
          code={`// Theme variants
type ChameleonTheme = "material" | "simple" | "minimalist" | "glassy" | "liquid";

// Color modes
type ChameleonMode = "light" | "dark";

// Supported languages
type ChameleonLang = "en" | "es" | "fr";

// Animation preset shape (from useAnimation / animationPresets)
interface ThemeAnimationPreset {
  name: string;
  description: string;
  icon: React.ElementType;
  enter:    { initial; animate; exit; transition };
  stagger:  { container: Variants; item: Variants };
  hover:    TargetAndTransition;
  tap:      TargetAndTransition;
  fadeUp:   { initial; animate; transition };
  scaleIn:  { initial; animate; transition };
  slideIn:  { initial; animate; transition };
  rotateIn: { initial; animate; transition };
  bounce:   { animate; transition };
  pulse:    { animate; transition };
  shake:    { x: number[]; rotate?: number[]; transition };
}`}
        />
      </Section>
    </div>
  );
}
