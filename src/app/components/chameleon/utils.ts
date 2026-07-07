import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Color Utilities ─────────────────────────────────────────────────────────

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16),
      }
    : null;
}

export function generateVariations(baseColor: string): { light: string; dark: string } {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return { light: baseColor, dark: baseColor };

  // Generate lighter and darker versions
  const lighten = (val: number) => Math.min(255, Math.floor(val + (255 - val) * 0.3));
  const darken = (val: number) => Math.max(0, Math.floor(val * 0.7));

  const light = `#${lighten(rgb.r).toString(16).padStart(2, "0")}${lighten(rgb.g).toString(16).padStart(2, "0")}${lighten(rgb.b).toString(16).padStart(2, "0")}`;
  const dark = `#${darken(rgb.r).toString(16).padStart(2, "0")}${darken(rgb.g).toString(16).padStart(2, "0")}${darken(rgb.b).toString(16).padStart(2, "0")}`;

  return { light, dark };
}

export function getContrastColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#000000";

  // Calculate relative luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

// ─── Brand Palette Engine (v2.0 Theme Visualizer / brand tokens) ─────────────

const toHex = (r: number, g: number, b: number) =>
  `#${[r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("")}`;

/** Mix `hex` toward `target` by `amt` (0–1). mixHex("#fff", "#000", 0.5) → grey. */
export function mixHex(hex: string, target: string, amt: number): string {
  const a = hexToRgb(hex);
  const b = hexToRgb(target);
  if (!a || !b) return hex;
  return toHex(a.r + (b.r - a.r) * amt, a.g + (b.g - a.g) * amt, a.b + (b.b - a.b) * amt);
}

export function hexToRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(0,0,0,${alpha})`;
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
}

/** WCAG 2.1 relative luminance. */
export function wcagLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const f = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(rgb.r) + 0.7152 * f(rgb.g) + 0.0722 * f(rgb.b);
}

/** WCAG contrast ratio between two hex colors (1–21). */
export function contrastRatio(a: string, b: string): number {
  const [l1, l2] = [wcagLuminance(a), wcagLuminance(b)].sort((x, y) => y - x) as [number, number];
  return (l1 + 0.05) / (l2 + 0.05);
}

export interface BrandInput {
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
  radius?: string;
}

export type BrandTokenMap = Record<string, string>;

/**
 * Derive a COMPLETE branded token set — not just primary/secondary, but
 * brand-tinted neutrals (background, card, muted, border) so the entire
 * surface takes on the customer's identity in both modes.
 */
export function deriveBrandPalette(brand: BrandInput, mode: "light" | "dark"): BrandTokenMap {
  const p = brand.primaryColor;
  const primary = mode === "dark" ? mixHex(p, "#ffffff", 0.25) : p;
  const secondarySrc = brand.secondaryColor ?? mixHex(p, mode === "dark" ? "#000000" : "#ffffff", 0.35);
  const secondary = mode === "dark" ? mixHex(secondarySrc, "#ffffff", 0.15) : secondarySrc;
  const accentSrc = brand.accentColor ?? p;

  const vars: BrandTokenMap =
    mode === "light"
      ? {
          "--primary": primary,
          "--primary-foreground": getContrastColor(primary),
          "--secondary": secondary,
          "--secondary-foreground": getContrastColor(secondary),
          "--accent": mixHex("#ffffff", accentSrc, 0.12),
          "--accent-foreground": mixHex(accentSrc, "#000000", 0.55),
          "--background": mixHex("#ffffff", p, 0.04),
          "--foreground": mixHex("#0f172a", p, 0.12),
          "--card": mixHex("#ffffff", p, 0.02),
          "--card-foreground": mixHex("#0f172a", p, 0.1),
          "--muted": mixHex("#f1f5f9", p, 0.08),
          "--muted-foreground": mixHex("#64748b", p, 0.18),
          "--border": mixHex("#e2e8f0", p, 0.16),
          "--ring": primary,
        }
      : {
          "--primary": primary,
          "--primary-foreground": getContrastColor(primary),
          "--secondary": secondary,
          "--secondary-foreground": getContrastColor(secondary),
          "--accent": mixHex("#0b1120", accentSrc, 0.22),
          "--accent-foreground": mixHex(accentSrc, "#ffffff", 0.65),
          "--background": mixHex("#020617", p, 0.1),
          "--foreground": mixHex("#f8fafc", p, 0.06),
          "--card": mixHex("#0b1120", p, 0.12),
          "--card-foreground": mixHex("#f8fafc", p, 0.05),
          "--muted": mixHex("#1e293b", p, 0.14),
          "--muted-foreground": mixHex("#94a3b8", p, 0.14),
          "--border": mixHex("#334155", p, 0.2),
          "--ring": primary,
        };
  if (brand.radius) vars["--radius"] = brand.radius;
  return vars;
}

/** Serialize a light+dark brand palette as copy-paste CSS. */
export function brandPaletteToCss(brand: BrandInput): string {
  const block = (vars: BrandTokenMap, indent = "  ") =>
    Object.entries(vars).map(([k, v]) => `${indent}${k}: ${v};`).join("\n");
  return `:root {\n${block(deriveBrandPalette(brand, "light"))}\n}\n\n.dark {\n${block(deriveBrandPalette(brand, "dark"))}\n}\n`;
}
