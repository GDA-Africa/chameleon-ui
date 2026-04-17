/**
 * AI Documentation Page Component
 * Interactive documentation specifically designed for AI agents
 */

import React, { useState } from "react";
import { Bot, Code, Zap, CheckCircle, AlertCircle, Sparkles, Copy, Search, ClipboardCheck } from "lucide-react";
import { Button, Input } from "./atoms";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Alert,
} from "./molecules";
import { useThemeClasses } from "./context";
import { cn } from "./utils";
import {
  CHAMELEON_AI_MANIFEST,
  AI_COMPONENT_RECIPES,
  AI_PROMPT_TEMPLATES,
  CHAMELEON_AI_SUMMARY,
} from "./ai-manifest";
import {
  discoverComponents,
  getComponentExample,
  checkColorUsage,
  AI_QUICK_REFERENCE,
  COMPLEXITY_GUIDE,
} from "./ai-helpers";

// ─── AI Agent Writeup ─────────────────────────────────────────────────────────
// A comprehensive, copy-paste-ready briefing for feeding to any AI agent.
const CHAMELEON_AI_WRITEUP = `# Chameleon UI — Complete AI Agent Briefing
> Version: ${CHAMELEON_AI_SUMMARY.version} | Last updated: 2026-04-17 | Package: @chameleon-ui-lib/react

## What Is Chameleon UI?
Chameleon UI is a React 19 + TypeScript component library that gives every component the ability
to automatically adapt to 5 distinct visual themes (Material, Simple, Minimalist, Glassy, Liquid)
and 2 colour modes (light/dark). No per-component theme logic is needed by the consumer — just
wrap your app in <ChameleonProvider theme="glassy" mode="dark"> and every component adapts.

## Install
\`\`\`
npm install @chameleon-ui-lib/react
# or
pnpm add @chameleon-ui-lib/react
\`\`\`

## CLI — Scaffold Components
\`\`\`bash
npx chameleon init            # set up Tailwind v4 integration
npx chameleon add button      # scaffold a single component into your project
npx chameleon add --all-atoms # scaffold all 8 atom components
npx chameleon add --all       # scaffold all 28 components + auto-generate barrel index.ts
npx chameleon doctor          # audit your integration for common issues
\`\`\`

## Provider Setup
\`\`\`tsx
import { ChameleonProvider } from '@chameleon-ui-lib/react';

export default function App() {
  return (
    <ChameleonProvider theme="simple" mode="light">
      {/* your app */}
    </ChameleonProvider>
  );
}
\`\`\`

## Themes
| Theme       | Visual Style                        |
|-------------|-------------------------------------|
| material    | Elevated shadows, uppercase text    |
| simple      | Clean rounded corners, solid colors |
| minimalist  | Sharp edges, border-based styling   |
| glassy      | Frosted glass, backdrop blur        |
| liquid      | Gradient fills, pill shapes         |

## Component Categories & Count
- **Atoms (8):** Button, Input, Badge, Progress, Spinner, Avatar, Toggle, Tooltip, DatePicker
- **Molecules (10):** Card, Tabs, Dialog, Alert, StatCard, Select, Breadcrumb, Separator, Textarea, SearchBar
- **Composites (10):** DataTable, KanbanBoard, MultiStepForm, NotificationFeed, CalendarWidget, FileUploader, MediaGallery, Timeline, ThemeChart, PricingCard
- **Auth (7):** LoginForm, SignupForm, TwoFactorAuth, MagicLinkForm, ForgotPasswordForm, ResetPasswordForm, UserProfile
- **Templates (14):** Dashboard, Landing, Settings, Analytics, Inbox, E-commerce, Profile, Calendar, Auth, Blog, Pricing, Team, Reports, Onboarding

Total: ${CHAMELEON_AI_SUMMARY.totalComponents}+ components

## Atoms Quick Reference
\`\`\`tsx
import { Button, Input, Badge, Progress, Spinner, Avatar, Toggle, Tooltip, DatePicker } from '@chameleon-ui-lib/react';

<Button variant="primary" size="md" animated>Click</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Input placeholder="Type here..." animated />
<Badge>New</Badge>
<Progress value={75} label="Upload" showValue animated />
<Spinner size="md" />
<Avatar src="/photo.jpg" fallback="JD" size="md" animated />
<Toggle checked={true} onChange={setChecked} label="Enable" />
<Tooltip content="Hello!"><span>Hover me</span></Tooltip>
<DatePicker value={date} onChange={setDate} />
<DatePicker mode="range" rangeValue={range} onRangeChange={setRange} />
\`\`\`

## Molecules Quick Reference
\`\`\`tsx
import { Card, CardHeader, CardTitle, CardContent, Tabs, TabsList, TabsTrigger, TabsContent, Dialog, Alert } from '@chameleon-ui-lib/react';

<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader><CardContent>Body</CardContent></Card>
<Tabs defaultValue="tab1"><TabsList><TabsTrigger value="tab1">Tab</TabsTrigger></TabsList><TabsContent value="tab1">Content</TabsContent></Tabs>
<Alert variant="success">Action completed</Alert>
<Alert variant="error">Something went wrong</Alert>
\`\`\`

## Theme Hooks
\`\`\`tsx
import { useChameleon, useThemeClasses } from '@chameleon-ui-lib/react';

// Control the theme programmatically
const { theme, setTheme, mode, setMode } = useChameleon();

// Access pre-computed class strings
const { buttonPrimary, cardClass, textPrimary, textMuted, inputClass } = useThemeClasses();
\`\`\`

## Animations
All components accept an \`animated\` prop. Animations are theme-specific:
- Material: scale + shadow lift
- Simple: gentle fade-in
- Minimalist: opacity transition only
- Glassy: blur + scale
- Liquid: spring bounce

\`\`\`tsx
import { animationPresets, Animated, AnimatedList } from '@chameleon-ui-lib/react';
// Wrap any element with motion physics
<Animated><div>Animated block</div></Animated>
// Staggered list
<AnimatedList items={items} renderItem={(item) => <div>{item.name}</div>} />
\`\`\`

## CSS Import
\`\`\`css
@import '@chameleon-ui-lib/react/styles';
\`\`\`

## CSS Variables (tokens)
The library uses CSS custom properties that change with each theme:
--primary, --primary-foreground, --secondary, --secondary-foreground,
--background, --foreground, --card, --card-foreground,
--muted, --muted-foreground, --border, --accent, --accent-foreground,
--ring, --radius

## TypeScript
The library ships full TypeScript types. All components use strict types — no \`any\`.

## i18n
Supports EN, ES, FR via the \`lang\` prop on \`<ChameleonProvider lang="fr">\`.

## Key Design Principles
1. **Theme-first** — every component is built around CSS variable tokens
2. **Zero configuration** — wrapping with ChameleonProvider is all that's needed
3. **Accessibility** — keyboard navigable, ARIA roles, focus rings on all interactive elements
4. **Mobile-first** — responsive layouts baked into every component
5. **Self-contained scaffold** — \`chameleon add\` copies fully self-contained components rewriting all local imports to the npm package

## Resources
- npm: https://www.npmjs.com/package/@chameleon-ui-lib/react
- Workshop (live demo): https://chameleon.glenhalton.com
- Context file (machine-readable): https://chameleon.glenhalton.com/context.md
- Component manifest: https://chameleon.glenhalton.com/llms.txt
`;

