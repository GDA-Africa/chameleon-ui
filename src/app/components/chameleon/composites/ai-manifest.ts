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

  ThemeChart: {
    name: "ThemeChart",
    category: "dashboard",
    description: "Theme-aware chart wrapper supporting line/bar/area/pie/donut/radar/scatter visualizations.",
    props: {
      type: { type: "'line' | 'bar' | 'area' | 'pie' | 'donut' | 'radar' | 'scatter'", required: true },
      data: { type: "ChartDataPoint[]", required: true, description: "Array of chart rows, each with a `name` and one or more numeric series keys" },
      series: { type: "{ key: string; label: string }[]", required: false, default: "[{ key: 'value', label: 'Value' }]" },
      title: { type: "string", required: false },
      height: { type: "number", required: false, default: "280" },
      animated: { type: "boolean", required: false, default: "true" },
      showGrid: { type: "boolean", required: false, default: "true" },
      showLegend: { type: "boolean", required: false, default: "false" },
    },
    examples: [
      { theme: "all", code: '<ThemeChart type="line" data={[{ name: "Jan", value: 30 }, { name: "Feb", value: 52 }]} />' },
      { theme: "all", code: '<ThemeChart type="bar" title="Revenue" data={monthlyData} series={[{ key: "revenue", label: "Revenue" }, { key: "cost", label: "Cost" }]} showLegend />' },
    ],
  },

  CommandPalette: {
    name: "CommandPalette",
    category: "shared",
    description: "Searchable keyboard-first command menu with grouped actions and shortcuts.",
    props: {
      items: { type: "{ id: string; label: string; description?: string; icon?: ElementType; group?: string; action?: () => void; shortcut?: string }[]", required: true },
      open: { type: "boolean", required: true },
      onClose: { type: "() => void", required: true },
      placeholder: { type: "string", required: false, default: "'Type a command or search...'" },
    },
    examples: [
      { theme: "all", code: '<CommandPalette items={commands} open={open} onClose={() => setOpen(false)} />' },
    ],
  },

  KanbanBoard: {
    name: "KanbanBoard",
    category: "dashboard",
    description: "Drag-and-drop board with customizable columns and cards for workflow management.",
    props: {
      initialColumns: { type: "{ id: string; title: string; color?: string; cards: { id: string; title: string; description?: string; tags?: string[]; priority?: 'low' | 'medium' | 'high'; assignee?: string }[] }[]", required: false },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<KanbanBoard />' },
      { theme: "all", code: '<KanbanBoard initialColumns={projectColumns} animated={false} />' },
    ],
  },

  Timeline: {
    name: "Timeline",
    category: "shared",
    description: "Vertical timeline component for events/milestones with status and optional icons.",
    props: {
      events: { type: "{ id: string; title: string; description?: string; date: string; icon?: ElementType; status?: 'completed' | 'current' | 'pending'; color?: string }[]", required: true },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<Timeline events={[{ id: "1", title: "Kickoff", date: "2026-05-04", status: "completed" }]} />' },
    ],
  },

  FileUploader: {
    name: "FileUploader",
    category: "shared",
    description: "Drag-and-drop uploader with progress simulation, type filtering, and size constraints.",
    props: {
      onUpload: { type: "(files: File[]) => void", required: false },
      accept: { type: "string", required: false, default: "'*'" },
      multiple: { type: "boolean", required: false, default: "true" },
      maxSizeMB: { type: "number", required: false, default: "10" },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<FileUploader accept=".pdf,.png,.jpg" maxSizeMB={25} onUpload={(files) => console.log(files)} />' },
    ],
  },

  NotificationFeed: {
    name: "NotificationFeed",
    category: "shared",
    description: "Notification inbox with unread state, mark-all-read, and per-item dismiss actions.",
    props: {
      notifications: { type: "{ id: string; title: string; description?: string; time: string; read: boolean; type: 'info' | 'success' | 'warning' | 'error' | 'message'; avatar?: string; avatarFallback?: string; action?: { label: string; onClick: () => void } }[]", required: false },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<NotificationFeed />' },
      { theme: "all", code: '<NotificationFeed notifications={teamNotifications} animated={false} />' },
    ],
  },

  MultiStepForm: {
    name: "MultiStepForm",
    category: "shared",
    description: "Wizard-style multi-step form with optional validation, controlled state, and customizable navigation labels.",
    props: {
      steps: { type: "{ id: string; title: string; description?: string; fields: ReactNode | ((context: MultiStepFormRenderContext) => ReactNode); validate?: (data: Record<string, unknown>) => boolean | string }[]", required: true },
      value: { type: "Record<string, unknown>", required: false, description: "Controlled form data object" },
      initialData: { type: "Record<string, unknown>", required: false, default: "{}", description: "Initial internal data when uncontrolled" },
      onChange: { type: "(data: Record<string, unknown>) => void", required: false, description: "Called whenever form data changes" },
      currentStep: { type: "number", required: false, description: "Controlled active step index" },
      initialStep: { type: "number", required: false, default: "0" },
      onStepChange: { type: "(stepIndex: number) => void", required: false },
      allowStepNavigation: { type: "boolean", required: false, default: "true", description: "Allows clicking progress dots to jump steps" },
      backLabel: { type: "string", required: false, default: "'Back'" },
      nextLabel: { type: "string", required: false, default: "'Next'" },
      completeLabel: { type: "string", required: false, default: "'Complete'" },
      completeDisabled: { type: "boolean", required: false, default: "false" },
      onBack: { type: "(stepIndex: number, data: Record<string, unknown>) => void", required: false },
      onComplete: { type: "(data: Record<string, unknown>) => void", required: false },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<MultiStepForm steps={steps} onComplete={(data) => save(data)} />' },
      { theme: "all", code: '<MultiStepForm steps={steps} value={formData} onChange={setFormData} currentStep={activeStep} onStepChange={setActiveStep} allowStepNavigation={false} />' },
    ],
  },

  CalendarWidget: {
    name: "CalendarWidget",
    category: "shared",
    description: "Mini calendar with month navigation, date selection, and per-day event indicators.",
    props: {
      events: { type: "{ date: string; title: string; color?: string }[]", required: false },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<CalendarWidget events={[{ date: "2026-05-04", title: "Product Review", color: "#7c3aed" }]} />' },
    ],
  },

  MediaGallery: {
    name: "MediaGallery",
    category: "shared",
    description: "Filterable media grid with lightbox preview and keyboard navigation.",
    props: {
      items: { type: "{ id: string; src: string; alt: string; width?: number; height?: number; tags?: string[] }[]", required: true },
      animated: { type: "boolean", required: false, default: "true" },
    },
    examples: [
      { theme: "all", code: '<MediaGallery items={galleryItems} />' },
      { theme: "all", code: '<MediaGallery items={galleryItems} animated={false} />' },
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

  NotificationCenter: {
    name: "NotificationCenter",
    category: "shared",
    description: "App-wide transient toast viewport powered by a provider + hook API. Supports priority levels (critical/high/medium/low), avatar/initials display, multiple action buttons, custom icon overrides, position, timeout, closable controls, and loading/success/error states.",
    props: {
      position: { type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'", required: false, default: '"top-right"' },
      showCloseButton: { type: "boolean", required: false, default: "true" },
      showProgress: { type: "boolean", required: false, default: "true" },
      compact: { type: "boolean", required: false, default: "false" },
      gap: { type: "number", required: false, default: "8", description: "Vertical spacing between visible toast cards" },
      classNames: { type: "NotificationCenterClassNames", required: false, description: "Style slots for viewport/card/title/message/close/progress" },
      styles: { type: "Partial<Record<keyof NotificationCenterClassNames, CSSProperties>>", required: false, description: "Inline style overrides by slot" },
    },
    examples: [
      { theme: "all", code: '<NotificationCenterProvider><App /><NotificationCenter position="top-right" /></NotificationCenterProvider>' },
      { theme: "all", code: 'const { error } = useNotificationCenter();\nerror("Deploy failed.", { title: "CI/CD", priority: "critical", actions: [{ label: "Open logs", onClick: openLogs }, { label: "Rollback", onClick: rollback }] });' },
    ],
  },

  NotificationInbox: {
    name: "NotificationInbox",
    category: "shared",
    description: "Actionable notification module with search, status/type filtering, unread toggle, bulk actions (mark all read / archive all), priority visual hierarchy, avatar/initials display, per-item snooze, expandable long messages, and contextual empty states.",
    props: {
      notifications: { type: "NotificationInboxItem[]", required: false, description: "Controlled notifications list" },
      defaultNotifications: { type: "NotificationInboxItem[]", required: false, description: "Initial internal list for uncontrolled mode" },
      onNotificationsChange: { type: "(notifications: NotificationInboxItem[]) => void", required: false, description: "Fires when list mutations occur (read/archive)" },
      onAction: { type: "(notification: NotificationInboxItem, action: NotificationInboxAction) => void", required: false, description: "Triggered when item action buttons are clicked" },
      onMarkAllRead: { type: "() => void", required: false, description: "Fires when 'Mark all read' bulk action is used" },
      onArchiveAll: { type: "() => void", required: false, description: "Fires when 'Archive all' bulk action is used" },
      title: { type: "string", required: false, default: '"Notification Inbox"' },
      subtitle: { type: "string", required: false },
      searchable: { type: "boolean", required: false, default: "true" },
      filterable: { type: "boolean", required: false, default: "true" },
      showUnreadOnlyToggle: { type: "boolean", required: false, default: "true" },
      showStats: { type: "boolean", required: false, default: "false", description: "Show total/unread/archived counts above toolbar" },
      maxItems: { type: "number", required: false, default: "200" },
      emptyStateTitle: { type: "string", required: false },
      emptyStateDescription: { type: "string", required: false },
      classNames: { type: "NotificationInboxClassNames", required: false },
      styles: { type: "Partial<Record<keyof NotificationInboxClassNames, CSSProperties>>", required: false },
    },
    examples: [
      { theme: "all", code: '<NotificationInbox defaultNotifications={inboxItems} onMarkAllRead={markAll} />' },
      { theme: "all", code: '<NotificationInbox notifications={items} onNotificationsChange={setItems} onAction={(item, action) => runAction(item, action)} onMarkAllRead={markAll} onArchiveAll={archiveAll} showStats />' },
    ],
  },

  NotificationPanel: {
    name: "NotificationPanel",
    category: "shared",
    description: "Full-page notification management template. Includes a TopBar with live bell dropdown, stats strip (total/unread/archived), a category sidebar derived from item.category fields (messages, security, billing, devops, collaboration, ecommerce, social, reminders, updates, support), and an enhanced NotificationInbox with priority levels, avatar display, bulk actions, per-item snooze, and expandable messages. Comes pre-populated with 20 demo notifications across all 10 use-case categories.",
    props: {
      notifications: { type: "NotificationInboxItem[]", required: false, description: "Controlled notifications list; falls back to built-in 20-item demo" },
      defaultNotifications: { type: "NotificationInboxItem[]", required: false, description: "Initial list for uncontrolled mode" },
      onNotificationsChange: { type: "(notifications: NotificationInboxItem[]) => void", required: false },
      onAction: { type: "(notification: NotificationInboxItem, action: NotificationInboxAction) => void", required: false },
      onMarkAllRead: { type: "() => void", required: false },
      onArchiveAll: { type: "() => void", required: false },
      title: { type: "string", required: false, default: '"Notification Center"' },
      showTopBar: { type: "boolean", required: false, default: "true", description: "Show the TopBar with bell dropdown at the top" },
      topBarTitle: { type: "string", required: false, default: '"Notifications"' },
      topBarSubtitle: { type: "string", required: false },
    },
    examples: [
      { theme: "all", code: '<NotificationPanel />' },
      { theme: "all", code: '<NotificationPanel notifications={items} onMarkAllRead={markAll} onArchiveAll={archiveAll} topBarTitle="Your Notifications" />' },
    ],
  },
} as const;

export type CompositeManifestKey = keyof typeof COMPOSITES_MANIFEST;
export type CompositeManifestEntry = (typeof COMPOSITES_MANIFEST)[CompositeManifestKey];
