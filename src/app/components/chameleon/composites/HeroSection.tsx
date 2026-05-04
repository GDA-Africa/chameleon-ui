import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { cn } from "../utils";
import { Button, Badge } from "../atoms";
import { useThemeClasses } from "../context";
import type { HeroSectionProps } from "./types";

const paddingMap = { sm: "pt-8 pb-8 px-4", md: "pt-12 pb-12 px-4", lg: "pt-16 pb-16 px-4", xl: "pt-20 pb-20 px-4" };

export const HeroSection: React.FC<HeroSectionProps> = ({
  heading = "Build Better Products",
  subheading = "The all-in-one platform for modern teams. Ship faster, collaborate better, and scale effortlessly.",
  ctaLabel = "Get Started",
  secondaryCtaLabel = "Learn More",
  onCTAClick,
  onSecondaryClick,
  badge,
  trustLogos,
  padding = "xl",
  buttonVariant = "primary",
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();

  return (
    <section
      className={cn(
        "relative text-center space-y-6 sm:space-y-8",
        paddingMap[padding],
        className,
      )}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[var(--primary)]/15 to-transparent blur-3xl -z-10 opacity-60" />

      {badge && (
        <Badge className="mx-auto inline-flex items-center gap-2">
          <Star className="w-3 h-3" />
          {badge}
        </Badge>
      )}

      <h1
        className={cn(
          "text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter max-w-4xl mx-auto leading-[1.1]",
          textPrimary,
        )}
      >
        {heading}
      </h1>

      <p className={cn("text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed px-4", textMuted)}>
        {subheading}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
        <Button
          variant={buttonVariant}
          size="lg"
          animated={animated}
          onClick={onCTAClick}
          className="h-14 px-8 text-lg font-bold group shadow-xl shadow-[var(--primary)]/20"
        >
          {ctaLabel}
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>
        {secondaryCtaLabel && (
          <Button variant="outline" size="lg" onClick={onSecondaryClick} className="h-14 px-8 text-lg font-bold">
            {secondaryCtaLabel}
          </Button>
        )}
      </div>

      {trustLogos && trustLogos.length > 0 && (
        <div className="pt-8 sm:pt-12">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 opacity-50">
            {trustLogos.map((logo) => (
              <div key={logo} className={cn("text-xl sm:text-2xl font-black tracking-tighter", textPrimary)}>
                {logo}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
