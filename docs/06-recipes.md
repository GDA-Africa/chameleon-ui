---
title: Recipes
purpose: Copy-paste-ready code patterns. Each is verified against the actual exports.
---

# Recipes

Each recipe is a complete, runnable JSX block. They assume the consumer has already wrapped their app in `<ChameleonProvider>` and imported the relevant components.

For agents: when a task matches a recipe (see `selectRecipeForTask`), prefer copying the recipe and editing values over generating from scratch.

## App shell — provider + theme switcher

```tsx
import {
  ChameleonProvider,
  useChameleon,
  Button,
} from "@chameleon-ui-lib/react";
import "@chameleon-ui-lib/react/styles";

function ThemeBar() {
  const { theme, setTheme, mode, setMode } = useChameleon();
  const themes = ["material", "simple", "minimalist", "glassy", "liquid"] as const;

  return (
    <div className="flex gap-2 p-4">
      {themes.map((t) => (
        <Button
          key={t}
          variant={theme === t ? "primary" : "outline"}
          size="sm"
          onClick={() => setTheme(t)}
        >
          {t}
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
      >
        {mode === "light" ? "🌙" : "☀️"}
      </Button>
    </div>
  );
}

export default function App() {
  return (
    <ChameleonProvider initialTheme="simple" initialMode="light">
      <ThemeBar />
      {/* your app */}
    </ChameleonProvider>
  );
}
```

## Dashboard header

```tsx
import { Button, StatCard } from "@chameleon-ui-lib/react";
import { Plus } from "lucide-react";

<div className="space-y-6">
  <div className="flex items-center justify-between">
    <h1 className="text-4xl font-black">Dashboard</h1>
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

## Form with validation (controlled)

```tsx
import { useState } from "react";
import {
  Card, CardHeader, CardTitle, CardContent,
  Input, Button, Alert,
} from "@chameleon-ui-lib/react";

function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return setError("Enter a valid email");
    setError(null);
    setSent(true);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          {error && <Alert variant="error">{error}</Alert>}
          {sent && <Alert variant="success" title="Sent">We'll be in touch.</Alert>}
          <div>
            <label className="text-sm font-bold mb-2 block">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-bold mb-2 block">Message</label>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
            />
          </div>
          <Button type="submit" className="w-full" animated>Send</Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

## Pricing grid

```tsx
import { PricingCard } from "@chameleon-ui-lib/react";

<div className="grid md:grid-cols-3 gap-6">
  <PricingCard
    tier="Starter"
    price="$9"
    features={["5 Projects", "Basic Support", "1GB Storage"]}
  />
  <PricingCard
    tier="Pro"
    price="$29"
    recommended
    features={["Unlimited Projects", "Priority Support", "50GB Storage", "Advanced Analytics"]}
  />
  <PricingCard
    tier="Enterprise"
    price="$99"
    features={["Everything in Pro", "Dedicated Support", "Unlimited Storage", "Custom Integrations"]}
  />
</div>
```

## Tabbed content

```tsx
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
  Card, CardContent,
} from "@chameleon-ui-lib/react";

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <Card><CardContent>Overview content...</CardContent></Card>
  </TabsContent>
  <TabsContent value="details">
    <Card><CardContent>Detailed information...</CardContent></Card>
  </TabsContent>
  <TabsContent value="settings">
    <Card><CardContent>Settings panel...</CardContent></Card>
  </TabsContent>
</Tabs>
```

## Alert stack

```tsx
import { Alert } from "@chameleon-ui-lib/react";

<div className="space-y-3 max-w-xl">
  <Alert variant="success" title="Success" animated>Your changes have been saved.</Alert>
  <Alert variant="warning" title="Warning" animated>Trial expires in 3 days.</Alert>
  <Alert variant="error" title="Error" animated>Unable to connect to server.</Alert>
  <Alert variant="info" title="Info" animated>New features have launched.</Alert>
</div>
```

## Search with results

```tsx
import { useState } from "react";
import { Input, Button, Card, CardContent, Badge } from "@chameleon-ui-lib/react";

function SearchPanel({ items }: { items: { id: string; title: string; description: string }[] }) {
  const [q, setQ] = useState("");
  const filtered = items.filter((i) =>
    i.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Input
          placeholder="Search projects..."
          className="flex-1"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button animated>Search</Button>
      </div>
      <div className="space-y-3">
        {filtered.map((r) => (
          <Card key={r.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h4 className="font-bold">{r.title}</h4>
                <p className="text-sm text-[var(--muted-foreground)]">{r.description}</p>
              </div>
              <Badge>Active</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

## Login flow (using the auth components)

```tsx
import { useState } from "react";
import {
  LoginForm,
  ForgotPasswordForm,
  SignUpForm,
  TwoFactorAuth,
} from "@chameleon-ui-lib/react";

type View = "login" | "signup" | "forgot" | "2fa";

function AuthFlow() {
  const [view, setView] = useState<View>("login");

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {view === "login" && (
        <LoginForm
          onSubmit={async (email, pw) => {
            // hit your backend
            return { success: true, message: "Logged in" };
          }}
          onForgotPassword={() => setView("forgot")}
          onSignUp={() => setView("signup")}
          onSocialLogin={(p) => console.log("social", p)}
        />
      )}
      {view === "forgot" && (
        <ForgotPasswordForm
          onSubmit={async (email) => ({ success: true, message: "Email sent" })}
          onBack={() => setView("login")}
        />
      )}
      {view === "signup" && (
        <SignUpForm
          onSubmit={async (data) => ({ success: true, message: "Account created" })}
          onSignIn={() => setView("login")}
        />
      )}
      {view === "2fa" && (
        <TwoFactorAuth
          method="app"
          onSubmit={async (code) => ({ success: code === "123456", message: "" })}
          onResend={async () => ({ success: true, message: "Code sent" })}
        />
      )}
    </div>
  );
}
```

## DataTable (sortable, searchable)

```tsx
import { DataTable } from "@chameleon-ui-lib/react";
import { Badge } from "@chameleon-ui-lib/react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
}

