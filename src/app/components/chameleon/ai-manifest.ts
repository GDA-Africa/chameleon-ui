/**
 * ════════════════════════════════════════════════════════════════════════════
 * CHAMELEON UI - AI AGENT MANIFEST
 * ════════════════════════════════════════════════════════════════════════════
 *
 * This file provides a machine-readable catalog of all Chameleon UI components,
 * optimized for AI agent consumption. It includes component metadata, prop schemas,
 * usage examples, and complexity scores to help AI agents make intelligent decisions.
 *
 * @version 1.0.0
 * @ai-optimized true
 * @last-updated 2026-04-01
 */

export interface AIComponentMetadata {
  /** Component identifier */
  id: string;

  /** Display name */
  name: string;

  /** Component category: atom (basic), molecule (composite), organism (complex) */
  category: "atom" | "molecule" | "organism" | "template";

  /** Complexity score (0-10): helps AI choose appropriate components */
  complexity: number;

  /** Brief description of component purpose */
  description: string;

  /** Import path for the component */
  importPath: string;

  /** Props schema with types and descriptions */
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

  /** Minimal usage example */
  exampleMinimal: string;

  /** Full-featured usage example */
  exampleFull: string;

  /** Common use cases */
  useCases: string[];

  /** Related components that work well together */
  relatedComponents: string[];

  /** Theme compatibility: which themes work best */
  themeCompatibility: string[];

  /** Accessibility notes */
  a11y: string;

  /** Keywords for AI search/matching */
  keywords: string[];
}

/**
 * COMPLETE COMPONENT MANIFEST
 * ════════════════════════════════════════════════════════════════════════════
 */
