---
nexus_doc: true
id: "03_data_contracts"
title: "Data Contracts"
status: populated
confidence: high
last_updated: "2026-04-05"
---

# Data Contracts

**Project:** Chameleon UI
**Data Strategy:** cloud-first (component library — data contracts are TypeScript types, not DB schemas)

---

## 📊 Core Type Definitions

### Theme System Types (context.tsx)

```typescript
type ChameleonTheme = "material" | "simple" | "minimalist" | "glassy" | "liquid";
type ChameleonMode = "light" | "dark";
type ChameleonLang = "en" | "es" | "fr";

interface ThemeContextType {
  theme: ChameleonTheme;
  setTheme: (theme: ChameleonTheme) => void;
  mode: ChameleonMode;
  setMode: (mode: ChameleonMode) => void;
  lang: ChameleonLang;
  setLang: (lang: ChameleonLang) => void;
  glassyIntensity: number; // 0-100
  setGlassyIntensity: (n: number) => void;
  liquidIntensity: number; // 0-100
  setLiquidIntensity: (n: number) => void;
}
```

### CSS Token Schema

Each theme × mode combination provides these CSS variables:

| Token                    | Type   | Description                           |
| ------------------------ | ------ | ------------------------------------- |
| `--primary`              | color  | Brand/accent color                    |
| `--primary-foreground`   | color  | Text on primary (guaranteed contrast) |
| `--secondary`            | color  | Secondary accent                      |
| `--secondary-foreground` | color  | Text on secondary                     |
| `--background`           | color  | Page background                       |
| `--foreground`           | color  | Default text color                    |
| `--card`                 | color  | Card surface                          |
| `--card-foreground`      | color  | Text on cards                         |
| `--muted`                | color  | Subtle background                     |
| `--muted-foreground`     | color  | Muted text                            |
| `--border`               | color  | Border color                          |
| `--accent`               | color  | Accent surface                        |
| `--accent-foreground`    | color  | Text on accent                        |
| `--ring`                 | color  | Focus ring color                      |
| `--radius`               | length | Border radius (theme-specific)        |
| `--glass-blur`           | length | Glassy theme only: backdrop blur      |

### AI Manifest Types (ai-manifest.ts)

```typescript
interface AIComponentMetadata {
  id: string;
  name: string;
  category: "atom" | "molecule" | "organism" | "template";
  complexity: number; // 0-10
  description: string;
  importPath: string;
  props: Record<
    string,
    {
      type: string;
      required: boolean;
      default?: string;
      description: string;
      options?: string[];
    }
  >;
  exampleMinimal: string;
  exampleFull: string;
  useCases: string[];
  relatedComponents: string[];
  themeCompatibility: string[];
  a11y: string;
  keywords: string[];
}
```

## ✅ Validation Rules

- **Theme:** Must be one of 5 valid theme strings
- **Mode:** Must be `"light"` or `"dark"`
- **Lang:** Must be `"en"`, `"es"`, or `"fr"`
- **Intensity values:** Clamped 0–100 (number)
- **Button variant:** `"primary" | "secondary" | "ghost" | "outline"`
- **Button size:** `"sm" | "md" | "lg" | "icon"`
- **Alert variant:** `"success" | "warning" | "error" | "info"`
- **StatCard trend:** `"up" | "down"`

## 🔗 Relationships

- **ChameleonProvider** wraps all components; provides context consumed by `useChameleon()` and `useThemeClasses()`
- **useThemeClasses()** depends on `useChameleon()` — returns CSS class maps based on current theme + mode
- **Atoms** are consumed by **Molecules**, which are consumed by **Organisms**, which are consumed by **Templates**
- **animationPresets** (animations.tsx) are indexed by `ChameleonTheme` and consumed by atoms/molecules via the `animated` prop
- **translations** object is indexed by `ChameleonLang` and consumed by templates and auth components
