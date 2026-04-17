# Chameleon UI — Complete Knowledge Base
> Machine-readable context file for AI agents, LLMs, and crawlers.
> URL: https://chameleon.glenhalton.com/context.md
> Package: @chameleon-ui-lib/react | Version: 1.0.0 | Updated: 2026-04-17

---

## Overview

Chameleon UI is a **React 19 + TypeScript** component library built to let developers
build fully-themed UIs in minutes. Every component **automatically adapts** to 5 distinct
visual themes and 2 colour modes with zero per-component configuration.

The library ships as an **npm package** (`@chameleon-ui-lib/react`) and as a **CLI tool**
(`chameleon`) that scaffolds self-contained copies of components directly into your project.

---

## Quick Start

```bash
npm install @chameleon-ui-lib/react
```

```tsx
// main.tsx
import '@chameleon-ui-lib/react/styles';
import { ChameleonProvider } from '@chameleon-ui-lib/react';

function App() {
  return (
    <ChameleonProvider theme="simple" mode="light">
      <YourApp />
    </ChameleonProvider>
  );
}
```

---

## The 5 Themes

Each theme is a complete visual system — it changes shape language, typography weight,
elevation strategy, and animation physics.

| Theme      | Shape       | Elevation          | Typography         | Animation           |
|------------|-------------|--------------------|--------------------|---------------------|
| material   | Rounded-sm  | Shadows            | Uppercase, bold    | Scale + shadow lift |
| simple     | Rounded-md  | Subtle shadows     | Normal weight      | Gentle fade         |
| minimalist | Sharp (none)| Borders only       | Light weight       | Opacity only        |
| glassy     | Rounded-xl  | Backdrop blur      | Semi-bold          | Blur + scale        |
| liquid     | Rounded-full| Gradient + glow    | Bold, flowing      | Spring bounce       |

Both **light** and **dark** colour modes are supported for all 5 themes.

Themes are switched at runtime:
```tsx
const { setTheme, setMode } = useChameleon();
setTheme('glassy');
setMode('dark');
```

---

## CSS Token System

All visual properties are expressed as CSS custom properties. Every component
reads tokens — not raw colour values — so swapping themes is instantaneous.

```
--primary              Main brand color
--primary-foreground   Text on primary backgrounds (always passes contrast)
--secondary            Secondary UI color
--secondary-foreground Text on secondary backgrounds
--background           Page background
--foreground           Main text color
--card                 Card / surface background
--card-foreground      Text on card surfaces
--muted                Muted backgrounds (inputs, tags)
--muted-foreground     Subtle text / placeholders
--border               Border color
--accent               Accent highlight
--accent-foreground    Text on accent
--ring                 Focus ring color
--radius               Base border radius (varies per theme)
```

---

## Components: Atoms

Atoms are the smallest building blocks. All atoms accept `animated` and `className` props.

### Button

```tsx
import { Button } from '@chameleon-ui-lib/react';

<Button>Default</Button>
<Button variant="primary" size="lg" animated>Primary Large</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button size="icon" variant="ghost"><Icon /></Button>
<Button asChild><a href="/link">Link Button</a></Button>
```

Props: `variant` (primary|secondary|ghost|outline), `size` (sm|md|lg|icon),
`animated`, `asChild`, all native button attributes.

### Input

```tsx
<Input placeholder="Type here..." animated />
<Input type="email" disabled />
```

Props: `animated`, all native input attributes.

### Badge

```tsx
<Badge>New</Badge>
<Badge animated>Hot</Badge>
```

### Progress

```tsx
<Progress value={75} label="Upload progress" showValue animated />
```

Props: `value` (0–100), `label`, `showValue`, `animated`.

### Spinner

```tsx
<Spinner size="md" />  // sm | md | lg
```

### Avatar

```tsx
<Avatar src="/photo.jpg" fallback="JD" size="md" animated />
<Avatar fallback="AB" size="xl" />  // initials from fallback
```

Props: `src`, `fallback`, `size` (sm|md|lg|xl), `animated`.

### Toggle

```tsx
const [on, setOn] = useState(false);
<Toggle checked={on} onChange={setOn} label="Notifications" animated />
```

### Tooltip

