/**
 * CHAMELEON UI - COMPREHENSIVE TEMPLATES PART 2
 * Templates 5-10
 */

import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Settings,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  ShoppingCart,
  Heart,
  Star,
  Eye,
  Tag,
  Package,
  CreditCard,
  TrendingUp,
  Users,
  BarChart3,
  DollarSign,
  Activity,
  Clock,
  Download,
  Upload,
  FileText,
  BookOpen,
  Code,
  ExternalLink,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Zap,
  Award,
  Target,
  Layers,
  Box,
  Percent,
  Github,
  MessageCircle,
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
  Alert,
  Separator,
  Breadcrumb,
  Select,
  Textarea,
} from "./molecules";
import { useThemeClasses, useChameleon } from "./context";
import { cn } from "./utils";
import { AuthShowcase } from "./auth-showcase";

// ═══════════════════════════════════════════════════════════════════════════
// 5. USER PROFILE TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════

export const UserProfileTemplate: React.FC = () => {
  const { textPrimary, textMuted, cardClass } = useThemeClasses();
  const [activeTab, setActiveTab] = useState("posts");

  const posts = [
    { title: "Building Modern UIs", likes: 234, comments: 45, date: "2 days ago" },
    { title: "React Performance Tips", likes: 567, comments: 89, date: "1 week ago" },
    { title: "Design Systems 101", likes: 432, comments: 67, date: "2 weeks ago" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar size="xl" fallback="JD" className="w-24 h-24" />

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className={cn("text-3xl font-black", textPrimary)}>Jane Doe</h1>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                    <Check className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <p className={cn("text-lg", textMuted)}>Senior Product Designer @ TechCorp</p>
                <p className={cn("text-sm", textMuted)}>San Francisco, CA</p>
              </div>

              <p className={textPrimary}>
                Passionate about building beautiful, accessible interfaces. Love mentoring and
                sharing knowledge with the community. 🎨✨
              </p>

              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Figma", "Design Systems"].map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>

              <div className="flex gap-6">
                <div>
                  <p className={cn("text-2xl font-black", textPrimary)}>1.2K</p>
                  <p className={cn("text-xs", textMuted)}>Followers</p>
                </div>
                <div>
                  <p className={cn("text-2xl font-black", textPrimary)}>432</p>
                  <p className={cn("text-xs", textMuted)}>Following</p>
                </div>
                <div>
                  <p className={cn("text-2xl font-black", textPrimary)}>89</p>
                  <p className={cn("text-xs", textMuted)}>Posts</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button animated>
                  <Plus className="w-4 h-4 mr-2" />
                  Follow
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab as any}>
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {posts.map((post, i) => (
            <Card
              key={i}
              className="hover:border-[var(--primary)]/40 transition-all cursor-pointer"
            >
              <CardContent className="p-6 space-y-4">
                <h3 className={cn("text-xl font-bold", textPrimary)}>{post.title}</h3>
                <div className="flex items-center gap-6 text-sm">
                  <span className={cn("flex items-center gap-2", textMuted)}>
                    <Heart className="w-4 h-4" />
                    {post.likes}
                  </span>
                  <span className={cn("flex items-center gap-2", textMuted)}>
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </span>
                  <span className={textMuted}>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Alert variant="info">Recent activity will appear here</Alert>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className={cn("font-bold mb-2", textPrimary)}>Bio</h4>
                <p className={textMuted}>
                  10+ years of experience in product design and development. Specialized in design
                  systems and accessibility.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className={cn("font-bold mb-2", textPrimary)}>Links</h4>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-[var(--primary)] hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    janedoe.com
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-[var(--primary)] hover:underline"
                  >
                    <Github className="w-4 h-4" />
                    @janedoe
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 6. ADMIN DASHBOARD TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════

export const AdminDashboardTemplate: React.FC = () => {
  const { textPrimary, textMuted } = useThemeClasses();

  const recentOrders = [
    { id: "#3452", customer: "John Smith", amount: "$432.00", status: "completed" },
    { id: "#3451", customer: "Sarah Johnson", amount: "$234.50", status: "pending" },
    { id: "#3450", customer: "Mike Brown", amount: "$567.00", status: "completed" },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={cn("text-3xl sm:text-4xl font-black", textPrimary)}>Dashboard</h1>
          <p className={textMuted}>Welcome back, Admin</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button animated>
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Revenue"
          value="$45.2K"
          trend="up"
          trendValue="+12.5%"
          icon={DollarSign}
          animated
        />
        <StatCard
          label="Active Users"
          value="2,345"
          trend="up"
          trendValue="+8.2%"
          icon={Users}
          animated
        />
        <StatCard
          label="Conversion Rate"
          value="3.24%"
          trend="down"
          trendValue="-0.4%"
          icon={Target}
          animated
        />
        <StatCard
          label="Avg. Order Value"
          value="$124"
          trend="up"
          trendValue="+5.1%"
          icon={ShoppingCart}
          animated
        />
      </div>

      {/* Charts & Tables */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Overview</CardTitle>
              <Select
                options={[
                  { value: "7d", label: "Last 7 days" },
                  { value: "30d", label: "Last 30 days" },
                  { value: "90d", label: "Last 90 days" },
                ]}
                value="30d"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-[var(--muted)]/20 rounded-xl">
              <BarChart3 className="w-12 h-12 text-[var(--muted-foreground)]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Premium Plan", sales: 234, revenue: "$11.7K" },
              { name: "Basic Plan", sales: 456, revenue: "$4.1K" },
              { name: "Enterprise", sales: 89, revenue: "$8.9K" },
            ].map((product, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={cn("font-bold", textPrimary)}>{product.name}</span>
                  <span className={textMuted}>{product.revenue}</span>
                </div>
                <Progress value={(product.sales / 500) * 100} />
                <p className={cn("text-xs", textMuted)}>{product.sales} sales</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className={cn("text-left p-3 font-bold text-sm", textPrimary)}>Order ID</th>
                  <th className={cn("text-left p-3 font-bold text-sm", textPrimary)}>Customer</th>
                  <th className={cn("text-left p-3 font-bold text-sm", textPrimary)}>Amount</th>
                  <th className={cn("text-left p-3 font-bold text-sm", textPrimary)}>Status</th>
                  <th className={cn("text-right p-3 font-bold text-sm", textPrimary)}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[var(--border)] last:border-0">
                    <td className={cn("p-3 font-mono text-sm", textPrimary)}>{order.id}</td>
                    <td className={cn("p-3 text-sm", textPrimary)}>{order.customer}</td>
                    <td className={cn("p-3 font-bold text-sm", textPrimary)}>{order.amount}</td>
                    <td className="p-3">
                      <Badge
                        className={
                          order.status === "completed"
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-600 border-amber-500/30"
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 7. E-COMMERCE PRODUCT TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════

export const EcommerceProductTemplate: React.FC = () => {
  const { textPrimary, textMuted, cardClass } = useThemeClasses();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "#" },
          { label: "Products", href: "#" },
          { label: "Apparel", href: "#" },
          { label: "Premium T-Shirt" },
        ]}
      />

      {/* Product Detail */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
            <Package className="w-24 h-24 text-white" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-[var(--muted)] cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className={cn("text-sm", textMuted)}>(128 reviews)</span>
            </div>
            <h1 className={cn("text-3xl sm:text-4xl font-black mb-2", textPrimary)}>Premium Cotton T-Shirt</h1>
            <p className={cn("text-xl", textMuted)}>Comfortable, stylish, sustainable</p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className={cn("text-4xl font-black", textPrimary)}>$49.99</span>
            <span className={cn("text-xl line-through", textMuted)}>$79.99</span>
            <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/30">38% OFF</Badge>
          </div>

          <Separator />

          <div className="space-y-4">
            <p className={textPrimary}>
              Made from 100% organic cotton, this premium t-shirt combines comfort with
              sustainability. Perfect for everyday wear with a modern fit.
            </p>

            <div className="flex flex-wrap gap-2">
              {["Organic Cotton", "Fair Trade", "Eco-Friendly", "Free Shipping"].map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Size Selection */}
          <div className="space-y-3">
            <label className={cn("font-bold", textPrimary)}>Size</label>
            <div className="flex gap-3">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "w-12 h-12 rounded-lg border-2 font-bold transition-all",
                    selectedSize === size
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "border-[var(--border)] hover:border-[var(--primary)]/40",
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <label className={cn("font-bold", textPrimary)}>Quantity</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className={cn("w-12 text-center font-bold", textPrimary)}>{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                +
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1" size="lg" animated>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          <Alert variant="success" animated>
            <Check className="w-4 h-4 mr-2" />
            In stock and ready to ship
          </Alert>
        </div>
      </div>

      {/* Reviews */}
      <section className="space-y-6">
        <h2 className={cn("text-3xl font-bold", textPrimary)}>Customer Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar fallback="JD" />
                    <div>
                      <p className={cn("font-bold text-sm", textPrimary)}>John Doe</p>
                      <p className={cn("text-xs", textMuted)}>2 days ago</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className={cn("text-sm", textPrimary)}>
                  Amazing quality! The fit is perfect and the fabric feels premium. Highly
                  recommend!
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 8. SETTINGS PANEL TEMPLATE (Comprehensive)
// ═══════════════════════════════════════════════════════════════════════════

export const SettingsPanelTemplate: React.FC = () => {
  const { textPrimary, textMuted } = useThemeClasses();
  const { mode, setMode } = useChameleon();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className={cn("text-3xl sm:text-4xl font-black mb-2", textPrimary)}>Settings</h1>
        <p className={textMuted}>Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar size="xl" fallback="JD" />
                <div className="space-y-2">
                  <Button size="sm">Change Avatar</Button>
                  <p className={cn("text-xs", textMuted)}>JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={cn("text-sm font-bold", textPrimary)}>First Name</label>
                    <Input defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <label className={cn("text-sm font-bold", textPrimary)}>Last Name</label>
                    <Input defaultValue="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={cn("text-sm font-bold", textPrimary)}>Email</label>
                  <Input type="email" defaultValue="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className={cn("text-sm font-bold", textPrimary)}>Bio</label>
                  <Textarea defaultValue="Product designer and developer" />
                </div>
              </div>

              <Button animated>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className={cn("text-sm font-bold", textPrimary)}>Theme</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMode("light")}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all flex items-center gap-3",
                      mode === "light"
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-[var(--border)]",
                    )}
                  >
                    <Sun className="w-5 h-5" />
                    <span className={cn("font-bold", textPrimary)}>Light</span>
                  </button>
                  <button
                    onClick={() => setMode("dark")}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all flex items-center gap-3",
                      mode === "dark"
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-[var(--border)]",
                    )}
                  >
                    <Moon className="w-5 h-5" />
                    <span className={cn("font-bold", textPrimary)}>Dark</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className={cn("text-sm font-bold", textPrimary)}>Current Password</label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <label className={cn("text-sm font-bold", textPrimary)}>New Password</label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <label className={cn("text-sm font-bold", textPrimary)}>Confirm Password</label>
                <Input type="password" />
              </div>
              <Button animated>Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className={cn("font-bold mb-1", textPrimary)}>Authenticator App</p>
                  <p className={cn("text-sm", textMuted)}>Use an authenticator app for 2FA</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
              <Separator />
              <div className="flex items-start justify-between">
                <div>
                  <p className={cn("font-bold mb-1", textPrimary)}>SMS Authentication</p>
                  <p className={cn("text-sm", textMuted)}>Receive codes via SMS</p>
                </div>
                <Button variant="outline">Setup</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Product Updates", desc: "News about product and feature updates" },
                { label: "Weekly Digest", desc: "Weekly summary of activity" },
                { label: "Marketing Emails", desc: "Tips and special offers" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0"
                >
                  <div>
                    <p className={cn("font-bold", textPrimary)}>{item.label}</p>
                    <p className={cn("text-sm", textMuted)}>{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[var(--primary)]"
                    defaultChecked
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--muted)]/20">
                <div>
                  <p className={cn("text-xl font-black", textPrimary)}>Professional Plan</p>
                  <p className={textMuted}>$29/month</p>
                </div>
                <Button variant="outline">Upgrade</Button>
              </div>
              <Progress value={65} label="Usage this month" showValue />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5" />
                  <div>
                    <p className={cn("font-bold", textPrimary)}>•••• •••• •••• 4242</p>
                    <p className={cn("text-sm", textMuted)}>Expires 12/2025</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 9. AUTHENTICATION FLOW TEMPLATE (uses our comprehensive auth components)
// ═══════════════════════════════════════════════════════════════════════════

export const AuthFlowTemplate: React.FC = () => {
  // This references the comprehensive auth components we built earlier
  return (
    <AuthShowcase />
    // <div className="min-h-[600px] flex items-center justify-center p-6">
    //   <div className="max-w-md w-full space-y-4 text-center">
    //     <h2 className="text-2xl font-bold">Authentication Template</h2>
    //     <p className="text-sm text-[var(--muted-foreground)]">
    //       See the <strong>Auth Showcase</strong> page for the complete authentication flow with all
    //       components.
    //     </p>
    //     <Badge>Comprehensive auth components available separately</Badge>
    //   </div>
    // </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 10. DOCUMENTATION TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════

export const DocumentationTemplate: React.FC = () => {
  const { textPrimary, textMuted, cardClass } = useThemeClasses();

  const sections = [
    { id: "getting-started", title: "Getting Started", icon: Zap },
    { id: "installation", title: "Installation", icon: Download },
    { id: "components", title: "Components", icon: Box },
    { id: "theming", title: "Theming", icon: Layers },
    { id: "api-reference", title: "API Reference", icon: Code },
  ];

  return (
    <div className="grid lg:grid-cols-[250px_1fr] gap-8 pb-20">
      {/* Sidebar */}
      <aside className="space-y-6">
        <div className="sticky top-6 space-y-6">
          <div>
            <h3 className={cn("text-sm font-black uppercase tracking-widest mb-3", textMuted)}>
              Documentation
            </h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-colors",
                    "hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                  )}
                >
                  <section.icon className="w-4 h-4" />
                  {section.title}
                </a>
              ))}
            </nav>
          </div>

          <Separator />

          <div>
            <h4 className={cn("text-xs font-black uppercase tracking-widest mb-3", textMuted)}>
              Quick Links
            </h4>
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-[var(--primary)] hover:underline"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-[var(--primary)] hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Examples
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="max-w-4xl space-y-16">
        {/* Getting Started */}
        <section id="getting-started" className="space-y-6">
          <div>
            <h1 className={cn("text-3xl sm:text-5xl font-black mb-3", textPrimary)}>Documentation</h1>
            <p className={cn("text-xl", textMuted)}>Learn how to get started with Chameleon UI</p>
          </div>

          <Alert variant="info" animated>
            <BookOpen className="w-4 h-4 mr-2" />
            This documentation is for version 1.0.8
          </Alert>

          <div className={cn("prose prose-lg max-w-none", textPrimary)}>
            <h2 className={cn("text-3xl font-bold mt-8 mb-4", textPrimary)}>Introduction</h2>
            <p className={textMuted}>
              Chameleon UI is a comprehensive component library that adapts to five distinct design
              themes. Built on top of Radix UI and styled with Tailwind CSS, it provides a complete
              set of accessible, customizable components for modern web applications.
            </p>
          </div>
        </section>

        {/* Installation */}
        <section id="installation" className="space-y-6">
          <h2 className={cn("text-4xl font-black", textPrimary)}>Installation</h2>

          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-950 text-slate-50 p-6 rounded-xl">
                <pre className="text-sm">
                  <code>{`npm install chameleon-ui
# or
yarn add chameleon-ui
# or
pnpm add chameleon-ui`}</code>
                </pre>
              </div>

              <Alert variant="success" animated>
                <Check className="w-4 h-4 mr-2" />
                Installation complete! You can now import components.
              </Alert>
            </CardContent>
          </Card>
        </section>

        {/* Components */}
        <section id="components" className="space-y-6">
          <h2 className={cn("text-4xl font-black", textPrimary)}>Components</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: "Button", category: "Atom", desc: "Interactive button with variants" },
              { name: "Card", category: "Molecule", desc: "Container for content" },
              { name: "Tabs", category: "Molecule", desc: "Tabbed navigation" },
              { name: "Dialog", category: "Molecule", desc: "Modal dialog" },
            ].map((comp) => (
              <Card
                key={comp.name}
                className="hover:border-[var(--primary)]/40 transition-all cursor-pointer"
              >
                <CardContent className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className={cn("text-xl font-bold", textPrimary)}>{comp.name}</h3>
                    <Badge>{comp.category}</Badge>
                  </div>
                  <p className={cn("text-sm", textMuted)}>{comp.desc}</p>
                  <Button variant="ghost" size="sm" className="p-0 text-[var(--primary)]">
                    View docs →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Example Code */}
        <section className="space-y-6">
          <h2 className={cn("text-4xl font-black", textPrimary)}>Example</h2>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="bg-slate-950 text-slate-50 p-6 rounded-xl overflow-x-auto">
                <pre className="text-sm">
                  <code>{`import { Button, Card } from 'chameleon-ui';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}`}</code>
                </pre>
              </div>

              <div className="p-6 rounded-xl bg-[var(--muted)]/20 border border-[var(--border)]">
                <p className={cn("text-sm font-bold mb-4", textPrimary)}>Preview:</p>
                <Card className="max-w-md">
                  <CardHeader>
                    <CardTitle>Hello World</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button>Click me</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-12 border-t border-[var(--border)]">
          <Button variant="outline">← Previous</Button>
          <Button>Next →</Button>
        </div>
      </main>
    </div>
  );
};
