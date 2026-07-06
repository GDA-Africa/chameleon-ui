/**
 * Chameleon Engine — component/template/theme registry (F59).
 * Single source of truth for the catalog consumed by the CLI and MCP server.
 * Sourced from atoms.tsx, molecules.tsx, composites.tsx and template files.
 */

export const COMPONENTS = {
  button:              { file: "atoms.tsx",      category: "Atom",      deps: ["@radix-ui/react-slot", "motion"],            variants: ["primary","secondary","ghost","outline"],     desc: "Interactive button with theme adaptation and animations." },
  input:               { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["default","error","disabled"],                desc: "Form text input with full theme token support." },
  badge:               { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["default","success","warning","error"],       desc: "Compact status/label indicator." },
  spinner:             { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["sm","md","lg"],                              desc: "Loading spinner with size variants." },
  avatar:              { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["sm","md","lg"],                              desc: "User avatar with image and fallback initials." },
  toggle:              { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["default","sm"],                              desc: "Boolean on/off toggle switch." },
  progress:            { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["default","animated"],                        desc: "Linear progress bar with animated fill." },
  tooltip:             { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["top","bottom","left","right"],               desc: "Contextual hover tooltip for any element." },
  datepicker:          { file: "atoms.tsx",      category: "Atom",      deps: [],                                            variants: ["single","range"],                            desc: "Date picker supporting single date or date range selection.", exportName: "DatePicker" },
  card:                { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["default","elevated","animated"],             desc: "Versatile content container with header/footer slots." },
  tabs:                { file: "molecules.tsx",  category: "Molecule",  deps: ["@radix-ui/react-tabs"],                      variants: ["default"],                                  desc: "Tabbed navigation panel." },
  dialog:              { file: "molecules.tsx",  category: "Molecule",  deps: ["@radix-ui/react-dialog"],                    variants: ["default"],                                  desc: "Accessible modal dialog overlay." },
  "stat-card":         { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["default","trending"],                        desc: "KPI/metric card with trend indicator." },
  "pricing-card":      { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["default","featured"],                        desc: "Pricing tier card with feature list." },
  alert:               { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["info","success","warning","error"],          desc: "Inline alert/notification banner." },
  separator:           { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["horizontal","vertical"],                     desc: "Visual divider line." },
  breadcrumb:          { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["default"],                                  desc: "Hierarchical navigation breadcrumb trail." },
  select:              { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["default","error"],                           desc: "Styled select dropdown." },
  textarea:            { file: "molecules.tsx",  category: "Molecule",  deps: [],                                            variants: ["default","error"],                           desc: "Multiline text input." },
  "data-table":        { file: "composites.tsx", category: "Composite", deps: [],                                            variants: ["default","striped"],                         desc: "Sortable, filterable data table with pagination." },
  "theme-chart":       { file: "composites.tsx", category: "Composite", deps: ["recharts"],                                  variants: ["bar","line","area"],                         desc: "Themed recharts wrapper with full token support." },
  "command-palette":   { file: "composites.tsx", category: "Composite", deps: ["cmdk"],                                      variants: ["default"],                                  desc: "CMD+K command palette with fuzzy search." },
  "kanban-board":      { file: "composites.tsx", category: "Composite", deps: ["react-dnd","react-dnd-html5-backend"],       variants: ["default"],                                  desc: "Drag-and-drop kanban board." },
  timeline:            { file: "composites.tsx", category: "Composite", deps: [],                                            variants: ["default","animated"],                        desc: "Vertical timeline of events." },
  "file-uploader":     { file: "composites.tsx", category: "Composite", deps: [],                                            variants: ["default","drag-drop"],                       desc: "File upload zone with preview and progress." },
  "notification-feed": { file: "composites.tsx", category: "Composite", deps: [],                                            variants: ["default"],                                  desc: "Real-time notification feed list." },
  "multi-step-form":   { file: "composites.tsx", category: "Composite", deps: ["react-hook-form"],                           variants: ["default"],                                  desc: "Wizard-style multi-step form with validation." },
  "calendar-widget":   { file: "composites.tsx", category: "Composite", deps: ["react-day-picker","date-fns"],               variants: ["default"],                                  desc: "Interactive calendar picker widget." },
  "media-gallery":     { file: "composites.tsx", category: "Composite", deps: [],                                            variants: ["grid","masonry"],                            desc: "Responsive image/media gallery." },
};

export const TEMPLATES = {
  "auth":               { file: "templates.tsx",                    export: "AuthTemplate",               desc: "Login and signup forms with validation." },
  "settings":           { file: "templates.tsx",                    export: "SettingsTemplate",            desc: "User settings panel with sections." },
  "ecommerce":          { file: "templates.tsx",                    export: "EcommerceTemplate",           desc: "Product listing and cart page." },
  "analytics-dashboard":{ file: "templates.tsx",                    export: "AnalyticsDashboardTemplate",  desc: "KPI dashboard with charts and metrics." },
  "landing-page":       { file: "comprehensive-templates.tsx",      export: "LandingPageTemplate",         desc: "Full marketing landing page." },
  "blog-article":       { file: "comprehensive-templates.tsx",      export: "BlogArticleTemplate",         desc: "Article/blog post layout." },
  "pricing-page":       { file: "comprehensive-templates.tsx",      export: "PricingPageTemplate",         desc: "Pricing tiers with comparison table." },
  "contact-support":    { file: "comprehensive-templates.tsx",      export: "ContactSupportTemplate",      desc: "Contact form and support FAQ layout." },
  "user-profile":       { file: "comprehensive-templates-part2.tsx",export: "UserProfileTemplate",         desc: "User profile with avatar, bio and activity." },
  "admin-dashboard":    { file: "comprehensive-templates-part2.tsx",export: "AdminDashboardTemplate",      desc: "Admin panel with sidebar and data tables." },
  "ecommerce-product":  { file: "comprehensive-templates-part2.tsx",export: "EcommerceProductTemplate",    desc: "Single product detail page." },
  "settings-panel":     { file: "comprehensive-templates-part2.tsx",export: "SettingsPanelTemplate",       desc: "Comprehensive settings with nested tabs." },
  "auth-flow":          { file: "comprehensive-templates-part2.tsx",export: "AuthFlowTemplate",            desc: "Multi-step auth flow (login, 2FA, reset)." },
  "documentation":      { file: "comprehensive-templates-part2.tsx",export: "DocumentationTemplate",       desc: "Docs layout with sidebar navigation." },
};

export const VALID_THEMES = ["material", "simple", "minimalist", "glassy", "liquid"];

export const THEME_DESCRIPTIONS = {
  material:   "Classic Google-inspired elevation, shadows, and ripple effects.",
  simple:     "Flat, clean, unopinionated — great for custom design systems.",
  minimalist: "High whitespace, stark contrast, elegant typography.",
  glassy:     "Translucent frosted glass with backdrop blur — modern iOS/macOS feel.",
  liquid:     "Organic morphing gradients and fluid animations.",
};

/** Local module names rewritten to package imports when scaffolding components. */
export const LOCAL_DEPS_COMPONENTS = ["context", "utils", "animations", "atoms", "molecules", "composites"];
/** Local module names rewritten to package imports when scaffolding templates. */
export const LOCAL_DEPS_TEMPLATES = [...LOCAL_DEPS_COMPONENTS, "auth-components"];

export const toPascalCase = (str) =>
  str.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");

/** Component export name — registry override (e.g. DatePicker) or PascalCase. */
export const componentExport = (key) => COMPONENTS[key]?.exportName || toPascalCase(key);
