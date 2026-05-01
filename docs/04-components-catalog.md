---
title: Components Catalog
purpose: Auto-extracted prop signatures for every exported component, grouped by atomic tier.
source: src/app/components/chameleon/{atoms,molecules,composites,templates,auth-components,animations}.tsx
---

# Components Catalog

Every exported component, with its actual prop signature pulled from source. Where TypeScript types are intersected with native HTML props (e.g. `React.HTMLAttributes<HTMLDivElement>`), only the **library-specific** props are listed; native props (`onClick`, `id`, `style`, `className`, `aria-*`, etc.) are inherited and pass through.

Universal pass-throughs:
- `className?: string` — appended via `cn()` to library defaults.
- `children?: ReactNode` — unless explicitly typed.
- All atom/molecule props extending `HTMLAttributes` accept native event handlers and ARIA attributes.

## Atoms (`atoms.tsx`)

### Button
File: `atoms.tsx:87` · Complexity: 1

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;                                  // Render via Radix Slot for Next.js Link wrapping
  variant?: "primary" | "secondary" | "ghost" | "outline";  // default: "primary"
  size?: "sm" | "md" | "lg" | "icon";                // default: "md"
  animated?: boolean;                                // default: false — hover/tap physics from animationPresets[theme]
}
```

Usage:
```tsx
<Button variant="primary" size="lg" animated>Save</Button>
<Button asChild><Link to="/home">Home</Link></Button>
```

### Input
File: `atoms.tsx:147` · Complexity: 2

```ts
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  animated?: boolean;  // default: false — adds whileFocus scale 1.01
}
```

Native props (`type`, `placeholder`, `value`, `onChange`, `disabled`) all pass through.

### Badge
File: `atoms.tsx:184` · Complexity: 1

```ts
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
}
```

Note: the AI manifest documents a `variant` prop (`'default' | 'success' | 'warning' | 'error' | 'info'`) but the actual implementation uses theme-driven `badgeClass` only. Use `<Alert variant="success">` if you need semantic color states.

### Spinner
File: `atoms.tsx:216` · Complexity: 1

```ts
{
  size?: "sm" | "md" | "lg";   // default: "md" (w-6 h-6)
  className?: string;
}
```

Renders an infinite-rotation circular loader using `--primary` and `--primary` at 20% alpha.

### Avatar
File: `atoms.tsx:244` · Complexity: 1

```ts
interface AvatarProps {
  src?: string;
  fallback?: string;                  // default: "?" — first 2 chars rendered uppercase
  size?: "sm" | "md" | "lg" | "xl";   // default: "md"
  className?: string;
  animated?: boolean;
}
```

### Toggle
File: `atoms.tsx:296` · Complexity: 2

```ts
interface ToggleProps {
  checked: boolean;                       // controlled
  onChange: (checked: boolean) => void;
  label?: string;
  animated?: boolean;                     // default: true
  className?: string;
}
```

Renders an iOS-style switch with `role="switch"` and `aria-checked`.

### Progress
File: `atoms.tsx:352` · Complexity: 2

```ts
interface ProgressProps {
  value: number;             // 0–100, clamped
  label?: string;
  showValue?: boolean;       // default: false — appends "{value}%"
  animated?: boolean;        // default: true
  className?: string;
}
```

Has `role="progressbar"` and `aria-valuenow/min/max`.

### Tooltip
File: `atoms.tsx:416` · Complexity: 2

```ts
interface TooltipProps {
  content: ReactNode;
  children: ReactNode;                            // the trigger element
  side?: "top" | "bottom" | "left" | "right";    // default: "top"
}
```

Triggers on `mouseenter`. Pure CSS transform positioning (no Radix dependency).

### DatePicker
File: `atoms.tsx:526` · Complexity: 3

```ts
type DateRange = { start: Date | null; end: Date | null };

