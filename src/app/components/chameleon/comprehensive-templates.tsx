/**
 * ════════════════════════════════════════════════════════════════════════════
 * CHAMELEON UI - COMPREHENSIVE TEMPLATE LIBRARY
 * ════════════════════════════════════════════════════════════════════════════
 *
 * 10 Production-Ready Templates for the most common web application patterns.
 * Each template uses actual Chameleon UI components and adapts to all 5 themes.
 *
 * Templates:
 * 1. Landing Page - Hero, features, CTA
 * 2. Blog/Article - Content reading experience
 * 3. Pricing Page - Pricing tiers and comparison
 * 4. Contact/Support - Forms and communication
 * 5. User Profile - Account management
 * 6. Admin Dashboard - Data overview
 * 7. E-commerce Product - Product display and cart
 * 8. Settings Panel - User preferences
 * 9. Authentication - Login/signup flows
 * 10. Documentation - Content organization
 *
 * @version 1.0.0
 */

import React, { useState } from "react";
import {
  ArrowRight,
  Star,
  Check,
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  TrendingUp,
  BarChart3,
  Users,
  DollarSign,
  ShoppingCart,
  Heart,
  Eye,
  Share2,
  MessageCircle,
  Search,
  Filter,
  Grid,
  List,
  Plus,
  Edit,
  Trash2,
  Settings,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Lock,
  Package,
  Zap,
  BookOpen,
  FileText,
  Code,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  ExternalLink,
  Download,
  Upload,
  ChevronRight,
  Clock,
  Tag,
  Award,
  Target,
  Activity,
  Layers,
  Box,
  Percent,
  CreditCard,
  X,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { Button, Input, Badge, Progress, Avatar } from "./atoms";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  StatCard,
  PricingCard,
  Alert,
  Separator,
  Breadcrumb,
  Select,
  Textarea,
} from "./molecules";
import { useThemeClasses, useChameleon } from "./context";
import { cn } from "./utils";

// ═══════════════════════════════════════════════════════════════════════════
// 1. LANDING PAGE TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════

