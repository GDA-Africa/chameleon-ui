import React, { useState, ReactNode } from "react";
import { Copy, Check, Code, FileText, Eye, BookOpen, Sparkles, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./utils";
import { useThemeClasses, useChameleon } from "./context";
import { Button } from "./atoms";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./molecules";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ComponentExample {
  name: string;
  description: string;
  code: string;
  preview: ReactNode;
  category?: string;
}

export interface ComponentShowcaseProps {
  title: string;
  description: string;
  examples: ComponentExample[];
  documentation?: string; // Markdown documentation
  apiReference?: Array<{
    prop: string;
    type: string;
    default?: string;
    description: string;
  }>;
  usageNotes?: string[];
  relatedComponents?: string[];
}

// ─── Code Block with Syntax Highlighting ──────────────────────────────────────

const CodeBlock: React.FC<{ code: string; language?: string; className?: string }> = ({
  code,
  language = "tsx",
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const { textMuted } = useThemeClasses();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic syntax highlighting for TSX/JSX
  const highlightCode = (code: string) => {
    return (
      code
        // JSX tags
        .replace(/(&lt;\/?)(\w+)([\s\S]*?)(&gt;)/g, (match, open, tag, attrs, close) => {
          return `${open}<span class="text-blue-400">${tag}</span>${attrs}${close}`;
        })
        // Strings
        .replace(
          /(&quot;[^&]*?&quot;|'[^']*?'|`[^`]*?`)/g,
          '<span class="text-green-400">$1</span>',
        )
        // Keywords
        .replace(
          /\b(const|let|var|function|return|import|export|from|default|if|else|switch|case|break|continue|for|while|do|try|catch|finally|throw|async|await|class|extends|implements|interface|type|enum)\b/g,
          '<span class="text-purple-400">$1</span>',
        )
        // Comments
        .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="text-gray-500 italic">$1</span>')
        // Numbers
        .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>')
    );
  };

  const escapedCode = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  return (
    <div className={cn("relative group", className)}>
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <span
          className={cn(
            "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-black/50 text-white",
            textMuted,
          )}
        >
          {language}
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-8 px-2 bg-black/50 hover:bg-black/70 text-white border-none"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 mr-1" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 mr-1" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </Button>
      </div>

      <pre className="bg-slate-950 text-slate-50 p-6 pt-14 rounded-xl overflow-x-auto max-h-[600px] overflow-y-auto border border-white/10 shadow-2xl">
        <code
          className="text-sm leading-relaxed font-mono"
          dangerouslySetInnerHTML={{ __html: highlightCode(escapedCode) }}
        />
      </pre>
    </div>
  );
};

// ─── Markdown Renderer ────────────────────────────────────────────────────────

const MarkdownBlock: React.FC<{ content: string }> = ({ content }) => {
  const { textPrimary, textMuted, cardClass } = useThemeClasses();
  const [copied, setCopied] = useState(false);

  const copyMarkdown = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple markdown to HTML conversion (basic implementation)
  const renderMarkdown = (md: string) => {
    return (
      md
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-6 mb-3">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-10 mb-5">$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        // Code inline
        .replace(
          /`(.*?)`/g,
          '<code class="font-mono bg-[var(--muted)] px-1.5 py-0.5 rounded text-xs">$1</code>',
        )
        // Lists
        .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
        // Line breaks
        .replace(/\n\n/g, '</p><p class="mt-4">')
        // Wrap in paragraphs
        .replace(/^(?!<[h|l|c])(.*$)/gim, "<p>$1</p>")
    );
  };

  return (
    <div className={cn(cardClass, "p-6 relative")}>
      <div className="absolute top-4 right-4">
        <Button size="sm" variant="outline" onClick={copyMarkdown} className="gap-2">
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied!" : "Copy MD"}
        </Button>
      </div>
      <div
        className={cn("prose prose-sm max-w-none", textPrimary)}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />
    </div>
  );
};

// ─── Component Showcase ───────────────────────────────────────────────────────

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
  title,
  description,
  examples,
  documentation,
  apiReference,
  usageNotes,
  relatedComponents,
}) => {
  const [activeExample, setActiveExample] = useState(0);
  const [viewMode, setViewMode] = useState<"preview" | "code" | "both">("both");
  const { textPrimary, textMuted, cardClass, theme } = useThemeClasses();

  const currentExample = examples[activeExample]!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-[var(--primary)]" />
          <h2 className={cn("text-3xl font-black tracking-tight", textPrimary)}>{title}</h2>
        </div>
        <p className={cn("text-base", textMuted)}>{description}</p>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {examples.map((example, i) => (
            <Button
              key={i}
              size="sm"
              variant={activeExample === i ? "primary" : "outline"}
              onClick={() => setActiveExample(i)}
              className="gap-2"
            >
              <Code className="w-3 h-3" />
              {example.name}
            </Button>
          ))}
        </div>

        <div className={cn("flex gap-1 p-1 rounded-xl", "bg-[var(--muted)]")}>
          {[
            { id: "preview", icon: Eye, label: "Preview" },
            { id: "code", icon: Code, label: "Code" },
            { id: "both", icon: BookOpen, label: "Both" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id as any)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                viewMode === mode.id
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                  : cn(textMuted, "hover:text-[var(--foreground)]"),
              )}
            >
              <mode.icon className="w-3 h-3" />
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeExample}-${viewMode}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Example Description */}
          {currentExample.description && (
            <div className={cn(cardClass, "p-4 flex items-start gap-3")}>
              <Info className={cn("w-4 h-4 mt-0.5 shrink-0", textMuted)} />
              <p className={cn("text-sm", textPrimary)}>{currentExample.description}</p>
            </div>
          )}

          {/* Preview & Code Display */}
          {viewMode === "both" && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Preview */}
              <div>
                <p className={cn("text-xs font-black uppercase tracking-widest mb-3", textMuted)}>
                  Live Preview
                </p>
                <div
                  className={cn(
                    cardClass,
                    "p-8 min-h-[300px] flex items-center justify-center",
                    theme === "glassy" ? "relative overflow-hidden" : "",
                  )}
                >
                  {currentExample.preview}
                </div>
              </div>

              {/* Code */}
              <div>
                <p className={cn("text-xs font-black uppercase tracking-widest mb-3", textMuted)}>
                  Source Code
                </p>
                <CodeBlock code={currentExample.code} />
              </div>
            </div>
          )}

          {viewMode === "preview" && (
            <div>
              <p className={cn("text-xs font-black uppercase tracking-widest mb-3", textMuted)}>
                Live Preview
              </p>
              <div
                className={cn(
                  cardClass,
                  "p-12 min-h-[400px] flex items-center justify-center",
                  theme === "glassy" ? "relative overflow-hidden" : "",
                )}
              >
                {currentExample.preview}
              </div>
            </div>
          )}

          {viewMode === "code" && (
            <div>
              <p className={cn("text-xs font-black uppercase tracking-widest mb-3", textMuted)}>
                Source Code
              </p>
              <CodeBlock code={currentExample.code} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Documentation Tabs */}
      {(documentation || apiReference || usageNotes) && (
        <Tabs defaultValue="docs" className="mt-10">
          <TabsList>
            {documentation && <TabsTrigger value="docs">Documentation</TabsTrigger>}
            {apiReference && <TabsTrigger value="api">API Reference</TabsTrigger>}
            {usageNotes && <TabsTrigger value="usage">Usage Notes</TabsTrigger>}
          </TabsList>

          {documentation && (
            <TabsContent value="docs">
              <MarkdownBlock content={documentation} />
            </TabsContent>
          )}

          {apiReference && (
            <TabsContent value="api">
              <div className={cn(cardClass, "overflow-hidden")}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        <th
                          className={cn(
                            "text-left p-4 text-xs font-black uppercase tracking-widest",
                            textMuted,
                          )}
                        >
                          Prop
                        </th>
                        <th
                          className={cn(
                            "text-left p-4 text-xs font-black uppercase tracking-widest",
                            textMuted,
                          )}
                        >
                          Type
                        </th>
                        <th
                          className={cn(
                            "text-left p-4 text-xs font-black uppercase tracking-widest",
                            textMuted,
                          )}
                        >
                          Default
                        </th>
                        <th
                          className={cn(
                            "text-left p-4 text-xs font-black uppercase tracking-widest",
                            textMuted,
                          )}
                        >
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiReference.map((item, i) => (
                        <tr key={i} className="border-b border-[var(--border)] last:border-0">
                          <td className="p-4">
                            <code className="font-mono text-xs font-bold text-[var(--primary)]">
                              {item.prop}
                            </code>
                          </td>
                          <td className="p-4">
                            <code className={cn("font-mono text-xs", textMuted)}>{item.type}</code>
                          </td>
                          <td className="p-4">
                            <code className={cn("font-mono text-xs", textMuted)}>
                              {item.default || "—"}
                            </code>
                          </td>
                          <td className={cn("p-4 text-sm", textPrimary)}>{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          )}

          {usageNotes && (
            <TabsContent value="usage">
              <div className={cn(cardClass, "p-6 space-y-3")}>
                {usageNotes.map((note, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 shrink-0" />
                    <p className={cn("text-sm leading-relaxed", textPrimary)}>{note}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      )}

      {/* Related Components */}
      {relatedComponents && relatedComponents.length > 0 && (
        <div className={cn(cardClass, "p-6")}>
          <h3 className={cn("text-sm font-bold mb-3", textPrimary)}>Related Components</h3>
          <div className="flex flex-wrap gap-2">
            {relatedComponents.map((comp, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-[var(--muted)] text-xs font-bold text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors cursor-pointer"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
