# Chameleon UI - AI Integration Guide

> **Version 1.0.8** | **AI-Optimized Component Library**

## 🤖 Why Chameleon UI for AI Agents?

Chameleon UI is specifically designed to be the **easiest UI library for AI agents to work with**. We provide:

1. **Machine-readable component catalog** with complexity scores
2. **Comprehensive JSDoc documentation** with usage examples in code
3. **Pre-built component recipes** for common UI patterns
4. **Automatic theme adaptation** - no manual styling needed
5. **Guaranteed text contrast** - accessibility built-in
6. **TypeScript-first** - clear prop types and interfaces
7. **Prompt templates** - optimized instructions for AI generation

---

## 📦 Quick Start for AI Agents

### Import Pattern

```tsx
// Atoms (basic components)
import { Button, Input, Badge, Progress } from "./components/chameleon/atoms";

// Molecules (composed components)
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  Dialog,
} from "./components/chameleon/molecules";

// Templates (full layouts)
import { AuthTemplate, SettingsTemplate } from "./components/chameleon/templates";

// Context & utilities
import { useChameleon, useThemeClasses } from "./components/chameleon/context";
import { cn } from "./components/chameleon/utils";
```

### Minimal Example

```tsx
function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button animated>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

---

## 🎯 Component Selection by Complexity

| Complexity | Components                          | Best For                      |
| ---------- | ----------------------------------- | ----------------------------- |
| **1**      | Button, Badge                       | Simple actions, labels        |
| **2**      | Input, Progress, Alert, Card        | Forms, indicators, containers |
| **3**      | StatCard, Tabs, Toggle              | Metrics, navigation, switches |
| **4**      | Dialog, PricingCard, Composed forms | Modals, pricing, data entry   |
| **5-7**    | Templates, Dashboards               | Full page layouts             |

**AI Tip**: Start with complexity 1-3 components for simple tasks. Use templates (complexity 6-7) for full-page requests.

---

## 🏗️ Pre-Built Recipes (Copy-Paste Ready)

### Dashboard Header with Stats

```tsx
<div className="space-y-6">
  <div className="flex items-center justify-between">
    <h1 className="text-4xl font-black text-[var(--foreground)]">Dashboard</h1>
    <Button variant="primary" animated>
      <Plus className="w-4 h-4 mr-2" />
      New Project
    </Button>
  </div>
  <div className="grid md:grid-cols-3 gap-6">
    <StatCard label="Total Users" value="24.5K" trend="up" trendValue="+12%" />
    <StatCard label="Revenue" value="$89.2K" trend="up" trendValue="+8%" />
    <StatCard label="Conversion" value="3.2%" trend="down" trendValue="-2%" />
  </div>
</div>
```

### Contact Form

```tsx
<Card>
  <CardHeader>
    <CardTitle>Contact Us</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div>
      <label className="text-sm font-bold mb-2 block text-[var(--foreground)]">Email</label>
      <Input type="email" placeholder="you@example.com" />
    </div>
    <div>
      <label className="text-sm font-bold mb-2 block text-[var(--foreground)]">Message</label>
      <Input placeholder="Your message..." />
    </div>
    <Button className="w-full" animated>
      Send Message
    </Button>
  </CardContent>
</Card>
```

### Pricing Grid

```tsx
<div className="grid md:grid-cols-3 gap-6">
  <PricingCard
    tier="Starter"
    price="$9"
    features={["5 Projects", "Basic Support", "1GB Storage"]}
  />
  <PricingCard
    tier="Professional"
    price="$29"
    recommended
    features={["Unlimited Projects", "Priority Support", "50GB Storage"]}
  />
  <PricingCard
    tier="Enterprise"
    price="$99"
    features={["Everything in Pro", "Custom Integrations", "Unlimited Storage"]}
  />
</div>
```

### Tabbed Content

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <Card>
      <CardContent>
        <h3 className="font-bold mb-4 text-[var(--foreground)]">Overview</h3>
        <p className="text-[var(--muted-foreground)]">Content here...</p>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>
```

