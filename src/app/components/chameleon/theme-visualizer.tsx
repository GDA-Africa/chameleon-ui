import React, { useState, useEffect } from "react";
import { Copy, Check, Palette, RefreshCw, Sparkles } from "lucide-react";
import { Button, Input, Badge } from "./atoms";
import { cn, generateVariations, getContrastColor } from "./utils";
import { Card, CardHeader, CardTitle, CardContent } from "./molecules";
import { useThemeClasses, useChameleon } from "./context";
import { CopyPageForAIPanel } from "./ai-helpers";

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

export const ThemeVisualizer = () => {
  const { customBrandColor, setCustomBrandColor } = useChameleon();
  const brandColor = customBrandColor || "#6366f1";
  const setBrandColor = setCustomBrandColor;
  
  const [copied, setCopied] = useState(false);
  const { textPrimary, textMuted, cardClass } = useThemeClasses();

  const variations = generateVariations(brandColor);
  const contrastColor = getContrastColor(brandColor);

  const lightTheme: ColorPalette = {
    primary: brandColor,
    secondary: variations.light,
    accent: "#f5f5f5",
    background: "#ffffff",
    foreground: "#0f172a",
    muted: "#f1f5f9",
    border: "#e2e8f0",
  };

  const darkTheme: ColorPalette = {
    primary: variations.light,
    secondary: variations.dark,
    accent: "#1e293b",
    background: "#020617",
    foreground: "#f8fafc",
    muted: "#1e293b",
    border: "#334155",
  };

  const generateCSSVariables = (theme: ColorPalette, isDark: boolean) => {
    const prefix = isDark ? ".dark" : ":root";
    return `${prefix} {
  --primary: ${theme.primary};
  --primary-foreground: ${getContrastColor(theme.primary)};
  --secondary: ${theme.secondary};
  --secondary-foreground: ${getContrastColor(theme.secondary)};
  --accent: ${theme.accent};
  --accent-foreground: ${getContrastColor(theme.accent)};
  --background: ${theme.background};
  --foreground: ${theme.foreground};
  --card: ${theme.background};
  --muted: ${theme.muted};
  --muted-foreground: ${isDark ? "#94a3b8" : "#64748b"};
  --border: ${theme.border};
}`;
  };

  const fullCSS = `${generateCSSVariables(lightTheme, false)}

${generateCSSVariables(darkTheme, true)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const randomColor = () => {
    const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444"];
    setBrandColor(colors[Math.floor(Math.random() * colors.length)]!);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={cn("text-2xl font-bold flex items-center gap-3", textPrimary)}>
            <Palette className="w-6 h-6 text-[var(--primary)]" />
            Theme Visualizer
          </h3>
          <p className={cn("mt-2", textMuted)}>
            Generate CSS variables for your custom brand color palette
          </p>
        </div>
        <Badge className="bg-[var(--primary)]/10 text-[var(--primary)] border-none px-4 py-2 font-bold">
          <Sparkles className="w-4 h-4 mr-2" />
          Live Preview
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Color Input */}
        <Card className="space-y-6">
          <CardHeader>
            <CardTitle>Brand Color</CardTitle>
            <p className="text-sm text-muted-foreground">Choose your primary brand color</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="pr-16 font-mono"
                  placeholder="#6366f1"
                />
                <input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-8 rounded-lg border border-border cursor-pointer"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={randomColor} variant="outline" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Random
                </Button>
                {customBrandColor && (
                  <Button onClick={() => setBrandColor(null)} variant="outline" className="gap-2 shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                    Reset
                  </Button>
                )}
              </div>
            </div>

            {/* Color Preview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Light Mode
                </p>
                <div className="space-y-2">
                  {Object.entries(lightTheme).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-lg border-2 border-border shadow-sm"
                        style={{ backgroundColor: value }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold capitalize">{key}</p>
                        <p className="text-[10px] text-muted-foreground font-mono truncate">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Dark Mode
                </p>
                <div className="space-y-2">
                  {Object.entries(darkTheme).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-lg border-2 border-border shadow-sm"
                        style={{ backgroundColor: value }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold capitalize">{key}</p>
                        <p className="text-[10px] text-muted-foreground font-mono truncate">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generated CSS */}
        <Card className="space-y-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated CSS</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Copy and paste into your stylesheet
                </p>
              </div>
              <Button onClick={copyToClipboard} size="sm" variant="outline" className="gap-2">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-950 text-slate-50 p-6 rounded-xl font-mono text-xs leading-relaxed overflow-auto max-h-[600px] border border-white/10">
              <pre className="whitespace-pre-wrap break-words">{fullCSS}</pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <p className="text-sm text-muted-foreground">See how your colors look in action</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Light Mode Preview */}
            <div
              className="p-8 rounded-2xl border-2 space-y-4"
              style={{
                backgroundColor: lightTheme.background,
                borderColor: lightTheme.border,
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest opacity-70"
                style={{ color: lightTheme.foreground }}
              >
                Light Mode
              </p>
              <button
                className="px-6 py-3 rounded-xl font-bold text-sm shadow-lg w-full"
                style={{
                  backgroundColor: lightTheme.primary,
                  color: getContrastColor(lightTheme.primary),
                }}
              >
                Primary Button
              </button>
              <button
                className="px-6 py-3 rounded-xl font-bold text-sm w-full"
                style={{
                  backgroundColor: lightTheme.secondary,
                  color: getContrastColor(lightTheme.secondary),
                }}
              >
                Secondary Button
              </button>
              <div
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: lightTheme.muted,
                  color: lightTheme.foreground,
                }}
              >
                <p className="text-sm font-bold">Card Component</p>
                <p className="text-xs opacity-70 mt-1">This is how your cards will look</p>
              </div>
            </div>

            {/* Dark Mode Preview */}
            <div
              className="p-8 rounded-2xl border-2 space-y-4"
              style={{
                backgroundColor: darkTheme.background,
                borderColor: darkTheme.border,
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest opacity-70"
                style={{ color: darkTheme.foreground }}
              >
                Dark Mode
              </p>
              <button
                className="px-6 py-3 rounded-xl font-bold text-sm shadow-lg w-full"
                style={{
                  backgroundColor: darkTheme.primary,
                  color: getContrastColor(darkTheme.primary),
                }}
              >
                Primary Button
              </button>
              <button
                className="px-6 py-3 rounded-xl font-bold text-sm w-full"
                style={{
                  backgroundColor: darkTheme.secondary,
                  color: getContrastColor(darkTheme.secondary),
                }}
              >
                Secondary Button
              </button>
              <div
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: darkTheme.muted,
                  color: darkTheme.foreground,
                }}
              >
                <p className="text-sm font-bold">Card Component</p>
                <p className="text-xs opacity-70 mt-1">This is how your cards will look</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
