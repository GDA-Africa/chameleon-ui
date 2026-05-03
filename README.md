<p align="center">
  <img src="https://chameleon.glenhalton.com/logo.png" alt="Chameleon UI" width="160" />
</p>

# Chameleon UI

[![npm](https://img.shields.io/npm/v/@chameleon-ui-lib/react?color=7c3aed)](https://www.npmjs.com/package/@chameleon-ui-lib/react)
[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev)

One component library. Five complete design systems. Switch themes at runtime with a single prop.

**Material** · **Simple** · **Minimalist** · **Glassy** · **Liquid**

Each theme ships with a full `light` and `dark` mode, its own typography, spacing, and ambient backgrounds — no CSS overrides required.

---

## Install

```bash
npm install @chameleon-ui-lib/react
```

---

## Framework Setup (Vite + React + TypeScript + Tailwind v4)

This is the recommended known-good configuration for new projects.

### 1. Create your project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

### 2. Install Tailwind v4 and Chameleon UI

```bash
npm install -D tailwindcss @tailwindcss/vite
npm install @chameleon-ui-lib/react
```

### 3. Configure Vite (`vite.config.ts`)

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),   // Tailwind v4 uses a Vite plugin — no tailwind.config.ts needed
  ],
});
```

> **Tailwind v4 Note:** There is no `tailwind.config.ts` in v4. Configuration is handled via the Vite plugin and CSS directives.

### 4. Set up your CSS entry (`src/index.css`)

```css
@import "tailwindcss";
@import "@chameleon-ui-lib/react/styles";
```

> **Import order matters:** `@import "tailwindcss"` must come **before** the library styles.
> If PostCSS warns _"@import must precede all other rules"_, check that no other CSS rules appear above the `@import` lines in your entry file.

### 5. Import CSS in your entry file (`src/main.tsx`)

```tsx
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 6. Wrap your app with `ChameleonProvider` (`src/App.tsx`)

```tsx
import { ChameleonProvider, Button, Card } from "@chameleon-ui-lib/react";

export default function App() {
  return (
    <ChameleonProvider initialTheme="glassy" initialMode="dark">
      <Card>
        <Button>Get Started</Button>
      </Card>
    </ChameleonProvider>
  );
}
```

### 7. (Optional) Run `chameleon init` to scaffold components

```bash
npx @chameleon-ui-lib/react init
```

This creates `chameleon.config.json` and auto-configures Tailwind in your `vite.config.ts`.

---

## Quick Start (existing project)

```tsx
import "@chameleon-ui-lib/react/styles";
import { ChameleonProvider, Button, Card } from "@chameleon-ui-lib/react";

export default function App() {
  return (
    <ChameleonProvider initialTheme="glassy" initialMode="dark">
      <Card>
        <Button>Get Started</Button>
      </Card>
    </ChameleonProvider>
  );
}
```

Switch themes at runtime — no page reload, no flash:

```tsx
const { setTheme, setMode } = useChameleon();

setTheme("liquid");   // material | simple | minimalist | glassy | liquid
setMode("light");     // light | dark
```

---

## What's Included

| Layer | Components |
|---|---|
| **Atoms** | `Button` `Input` `Badge` `Progress` `Spinner` `Label` `Switch` `Checkbox` |
| **Molecules** | `Card` `Tabs` `Dialog` `Alert` `StatCard` `PricingCard` `Avatar` `Tooltip` `Select` `Textarea` |
| **Organisms** | `DataTable` `Charts` `KanbanBoard` `Calendar` `FileUpload` `Gallery` `CommandPalette` |
| **Auth** | `LoginForm` `SignupForm` `TwoFactorForm` `MagicLinkForm` `ForgotPassword` `ResetPassword` |
| **Templates** | Dashboard · Landing · Settings · Inbox · Analytics · Docs |
| **Animations** | `Animated` `AnimatedList` — theme-matched motion presets |

---

## CLI

Scaffold components and templates directly into your project:

```bash
# Initialize Chameleon in an existing project
npx @chameleon-ui-lib/react init

# Copy a component into your source tree
chameleon add button
chameleon add data-table

# Copy a full-page template
chameleon template dashboard

# Set the active theme in chameleon.config.json
chameleon theme glassy

# List everything available
chameleon list

# Health check — verifies your setup
chameleon doctor
```

The CLI reads/writes `chameleon.config.json` at your project root and copies files into the directory you configure (`src/components/ui` by default).

---

## Theme Tokens

All components read from CSS custom properties — override any token to extend a theme without touching component code:

```css
:root {
  --primary: 262 83% 58%;
  --card: 0 0% 100%;
  --radius: 0.75rem;
}
```

---

## Troubleshooting

### PostCSS `@import must precede all other rules`

This happens when `@import` statements appear after non-import CSS rules. Fix: ensure your CSS entry file starts with imports and contains **no rules before them**:

```css
/* ✅ Correct order */
@import "tailwindcss";
@import "@chameleon-ui-lib/react/styles";

/* your custom rules below */
:root { --my-token: red; }
```

```css
/* ❌ Wrong — rule before import */
:root { --my-token: red; }
@import "tailwindcss";
```

Run `chameleon doctor` to auto-detect this issue in your project.

### Tailwind classes not applying

Make sure `@tailwindcss/vite` is in your `vite.config.ts` plugins array — in Tailwind v4 there is no `tailwind.config.ts`. Run `chameleon init` to auto-inject the plugin if it is missing.

### Theme not switching

Wrap your entire app tree with `<ChameleonProvider>`. The provider must be an ancestor of every component that uses `useChameleon()`.

### Components directory not found

Run `chameleon init` first — it creates `chameleon.config.json` and the configured output directory.

---

## License

[MIT](LICENSE)