### Alert Notifications

```tsx
<div className="space-y-3 max-w-xl">
  <Alert variant="success" title="Success" animated>
    Your changes have been saved.
  </Alert>
  <Alert variant="warning" title="Warning" animated>
    Your trial expires in 3 days.
  </Alert>
  <Alert variant="error" title="Error" animated>
    Unable to connect to server.
  </Alert>
</div>
```

---

## 🎨 Theme System (Automatic)

Chameleon UI has **5 themes** that components adapt to automatically:

| Theme          | Style                       | When to Use                       |
| -------------- | --------------------------- | --------------------------------- |
| **material**   | Elevated, shadowed, rounded | Google Material Design aesthetics |
| **simple**     | Clean, classic, balanced    | Professional business apps        |
| **minimalist** | Sharp, stark, monochrome    | Design-forward, editorial         |
| **glassy**     | Frosted glass, blur effects | Modern, premium interfaces        |
| **liquid**     | Organic, gradient, flowing  | Creative, playful applications    |

**AI Note**: Don't worry about theme selection - all components work with all themes automatically. Users can switch themes via the UI.

---

## 🎯 Component Quick Reference

### Button

```tsx
// Primary action
<Button variant="primary" animated>Save</Button>

// Secondary action
<Button variant="secondary">Cancel</Button>

// Outline style
<Button variant="outline">Learn More</Button>

// Ghost (minimal)
<Button variant="ghost">Skip</Button>

// Icon only
<Button size="icon" variant="ghost">
  <Settings className="w-4 h-4" />
</Button>

// With loading state
<Button disabled>
  <Spinner size="sm" className="mr-2" />
  Loading...
</Button>
```

### Input

```tsx
// Text input
<Input placeholder="Enter text..." />

// Email input
<Input type="email" placeholder="Email address" />

// Password input
<Input type="password" placeholder="Password" />

// With controlled state
<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-[var(--muted-foreground)]">Card content goes here</p>
  </CardContent>
</Card>
```

### Tabs

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <h2 className="text-xl font-bold text-[var(--card-foreground)]">Title</h2>
    <p className="text-[var(--muted-foreground)]">Dialog content</p>
    <div className="flex gap-3">
      <Button>Confirm</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  </DialogContent>
</Dialog>
```

---

## 🌈 Color System (AI-Safe)

Chameleon UI uses **CSS variable tokens** that guarantee proper contrast:

| Token                       | Purpose            | AI Usage                        |
| --------------------------- | ------------------ | ------------------------------- |
| `var(--foreground)`         | Main text color    | Use for body text, headers      |
| `var(--muted-foreground)`   | Secondary text     | Use for descriptions, labels    |
| `var(--primary)`            | Brand color        | Use for primary buttons, links  |
| `var(--primary-foreground)` | Text on primary    | Always readable on primary bg   |
| `var(--card)`               | Card background    | Container backgrounds           |
| `var(--card-foreground)`    | Text on cards      | Always readable on cards        |
| `var(--border)`             | Borders            | Dividers, outlines              |
| `var(--muted)`              | Subtle backgrounds | Input backgrounds, hover states |

**AI Rule**: Always use `text-[var(--foreground)]` for main text and `text-[var(--muted-foreground)]` for secondary text. This guarantees readability in all themes and modes.

### Examples

```tsx
// ✅ CORRECT: Uses theme tokens
<h1 className="text-4xl font-bold text-[var(--foreground)]">Title</h1>
<p className="text-[var(--muted-foreground)]">Description</p>