export const CHAMELEON_AI_MANIFEST: AIComponentMetadata[] = [
  // ─── ATOMS ──────────────────────────────────────────────────────────────
  {
    id: "button",
    name: "Button",
    category: "atom",
    complexity: 1,
    description: "Interactive button component with theme-aware styling, animations, and variants",
    importPath: "./components/chameleon/atoms",
    props: {
      variant: {
        type: "'primary' | 'secondary' | 'outline' | 'ghost'",
        required: false,
        default: "'primary'",
        description: "Visual style variant",
        options: ["primary", "secondary", "outline", "ghost"],
      },
      size: {
        type: "'sm' | 'md' | 'lg' | 'icon'",
        required: false,
        default: "'md'",
        description: "Button size",
        options: ["sm", "md", "lg", "icon"],
      },
      animated: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Enable hover animations",
      },
      disabled: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Disable button interactions",
      },
      children: {
        type: "ReactNode",
        required: true,
        description: "Button content (text, icons, etc.)",
      },
    },
    exampleMinimal: `<Button>Click Me</Button>`,
    exampleFull: `<Button variant="primary" size="lg" animated>
  <Save className="w-4 h-4 mr-2" />
  Save Changes
</Button>`,
    useCases: [
      "Primary call-to-action buttons",
      "Form submissions",
      "Navigation triggers",
      "Dialog confirmations",
      "Icon-only action buttons",
    ],
    relatedComponents: ["input", "badge", "card"],
    themeCompatibility: ["material", "simple", "minimalist", "glassy", "liquid"],
    a11y: "Fully keyboard accessible, supports aria-label and aria-disabled",
    keywords: ["button", "cta", "action", "click", "submit", "interactive"],
  },

  {
    id: "input",
    name: "Input",
    category: "atom",
    complexity: 2,
    description: "Text input field with theme-adaptive styling and form integration",
    importPath: "./components/chameleon/atoms",
    props: {
      type: {
        type: "string",
        required: false,
        default: "'text'",
        description: "HTML input type",
        options: ["text", "email", "password", "number", "tel", "url"],
      },
      placeholder: {
        type: "string",
        required: false,
        description: "Placeholder text",
      },
      disabled: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Disable input",
      },
      value: {
        type: "string",
        required: false,
        description: "Controlled value",
      },
      onChange: {
        type: "(e: ChangeEvent) => void",
        required: false,
        description: "Change handler",
      },
    },
    exampleMinimal: `<Input placeholder="Enter text..." />`,
    exampleFull: `<Input 
  type="email" 
  placeholder="your@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>`,
    useCases: ["Form inputs", "Search boxes", "User data collection", "Filters and queries"],
    relatedComponents: ["button", "label", "card"],
    themeCompatibility: ["material", "simple", "minimalist", "glassy", "liquid"],
    a11y: "Supports labels, aria-describedby, and keyboard navigation",
    keywords: ["input", "textbox", "form", "field", "text", "entry"],
  },

  {
    id: "badge",
    name: "Badge",
    category: "atom",
    complexity: 1,
    description: "Small status indicator or label with theme styling",
    importPath: "./components/chameleon/atoms",
    props: {
      variant: {
        type: "'default' | 'success' | 'warning' | 'error' | 'info'",
        required: false,
        default: "'default'",
        description: "Badge color variant",
      },
      children: {
        type: "ReactNode",
        required: true,
        description: "Badge content",
      },
    },
    exampleMinimal: `<Badge>New</Badge>`,
    exampleFull: `<Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
  <CheckCircle className="w-3 h-3 mr-1" />
  Verified
</Badge>`,
    useCases: ["Status indicators", "Labels and tags", "Notification counts", "Category markers"],
    relatedComponents: ["button", "card", "statcard"],
    themeCompatibility: ["material", "simple", "minimalist", "glassy", "liquid"],
    a11y: "Semantic HTML with proper role attributes",
    keywords: ["badge", "tag", "label", "status", "indicator", "pill"],
  },

  {
    id: "progress",
    name: "Progress",
    category: "atom",
    complexity: 2,
    description: "Progress bar with percentage display and animation",
    importPath: "./components/chameleon/atoms",
    props: {
      value: {
        type: "number",
        required: true,
        description: "Progress value (0-100)",
      },
      label: {
        type: "string",
        required: false,
        description: "Progress label text",
      },
      showValue: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Display percentage value",
      },
      animated: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Enable smooth animations",
      },
    },
    exampleMinimal: `<Progress value={75} />`,
    exampleFull: `<Progress 
  value={uploadProgress} 
  label="Upload Progress"
  showValue
  animated
/>`,
    useCases: ["File upload progress", "Loading states", "Task completion", "Storage indicators"],
    relatedComponents: ["statcard", "card"],
    themeCompatibility: ["material", "simple", "minimalist", "glassy", "liquid"],
    a11y: "Uses progressbar role with aria-valuenow",
    keywords: ["progress", "loading", "bar", "indicator", "percentage", "meter"],
  },

  // ─── MOLECULES ──────────────────────────────────────────────────────────
  {
    id: "card",
    name: "Card",
    category: "molecule",
    complexity: 2,
    description: "Container component with header, content, and footer sections",
    importPath: "./components/chameleon/molecules",
    props: {
      children: {
        type: "ReactNode",
        required: true,
        description: "Card content",
      },
    },
    exampleMinimal: `<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>`,
    exampleFull: `<Card>
  <CardHeader>
    <CardTitle>Project Overview</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Detailed project information...</p>
  </CardContent>
</Card>`,
    useCases: ["Content containers", "Information panels", "Feature displays", "Product cards"],
    relatedComponents: ["statcard", "pricingcard", "tabs"],
    themeCompatibility: ["material", "simple", "minimalist", "glassy", "liquid"],
    a11y: "Semantic article element with proper heading hierarchy",
    keywords: ["card", "container", "panel", "box", "section"],
  },

  {
    id: "statcard",
    name: "StatCard",
    category: "molecule",
    complexity: 3,
    description: "Displays a metric with label, value, and optional trend indicator",
    importPath: "./components/chameleon/molecules",
    props: {
      label: {
        type: "string",
        required: true,
        description: "Metric label",
      },
      value: {
        type: "string",
        required: true,
        description: "Metric value",
      },
      trend: {
        type: "'up' | 'down'",
        required: false,
        description: "Trend direction",
      },
      trendValue: {
        type: "string",
        required: false,
        description: "Trend percentage/value",
      },
      animated: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Enable entrance animation",
      },
    },
    exampleMinimal: `<StatCard label="Revenue" value="$12.5K" />`,
    exampleFull: `<StatCard 
  label="Active Users" 
  value="2.4M"
  trend="up"
  trendValue="+18%"
  animated
/>`,
    useCases: [
      "Dashboard metrics",
      "KPI displays",
      "Analytics summaries",
      "Performance indicators",
    ],
    relatedComponents: ["card", "badge", "progress"],
    themeCompatibility: ["material", "simple", "minimalist", "glassy", "liquid"],
    a11y: "Clear label-value association with semantic markup",
    keywords: ["stat", "metric", "kpi", "analytics", "dashboard", "number"],
  },

  {
    id: "pricingcard",
    name: "PricingCard",
    category: "molecule",
    complexity: 4,
    description: "Pricing tier display with features list and CTA",
    importPath: "./components/chameleon/molecules",
    props: {
      tier: {
        type: "string",
        required: true,
        description: "Plan name",
      },
      price: {
        type: "string",
        required: true,
        description: "Price display",
      },
      features: {
        type: "string[]",
        required: true,
        description: "List of features",
      },
      recommended: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Highlight as recommended",
      },
      animated: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Enable animations",
      },
    },
    exampleMinimal: `<PricingCard 
  tier="Pro" 
  price="$29" 
  features={["Feature 1", "Feature 2"]}
/>`,
    exampleFull: `<PricingCard 
  tier="Enterprise" 
  price="$99"
  recommended
  animated
  features={[
    "Unlimited projects",
    "Priority support",
    "Advanced analytics",
    "Custom branding"
  ]}
/>`,
    useCases: ["Pricing pages", "Subscription tiers", "Feature comparison", "Plan selection"],
    relatedComponents: ["card", "button", "badge"],
    themeCompatibility: ["material", "simple", "minimalist", "glassy", "liquid"],
    a11y: "Proper list semantics and interactive elements",
    keywords: ["pricing", "plan", "subscription", "tier", "features", "payment"],
  },

  {
    id: "tabs",
    name: "Tabs",
    category: "molecule",
    complexity: 3,
    description: "Tabbed interface for organizing content into sections",
    importPath: "./components/chameleon/molecules",
    props: {
      defaultValue: {
        type: "string",
        required: true,
        description: "Initially active tab",
      },
      children: {
        type: "ReactNode",
        required: true,
        description: "TabsList and TabsContent components",
      },
    },
    exampleMinimal: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content</TabsContent>
</Tabs>`,
    exampleFull: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <DashboardOverview />
  </TabsContent>
  <TabsContent value="analytics">
    <AnalyticsView />
  </TabsContent>
</Tabs>`,
    useCases: ["Content organization", "Settings panels", "Multi-step forms", "Data views"],
    relatedComponents: ["card", "button"],
    themeCompatibility: ["material", "simple", "minimalist", "glassy", "liquid"],
    a11y: "ARIA tabs pattern with keyboard navigation",
    keywords: ["tabs", "navigation", "sections", "organize", "switch"],
  },

  {
    id: "dialog",
    name: "Dialog",
    category: "molecule",
    complexity: 4,
    description: "Modal dialog/popup with backdrop and focus management",
    importPath: "./components/chameleon/molecules",
    props: {
      open: {
        type: "boolean",
        required: false,
        description: "Controlled open state",
      },
      children: {
        type: "ReactNode",
        required: true,
        description: "DialogTrigger and DialogContent",
      },
    },
    exampleMinimal: `<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>Content</DialogContent>
</Dialog>`,
    exampleFull: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <h2>Are you sure?</h2>
    <p>This action cannot be undone.</p>
    <div className="flex gap-3">
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  </DialogContent>
</Dialog>`,
    useCases: ["Confirmations", "Forms", "Alerts", "Detail views"],
    relatedComponents: ["button", "card"],
    themeCompatibility: ["material", "simple", "minimalist", "glassy", "liquid"],
    a11y: "Focus trap, ESC to close, ARIA dialog role",
    keywords: ["dialog", "modal", "popup", "overlay", "confirmation"],
  },

  {
    id: "alert",
    name: "Alert",
    category: "molecule",
    complexity: 2,
    description: "Notification or alert message with variants for different severities",
    importPath: "./components/chameleon/molecules",
    props: {
      variant: {
        type: "'success' | 'warning' | 'error' | 'info'",
        required: false,
        default: "'info'",
        description: "Alert severity/type",
      },
      title: {
        type: "string",
        required: false,
        description: "Alert title",
      },
      animated: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Enable entrance animation",
      },
      children: {
        type: "ReactNode",
        required: true,
        description: "Alert message content",
      },
    },
    exampleMinimal: `<Alert variant="success">
  Operation completed successfully
</Alert>`,
    exampleFull: `<Alert 
  variant="error" 
  title="Payment Failed"
  animated
>
  Your payment could not be processed. Please check your card details and try again.
</Alert>`,
    useCases: ["Success messages", "Error notifications", "Warnings", "Info banners"],
    relatedComponents: ["badge", "card"],
    themeCompatibility: ["material", "simple", "minimalist", "glassy", "liquid"],
    a11y: "Uses alert role, screen reader friendly",
    keywords: ["alert", "notification", "message", "banner", "toast", "error", "success"],
  },

  // ─── TEMPLATES ──────────────────────────────────────────────────────────
  {
    id: "authtemplate",
    name: "AuthTemplate",
    category: "template",
    complexity: 6,
    description: "Complete authentication form layout with theme styling",
    importPath: "./components/chameleon/templates",
    props: {},
    exampleMinimal: `<AuthTemplate />`,
    exampleFull: `<div className="min-h-screen flex items-center justify-center p-6">
  <AuthTemplate />
</div>`,
    useCases: ["Login pages", "Sign up flows", "Authentication screens"],
    relatedComponents: ["input", "button", "card"],
    themeCompatibility: ["material", "simple", "minimalist", "glassy", "liquid"],
    a11y: "Fully accessible form with labels and validation",
    keywords: ["auth", "login", "signup", "form", "authentication", "credentials"],
  },

  {
    id: "settingstemplate",
    name: "SettingsTemplate",
    category: "template",
    complexity: 7,
    description: "Settings page layout with tabbed sections",
    importPath: "./components/chameleon/templates",
    props: {},
    exampleMinimal: `<SettingsTemplate />`,
    exampleFull: `<div className="max-w-4xl mx-auto p-6">
  <SettingsTemplate />
</div>`,
    useCases: ["User settings", "Account management", "Preferences panels"],
    relatedComponents: ["tabs", "input", "button", "card"],
    themeCompatibility: ["material", "simple", "minimalist", "glassy", "liquid"],
    a11y: "Keyboard navigable with proper form semantics",
    keywords: ["settings", "preferences", "account", "profile", "configuration"],
  },
];

/**
 * AI USAGE RECIPES
 * ════════════════════════════════════════════════════════════════════════════
 * Common component combinations for specific use cases
 */
export const AI_COMPONENT_RECIPES = {
  "dashboard-header": {
    name: "Dashboard Header",
    description: "Header with title, stats, and actions",
    complexity: 4,
    code: `<div className="space-y-6">
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
</div>`,
    components: ["button", "statcard"],
  },

  "form-with-validation": {
    name: "Form with Validation",
    description: "Input form with submit button",
    complexity: 3,
    code: `<Card>
  <CardHeader>
    <CardTitle>Contact Information</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div>
      <label className="text-sm font-bold mb-2 block">Email</label>
      <Input type="email" placeholder="you@example.com" />
    </div>
    <div>
      <label className="text-sm font-bold mb-2 block">Message</label>
      <Input placeholder="Your message..." />
    </div>
    <Button className="w-full" animated>Send Message</Button>
  </CardContent>
</Card>`,
    components: ["card", "input", "button"],
  },

  "pricing-grid": {
    name: "Pricing Grid",
    description: "Three-tier pricing layout",
    complexity: 5,
    code: `<div className="grid md:grid-cols-3 gap-6">
  <PricingCard 
    tier="Starter" 
    price="$9"
    features={["5 Projects", "Basic Support", "1GB Storage"]}
  />
  <PricingCard 
    tier="Professional" 
    price="$29"
    recommended
    features={["Unlimited Projects", "Priority Support", "50GB Storage", "Advanced Analytics"]}
  />
  <PricingCard 
    tier="Enterprise" 
    price="$99"
    features={["Everything in Pro", "Dedicated Support", "Unlimited Storage", "Custom Integrations"]}
  />
</div>`,
    components: ["pricingcard"],
  },

  "tabbed-content": {
    name: "Tabbed Content Section",
    description: "Organized content with tab navigation",
    complexity: 4,
    code: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <Card>
      <CardContent>
        <h3 className="font-bold mb-4">Project Overview</h3>
        <p>Overview content here...</p>
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="details">
    <Card>
      <CardContent>Detailed information...</CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="settings">
    <Card>
      <CardContent>Settings panel...</CardContent>
    </Card>
  </TabsContent>
</Tabs>`,
    components: ["tabs", "card"],
  },

  "alert-stack": {
    name: "Alert Notification Stack",
    description: "Multiple alerts for different states",
    complexity: 2,
    code: `<div className="space-y-3 max-w-xl">
  <Alert variant="success" title="Success" animated>
    Your changes have been saved successfully.
  </Alert>
  <Alert variant="warning" title="Warning" animated>
    Your trial expires in 3 days. Upgrade to continue.
  </Alert>
  <Alert variant="error" title="Error" animated>
    Unable to connect to server. Please try again.
  </Alert>
</div>`,
    components: ["alert"],
  },

  "search-with-results": {
    name: "Search with Results",
    description: "Search input with result cards",
    complexity: 4,
    code: `<div className="space-y-6">
  <div className="flex gap-3">
    <Input placeholder="Search projects..." className="flex-1" />
    <Button animated>Search</Button>
  </div>
  <div className="space-y-3">
    {results.map(result => (
      <Card key={result.id}>
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <h4 className="font-bold">{result.title}</h4>
            <p className="text-sm text-muted">{result.description}</p>
          </div>
          <Badge>Active</Badge>
        </CardContent>
      </Card>
    ))}
  </div>
</div>`,
    components: ["input", "button", "card", "badge"],
  },
};

