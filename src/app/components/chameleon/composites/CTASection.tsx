import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../utils";
import { Button } from "../atoms";
import { useThemeClasses } from "../context";
import type { CTASectionProps } from "./types";

export const CTASection: React.FC<CTASectionProps> = ({
  heading = "Ready to Get Started?",
  subheading = "Join thousands of teams already using our platform. Start your free trial today.",
  ctaLabel = "Start Free Trial",
  onCTAClick,
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();

  return (
    <section
      className={cn(
        "relative text-center py-16 sm:py-24 px-4 rounded-3xl overflow-hidden",
        "bg-[var(--primary)]/5 border border-[var(--primary)]/10",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent -z-0" />
      <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
        <h2 className={cn("text-3xl sm:text-5xl font-black tracking-tight", textPrimary)}>
          {heading}
        </h2>
        <p className={cn("text-lg", textMuted)}>{subheading}</p>
        <Button
          size="lg"
          animated={animated}
          onClick={onCTAClick}
          className="h-14 px-10 text-lg font-bold group shadow-xl shadow-[var(--primary)]/20"
        >
          {ctaLabel}
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
};