interface DatePickerProps {
  mode?: "single" | "range";                    // default: "single"
  value?: Date | null;                          // single mode
  onChange?: (date: Date | null) => void;       // single mode
  rangeValue?: DateRange;                       // range mode
  onRangeChange?: (range: DateRange) => void;   // range mode
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;                         // default: "Select date"
  disabled?: boolean;
  className?: string;
}
```

## Molecules (`molecules.tsx`)

### Card + sub-components
File: `molecules.tsx:18`

```ts
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
  elevation?: 0 | 1 | 2 | 3;   // material theme only — applies shadow utility
}
```

Composition pieces (all accept `React.HTMLAttributes<HTMLDivElement>`):

| Component | Element | Notes |
|-----------|---------|-------|
| `Card` | `<div>` | Container with theme `cardClass` |
| `CardHeader` | `<div>` | `flex flex-col space-y-1.5 p-4 sm:p-6` |
| `CardTitle` | `<h3>` | Bold, on-card foreground color |
| `CardDescription` | `<p>` | Muted text |
| `CardContent` | `<div>` | `p-4 sm:p-6 pt-0` |
| `CardFooter` | `<div>` | `p-6 pt-0 flex items-center` |

### Tabs (Radix-backed)

```ts
// Tabs   = TabsPrimitive.Root  (re-export)
// TabsList, TabsTrigger, TabsContent  = forwardRef wrappers with theme-aware styling

<Tabs defaultValue="overview" onValueChange={fn}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
</Tabs>
```

Accepts all Radix Tabs props.

### Dialog (Radix-backed)

```ts
// Dialog, DialogTrigger, DialogClose  = Radix re-exports
// DialogContent, DialogHeader, DialogTitle  = themed wrappers

<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent animated>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    Body...
  </DialogContent>
</Dialog>
```

`DialogContent` accepts `React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { animated?: boolean }`. Built-in close button is included in the top-right.

### StatCard
File: `molecules.tsx:246`

```ts
{
  label: string;
  value: string;                         // pre-formatted ("$24.5K", "12%", etc.)
  trend?: "up" | "down";
  trendValue?: string;                   // e.g. "+12%"
  icon?: React.ElementType;              // pass a Lucide component, not <Icon />
  className?: string;
  animated?: boolean;                    // default: false
}
```

### PricingCard
File: `molecules.tsx:309`

```ts
{
  tier: string;
  price: string;                         // pre-formatted ("$29")
  features: string[];
  recommended?: boolean;                 // adds ring + "Recommended" badge
  className?: string;
  animated?: boolean;
}
```

### Alert
File: `molecules.tsx:395`

```ts
type AlertVariant = "info" | "success" | "warning" | "error";

{
  variant?: AlertVariant;     // default: "info"
  title?: string;
  children: ReactNode;
  className?: string;
  animated?: boolean;
}
```

In `minimalist` theme, alerts render as a left-border-only block (no fill).

### Separator

```ts
{
  orientation?: "horizontal" | "vertical";  // default: "horizontal"
  className?: string;
}
```

### Breadcrumb

```ts
{
  items: { label: string; href?: string }[];
  className?: string;
}
```

The last item is rendered bold; intermediate items are clickable links if `href` is set.

### Select

```ts
{
  value?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}
```

Native `<select>` with theme styling. For a richer combobox, use Radix Select from `src/app/components/ui/select.tsx` (not exported from the library barrel).

### Textarea

```ts
React.TextareaHTMLAttributes<HTMLTextAreaElement>
```

Pass-through with `inputClass` styling and `min-h-[100px] resize-y`.

## Composites / Organisms (`composites.tsx`)

### DataTable

```ts
interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: T[keyof T], row: T) => ReactNode;
  width?: string;
  hideOnMobile?: boolean;
}

function DataTable<T extends Record<string, unknown>>({
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchable?: boolean;     // default: true
  exportable?: boolean;     // default: false — adds CSV export button
  pageSize?: number;        // default: 8
  animated?: boolean;       // default: true
  className?: string;
});
```

Built-in: search, sort, per-column filter, pagination. Generic over the row type.

### ThemeChart

```ts
type ChartType = "line" | "bar" | "area" | "pie" | "donut" | "radar" | "scatter" | "composed";
interface ChartDataPoint { /* arbitrary keys + values */ }

{
  type: ChartType;
  data: ChartDataPoint[];
  series?: { key: string; label: string }[];   // default: [{ key: "value", label: "Value" }]
  title?: string;
  height?: number;            // default: 280
  animated?: boolean;
  className?: string;
  showGrid?: boolean;         // default: true
  showLegend?: boolean;       // default: false
}
```

Built on Recharts. Color palettes are theme-specific via `useThemeChartColors()` (private helper).

### CommandPalette

```ts
interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ElementType;
  group?: string;             // section heading the item appears under
  action?: () => void;
  shortcut?: string;          // visual only — wire up your own keybinds
}

{
  items: CommandItem[];
  open: boolean;
  onClose: () => void;
  placeholder?: string;       // default: "Type a command or search..."
}
```

Listens for `Escape` to close. Cmd+K is intercepted but not bound to open — own that side externally.

### KanbanBoard

```ts
interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  priority?: "low" | "medium" | "high";
  assignee?: string;
}
interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  cards: KanbanCard[];
}

