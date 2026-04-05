/**
 * ════════════════════════════════════════════════════════════════════════════
 * CHAMELEON UI - AI HELPER UTILITIES
 * ════════════════════════════════════════════════════════════════════════════
 *
 * Utility functions that help AI agents validate usage, discover components,
 * and get helpful error messages when using Chameleon UI incorrectly.
 *
 * @ai-optimized true
 * @version 1.0.0
 */

import {
  CHAMELEON_AI_MANIFEST,
  AI_COMPONENT_RECIPES,
  selectComponentsForTask,
  selectRecipeForTask,
} from "./ai-manifest";

/**
 * Validates component prop usage and returns helpful error messages
 *
 * @ai-usage Call this function when unsure about prop usage
 * @example
 * const error = validateComponentProps('button', { variant: 'invalid' });
 * if (error) console.warn(error);
 */
export function validateComponentProps(
  componentId: string,
  props: Record<string, any>,
): string | null {
  const component = CHAMELEON_AI_MANIFEST.find((c) => c.id === componentId);

  if (!component) {
    return `⚠️ Component "${componentId}" not found. Available components: ${CHAMELEON_AI_MANIFEST.map((c) => c.id).join(", ")}`;
  }

  // Check required props
  const missingRequired = Object.entries(component.props)
    .filter(([key, prop]) => prop.required && !(key in props))
    .map(([key]) => key);

  if (missingRequired.length > 0) {
    return `❌ Missing required props for ${component.name}: ${missingRequired.join(", ")}\n\nExample:\n${component.exampleMinimal}`;
  }

  // Check invalid props
  const invalidProps = Object.entries(props).filter(([key]) => {
    return !component.props[key] && key !== "className" && key !== "style" && key !== "children";
  });

  if (invalidProps.length > 0) {
    return `⚠️ Unknown props for ${component.name}: ${invalidProps.map(([k]) => k).join(", ")}\n\nValid props: ${Object.keys(component.props).join(", ")}`;
  }

  // Check prop values against options
  for (const [key, value] of Object.entries(props)) {
    const propSchema = component.props[key];
    if (propSchema?.options && !propSchema.options.includes(String(value))) {
      return `❌ Invalid value "${value}" for prop "${key}"\n\nValid options: ${propSchema.options.join(", ")}\n\nExample:\n${component.exampleFull}`;
    }
  }

  return null; // All good!
}

/**
 * Gets component usage example for a given component
 *
 * @ai-usage Call this when you need to see how to use a component
 * @example
 * const example = getComponentExample('button', 'full');
 * console.log(example);
 */
export function getComponentExample(
  componentId: string,
  type: "minimal" | "full" = "minimal",
): string | null {
  const component = CHAMELEON_AI_MANIFEST.find((c) => c.id === componentId);
  if (!component) return null;

  return type === "minimal" ? component.exampleMinimal : component.exampleFull;
}

/**
 * Discovers components suitable for a task description
 *
 * @ai-usage Use this to find which components to use for a user request
 * @example
 * const components = discoverComponents('Create a login form');
 * // Returns: [input, button, card, alert]
 */
export function discoverComponents(taskDescription: string): {
  components: typeof CHAMELEON_AI_MANIFEST;
  recipe: string | null;
  suggestions: string[];
} {
  const components = selectComponentsForTask(taskDescription);
  const recipe = selectRecipeForTask(taskDescription);

  const suggestions: string[] = [];

  const keywords = taskDescription.toLowerCase();

  if (keywords.includes("form") || keywords.includes("input")) {
    suggestions.push("Use Input for text fields with labels");
    suggestions.push("Wrap in Card for visual grouping");
    suggestions.push('Add Button with variant="primary" for submission');
    suggestions.push("Show validation errors with Alert component");
  }

  if (keywords.includes("dashboard") || keywords.includes("analytics")) {
    suggestions.push("Use StatCard for displaying metrics");
    suggestions.push("Organize with grid layout: grid md:grid-cols-3 gap-6");
    suggestions.push("Add Tabs for different dashboard views");
  }

  if (keywords.includes("navigation") || keywords.includes("menu")) {
    suggestions.push("Use Tabs for section navigation");
    suggestions.push('Use Button variant="ghost" for menu items');
  }

  if (keywords.includes("modal") || keywords.includes("popup") || keywords.includes("dialog")) {
    suggestions.push("Use Dialog component with DialogTrigger and DialogContent");
    suggestions.push("Include confirmation buttons inside DialogContent");
  }

  if (keywords.includes("pricing") || keywords.includes("plan")) {
    suggestions.push("Use PricingCard in a grid layout");
    suggestions.push("Mark recommended tier with recommended prop");
  }

  // Always suggest proper text colors
  suggestions.push("Use text-[var(--foreground)] for main text");
  suggestions.push("Use text-[var(--muted-foreground)] for secondary text");

  return {
    components,
    recipe,
    suggestions,
  };
}

