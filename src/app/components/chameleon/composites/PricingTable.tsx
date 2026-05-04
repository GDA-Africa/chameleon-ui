import React from "react";
import { Check } from "lucide-react";
import { cn } from "../utils";
import { Button, Badge } from "../atoms";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules";
import { useThemeClasses } from "../context";
import type { PricingTableProps, PricingTier } from "./types";

const DEFAULT_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "Perfect for individuals",
    features: ["5 projects", "10GB storage", "Basic support", "API access"],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Best for growing teams",
    features: ["Unlimited projects", "100GB storage", "Priority support", "API access", "Custom domains", "Analytics"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For large organisations",
    features: ["Unlimited everything", "1TB storage", "24/7 support", "API access", "Custom domains", "Advanced analytics", "SSO & SAML"],
    cta: "Contact Sales",
  },
];

export const PricingTable: React.FC<PricingTableProps> = ({
  heading = "Simple, Transparent Pricing",
  subheading = "Choose the plan that works best for you",
  tiers = DEFAULT_TIERS,
  currencySymbol = "$",
  onSelectTier,
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();

  return (
    <section className={cn("space-y-10", className)}>
      {(heading || subheading) && (
        <div className="text-center space-y-4">
          {heading && <h2 className={cn("text-3xl md:text-5xl font-black tracking-tight", textPrimary)}>{heading}</h2>}
          {subheading && <p className={cn("text-lg max-w-2xl mx-auto", textMuted)}>{subheading}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier, i) => (
          <Card
            key={i}
            animated={animated}
            className={cn(
              "relative",
              tier.highlighted && "border-2 border-[var(--primary)] shadow-xl shadow-[var(--primary)]/10",
            )}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge>Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              {tier.description && <p className={cn("text-sm", textMuted)}>{tier.description}</p>}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-baseline gap-1">
                <span className={cn("text-4xl font-black", textPrimary)}>
                  {tier.price.startsWith("$") ? currencySymbol + tier.price.slice(1) : tier.price}
                </span>
                {tier.period && <span className={cn("text-sm", textMuted)}>{tier.period}</span>}
              </div>

              <ul className="space-y-3">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--primary)] shrink-0" />
                    <span className={cn("text-sm", textMuted)}>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.highlighted ? "primary" : "outline"}
                className="w-full"
                animated={animated}
                onClick={() => onSelectTier?.(tier)}
              >
                {tier.cta ?? "Get Started"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
