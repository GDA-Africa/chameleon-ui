/**
 * AI Documentation Page Component
 * Interactive documentation specifically designed for AI agents
 */

import React, { useState } from "react";
import { Bot, Code, Zap, CheckCircle, AlertCircle, Sparkles, Copy, Search } from "lucide-react";
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

export const AIDocsPage: React.FC = () => {
  const { textPrimary, textMuted, cardClass } = useThemeClasses();
  const [searchQuery, setSearchQuery] = useState("");
  const [discoveryResult, setDiscoveryResult] = useState<any>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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