/**
 * Gets all available component recipes
 *
 * @ai-usage Use this to see all pre-built patterns
 */
export function getAllRecipes() {
  return Object.entries(AI_COMPONENT_RECIPES).map(([id, recipe]) => ({
    id,
    ...recipe,
  }));
}

/**
 * Explains theme system to AI agents
 *
 * @ai-usage Call this to understand theme behavior
 */
export function explainThemes(): string {
  return `
Chameleon UI has 5 automatic themes:

1. MATERIAL - Google Material Design style
   • Elevated cards with shadows
   • Rounded corners (4px)
   • Primary color: Purple (#6200ee)
   • Use for: Business apps, dashboards

2. SIMPLE - Clean and classic
   • Subtle borders
   • Medium rounded corners (8px)
   • Primary color: Slate (#0f172a)
   • Use for: Professional websites, SaaS

3. MINIMALIST - Sharp and stark
   • Zero rounded corners
   • Black and white
   • Border-based styling
   • Use for: Editorial, portfolios, design-forward

4. GLASSY - Frosted glass effect
   • Backdrop blur
   • Transparent backgrounds
   • Orb animations
   • Use for: Modern, premium apps

5. LIQUID - Organic and fluid
   • Gradient fills
   • Rounded pill shapes
   • Morphing blob backgrounds
   • Use for: Creative, playful interfaces

ALL components automatically adapt to the active theme.
Users can switch themes - you don't need to handle it.
`;
}

/**
 * Checks if color usage is theme-safe
 *
 * @ai-usage Validate your code before generating
 * @example
 * const issues = checkColorUsage('<div className="bg-white text-black">...</div>');
 */
