import React, { useState } from "react";
import {
  Palette,
  Layers,
  Layout,
  Columns,
  Sparkles,
  Droplets,
  Monitor,
  Package,
  LayoutDashboard,
  BookOpen,
  Zap,
  Settings,
  Github,
  Search,
  Sun,
  Moon,
  ArrowRight,
  Globe,
  ShieldCheck,
  Command,
  Terminal,
  Puzzle,
  MessageCircle,
  Code,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChameleonProvider,
  useChameleon,
  ChameleonTheme,
  translations,
  useThemeClasses,
} from "./components/chameleon/context";
import { Button, Input, Badge, Progress } from "./components/chameleon/atoms";
import { cn } from "./components/chameleon/utils";
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
} from "./components/chameleon/molecules";
import { AuthTemplate, SettingsTemplate } from "./components/chameleon/templates";
import { CLIMockup } from "./components/chameleon/cli";
import { ThemeVisualizer } from "./components/chameleon/theme-visualizer";
import { AnimationPresets, Animated, AnimatedList } from "./components/chameleon/animations";
import { CompositesShowcase } from "./components/chameleon/composites";
import {
  ButtonShowcaseExample,
  AnimationShowcaseExample,
  ProgressShowcaseExample,
} from "./components/chameleon/showcase-examples";
import { AIDocsPage } from "./components/chameleon/ai-docs-page";
import { AuthShowcase } from "./components/chameleon/auth-showcase";
import { TemplateShowcase } from "./components/chameleon/template-showcase";
import { DocumentationPage } from "./components/chameleon/documentation";
import { EnhancedLandingPage } from "./components/chameleon/enhanced-landing";

// ─── Landing Page ─────────────────────────────────────────────────────────────

const LandingPage = () => {
  return <EnhancedLandingPage />;
};

// ─── Components Page ──────────────────────────────────────────────────────────

