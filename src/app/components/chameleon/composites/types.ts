import type { ReactNode, ElementType, CSSProperties } from "react";

// ─── Base ─────────────────────────────────────────────────────────────────────

export interface CompositeBaseProps {
  animated?: boolean;
  animationIntensity?: number;
  className?: string;
}

// ─── Shared data shapes ───────────────────────────────────────────────────────

export interface Feature {
  icon?: ElementType;
  title: string;
  desc: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar?: string;
  text: string;
  rating?: number;
}

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  cta?: string;
  highlighted?: boolean;
}

export interface NavItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  badge?: string | number;
  children?: NavItem[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => ReactNode;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  bio?: string;
}

export interface Setting {
  id: string;
  label: string;
  description?: string;
  enabled: boolean;
}

export interface Preference {
  id: string;
  label: string;
  description?: string;
  value: string;
  options: { label: string; value: string }[];
}

export interface DangerAction {
  id: string;
  label: string;
  description: string;
  buttonLabel?: string;
  variant?: "danger" | "warning";
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  description?: string;
  category?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  shippingAddress?: string;
  estimatedDelivery?: string;
}

export interface Notification {
  id: string;
  title: string;
  message?: string;
  read?: boolean;
  time?: string;
  type?: "info" | "success" | "warning" | "error";
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ─── Landing Composites ───────────────────────────────────────────────────────

export interface HeroSectionProps extends CompositeBaseProps {
  heading?: ReactNode;
  subheading?: string;
  ctaLabel?: string;
  secondaryCtaLabel?: string;
  onCTAClick?: () => void;
  onSecondaryClick?: () => void;
  badge?: string;
  trustLogos?: string[];
  backgroundColor?: string;
  textColor?: string;
  padding?: "sm" | "md" | "lg" | "xl";
  buttonVariant?: "primary" | "secondary" | "outline" | "ghost";
}

export interface FeatureCardsProps extends CompositeBaseProps {
  heading?: string;
  subheading?: string;
  features?: Feature[];
  columns?: 2 | 3 | 4;
  cardBgColor?: string;
  shadowIntensity?: "none" | "sm" | "md" | "lg";
  borderRadius?: "none" | "sm" | "md" | "lg" | "full";
  padding?: "sm" | "md" | "lg";
}

export interface CTASectionProps extends CompositeBaseProps {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  onCTAClick?: () => void;
  backgroundColor?: string;
  textColor?: string;
}

export interface TestimonialCarouselProps extends CompositeBaseProps {
  heading?: string;
  subheading?: string;
  testimonials?: Testimonial[];
  autoScroll?: boolean;
  delay?: number;
  columns?: 1 | 2 | 3;
}

export interface PricingTableProps extends CompositeBaseProps {
  heading?: string;
  subheading?: string;
  tiers?: PricingTier[];
  highlightColor?: string;
  currencySymbol?: string;
  onSelectTier?: (tier: PricingTier) => void;
}

// ─── Dashboard Composites ─────────────────────────────────────────────────────

export interface StatsCardCompositeProps extends CompositeBaseProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: number;
  trendLabel?: string;
  backgroundColor?: string;
  textColor?: string;
  onClick?: () => void;
}

export interface BarChartSectionProps extends CompositeBaseProps {
  heading?: string;
  data?: ChartDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  color?: string;
  height?: number;
}

export interface LineChartSectionProps extends CompositeBaseProps {
  heading?: string;
  data?: ChartDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  color?: string;
  height?: number;
}

export interface SideNavProps extends CompositeBaseProps {
  items?: NavItem[];
  activeItem?: string;
  onSelect?: (item: NavItem) => void;
  backgroundColor?: string;
  textColor?: string;
  collapsed?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
}

export interface TopBarProps extends CompositeBaseProps {
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  notifications?: Notification[];
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  backgroundColor?: string;
  actions?: ReactNode;
  userMenu?: ReactNode;
  showNotificationDropdown?: boolean;
  notificationDropdownItems?: NotificationInboxItem[];
  onViewAllNotifications?: () => void;
  dropdownMaxItems?: number;
}

export interface DataTableCompositeProps<T = Record<string, unknown>> extends CompositeBaseProps {
  columns?: TableColumn<T>[];
  data?: T[];
  sortable?: boolean;
  filterable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  heading?: string;
  emptyMessage?: string;
}

// ─── Auth Composites ──────────────────────────────────────────────────────────

