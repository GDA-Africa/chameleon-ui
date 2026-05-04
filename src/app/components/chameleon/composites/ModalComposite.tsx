import React from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../utils";
import { Button } from "../atoms";
import { useThemeClasses } from "../context";
import type { ModalCompositeProps } from "./types";

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full m-4",
};

export const ModalComposite: React.FC<ModalCompositeProps> = ({
  title,
  children,
  onClose,
  isOpen = false,
  size = "md",
  footer,
  className,
}) => {
  const { textPrimary } = useThemeClasses();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              "relative w-full bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden",
              sizeMap[size],
              className,
            )}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {(title || onClose) && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                {title && <h2 className={cn("text-lg font-bold", textPrimary)}>{title}</h2>}
                {onClose && (
                  <button onClick={onClose} className="ml-auto rounded-lg p-1 hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)]">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
            <div className="px-6 py-4">{children}</div>
            {footer && <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end gap-3">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