const users: User[] = [/* ... */];

<DataTable<User>
  data={users}
  title="Users"
  pageSize={10}
  exportable
  columns={[
    { key: "name", label: "Name", sortable: true, filterable: true },
    { key: "email", label: "Email", sortable: true, hideOnMobile: true },
    { key: "role", label: "Role", filterable: true,
      render: (v) => <Badge>{String(v)}</Badge>
    },
    { key: "status", label: "Status",
      render: (v) => (
        <span className={v === "active" ? "text-emerald-600" : "text-rose-600"}>
          {String(v)}
        </span>
      )
    },
  ]}
/>
```

## Chart card

```tsx
import { Card, CardHeader, CardTitle, CardContent, ThemeChart } from "@chameleon-ui-lib/react";

<Card>
  <CardHeader><CardTitle>Monthly Revenue</CardTitle></CardHeader>
  <CardContent>
    <ThemeChart
      type="area"
      data={[
        { name: "Jan", revenue: 4000 },
        { name: "Feb", revenue: 3200 },
        { name: "Mar", revenue: 5100 },
        { name: "Apr", revenue: 4700 },
      ]}
      series={[{ key: "revenue", label: "Revenue ($)" }]}
      height={240}
      showGrid
      showLegend
    />
  </CardContent>
</Card>
```

## Animated entrance for a list of cards

```tsx
import { AnimatedList, Card, CardContent } from "@chameleon-ui-lib/react";

<AnimatedList className="grid md:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id}>
      <CardContent>{item.label}</CardContent>
    </Card>
  ))}
</AnimatedList>
```

## Page-level transitions

```tsx
import { AnimatedPage } from "@chameleon-ui-lib/react";

<AnimatedPage pageKey={location.pathname}>
  {currentRouteContent}
</AnimatedPage>
```

## Custom brand color

```tsx
import { useChameleon, Button } from "@chameleon-ui-lib/react";

function BrandColorPicker() {
  const { customBrandColor, setCustomBrandColor } = useChameleon();
  return (
    <div className="flex gap-2">
      {["#7c3aed", "#10b981", "#f59e0b", "#ef4444"].map((c) => (
        <button
          key={c}
          onClick={() => setCustomBrandColor(c)}
          className="w-8 h-8 rounded-full border-2"
          style={{ background: c, borderColor: customBrandColor === c ? "white" : "transparent" }}
        />
      ))}
      <Button variant="ghost" size="sm" onClick={() => setCustomBrandColor(null)}>
        Reset
      </Button>
    </div>
  );
}
```

## Glassy intensity slider

```tsx
import { useChameleon, Card, CardContent } from "@chameleon-ui-lib/react";

function GlassIntensitySlider() {
  const { theme, glassyIntensity, setGlassyIntensity } = useChameleon();
  if (theme !== "glassy") return null;

  return (
    <Card>
      <CardContent>
        <label className="text-sm font-bold">Blur intensity: {glassyIntensity}</label>
        <input
          type="range"
          min={0}
          max={100}
          value={glassyIntensity}
          onChange={(e) => setGlassyIntensity(Number(e.target.value))}
          className="w-full"
        />
      </CardContent>
    </Card>
  );
}
```
