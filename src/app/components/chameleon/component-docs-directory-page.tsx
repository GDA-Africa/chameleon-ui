import React, { useMemo, useState } from "react";
import { Search, Code, Copy, Check, Atom, Layers, Puzzle } from "lucide-react";
import { Button, Input, Badge, Progress, DatePicker } from "./atoms";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PricingCard,
  StatCard,
  Dialog,
  DialogTrigger,
  DialogContent,
  Alert,
} from "./molecules";
import { useThemeClasses } from "./context";
import { cn } from "./utils";
import { CopyPageForAIPanel } from "./ai-helpers";
import { CHAMELEON_AI_MANIFEST, type AIComponentMetadata } from "./ai-manifest";

type DocsCategory = "atom" | "molecule" | "organism";
type CategoryFilter = "all" | DocsCategory;

const categoryOrder: CategoryFilter[] = ["all", "atom", "molecule", "organism"];
const categoryLabel: Record<CategoryFilter, string> = {
  all: "All",
  atom: "Atoms",
  molecule: "Molecules",
  organism: "Composites",
};
const categoryIcon: Record<DocsCategory, React.ElementType> = {
  atom: Atom,
  molecule: Layers,
  organism: Puzzle,
};

const COMPONENT_DOCS_MARKDOWN = `# Chameleon UI — Component Directory\n\nSearch components, expand for props/usages, and copy context for AI.`;

const CodeBlock = ({ code, title }: { code: string; title: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/30 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)] bg-[var(--muted)]/50">
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">{title}</p>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(code.trim());
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />}
        </button>
      </div>
      <pre className="p-3 text-xs leading-relaxed overflow-x-auto">{code.trim()}</pre>
    </div>
  );
};

const ComponentPreview = ({ component }: { component: AIComponentMetadata }) => {
  const [date, setDate] = useState<Date | null>(new Date());

  switch (component.id) {
    case "button":
      return <div className="flex flex-wrap gap-2"><Button animated>Primary</Button><Button variant="outline" animated>Outline</Button></div>;
    case "input":
      return <div className="max-w-md space-y-2"><Input placeholder="Search components..." /><Input type="email" placeholder="team@company.com" /></div>;
    case "badge":
      return <div className="flex flex-wrap gap-2"><Badge>Default</Badge><Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">Success</Badge></div>;
    case "progress":
      return <Progress value={72} label="Release progress" showValue animated />;
    case "datepicker":
      return <DatePicker value={date} onChange={setDate} placeholder="Pick date" />;
    case "card":
      return <Card><CardHeader><CardTitle>Card Preview</CardTitle></CardHeader><CardContent><p className="text-sm text-[var(--muted-foreground)]">Use cards to group related content.</p></CardContent></Card>;
    case "statcard":
      return <StatCard label="Deployments" value="42" trend="up" trendValue="+12%" animated />;
    case "pricingcard":
      return <PricingCard tier="Pro" price="$49" recommended features={["Unlimited projects", "Priority support", "Analytics"]} />;
    case "tabs":
      return <Tabs defaultValue="overview"><TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="api">API</TabsTrigger></TabsList><TabsContent value="overview">Overview content</TabsContent><TabsContent value="api">API content</TabsContent></Tabs>;
    case "dialog":
      return <Dialog><DialogTrigger asChild><Button>Open Dialog</Button></DialogTrigger><DialogContent><h3 className="text-lg font-bold">Dialog Preview</h3><p className="text-sm text-[var(--muted-foreground)]">Theme-adaptive and keyboard accessible.</p></DialogContent></Dialog>;
    case "alert":
      return <Alert variant="info" title="Heads up" animated>Component documentation now includes full prop references.</Alert>;
    default:
      return <p className="text-sm text-[var(--muted-foreground)]">Live preview is not configured for this component yet.</p>;
  }
};

const buildComponentContext = (component: AIComponentMetadata): string => {
  const propsMarkdown = Object.entries(component.props)
    .map(([name, schema]) => {
      const details = [
        `type: ${schema.type}`,
        `required: ${schema.required ? "yes" : "no"}`,
        schema.default ? `default: ${schema.default}` : null,
        schema.options ? `options: ${schema.options.join(", ")}` : null,
      ].filter(Boolean).join(" | ");
      return `- ${name} — ${details} — ${schema.description}`;
    })
    .join("\n");

  return `# ${component.name}\n\n## Props\n${propsMarkdown || "- None"}\n\n## Minimal\n${component.exampleMinimal}\n\n## Full\n${component.exampleFull}`;
};

