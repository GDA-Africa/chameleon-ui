import React from "react";
import { cn } from "../utils";
import { useThemeClasses } from "../context";
import type { LoadingStateProps } from "./types";

const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={cn("animate-spin", className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const SkeletonRow: React.FC = () => (
  <div className="space-y-2">
    <div className="h-4 bg-[var(--muted)] rounded-full animate-pulse w-3/4" />
    <div className="h-4 bg-[var(--muted)] rounded-full animate-pulse w-1/2" />
  </div>
);

const DotLoader: React.FC = () => (
  <div className="flex items-center gap-1.5">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

export const LoadingState: React.FC<LoadingStateProps> = ({
  label = "Loading…",
  variant = "spinner",
  rows = 3,
  className,
}) => {
  const { textMuted } = useThemeClasses();

  if (variant === "skeleton") {
    return (
      <div className={cn("space-y-4 py-4", className)}>
        {Array.from({ length: rows }).map((_, i) => <SkeletonRow key={i} />)}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex flex-col items-center gap-3 py-10", className)}>
        <DotLoader />
        {label && <p className={cn("text-sm", textMuted)}>{label}</p>}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-3 py-10", className)}>
      <Spinner className="w-8 h-8 text-[var(--primary)]" />
      {label && <p className={cn("text-sm", textMuted)}>{label}</p>}
    </div>
  );
};