export interface LoginFormProps extends CompositeBaseProps {
  onSubmit?: (
    data: { email: string; password: string; rememberMe: boolean },
  ) => void | Promise<unknown>;
  rememberMe?: boolean;
  socialLoginOptions?: ("google" | "github" | "apple")[];
  forgotPasswordHref?: string;
  signUpHref?: string;
  isLoading?: boolean;
  error?: string;
  value?: Partial<{ email: string; password: string; rememberMe: boolean }>;
  defaultValue?: Partial<{ email: string; password: string; rememberMe: boolean }>;
  onChange?: (values: { email: string; password: string; rememberMe: boolean }) => void;
  classNames?: Partial<Record<string, string>>;
  styles?: Partial<Record<string, CSSProperties>>;
}

export interface SignupFormProps extends CompositeBaseProps {
  onSubmit?: (
    data: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      acceptTerms: boolean;
    },
  ) => void | Promise<unknown>;
  passwordStrengthIndicator?: boolean;
  signInHref?: string;
  isLoading?: boolean;
  error?: string;
  value?: Partial<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }>;
  defaultValue?: Partial<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }>;
  onChange?: (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }) => void;
  classNames?: Partial<Record<string, string>>;
  styles?: Partial<Record<string, CSSProperties>>;
}

export interface TwoFactorFormProps extends CompositeBaseProps {
  onSubmit?: (code: string) => void | Promise<unknown>;
  method?: "sms" | "email" | "app";
  onResend?: () => void | Promise<unknown>;
  isLoading?: boolean;
  error?: string;
  value?: Partial<{ code: string }>;
  defaultValue?: Partial<{ code: string }>;
  onChange?: (values: { code: string }) => void;
  classNames?: Partial<Record<string, string>>;
  styles?: Partial<Record<string, CSSProperties>>;
}

export interface MagicLinkFormProps extends CompositeBaseProps {
  onSubmit?: (email: string) => void | Promise<unknown>;
  isLoading?: boolean;
  error?: string;
  successMessage?: string;
  value?: Partial<{ email: string }>;
  defaultValue?: Partial<{ email: string }>;
  onChange?: (values: { email: string }) => void;
  classNames?: Partial<Record<string, string>>;
  styles?: Partial<Record<string, CSSProperties>>;
}

export interface PasswordRecoveryFormProps extends CompositeBaseProps {
  onSubmit?: (email: string) => void | Promise<unknown>;
  signInHref?: string;
  isLoading?: boolean;
  error?: string;
  successMessage?: string;
  value?: Partial<{ email: string }>;
  defaultValue?: Partial<{ email: string }>;
  onChange?: (values: { email: string }) => void;
  classNames?: Partial<Record<string, string>>;
  styles?: Partial<Record<string, CSSProperties>>;
}

// ─── Settings Composites ──────────────────────────────────────────────────────

export interface ProfileSectionProps extends CompositeBaseProps {
  user?: UserProfile;
  onSave?: (user: UserProfile) => void;
  editable?: boolean;
  isLoading?: boolean;
}

export interface SettingsListProps extends CompositeBaseProps {
  heading?: string;
  settings?: Setting[];
  onToggle?: (id: string, enabled: boolean) => void;
}

export interface PreferencePanelProps extends CompositeBaseProps {
  heading?: string;
  preferences?: Preference[];
  onSave?: (preferences: Preference[]) => void;
}

export interface DangerZoneProps extends CompositeBaseProps {
  heading?: string;
  actions?: DangerAction[];
  onConfirm?: (actionId: string) => void;
}

// ─── E-Commerce Composites ────────────────────────────────────────────────────

export interface ProductGridProps extends CompositeBaseProps {
  heading?: string;
  products?: Product[];
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  searchable?: boolean;
  filterable?: boolean;
  columns?: 2 | 3 | 4;
}

export interface ProductCardProps extends CompositeBaseProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onClick?: (product: Product) => void;
}

export interface CartSummaryProps extends CompositeBaseProps {
  items?: CartItem[];
  subtotal?: number;
  tax?: number;
  discount?: number;
  total?: number;
  onCheckout?: () => void;
  onUpdateQuantity?: (id: string, qty: number) => void;
  onRemoveItem?: (id: string) => void;
}

export interface CheckoutFormProps extends CompositeBaseProps {
  onSubmit?: (data: Record<string, string>) => void;
  countries?: { label: string; value: string }[];
  isLoading?: boolean;
  total?: number;
}

export interface OrderConfirmationProps extends CompositeBaseProps {
  order?: Order;
  onContinueShopping?: () => void;
  onViewOrder?: () => void;
}

// ─── Shared Composites ────────────────────────────────────────────────────────

export interface PageHeaderProps extends CompositeBaseProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
}

