import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, AnimatePresence } from "motion/react";
import { useThemeClasses, useChameleon } from "./context";
import { animationPresets } from "./animations";
import { cn } from "./utils";

// Re-export cn for backward compat
export { cn };

// ═══════════════════════════════════════════════════════════════════════════
// CHAMELEON UI ATOMS - AI-OPTIMIZED DOCUMENTATION
// ═══════════════════════════════════════════════════════════════════════════
// These are the foundational building blocks of Chameleon UI. Each component
// automatically adapts to all 5 themes (material, simple, minimalist, glassy, liquid)
// and guarantees proper text contrast in both light and dark modes.
//
// @ai-friendly true
// @version 1.0.0
// ═══════════════════════════════════════════════════════════════════════════

// ─── Button ──────────────────────────────────────────────────────────────────

/**
 * @component Button
 * @category Atom
 * @complexity 1
 *
 * @description
 * Interactive button component with automatic theme adaptation and optional animations.
 * Supports 4 visual variants and 4 size presets. Text color is always guaranteed to
 * contrast the button background using CSS variable tokens.
 *
 * @ai-usage
 * - Use variant="primary" for main call-to-action buttons
 * - Use variant="secondary" for less prominent actions
 * - Use variant="outline" for tertiary actions or toggles
 * - Use variant="ghost" for subtle text-button actions
 * - Add `animated` prop to enable theme-specific hover/tap physics
 *
 * @example-minimal
 * ```tsx
 * <Button>Click Me</Button>
 * ```
 *
 * @example-full
 * ```tsx
 * <Button variant="primary" size="lg" animated>
 *   <Save className="w-4 h-4 mr-2" />
 *   Save Changes
 * </Button>
 * ```
 *
 * @example-icon-only
 * ```tsx
 * <Button size="icon" variant="ghost" animated>
 *   <Settings className="w-4 h-4" />
 * </Button>
 * ```
 *
 * @accessibility
 * - Fully keyboard accessible (Tab, Enter, Space)
 * - Supports aria-label for icon-only buttons
 * - Focus visible ring with 2px offset
 * - Disabled state prevents interaction and reduces opacity
 *
 * @theme-adaptation
 * - Material: Elevated with shadows, uppercase text
 * - Simple: Clean rounded corners, solid colors
 * - Minimalist: Sharp edges, border-based styles
 * - Glassy: Frosted glass effect with backdrop blur
 * - Liquid: Gradient fills with rounded pill shape
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as child component (for Next.js Link, etc.) */
  asChild?: boolean;
  /** Visual style variant @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "outline";
  /** Button size preset @default "md" */
  size?: "sm" | "md" | "lg" | "icon";
  /** Enable theme-specific hover/tap animations @default false */
  animated?: boolean;
}

const MotionButton = motion.create("button");

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", asChild = false, animated = false, ...props },
    ref,
  ) => {
    const { buttonPrimary, buttonSecondary, buttonGhost, buttonOutline, theme } = useThemeClasses();

    const variantClass = {
      primary: buttonPrimary,
      secondary: buttonSecondary,
      ghost: buttonGhost,
      outline: buttonOutline,
    }[variant];

    const sizeClass = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-8 text-base",
      icon: "h-9 w-9 p-0",
    }[size];

    const baseClass = cn(
      "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      variantClass,
      sizeClass,
      className,
    );

    if (animated) {
      const preset = animationPresets[theme];
      return (
        <MotionButton
          ref={ref}
          className={baseClass}
          whileHover={preset.hover}
          whileTap={preset.tap}
          {...(props as any)}
        />
      );
    }

    if (asChild) {
      return <Slot ref={ref} className={baseClass} {...props} />;
    }

    return <button ref={ref} className={baseClass} {...props} />;
  },
);
Button.displayName = "Button";

// ─── Input ────────────────────────────────────────────────────────────────────
// Text always uses foreground token which is guaranteed to contrast background.
// Glassy: white text on glass. Others: foreground on their respective backgrounds.

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  animated?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, animated = false, ...props }, ref) => {
    const { inputClass } = useThemeClasses();

    const baseClass = cn(
      "flex h-10 w-full px-3 py-1 text-sm transition-all",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "disabled:cursor-not-allowed disabled:opacity-50",
      inputClass,
      className,
    );

    if (animated) {
      return (
        <motion.input
          ref={ref}
          type={type}
          className={baseClass}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          {...(props as any)}
        />
      );
    }

    return <input ref={ref} type={type} className={baseClass} {...props} />;
  },
);
Input.displayName = "Input";