export function checkColorUsage(code: string): string[] {
  const issues: string[] = [];

  // Check for hard-coded colors that break in dark mode
  const problematicPatterns = [
    { pattern: /bg-white(?![/\[])/g, fix: "bg-[var(--background)]" },
    { pattern: /text-black(?![/\[])/g, fix: "text-[var(--foreground)]" },
    { pattern: /text-gray-\d+(?![/\[])/g, fix: "text-[var(--muted-foreground)]" },
    { pattern: /bg-gray-\d+(?![/\[])/g, fix: "bg-[var(--muted)]" },
  ];

  problematicPatterns.forEach(({ pattern, fix }) => {
    const matches = code.match(pattern);
    if (matches) {
      issues.push(`⚠️ Found hard-coded color: ${matches[0]} → Use ${fix} instead`);
    }
  });

  // Check for missing text colors on containers
  if (code.includes("bg-[var(--") && !code.includes("text-[var(--")) {
    issues.push("⚠️ Background color found without text color. Add text-[var(--foreground)]");
  }

  return issues;
}

/**
 * Generates component import statements
 *
 * @ai-usage Get correct import syntax
 * @example
 * const imports = generateImports(['button', 'input', 'card']);
 */
export function generateImports(componentIds: string[]): string {
  const atomIds = ["button", "input", "badge", "progress", "toggle", "spinner", "avatar"];
  const moleculeIds = ["card", "tabs", "dialog", "alert", "statcard", "pricingcard", "separator"];
  const templateIds = ["authtemplate", "settingstemplate", "ecommercetemplate"];

  const atoms = componentIds.filter((id) => atomIds.includes(id.toLowerCase()));
  const molecules = componentIds.filter((id) => moleculeIds.includes(id.toLowerCase()));
  const templates = componentIds.filter((id) => templateIds.includes(id.toLowerCase()));

  const imports: string[] = [];

  if (atoms.length > 0) {
    const names = atoms.map((id) => {
      const component = CHAMELEON_AI_MANIFEST.find((c) => c.id === id);
      return component?.name || id;
    });
    imports.push(`import { ${names.join(", ")} } from './components/chameleon/atoms';`);
  }

  if (molecules.length > 0) {
    const names = molecules.map((id) => {
      const component = CHAMELEON_AI_MANIFEST.find((c) => c.id === id);
      return component?.name || id;
    });
    imports.push(`import { ${names.join(", ")} } from './components/chameleon/molecules';`);
  }

  if (templates.length > 0) {
    const names = templates.map((id) => {
      const component = CHAMELEON_AI_MANIFEST.find((c) => c.id === id);
      return component?.name || id;
    });
    imports.push(`import { ${names.join(", ")} } from './components/chameleon/templates';`);
  }

  // Always include utilities
  imports.push(`import { cn } from './components/chameleon/utils';`);

  return imports.join("\n");
}

/**
 * AI-friendly component complexity guide
 */
export const COMPLEXITY_GUIDE = {
  1: {
    label: "Simple",
    description: "Single-purpose, no composition needed",
    examples: ["Button", "Badge"],
    when: "User asks for basic actions, labels, or indicators",
  },
  2: {
    label: "Basic",
    description: "Simple inputs or containers",
    examples: ["Input", "Progress", "Card"],
    when: "User asks for forms, loading bars, or content boxes",
  },
  3: {
    label: "Moderate",
    description: "Composed components with state",
    examples: ["StatCard", "Tabs", "Toggle"],
    when: "User asks for metrics, navigation, or interactive controls",
  },
  4: {
    label: "Intermediate",
    description: "Multi-part components with logic",
    examples: ["Dialog", "PricingCard"],
    when: "User asks for modals, pricing displays, or complex cards",
  },
  5: {
    label: "Advanced",
    description: "Complex compositions",
    examples: ["Composed forms", "Search interfaces"],
    when: "User asks for complete features or multi-step flows",
  },
  6: {
    label: "Template",
    description: "Full-page layouts",
    examples: ["AuthTemplate", "SettingsTemplate"],
    when: "User asks for complete pages or major sections",
  },
  7: {
    label: "Application",
    description: "Complete application views",
    examples: ["Dashboards", "Admin panels"],
    when: "User asks for entire application screens",
  },
};

/**
 * Quick reference for common tasks
 */
export const AI_QUICK_REFERENCE = {
  "Create a button": 'Use <Button variant="primary" animated>Text</Button>',
  "Create a form input": 'Use <Input placeholder="..." /> with a label above it',
  "Create a card":
    "Use <Card><CardHeader><CardTitle>Title</CardTitle></CardHeader><CardContent>Content</CardContent></Card>",
  "Create a modal":
    "Use <Dialog><DialogTrigger asChild><Button>Open</Button></DialogTrigger><DialogContent>Content</DialogContent></Dialog>",
  "Create tabs":
    'Use <Tabs defaultValue="tab1"><TabsList><TabsTrigger value="tab1">Tab 1</TabsTrigger></TabsList><TabsContent value="tab1">Content</TabsContent></Tabs>',
  "Display a metric": 'Use <StatCard label="Label" value="1.2K" trend="up" trendValue="+12%" />',
  "Show an alert": 'Use <Alert variant="success" title="Success">Message</Alert>',
  "Add a badge": "Use <Badge>Text</Badge>",
  "Add a progress bar": 'Use <Progress value={75} label="Progress" showValue />',
  "Style text properly":
    "Use text-[var(--foreground)] for main text, text-[var(--muted-foreground)] for secondary",
  "Make responsive": "Use grid md:grid-cols-2 lg:grid-cols-3 gap-6 for responsive grids",
};

/**
 * Validates entire component code and returns suggestions
 *
 * @ai-usage Final validation before code generation
 */
export function validateCode(code: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Check for imports
  if (!code.includes("from './components/chameleon/")) {
    errors.push("❌ Missing Chameleon UI imports");
  }

  // Check for hard-coded colors
  const colorIssues = checkColorUsage(code);
  warnings.push(...colorIssues);

  // Check for proper text color usage
  if (code.includes("<div") || code.includes("<section") || code.includes("<main")) {
    if (!code.includes("text-[var(--")) {
      warnings.push("⚠️ Consider adding text-[var(--foreground)] to ensure readable text");
    }
  }

  // Check for responsive classes
  if (code.includes("grid-cols-") && !code.includes("md:grid-cols-")) {
    suggestions.push("💡 Add responsive breakpoints: md:grid-cols-2 lg:grid-cols-3");
  }

  // Check for animations
  if (code.includes("<Button") && !code.includes("animated")) {
    suggestions.push("💡 Add animated prop to Button for better UX");
  }

  // Check for proper spacing
  if (!code.includes("space-y-") && !code.includes("gap-")) {
    suggestions.push("💡 Add spacing utilities: space-y-6 or gap-4 for better layout");
  }

  // Check for accessibility
  if (code.includes('type="button"') && code.includes("onClick")) {
    suggestions.push("✅ Good: Using semantic button element");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
}
