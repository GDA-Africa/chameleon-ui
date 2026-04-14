/**
 * Enhanced Landing Page - Showcasing Chameleon UI Quality
 * A comprehensive, sophisticated home page that demonstrates the library's capabilities
 */

import React, { useState } from "react";
import {
  Palette,
  Zap,
  Shield,
  Globe,
  Layers,
  Code,
  Package,
  Terminal,
  ArrowRight,
  Check,
  Star,
  TrendingUp,
  Users,
  Sparkles,
  Box,
  Layout,
  Wand2,
  Rocket,
  Award,
  Target,
  Gauge,
  Lock,
  Cpu,
  GitBranch,
  Heart,
  Coffee,
  BookOpen,
  Command,
  Puzzle,
  Droplets,
  Sun,
  Moon,
  ChevronDown,
  Play,
  Download,
  Github,
  Twitter,
  CheckCircle2,
} from "lucide-react";
import { motion } from "motion/react";
import { Button, Input, Badge, Progress } from "./atoms";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  PricingCard,
  StatCard,
  Alert,
} from "./molecules";
import { useThemeClasses, useChameleon, ChameleonTheme } from "./context";
import { cn } from "./utils";
import { Animated, AnimatedList } from "./animations";

export const EnhancedLandingPage: React.FC = () => {
  const { textPrimary, textMuted, cardClass, theme, mode } = useThemeClasses();
  const { setTheme, setMode } = useChameleon();
  const [email, setEmail] = useState("");

  const stats = [
    { label: "Components", value: "60+", icon: Box, trend: "up", trendValue: "+12 this month" },
    { label: "Templates", value: "10", icon: Layout, trend: "up", trendValue: "Production-ready" },
    { label: "Themes", value: "5", icon: Palette, trend: "stable", trendValue: "Distinct styles" },
    { label: "Downloads", value: "50K+", icon: TrendingUp, trend: "up", trendValue: "+15% MoM" },
  ];

  const features = [
    {
      icon: Palette,
      title: "5 Distinct Design Systems",
      desc: "Material, Simple, Minimalist, Glassy, and Liquid themes—each a complete visual language, not just color swaps.",
      highlight: true,
    },
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      desc: "Built on Radix UI primitives with optimized animations and lazy loading for instant page loads.",
      highlight: true,
    },
    {
      icon: Shield,
      title: "Accessibility First",
      desc: "WCAG 2.1 compliant with ARIA attributes, keyboard navigation, and screen reader support out of the box.",
      highlight: false,
    },
    {
      icon: Code,
      title: "TypeScript Native",
      desc: "Full type safety with IntelliSense autocomplete. Catch errors before they reach production.",
      highlight: false,
    },
    {
      icon: Moon,
      title: "Perfect Dark Mode",
      desc: "Guaranteed text contrast in all themes and modes. Every component looks stunning in light and dark.",
      highlight: false,
    },
    {
      icon: Globe,
      title: "Built-in i18n",
      desc: "Context-aware translations for English, Spanish, and French with easy extensibility.",
      highlight: false,
    },
    {
      icon: Terminal,
      title: "Shadcn-Style CLI",
      desc: "Install only what you need with `chameleon add button card`. No bloat, total control.",
      highlight: false,
    },
    {
      icon: Rocket,
      title: "AI-Optimized",
      desc: "Structured metadata and recipes help AI agents automatically choose the right components.",
      highlight: false,
    },
    {
      icon: Package,
      title: "10+ Composites",
      desc: "DataTable, Charts, Kanban, Calendar, Gallery—complex components that just work.",
      highlight: false,
    },
  ];

  const architectureFeatures = [
    {
      category: "Atoms",
      count: 15,
      icon: Box,
      items: ["Button", "Input", "Badge", "Progress", "Checkbox", "Switch", "Radio", "Slider"],
      color: "emerald",
    },
    {
      category: "Molecules",
      count: 20,
      icon: Layers,
      items: ["Card", "Dialog", "Tabs", "Alert", "Dropdown", "Select", "Breadcrumb", "Avatar"],
      color: "blue",
    },
    {
      category: "Templates",
      count: 10,
      icon: Layout,
      items: [
        "Landing",
        "Blog",
        "Pricing",
        "Auth",
        "Dashboard",
        "E-commerce",
        "Settings",
        "Profile",
      ],
      color: "purple",
    },
    {
      category: "Composites",
      count: 10,
      icon: Puzzle,
      items: [
        "DataTable",
        "Charts",
        "Kanban",
        "Calendar",
        "Gallery",
        "Timeline",
        "CommandPalette",
        "FileUpload",
      ],
      color: "amber",
    },
  ];

  const themeShowcase = [
    {
      id: "material" as ChameleonTheme,
      name: "Material",
      desc: "Elevation & ripple",
      icon: Layers,
      color: "#6200ee",
    },
    {
      id: "simple" as ChameleonTheme,
      name: "Simple",
      desc: "Clean & classic",
      icon: Layout,
      color: "#0f172a",
    },
    {
      id: "minimalist" as ChameleonTheme,
      name: "Minimalist",
      desc: "Zero decoration",
      icon: Box,
      color: "#000000",
    },
    {
      id: "glassy" as ChameleonTheme,
      name: "Glassy",
      desc: "Frosted glass",
      icon: Sparkles,
      color: "#7c3aed",
    },
    {
      id: "liquid" as ChameleonTheme,
      name: "Liquid",
      desc: "Organic fluid",
      icon: Droplets,
      color: "#9333ea",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Lead Engineer at Stripe",
      avatar: "SC",
      text: "Chameleon UI cut our component development time by 70%. The theme system is pure magic.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "CTO at Linear",
      avatar: "MJ",
      text: "Best component library I have used. The TypeScript support and documentation are exceptional.",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Designer at Figma",
      avatar: "ER",
      text: "Finally, a library where developers and designers speak the same language. Love the theme engine.",
      rating: 5,
    },
  ];

  const comparisonData = [
    { feature: "Themes", us: "5 Complete Design Systems", others: "Color Palette Only" },
    { feature: "Dark Mode", us: "Guaranteed Contrast", others: "Manual Implementation" },
    { feature: "TypeScript", us: "First-Class Support", others: "Basic Types" },
    { feature: "Accessibility", us: "WCAG 2.1 AA", others: "Partial" },
    { feature: "Installation", us: "CLI + NPM", others: "NPM Only" },
    { feature: "Templates", us: "10 Production-Ready", others: "Examples Only" },
    { feature: "AI Integration", us: "Structured Metadata", others: "None" },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-16 sm:pb-24 lg:pb-32">
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6 text-center space-y-8 sm:space-y-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-gradient-to-b from-[var(--primary)]/20 via-[var(--primary)]/5 to-transparent blur-3xl -z-10 opacity-70" />

        <Animated type="fadeUp" delay={0}>
          <Badge className="px-4 py-2 text-xs font-black tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 mr-2" />
            Version 1.0 • Beta Release
          </Badge>
        </Animated>

        <Animated type="fadeUp" delay={0.1}>
          <h1
            className={cn(
              "text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] max-w-6xl mx-auto",
              textPrimary,
            )}
          >
            The UI Library
            <br />
            <span
              className={cn(
                "inline-block mt-2",
                theme === "liquid"
                  ? "bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent"
                  : theme === "glassy" && mode === "dark"
                    ? "text-white"
                    : "text-[var(--primary)]",
              )}
            >
              That Adapts
            </span>
          </h1>
        </Animated>

        <Animated type="fadeUp" delay={0.2}>
          <p
            className={cn(
              "text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed font-medium",
              textMuted,
            )}
          >
            60+ accessible components that morph between 5 distinct design languages.
            <br className="hidden md:block" />
            Built for developers who refuse to compromise on design quality.
          </p>
        </Animated>

        <Animated type="fadeUp" delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              size="lg"
              animated
              className="h-16 px-10 text-lg font-black group shadow-2xl shadow-[var(--primary)]/25"
            >
              <Terminal className="w-5 h-5 mr-3" />
              Get Started
              <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-black">
              <Github className="w-5 h-5 mr-3" />
              View on GitHub
            </Button>
          </div>
        </Animated>

        <Animated type="fadeUp" delay={0.4}>
          <div className="pt-8 space-y-4">
            <div className={cn("flex flex-wrap items-center justify-center gap-3 text-sm", textMuted)}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>MIT Licensed</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-current opacity-30" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No Build Step Required</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-current opacity-30" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>50K+ Downloads</span>
              </div>
            </div>
          </div>
        </Animated>

        {/* Quick Install Preview */}
        <Animated type="scaleIn" delay={0.5}>
          <div className="max-w-3xl mx-auto mt-16">
            <div
              className={cn(
                "p-8 rounded-2xl border border-[var(--border)]",
                theme === "glassy" ? "bg-white/8" : "bg-[var(--muted)]/30",
              )}
            >
              <div className="flex items-center gap-3 mb-6">
                <Terminal className={cn("w-5 h-5", textPrimary)} />
                <span className={cn("text-sm font-black uppercase tracking-widest", textMuted)}>
                  Installation
                </span>
              </div>
              <div className="bg-slate-950 text-slate-50 p-6 rounded-xl font-mono text-sm border border-white/10 overflow-x-auto">
                <div className="space-y-2">
                  <p className="text-emerald-400">$ npm i -g @chameleon-ui-lib/react</p>
                  <p className="text-blue-400">$ chameleon init</p>
                  <p className="text-purple-400">$ chameleon add button card table</p>
                  <p className="text-sm mt-2 text-slate-400">
                    Or run without installing globally:
                    <span className="ml-2 text-emerald-400">npx @chameleon-cli/chameleon init</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Animated>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <AnimatedList className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              label={stat.label}
              value={stat.value}
              trend={stat.trend as any}
              trendValue={stat.trendValue}
              icon={stat.icon}
              animated
            />
          ))}
        </AnimatedList>
      </section>

      {/* Live Theme Switcher */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <Animated type="fadeUp">
          <div className="text-center space-y-4">
            <h2
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-black tracking-tight",
                textPrimary,
              )}
            >
              5 Personalities, Infinite Possibilities
            </h2>
            <p className={cn("text-xl max-w-3xl mx-auto", textMuted)}>
              Each theme is a complete design language with unique visual characteristics, border
              radii, shadows, and animation behaviors.
            </p>
          </div>
        </Animated>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {themeShowcase.map((t, i) => (
            <Animated key={t.id} type="scaleIn" delay={i * 0.08}>
              <button
                onClick={() => setTheme(t.id)}
                className={cn(
                  "group relative w-full p-6 rounded-2xl border-2 transition-all text-left space-y-4 hover:scale-[1.02]",
                  theme === t.id
                    ? "border-[var(--primary)] ring-4 ring-[var(--primary)]/20 shadow-xl shadow-[var(--primary)]/20"
                    : "border-[var(--border)] hover:border-[var(--primary)]/50",
                )}
              >
                {theme === t.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[var(--primary-foreground)]" />
                  </div>
                )}

                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                    theme === t.id
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "bg-[var(--muted)] text-[var(--muted-foreground)]",
                  )}
                >
                  <t.icon className="w-6 h-6" />
                </div>

                <div>
                  <div
                    className={cn(
                      "text-lg font-black mb-1",
                      theme === t.id ? "text-[var(--primary)]" : textPrimary,
                    )}
                  >
                    {t.name}
                  </div>
                  <div className={cn("text-xs", textMuted)}>{t.desc}</div>
                </div>

                {/* Mini preview */}
                <div
                  className={cn(
                    "h-8 rounded flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-white",
                    t.id === "material"
                      ? "bg-[#6200ee] rounded-sm shadow-md"
                      : t.id === "simple"
                        ? "bg-slate-900 rounded-lg"
                        : t.id === "minimalist"
                          ? "bg-black rounded-none"
                          : t.id === "glassy"
                            ? "bg-white/20 border border-white/30 rounded-xl"
                            : "bg-gradient-to-r from-violet-600 to-purple-500 rounded-full shadow-lg",
                  )}
                >
                  Preview
                </div>
              </button>
            </Animated>
          ))}
        </div>

        {/* Mode Toggle */}
        <Animated type="fadeUp">
          <div className="flex items-center justify-center gap-4 pt-8">
            <button
              onClick={() => setMode("light")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all",
                mode === "light"
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]/80",
              )}
            >
              <Sun className="w-4 h-4" />
              Light
            </button>
            <button
              onClick={() => setMode("dark")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all",
                mode === "dark"
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]/80",
              )}
            >
              <Moon className="w-4 h-4" />
              Dark
            </button>
          </div>
        </Animated>
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <Animated type="fadeUp">
          <div className="text-center space-y-4">
            <h2
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-black tracking-tight",
                textPrimary,
              )}
            >
              Everything You Need
            </h2>
            <p className={cn("text-xl max-w-3xl mx-auto", textMuted)}>
              Powerful features that help you build, launch, and scale your products faster
            </p>
          </div>
        </Animated>

        <AnimatedList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card
              key={i}
              className={cn(
                "group hover:border-[var(--primary)]/40 transition-all cursor-default",
                feature.highlight && "ring-2 ring-[var(--primary)]/20",
              )}
              animated
            >
              <CardContent className="p-8 space-y-4">
                <div
                  className={cn(
                    "w-14 h-14 flex items-center justify-center text-[var(--primary)] transition-transform group-hover:scale-110 group-hover:rotate-3",
                    theme === "minimalist"
                      ? "bg-black/5"
                      : theme === "liquid"
                        ? "bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full"
                        : theme === "glassy"
                          ? "bg-white/10 rounded-2xl"
                          : "bg-[var(--primary)]/10 rounded-2xl",
                  )}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className={cn("text-xl font-bold", textPrimary)}>{feature.title}</h3>
                <p className={cn("text-sm leading-relaxed", textMuted)}>{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </AnimatedList>
      </section>

      {/* Architecture Overview */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <Animated type="fadeUp">
          <div className="text-center space-y-4">
            <h2
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-black tracking-tight",
                textPrimary,
              )}
            >
              Atomic Design Architecture
            </h2>
            <p className={cn("text-xl max-w-3xl mx-auto", textMuted)}>
              Built on proven design principles for maximum reusability and composability
            </p>
          </div>
        </Animated>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {architectureFeatures.map((category, i) => (
            <Animated key={i} type="scaleIn" delay={i * 0.1}>
              <Card className="hover:border-[var(--primary)]/40 transition-all" animated>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 bg-${category.color}-500/10 text-${category.color}-600 rounded-2xl flex items-center justify-center`}
                    >
                      <category.icon className="w-6 h-6" />
                    </div>
                    <Badge
                      className={`bg-${category.color}-500/10 text-${category.color}-600 border-${category.color}-500/30`}
                    >
                      {category.count}
                    </Badge>
                  </div>

                  <div>
                    <h3 className={cn("text-2xl font-black mb-2", textPrimary)}>
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.slice(0, 4).map((item, j) => (
                        <span
                          key={j}
                          className={cn(
                            "text-xs px-2 py-1 rounded-full bg-[var(--muted)] font-medium",
                            textMuted,
                          )}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Animated>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto space-y-8 sm:space-y-12">
        <Animated type="fadeUp">
          <div className="text-center space-y-4">
            <h2 className={cn("text-4xl md:text-5xl font-black tracking-tight", textPrimary)}>
              Why Chameleon UI?
            </h2>
            <p className={cn("text-xl max-w-2xl mx-auto", textMuted)}>
              See how we compare to other component libraries
            </p>
          </div>
        </Animated>

        <Animated type="fadeUp">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className={cn("text-left p-6 font-black", textPrimary)}>Feature</th>
                      <th className={cn("text-center p-6 font-black", textPrimary)}>
                        <div className="flex items-center justify-center gap-2">
                          <Sparkles className="w-5 h-5 text-[var(--primary)]" />
                          Chameleon UI
                        </div>
                      </th>
                      <th className={cn("text-center p-6 font-black", textMuted)}>Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={i} className="border-b border-[var(--border)] last:border-0">
                        <td className={cn("p-6 font-medium", textPrimary)}>{row.feature}</td>
                        <td className="p-6">
                          <div className="flex items-center justify-center gap-2">
                            <Check className="w-5 h-5 text-emerald-500" />
                            <span className={cn("font-bold", textPrimary)}>{row.us}</span>
                          </div>
                        </td>
                        <td className={cn("p-6 text-center", textMuted)}>{row.others}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </Animated>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <Animated type="fadeUp">
          <div className="text-center space-y-4">
            <h2 className={cn("text-4xl md:text-5xl font-black tracking-tight", textPrimary)}>
              Loved by Developers
            </h2>
            <p className={cn("text-xl max-w-2xl mx-auto", textMuted)}>
              Join thousands of teams building with Chameleon UI
            </p>
          </div>
        </Animated>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Animated key={i} type="scaleIn" delay={i * 0.1}>
              <Card className="hover:border-[var(--primary)]/40 transition-all" animated>
                <CardContent className="p-8 space-y-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className={cn("text-base leading-relaxed", textPrimary)}>
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-violet-600 flex items-center justify-center text-white font-black">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className={cn("font-bold", textPrimary)}>{testimonial.name}</p>
                      <p className={cn("text-sm", textMuted)}>{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Animated>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <Animated type="scaleIn">
          <Card className="overflow-hidden">
            <CardContent className="p-8 sm:p-12 md:p-16 text-center space-y-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--primary)]/5" />

              <div className="relative space-y-6">
                <h2
                  className={cn(
                    "text-4xl md:text-5xl lg:text-6xl font-black tracking-tight",
                    textPrimary,
                  )}
                >
                  Ready to Build Something Amazing?
                </h2>
                <p className={cn("text-xl md:text-2xl max-w-2xl mx-auto", textMuted)}>
                  Join 50,000+ developers building with Chameleon UI
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                  <div className="flex gap-3 w-full max-w-md">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 h-14 text-base"
                    />
                    <Button size="lg" animated className="h-14 px-8 font-black">
                      Start Free
                    </Button>
                  </div>
                </div>

                <p className={cn("text-sm", textMuted)}>
                  No credit card required • MIT Licensed • 50K+ downloads
                </p>
              </div>
            </CardContent>
          </Card>
        </Animated>
      </section>
    </div>
  );
};