const ComponentsPage = () => {
  const { textPrimary, textMuted, cardClass, theme } = useThemeClasses();

  return (
    <div className="pb-20 space-y-16">
      {/* Atoms */}
      <section className="space-y-6">
        <div>
          <h2 className={cn("text-3xl font-black tracking-tight", textPrimary)}>Atoms</h2>
          <p className={cn("text-base mt-1", textMuted)}>
            Core building blocks — each morphs to match the active theme
          </p>
        </div>

        <div className="space-y-8">
          {/* Buttons */}
          <div className="space-y-3">
            <h3 className={cn("text-sm font-black uppercase tracking-widest", textMuted)}>
              Buttons
            </h3>
            <div className={cn(cardClass, "p-8 flex flex-wrap gap-4 items-center")}>
              <Button animated>Primary</Button>
              <Button variant="secondary" animated>
                Secondary
              </Button>
              <Button variant="outline" animated>
                Outline
              </Button>
              <Button variant="ghost" animated>
                Ghost
              </Button>
              <Button size="sm" animated>
                Small
              </Button>
              <Button size="lg" animated>
                Large Scale
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-3">
            <h3 className={cn("text-sm font-black uppercase tracking-widest", textMuted)}>
              Badges
            </h3>
            <div className={cn(cardClass, "p-8 flex flex-wrap gap-3 items-center")}>
              <Badge>Default</Badge>
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                Success
              </Badge>
              <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30">Warning</Badge>
              <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/30">Error</Badge>
              <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/30">Info</Badge>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <h3 className={cn("text-sm font-black uppercase tracking-widest", textMuted)}>
              Progress
            </h3>
            <div className={cn(cardClass, "p-8 space-y-4 max-w-md")}>
              <Progress value={72} label="Storage" showValue animated />
              <Progress value={45} label="Memory" showValue animated />
              <Progress value={91} label="CPU" showValue animated />
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-3">
            <h3 className={cn("text-sm font-black uppercase tracking-widest", textMuted)}>
              Inputs
            </h3>
            <div className={cn(cardClass, "p-8 space-y-4 max-w-xl")}>
              <Input placeholder="Search your project..." />
              <div className="flex gap-4">
                <Input type="email" placeholder="Email address" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="space-y-3">
            <h3 className={cn("text-sm font-black uppercase tracking-widest", textMuted)}>
              Alerts
            </h3>
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
          </div>
        </div>
      </section>

      {/* Molecules */}
      <section className="space-y-6">
        <div>
          <h2 className={cn("text-3xl font-black tracking-tight", textPrimary)}>Molecules</h2>
          <p className={cn("text-base mt-1", textMuted)}>Composed components built from atoms</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PricingCard
            tier="Professional"
            price="$49"
            recommended
            animated
            features={[
              "Unlimited Projects",
              "Custom Theming",
              "Team Collaboration",
              "Priority Support",
            ]}
          />
          <StatCard label="Active Users" value="1.2M" trend="up" trendValue="+14%" animated />
          <StatCard label="Response Time" value="42ms" trend="down" trendValue="-8%" animated />
        </div>

        {/* Dialog demo */}
        <div className={cn(cardClass, "p-8 flex flex-col items-center gap-4")}>
          <p className={cn("text-sm", textMuted)}>Dialog / Modal component</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button animated>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <div className="space-y-4">
                <h2 className={cn("text-xl font-bold", "text-[var(--card-foreground)]")}>
                  Dialog Title
                </h2>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                  This dialog adapts beautifully to every theme. Notice how the Glassy theme gives
                  it a frosted glass look, while Minimalist strips it down to pure typography.
                </p>
                <div className="flex gap-3 pt-2">
                  <Button className="flex-1" animated>
                    Confirm
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Templates */}
      <section className="space-y-6">
        <div>
          <h2 className={cn("text-3xl font-black tracking-tight", textPrimary)}>
            Layout Templates
          </h2>
          <p className={cn("text-base mt-1", textMuted)}>
            Production-ready page layouts, fully themed and localized
          </p>
        </div>
        <Tabs defaultValue="auth">
          <TabsList className="mb-8">
            <TabsTrigger value="auth">Authentication</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent
            value="auth"
            className={cn(
              "rounded-3xl border border-dashed border-[var(--border)] flex items-center justify-center p-4",
              theme === "glassy" ? "bg-white/5 backdrop-blur-sm" : "bg-[var(--muted)]/20",
            )}
          >
            <AuthTemplate />
          </TabsContent>
          <TabsContent
            value="settings"
            className={cn(
              "rounded-3xl border border-dashed border-[var(--border)] p-4",
              theme === "glassy" ? "bg-white/5 backdrop-blur-sm" : "bg-[var(--muted)]/20",
            )}
          >
            <SettingsTemplate />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

// ─── Templates Page ───────────────────────────────────────────────────────────

const TemplatesPage = () => {
  return <TemplateShowcase />;
};

// ─── Showcase Page ──────────────────────────────────────────────────────────

const ShowcasePage = () => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [activeComponent, setActiveComponent] = useState<"button" | "animation" | "progress">(
    "button",
  );

  return (
    <div className="pb-20 space-y-8">
      <div>
        <h1 className={cn("text-5xl font-black tracking-tight mb-2", textPrimary)}>
          Component Documentation
        </h1>
        <p className={cn("text-xl", textMuted)}>
          Interactive examples with live code, API references, and AI-friendly documentation
        </p>
      </div>

      {/* Component Selector */}
      <div className="flex gap-3 flex-wrap">
        {[
          { id: "button", label: "Button" },
          { id: "animation", label: "Animations" },
          { id: "progress", label: "Progress" },
        ].map((comp) => (
          <Button
            key={comp.id}
            size="sm"
            variant={activeComponent === comp.id ? "primary" : "outline"}
            onClick={() => setActiveComponent(comp.id as any)}
          >
            {comp.label}
          </Button>
        ))}
      </div>

      {/* Showcase Content */}
      <div>
        {activeComponent === "button" && <ButtonShowcaseExample />}
        {activeComponent === "animation" && <AnimationShowcaseExample />}
        {activeComponent === "progress" && <ProgressShowcaseExample />}
      </div>
    </div>
  );
};

// ─── Docs Page ────────────────────────────────────────────────────────────────

const DocsPage = () => {
  return <DocumentationPage />;
};

// ─── Workshop Shell ────────────────────────────────────────────────────────────

type Page =
  | "landing"
  | "components"
  | "docs"
  | "visualizer"
  | "animations"
  | "templates"
  | "composites"
  | "showcase"
  | "auth";

