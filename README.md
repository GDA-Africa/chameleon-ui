# 🦎 Chameleon UI Core (@chameleon-ui-lib/react)

> A massively scalable, multi-theme React 19 UI component library.

![NPM Version](https://img.shields.io/npm/v/@chameleon-ui-lib/react.svg)

Chameleon UI gives you pre-built components that seamlessly transition between 5 different design systems:
- **Material** (Elevated, shadows)
- **Simple** (Clean, modern)
- **Minimalist** (Wireframe-like, raw)
- **Glassy** (High-end blurring, futuristic)
- **Liquid** (Organic, flowing backgrounds)

## 📦 Installation

```bash
npm install @chameleon-ui-lib/react
```

## 🚀 Quick Start

1. Install the package and wrap your app or component tree with the `ChameleonProvider`:

```tsx
import { ChameleonProvider, Button, Card, CardTitle, CardContent } from "@chameleon-ui-lib/react";
import "@chameleon-ui-lib/react/dist/index.css"; // Note: this step might change depending on CSS strategy

export default function App() {
  return (
    <ChameleonProvider initialTheme="simple" initialMode="light">
      <div className="p-10">
        <Card>
          <CardTitle>Welcome to Chameleon UI</CardTitle>
          <CardContent>
            <Button variant="primary">Get Started</Button>
          </CardContent>
        </Card>
      </div>
    </ChameleonProvider>
  );
}
```

## 🧬 Included

- **Atoms**: `Button`, `Input`, `Badge`, `Progress`, `Spinner`
- **Molecules**: `Card`, `Tabs`, `Dialog`, `Alert`, `StatCard`, `PricingCard`, `Separator`, `Avatar`, `Tooltip`, `Select`, `Textarea`
- **Organisms**: `DataTable`, `Charts`, `Kanban`, `FileUpload`, etc.
- **Templates**: Dashboard layouts, Landing pages, Settings.

## 📄 License

[MIT](LICENSE)
