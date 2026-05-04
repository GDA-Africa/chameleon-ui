import type {
  HeroSectionProps,
  FeatureCardsProps,
  CTASectionProps,
  TestimonialCarouselProps,
  PricingTableProps,
  StatsCardCompositeProps,
  BarChartSectionProps,
  LineChartSectionProps,
  SideNavProps,
  TopBarProps,
  DataTableCompositeProps,
  ProfileSectionProps,
  SettingsListProps,
  PreferencePanelProps,
  DangerZoneProps,
  ProductGridProps,
  CartSummaryProps,
  CheckoutFormProps,
  PageHeaderProps,
} from "./composites/types";

// ─── Shared base ──────────────────────────────────────────────────────────────

export interface TemplateBaseProps {
  animated?: boolean;
  animationIntensity?: number;
  className?: string;
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

export interface LandingStyleConfig {
  heroSection?: Partial<HeroSectionProps>;
  featureCards?: Partial<FeatureCardsProps>;
  ctaSection?: Partial<CTASectionProps>;
  testimonialCarousel?: Partial<TestimonialCarouselProps>;
  pricingTable?: Partial<PricingTableProps>;
}

export interface LandingPageTemplateProps extends TemplateBaseProps {
  styleConfig?: LandingStyleConfig;
}

// ─── Blog/Article ─────────────────────────────────────────────────────────────

export interface BlogStyleConfig {
  pageHeader?: Partial<PageHeaderProps>;
  heroImage?: { gradient?: string; alt?: string };
  author?: { name?: string; role?: string; avatar?: string };
  meta?: { date?: string; readTime?: string };
}

export interface BlogArticleTemplateProps extends TemplateBaseProps {
  styleConfig?: BlogStyleConfig;
}

// ─── Pricing Page ─────────────────────────────────────────────────────────────

export interface PricingStyleConfig {
  pageHeader?: Partial<PageHeaderProps>;
  pricingTable?: Partial<PricingTableProps>;
  faqHeading?: string;
  ctaSection?: Partial<CTASectionProps>;
}

export interface PricingPageTemplateProps extends TemplateBaseProps {
  styleConfig?: PricingStyleConfig;
}

// ─── Contact/Support ──────────────────────────────────────────────────────────

export interface ContactStyleConfig {
  pageHeader?: Partial<PageHeaderProps>;
  heading?: string;
  subheading?: string;
}

export interface ContactSupportTemplateProps extends TemplateBaseProps {
  styleConfig?: ContactStyleConfig;
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export interface UserProfileStyleConfig {
  profileSection?: Partial<ProfileSectionProps>;
  statsCards?: Partial<StatsCardCompositeProps>[];
}

export interface UserProfileTemplateProps extends TemplateBaseProps {
  styleConfig?: UserProfileStyleConfig;
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

export interface AdminDashboardStyleConfig {
  topBar?: Partial<TopBarProps>;
  statsCards?: Partial<StatsCardCompositeProps>[];
  barChart?: Partial<BarChartSectionProps>;
  lineChart?: Partial<LineChartSectionProps>;
  dataTable?: Partial<DataTableCompositeProps>;
}

export interface AdminDashboardTemplateProps extends TemplateBaseProps {
  styleConfig?: AdminDashboardStyleConfig;
}

// ─── E-Commerce Product ──────────────────────────────────────────────────────

export interface EcommerceStyleConfig {
  productGrid?: Partial<ProductGridProps>;
  cartSummary?: Partial<CartSummaryProps>;
  checkoutForm?: Partial<CheckoutFormProps>;
}

export interface EcommerceProductTemplateProps extends TemplateBaseProps {
  styleConfig?: EcommerceStyleConfig;
}

// ─── Settings Panel ──────────────────────────────────────────────────────────

export interface SettingsStyleConfig {
  profileSection?: Partial<ProfileSectionProps>;
  settingsList?: Partial<SettingsListProps>;
  preferencePanel?: Partial<PreferencePanelProps>;
  dangerZone?: Partial<DangerZoneProps>;
}

export interface SettingsPanelTemplateProps extends TemplateBaseProps {
  styleConfig?: SettingsStyleConfig;
}

// ─── Auth Flow ────────────────────────────────────────────────────────────────

export interface AuthFlowStyleConfig {
  heading?: string;
  subheading?: string;
  logoLabel?: string;
}

export interface AuthFlowTemplateProps extends TemplateBaseProps {
  styleConfig?: AuthFlowStyleConfig;
}

// ─── Documentation ───────────────────────────────────────────────────────────

export interface DocumentationStyleConfig {
  pageHeader?: Partial<PageHeaderProps>;
  sideNav?: Partial<SideNavProps>;
  heading?: string;
}

export interface DocumentationTemplateProps extends TemplateBaseProps {
  styleConfig?: DocumentationStyleConfig;
}
