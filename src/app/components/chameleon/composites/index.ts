// ─── Landing Composites ───────────────────────────────────────────────────────
export { HeroSection } from "./HeroSection";
export { FeatureCards } from "./FeatureCards";
export { CTASection } from "./CTASection";
export { TestimonialCarousel } from "./TestimonialCarousel";
export { PricingTable } from "./PricingTable";

// ─── Dashboard Composites ─────────────────────────────────────────────────────
export { StatsCard } from "./StatsCard";
export { BarChartSection } from "./BarChartSection";
export { LineChartSection } from "./LineChartSection";
export { SideNav } from "./SideNav";
export { TopBar } from "./TopBar";
export { DataTableComposite } from "./DataTableComposite";

// ─── Auth Composites ─────────────────────────────────────────────────────────
// Auth composites (LoginForm, SignupForm, TwoFactorForm, MagicLinkForm,
// PasswordRecoveryForm) are provided by ../auth-components and re-exported
// from the root index.ts — no duplication here.

// ─── Settings Composites ──────────────────────────────────────────────────────
export { ProfileSection } from "./ProfileSection";
export { SettingsList } from "./SettingsList";
export { PreferencePanel } from "./PreferencePanel";
export { DangerZone } from "./DangerZone";

// ─── E-Commerce Composites ────────────────────────────────────────────────────
export { ProductGrid } from "./ProductGrid";
export { ProductCard } from "./ProductCard";
export { CartSummary } from "./CartSummary";
export { CheckoutForm } from "./CheckoutForm";
export { OrderConfirmation } from "./OrderConfirmation";

// ─── Shared Composites ────────────────────────────────────────────────────────
export { PageHeader } from "./PageHeader";
export { EmptyState } from "./EmptyState";
export { LoadingState } from "./LoadingState";
export { ErrorBoundaryComposite } from "./ErrorBoundaryComposite";
export { ModalComposite } from "./ModalComposite";
export { ToastComposite } from "./ToastComposite";

// ─── Types ────────────────────────────────────────────────────────────────────
export type * from "./types";