{
  initialColumns?: KanbanColumn[];   // default: built-in demo data
  animated?: boolean;
  className?: string;
}
```

Drag-and-drop via `react-dnd`. State is internal — there's no `onChange` callback; for persistence wrap with a higher-level controlled version.

### Timeline

```ts
interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  status?: "completed" | "current" | "pending";
  icon?: React.ElementType;
}

{
  events: TimelineEvent[];
  animated?: boolean;
  className?: string;
}
```

### FileUploader

```ts
{
  onUpload?: (files: File[]) => void;
  accept?: string;           // default: "*"
  multiple?: boolean;        // default: true
  maxSizeMB?: number;        // default: 10
  animated?: boolean;
  className?: string;
}
```

Includes drag-and-drop zone with simulated upload progress for visual feedback.

### NotificationFeed

```ts
interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error" | "message";
  title: string;
  description?: string;
  time: string;
  read: boolean;
  avatar?: string;
  avatarFallback?: string;
  action?: { label: string; onClick: () => void };
}

{
  notifications?: Notification[];   // default: built-in demo data
  animated?: boolean;
  className?: string;
}
```

### MultiStepForm

```ts
interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: ReactNode;        // pass your own inputs
}

{
  steps: FormStep[];
  onComplete?: (data: Record<string, unknown>) => void;
  animated?: boolean;
  className?: string;
}
```

Renders progress dots, step navigation, and slide transitions.

### CalendarWidget

```ts
interface CalendarEvent {
  date: string;             // YYYY-MM-DD
  title: string;
  color?: string;
}

{
  events?: CalendarEvent[];   // default: []
  animated?: boolean;
  className?: string;
}
```

### MediaGallery

```ts
interface MediaItem {
  id: string;
  src: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  tags?: string[];
}

{
  items: MediaItem[];
  animated?: boolean;
  className?: string;
}
```

Lightbox with arrow-key navigation. Tag filtering is built-in.

## Templates (`templates.tsx` + `comprehensive-templates*.tsx`)

All templates take **no props** unless noted. They are full-page demos meant to be customized by forking the source.

### Simple templates (`templates.tsx`)
- `AuthTemplate` — login form, social buttons, link to sign-up
- `SettingsTemplate` — tabbed settings page (general, notifications, security)
- `EcommerceTemplate` — product grid + filters + cart
- `AnalyticsDashboardTemplate` — stat cards + charts + activity feed

### Comprehensive templates (`comprehensive-templates.tsx`)
- `LandingPageTemplate` — hero, features, CTA
- `BlogArticleTemplate` — article layout with TOC
- `PricingPageTemplate` — three-tier grid + FAQ
- `ContactSupportTemplate` — contact form + support cards

### Comprehensive part 2 (`comprehensive-templates-part2.tsx`)
- `UserProfileTemplate` — profile header, stats, tabs
- `AdminDashboardTemplate` — admin-grade analytics
- `EcommerceProductTemplate` — single product detail
- `SettingsPanelTemplate` — sidebar-nav settings
- `AuthFlowTemplate` — multi-step login/signup orchestrator
- `DocumentationTemplate` — docs site with sidebar

## Auth Components (`auth-components.tsx`)

Tier: Composite. All take callbacks for submit/social actions; they ship UI only and never call backends.

### PasswordStrength

```ts
{ password: string }
```

Visual strength meter with feedback list. Pure presentation.

### SocialLoginButtons

```ts
{
  onSocialLogin?: (provider: string) => void;
  providers?: SocialProvider[];   // default: Google, GitHub
}
interface SocialProvider {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}
```

### AuthDivider

No props. Renders a horizontal "OR" divider.

### LoginForm

```ts
{
  onSubmit?: (email: string, password: string) => Promise<AuthResponse>;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onSocialLogin?: (provider: string) => void;
  showSocial?: boolean;            // default: true
}