/**
 * AI PROMPT TEMPLATES
 * ════════════════════════════════════════════════════════════════════════════
 * Optimized prompts that help AI agents generate correct Chameleon UI code
 */
export const AI_PROMPT_TEMPLATES = {
  general: `When creating UI with Chameleon UI:
1. Import components from './components/chameleon/atoms', './components/chameleon/molecules', or './components/chameleon/templates'
2. Always use the 'animated' prop for interactive components
3. Wrap components in theme-aware classes using 'cn()' and 'useThemeClasses()'
4. All components automatically adapt to the active theme (material, simple, minimalist, glassy, liquid)
5. Use CSS variables like 'var(--foreground)' for text colors to ensure proper contrast
6. Prefer composition: combine atoms into molecules into organisms`,

  buttons: `For buttons:
- Use variant="primary" for main actions
- Use variant="outline" for secondary actions
- Use variant="ghost" for tertiary actions
- Add 'animated' prop for hover effects
- Always include descriptive text or aria-label for icon-only buttons`,

  forms: `For forms:
- Wrap inputs in Cards for visual grouping
- Add labels above inputs
- Use Input type props: "text", "email", "password", etc.
- Include a Button with variant="primary" for submission
- Show validation with Alert components`,

  dashboards: `For dashboards:
- Use StatCard for metrics
- Organize with Card components
- Add Tabs for different views
- Include Progress bars for loading states
- Use Badge for status indicators`,

  layouts: `For layouts:
- Use AuthTemplate for login/signup pages
- Use SettingsTemplate for user settings
- Compose custom layouts with Card, Tabs, and spacing utilities
- All templates are fully theme-compatible`,
};

