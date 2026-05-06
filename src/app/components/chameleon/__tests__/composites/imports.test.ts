import { describe, it, expect } from "vitest";

// ─── Task 3.1: Verify all composites export from central index ────────────────

describe("Composite Central Registry Imports", () => {
  it("exports all landing composites", async () => {
    const mod = await import("../../composites/index");
    expect(mod.HeroSection).toBeDefined();
    expect(mod.FeatureCards).toBeDefined();
    expect(mod.CTASection).toBeDefined();
    expect(mod.TestimonialCarousel).toBeDefined();
    expect(mod.PricingTable).toBeDefined();
  });

  it("exports all dashboard composites", async () => {
    const mod = await import("../../composites/index");
    expect(mod.StatsCard).toBeDefined();
    expect(mod.BarChartSection).toBeDefined();
    expect(mod.LineChartSection).toBeDefined();
    expect(mod.SideNav).toBeDefined();
    expect(mod.TopBar).toBeDefined();
    expect(mod.DataTableComposite).toBeDefined();
  });

  it("exports all settings composites", async () => {
    const mod = await import("../../composites/index");
    expect(mod.ProfileSection).toBeDefined();
    expect(mod.SettingsList).toBeDefined();
    expect(mod.PreferencePanel).toBeDefined();
    expect(mod.DangerZone).toBeDefined();
  });

  it("exports all e-commerce composites", async () => {
    const mod = await import("../../composites/index");
    expect(mod.ProductGrid).toBeDefined();
    expect(mod.ProductCard).toBeDefined();
    expect(mod.CartSummary).toBeDefined();
    expect(mod.CheckoutForm).toBeDefined();
    expect(mod.OrderConfirmation).toBeDefined();
  });

  it("exports all shared composites", async () => {
    const mod = await import("../../composites/index");
    expect(mod.PageHeader).toBeDefined();
    expect(mod.EmptyState).toBeDefined();
    expect(mod.LoadingState).toBeDefined();
    expect(mod.ErrorBoundaryComposite).toBeDefined();
    expect(mod.ModalComposite).toBeDefined();
    expect(mod.ToastComposite).toBeDefined();
    expect(mod.NotificationInbox).toBeDefined();
    expect(mod.NotificationCenterProvider).toBeDefined();
    expect(mod.NotificationCenter).toBeDefined();
    expect(mod.useNotificationCenter).toBeDefined();
  });
});

describe("Template styleConfig Types Imports", () => {
  it("exports all template styleConfig types", async () => {
    const mod = await import("../../template-styles");
    // Types exist at compile time; confirm the module itself loads without error
    expect(mod).toBeDefined();
  });
});
