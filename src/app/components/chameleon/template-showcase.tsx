/**
 * Template Showcase - Display all 10 comprehensive templates
 */

import React, { useMemo, useState } from "react";
import {
  Globe,
  ShoppingCart,
  BarChart3,
  Mail,
  User,
  Shield,
  FileText,
  BookOpen,
  DollarSign,
  Settings,
  Search,
  Copy,
  Check,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./molecules";
import { Button, Input, Badge } from "./atoms";
import { useThemeClasses } from "./context";
import { cn } from "./utils";
import { CopyPageForAIPanel } from "./ai-helpers";
import {
  LandingPageTemplate,
  BlogArticleTemplate,
  PricingPageTemplate,
  ContactSupportTemplate,
} from "./comprehensive-templates";
import {
  UserProfileTemplate,
  AdminDashboardTemplate,
  EcommerceProductTemplate,
  SettingsPanelTemplate,
  AuthFlowTemplate,
  DocumentationTemplate,
} from "./comprehensive-templates-part2";

const TEMPLATE_DOCS_MARKDOWN = `# Chameleon UI — Templates Directory

A set of 10 fully built, production-ready page templates assembling multiple Chameleon components.

## 🏗️ Available Templates:
- **Landing Page**: \`LandingPageTemplate\`
- **Blog/Article**: \`BlogArticleTemplate\`
- **Pricing**: \`PricingPageTemplate\`
- **Contact**: \`ContactSupportTemplate\`
- **User Profile**: \`UserProfileTemplate\`
- **Admin Dashboard**: \`AdminDashboardTemplate\`
- **E-commerce Product**: \`EcommerceProductTemplate\`
- **Settings Panel**: \`SettingsPanelTemplate\`
- **Authentication**: \`AuthFlowTemplate\`
- **Documentation**: \`DocumentationTemplate\`

Import these from \`@/components/chameleon/comprehensive-templates\` and \`@/components/chameleon/comprehensive-templates-part2\` for rapid prototyping. They strictly use internal Atoms and Molecules and respect the active theme.
`;

interface TemplateMeta {
  id: string;
  label: string;
  icon: React.ElementType;
  component: React.ComponentType;
  summary: string;
  importPath: string;
  usageExample: string;
}

export const TemplateShowcase: React.FC = () => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [search, setSearch] = useState("");
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);
  const [templateColorMap, setTemplateColorMap] = useState<Record<string, string>>({
    landing: "#7c3aed",
    blog: "#4f46e5",
    pricing: "#9333ea",
    contact: "#0284c7",
    profile: "#6366f1",
    admin: "#7c3aed",
    ecommerce: "#ec4899",
    settings: "#14b8a6",
    auth: "#8b5cf6",
    docs: "#3b82f6",
  });

  const templates: TemplateMeta[] = [
    {
      id: "landing",
      label: "Landing Page",
      icon: Globe,
      component: LandingPageTemplate,
      summary: "Hero-first marketing layout with feature blocks and conversion sections.",
      importPath: "./components/chameleon/comprehensive-templates",
      usageExample: `<LandingPageTemplate />`,
    },
    {
      id: "blog",
      label: "Blog/Article",
      icon: FileText,
      component: BlogArticleTemplate,
      summary: "Editorial article template with metadata, reading flow, and rich content blocks.",
      importPath: "./components/chameleon/comprehensive-templates",
      usageExample: `<BlogArticleTemplate />`,
    },
    {
      id: "pricing",
      label: "Pricing",
      icon: DollarSign,
      component: PricingPageTemplate,
      summary: "Tiered pricing page with plan cards, feature matrix, and CTA sections.",
      importPath: "./components/chameleon/comprehensive-templates",
      usageExample: `<PricingPageTemplate />`,
    },
    {
      id: "contact",
      label: "Contact",
      icon: Mail,
      component: ContactSupportTemplate,
      summary: "Support/contact template for forms, help channels, and response expectations.",
      importPath: "./components/chameleon/comprehensive-templates",
      usageExample: `<ContactSupportTemplate />`,
    },
    {
      id: "profile",
      label: "User Profile",
      icon: User,
      component: UserProfileTemplate,
      summary: "Public/private profile layout with content tabs and social proof sections.",
      importPath: "./components/chameleon/comprehensive-templates-part2",
      usageExample: `<UserProfileTemplate />`,
    },
    {
      id: "admin",
      label: "Admin Dashboard",
      icon: BarChart3,
      component: AdminDashboardTemplate,
      summary: "Operations dashboard with KPI cards, charts area, and activity tables.",
      importPath: "./components/chameleon/comprehensive-templates-part2",
      usageExample: `<AdminDashboardTemplate />`,
    },
    {
      id: "ecommerce",
      label: "E-commerce Product",
      icon: ShoppingCart,
      component: EcommerceProductTemplate,
      summary: "Product page template with media gallery, pricing, and conversion-focused CTA.",
      importPath: "./components/chameleon/comprehensive-templates-part2",
      usageExample: `<EcommerceProductTemplate />`,
    },
    {
      id: "settings",
      label: "Settings Panel",
      icon: Settings,
      component: SettingsPanelTemplate,
      summary: "Structured account settings with preferences, security controls, and danger zone.",
      importPath: "./components/chameleon/comprehensive-templates-part2",
      usageExample: `<SettingsPanelTemplate />`,
    },
    {
      id: "auth",
      label: "Authentication Flow",
      icon: Shield,
      component: AuthFlowTemplate,
      summary: "End-to-end auth flow template for login, signup, recovery, and verification states.",
      importPath: "./components/chameleon/comprehensive-templates-part2",
      usageExample: `<AuthFlowTemplate />`,
    },
    {
      id: "docs",
      label: "Documentation",
      icon: BookOpen,
      component: DocumentationTemplate,
      summary: "Docs-style information architecture with sidebar navigation and code sections.",
      importPath: "./components/chameleon/comprehensive-templates-part2",
      usageExample: `<DocumentationTemplate />`,
    },
  ];

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return templates;
    return templates.filter((template) => {
      const haystack = `${template.label} ${template.summary} ${template.id}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [search, templates]);

  const getTemplateCode = (template: TemplateMeta) => {
    const color = templateColorMap[template.id] ?? "#7c3aed";
    return `import { ${template.component.name} } from "${template.importPath}";

const templateTheme = {
  "--primary": "${color}",
} as React.CSSProperties;

export function My${template.component.name}Page() {
  return (
    <div style={templateTheme} className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <${template.component.name} />
    </div>
  );
}`;
  };

  const copyTemplateCode = async (template: TemplateMeta) => {
    await navigator.clipboard.writeText(getTemplateCode(template));
    setCopiedTemplateId(template.id);
    setTimeout(() => setCopiedTemplateId(null), 2000);
  };

  return (
    <div className="pb-20 space-y-8">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <h1 className={cn("text-5xl font-black tracking-tight", textPrimary)}>
            Template Library
          </h1>
          <div className="flex items-center gap-2">
            <CopyPageForAIPanel markdown={TEMPLATE_DOCS_MARKDOWN} />
          </div>
        </div>
        <p className={cn("text-xl", textMuted)}>
          Search templates, preview them live, and copy production-ready starter code with color overrides.
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--muted)]/20 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className={cn("text-2xl font-black", textPrimary)}>Template Directory</h2>
          <Badge className="text-[10px] font-black uppercase tracking-wider">
            {filteredTemplates.length} Templates
          </Badge>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
          <Input
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="space-y-3">
          {filteredTemplates.map((template) => {
            const snippet = getTemplateCode(template);
            return (
              <details
                key={template.id}
                className="group rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden"
              >
                <summary className="flex items-center gap-3 px-4 py-3 cursor-pointer list-none select-none hover:bg-[var(--muted)]/30 transition-colors">
                  <template.icon className="w-4 h-4 shrink-0 text-[var(--primary)]" />
                  <div className="flex-1 min-w-0">
                    <span className={cn("font-bold text-sm", textPrimary)}>{template.label}</span>
                    <p className={cn("text-xs truncate", textMuted)}>{template.summary}</p>
                  </div>
                </summary>

                <div className="px-4 pb-4 pt-2 space-y-4 border-t border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <label className={cn("text-xs font-bold shrink-0", textMuted)}>Accent color</label>
                    <input
                      type="color"
                      value={templateColorMap[template.id] ?? "#7c3aed"}
                      onChange={(e) =>
                        setTemplateColorMap((prev) => ({ ...prev, [template.id]: e.target.value }))
                      }
                      className="w-8 h-6 rounded cursor-pointer border border-[var(--border)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className={cn("text-xs font-black uppercase tracking-widest", textMuted)}>
                        Copy/paste starter code
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-2 text-xs"
                        onClick={() => copyTemplateCode(template)}
                      >
                        {copiedTemplateId === template.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy code
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="text-xs rounded-lg border border-[var(--border)] bg-[var(--muted)]/40 px-3 py-2 overflow-x-auto">
                      {snippet}
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <p className={cn("text-xs font-black uppercase tracking-widest", textMuted)}>
                      Quick usage
                    </p>
                    <code className="block text-xs rounded-lg border border-[var(--border)] bg-[var(--muted)]/40 px-3 py-2 overflow-x-auto">
                      {template.usageExample}
                    </code>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>

      <Tabs defaultValue="landing">
        <TabsList className="flex-wrap h-auto">
          {templates.map((template) => (
            <TabsTrigger key={template.id} value={template.id}>
              <template.icon className="w-4 h-4 mr-2" />
              {template.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {templates.map((template) => (
          <TabsContent key={template.id} value={template.id}>
            <template.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
