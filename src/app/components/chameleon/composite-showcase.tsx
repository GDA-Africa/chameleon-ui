import React, { useMemo, useState } from "react";
import { Search, Code, Copy, Check, Puzzle } from "lucide-react";
import { Button, Input, Badge } from "./atoms";
import { Alert } from "./molecules";
import { useThemeClasses } from "./context";
import { cn } from "./utils";
import { CopyPageForAIPanel } from "./ai-helpers";
import {
  COMPOSITES_MANIFEST,
  type CompositeManifestEntry,
} from "./composites/ai-manifest";

const COMPOSITE_DOCS_MARKDOWN =
  "# Chameleon UI — Composite Directory\n\nSearch composites, expand for full props/usages, and copy context for AI.";

const CodeBlock = ({ code, title }: { code: string; title: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/30 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)] bg-[var(--muted)]/50">
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">
          {title}
        </p>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(code.trim());
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
          )}
        </button>
      </div>
      <pre className="p-3 text-xs leading-relaxed overflow-x-auto">{code.trim()}</pre>
    </div>
  );
};

interface CompositeDocEntry {
  id: string;
  name: string;
  description: string;
  importPath: string;
  complexity: number;
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
  exampleMinimal: string;
  exampleFull: string;
  keywords: string[];
  useCases: string[];
}

const toCompositeDocEntry = ([key, entry]: [string, CompositeManifestEntry]): CompositeDocEntry => {
  const propEntries = Object.entries(entry.props ?? {}).map(([propName, propSchema]) => [
    propName,
    {
      type: propSchema.type,
      required: Boolean(propSchema.required),
      default: propSchema.default,
      description: propSchema.description ?? "",
      options: undefined,
    },
  ]);

  const examples = entry.examples ?? [];

  return {
    id: key,
    name: entry.name,
    description: entry.description,
    importPath: "./components/chameleon/composites",
    complexity: Object.keys(entry.props ?? {}).length > 8 ? 6 : 4,
    props: Object.fromEntries(propEntries),
    exampleMinimal: examples[0]?.code ?? `<${entry.name} />`,
    exampleFull: examples[1]?.code ?? examples[0]?.code ?? `<${entry.name} />`,
    keywords: [entry.name, entry.category, ...(Object.keys(entry.props ?? {}))].map((k) =>
      k.toLowerCase(),
    ),
    useCases: [entry.category, `${entry.name} reusable section`],
  };
};

const buildCompositeContext = (component: CompositeDocEntry): string => {
  const propsMarkdown = Object.entries(component.props)
    .map(([name, schema]) => {
      const details = [
        `type: ${schema.type}`,
        `required: ${schema.required ? "yes" : "no"}`,
        schema.default ? `default: ${schema.default}` : null,
        schema.options ? `options: ${schema.options.join(", ")}` : null,
      ]
        .filter(Boolean)
        .join(" | ");

      return `- ${name} — ${details} — ${schema.description}`;
    })
    .join("\n");

  return `# ${component.name}\n\n## Props\n${propsMarkdown || "- None"}\n\n## Minimal\n${component.exampleMinimal}\n\n## Full\n${component.exampleFull}`;
};

export const CompositeShowcase: React.FC = () => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [query, setQuery] = useState("");
  const [copiedContextId, setCopiedContextId] = useState<string | null>(null);

  const composites = useMemo(
    () =>
      Object.entries(COMPOSITES_MANIFEST)
        .map(toCompositeDocEntry)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return composites.filter((component) => {
      if (!q) return true;
      return [
        component.id,
        component.name,
        component.description,
        ...component.keywords,
        ...component.useCases,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [composites, query]);

  return (
    <div className="pb-20 space-y-8">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
              <Puzzle className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <Badge className="text-[10px] font-black uppercase tracking-widest">
              Composite Directory
            </Badge>
          </div>
          <CopyPageForAIPanel markdown={COMPOSITE_DOCS_MARKDOWN} />
        </div>

        <h1 className={cn("text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3", textPrimary)}>
          Composite Docs
        </h1>
        <p className={cn("text-base sm:text-lg max-w-3xl leading-relaxed", textMuted)}>
          Explore every composite section with complete prop references, import paths, and minimal
          + full usage examples.
        </p>
      </div>

      <Alert variant="info" animated>
        <div className="space-y-1">
          <p className="font-bold text-sm">Composite-first building blocks</p>
          <p className="text-sm">
            Each composite is documented here with full prop coverage. For primitive controls, use
            the Component Docs page.
          </p>
        </div>
      </Alert>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)]/20 p-4 sm:p-6 space-y-4">
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search composites by name, keyword, use case..."
            className="pl-10"
          />
        </div>
        <p className={cn("text-xs", textMuted)}>
          Showing {filtered.length} of {composites.length} composites.
        </p>
      </div>

      <div className="space-y-3">
        {filtered.map((component) => {
          const propsEntries = Object.entries(component.props);
          return (
            <details
              key={component.id}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--card)]"
            >
              <summary className="list-none cursor-pointer p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] shrink-0">
                    <Puzzle className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className={cn("text-base font-black", textPrimary)}>{component.name}</p>
                    <p className={cn("text-sm mt-0.5", textMuted)}>{component.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
                  <Badge className="text-[9px] uppercase tracking-widest">composite</Badge>
                  <Badge className="text-[9px] uppercase tracking-widest">{propsEntries.length} props</Badge>
                  <Badge className="text-[9px] uppercase tracking-widest">
                    complexity {component.complexity}/10
                  </Badge>
                </div>
              </summary>

              <div className="px-4 sm:px-5 pb-5 border-t border-[var(--border)] space-y-4">
                <div className="grid lg:grid-cols-[1fr_auto] gap-4 pt-4">
                  <div>
                    <p className={cn("text-xs font-black uppercase tracking-widest mb-1.5", textMuted)}>
                      Import
                    </p>
                    <code className="block text-xs rounded-lg border border-[var(--border)] bg-[var(--muted)]/40 px-3 py-2 overflow-x-auto">
                      {`import { ${component.name} } from "${component.importPath}";`}
                    </code>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 text-xs"
                    onClick={async () => {
                      await navigator.clipboard.writeText(buildCompositeContext(component));
                      setCopiedContextId(component.id);
                      setTimeout(() => setCopiedContextId(null), 1800);
                    }}
                  >
                    {copiedContextId === component.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        Context copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy context for AI
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                  <CodeBlock title="Minimal usage" code={component.exampleMinimal} />
                  <CodeBlock title="Full usage" code={component.exampleFull} />
                </div>

                <div className="space-y-2">
                  <p className={cn("text-xs font-black uppercase tracking-widest", textMuted)}>
                    Full props list
                  </p>
                  {propsEntries.length === 0 ? (
                    <p className={cn("text-sm", textMuted)}>
                      No props documented for this composite.
                    </p>
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
                                {schema.options && schema.options.length > 0 ? (
                                  <div className="mt-1 text-[var(--muted-foreground)]">
                                    Options: {schema.options.join(", ")}
                                  </div>
                                ) : null}
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