/**
 * COMPONENT SELECTOR UTILITY
 * ════════════════════════════════════════════════════════════════════════════
 * Helps AI agents choose the right component for a task
 */
export function selectComponentsForTask(
  taskDescription: string,
  maxComplexity: number = 10,
): AIComponentMetadata[] {
  const keywords = taskDescription.toLowerCase().split(/\s+/);

  return CHAMELEON_AI_MANIFEST.filter(
    (component) =>
      component.complexity <= maxComplexity &&
      component.keywords.some((keyword) =>
        keywords.some((k) => keyword.includes(k) || k.includes(keyword)),
      ),
  ).sort((a, b) => a.complexity - b.complexity);
}

/**
 * RECIPE SELECTOR UTILITY
 * ════════════════════════════════════════════════════════════════════════════
 * Helps AI agents find pre-built patterns for common tasks
 */
export function selectRecipeForTask(taskDescription: string): string | null {
  const keywords = taskDescription.toLowerCase();

  if (
    keywords.includes("dashboard") ||
    keywords.includes("stats") ||
    keywords.includes("metrics")
  ) {
    return AI_COMPONENT_RECIPES["dashboard-header"].code;
  }
  if (keywords.includes("form") || keywords.includes("input") || keywords.includes("submit")) {
    return AI_COMPONENT_RECIPES["form-with-validation"].code;
  }
  if (
    keywords.includes("pricing") ||
    keywords.includes("plan") ||
    keywords.includes("subscription")
  ) {
    return AI_COMPONENT_RECIPES["pricing-grid"].code;
  }
  if (keywords.includes("tab") || keywords.includes("section") || keywords.includes("organize")) {
    return AI_COMPONENT_RECIPES["tabbed-content"].code;
  }
  if (
    keywords.includes("alert") ||
    keywords.includes("notification") ||
    keywords.includes("message")
  ) {
    return AI_COMPONENT_RECIPES["alert-stack"].code;
  }
  if (keywords.includes("search")) {
    return AI_COMPONENT_RECIPES["search-with-results"].code;
  }

  return null;
}

