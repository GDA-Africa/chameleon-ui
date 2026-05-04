// ─── Composites AI Manifest ───────────────────────────────────────────────────
// Machine-readable catalog of all composites for AI agents.
// Every entry documents props, defaults, and usage examples.

export const COMPOSITES_MANIFEST = {
  // ── Landing ──────────────────────────────────────────────────────────────────

  HeroSection: {
    name: "HeroSection",
    category: "landing",
    description: "Full-width hero banner with heading, subheading, CTA button, optional badge, and trust logos.",
    props: {
      heading: { type: "ReactNode", required: false, default: '"Build Better Products"', description: "Main hero heading text or JSX" },
      subheading: { type: "string", required: false, default: '"The all-in-one platform…"', description: "Hero subtitle paragraph" },
      ctaLabel: { type: "string", required: false, default: '"Get Started"', description: "Primary CTA button label" },
      secondaryCtaLabel: { type: "string", required: false, default: '"Learn More"', description: "Secondary CTA button label" },
      onCTAClick: { type: "() => void", required: false, description: "Primary CTA click handler" },
      badge: { type: "string", required: false, description: "Small badge text above heading" },
      trustLogos: { type: "string[]", required: false, description: "Array of company name strings shown below CTA" },
      padding: { type: "'sm' | 'md' | 'lg' | 'xl'", required: false, default: '"xl"' },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<HeroSection heading="Welcome" ctaLabel="Start Free Trial" badge="Now in Beta" />' },
      { theme: "material", code: '<HeroSection heading="Analytics Platform" subheading="Insights at scale." trustLogos={["STRIPE","GITHUB"]} />' },
    ],
  },

  FeatureCards: {
    name: "FeatureCards",
    category: "landing",
    description: "Responsive grid of feature cards with icons, titles, and descriptions.",
    props: {
      heading: { type: "string", required: false, default: '"Everything You Need"' },
      subheading: { type: "string", required: false },
      features: { type: "Feature[]", required: false, description: "Array of { icon?: ElementType, title: string, desc: string }" },
      columns: { type: "2 | 3 | 4", required: false, default: "3" },
      padding: { type: "'sm' | 'md' | 'lg'", required: false, default: '"md"' },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<FeatureCards columns={3} />' },
    ],
  },

  CTASection: {
    name: "CTASection",
    category: "landing",
    description: "Full-width call-to-action section with heading, subheading, and button.",
    props: {
      heading: { type: "string", required: false, default: '"Ready to Get Started?"' },
      subheading: { type: "string", required: false },
      ctaLabel: { type: "string", required: false, default: '"Start Free Trial"' },
      onCTAClick: { type: "() => void", required: false },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<CTASection heading="Join 50,000+ Teams" ctaLabel="Get Started Free" onCTAClick={() => navigate("/signup")} />' },
    ],
  },

  TestimonialCarousel: {
    name: "TestimonialCarousel",
    category: "landing",
    description: "Grid or carousel of customer testimonials with ratings, names, and roles.",
    props: {
      testimonials: { type: "Testimonial[]", required: false, description: "{ name, role, text, avatar?, rating? }[]" },
      columns: { type: "1 | 2 | 3", required: false, default: "3" },
      autoScroll: { type: "boolean", required: false, default: "false" },
      delay: { type: "number", required: false, default: "4000", description: "Auto-scroll delay ms" },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<TestimonialCarousel columns={3} />' },
    ],
  },

  PricingTable: {
    name: "PricingTable",
    category: "landing",
    description: "Pricing tier comparison with feature lists, highlighted tier, and CTA buttons.",
    props: {
      tiers: { type: "PricingTier[]", required: false, description: "{ name, price, features[], highlighted?, cta? }[]" },
      currencySymbol: { type: "string", required: false, default: '"$"' },
      onSelectTier: { type: "(tier: PricingTier) => void", required: false },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<PricingTable onSelectTier={(t) => console.log(t.name)} />' },
    ],
  },

  // ── Dashboard ────────────────────────────────────────────────────────────────

  StatsCard: {
    name: "StatsCard",
    category: "dashboard",
    description: "KPI card with label, value, optional icon, and trend indicator.",
    props: {
      label: { type: "string", required: true },
      value: { type: "string | number", required: true },
      icon: { type: "ReactNode", required: false },
      trend: { type: "number", required: false, description: "Positive/negative percentage for trend indicator" },
      trendLabel: { type: "string", required: false, description: "Text next to trend e.g. 'vs last month'" },
      onClick: { type: "() => void", required: false },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<StatsCard label="Revenue" value="$12,400" trend={8.2} trendLabel="vs last month" />' },
    ],
  },

  BarChartSection: {
    name: "BarChartSection",
    category: "dashboard",
    description: "Recharts bar chart in a Card container with configurable data and colors.",
    props: {
      heading: { type: "string", required: false, default: '"Monthly Overview"' },
      data: { type: "ChartDataPoint[]", required: false, description: "{ label: string, value: number }[]" },
      color: { type: "string", required: false, description: "Hex color for bars; defaults to theme primary" },
      height: { type: "number", required: false, default: "300" },
    },
    examples: [
      { theme: "all", code: '<BarChartSection heading="Sales" data={[{label:"Jan",value:40},{label:"Feb",value:65}]} />' },
    ],
  },

  LineChartSection: {
    name: "LineChartSection",
    category: "dashboard",
    description: "Recharts line chart in a Card container for trend visualization.",
    props: {
      heading: { type: "string", required: false, default: '"Trend Analysis"' },
      data: { type: "ChartDataPoint[]", required: false },
      color: { type: "string", required: false },
      height: { type: "number", required: false, default: "300" },
    },
    examples: [
      { theme: "all", code: '<LineChartSection heading="Growth" data={[{label:"Q1",value:100},{label:"Q2",value:140}]} />' },
    ],
  },

  SideNav: {
    name: "SideNav",
    category: "dashboard",
    description: "Vertical navigation sidebar with active state, badges, and collapsible mode.",
    props: {
      items: { type: "NavItem[]", required: false, description: "{ label, icon?, active?, badge?, href? }[]" },
      activeItem: { type: "string", required: false },
      onSelect: { type: "(item: NavItem) => void", required: false },
      collapsed: { type: "boolean", required: false, default: "false" },
      header: { type: "ReactNode", required: false },
      footer: { type: "ReactNode", required: false },
    },
    examples: [
      { theme: "all", code: '<SideNav items={[{label:"Dashboard",active:true},{label:"Users"}]} onSelect={(item) => navigate(item.href!)} />' },
    ],
  },

  TopBar: {
    name: "TopBar",
    category: "dashboard",
    description: "Application top bar with title, search, notification bell, and action slots.",
    props: {
      title: { type: "string", required: false },
      subtitle: { type: "string", required: false },
      searchPlaceholder: { type: "string", required: false, default: '"Search…"' },
      notifications: { type: "Notification[]", required: false },
      onSearch: { type: "(q: string) => void", required: false },
      actions: { type: "ReactNode", required: false },
      userMenu: { type: "ReactNode", required: false },
    },
    examples: [
      { theme: "all", code: '<TopBar title="My App" onSearch={(q) => setQuery(q)} />' },
    ],
  },

  DataTableComposite: {
    name: "DataTableComposite",
    category: "dashboard",
    description: "Feature-rich data table with sort, filter, and pagination.",
    props: {
      columns: { type: "TableColumn[]", required: false, description: "{ key, header, sortable?, render? }[]" },
      data: { type: "Record<string, unknown>[]", required: false },
      sortable: { type: "boolean", required: false, default: "true" },
      filterable: { type: "boolean", required: false, default: "true" },
      paginated: { type: "boolean", required: false, default: "true" },
      pageSize: { type: "number", required: false, default: "10" },
      heading: { type: "string", required: false },
      emptyMessage: { type: "string", required: false, default: '"No data to display"' },
    },
    examples: [
      { theme: "all", code: '<DataTableComposite columns={[{key:"name",header:"Name"},{key:"email",header:"Email"}]} data={users} heading="Users" />' },
    ],
  },

  // ── Settings ─────────────────────────────────────────────────────────────────

  ProfileSection: {
    name: "ProfileSection",
    category: "settings",
    description: "User profile editor with avatar, name, email, bio, and save button.",
    props: {
      user: { type: "UserProfile", required: false, description: "{ name, email, role?, bio?, avatar? }" },
      onSave: { type: "(user: UserProfile) => void", required: false },
      editable: { type: "boolean", required: false, default: "true" },
      isLoading: { type: "boolean", required: false, default: "false" },
    },
    examples: [
      { theme: "all", code: '<ProfileSection user={{ name: "Jane", email: "jane@example.com" }} onSave={handleSave} />' },
    ],
  },

  SettingsList: {
    name: "SettingsList",
    category: "settings",
    description: "List of toggle settings with labels, descriptions, and on/off state.",
    props: {
      settings: { type: "Setting[]", required: false, description: "{ id, label, description?, enabled }[]" },
      onToggle: { type: "(id: string, enabled: boolean) => void", required: false },
      heading: { type: "string", required: false, default: '"Preferences"' },
    },
    examples: [
      { theme: "all", code: '<SettingsList settings={[{ id: "notif", label: "Notifications", enabled: true }]} onToggle={handleToggle} />' },
    ],
  },

  PreferencePanel: {
    name: "PreferencePanel",
    category: "settings",
    description: "Dropdown-based preferences panel for language, timezone, date format, etc.",
    props: {
      preferences: { type: "Preference[]", required: false },
      onSave: { type: "(prefs: Preference[]) => void", required: false },
      heading: { type: "string", required: false, default: '"Preferences"' },
    },
    examples: [
      { theme: "all", code: '<PreferencePanel onSave={handleSave} />' },
    ],
  },

  DangerZone: {
    name: "DangerZone",
    category: "settings",
    description: "Destructive action area with double-confirm pattern before execution.",
    props: {
      actions: { type: "DangerAction[]", required: false, description: "{ id, label, description, buttonLabel?, variant? }[]" },
      onConfirm: { type: "(actionId: string) => void", required: false },
      heading: { type: "string", required: false, default: '"Danger Zone"' },
    },
    examples: [
      { theme: "all", code: '<DangerZone actions={[{ id: "del", label: "Delete Account", description: "Permanent." }]} onConfirm={handleDelete} />' },
    ],
  },

  // ── E-Commerce ───────────────────────────────────────────────────────────────

  ProductGrid: {
    name: "ProductGrid",
    category: "ecommerce",
    description: "Searchable, responsive grid of product cards with add-to-cart actions.",
    props: {
      products: { type: "Product[]", required: false },
      onProductClick: { type: "(p: Product) => void", required: false },
      onAddToCart: { type: "(p: Product) => void", required: false },
      searchable: { type: "boolean", required: false, default: "true" },
      columns: { type: "2 | 3 | 4", required: false, default: "3" },
      heading: { type: "string", required: false },
    },
    examples: [
      { theme: "all", code: '<ProductGrid products={items} onAddToCart={addToCart} columns={3} />' },
    ],
  },

  ProductCard: {
    name: "ProductCard",
    category: "ecommerce",
    description: "Single product card with image, rating, price, discount badge, and add-to-cart button.",
    props: {
      product: { type: "Product", required: true },
      onAddToCart: { type: "(p: Product) => void", required: false },
      onClick: { type: "(p: Product) => void", required: false },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<ProductCard product={{ id:"1", name:"Widget", price:29 }} onAddToCart={addToCart} />' },
    ],
  },

  CartSummary: {
    name: "CartSummary",
    category: "ecommerce",
    description: "Shopping cart summary with line items, quantity controls, subtotal, tax, total, and checkout button.",
    props: {
      items: { type: "CartItem[]", required: false },
      subtotal: { type: "number", required: false },
      tax: { type: "number", required: false },
      discount: { type: "number", required: false },
      total: { type: "number", required: false },
      onCheckout: { type: "() => void", required: false },
      onUpdateQuantity: { type: "(id: string, qty: number) => void", required: false },
      onRemoveItem: { type: "(id: string) => void", required: false },
    },
    examples: [
      { theme: "all", code: '<CartSummary items={cartItems} onCheckout={() => navigate("/checkout")} />' },
    ],
  },

  CheckoutForm: {
    name: "CheckoutForm",
    category: "ecommerce",
    description: "Multi-section checkout form covering contact, shipping, and payment details.",
    props: {
      onSubmit: { type: "(data: Record<string, string>) => void", required: false },
      countries: { type: "{ label: string, value: string }[]", required: false },
      isLoading: { type: "boolean", required: false, default: "false" },
      total: { type: "number", required: false },
    },
    examples: [
      { theme: "all", code: '<CheckoutForm total={99.99} onSubmit={handleCheckout} />' },
    ],
  },

  OrderConfirmation: {
    name: "OrderConfirmation",
    category: "ecommerce",
    description: "Post-purchase confirmation screen with order summary, estimated delivery, and next-steps CTAs.",
    props: {
      order: { type: "Order", required: false },
      onContinueShopping: { type: "() => void", required: false },
      onViewOrder: { type: "() => void", required: false },
    },
    examples: [
      { theme: "all", code: '<OrderConfirmation order={confirmedOrder} onContinueShopping={() => navigate("/")} />' },
    ],
  },

  // ── Shared ───────────────────────────────────────────────────────────────────

  PageHeader: {
    name: "PageHeader",
    category: "shared",
    description: "Page title with optional subtitle, breadcrumb navigation, and action slot.",
    props: {
      title: { type: "string", required: true },
      subtitle: { type: "string", required: false },
      breadcrumbs: { type: "BreadcrumbItem[]", required: false, description: "{ label, href? }[]" },
      actions: { type: "ReactNode", required: false },
    },
    examples: [
      { theme: "all", code: '<PageHeader title="Users" subtitle="Manage your team" breadcrumbs={[{label:"Home",href:"/"},{label:"Users"}]} actions={<Button>Invite</Button>} />' },
    ],
  },

  EmptyState: {
    name: "EmptyState",
    category: "shared",
    description: "Empty content placeholder with icon, title, description, and optional action button.",
    props: {
      icon: { type: "ReactNode", required: false },
      title: { type: "string", required: false, default: '"Nothing here yet"' },
      description: { type: "string", required: false },
      actionLabel: { type: "string", required: false },
      onAction: { type: "() => void", required: false },
    },
    examples: [
      { theme: "all", code: '<EmptyState title="No results" description="Try a different search term." />' },
    ],
  },

  LoadingState: {
    name: "LoadingState",
    category: "shared",
    description: "Loading placeholder in spinner, skeleton, or animated dots variants.",
    props: {
      label: { type: "string", required: false, default: '"Loading…"' },
      variant: { type: "'spinner' | 'skeleton' | 'dots'", required: false, default: '"spinner"' },
      rows: { type: "number", required: false, default: "3", description: "Number of skeleton rows" },
    },
    examples: [
      { theme: "all", code: '<LoadingState variant="spinner" label="Fetching data…" />' },
      { theme: "all", code: '<LoadingState variant="skeleton" rows={4} />' },
    ],
  },

  ErrorBoundaryComposite: {
    name: "ErrorBoundaryComposite",
    category: "shared",
    description: "Error state display with title, message, and optional retry button.",
    props: {
      title: { type: "string", required: false, default: '"Something went wrong"' },
      message: { type: "string", required: false },
      onRetry: { type: "() => void", required: false },
      icon: { type: "ReactNode", required: false },
    },
    examples: [
      { theme: "all", code: '<ErrorBoundaryComposite message="Failed to load data." onRetry={refetch} />' },
    ],
  },

  ModalComposite: {
    name: "ModalComposite",
    category: "shared",
    description: "Accessible modal dialog with animated backdrop, title, body, footer, and close button.",
    props: {
      isOpen: { type: "boolean", required: false, default: "false" },
      title: { type: "string", required: false },
      children: { type: "ReactNode", required: false },
      footer: { type: "ReactNode", required: false },
      onClose: { type: "() => void", required: false },
      size: { type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", required: false, default: '"md"' },
    },
    examples: [
      { theme: "all", code: '<ModalComposite isOpen={open} title="Confirm Action" onClose={() => setOpen(false)}><p>Are you sure?</p></ModalComposite>' },
    ],
  },

  ToastComposite: {
    name: "ToastComposite",
    category: "shared",
    description: "Animated toast notification with type-based color coding and auto-dismiss.",
    props: {
      message: { type: "string", required: true },
      type: { type: "'success' | 'error' | 'info' | 'warning'", required: false, default: '"info"' },
      title: { type: "string", required: false },
      duration: { type: "number", required: false, default: "4000", description: "Auto-dismiss ms; 0 = no auto-dismiss" },
      onClose: { type: "() => void", required: false },
    },
    examples: [
      { theme: "all", code: '<ToastComposite type="success" title="Saved!" message="Your changes have been saved." />' },
      { theme: "all", code: '<ToastComposite type="error" message="Something went wrong." duration={0} onClose={clearError} />' },
    ],
  },
} as const;

export type CompositeManifestKey = keyof typeof COMPOSITES_MANIFEST;
export type CompositeManifestEntry = (typeof COMPOSITES_MANIFEST)[CompositeManifestKey];