export const ComponentDocsDirectoryPage: React.FC = () => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [copiedContextId, setCopiedContextId] = useState<string | null>(null);

  const components = useMemo(
    () => CHAMELEON_AI_MANIFEST.filter((component) => component.category !== "template").slice().sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return components.filter((component) => {
      const categoryMatch = category === "all" || component.category === category;
      if (!categoryMatch) return false;
      if (!q) return true;
      return [component.id, component.name, component.description, ...component.keywords, ...component.useCases].join(" ").toLowerCase().includes(q);
    });
  }, [category, components, query]);

  const counts = useMemo(() => {
    return components.reduce<Record<AIComponentMetadata["category"], number>>((acc, component) => {
      acc[component.category] += 1;
      return acc;
    }, { atom: 0, molecule: 0, organism: 0, template: 0 });
  }, [components]);

  return (
    <div className="pb-20 space-y-8">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
              <Code className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <Badge className="text-[10px] font-black uppercase tracking-widest">Component Directory</Badge>
          </div>
          <CopyPageForAIPanel markdown={COMPONENT_DOCS_MARKDOWN} />
        </div>

        <h1 className={cn("text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3", textPrimary)}>Component Docs</h1>
        <p className={cn("text-base sm:text-lg max-w-3xl leading-relaxed", textMuted)}>
          Search every documented component, expand a panel to see usage + full props, and copy a component-specific AI briefing in one click.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)]/20 p-4 sm:p-6 space-y-4">
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, keyword, use case, or category..." className="pl-10" />
        </div>

        <div className="flex flex-wrap gap-2">
          {categoryOrder.map((option) => {
            const isActive = category === option;
            const count = option === "all" ? components.length : counts[option as AIComponentMetadata["category"]];
            return (
              <button
                key={option}
                onClick={() => setCategory(option)}
                className={cn(
                  "px-3 py-2 rounded-xl text-xs font-bold border transition-all",
                  isActive
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                    : "bg-[var(--card)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)]",
                )}
              >
                {categoryLabel[option]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((component) => {
          const Icon = categoryIcon[component.category as DocsCategory] ?? Code;
          const propsEntries = Object.entries(component.props);
          return (
            <details key={component.id} className="group rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <summary className="list-none cursor-pointer p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className={cn("text-base font-black", textPrimary)}>{component.name}</p>
                    <p className={cn("text-sm mt-0.5", textMuted)}>{component.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
                  <Badge className="text-[9px] uppercase tracking-widest">{component.category}</Badge>
                  <Badge className="text-[9px] uppercase tracking-widest">{propsEntries.length} props</Badge>
                  <Badge className="text-[9px] uppercase tracking-widest">complexity {component.complexity}/10</Badge>
                </div>
              </summary>

              <div className="px-4 sm:px-5 pb-5 border-t border-[var(--border)] space-y-4">
                <div className="grid lg:grid-cols-[1fr_auto] gap-4 pt-4">
                  <div>
                    <p className={cn("text-xs font-black uppercase tracking-widest mb-1.5", textMuted)}>Import</p>
                    <code className="block text-xs rounded-lg border border-[var(--border)] bg-[var(--muted)]/40 px-3 py-2 overflow-x-auto">
                      {`import { ${component.name} } from "${component.importPath}";`}
                    </code>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 text-xs"
                    onClick={async () => {
                      await navigator.clipboard.writeText(buildComponentContext(component));
                      setCopiedContextId(component.id);
                      setTimeout(() => setCopiedContextId(null), 1800);
                    }}
                  >
                    {copiedContextId === component.id ? (
                      <><Check className="w-3.5 h-3.5 text-emerald-500" />Context copied</>
                    ) : (
                      <><Copy className="w-3.5 h-3.5" />Copy context for AI</>
                    )}
                  </Button>
                </div>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/20 p-4">
                  <p className={cn("text-xs font-black uppercase tracking-widest mb-2", textMuted)}>Live preview</p>
                  <ComponentPreview component={component} />
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                  <CodeBlock title="Minimal usage" code={component.exampleMinimal} />
                  <CodeBlock title="Full usage" code={component.exampleFull} />
                </div>

                <div className="space-y-2">
                  <p className={cn("text-xs font-black uppercase tracking-widest", textMuted)}>Full props list</p>
                  {propsEntries.length === 0 ? (
                    <p className={cn("text-sm", textMuted)}>No props documented for this component.</p>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                      <table className="w-full text-xs">
                        <thead className="bg-[var(--muted)]/40">
                          <tr>
                            <th className="text-left p-2.5 font-black uppercase tracking-wider">Prop</th>
                            <th className="text-left p-2.5 font-black uppercase tracking-wider">Type</th>
                            <th className="text-left p-2.5 font-black uppercase tracking-wider">Required</th>
                            <th className="text-left p-2.5 font-black uppercase tracking-wider">Default</th>
                            <th className="text-left p-2.5 font-black uppercase tracking-wider">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {propsEntries.map(([propName, schema]) => (
                            <tr key={propName} className="border-t border-[var(--border)] align-top">
                              <td className="p-2.5 font-mono">{propName}</td>
                              <td className="p-2.5 font-mono">{schema.type}</td>
                              <td className="p-2.5">{schema.required ? "Yes" : "No"}</td>
                              <td className="p-2.5 font-mono">{schema.default ?? "—"}</td>
                              <td className="p-2.5">
                                {schema.description}
                                {schema.options && schema.options.length > 0 ? <div className="mt-1 text-[var(--muted-foreground)]">Options: {schema.options.join(", ")}</div> : null}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
};