export interface EmptyStateProps extends CompositeBaseProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface LoadingStateProps extends CompositeBaseProps {
  label?: string;
  variant?: "spinner" | "skeleton" | "dots";
  rows?: number;
}

export interface ErrorBoundaryCompositeProps extends CompositeBaseProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  icon?: ReactNode;
}

export interface ModalCompositeProps extends CompositeBaseProps {
  title?: string;
  children?: ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  footer?: ReactNode;
}

export interface ToastCompositeProps extends CompositeBaseProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose?: () => void;
  title?: string;
}

export type NotificationPriority = "critical" | "high" | "medium" | "low";

export type NotificationInboxCategory =
  | "messages"
  | "security"
  | "billing"
  | "devops"
  | "collaboration"
  | "ecommerce"
  | "social"
  | "reminders"
  | "updates"
  | "support";

export type NotificationCenterType = "success" | "error" | "info" | "warning";

export type NotificationCenterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface NotificationCenterAction {
  label: string;
  onClick: () => void;
}

export interface NotificationCenterItem {
  id: string;
  title?: string;
  message: string;
  type?: NotificationCenterType;
  state?: "idle" | "loading" | "success" | "error";
  duration?: number;
  createdAt?: number;
  /** @deprecated Prefer actions[] for multi-action support */
  action?: NotificationCenterAction;
  actions?: NotificationCenterAction[];
  priority?: NotificationPriority;
  avatar?: string;
  avatarFallback?: string;
  icon?: ElementType;
  persistent?: boolean;
  closable?: boolean;
}

export interface NotificationCenterCreateInput
  extends Omit<NotificationCenterItem, "id" | "createdAt"> {
  id?: string;
}

export interface NotificationCenterProviderProps extends CompositeBaseProps {
  children: ReactNode;
  defaultDuration?: number;
  maxVisible?: number;
  pauseOnHover?: boolean;
  newestOnTop?: boolean;
}

export interface NotificationCenterClassNames {
  viewport?: string;
  card?: string;
  title?: string;
  message?: string;
  closeButton?: string;
  progress?: string;
}

export interface NotificationCenterProps extends CompositeBaseProps {
  position?: NotificationCenterPosition;
  showCloseButton?: boolean;
  showProgress?: boolean;
  compact?: boolean;
  gap?: number;
  classNames?: NotificationCenterClassNames;
  styles?: Partial<Record<keyof NotificationCenterClassNames, CSSProperties>>;
}

export type NotificationInboxType = NotificationCenterType;

export interface NotificationInboxAction {
  id: string;
  label: string;
  intent?: "primary" | "neutral" | "danger";
}

export interface NotificationInboxItem {
  id: string;
  title: string;
  message: string;
  type?: NotificationInboxType;
  status?: "unread" | "read" | "archived";
  createdAt?: number;
  source?: string;
  category?: NotificationInboxCategory;
  tags?: string[];
  actions?: NotificationInboxAction[];
  priority?: NotificationPriority;
  avatar?: string;
  avatarFallback?: string;
  snoozedUntil?: number;
}

export interface NotificationInboxClassNames {
  root?: string;
  toolbar?: string;
  searchInput?: string;
  list?: string;
  item?: string;
  itemTitle?: string;
  itemMessage?: string;
  actionButton?: string;
  stats?: string;
  categoryBar?: string;
}

export interface NotificationInboxProps extends CompositeBaseProps {
  notifications?: NotificationInboxItem[];
  defaultNotifications?: NotificationInboxItem[];
  onNotificationsChange?: (notifications: NotificationInboxItem[]) => void;
  onAction?: (notification: NotificationInboxItem, action: NotificationInboxAction) => void;
  onMarkAllRead?: () => void;
  onArchiveAll?: () => void;
  title?: string;
  subtitle?: string;
  searchable?: boolean;
  filterable?: boolean;
  showUnreadOnlyToggle?: boolean;
  showStats?: boolean;
  showCategoryFilter?: boolean;
  maxItems?: number;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  classNames?: NotificationInboxClassNames;
  styles?: Partial<Record<keyof NotificationInboxClassNames, CSSProperties>>;
}

export interface NotificationPanelProps extends CompositeBaseProps {
  notifications?: NotificationInboxItem[];
  defaultNotifications?: NotificationInboxItem[];
  onNotificationsChange?: (notifications: NotificationInboxItem[]) => void;
  onAction?: (notification: NotificationInboxItem, action: NotificationInboxAction) => void;
  onMarkAllRead?: () => void;
  onArchiveAll?: () => void;
  title?: string;
  showTopBar?: boolean;
  topBarTitle?: string;
  topBarSubtitle?: string;
}
