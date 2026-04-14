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

## Quick Start

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

## License

[MIT](LICENSE)
