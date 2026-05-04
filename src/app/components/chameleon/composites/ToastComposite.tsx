import React, { useEffect, useState } from "react";
import { X, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../utils";
import { useThemeClasses } from "../context";
import type { ToastCompositeProps } from "./types";

const typeConfig = {
  success: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800" },
  error: { icon: XCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800" },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800" },
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800" },
};

export const ToastComposite: React.FC<ToastCompositeProps> = ({
  message,
  type = "info",
  duration = 4000,
  onClose,
  title,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [visible, setVisible] = useState(true);

  const config = typeConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (duration <= 0) return;
    const t = setTimeout(() => { setVisible(false); onClose?.(); }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={cn(
            "flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg max-w-sm",
            config.bg,
            className,
          )}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
        >
          <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", config.color)} />
          <div className="flex-1 min-w-0">
            {title && <p className={cn("text-sm font-semibold", textPrimary)}>{title}</p>}
            <p className={cn("text-sm", title ? textMuted : textPrimary)}>{message}</p>
          </div>
          <button
            onClick={() => { setVisible(false); onClose?.(); }}
            className="shrink-0 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
