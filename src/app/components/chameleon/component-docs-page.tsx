/**
 * Component Documentation Page
 * Unified docs for Atoms, Molecules, Composites, and Auth — with live examples,
 * usage code, and API references. Replaces the scattered showcase/composites/auth pages.
 */

import React, { useState } from "react";
import {
  Atom,
  Layers,
  Puzzle,
  ShieldCheck,
  Code,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";
import { Button, Input, Badge, Progress } from "./atoms";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  PricingCard,
  StatCard,
  Alert,
  Separator,
} from "./molecules";
import { CompositesShowcase } from "./composites";
import { AuthShowcase } from "./auth-showcase";
import { ButtonShowcaseExample, AnimationShowcaseExample, ProgressShowcaseExample } from "./showcase-examples";
import { useThemeClasses, useChameleon } from "./context";
import { cn } from "./utils";
import { CopyPageForAIPanel } from "./ai-helpers";

// ─── Types ────────────────────────────────────────────────────────────────────

type DocTab = "atoms" | "molecules" | "composites" | "auth";

interface SectionTab {
  id: DocTab;
  label: string;
  icon: React.ElementType;
  count: string;
  desc: string;
}

// ─── Code Snippet ─────────────────────────────────────────────────────────────

const CodeSnippet: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useChameleon();

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--muted)]/40 w-full min-w-0 max-w-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--muted)]/60">
        <div className="flex items-center gap-2">
          <Code className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">
            Usage
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
          )}
        </button>
      </div>
      <pre className="p-4 text-xs leading-relaxed text-[var(--foreground)] overflow-x-auto font-mono">
        {code.trim()}
      </pre>
    </div>
  );
};

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader: React.FC<{
  title: string;
  desc: string;
  count?: string;
}> = ({ title, desc, count }) => {
  const { textPrimary, textMuted } = useThemeClasses();
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <h2 className={cn("text-2xl sm:text-3xl font-black tracking-tight", textPrimary)}>{title}</h2>
        {count && (
          <span className="text-xs font-black bg-[var(--primary)]/10 text-[var(--primary)] px-2.5 py-1 rounded-full">
            {count}
          </span>
        )}
      </div>
      <p className={cn("text-base", textMuted)}>{desc}</p>
    </div>
  );
};

// ─── Atoms Tab ────────────────────────────────────────────────────────────────