/**
 * EXPORT SUMMARY FOR AI AGENTS
 * ════════════════════════════════════════════════════════════════════════════
 */
export const CHAMELEON_AI_SUMMARY = {
  version: "1.0.0",
  totalComponents: CHAMELEON_AI_MANIFEST.length,
  categories: {
    atoms: CHAMELEON_AI_MANIFEST.filter((c) => c.category === "atom").length,
    molecules: CHAMELEON_AI_MANIFEST.filter((c) => c.category === "molecule").length,
    organisms: CHAMELEON_AI_MANIFEST.filter((c) => c.category === "organism").length,
    templates: CHAMELEON_AI_MANIFEST.filter((c) => c.category === "template").length,
  },
  themes: ["material", "simple", "minimalist", "glassy", "liquid"],
  importPaths: {
    atoms: "./components/chameleon/atoms",
    molecules: "./components/chameleon/molecules",
    templates: "./components/chameleon/templates",
    context: "./components/chameleon/context",
    utils: "./components/chameleon/utils",
  },
  keyFeatures: [
    "5 distinct theme presets with automatic component adaptation",
    "Full dark mode support with guaranteed text contrast",
    "Built on Radix UI for accessibility",
    "TypeScript-first with complete type definitions",
    "Animation system with theme-specific physics",
    "Internationalization (i18n) with 3 languages built-in",
  ],
};