export const LandingPageTemplate: React.FC = () => {
  const { textPrimary, textMuted, cardClass, theme } = useThemeClasses();

  const features = [
    { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed and performance" },
    { icon: Shield, title: "Secure by Default", desc: "Enterprise-grade security built-in" },
    { icon: Layers, title: "Easy Integration", desc: "Works with your existing tools" },
    { icon: Users, title: "Team Collaboration", desc: "Built for teams of all sizes" },
    { icon: BarChart3, title: "Advanced Analytics", desc: "Track everything that matters" },
    { icon: Globe, title: "Global Scale", desc: "Deployed across 50+ countries" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechCorp",
      avatar: "SC",
      text: "This platform transformed how our team works. Highly recommended!",
    },
    {
      name: "Mike Johnson",
      role: "CEO, StartupXYZ",
      avatar: "MJ",
      text: "Best investment we made this year. ROI was immediate.",
    },
    {
      name: "Emma Davis",
      role: "Product Lead, BigCo",
      avatar: "ED",
      text: "Intuitive, powerful, and a joy to use every day.",
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative text-center space-y-8 pt-20 pb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[var(--primary)]/15 to-transparent blur-3xl -z-10 opacity-60" />

        <Badge className="mx-auto">
          <Star className="w-3 h-3 mr-2" />
          Trusted by 50,000+ teams
        </Badge>

        <h1
          className={cn(
            "text-6xl md:text-7xl font-black tracking-tighter max-w-4xl mx-auto leading-[1.1]",
            textPrimary,
          )}
        >
          Build Better Products <span className="text-[var(--primary)]">10x Faster</span>
        </h1>

        <p className={cn("text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed", textMuted)}>
          The all-in-one platform for modern teams. Ship features faster, collaborate better, and
          scale effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            size="lg"
            animated
            className="h-14 px-8 text-lg font-bold group shadow-xl shadow-[var(--primary)]/20"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold">
            Watch Demo
          </Button>
        </div>

        <div className="pt-12">
          <p className={cn("text-sm font-bold uppercase tracking-widest mb-6", textMuted)}>
            Trusted by
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50">
            {["STRIPE", "VERCEL", "LINEAR", "GITHUB", "FIGMA"].map((company) => (
              <div
                key={company}
                className={cn("text-2xl font-black tracking-tighter", textPrimary)}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className={cn("text-4xl md:text-5xl font-black tracking-tight", textPrimary)}>
            Everything You Need
          </h2>
          <p className={cn("text-lg max-w-2xl mx-auto", textMuted)}>
            Powerful features that help you build, launch, and grow your product
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="group hover:border-[var(--primary)]/40 transition-all cursor-default"
              animated
            >
              <CardContent className="p-8 space-y-4">
                <div
                  className={cn(
                    "w-14 h-14 flex items-center justify-center text-[var(--primary)] transition-transform group-hover:scale-110",
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
        </div>
      </section>

      {/* Social Proof */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className={cn("text-4xl md:text-5xl font-black tracking-tight", textPrimary)}>
            Loved by Thousands
          </h2>
          <p className={cn("text-lg max-w-2xl mx-auto", textMuted)}>
            See what our customers have to say
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className={cn("text-sm leading-relaxed", textPrimary)}>"{testimonial.text}"</p>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar fallback={testimonial.avatar} size="md" />
                  <div>
                    <p className={cn("text-sm font-bold", textPrimary)}>{testimonial.name}</p>
                    <p className={cn("text-xs", textMuted)}>{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={cn(
          "text-center space-y-8 p-16 rounded-3xl border border-[var(--border)]",
          theme === "glassy" ? "bg-white/8" : "bg-[var(--muted)]/20",
        )}
      >
        <h2 className={cn("text-4xl md:text-5xl font-black tracking-tight", textPrimary)}>
          Ready to Get Started?
        </h2>
        <p className={cn("text-lg max-w-2xl mx-auto", textMuted)}>
          Join 50,000+ teams already building with our platform
        </p>
        <Button
          size="lg"
          animated
          className="h-14 px-8 text-lg font-bold shadow-xl shadow-[var(--primary)]/20"
        >
          Start Your Free Trial
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <p className={cn("text-sm", textMuted)}>No credit card required • 14-day free trial</p>
      </section>
    </div>
  );
};

// ═══════════════════════════════════════════��═══════════════════════════════
// 2. BLOG/ARTICLE TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════

export const BlogArticleTemplate: React.FC = () => {
  const { textPrimary, textMuted, cardClass } = useThemeClasses();

  const relatedPosts = [
    { title: "Getting Started with React 19", date: "Mar 15, 2026", readTime: "5 min" },
    {
      title: "10 Design Patterns Every Developer Should Know",
      date: "Mar 12, 2026",
      readTime: "8 min",
    },
    { title: "Building Scalable APIs", date: "Mar 10, 2026", readTime: "12 min" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Blog", href: "#" },
          { label: "Development", href: "#" },
          { label: "Building Better UIs" },
        ]}
      />

      {/* Article Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Badge>Development</Badge>
          <Badge>React</Badge>
          <Badge>UI Design</Badge>
        </div>

        <h1
          className={cn(
            "text-5xl md:text-6xl font-black tracking-tight leading-tight",
            textPrimary,
          )}
        >
          Building Better User Interfaces with Modern Tools
        </h1>

        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <Avatar fallback="JD" size="lg" />
            <div>
              <p className={cn("font-bold", textPrimary)}>Jane Doe</p>
              <p className={cn("text-sm", textMuted)}>Senior Engineer</p>
            </div>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="flex items-center gap-4 text-sm">
            <span className={cn("flex items-center gap-1.5", textMuted)}>
              <Calendar className="w-4 h-4" />
              March 20, 2026
            </span>
            <span className={cn("flex items-center gap-1.5", textMuted)}>
              <Clock className="w-4 h-4" />
              10 min read
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline">
            <Heart className="w-4 h-4 mr-2" />
            124
          </Button>
          <Button size="sm" variant="outline">
            <MessageCircle className="w-4 h-4 mr-2" />
            23
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </header>

      {/* Featured Image */}
      <div
        className={cn(
          "aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center",
        )}
      >
        <span className="text-white text-2xl font-bold">Featured Image</span>
      </div>

      {/* Article Content */}
      <article className={cn("prose prose-lg max-w-none", textPrimary)}>
        <p className={cn("text-xl leading-relaxed", textMuted)}>
          In the ever-evolving landscape of web development, creating exceptional user interfaces
          has become both an art and a science. This article explores modern approaches to UI
          development that combine performance, accessibility, and delightful user experiences.
        </p>

        <h2 className={cn("text-3xl font-bold mt-12 mb-4", textPrimary)}>
          The Foundation of Great UI
        </h2>

        <p className={textMuted}>
          Before diving into specific tools and frameworks, it's essential to understand the
          fundamental principles that make interfaces truly great. These include consistency,
          feedback, simplicity, and accessibility.
        </p>

        <Alert variant="info" title="Pro Tip" className="my-6" animated>
          Always start with accessibility in mind. It's much harder to retrofit accessibility than
          to build it in from the start.
        </Alert>

        <h3 className={cn("text-2xl font-bold mt-8 mb-3", textPrimary)}>Key Principles</h3>

        <ul className={cn("space-y-2", textMuted)}>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
            <span>Consistency in design patterns and interactions</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
            <span>Immediate and clear feedback for user actions</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
            <span>Simplicity without sacrificing functionality</span>
          </li>
        </ul>

        <Card className="my-8">
          <CardContent className="p-6 bg-slate-950 text-slate-50 rounded-xl">
            <pre className="text-sm overflow-x-auto">
              <code>{`function Button({ children, variant = 'primary' }) {
  return (
    <button className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
}`}</code>
            </pre>
          </CardContent>
        </Card>

        <h2 className={cn("text-3xl font-bold mt-12 mb-4", textPrimary)}>Modern Tooling</h2>

        <p className={textMuted}>
          The tools we use significantly impact our productivity and the quality of our output. From
          component libraries to design systems, choosing the right stack is crucial.
        </p>
      </article>

      {/* Related Posts */}
      <section className="pt-12 border-t border-[var(--border)]">
        <h3 className={cn("text-2xl font-bold mb-6", textPrimary)}>Related Articles</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedPosts.map((post, i) => (
            <Card
              key={i}
              className="hover:border-[var(--primary)]/40 transition-all cursor-pointer group"
            >
              <CardContent className="p-6 space-y-3">
                <h4
                  className={cn(
                    "font-bold group-hover:text-[var(--primary)] transition-colors",
                    textPrimary,
                  )}
                >
                  {post.title}
                </h4>
                <div className="flex items-center gap-3 text-xs">
                  <span className={textMuted}>{post.date}</span>
                  <span className={cn("w-1 h-1 rounded-full", "bg-[var(--border)]")} />
                  <span className={textMuted}>{post.readTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <Card className="mt-12">
        <CardContent className="p-8 text-center space-y-4">
          <Mail className="w-12 h-12 mx-auto text-[var(--primary)]" />
          <h3 className={cn("text-2xl font-bold", textPrimary)}>Never Miss an Update</h3>
          <p className={textMuted}>Get the latest articles delivered straight to your inbox</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <Input placeholder="your@email.com" type="email" className="flex-1" />
            <Button animated>Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 3. PRICING PAGE TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════

export const PricingPageTemplate: React.FC = () => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      tier: "Starter",
      price: annual ? "$9" : "$12",
      features: ["5 Projects", "10GB Storage", "Basic Support", "Community Access", "Mobile App"],
    },
    {
      tier: "Professional",
      price: annual ? "$29" : "$39",
      recommended: true,
      features: [
        "Unlimited Projects",
        "100GB Storage",
        "Priority Support",
        "Advanced Analytics",
        "Custom Domains",
        "API Access",
        "Team Collaboration",
      ],
    },
    {
      tier: "Enterprise",
      price: "Custom",
      features: [
        "Everything in Pro",
        "Unlimited Storage",
        "Dedicated Support",
        "Custom Integrations",
        "SLA Guarantees",
        "Advanced Security",
        "White Label",
      ],
    },
  ];

  const faqs = [
    { q: "Can I change plans later?", a: "Yes, you can upgrade or downgrade at any time." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards and PayPal." },
    { q: "Is there a free trial?", a: "Yes! All plans come with a 14-day free trial." },
    { q: "Do you offer refunds?", a: "Yes, we offer a 30-day money-back guarantee." },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Header */}
      <section className="text-center space-y-6 pt-12">
        <h1 className={cn("text-5xl md:text-6xl font-black tracking-tight", textPrimary)}>
          Simple, Transparent Pricing
        </h1>
        <p className={cn("text-xl max-w-2xl mx-auto", textMuted)}>
          Choose the perfect plan for your needs. Always know what you'll pay.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <span className={cn("text-sm font-bold", annual ? textMuted : textPrimary)}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={cn(
              "relative w-14 h-8 rounded-full transition-colors",
              annual ? "bg-[var(--primary)]" : "bg-[var(--muted)]",
            )}
          >
            <div
              className={cn(
                "absolute top-1 w-6 h-6 bg-white rounded-full transition-transform shadow-lg",
                annual ? "translate-x-7" : "translate-x-1",
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm font-bold flex items-center gap-2",
              annual ? textPrimary : textMuted,
            )}
          >
            Annual
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
              Save 25%
            </Badge>
          </span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <PricingCard
            key={plan.tier}
            tier={plan.tier}
            price={plan.price}
            features={plan.features}
            recommended={plan.recommended}
            animated
          />
        ))}
      </section>

      {/* Feature Comparison */}
      <section className="max-w-4xl mx-auto space-y-8">
        <h2 className={cn("text-3xl font-bold text-center", textPrimary)}>Feature Comparison</h2>

        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className={cn("text-left p-4 font-bold", textPrimary)}>Feature</th>
                  <th className={cn("text-center p-4 font-bold", textPrimary)}>Starter</th>
                  <th className={cn("text-center p-4 font-bold", textPrimary)}>Pro</th>
                  <th className={cn("text-center p-4 font-bold", textPrimary)}>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Projects", starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
                  { feature: "Storage", starter: "10GB", pro: "100GB", enterprise: "Unlimited" },
                  { feature: "Team Members", starter: "1", pro: "10", enterprise: "Unlimited" },
                  { feature: "Priority Support", starter: false, pro: true, enterprise: true },
                  { feature: "Custom Domain", starter: false, pro: true, enterprise: true },
                  { feature: "API Access", starter: false, pro: true, enterprise: true },
                  { feature: "SLA", starter: false, pro: false, enterprise: true },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[var(--border)] last:border-0">
                    <td className={cn("p-4", textPrimary)}>{row.feature}</td>
                    <td className={cn("p-4 text-center", textMuted)}>
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-rose-500 mx-auto" />
                        )
                      ) : (
                        row.starter
                      )}
                    </td>
                    <td className={cn("p-4 text-center", textMuted)}>
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-rose-500 mx-auto" />
                        )
                      ) : (
                        row.pro
                      )}
                    </td>
                    <td className={cn("p-4 text-center", textMuted)}>
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-rose-500 mx-auto" />
                        )
                      ) : (
                        row.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto space-y-8">
        <h2 className={cn("text-3xl font-bold text-center", textPrimary)}>
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-2">
                <h3 className={cn("font-bold", textPrimary)}>{faq.q}</h3>
                <p className={cn("text-sm", textMuted)}>{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6">
        <h2 className={cn("text-4xl font-black", textPrimary)}>Still have questions?</h2>
        <p className={textMuted}>Our team is here to help you choose the right plan</p>
        <Button size="lg" variant="outline" animated>
          <Mail className="w-5 h-5 mr-2" />
          Contact Sales
        </Button>
      </section>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 4. CONTACT/SUPPORT TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════

export const ContactSupportTemplate: React.FC = () => {
  const { textPrimary, textMuted, cardClass } = useThemeClasses();

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className={cn("text-5xl md:text-6xl font-black tracking-tight", textPrimary)}>
          Get in Touch
        </h1>
        <p className={cn("text-xl max-w-2xl mx-auto", textMuted)}>
          Have a question? We're here to help and answer any questions you might have.
        </p>
      </section>

      {/* Contact Methods */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Mail, title: "Email Us", desc: "support@example.com", action: "Send Email" },
          { icon: Phone, title: "Call Us", desc: "+1 (555) 123-4567", action: "Call Now" },
          { icon: MessageCircle, title: "Live Chat", desc: "Available 24/7", action: "Start Chat" },
        ].map((method, i) => (
          <Card key={i} className="hover:border-[var(--primary)]/40 transition-all text-center">
            <CardContent className="p-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                <method.icon className="w-8 h-8" />
              </div>
              <h3 className={cn("text-xl font-bold", textPrimary)}>{method.title}</h3>
              <p className={textMuted}>{method.desc}</p>
              <Button variant="outline" className="w-full">
                {method.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Contact Form + Info */}
      <section className="grid md:grid-cols-2 gap-12">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={cn("text-sm font-bold", textPrimary)}>First Name</label>
                <Input placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className={cn("text-sm font-bold", textPrimary)}>Last Name</label>
                <Input placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label className={cn("text-sm font-bold", textPrimary)}>Email</label>
              <Input type="email" placeholder="john@example.com" />
            </div>

            <div className="space-y-2">
              <label className={cn("text-sm font-bold", textPrimary)}>Subject</label>
              <Select
                options={[
                  { value: "general", label: "General Inquiry" },
                  { value: "support", label: "Technical Support" },
                  { value: "sales", label: "Sales Question" },
                  { value: "billing", label: "Billing Issue" },
                ]}
                placeholder="Select a topic"
              />
            </div>

            <div className="space-y-2">
              <label className={cn("text-sm font-bold", textPrimary)}>Message</label>
              <Textarea placeholder="Tell us more about your inquiry..." rows={6} />
            </div>

            <Button className="w-full" animated>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <h2 className={cn("text-2xl font-bold mb-6", textPrimary)}>Our Office</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--primary)] mt-0.5" />
                <div>
                  <p className={cn("font-bold", textPrimary)}>Address</p>
                  <p className={cn("text-sm", textMuted)}>
                    123 Business Street
                    <br />
                    San Francisco, CA 94102
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[var(--primary)] mt-0.5" />
                <div>
                  <p className={cn("font-bold", textPrimary)}>Business Hours</p>
                  <p className={cn("text-sm", textMuted)}>
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className={cn("text-xl font-bold mb-4", textPrimary)}>Follow Us</h3>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Facebook, Instagram, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-xl bg-[var(--muted)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <Alert variant="info" animated>
            <p className="text-sm">
              <strong>Response Time:</strong> We typically respond within 24 hours on business days.
            </p>
          </Alert>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className={cn("text-3xl font-bold", textPrimary)}>Common Questions</h2>
          <p className={textMuted}>Quick answers to questions you may have</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "How do I reset my password?",
              a: 'Click on "Forgot Password" on the login page and follow the instructions.',
            },
            {
              q: "Can I cancel my subscription?",
              a: "Yes, you can cancel anytime from your account settings.",
            },
            {
              q: "Do you offer custom enterprise plans?",
              a: "Yes! Contact our sales team for custom pricing.",
            },
            {
              q: "Is my data secure?",
              a: "Absolutely. We use enterprise-grade encryption and security.",
            },
          ].map((faq, i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-2">
                <h4 className={cn("font-bold", textPrimary)}>{faq.q}</h4>
                <p className={cn("text-sm", textMuted)}>{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