// ─── Badge ────────────────────────────────────────────────────────────────────
// Uses badgeClass which always sets appropriate text color for the theme.

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  animated = false,
  children,
  ...props
}) => {
  const { badgeClass, theme } = useThemeClasses();

  const baseClass = cn(
    "inline-flex items-center text-xs font-semibold transition-all px-2.5 py-0.5",
    badgeClass,
    className,
  );

  if (animated) {
    const preset = animationPresets[theme];
    return (
      <motion.div className={baseClass} whileHover={preset.hover}>
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClass} {...props}>
      {children}
    </div>
  );
};

// ─── Spinner ─────────────────────────────────────────────────────────────────

export const Spinner: React.FC<{ size?: "sm" | "md" | "lg"; className?: string }> = ({
  size = "md",
  className,
}) => {
  const sizeMap = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };
  return (
    <motion.div
      className={cn(
        "rounded-full border-2 border-[var(--primary)]/20 border-t-[var(--primary)]",
        sizeMap[size],
        className,
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

export interface AvatarProps {
  src?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  fallback = "?",
  size = "md",
  className,
  animated = false,
}) => {
  const { theme } = useThemeClasses();
  const preset = animationPresets[theme];

  const sizeMap = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
  };

  const inner = src ? (
    <img src={src} alt={fallback} className="w-full h-full object-cover" />
  ) : (
    <span className="font-bold text-[var(--primary-foreground)]">
      {fallback.slice(0, 2).toUpperCase()}
    </span>
  );

  const baseClass = cn(
    "rounded-full overflow-hidden flex items-center justify-center bg-[var(--primary)] shrink-0",
    sizeMap[size],
    className,
  );

  if (animated) {
    return (
      <motion.div className={baseClass} whileHover={preset.hover} whileTap={preset.tap}>
        {inner}
      </motion.div>
    );
  }

  return <div className={baseClass}>{inner}</div>;
};

// ─── Toggle ───────────────────────────────────────────────────────────────────

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  animated?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  animated = true,
  className,
}) => {
  const { theme } = useThemeClasses();

  const thumbVariants = {
    off: { x: 2, scale: 1 },
    on: { x: 22, scale: 1 },
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2",
          checked ? "bg-[var(--primary)]" : "bg-[var(--muted)]",
        )}
      >
        {animated ? (
          <motion.div
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
            variants={thumbVariants}
            animate={checked ? "on" : "off"}
            transition={animationPresets[theme].enter.transition}
          />
        ) : (
          <div
            className={cn(
              "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
              checked ? "translate-x-5" : "translate-x-0.5",
            )}
          />
        )}
      </button>
      {label && <span className="text-sm text-[var(--foreground)]">{label}</span>}
    </div>
  );
};

// ─── Progress ─────────────────────────────────────────────────────────────────

export interface ProgressProps {
  value: number; // 0-100
  label?: string;
  showValue?: boolean;
  animated?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  label,
  showValue = false,
  animated = true,
  className,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const { theme } = useThemeClasses();

  return (
    <div
      className={cn("space-y-1.5", className)}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-sm text-[var(--foreground)]">{label}</span>}
          {showValue && (
            <span className="text-xs text-[var(--muted-foreground)] font-bold">
              {clampedValue}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full h-2 bg-[var(--muted)] overflow-hidden",
          theme === "minimalist"
            ? "rounded-none"
            : theme === "liquid"
              ? "rounded-full"
              : "rounded-full",
        )}
      >
        {animated ? (
          <motion.div
            className="h-full bg-[var(--primary)] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${clampedValue}%` }}
            transition={animationPresets[theme].enter.transition}
          />
        ) : (
          <div
            className="h-full bg-[var(--primary)] rounded-full"
            style={{ width: `${clampedValue}%` }}
          />
        )}
      </div>
    </div>
  );
};

// ─── Tooltip ──────────────────────────────────────────────────────────────────

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, side = "top" }) => {
  const [open, setOpen] = React.useState(false);
  const { theme } = useThemeClasses();

  const sideOffset = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: side === "top" ? 4 : side === "bottom" ? -4 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={animationPresets[theme].scaleIn.transition}
            className={cn(
              "absolute left-1/2 -translate-x-1/2 z-50 px-2.5 py-1 text-xs font-medium whitespace-nowrap pointer-events-none",
              "bg-[var(--foreground)] text-[var(--background)] rounded-lg shadow-lg",
              sideOffset[side],
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