// ❌ WRONG: Hard-coded colors break in dark mode
<h1 className="text-4xl font-bold text-black">Title</h1>
<p className="text-gray-600">Description</p>
```

---

## 🎭 Dark Mode (Automatic)

Dark mode is **automatic** - no special handling needed:

```tsx
// This works in both light AND dark mode automatically
function MyComponent() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] p-6">
      <h1>This text is always readable</h1>
      <Button>This button always has proper contrast</Button>
    </div>
  );
}
```

**AI Note**: Never hard-code colors like `bg-white` or `text-black` - always use CSS variable tokens.

---

## 📐 Layout Utilities

### Spacing

```tsx
// Use Tailwind spacing utilities
<div className="space-y-6">       {/* Vertical spacing */}
<div className="space-x-4">       {/* Horizontal spacing */}
<div className="gap-6">           {/* Grid/flex gap */}
<div className="p-6">             {/* Padding */}
<div className="m-4">             {/* Margin */}
```

### Grid Layouts

```tsx
// Responsive grid
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

### Flexbox

```tsx
// Horizontal flex
<div className="flex items-center justify-between">
  <span>Left</span>
  <Button>Right</Button>
</div>

// Vertical flex
<div className="flex flex-col gap-4">
  <Input />
  <Input />
  <Button>Submit</Button>
</div>
```

---

## 🚦 Common Patterns

### Form with Validation

```tsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="error" animated>
            {error}
          </Alert>
        )}
        <div>
          <label className="text-sm font-bold mb-2 block">Email</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-bold mb-2 block">Password</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button className="w-full" animated>
          Sign In
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Dashboard Layout

```tsx
function Dashboard() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-[var(--foreground)]">Dashboard</h1>
        <Button animated>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard label="Users" value="1.2K" trend="up" trendValue="+12%" />
        <StatCard label="Revenue" value="$45K" trend="up" trendValue="+8%" />
        <StatCard label="Orders" value="342" trend="down" trendValue="-3%" />
        <StatCard label="Conversion" value="2.4%" trend="up" trendValue="+0.4%" />
      </div>

      {/* Content */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6">Overview content...</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### Settings Page

```tsx
function Settings() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-black mb-8 text-[var(--foreground)]">Settings</h1>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-bold mb-2 block">Full Name</label>
                <Input placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm font-bold mb-2 block">Email</label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <Button animated>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## 🔍 AI Agent Checklist

When generating Chameleon UI code, verify:

- [ ] Imported components from correct paths (`atoms`, `molecules`, `templates`)
- [ ] Used `text-[var(--foreground)]` for main text
- [ ] Used `text-[var(--muted-foreground)]` for secondary text
- [ ] Used `bg-[var(--background)]` for backgrounds
- [ ] Added `animated` prop to interactive components
- [ ] Provided proper labels for form inputs
- [ ] Used complexity-appropriate components for the task
- [ ] Included proper TypeScript types if applicable
- [ ] Added spacing utilities (`space-y-*`, `gap-*`)
- [ ] Made layouts responsive with `md:` and `lg:` breakpoints

---

## 📚 Additional Resources

- **Component Manifest**: `/src/app/components/chameleon/ai-manifest.ts` - Machine-readable catalog
- **Source Code**: `/src/app/components/chameleon/atoms.tsx` - Comprehensive JSDoc documentation
- **Live Demo**: Use the Chameleon Workshop UI to see all components in action
- **Theme Visualizer**: See how components adapt to different themes

---

## 💡 Pro Tips for AI Agents

1. **Start Simple**: Use complexity 1-2 components (Button, Input, Card) before composing complex UIs
2. **Use Recipes**: Copy from the pre-built recipes section for common patterns
3. **Theme Variables**: Always use `var(--token)` syntax - never hard-code colors
4. **Spacing**: Use Tailwind spacing (`space-y-6`, `gap-4`) for consistent layouts
5. **Responsive**: Add `md:` and `lg:` prefixes for mobile-friendly layouts
6. **Animations**: Add `animated` prop to any interactive component
7. **Accessibility**: Labels, aria attributes, and keyboard navigation are built-in

---

**Built for AI · Optimized for Humans · Chameleon UI 2.0.0**
