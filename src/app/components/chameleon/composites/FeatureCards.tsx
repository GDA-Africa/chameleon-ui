import React from "react";
import { cn } from "../utils";
import { Card, CardContent } from "../molecules";
import { useThemeClasses, useChameleon } from "../context";
import type { FeatureCardsProps, Feature } from "./types";

const DEFAULT_FEATURES: Feature[] = [
  { title: "Lightning Fast", desc: "Optimized for speed and performance" },
  { title: "Secure by Default", desc: "Enterprise-grade security built-in" },
  { title: "Easy Integration", desc: "Works with your existing tools" },
  { title: "Team Collaboration", desc: "Built for teams of all sizes" },
  { title: "Advanced Analytics", desc: "Track everything that matters" },
  { title: "Global Scale", desc: "Deployed worldwide with 99.9% uptime" },
];

const colsMap = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };
const paddingMap = { sm: "p-4", md: "p-6", lg: "p-8" };

export const FeatureCards: React.FC<FeatureCardsProps> = ({
  heading = "Everything You Need",
  subheading = "Powerful features that help you build, launch, and grow",
  features = DEFAULT_FEATURES,
  columns = 3,
  padding = "md",
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const { theme } = useChameleon();

  const iconBg =
    theme === "minimalist"
      ? "bg-black/5"
      : theme === "liquid"
        ? "bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full"
        : theme === "glassy"
          ? "bg-white/10 rounded-2xl"
          : "bg-[var(--primary)]/10 rounded-2xl";

  return (
    <section className={cn("space-y-10", className)}>
      {(heading || subheading) && (
        <div className="text-center space-y-4">
          {heading && (
            <h2 className={cn("text-3xl md:text-5xl font-black tracking-tight", textPrimary)}>
              {heading}
            </h2>
          )}
          {subheading && (
            <p className={cn("text-lg max-w-2xl mx-auto", textMuted)}>{subheading}</p>
          )}
        </div>
      )}

      <div className={cn("grid grid-cols-1 gap-6", colsMap[columns])}>
        {features.map((feature, i) => (
          <Card key={i} animated={animated} className="group hover:border-[var(--primary)]/40 transition-all">
            <CardContent className={cn(paddingMap[padding], "space-y-4")}>
              {feature.icon && (
                <div className={cn("w-12 h-12 flex items-center justify-center text-[var(--primary)] transition-transform group-hover:scale-110", iconBg)}>
                  <feature.icon className="w-6 h-6" />
                </div>
              )}
              <h3 className={cn("text-lg font-bold", textPrimary)}>{feature.title}</h3>
              <p className={cn("text-sm leading-relaxed", textMuted)}>{feature.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
