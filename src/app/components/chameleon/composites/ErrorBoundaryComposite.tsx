import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "../utils";
import { Button } from "../atoms";
import { Card, CardContent } from "../molecules";
import { useThemeClasses } from "../context";
import type { ErrorBoundaryCompositeProps } from "./types";

export const ErrorBoundaryComposite: React.FC<ErrorBoundaryCompositeProps> = ({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
  icon,
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();

  return (
    <Card animated={animated} className={cn("text-center border-red-200 dark:border-red-900 max-w-md mx-auto", className)}>
      <CardContent className="p-8 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-950/30 flex items-center justify-center mx-auto">
          {icon ?? <AlertTriangle className="w-7 h-7 text-red-500" />}
        </div>
        <h3 className={cn("text-lg font-bold", textPrimary)}>{title}</h3>
        <p className={cn("text-sm", textMuted)}>{message}</p>
        {onRetry && (
          <Button variant="outline" onClick={onRetry} animated={animated}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