interface AuthResponse {
  success: boolean;
  message: string;
  error?: string;
}
```

### SignUpForm

```ts
{
  onSubmit?: (data: { name: string; email: string; password: string }) => Promise<AuthResponse>;
  onSignIn?: () => void;
  onSocialLogin?: (provider: string) => void;
  showSocial?: boolean;
}
```

Includes inline `<PasswordStrength>` and validation.

### ForgotPasswordForm

```ts
{
  onSubmit?: (email: string) => Promise<AuthResponse>;
  onBack?: () => void;
}
```

### ResetPasswordForm

```ts
{
  token?: string;            // pulled from URL by caller
  onSubmit?: (password: string, token: string) => Promise<AuthResponse>;
  onSuccess?: () => void;
}
```

### EmailVerification

```ts
{
  email?: string;            // default: "your@email.com"
  onResend?: () => Promise<AuthResponse>;
  onVerified?: () => void;
}
```

### TwoFactorAuth

```ts
{
  onSubmit?: (code: string) => Promise<AuthResponse>;
  onResend?: () => Promise<AuthResponse>;
  method?: "sms" | "email" | "app";   // default: "app"
}
```

OTP input UI. Code length is 6 digits.

### MagicLinkForm

```ts
{
  onSubmit?: (email: string) => Promise<AuthResponse>;
}
```

## Animation primitives (`animations.tsx`)

### `<Animated>`

```ts
{
  children: ReactNode;
  type?: "enter" | "fadeUp" | "scaleIn" | "slideIn" | "rotateIn" | "bounce" | "pulse";
  delay?: number;            // seconds
  className?: string;
  disabled?: boolean;
}
```

Uses `whileInView` with `once: true` for performance. Looping types (`bounce`, `pulse`) skip the in-view gate.

### `<AnimatedList>`

```ts
{
  children: ReactNode[];
  className?: string;
  disabled?: boolean;
}
```

Wraps each child in a stagger variant. Stagger delays come from `animationPresets[theme].stagger`.

### `<AnimatedPage>`

```ts
{
  children: ReactNode;
  pageKey: string;            // changing this triggers exit/enter
  className?: string;
}
```

Uses `<AnimatePresence mode="wait">` for route-transition style page swaps.

### `<InteractiveCard>`

```ts
{
  children: ReactNode;
  className?: string;
  animated?: boolean;        // default: true
  onClick?: () => void;
}
```

Card surface with built-in hover/tap physics. Use this instead of `<Card animated>` when you want a click target without managing the hover state yourself.

### `useAnimation()` hook

Returns `animationPresets[currentTheme]` — used internally. Components can call this to access bounce/shake/etc directly:

```tsx
const preset = useAnimation();
<motion.div animate={preset.bounce.animate} transition={preset.bounce.transition} />
```

### `animationPresets`

`Record<ChameleonTheme, ThemeAnimationPreset>`. See `02-architecture.md::How animation works` for the preset surface.

## Theme primitives (`context.tsx`)

### `<ChameleonProvider>`

```ts
{
  children: ReactNode;
  initialTheme?: ChameleonTheme;   // default: "simple"
  initialMode?: ChameleonMode;     // default: "light"
  initialLang?: ChameleonLang;     // default: "en"
}

type ChameleonTheme = "material" | "simple" | "minimalist" | "glassy" | "liquid";
type ChameleonMode  = "light" | "dark";
type ChameleonLang  = "en" | "es" | "fr";
```

### `useChameleon()`

Returns the live context (`theme`, `setTheme`, `mode`, `setMode`, `lang`, `setLang`, `customBrandColor`, `setCustomBrandColor`, `glassyIntensity`, `setGlassyIntensity`, `liquidIntensity`, `setLiquidIntensity`). Throws if called outside provider.

### `useThemeClasses()`

Returns the memoized class-string bundle (see `03-themes.md::How useThemeClasses() shapes components`).

### `translations`

Flat record `{ en: {...}, es: {...}, fr: {...} }` of UI labels. Component code reads `translations[lang][key]`. Adding a key requires populating all three locales.

## Utility helpers (`utils.ts`)

```ts
cn(...inputs: ClassValue[]): string
// twMerge(clsx(inputs)) — merges Tailwind classes with conflict resolution

hexToRgb(hex: string): { r: number; g: number; b: number } | null

generateVariations(baseColor: string): { light: string; dark: string }
// 30% lighten / 30% darken — used by setCustomBrandColor

getContrastColor(hex: string): "#000000" | "#ffffff"
// Picks black or white based on relative luminance threshold 0.5
```

## Caveat: AI manifest coverage

The `ai-manifest.ts` file currently catalogs **14** components (a curated subset). The full count of exported components in this catalog is significantly higher. When generating code:

- **Prefer this catalog** for prop signatures.
- **Use `ai-manifest.ts`** for keyword-driven discovery, recipes, and complexity-based filtering.
- **`validateComponentProps()`** only knows about manifest entries — it cannot validate composites or auth components today.
