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
