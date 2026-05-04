import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "../utils";
import { Card, CardContent } from "../molecules";
import { useThemeClasses } from "../context";
import type { StatsCardCompositeProps } from "./types";

export const StatsCard: React.FC<StatsCardCompositeProps> = ({
  label,
  value,
  icon,
  trend,
  trendLabel,
  animated = true,
  onClick,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <Card animated={animated} className={cn(onClick && "cursor-pointer", className)} onClick={onClick}>
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className={cn("text-sm font-medium", textMuted)}>{label}</p>
            <p className={cn("text-2xl sm:text-3xl font-black", textPrimary)}>{value}</p>
            {trend !== undefined && (
              <div className={cn("flex items-center gap-1 text-xs font-medium", isPositive ? "text-emerald-500" : "text-red-500")}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{isPositive ? "+" : ""}{trend}%</span>
                {trendLabel && <span className={cn("ml-1", textMuted)}>{trendLabel}</span>}
              </div>
            )}
          </div>
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