export const AIDocsPage: React.FC = () => {
  const { textPrimary, textMuted, cardClass } = useThemeClasses();
  const [searchQuery, setSearchQuery] = useState("");
  const [discoveryResult, setDiscoveryResult] = useState<any>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedWriteup, setCopiedWriteup] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const result = discoverComponents(searchQuery);
      setDiscoveryResult(result);
    }
  };

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const copyWriteup = () => {
    navigator.clipboard.writeText(CHAMELEON_AI_WRITEUP);
    setCopiedWriteup(true);
    setTimeout(() => setCopiedWriteup(false), 3000);
  };

  return (
    <div className="pb-20 space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] flex items-center justify-center">
            <Bot className="w-6 h-6 text-[var(--primary-foreground)]" />
          </div>
          <div>
            <h1 className={cn("text-5xl font-black tracking-tight", textPrimary)}>
              AI Agent Documentation
            </h1>
            <p className={cn("text-xl mt-1", textMuted)}>
              Optimized for machine-readable integration
            </p>
          </div>
        </div>

        {/* ── AI Writeup Copy Banner ───────────────────────────────────────── */}
        <div
          className={cn(
            "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border-2 border-[var(--primary)]/30 bg-[var(--primary)]/5",
          )}
        >
          <div className="space-y-1">
            <p className={cn("font-bold text-base", textPrimary)}>
              📋 Copy a full briefing for any AI agent
            </p>
            <p className={cn("text-sm", textMuted)}>
              Paste this into ChatGPT, Claude, Gemini, or any coding assistant to give it instant,
              complete context about Chameleon UI — components, themes, CLI, and code examples.
            </p>
          </div>
          <button
            type="button"
            onClick={copyWriteup}
            className={cn(
              "shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all",
              "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
            )}
          >
            {copiedWriteup ? (
              <>
                <ClipboardCheck className="w-4 h-4" />
                Copied to clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy AI Briefing
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <div
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-bold bg-[var(--primary)]/10 text-[var(--primary)]",
            )}
          >
            v{CHAMELEON_AI_SUMMARY.version}
          </div>
          <div
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600",
            )}
          >
            {CHAMELEON_AI_SUMMARY.totalComponents} Components
          </div>
          <div
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600",
            )}
          >
            {Object.keys(AI_COMPONENT_RECIPES).length} Recipes
          </div>
          <div
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600",
            )}
          >
            5 Themes
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {Object.entries(CHAMELEON_AI_SUMMARY.categories).map(([category, count]) => (
          <Card key={category}>
            <CardContent className="p-6 text-center">
              <div className={cn("text-4xl font-black mb-2", textPrimary)}>{count}</div>
              <div className={cn("text-sm font-bold uppercase tracking-widest", textMuted)}>
                {category}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Component Discovery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Component Discovery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={cn("text-sm", textMuted)}>
            Describe what you want to build and discover which components to use
          </p>

          <div className="flex gap-3">
            <Input
              placeholder="e.g., Create a login form with validation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} animated>
              <Zap className="w-4 h-4 mr-2" />
              Discover
            </Button>
          </div>

          {discoveryResult && (
            <div className="space-y-4 mt-6">
              {/* Recommended Recipe */}
              {discoveryResult.recipe && (
                <Alert variant="success" animated>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-bold">
                      <Sparkles className="w-4 h-4" />
                      Pre-built Recipe Found!
                    </div>
                    <div className="bg-[var(--muted)] p-4 rounded-lg font-mono text-xs overflow-x-auto">
                      <pre>{discoveryResult.recipe}</pre>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(discoveryResult.recipe, "recipe")}
                    >
                      {copiedCode === "recipe" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <Copy className="w-3 h-3 mr-1" />
                      )}
                      {copiedCode === "recipe" ? "Copied!" : "Copy Code"}
                    </Button>
                  </div>
                </Alert>
              )}

              {/* Recommended Components */}
              <div>
                <h3 className={cn("font-bold mb-3", textPrimary)}>Recommended Components:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {discoveryResult.components.slice(0, 6).map((comp: any) => (
                    <div key={comp.id} className={cn(cardClass, "p-4 space-y-2")}>
                      <div className="flex items-center justify-between">
                        <span className={cn("font-bold", textPrimary)}>{comp.name}</span>
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]",
                          )}
                        >
                          {comp.category}
                        </span>
                      </div>
                      <p className={cn("text-xs", textMuted)}>{comp.description}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs"
                          onClick={() => copyToClipboard(comp.exampleMinimal, comp.id)}
                        >
                          {copiedCode === comp.id ? "Copied!" : "Copy Example"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              {discoveryResult.suggestions.length > 0 && (
                <div>
                  <h3 className={cn("font-bold mb-3", textPrimary)}>AI Suggestions:</h3>
                  <div className="space-y-2">
                    {discoveryResult.suggestions.map((suggestion: string, i: number) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span className={cn("text-sm", textPrimary)}>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs for detailed docs */}
      <Tabs defaultValue="components">
        <TabsList>
          <TabsTrigger value="components">All Components</TabsTrigger>
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
          <TabsTrigger value="prompts">Prompt Templates</TabsTrigger>
          <TabsTrigger value="quick-ref">Quick Reference</TabsTrigger>
        </TabsList>

        {/* All Components */}
        <TabsContent value="components" className="space-y-6">
          <p className={cn("text-sm", textMuted)}>
            Complete catalog of {CHAMELEON_AI_MANIFEST.length} components with usage examples and
            API documentation
          </p>

          {/* Group by category */}
          {(["atom", "molecule", "template"] as const).map((category) => {
            const components = CHAMELEON_AI_MANIFEST.filter((c) => c.category === category);
            if (components.length === 0) return null;

            return (
              <div key={category} className="space-y-4">
                <h3 className={cn("text-2xl font-black tracking-tight capitalize", textPrimary)}>
                  {category}s ({components.length})
                </h3>
                <div className="grid lg:grid-cols-2 gap-4">
                  {components.map((comp) => (
                    <Card key={comp.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{comp.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                comp.complexity <= 2
                                  ? "bg-emerald-500/10 text-emerald-600"
                                  : comp.complexity <= 4
                                    ? "bg-blue-500/10 text-blue-600"
                                    : "bg-orange-500/10 text-orange-600",
                              )}
                            >
                              Level {comp.complexity}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className={cn("text-sm", textMuted)}>{comp.description}</p>

                        <div>
                          <div className={cn("text-xs font-bold mb-2", textMuted)}>
                            MINIMAL EXAMPLE:
                          </div>
                          <div className="bg-[var(--muted)] p-3 rounded-lg font-mono text-xs overflow-x-auto">
                            <pre>{comp.exampleMinimal}</pre>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(comp.exampleMinimal, `${comp.id}-min`)}
                          >
                            {copiedCode === `${comp.id}-min` ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <Copy className="w-3 h-3 mr-1" />
                            )}
                            Copy Minimal
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(comp.exampleFull, `${comp.id}-full`)}
                          >
                            {copiedCode === `${comp.id}-full` ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <Copy className="w-3 h-3 mr-1" />
                            )}
                            Copy Full
                          </Button>
                        </div>

                        <div className="pt-2 border-t border-[var(--border)]">
                          <div className={cn("text-xs font-bold mb-1.5", textMuted)}>
                            USE CASES:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {comp.useCases.slice(0, 3).map((useCase, i) => (
                              <span
                                key={i}
                                className={cn(
                                  "text-xs px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--foreground)]",
                                )}
                              >
                                {useCase}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </TabsContent>

        {/* Recipes */}
        <TabsContent value="recipes" className="space-y-6">
          <p className={cn("text-sm", textMuted)}>
            Pre-built component combinations for common UI patterns
          </p>

          <div className="space-y-4">
            {Object.entries(AI_COMPONENT_RECIPES).map(([id, recipe]) => (
              <Card key={id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{recipe.name}</CardTitle>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]",
                      )}
                    >
                      Level {recipe.complexity}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className={cn("text-sm", textMuted)}>{recipe.description}</p>

                  <div>
                    <div className={cn("text-xs font-bold mb-2", textMuted)}>COMPONENTS USED:</div>
                    <div className="flex flex-wrap gap-2">
                      {recipe.components.map((comp: string) => (
                        <span
                          key={comp}
                          className={cn(
                            "text-xs px-2 py-1 rounded-lg bg-[var(--muted)] text-[var(--foreground)] font-mono",
                          )}
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className={cn("text-xs font-bold mb-2", textMuted)}>CODE:</div>
                    <div className="bg-[var(--muted)] p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-64 overflow-y-auto">
                      <pre>{recipe.code}</pre>
                    </div>
                  </div>

                  <Button onClick={() => copyToClipboard(recipe.code, id)} animated>
                    {copiedCode === id ? (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    {copiedCode === id ? "Copied!" : "Copy Recipe"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Prompt Templates */}
        <TabsContent value="prompts" className="space-y-6">
          <p className={cn("text-sm", textMuted)}>
            Optimized prompt templates for AI code generation
          </p>

          <div className="space-y-4">
            {Object.entries(AI_PROMPT_TEMPLATES).map(([key, template]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="capitalize">{key.replace("_", " ")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-[var(--muted)] p-4 rounded-lg">
                    <pre className="text-xs whitespace-pre-wrap text-[var(--foreground)]">
                      {template}
                    </pre>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(template, key)}
                  >
                    {copiedCode === key ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Copy className="w-3 h-3 mr-1" />
                    )}
                    {copiedCode === key ? "Copied!" : "Copy Prompt"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Quick Reference */}
        <TabsContent value="quick-ref" className="space-y-6">
          <p className={cn("text-sm", textMuted)}>Common tasks and their solutions</p>

          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(AI_QUICK_REFERENCE).map(([task, solution]) => (
              <Card key={task}>
                <CardContent className="p-4 space-y-2">
                  <div className={cn("font-bold text-sm", textPrimary)}>{task}</div>
                  <div className="bg-[var(--muted)] p-2 rounded font-mono text-xs">{solution}</div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs"
                    onClick={() => copyToClipboard(solution, task)}
                  >
                    {copiedCode === task ? "Copied!" : "Copy"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Complexity Guide */}
          <div className="space-y-4 mt-8">
            <h3 className={cn("text-2xl font-black", textPrimary)}>Complexity Guide</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(COMPLEXITY_GUIDE).map(([level, guide]) => (
                <Card key={level}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={cn("font-black text-lg", textPrimary)}>Level {level}</span>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]",
                        )}
                      >
                        {guide.label}
                      </span>
                    </div>
                    <p className={cn("text-sm", textMuted)}>{guide.description}</p>
                    <div className={cn("text-xs", textMuted)}>
                      <strong>Examples:</strong> {guide.examples.join(", ")}
                    </div>
                    <div className={cn("text-xs", textPrimary)}>
                      <strong>When:</strong> {guide.when}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle>Why Chameleon UI for AI Agents?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {CHAMELEON_AI_SUMMARY.keyFeatures.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className={cn("text-sm", textPrimary)}>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