const AtomsTab: React.FC = () => {
  const { textPrimary, textMuted, cardClass, theme } = useThemeClasses();

  return (
    <div className="space-y-12 pb-8">
      <SectionHeader
        title="Atoms"
        desc="Primitive building blocks — each morphs to match the active theme with zero configuration."
        count="8 components"
      />

      {/* Button */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
          <h3 className={cn("text-lg font-black", textPrimary)}>Button</h3>
          <Badge className="text-[9px]">atom</Badge>
        </div>
        <p className={cn("text-sm max-w-xl", textMuted)}>
          Fully themed, accessible button with animation support. Adapts to all 5 themes automatically.
        </p>
        <div className={cn(cardClass, "p-4 sm:p-8")}>
          <ButtonShowcaseExample />
        </div>
        <CodeSnippet code={`import { Button } from "@chameleon-ui-lib/react";

<Button animated>Primary</Button>
<Button variant="secondary" animated>Secondary</Button>
<Button variant="outline" animated>Outline</Button>
<Button variant="ghost" animated>Ghost</Button>
<Button size="sm" animated>Small</Button>
<Button size="lg" animated>Large</Button>`} />
      </div>

      <Separator />

      {/* Progress */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
          <h3 className={cn("text-lg font-black", textPrimary)}>Progress</h3>
          <Badge className="text-[9px]">atom</Badge>
        </div>
        <p className={cn("text-sm max-w-xl", textMuted)}>
          Animated progress bar with optional label and value display.
        </p>
        <div className={cn(cardClass, "p-4 sm:p-8")}>
          <ProgressShowcaseExample />
        </div>
        <CodeSnippet code={`import { Progress } from "@chameleon-ui-lib/react";

<Progress value={72} label="Storage" showValue animated />
<Progress value={45} label="Memory" showValue animated />
<Progress value={91} label="CPU" showValue animated />`} />
      </div>

      <Separator />

      {/* Badge */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
          <h3 className={cn("text-lg font-black", textPrimary)}>Badge</h3>
          <Badge className="text-[9px]">atom</Badge>
        </div>
        <p className={cn("text-sm max-w-xl", textMuted)}>
          Semantic status indicator. Use semantic color classes for context-aware styling.
        </p>
        <div className={cn(cardClass, "p-4 sm:p-8 flex flex-wrap gap-3")}>
          <Badge>Default</Badge>
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">Success</Badge>
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30">Warning</Badge>
          <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/30">Error</Badge>
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/30">Info</Badge>
        </div>
        <CodeSnippet code={`import { Badge } from "@chameleon-ui-lib/react";

<Badge>Default</Badge>
<Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">Success</Badge>
<Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30">Warning</Badge>
<Badge className="bg-rose-500/10 text-rose-600 border-rose-500/30">Error</Badge>`} />
      </div>

      <Separator />

      {/* Input */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
          <h3 className={cn("text-lg font-black", textPrimary)}>Input</h3>
          <Badge className="text-[9px]">atom</Badge>
        </div>
        <p className={cn("text-sm max-w-xl", textMuted)}>
          Theme-aware text input. Supports all standard HTML input types.
        </p>
        <div className={cn(cardClass, "p-4 sm:p-8 space-y-4 max-w-xl")}>
          <Input placeholder="Search your project..." />
          <div className="flex gap-3">
            <Input type="email" placeholder="Email address" />
            <Button>Subscribe</Button>
          </div>
        </div>
        <CodeSnippet code={`import { Input } from "@chameleon-ui-lib/react";

<Input placeholder="Search your project..." />
<Input type="email" placeholder="Email address" />`} />
      </div>

      <Separator />

      {/* Alert */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
          <h3 className={cn("text-lg font-black", textPrimary)}>Alert</h3>
          <Badge className="text-[9px]">atom</Badge>
        </div>
        <p className={cn("text-sm max-w-xl", textMuted)}>
          Semantic alert banners. Supports success, warning, and error variants with optional animation.
        </p>
        <div className="space-y-3 max-w-xl">
          <Alert variant="success" title="Deployment successful" animated>
            Your app has been deployed to production.
          </Alert>
          <Alert variant="warning" title="Storage limit" animated>
            You've used 85% of your storage quota.
          </Alert>
          <Alert variant="error" title="Payment failed" animated>
            Your subscription renewal failed. Please update your billing info.
          </Alert>
        </div>
        <CodeSnippet code={`import { Alert } from "@chameleon-ui-lib/react";

<Alert variant="success" title="Deployment successful" animated>
  Your app has been deployed to production.
</Alert>
<Alert variant="warning" title="Storage limit" animated>
  You've used 85% of your storage quota.
</Alert>`} />
      </div>
    </div>
  );
};

// ─── Molecules Tab ────────────────────────────────────────────────────────────

const MoleculesTab: React.FC = () => {
  const { textPrimary, textMuted, cardClass, theme } = useThemeClasses();

  return (
    <div className="space-y-12 pb-8">
      <SectionHeader
        title="Molecules"
        desc="Composed components built from atoms — feature-complete and production-ready."
        count="10 components"
      />

      {/* Card */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
          <h3 className={cn("text-lg font-black", textPrimary)}>Card</h3>
          <Badge className="text-[9px]">molecule</Badge>
        </div>
        <p className={cn("text-sm max-w-xl", textMuted)}>
          Elevated surface with header, title, and content slots. Adapts border radius and shadow to each theme.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <PricingCard
            tier="Professional"
            price="$49"
            recommended
            animated
            features={["Unlimited Projects", "Custom Theming", "Team Collaboration", "Priority Support"]}
          />
          <StatCard label="Active Users" value="1.2M" trend="up" trendValue="+14%" animated />
          <StatCard label="Response Time" value="42ms" trend="down" trendValue="-8%" animated />
        </div>
        <CodeSnippet code={`import { Card, CardHeader, CardTitle, CardContent } from "@chameleon-ui-lib/react";

<Card>
  <CardHeader>
    <CardTitle>My Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
</Card>`} />
      </div>

      <Separator />

      {/* Dialog */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
          <h3 className={cn("text-lg font-black", textPrimary)}>Dialog</h3>
          <Badge className="text-[9px]">molecule</Badge>
        </div>
        <p className={cn("text-sm max-w-xl", textMuted)}>
          Accessible modal dialog with animated enter/exit. Adapts to theme — Glassy gets frosted glass, Minimalist gets pure typography.
        </p>
        <div className={cn(cardClass, "p-4 sm:p-8 flex flex-col items-center gap-4")}>
          <Dialog>
            <DialogTrigger asChild>
              <Button animated>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--card-foreground)]">Dialog Title</h2>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                  This dialog adapts to every theme. Glassy gets frosted glass, Minimalist strips it to pure typography.
                </p>
                <div className="flex gap-3 pt-2">
                  <Button className="flex-1" animated>Confirm</Button>
                  <Button variant="outline" className="flex-1">Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <CodeSnippet code={`import { Dialog, DialogTrigger, DialogContent } from "@chameleon-ui-lib/react";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <h2>Dialog Title</h2>
    <p>Your content here</p>
  </DialogContent>
</Dialog>`} />
      </div>

      <Separator />

      {/* Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
          <h3 className={cn("text-lg font-black", textPrimary)}>Tabs</h3>
          <Badge className="text-[9px]">molecule</Badge>
        </div>
        <p className={cn("text-sm max-w-xl", textMuted)}>
          Keyboard-navigable tab component with animated indicator. Themes style the active pill differently.
        </p>
        <div className={cn(cardClass, "p-4 sm:p-8")}>
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className={cn("text-sm", textMuted)}>The overview content lives here.</p>
            </TabsContent>
            <TabsContent value="api">
              <p className={cn("text-sm", textMuted)}>API reference content here.</p>
            </TabsContent>
            <TabsContent value="examples">
              <p className={cn("text-sm", textMuted)}>Code examples here.</p>
            </TabsContent>
          </Tabs>
        </div>
        <CodeSnippet code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@chameleon-ui-lib/react";

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="api">API</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Content here</TabsContent>
  <TabsContent value="api">API content here</TabsContent>
</Tabs>`} />
      </div>

      <Separator />

      {/* Animations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
          <h3 className={cn("text-lg font-black", textPrimary)}>Animations</h3>
          <Badge className="text-[9px]">molecule</Badge>
        </div>
        <p className={cn("text-sm max-w-xl", textMuted)}>
          Motion primitives powered by Framer Motion. Wrap any content in an <code className="font-mono text-[var(--primary)]">&lt;Animated&gt;</code> for entrance animations.
        </p>
        <div className={cn(cardClass, "p-4 sm:p-8")}>
          <AnimationShowcaseExample />
        </div>
        <CodeSnippet code={`import { Animated, AnimatedList } from "@chameleon-ui-lib/react";

<Animated preset="fadeUp">
  <p>This fades in from below</p>
</Animated>

<AnimatedList stagger={0.1}>
  <p>Item 1</p>
  <p>Item 2</p>
  <p>Item 3</p>
</AnimatedList>`} />
      </div>
    </div>
  );
};

// ─── Composites Tab ───────────────────────────────────────────────────────────

const CompositesTab: React.FC = () => {
  const { textPrimary, textMuted } = useThemeClasses();
  return (
    <div className="space-y-8 pb-8">
      <SectionHeader
        title="Composites"
        desc="Full-featured UI blocks — data tables, kanban boards, dashboards, and more. Drop-in ready."
        count="10 components"
      />
      <CompositesShowcase />
    </div>
  );
};

// ─── Auth Tab ─────────────────────────────────────────────────────────────────

const AuthTab: React.FC = () => {
  const { textPrimary, textMuted } = useThemeClasses();
  return (
    <div className="space-y-8 pb-8">
      <SectionHeader
        title="Auth Components"
        desc="Complete authentication UI flows — login, sign-up, 2FA, magic links, and password reset."
        count="7 components"
      />
      <AuthShowcase />
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS: SectionTab[] = [
  {
    id: "atoms",
    label: "Atoms",
    icon: Atom,
    count: "8",
    desc: "Primitive building blocks",
  },
  {
    id: "molecules",
    label: "Molecules",
    icon: Layers,
    count: "10",
    desc: "Composed feature components",
  },
  {
    id: "composites",
    label: "Composites",
    icon: Puzzle,
    count: "10",
    desc: "Full-featured UI blocks",
  },
  {
    id: "auth",
    label: "Auth",
    icon: ShieldCheck,
    count: "7",
    desc: "Authentication flows",
  },
];

export const COMPONENT_DOCS_MARKDOWN = `# Chameleon UI — Component Library

A comprehensive collection of React + Tailwind UI components available in Chameleon UI. They automatically adapt to the active theme (Simple, Material, Minimalist, Glassy, Liquid).

## 🧬 Atoms (Foundational Basics)
- Button, Input, Badge, Progress, Label, Avatar, Checkbox, Switch, Radio.
- Available via \`import { Button, Input } from "@/components/chameleon/atoms"\`.

## 🧩 Molecules (Complex Combinations)
- Card, Tabs, Dialog, Alert, StatCard, PricingCard, Accordion, Dropdown Menu.
- Available via \`import { Card, Dialog } from "@/components/chameleon/molecules"\`.

## 🏗️ Composites (Full Interfaces)
- DataTable, AdvancedCharts, KanbanBoard, DynamicForm, InteractiveCalendar.
- Available via \`import { DataTable } from "@/components/chameleon/composites"\`.

## 🔐 Auth (Authentication Views)
- Login, Signup, 2FA, MagicLink, ForgotPassword.
- Built on top of Atoms/Molecules, available via \`import { AuthCard } from "@/components/chameleon/auth-components"\`.

All components strongly typed and support Tailwind classes via the \`className\` prop and the \`cn()\` utility.
`;

export const ComponentDocsPage: React.FC = () => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [activeTab, setActiveTab] = useState<DocTab>("atoms");

  const active = TABS.find((t) => t.id === activeTab)!;
  const ActiveIcon = active.icon;

  return (
    <div className="pb-20 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center border border-[var(--primary)]/20">
              <Code className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <Badge className="text-[10px] font-black uppercase tracking-widest">
              Component Library
            </Badge>
          </div>
          <CopyPageForAIPanel markdown={COMPONENT_DOCS_MARKDOWN} />
        </div>
        <h1 className={cn("text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3", textPrimary)}>
          Component Docs
        </h1>
        <p className={cn("text-xl max-w-2xl leading-relaxed", textMuted)}>
          Interactive examples, live code snippets, and API references for every component in the
          Chameleon library. All components adapt automatically to the active theme.
        </p>
      </div>

      {/* Tab selector */}
      <div className="flex flex-wrap gap-3">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border",
                isActive
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] shadow-lg shadow-[var(--primary)]/20"
                  : "bg-[var(--muted)]/40 border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span
                className={cn(
                  "text-[9px] font-black px-1.5 py-0.5 rounded-full",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[var(--primary)]/10 text-[var(--primary)]",
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active tab description */}
      <div className="flex items-center gap-3 py-3 px-4 rounded-xl border border-[var(--border)] bg-[var(--muted)]/20">
        <ActiveIcon className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
        <p className={cn("text-sm font-medium", textMuted)}>{active.desc}</p>
      </div>

      {/* Tab content */}
      {activeTab === "atoms" && <AtomsTab />}
      {activeTab === "molecules" && <MoleculesTab />}
      {activeTab === "composites" && <CompositesTab />}
      {activeTab === "auth" && <AuthTab />}
    </div>
  );
};
