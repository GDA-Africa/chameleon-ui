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
          {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
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
          {...(props as React.ComponentPropsWithoutRef<typeof motion.input>)}
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

// ─── DatePicker ───────────────────────────────────────────────────────────────
/**
 * @component DatePicker
 * @category Atom
 * @complexity 3
 *
 * @description
 * Accessible date-picker supporting single date selection and date-range selection.
 * Calendar popup is keyboard navigable, fully theme-aware, and works in both
 * light and dark modes.
 *
 * @example-single
 * ```tsx
 * <DatePicker value={date} onChange={setDate} placeholder="Select date" />
 * ```
 *
 * @example-range
 * ```tsx
 * <DatePicker
 *   mode="range"
 *   rangeValue={range}
 *   onRangeChange={setRange}
 *   placeholder="Select date range"
 * />
 * ```
 */

export type DateRange = { start: Date | null; end: Date | null };

export interface DatePickerProps {
  /** Selection mode */
  mode?: "single" | "range";
  /** Selected date (single mode) */
  value?: Date | null;
  /** Callback for single mode */
  onChange?: (date: Date | null) => void;
  /** Selected range (range mode) */
  rangeValue?: DateRange;
  /** Callback for range mode */
  onRangeChange?: (range: DateRange) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isInRange(day: Date, range: DateRange) {
  if (!range.start || !range.end) return false;
  const t = day.getTime();
  return t > range.start.getTime() && t < range.end.getTime();
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export const DatePicker: React.FC<DatePickerProps> = ({
  mode = "single",
  value = null,
  onChange,
  rangeValue,
  onRangeChange,
  minDate,
  maxDate,
  placeholder = "Select date",
  disabled = false,
  className,
}) => {
  const { theme } = useThemeClasses();
  const [open, setOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState<Date>(
    (mode === "single" ? value : rangeValue?.start) ?? new Date(),
  );
  const [rangePick, setRangePick] = React.useState<"start" | "end">("start");
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Build calendar grid
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = startOfMonth(viewDate).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];
  // Pad to full rows
  while (cells.length % 7 !== 0) cells.push(null);

  const isDisabled = (day: Date) => {
    if (minDate && day < minDate) return true;
    if (maxDate && day > maxDate) return true;
    return false;
  };

  const handleDayClick = (day: Date) => {
    if (isDisabled(day)) return;
    if (mode === "single") {
      onChange?.(day);
      setOpen(false);
    } else {
      if (rangePick === "start") {
        onRangeChange?.({ start: day, end: null });
        setRangePick("end");
      } else {
        const r = rangeValue ?? { start: null, end: null };
        if (r.start && day < r.start) {
          onRangeChange?.({ start: day, end: r.start });
        } else {
          onRangeChange?.({ start: r.start, end: day });
        }
        setRangePick("start");
        setOpen(false);
      }
    }
  };

  const formatDisplay = () => {
    if (mode === "single") {
      return value ? value.toLocaleDateString() : placeholder;
    }
    const r = rangeValue;
    if (!r?.start) return placeholder;
    if (!r.end) return `${r.start.toLocaleDateString()} → …`;
    return `${r.start.toLocaleDateString()} → ${r.end.toLocaleDateString()}`;
  };

  const triggerClass = {
    material: "h-10 px-3 text-sm rounded-sm border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-sm hover:shadow-md transition-shadow",
    simple: "h-10 px-3 text-sm rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors",
    minimalist: "h-10 px-3 text-sm rounded-none border-b-2 border-[var(--border)] bg-transparent text-[var(--foreground)] hover:border-[var(--primary)] transition-colors",
    glassy: "h-10 px-3 text-sm rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-[var(--foreground)] hover:bg-white/20 transition-colors",
    liquid: "h-10 px-3 text-sm rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors",
  }[theme];

  const popupClass = {
    material: "bg-[var(--card)] border border-[var(--border)] shadow-xl rounded-sm",
    simple: "bg-[var(--card)] border border-[var(--border)] shadow-lg rounded-lg",
    minimalist: "bg-[var(--card)] border border-[var(--border)] shadow-md rounded-none",
    glassy: "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl",
    liquid: "bg-[var(--card)] border border-[var(--border)] shadow-xl rounded-3xl",
  }[theme];

  const dayBase = "w-8 h-8 text-xs flex items-center justify-center transition-all select-none";
  const dayShape = {
    material: "rounded-sm",
    simple: "rounded-md",
    minimalist: "rounded-none",
    glassy: "rounded-lg",
    liquid: "rounded-full",
  }[theme];

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(v => !v)}
        className={cn(
          "inline-flex items-center gap-2 w-full cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          triggerClass,
        )}
      >
        <svg className="w-4 h-4 text-[var(--muted-foreground)] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className={value || rangeValue?.start ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}>
          {formatDisplay()}
        </span>
      </button>

      {/* Calendar popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={animationPresets[theme].scaleIn.transition}
            className={cn("absolute z-50 mt-1 p-3 w-72", popupClass)}
          >
            {/* Month nav */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month - 1, 1))}
                className="p-1 rounded hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors"
                aria-label="Previous month"
              >
                ‹
              </button>
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {MONTHS[month]} {year}
              </span>
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month + 1, 1))}
                className="p-1 rounded hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors"
                aria-label="Next month"
              >
                ›
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAYS.map(d => (
                <div key={d} className="text-center text-xs font-medium text-[var(--muted-foreground)] py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {cells.map((day, i) => {
                if (!day) return <div key={i} />;

                const isSelected =
                  mode === "single"
                    ? value != null && isSameDay(day, value)
                    : (rangeValue?.start != null && isSameDay(day, rangeValue.start)) ||
                      (rangeValue?.end != null && isSameDay(day, rangeValue.end));

                const inRange = mode === "range" && rangeValue != null && isInRange(day, rangeValue);
                const dis = isDisabled(day);
                const isToday = isSameDay(day, new Date());

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={dis}
                    onClick={() => handleDayClick(day)}
                    className={cn(
                      dayBase,
                      dayShape,
                      "cursor-pointer",
                      dis && "opacity-30 cursor-not-allowed",
                      !dis && !isSelected && !inRange && "hover:bg-[var(--muted)] text-[var(--foreground)]",
                      isToday && !isSelected && "font-bold text-[var(--primary)]",
                      inRange && "bg-[var(--primary)]/15 text-[var(--foreground)] rounded-none",
                      isSelected && "bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold",
                    )}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Range hint */}
            {mode === "range" && (
              <p className="mt-2 text-[10px] text-center text-[var(--muted-foreground)]">
                {rangePick === "start" ? "Click a start date" : "Click an end date"}
              </p>
            )}

            {/* Clear */}
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (mode === "single") onChange?.(null);
                  else { onRangeChange?.({ start: null, end: null }); setRangePick("start"); }
                  setOpen(false);
                }}
                className="text-[10px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
DatePicker.displayName = "DatePicker";