```tsx
<Tooltip content="Help text" side="top">
  <Button size="icon"><Info /></Button>
</Tooltip>
```

Props: `content`, `side` (top|bottom|left|right).

### DatePicker

```tsx
// Single date
const [date, setDate] = useState<Date | null>(null);
<DatePicker value={date} onChange={setDate} placeholder="Select date" />

// Date range
const [range, setRange] = useState<DateRange>({ start: null, end: null });
<DatePicker
  mode="range"
  rangeValue={range}
  onRangeChange={setRange}
  placeholder="Start → End"
  minDate={new Date()}
/>
```

Props: `mode` (single|range), `value`, `onChange`, `rangeValue`, `onRangeChange`,
`minDate`, `maxDate`, `placeholder`, `disabled`.

---

## Components: Molecules

Molecules are composed of atoms and add more complex interaction patterns.

### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card body content.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Tabs

```tsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings…</TabsContent>
  <TabsContent value="security">Security settings…</TabsContent>
</Tabs>
```

### Alert

```tsx
<Alert variant="success">Profile saved!</Alert>
<Alert variant="error">Something went wrong.</Alert>
<Alert variant="warning" animated>Low disk space.</Alert>
<Alert variant="info">FYI: updates available.</Alert>
```

### Dialog

```tsx
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Confirm</DialogTitle></DialogHeader>
    <p>Are you sure?</p>
    <DialogFooter><Button>Confirm</Button></DialogFooter>
  </DialogContent>
</Dialog>
```

### StatCard

```tsx
<StatCard
  title="Revenue"
  value="$48,295"
  change={+12.5}
  icon={<DollarSign />}
  animated
/>
```

---

## Components: Composites

Composites are full-feature components with significant internal state.

### DataTable

```tsx
<DataTable<User>
  data={users}
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', render: (v) => <Badge>{v}</Badge> },
  ]}
  searchable
  paginated
/>
```

### KanbanBoard

```tsx
<KanbanBoard
  columns={[
    { id: 'todo', title: 'To Do', items: todoItems },
    { id: 'done', title: 'Done', items: doneItems },
  ]}
  onMove={(itemId, toColumn) => { /* … */ }}
  animated
/>
```

### MultiStepForm

```tsx
<MultiStepForm
  steps={[
    { title: 'Personal', fields: personalFields },
    { title: 'Account', fields: accountFields },
    { title: 'Review', fields: [] },
  ]}
  onComplete={(data) => submitForm(data)}
/>
```

### CalendarWidget

```tsx
<CalendarWidget
  events={events}
  onEventClick={(event) => openModal(event)}
  view="month"
/>
```

---

## Auth Components

Pre-built auth flows that adapt to all themes.

```tsx
import {
  LoginForm, SignupForm, TwoFactorAuth,
  MagicLinkForm, ForgotPasswordForm,
  ResetPasswordForm, UserProfile
} from '@chameleon-ui-lib/react';

<LoginForm
  onSubmit={async ({ email, password }) => signIn(email, password)}
  onForgotPassword={() => navigate('/forgot')}
/>

<SignupForm onSubmit={async (data) => register(data)} />

<TwoFactorAuth onVerify={async (code) => verify(code)} />
```

---

## Template Pages

Full-page layout templates — drop in and populate with real data.

```tsx
import { DashboardTemplate } from '@chameleon-ui-lib/react';
// All templates: Dashboard, Landing, Settings, Analytics, Inbox,
// ECommerce, Profile, Calendar, Auth, Blog, Pricing, Team, Reports, Onboarding
```

---

## Hooks Reference

### useChameleon

```tsx
const {
  theme,          // ChameleonTheme: 'material' | 'simple' | 'minimalist' | 'glassy' | 'liquid'
  setTheme,
  mode,           // ChameleonMode: 'light' | 'dark'
  setMode,
  lang,           // ChameleonLang: 'en' | 'es' | 'fr'
  setLang,
  customBrandColor,
  setCustomBrandColor,
  glassyIntensity,    // 0–100
  setGlassyIntensity,
  liquidIntensity,    // 0–100
  setLiquidIntensity,
} = useChameleon();
```

### useThemeClasses

Returns pre-computed Tailwind class strings for the current theme + mode:

```tsx
const {
  buttonPrimary, buttonSecondary, buttonGhost, buttonOutline,
  cardClass, inputClass, badgeClass,
  textPrimary, textMuted,
  theme, mode,
} = useThemeClasses();
```

---

## Animation System

```tsx
import { Animated, AnimatedList, animationPresets } from '@chameleon-ui-lib/react';

// animationPresets[theme] returns: { hover, tap, enter, exit, scaleIn }
const preset = animationPresets['liquid'];

// Animated wrapper
<Animated><Card>…</Card></Animated>

// Staggered list
<AnimatedList
  items={notifications}
  renderItem={(n) => <NotificationItem {...n} />}
/>
```

---

## CLI Reference

The CLI scaffolds self-contained component files into your project.
All internal imports are rewritten from local paths to `@chameleon-ui-lib/react`.
A barrel `index.ts` is auto-generated (or updated) on every `add` command.

```bash
# Setup
npx chameleon init                  # Configure Tailwind v4 + CSS import

# Scaffold components
npx chameleon add button            # Single component
npx chameleon add button input badge # Multiple components
npx chameleon add --all-atoms       # All atoms (9) + barrel
npx chameleon add --all-molecules   # All molecules + barrel
npx chameleon add --all-composites  # All composites + barrel
npx chameleon add --all             # All 28 components + barrel

# Discover
npx chameleon list                  # List all available components
npx chameleon info button           # Details for one component
npx chameleon themes                # Show all theme tokens

# Health check
npx chameleon doctor                # Audit your integration

# Config
npx chameleon config set theme glassy
npx chameleon config set mode dark
```

Default scaffold directory: `src/components/ui/`
Barrel path: `src/components/ui/index.ts`
Import hint after add: `import { Button } from 'src/components/ui'`

---

## i18n

Three languages are bundled. Switch via the `lang` prop on `ChameleonProvider`.

```tsx
<ChameleonProvider lang="fr">  // 'en' | 'es' | 'fr'
```

Translated strings are accessible via the `translations` export:

```tsx
import { translations } from '@chameleon-ui-lib/react';
const t = translations['fr'];
console.log(t.components); // "Composants"
```

---

## TypeScript

All component props are exported:

```tsx
import type {
  ButtonProps, InputProps, BadgeProps, ProgressProps, AvatarProps,
  ToggleProps, DatePickerProps, DateRange,
  ChameleonTheme, ChameleonMode, ChameleonLang,
} from '@chameleon-ui-lib/react';
```

---

## Common Patterns

### Theme switcher in the app header

```tsx
const { theme, setTheme } = useChameleon();
const themes: ChameleonTheme[] = ['material', 'simple', 'minimalist', 'glassy', 'liquid'];

{themes.map(t => (
  <button key={t} onClick={() => setTheme(t)} className={t === theme ? 'active' : ''}>
    {t}
  </button>
))}
```

### Custom brand color

```tsx
const { setCustomBrandColor } = useChameleon();
setCustomBrandColor('#e91e63');  // overrides --primary
```

### Form with validation

```tsx
<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <Input placeholder="Email" type="email" animated required />
    <Input placeholder="Password" type="password" animated required />
    <Button type="submit" animated>Sign In</Button>
  </div>
</form>
```

### Dashboard layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <StatCard title="Users" value="12,430" change={+8.2} icon={<Users />} animated />
  <StatCard title="Revenue" value="$48k" change={+12.5} icon={<DollarSign />} animated />
  <StatCard title="Orders" value="1,920" change={-2.1} icon={<ShoppingCart />} animated />
  <StatCard title="Uptime" value="99.9%" change={0} icon={<Activity />} animated />
</div>
```

---

## Resources

| Resource                    | URL                                               |
|-----------------------------|---------------------------------------------------|
| Live Workshop               | https://chameleon.glenhalton.com                  |
| NPM Package                 | https://www.npmjs.com/package/@chameleon-ui-lib/react |
| LLMs.txt (machine manifest) | https://chameleon.glenhalton.com/llms.txt         |
| Context (this file)         | https://chameleon.glenhalton.com/context.md       |
| Component Manifest (JSON)   | https://chameleon.glenhalton.com/manifest.json    |
| GitHub                      | https://github.com/GDA-Africa/chameleon-ui        |