function Workshop() {
  const {
    theme,
    setTheme,
    mode,
    setMode,
    lang,
    setLang,
    glassyIntensity,
    setGlassyIntensity,
    liquidIntensity,
    setLiquidIntensity,
  } = useChameleon();
  const { cardClass, textPrimary, textMuted, theme: currentTheme } = useThemeClasses();
  const [activePage, setActivePage] = useState<Page>("landing");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const t = translations[lang];

  const themes: { id: ChameleonTheme; label: string; icon: any; desc: string }[] = [
    { id: "simple", label: "Simple", icon: Layout, desc: "Clean & classic" },
    { id: "material", label: "Material", icon: Layers, desc: "Elevated" },
    { id: "minimalist", label: "Minimalist", icon: Columns, desc: "Zero decoration" },
    { id: "glassy", label: "Glassy", icon: Sparkles, desc: "Frosted glass" },
    { id: "liquid", label: "Liquid", icon: Droplets, desc: "Organic fluid" },
  ];

  const sidebarLinks: { id: Page; label: string; icon: any; badge?: string }[] = [
    { id: "landing", label: "Home", icon: Monitor },
    { id: "components", label: "Components", icon: Package },
    { id: "showcase", label: "Component Docs", icon: Code, badge: "NEW" },
    { id: "composites", label: "Composites", icon: Puzzle, badge: "10" },
    { id: "templates", label: "Templates", icon: LayoutDashboard },
    { id: "visualizer", label: "Visualizer", icon: Palette },
    { id: "animations", label: "Animations", icon: Zap },
    { id: "docs", label: "Documentation", icon: BookOpen },
    { id: "auth", label: "Auth Showcase", icon: ShieldCheck },
  ];

  // Theme-specific sidebar styles
  const sidebarBg = {
    material:
      mode === "dark"
        ? "bg-[#1e1e1e] border-r border-[#333333]"
        : "bg-white border-r border-gray-200",
    simple:
      mode === "dark"
        ? "bg-[#0f172a] border-r border-[#1e293b]"
        : "bg-white border-r border-gray-100",
    minimalist:
      mode === "dark" ? "bg-black border-r border-[#262626]" : "bg-white border-r border-black",
    glassy: "bg-[#0d0a1a]/85 border-r border-white/15",
    liquid:
      mode === "dark"
        ? "bg-[rgba(30,20,60,0.8)] border-r border-[rgba(167,139,250,0.2)]"
        : "bg-white/95 border-r border-purple-100",
  }[theme];

  const mainBg = {
    material: mode === "dark" ? "bg-[#121212]" : "bg-gray-50",
    simple: mode === "dark" ? "bg-[#020617]" : "bg-white",
    minimalist: mode === "dark" ? "bg-black" : "bg-white",
    glassy: "bg-transparent",
    liquid: "bg-transparent",
  }[theme];

  return (
    <div
      className={cn(
        "flex min-h-screen transition-all duration-700 ease-in-out",
        mainBg,
        textPrimary,
      )}
    >
      {/* Sidebar */}
      <aside
        className={cn(
          "w-72 flex flex-col fixed h-screen z-50 overflow-hidden transition-all duration-500",
          sidebarBg,
        )}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-[var(--border)]">
          <motion.div
            className="w-10 h-10 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] shadow-xl shadow-[var(--primary)]/20"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Palette className="w-5 h-5" />
          </motion.div>
          <div>
            <h1 className={cn("font-black text-base tracking-tight leading-none", textPrimary)}>
              Chameleon
            </h1>
            <p className={cn("text-[10px] font-bold tracking-widest uppercase mt-0.5", textMuted)}>
              Workshop Pro
            </p>
          </div>
        </div>

        <div className="flex-1 px-3 py-4 space-y-8 overflow-y-auto">
          {/* Navigation */}
          <div>
            <p
              className={cn(
                "text-[10px] font-black uppercase tracking-widest px-3 mb-2",
                textMuted,
              )}
            >
              Navigation
            </p>
            <div className="space-y-0.5">
              {sidebarLinks.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  whileHover={{ x: theme === "minimalist" ? 4 : 2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold transition-colors",
                    theme === "minimalist" ? "rounded-none" : "rounded-xl",
                    activePage === link.id
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg shadow-[var(--primary)]/20"
                      : cn("hover:bg-[var(--muted)]", textMuted, "hover:text-[var(--foreground)]"),
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </div>
                  {link.badge && (
                    <span
                      className={cn(
                        "text-[9px] font-black px-1.5 py-0.5 rounded-full",
                        activePage === link.id
                          ? "bg-white/20 text-white"
                          : "bg-[var(--primary)]/10 text-[var(--primary)]",
                      )}
                    >
                      {link.badge}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Theme Presets */}
          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <p className={cn("text-[10px] font-black uppercase tracking-widest", textMuted)}>
                Theme
              </p>
              <span className="text-[9px] font-black bg-[var(--primary)]/10 text-[var(--primary)] px-1.5 py-0.5 rounded-full">
                5 Skins
              </span>
            </div>
            <div className="space-y-0.5">
              {themes.map((t) => (
                <motion.button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold transition-all",
                    theme === "minimalist" ? "rounded-none" : "rounded-xl",
                    theme === t.id
                      ? cn(
                          "ring-1 ring-[var(--border)] shadow-sm",
                          "bg-[var(--muted)] text-[var(--foreground)]",
                        )
                      : cn(textMuted, "hover:bg-[var(--muted)]/50"),
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <t.icon
                      className={cn(
                        "w-3.5 h-3.5",
                        theme === t.id ? "text-[var(--primary)]" : "opacity-50",
                      )}
                    />
                    <span>{t.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-[9px]", textMuted)}>{t.desc}</span>
                    {theme === t.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Config */}
          <div>
            <p
              className={cn(
                "text-[10px] font-black uppercase tracking-widest px-3 mb-3",
                textMuted,
              )}
            >
              Config
            </p>
            <div className="space-y-4 px-3">
              <div className="space-y-2">
                <label className={cn("text-[10px] font-black uppercase tracking-wider", textMuted)}>
                  Appearance
                </label>
                <div className={cn("grid grid-cols-2 gap-1.5 p-1 rounded-xl", "bg-[var(--muted)]")}>
                  {(["light", "dark"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={cn(
                        "flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all",
                        mode === m
                          ? "bg-[var(--card)] text-[var(--card-foreground)] shadow-sm"
                          : textMuted,
                      )}
                    >
                      {m === "light" ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className={cn("text-[10px] font-black uppercase tracking-wider", textMuted)}>
                  Language
                </label>
                <div className="flex gap-1">
                  {(["en", "es", "fr"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={cn(
                        "flex-1 py-1.5 text-[10px] font-black uppercase transition-all",
                        theme === "minimalist" ? "rounded-none" : "rounded-lg",
                        lang === l
                          ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg"
                          : cn("bg-[var(--muted)]", textMuted, "hover:text-[var(--foreground)]"),
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Intensity Controls */}
              {theme === "glassy" && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label
                      className={cn("text-[10px] font-black uppercase tracking-wider", textMuted)}
                    >
                      Glassy Intensity
                    </label>
                    <span className={cn("text-[10px] font-black", textPrimary)}>
                      {glassyIntensity}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={glassyIntensity}
                    onChange={(e) => setGlassyIntensity(Number(e.target.value))}
                    className="w-full h-1.5 bg-[var(--muted)] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--primary)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--primary)] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  />
                  <p className={cn("text-[9px] leading-tight", textMuted)}>
                    Controls blur intensity and orb opacity
                  </p>
                </div>
              )}

              {theme === "liquid" && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label
                      className={cn("text-[10px] font-black uppercase tracking-wider", textMuted)}
                    >
                      Liquid Intensity
                    </label>
                    <span className={cn("text-[10px] font-black", textPrimary)}>
                      {liquidIntensity}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={liquidIntensity}
                    onChange={(e) => setLiquidIntensity(Number(e.target.value))}
                    className="w-full h-1.5 bg-[var(--muted)] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--primary)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--primary)] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  />
                  <p className={cn("text-[9px] leading-tight", textMuted)}>
                    Controls blob size and animation speed
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User */}
        <div className="p-4 border-t border-[var(--border)]">
          <div
            className={cn(
              "flex items-center gap-3 p-3 rounded-2xl border border-[var(--border)]",
              theme === "glassy" ? "bg-white/5" : "bg-[var(--muted)]/40",
            )}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--primary)] to-violet-600 flex items-center justify-center text-white font-black text-xs shadow-xl">
              AC
            </div>
            <div className="overflow-hidden">
              <p className={cn("text-xs font-black truncate", textPrimary)}>Alex Chameleon</p>
              <p className={cn("text-[10px] font-bold", textMuted)}>Enterprise</p>
            </div>
            <Settings
              className={cn(
                "w-3.5 h-3.5 ml-auto cursor-pointer hover:text-[var(--primary)] transition-colors",
                textMuted,
              )}
            />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-72 min-h-screen">
        {/* Header */}
        <header
          className={cn(
            "h-16 border-b border-[var(--border)] flex items-center justify-between px-8 sticky top-0 z-40",
            theme === "glassy"
              ? "bg-[#0d0a1a]/90"
              : theme === "liquid"
                ? mode === "dark"
                  ? "bg-[#030014]/90"
                  : "bg-[#f5f0ff]/90"
                : "bg-[var(--card)]/95",
          )}
        >
          <div className="flex items-center gap-3">
            {(() => {
              const link = sidebarLinks.find((l) => l.id === activePage);
              return link ? (
                <>
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--muted-foreground)]">
                    <link.icon className="w-4 h-4" />
                    <span className="text-[var(--foreground)]">{link.label}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-[var(--border)]" />
                </>
              ) : null;
            })()}
            <span
              className={cn(
                "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full",
                "bg-[var(--primary)]/10 text-[var(--primary)]",
              )}
            >
              {theme.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input
                placeholder="Search..."
                className={cn(
                  "h-9 pl-9 pr-4 text-xs font-medium w-56 focus:outline-none transition-all",
                  theme === "glassy"
                    ? "bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:bg-white/15"
                    : "bg-[var(--muted)] rounded-full text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:ring-2 focus:ring-[var(--primary)]/20",
                )}
              />
            </div>
            <Button size="icon" variant="ghost" className="rounded-full w-9 h-9">
              <Github className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-rose-500 shadow-lg" />
          </div>
        </header>

        {/* Content */}
        <div className="px-10 max-w-7xl mx-auto py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
            >
              {activePage === "landing" && <LandingPage />}
              {activePage === "components" && <ComponentsPage />}
              {activePage === "showcase" && <ShowcasePage />}
              {activePage === "composites" && <CompositesShowcase />}
              {activePage === "docs" && <DocsPage />}
              {activePage === "visualizer" && <ThemeVisualizer />}
              {activePage === "animations" && <AnimationPresets currentTheme={theme} />}
              {activePage === "templates" && <TemplatesPage />}
              {activePage === "auth" && <AuthShowcase />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer
          className={cn(
            "border-t border-[var(--border)] py-16 mt-10",
            theme === "glassy" ? "bg-[#0d0a1a]/60" : "bg-[var(--muted)]/10",
          )}
        >
          <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)]">
                  <Palette className="w-4 h-4" />
                </div>
                <span className={cn("font-black text-xl tracking-tighter", textPrimary)}>
                  Chameleon
                </span>
              </div>
              <p className={cn("max-w-xs leading-relaxed text-sm font-medium", textMuted)}>
                The future of polymorphic user interfaces. Built for developers who refuse to
                compromise on design.
              </p>
            </div>
            {[
              { title: "Product", items: ["Components", "Composites", "Templates", "CLI Tool"] },
              { title: "Company", items: ["About", "Blog", "Careers", "Privacy"] },
            ].map((col) => (
              <div key={col.title} className="space-y-3">
                <h4 className={cn("text-xs font-black uppercase tracking-widest", textPrimary)}>
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "text-sm font-bold hover:text-[var(--primary)] cursor-pointer transition-colors",
                        textMuted,
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="max-w-7xl mx-auto px-10 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[var(--border)] mt-10">
            <p
              className={cn("text-xs font-bold uppercase tracking-widest opacity-50", textPrimary)}
            >
              © 2026 Chameleon UI. All rights reserved.
            </p>
            <div className="flex gap-6 opacity-40">
              <Github className={cn("w-4 h-4", textPrimary)} />
              <Zap className={cn("w-4 h-4", textPrimary)} />
              <Globe className={cn("w-4 h-4", textPrimary)} />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ChameleonProvider>
      <Workshop />
    </ChameleonProvider>
  );
}
