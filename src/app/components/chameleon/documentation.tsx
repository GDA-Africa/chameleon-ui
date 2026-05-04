/**
 * Comprehensive Documentation Page
 * Consolidated documentation including Quick Start, Theming, AI Docs, and more
 */

import React, { useState } from "react";
import {
  Zap,
  Palette,
  Terminal,
  Code,
  Copy,
  CheckCircle,
  ShieldCheck,
  Download,
  Package,
  Settings,
  Layers,
  Bot,
  BookOpen,
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  Globe,
  Layout,
  Monitor,
  AlertCircle,
  Search,
} from "lucide-react";
import { Button, Input, Badge } from "./atoms";
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
  Separator,
} from "./molecules";
import { useThemeClasses, useChameleon, ChameleonTheme } from "./context";
import { cn } from "./utils";
import { CopyPageForAIPanel } from "./ai-helpers";
import { AIDocsPage } from "./ai-docs-page";

const DOCS_MARKDOWN = `# Chameleon UI — Documentation

## 🚀 Quick Start
1. **Install:** \`npx chameleon init\`
2. **Add Components:** \`npx chameleon add button card dialog dropdown-menu\`
3. **Usage:**
   \`\`\`tsx
   import { Button } from "@/components/chameleon/atoms";
   export default () => <Button variant="primary">Click Me</Button>;
   \`\`\`

## 🎨 Core Concepts
- \`ChameleonProvider\`: The React context wrapper that registers active theme, mode (light/dark), and liquid intensities.
- \`useChameleon()\`: Read and update the global theme state.
- **Themes**: material (elevated), simple (border-radius), minimalist (sharp black & white), glassy (frosted UI), liquid (organic shapes).

## ✨ Tailored Components
Use \`cn\` from \`@/components/chameleon/utils\` and standard Tailwind CSS variables (\`var(--primary)\`, \`var(--muted)\`) to respect active themes natively.
`;

