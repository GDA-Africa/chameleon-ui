import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Bell,
  Shield,
  Trash2,
  Globe,
  Monitor,
  CheckCircle2,
  ShoppingCart,
  Star,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  BarChart3,
  Activity,
  ShoppingBag,
  Heart,
  Filter,
  Search,
} from "lucide-react";
import { Button, Input, Badge } from "./atoms";
import { cn } from "./utils";
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
import { useChameleon, useThemeClasses, translations } from "./context";

// Re-export comprehensive templates
export * from "./comprehensive-templates";
export * from "./comprehensive-templates-part2";

// Keep original simple templates for backward compatibility
// ─── Authentication Template ──────────────────────────────────────────────────

export const AuthTemplate = () => {
  const { lang } = useChameleon();
  const { cardClass, buttonPrimary, inputClass, textPrimary, textMuted } = useThemeClasses();
  const t = translations[lang];

  return (
    <div className="flex items-center justify-center min-h-[600px] w-full p-4">
      <div className={cn(cardClass, "w-full max-w-[400px]")}>
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-[var(--primary-foreground)] mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className={cn("text-2xl font-semibold", textPrimary)}>{t.signIn}</h3>
          <p className={cn("text-sm", textMuted)}>{t.loginDesc}</p>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <div className="space-y-2">
            <label className={cn("text-sm font-medium", textPrimary)}>{t.email}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-[var(--muted-foreground)]" />
              <input
                className={cn("pl-10 w-full h-10 px-3 text-sm transition-all", inputClass)}
                placeholder="name@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className={cn("text-sm font-medium", textPrimary)}>{t.password}</label>
              <a href="#" className="text-xs text-[var(--primary)] hover:underline">
                {t.forgotPass}
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-[var(--muted-foreground)]" />
              <input
                type="password"
                className={cn("pl-10 w-full h-10 px-3 text-sm transition-all", inputClass)}
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="accent-[var(--primary)]" />
            <label htmlFor="remember" className={cn("text-xs", textMuted)}>
              {t.rememberMe}
            </label>
          </div>
          <button
            className={cn(
              "w-full py-2.5 px-4 font-bold text-sm transition-all flex items-center justify-center gap-2",
              buttonPrimary,
            )}
          >
            {t.signIn}
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="text-center mt-6">
            <p className={cn("text-xs", textMuted)}>
              {t.noAccount}{" "}
              <a href="#" className="text-[var(--primary)] font-bold hover:underline">
                {t.signUp}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Settings Template ────────────────────────────────────────────────────────

export const SettingsTemplate = () => {
  const { lang, mode, setMode, setLang } = useChameleon();
  const { cardClass, buttonPrimary, textPrimary, textMuted } = useThemeClasses();
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState("appearance");

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-4">
      <div className="flex justify-between items-end border-b border-[var(--border)] pb-6">
        <div>
          <h1 className={cn("text-3xl font-bold tracking-tight", textPrimary)}>{t.settings}</h1>
          <p className={textMuted}>{t.welcome}, Alex</p>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold",
            "border border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Verified Account
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
        <aside className="space-y-1">
          {[
            { id: "general", label: t.general, icon: User },
            { id: "appearance", label: t.appearance, icon: Monitor },
            { id: "notifications", label: t.notifications, icon: Bell },
            { id: "security", label: t.security, icon: Shield },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                activeTab === item.id
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg"
                  : cn(
                      "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
                    ),
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </aside>

        <main className="space-y-6">
          <div className={cn(cardClass, "overflow-hidden")}>
            <div className="p-6 border-b border-[var(--border)]">
              <h3 className={cn("text-lg font-bold", textPrimary)}>{t.appearance}</h3>
              <p className={cn("text-sm mt-0.5", textMuted)}>
                Customize how the interface looks and feels.
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className={cn("text-sm font-medium", textPrimary)}>{t.mode}</label>
                <div className="flex gap-2">
                  <Button
                    variant={mode === "light" ? "primary" : "outline"}
                    className="flex-1"
                    onClick={() => setMode("light")}
                  >
                    {t.light}
                  </Button>
                  <Button
                    variant={mode === "dark" ? "primary" : "outline"}
                    className="flex-1"
                    onClick={() => setMode("dark")}
                  >
                    {t.dark}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className={cn("text-sm font-medium", textPrimary)}>{t.language}</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["en", "es", "fr"] as const).map((l) => (
                    <Button
                      key={l}
                      variant={lang === l ? "primary" : "outline"}
                      onClick={() => setLang(l)}
                      className="uppercase"
                    >
                      {l}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={cn(cardClass, "border-rose-500/20 overflow-hidden")}>
            <div className="p-6 border-b border-rose-500/20">
              <h3 className="text-lg font-bold text-rose-600 flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> {t.dangerZone}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-rose-600/80">{t.confirmDelete}</p>
              <button className="px-4 py-2 rounded-lg border border-rose-500/30 text-rose-600 text-sm font-bold hover:bg-rose-500 hover:text-white transition-colors">
                {t.deleteAccount}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// ─── E-commerce Template ──────────────────────────────────────────────────────

export const EcommerceTemplate = () => {
  const { cardClass, textPrimary, textMuted, buttonPrimary, theme } = useThemeClasses();

  const products = [
    {
      id: 1,
      name: "Premium Headphones",
      price: 299,
      rating: 4.8,
      reviews: 234,
      image: "🎧",
      inStock: true,
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 79,
      rating: 4.5,
      reviews: 892,
      image: "🖱️",
      inStock: true,
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: 159,
      rating: 4.9,
      reviews: 456,
      image: "⌨️",
      inStock: false,
    },
    { id: 4, name: "USB-C Hub", price: 49, rating: 4.6, reviews: 678, image: "🔌", inStock: true },
    {
      id: 5,
      name: "Laptop Stand",
      price: 89,
      rating: 4.7,
      reviews: 321,
      image: "💻",
      inStock: true,
    },
    { id: 6, name: "Desk Lamp", price: 69, rating: 4.4, reviews: 189, image: "💡", inStock: true },
  ];

  return (
    <div className="w-full space-y-8 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className={cn("text-3xl font-bold tracking-tight", textPrimary)}>Shop Electronics</h1>
          <p className={textMuted}>Premium tech accessories for your workspace</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
          <Button className="gap-2">
            <ShoppingCart className="w-4 h-4" /> Cart (3)
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <select
          className={cn(
            "px-4 py-2 text-sm font-medium focus:outline-none",
            theme === "glassy"
              ? "bg-white/10 border border-white/20 rounded-xl text-white"
              : "rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]",
          )}
        >
          <option>Best Selling</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className={cn(cardClass, "group overflow-hidden transition-all hover:shadow-2xl")}
          >
            <div className="aspect-square bg-[var(--muted)]/30 flex items-center justify-center text-7xl relative">
              {product.image}
              {!product.inStock && (
                <span className="absolute top-4 left-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                  Out of Stock
                </span>
              )}
              <button className="absolute top-4 right-4 w-10 h-10 p-0 rounded-full bg-[var(--card)]/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-[var(--border)]">
                <Heart className="w-4 h-4 text-[var(--muted-foreground)]" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="space-y-1">
                <h3 className={cn("font-bold text-base leading-tight", textPrimary)}>
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-[var(--foreground)]">
                      {product.rating}
                    </span>
                  </div>
                  <span className={cn("text-xs", textMuted)}>({product.reviews})</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={cn("text-2xl font-black", textPrimary)}>${product.price}</span>
                <button
                  disabled={!product.inStock}
                  className={cn(
                    "px-3 py-1.5 text-sm font-bold flex items-center gap-1.5 transition-all disabled:opacity-50",
                    buttonPrimary,
                  )}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {product.inStock ? "Add to Cart" : "Sold Out"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[var(--border)]">
        {[
          { icon: Package, value: "2.4K", label: "Products" },
          { icon: Users, value: "48K", label: "Customers" },
          { icon: Star, value: "4.8", label: "Avg Rating" },
        ].map((stat, i) => (
          <div key={i} className={cn(cardClass, "text-center p-6")}>
            <stat.icon className="w-8 h-8 mx-auto mb-2 text-[var(--primary)]" />
            <p className={cn("text-2xl font-black", textPrimary)}>{stat.value}</p>
            <p className={cn("text-xs font-bold", textMuted)}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Analytics Dashboard Template ────────────────────────────────────────────

export const AnalyticsDashboardTemplate = () => {
  const { cardClass, textPrimary, textMuted } = useThemeClasses();

  const metrics = [
    {
      label: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      trend: "up" as const,
      icon: DollarSign,
    },
    { label: "Active Users", value: "12,543", change: "+14.3%", trend: "up" as const, icon: Users },
    {
      label: "Conversion Rate",
      value: "3.24%",
      change: "-2.5%",
      trend: "down" as const,
      icon: Activity,
    },
    {
      label: "Avg. Order Value",
      value: "$156",
      change: "+8.2%",
      trend: "up" as const,
      icon: ShoppingCart,
    },
  ];

  const recentActivity = [
    { user: "Sarah Johnson", action: "Purchased Premium Plan", time: "2 min ago", amount: "$99" },
    { user: "Mike Chen", action: "Upgraded to Pro", time: "5 min ago", amount: "$49" },
    { user: "Emma Wilson", action: "New signup", time: "12 min ago", amount: "$0" },
    { user: "Alex Brown", action: "Purchased Addon", time: "18 min ago", amount: "$29" },
  ];

  const topProducts = [
    { name: "Premium Subscription", sales: 234, revenue: "$23,166", growth: "+18%" },
    { name: "Pro Package", sales: 189, revenue: "$9,261", growth: "+12%" },
    { name: "Addon Bundle", sales: 156, revenue: "$4,524", growth: "+24%" },
    { name: "Enterprise License", sales: 45, revenue: "$22,455", growth: "+31%" },
  ];

  return (
    <div className="w-full space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={cn("text-3xl font-bold tracking-tight", textPrimary)}>
            Analytics Dashboard
          </h1>
          <p className={textMuted}>Real-time insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button className="gap-2">
            <BarChart3 className="w-4 h-4" /> View Report
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className={cn(cardClass, "p-6 space-y-3")}>
            <div className="flex items-start justify-between">
              <div>
                <p className={cn("text-xs font-bold uppercase tracking-widest", textMuted)}>
                  {metric.label}
                </p>
                <p className={cn("text-3xl font-black mt-2", textPrimary)}>{metric.value}</p>
              </div>
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  metric.trend === "up"
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-rose-500/10 text-rose-600",
                )}
              >
                <metric.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {metric.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-600" />
              )}
              <span
                className={cn(
                  "text-sm font-bold",
                  metric.trend === "up" ? "text-emerald-600" : "text-rose-600",
                )}
              >
                {metric.change}
              </span>
              <span className={cn("text-xs", textMuted)}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className={cn(cardClass, "overflow-hidden")}>
          <div className="p-6 border-b border-[var(--border)]">
            <h3 className={cn("font-bold", textPrimary)}>Revenue Overview</h3>
            <p className={cn("text-sm", textMuted)}>Monthly revenue for the last 6 months</p>
          </div>
          <div className="p-6">
            <div className="h-48 flex items-end justify-around gap-2">
              {[45, 62, 58, 73, 69, 84].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-[var(--primary)] hover:opacity-80 transition-opacity"
                    style={{ height: `${height}%`, borderRadius: "4px 4px 0 0" }}
                  />
                  <span className={cn("text-[10px] font-bold", textMuted)}>
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={cn(cardClass, "overflow-hidden")}>
          <div className="p-6 border-b border-[var(--border)]">
            <h3 className={cn("font-bold", textPrimary)}>Top Products</h3>
            <p className={cn("text-sm", textMuted)}>Best performing this month</p>
          </div>
          <div className="p-4 space-y-2">
            {topProducts.map((product, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--muted)]/30 hover:bg-[var(--muted)]/50 transition-colors"
              >
                <div>
                  <p className={cn("font-bold text-sm", textPrimary)}>{product.name}</p>
                  <p className={cn("text-xs", textMuted)}>{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className={cn("font-black text-sm", textPrimary)}>{product.revenue}</p>
                  <p className="text-xs text-emerald-600 font-bold">{product.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={cn(cardClass, "overflow-hidden")}>
        <div className="p-6 border-b border-[var(--border)]">
          <h3 className={cn("font-bold", textPrimary)}>Recent Activity</h3>
          <p className={cn("text-sm", textMuted)}>Latest transactions and user actions</p>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {recentActivity.map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 hover:bg-[var(--muted)]/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center font-black text-sm">
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className={cn("font-bold text-sm", textPrimary)}>{activity.user}</p>
                  <p className={cn("text-xs", textMuted)}>{activity.action}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn("font-black text-sm", textPrimary)}>{activity.amount}</p>
                <p className={cn("text-xs", textMuted)}>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