export const DocumentationPage: React.FC = () => {
  const { textPrimary, textMuted, cardClass, theme } = useThemeClasses();
  const { mode, setMode, setTheme } = useChameleon();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="pb-20 space-y-8">
      {/* Hero */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className={cn("text-5xl font-black tracking-tight", textPrimary)}>
            Documentation
          </h1>
          <CopyPageForAIPanel markdown={DOCS_MARKDOWN} />
        </div>
        <p className={cn("text-xl", textMuted)}>
          Everything you need to integrate Chameleon UI into your workflow
        </p>
      </div>

      {/* Main Documentation Tabs */}
      <Tabs defaultValue="quickstart">
        <TabsList className="mb-8">
          <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          <TabsTrigger value="styling-flow">Styling Flow</TabsTrigger>
          <TabsTrigger value="theming">Theming Guide</TabsTrigger>
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          <TabsTrigger value="ai-docs">AI Integration</TabsTrigger>
        </TabsList>

        {/* Quick Start Tab */}
        <TabsContent value="quickstart" className="space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className={cn("text-3xl font-black tracking-tight", textPrimary)}>
                  Quick Start
                </h2>
                <p className={cn("text-base", textMuted)}>Get up and running in under 2 minutes</p>
              </div>
            </div>

            {/* Step 1: Installation */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <span className="text-sm font-black text-emerald-600">1</span>
                  </div>
                  <CardTitle>Install Chameleon CLI</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm", textMuted)}>
                  Install the Chameleon CLI globally to access the component installer
                </p>
                <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-sm border border-white/10">
                  <div className="flex items-center gap-2 mb-3 opacity-50 text-xs">
                    <Terminal className="w-3 h-3" />
                    <span>Terminal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <code>npm i -g @chameleon-ui-lib/react</code>
                    <button
                      onClick={() =>
                        copyToClipboard("npm i -g @chameleon-ui-lib/react", "install-cli")
                      }
                      className="px-2 py-1 rounded hover:bg-white/10 transition-colors"
                    >
                      {copiedCode === "install-cli" ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="text-xs opacity-60 mt-2">
                    Or run without installing globally:
                    <div className="mt-1 font-mono">npx @chameleon-cli/chameleon init</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Initialize */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <span className="text-sm font-black text-emerald-600">2</span>
                  </div>
                  <CardTitle>Initialize Your Project</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm", textMuted)}>
                  Run the init command to set up Chameleon UI in your project. This creates the
                  necessary configuration, installs dependencies, and sets up the theme engine.
                </p>
                <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-sm border border-white/10">
                  <div className="flex items-center gap-2 mb-3 opacity-50 text-xs">
                    <Terminal className="w-3 h-3" />
                    <span>Terminal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <code>chameleon init</code>
                    <button
                      onClick={() => copyToClipboard("chameleon init", "init")}
                      className="px-2 py-1 rounded hover:bg-white/10 transition-colors"
                    >
                      {copiedCode === "init" ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <Alert variant="info" animated>
                  <p className="text-sm">
                    <strong>Note:</strong> The init command will prompt you to choose a default
                    theme and whether to include all component categories.
                  </p>
                </Alert>
              </CardContent>
            </Card>

            {/* Step 3: Add Components */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <span className="text-sm font-black text-emerald-600">3</span>
                  </div>
                  <CardTitle>Add Components</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm", textMuted)}>
                  Install only the components you need using the add command
                </p>
                <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-sm border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 mb-3 opacity-50 text-xs">
                    <Terminal className="w-3 h-3" />
                    <span>Terminal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <code>chameleon add button card input</code>
                    <button
                      onClick={() =>
                        copyToClipboard("chameleon add button card input", "add-components")
                      }
                      className="px-2 py-1 rounded hover:bg-white/10 transition-colors"
                    >
                      {copiedCode === "add-components" ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="text-xs opacity-60"># Add all atoms</div>
                  <div className="flex items-center justify-between">
                    <code>chameleon add --all-atoms</code>
                    <button
                      onClick={() => copyToClipboard("chameleon add --all-atoms", "add-atoms")}
                      className="px-2 py-1 rounded hover:bg-white/10 transition-colors"
                    >
                      {copiedCode === "add-atoms" ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="text-xs opacity-60"># Add all templates</div>
                  <div className="flex items-center justify-between">
                    <code>chameleon add --all-templates</code>
                    <button
                      onClick={() =>
                        copyToClipboard("chameleon add --all-templates", "add-templates")
                      }
                      className="px-2 py-1 rounded hover:bg-white/10 transition-colors"
                    >
                      {copiedCode === "add-templates" ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Use in Your App */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <span className="text-sm font-black text-emerald-600">4</span>
                  </div>
                  <CardTitle>Use in Your App</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm", textMuted)}>
                  Wrap your app with the ChameleonProvider and start using components
                </p>
                <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-xs border border-white/10 overflow-x-auto">
                  <pre>{`import { ChameleonProvider } from '@/components/chameleon/context';
import { Button, Card } from '@/components/chameleon';

function App() {
  return (
    <ChameleonProvider 
      defaultTheme="material" 
      defaultMode="light"
    >
      <div className="p-8">
        <Card>
          <h1>Welcome to Chameleon UI</h1>
          <Button animated>Get Started</Button>
        </Card>
      </div>
    </ChameleonProvider>
  );
}`}</pre>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(
                      `import { ChameleonProvider } from '@/components/chameleon/context';
import { Button, Card } from '@/components/chameleon';

function App() {
  return (
    <ChameleonProvider 
      defaultTheme="material" 
      defaultMode="light"
    >
      <div className="p-8">
        <Card>
          <h1>Welcome to Chameleon UI</h1>
          <Button animated>Get Started</Button>
        </Card>
      </div>
    </ChameleonProvider>
  );
}`,
                      "use-app",
                    )
                  }
                >
                  {copiedCode === "use-app" ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" /> Copy Code
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[var(--primary)]" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors cursor-pointer">
                    <Palette className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <div className={cn("font-bold text-sm", textPrimary)}>
                        Explore the Theming Guide
                      </div>
                      <div className={cn("text-xs", textMuted)}>
                        Learn how to customize and create your own themes
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--muted-foreground)]" />
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors cursor-pointer">
                    <Package className="w-5 h-5 text-purple-600" />
                    <div className="flex-1">
                      <div className={cn("font-bold text-sm", textPrimary)}>Browse Components</div>
                      <div className={cn("text-xs", textMuted)}>
                        View all available atoms, molecules, and templates
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--muted-foreground)]" />
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors cursor-pointer">
                    <Bot className="w-5 h-5 text-emerald-600" />
                    <div className="flex-1">
                      <div className={cn("font-bold text-sm", textPrimary)}>
                        AI Integration Guide
                      </div>
                      <div className={cn("text-xs", textMuted)}>
                        Optimize for AI-powered code generation
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--muted-foreground)]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* Styling Flow Tab */}
        <TabsContent value="styling-flow" className="space-y-10">
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                <Layers className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h2 className={cn("text-3xl font-black tracking-tight", textPrimary)}>
                  End-to-End Styling Flow
                </h2>
                <p className={cn("text-base", textMuted)}>
                  Pass visual intent from atoms all the way up to templates using structured
                  style props.
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Layer hierarchy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    title: "Atoms",
                    body: "Primitive controls (Button, Input, Badge, Avatar) expose the smallest styling knobs.",
                  },
                  {
                    title: "Molecules",
                    body: "Molecules compose atoms and centralize shared visual behavior (cards, forms, tabs, alerts).",
                  },
                  {
                    title: "Composites",
                    body: "Composites provide business-focused sections and accept typed style configs for each region.",
                  },
                  {
                    title: "Templates",
                    body: "Templates consume styleConfig and forward settings to headings, sections, stats, auth, docs, and page-level layouts.",
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="flex gap-3 p-3 rounded-xl border border-[var(--border)]"
                  >
                    <Badge className="h-fit">{index + 1}</Badge>
                    <div>
                      <p className={cn("font-bold", textPrimary)}>{item.title}</p>
                      <p className={cn("text-sm", textMuted)}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Template styleConfig example</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm", textMuted)}>
                  Use typed template config objects to control headings, profile data, dashboard
                  cards, ecommerce summaries, auth copy, and documentation navigation.
                </p>
                <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-xs border border-white/10 overflow-x-auto">
                  <pre>{`import {
  UserProfileTemplate,
  AdminDashboardTemplate,
  DocumentationTemplate,
} from "@chameleon-ui-lib/react/templates";

<UserProfileTemplate
  styleConfig={{
    profileSection: {
      user: {
        name: "Ada Lovelace",
        email: "ada@analytical.engine",
        role: "Computing Pioneer",
      },
    },
    statsCards: [
      { label: "Followers", value: "12.4K" },
      { label: "Projects", value: "87" },
      { label: "Articles", value: "31" },
    ],
  }}
/>

<AdminDashboardTemplate
  styleConfig={{
    topBar: { title: "Operations", subtitle: "Weekly performance snapshot" },
    dataTable: { heading: "Latest transactions" },
  }}
/>

<DocumentationTemplate
  styleConfig={{
    pageHeader: { title: "Platform Docs", subtitle: "Integration and API guide" },
    sideNav: {
      items: [
        { label: "Overview", href: "#getting-started" },
        { label: "Install", href: "#installation" },
      ],
    },
  }}
/>`}</pre>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(
                      `import { UserProfileTemplate, AdminDashboardTemplate, DocumentationTemplate } from "@chameleon-ui-lib/react/templates";\n\n<UserProfileTemplate styleConfig={{ profileSection: { user: { name: \"Ada Lovelace\", email: \"ada@analytical.engine\", role: \"Computing Pioneer\" } }, statsCards: [{ label: \"Followers\", value: \"12.4K\" }, { label: \"Projects\", value: \"87\" }, { label: \"Articles\", value: \"31\" }] }} />\n\n<AdminDashboardTemplate styleConfig={{ topBar: { title: \"Operations\", subtitle: \"Weekly performance snapshot\" }, dataTable: { heading: \"Latest transactions\" } }} />\n\n<DocumentationTemplate styleConfig={{ pageHeader: { title: \"Platform Docs\", subtitle: \"Integration and API guide\" }, sideNav: { items: [{ label: \"Overview\", href: \"#getting-started\" }, { label: \"Install\", href: \"#installation\" }] } }} />`,
                      "styling-flow-example",
                    )
                  }
                >
                  {copiedCode === "styling-flow-example" ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" /> Copy Example
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* Theming Guide Tab */}
        <TabsContent value="theming" className="space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <Palette className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className={cn("text-3xl font-black tracking-tight", textPrimary)}>
                  Theming Guide
                </h2>
                <p className={cn("text-base", textMuted)}>
                  Deep dive into the theme engine and customization
                </p>
              </div>
            </div>

            {/* Theme Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Understanding Chameleon Themes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm leading-relaxed", textMuted)}>
                  Chameleon UI's theme system is built on a semantic token architecture. Each theme
                  is not just a color palette—it's a complete design language with unique visual
                  characteristics, border radii, shadows, and animation behaviors.
                </p>
                <div className="grid md:grid-cols-5 gap-3">
                  {(
                    ["material", "simple", "minimalist", "glassy", "liquid"] as ChameleonTheme[]
                  ).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={cn(
                        "p-4 rounded-xl border transition-all text-left space-y-2",
                        theme === t
                          ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20 bg-[var(--primary)]/5"
                          : "border-[var(--border)] hover:border-[var(--primary)]/40",
                      )}
                    >
                      <div
                        className={cn(
                          "text-xs font-black uppercase tracking-widest",
                          theme === t ? "text-[var(--primary)]" : textMuted,
                        )}
                      >
                        {t}
                      </div>
                      <div
                        className={cn(
                          "h-8 rounded flex items-center justify-center text-[9px] font-black uppercase tracking-widest text-white",
                          t === "material"
                            ? "bg-[#6200ee] rounded-sm"
                            : t === "simple"
                              ? "bg-slate-900 rounded-md"
                              : t === "minimalist"
                                ? "bg-black rounded-none"
                                : t === "glassy"
                                  ? "bg-white/20 backdrop-blur border border-white/30 rounded-xl"
                                  : "bg-gradient-to-r from-violet-600 to-purple-500 rounded-full",
                        )}
                      >
                        Button
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Theme Characteristics */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Layers className="w-4 h-4 text-purple-600" />
                    </div>
                    Material
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className={cn("text-sm", textMuted)}>
                    Based on Google's Material Design 3. Features elevation shadows, ripple effects,
                    and rounded corners.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Border Radius</span>
                      <code className={cn("font-mono", textPrimary)}>4px</code>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Primary Color</span>
                      <code className={cn("font-mono", textPrimary)}>#6200ee</code>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Shadow</span>
                      <code className={cn("font-mono", textPrimary)}>Elevation-based</code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-500/10 flex items-center justify-center">
                      <Layout className="w-4 h-4 text-slate-600" />
                    </div>
                    Simple
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className={cn("text-sm", textMuted)}>
                    Clean and classic design inspired by traditional web interfaces. Subtle shadows
                    and neutral colors.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Border Radius</span>
                      <code className={cn("font-mono", textPrimary)}>6px</code>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Primary Color</span>
                      <code className={cn("font-mono", textPrimary)}>#0f172a</code>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Shadow</span>
                      <code className={cn("font-mono", textPrimary)}>Subtle</code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-black/10 flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-black" />
                    </div>
                    Minimalist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className={cn("text-sm", textMuted)}>
                    Brutalist-inspired design with zero decoration. Sharp edges, no shadows, maximum
                    contrast.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Border Radius</span>
                      <code className={cn("font-mono", textPrimary)}>0px</code>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Primary Color</span>
                      <code className={cn("font-mono", textPrimary)}>#000000</code>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Shadow</span>
                      <code className={cn("font-mono", textPrimary)}>None</code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    Glassy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className={cn("text-sm", textMuted)}>
                    Frosted glass aesthetic with blur effects, transparency, and light borders.
                    macOS-inspired.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Border Radius</span>
                      <code className={cn("font-mono", textPrimary)}>16px</code>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Primary Color</span>
                      <code className={cn("font-mono", textPrimary)}>rgba(255,255,255,0.9)</code>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Backdrop Filter</span>
                      <code className={cn("font-mono", textPrimary)}>blur(20px)</code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    Liquid
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className={cn("text-sm", textMuted)}>
                    Organic, fluid design with animated gradients, soft shadows, and full border
                    radius. Modern and playful.
                  </p>
                  <div className="grid md:grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Border Radius</span>
                      <code className={cn("font-mono", textPrimary)}>9999px</code>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Primary Gradient</span>
                      <code className={cn("font-mono", textPrimary)}>violet→purple</code>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[var(--muted)]">
                      <span className={textMuted}>Animation</span>
                      <code className={cn("font-mono", textPrimary)}>Fluid blobs</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dark Mode */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="w-5 h-5" />
                  Dark Mode Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm leading-relaxed", textMuted)}>
                  All 5 themes have full dark mode support with proper text contrast. Toggle dark
                  mode programmatically or let users control it.
                </p>
                <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-xs border border-white/10 overflow-x-auto">
                  <pre>{`import { useChameleon } from '@/components/chameleon/context';

function ThemeToggle() {
  const { mode, setMode } = useChameleon();
  
  return (
    <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      {mode === 'light' ? <Sun /> : <Moon />}
    </button>
  );
}`}</pre>
                </div>
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant={mode === "light" ? "primary" : "outline"}
                    onClick={() => setMode("light")}
                  >
                    <Sun className="w-4 h-4 mr-2" />
                    Light Mode
                  </Button>
                  <Button
                    size="sm"
                    variant={mode === "dark" ? "primary" : "outline"}
                    onClick={() => setMode("dark")}
                  >
                    <Moon className="w-4 h-4 mr-2" />
                    Dark Mode
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Text Contrast System */}
            <Card>
              <CardHeader>
                <CardTitle>Text Contrast System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm leading-relaxed", textMuted)}>
                  Chameleon's theme tokens guarantee readable text everywhere. The{" "}
                  <code className="font-mono bg-[var(--muted)] px-1.5 py-0.5 rounded text-xs">
                    --foreground
                  </code>{" "}
                  token always contrasts with{" "}
                  <code className="font-mono bg-[var(--muted)] px-1.5 py-0.5 rounded text-xs">
                    --background
                  </code>
                  , and{" "}
                  <code className="font-mono bg-[var(--muted)] px-1.5 py-0.5 rounded text-xs">
                    --card-foreground
                  </code>{" "}
                  always contrasts with{" "}
                  <code className="font-mono bg-[var(--muted)] px-1.5 py-0.5 rounded text-xs">
                    --card
                  </code>
                  .
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      bg: "bg-[var(--primary)]",
                      text: "text-[var(--primary-foreground)]",
                      label: "Primary",
                    },
                    {
                      bg: "bg-[var(--card)]",
                      text: "text-[var(--card-foreground)]",
                      label: "Card",
                      border: "border border-[var(--border)]",
                    },
                    { bg: "bg-[var(--muted)]", text: "text-[var(--foreground)]", label: "Muted" },
                    {
                      bg: "bg-[var(--secondary)]",
                      text: "text-[var(--secondary-foreground)]",
                      label: "Secondary",
                    },
                  ].map((swatch) => (
                    <div
                      key={swatch.label}
                      className={cn(
                        "p-4 rounded-xl flex flex-col items-center justify-center gap-1.5 h-20",
                        swatch.bg,
                        swatch.border,
                      )}
                    >
                      <span
                        className={cn("text-xs font-black uppercase tracking-widest", swatch.text)}
                      >
                        {swatch.label}
                      </span>
                      <span className={cn("text-[10px]", swatch.text)}>Always readable</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Custom Theme Tokens */}
            <Card>
              <CardHeader>
                <CardTitle>Available CSS Variables</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm", textMuted)}>
                  All Chameleon themes use these semantic CSS variables. Override them to create
                  custom themes:
                </p>
                <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-xs border border-white/10 overflow-x-auto max-h-80 overflow-y-auto">
                  <pre>{`/* Core Colors */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--card: 0 0% 100%;
--card-foreground: 222.2 84% 4.9%;
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;

/* Interactive */
--primary: 262.1 83.3% 57.8%;
--primary-foreground: 210 40% 98%;
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;

/* States */
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 210 40% 98%;
--success: 142 76% 36%;
--warning: 38 92% 50%;
--info: 221 83% 53%;

/* UI Elements */
--border: 214.3 31.8% 91.4%;
--input: 214.3 31.8% 91.4%;
--ring: 262.1 83.3% 57.8%;
--radius: 0.5rem;`}</pre>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(
                      `/* Core Colors */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--card: 0 0% 100%;
--card-foreground: 222.2 84% 4.9%;
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;

/* Interactive */
--primary: 262.1 83.3% 57.8%;
--primary-foreground: 210 40% 98%;
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;

/* States */
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 210 40% 98%;
--success: 142 76% 36%;
--warning: 38 92% 50%;
--info: 221 83% 53%;

/* UI Elements */
--border: 214.3 31.8% 91.4%;
--input: 214.3 31.8% 91.4%;
--ring: 262.1 83.3% 57.8%;
--radius: 0.5rem;`,
                      "tokens",
                    )
                  }
                >
                  {copiedCode === "tokens" ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" /> Copy Variables
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Switching Themes */}
            <Card>
              <CardHeader>
                <CardTitle>Switching Themes Programmatically</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm", textMuted)}>
                  Use the{" "}
                  <code className="font-mono bg-[var(--muted)] px-1.5 py-0.5 rounded text-xs">
                    useChameleon
                  </code>{" "}
                  hook to change themes dynamically:
                </p>
                <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-xs border border-white/10 overflow-x-auto">
                  <pre>{`import { useChameleon } from '@/components/chameleon/context';

function ThemeSelector() {
  const { theme, setTheme } = useChameleon();
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="material">Material</option>
      <option value="simple">Simple</option>
      <option value="minimalist">Minimalist</option>
      <option value="glassy">Glassy</option>
      <option value="liquid">Liquid</option>
    </select>
  );
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* Installation Tab */}
        <TabsContent value="installation" className="space-y-8">
          <section className="space-y-6">
            <div>
              <h2 className={cn("text-3xl font-black tracking-tight", textPrimary)}>
                Installation
              </h2>
              <p className={cn("text-base mt-1", textMuted)}>
                Multiple ways to integrate Chameleon UI into your project
              </p>
            </div>

            {/* Method 1: CLI (Recommended) */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    Method 1: CLI (Recommended)
                  </CardTitle>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                    Recommended
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm", textMuted)}>
                  The CLI method gives you granular control over which components to install,
                  automatic dependency management, and seamless updates.
                </p>
                <div className="bg-slate-950 text-slate-50 p-6 rounded-xl font-mono text-sm border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 mb-4 opacity-50 text-xs">
                    <Terminal className="w-3 h-3" />
                    <span>Terminal</span>
                  </div>
                  {[
                    { cmd: "npm i -g @chameleon-ui-lib/react", desc: "Install CLI globally" },
                    { cmd: "chameleon init", desc: "Initialize in your project" },
                    { cmd: "chameleon add button card table", desc: "Add specific components" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-emerald-400">➜</span>
                          <span>{item.cmd}</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(item.cmd, `cli-${i}`)}
                          className="px-2 py-1 rounded hover:bg-white/10 transition-colors"
                        >
                          {copiedCode === `cli-${i}` ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <div className="text-xs opacity-50 pl-6"># {item.desc}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Method 2: NPM Package */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Method 2: NPM Package
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm", textMuted)}>
                  Install the entire component library as an npm package. Best for when you need all
                  components.
                </p>
                <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-sm border border-white/10">
                  <div className="flex items-center justify-between">
                    <code>npm i -g @chameleon-ui-lib/react</code>
                    <button
                      onClick={() => copyToClipboard("npm i -g @chameleon-ui-lib/react", "npm")}
                      className="px-2 py-1 rounded hover:bg-white/10 transition-colors"
                    >
                      {copiedCode === "npm" ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-xs border border-white/10 overflow-x-auto mt-4">
                  <pre>{`import { ChameleonProvider, Button, Card } from '@chameleon-ui/react';
import '@chameleon-ui/react/styles.css';

function App() {
  return (
    <ChameleonProvider>
      <Button>Click me</Button>
    </ChameleonProvider>
  );
}`}</pre>
                </div>
              </CardContent>
            </Card>

            {/* Method 3: Manual Copy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Method 3: Manual Copy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm", textMuted)}>
                  Copy components directly into your project for maximum customization. All
                  components are MIT licensed.
                </p>
                <Alert variant="info" animated>
                  <p className="text-sm">
                    Browse the component source code in the repository and copy the files you need
                    into your project.
                  </p>
                </Alert>
              </CardContent>
            </Card>

            {/* Dependencies */}
            <Card>
              <CardHeader>
                <CardTitle>Required Dependencies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={cn("text-sm", textMuted)}>
                  Chameleon UI is built on top of these libraries:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { name: "React", version: "^18.0.0", desc: "UI library" },
                    { name: "@radix-ui/react-*", version: "latest", desc: "Accessible primitives" },
                    { name: "motion", version: "^11.0.0", desc: "Animation library" },
                    { name: "tailwindcss", version: "^4.0.0", desc: "Utility-first CSS" },
                  ].map((dep) => (
                    <div
                      key={dep.name}
                      className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border)]"
                    >
                      <Package className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className={cn("font-mono font-bold text-sm", textPrimary)}>
                          {dep.name}
                        </div>
                        <div className={cn("text-xs", textMuted)}>{dep.desc}</div>
                        <code className="text-xs text-[var(--muted-foreground)] font-mono">
                          {dep.version}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* Components Tab */}
        <TabsContent value="components" className="space-y-8">
          <section className="space-y-6">
            <div>
              <h2 className={cn("text-3xl font-black tracking-tight", textPrimary)}>
                Component Architecture
              </h2>
              <p className={cn("text-base mt-1", textMuted)}>
                Understanding atoms, molecules, and templates
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Atoms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className={cn("text-sm", textMuted)}>
                    Basic building blocks that can't be broken down further
                  </p>
                  <Separator />
                  <div className="space-y-1 text-xs">
                    {[
                      "Button",
                      "Input",
                      "Badge",
                      "Progress",
                      "Checkbox",
                      "Switch",
                      "Radio",
                      "Slider",
                    ].map((comp) => (
                      <div key={comp} className="flex items-center gap-2 py-1">
                        <div className="w-1 h-1 rounded-full bg-[var(--primary)]" />
                        <span className={textPrimary}>{comp}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Molecules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className={cn("text-sm", textMuted)}>Composed components built from atoms</p>
                  <Separator />
                  <div className="space-y-1 text-xs">
                    {[
                      "Card",
                      "Dialog",
                      "Tabs",
                      "Alert",
                      "Dropdown",
                      "Select",
                      "Breadcrumb",
                      "Avatar",
                      "Tooltip",
                      "Textarea",
                    ].map((comp) => (
                      <div key={comp} className="flex items-center gap-2 py-1">
                        <div className="w-1 h-1 rounded-full bg-[var(--primary)]" />
                        <span className={textPrimary}>{comp}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className={cn("text-sm", textMuted)}>Production-ready page layouts</p>
                  <Separator />
                  <div className="space-y-1 text-xs">
                    {[
                      "Landing Page",
                      "Blog",
                      "Pricing",
                      "Auth Flow",
                      "Dashboard",
                      "E-commerce",
                      "Settings",
                      "Profile",
                      "Contact",
                      "Documentation",
                    ].map((comp) => (
                      <div key={comp} className="flex items-center gap-2 py-1">
                        <div className="w-1 h-1 rounded-full bg-[var(--primary)]" />
                        <span className={textPrimary}>{comp}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Component Import Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-xs border border-white/10 overflow-x-auto">
                  <pre>{`// Import atoms
import { Button, Input, Badge, Progress } from '@/components/chameleon/atoms';

// Import molecules
import { Card, Dialog, Tabs, Alert } from '@/components/chameleon/molecules';

// Import templates
import { AuthTemplate, DashboardTemplate } from '@/components/chameleon/templates';

// Import context
import { ChameleonProvider, useChameleon } from '@/components/chameleon/context';`}</pre>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* Best Practices Tab */}
        <TabsContent value="best-practices" className="space-y-8">
          <section className="space-y-6">
            <div>
              <h2 className={cn("text-3xl font-black tracking-tight", textPrimary)}>
                Best Practices
              </h2>
              <p className={cn("text-base mt-1", textMuted)}>
                Guidelines for building with Chameleon UI
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: ShieldCheck,
                  color: "emerald",
                  title: "Accessibility by default",
                  desc: "All components are built on Radix UI primitives with ARIA attributes, keyboard navigation, and screen reader support included.",
                },
                {
                  icon: Palette,
                  color: "blue",
                  title: "Use semantic color tokens",
                  desc: "Always use CSS variables like --primary, --foreground, --muted instead of hardcoded colors. This ensures proper contrast in all themes and modes.",
                },
                {
                  icon: Layout,
                  color: "purple",
                  title: "Compose from atoms up",
                  desc: "Build custom molecules by composing atoms. This maintains consistency and makes your components automatically adapt to theme changes.",
                },
                {
                  icon: Zap,
                  color: "amber",
                  title: "Enable animations sparingly",
                  desc: "Use the 'animated' prop on interactive components like buttons and cards. Avoid over-animating to maintain performance.",
                },
                {
                  icon: Globe,
                  color: "cyan",
                  title: "Leverage built-in i18n",
                  desc: "Use the translation context for user-facing text. Chameleon provides built-in support for English, Spanish, and French.",
                },
                {
                  icon: Monitor,
                  color: "slate",
                  title: "Test across themes",
                  desc: "Always test your UI in all 5 themes and both light/dark modes to ensure consistent appearance and readability.",
                },
              ].map((practice, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl bg-${practice.color}-500/10 flex items-center justify-center shrink-0`}
                      >
                        <practice.icon className={`w-5 h-5 text-${practice.color}-600`} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className={cn("font-bold text-base", textPrimary)}>{practice.title}</h3>
                        <p className={cn("text-sm leading-relaxed", textMuted)}>{practice.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Common Patterns */}
            <Card>
              <CardHeader>
                <CardTitle>Common UI Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className={cn("font-bold text-sm mb-2", textPrimary)}>Loading States</div>
                    <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-xs border border-white/10 overflow-x-auto">
                      <pre>{`<Button disabled={isLoading} animated>
  {isLoading ? <Spinner className="mr-2" /> : null}
  {isLoading ? 'Loading...' : 'Submit'}
</Button>`}</pre>
                    </div>
                  </div>

                  <div>
                    <div className={cn("font-bold text-sm mb-2", textPrimary)}>Form Validation</div>
                    <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-xs border border-white/10 overflow-x-auto">
                      <pre>{`<div className="space-y-2">
  <Input 
    type="email" 
    placeholder="Email" 
    className={error ? 'border-red-500' : ''}
  />
  {error && (
    <Alert variant="error" animated>
      {error.message}
    </Alert>
  )}
</div>`}</pre>
                    </div>
                  </div>

                  <div>
                    <div className={cn("font-bold text-sm mb-2", textPrimary)}>
                      Responsive Layout
                    </div>
                    <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-xs border border-white/10 overflow-x-auto">
                      <pre>{`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id}>
      <CardContent>{item.content}</CardContent>
    </Card>
  ))}
</div>`}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Use the 'animated' prop only on components that need animation",
                    "Lazy load templates and heavy components with React.lazy()",
                    "Memoize expensive computations with useMemo and useCallback",
                    "Avoid unnecessary re-renders by using React.memo for pure components",
                    "For large lists, consider virtualization with libraries like react-window",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={cn("text-sm", textPrimary)}>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* AI Integration Tab */}
        <TabsContent value="ai-docs">
          <AIDocsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};
