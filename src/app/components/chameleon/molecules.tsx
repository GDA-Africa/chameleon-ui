import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { X, TrendingUp, TrendingDown, Check } from "lucide-react";
import { cn } from "./utils";
import { useThemeClasses, useChameleon } from "./context";
import { animationPresets } from "./animations";

// ─── Card ─────────────────────────────────────────────────────────────────────
// cardClass guarantees: bg-[card] with text-[card-foreground] which always contrasts.

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
  elevation?: 0 | 1 | 2 | 3; // material design elevation hint
}

export const Card: React.FC<CardProps> = ({ className, animated = false, elevation, ...props }) => {
  const { cardClass, theme } = useThemeClasses();

  // Material theme uses elevation shadows
  const materialElevation =
    theme === "material" && elevation !== undefined
      ? ["shadow-none", "shadow-md", "shadow-xl", "shadow-2xl"][elevation]
      : "";

  const finalClass = cn(cardClass, materialElevation, className);

  if (animated) {
    const preset = animationPresets[theme];
    return (
      <motion.div
        className={finalClass}
        whileHover={preset.hover}
        whileTap={preset.tap}
        {...(props as any)}
      />
    );
  }

  return <div className={finalClass} {...props} />;
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("flex flex-col space-y-1.5 p-4 sm:p-6", className)} {...props} />;

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h3
    className={cn(
      "font-semibold leading-none tracking-tight text-[var(--card-foreground)]",
      className,
    )}
    {...props}
  />
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => <p className={cn("text-sm text-[var(--muted-foreground)]", className)} {...props} />;

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("p-4 sm:p-6 pt-0", className)} {...props} />;

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("p-6 pt-0 flex items-center", className)} {...props} />;

// ─── Tabs ─────────────────────────────────────────────────────────────────────

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { theme, mode } = useThemeClasses();

  const listClass = {
    material: "flex flex-wrap border-b border-[var(--border)] bg-transparent gap-0 w-full",
    simple: "flex flex-wrap bg-[var(--muted)] rounded-lg p-1 gap-1",
    minimalist: "flex flex-wrap border-b border-[var(--border)] bg-transparent gap-0",
    glassy: "flex flex-wrap bg-white/8 rounded-2xl p-1.5 gap-1 border border-white/10",
    liquid: "flex flex-wrap bg-[var(--muted)]/60 rounded-2xl p-1.5 gap-1",
  }[theme];

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn("inline-flex items-center", listClass, className)}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { theme } = useThemeClasses();

  const triggerClass = {
    material: cn(
      "px-4 py-3 text-sm font-medium border-b-2 border-transparent -mb-px transition-colors",
      "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
      "data-[state=active]:border-[var(--primary)] data-[state=active]:text-[var(--primary)]",
    ),
    simple: cn(
      "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
      "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
      "data-[state=active]:bg-[var(--card)] data-[state=active]:text-[var(--foreground)] data-[state=active]:shadow-sm",
    ),
    minimalist: cn(
      "px-4 py-2 text-sm border-b-2 border-transparent transition-colors",
      "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
      "data-[state=active]:border-[var(--foreground)] data-[state=active]:text-[var(--foreground)]",
    ),
    glassy: cn(
      "px-4 py-2 text-sm font-medium rounded-full transition-all",
      "text-white/70 hover:text-white",
      "data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:backdrop-blur-sm",
    ),
    liquid: cn(
      "px-4 py-2 text-sm font-medium rounded-full transition-all",
      "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-violet-500/30",
    ),
  }[theme];

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap",
        "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        triggerClass,
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// ─── Dialog / Modal ───────────────────────────────────────────────────────────

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { animated?: boolean }
>(({ className, children, animated = true, ...props }, ref) => {
  const { theme, cardClass } = useThemeClasses();
  const preset = animationPresets[theme];

  const overlayClass = {
    material: "bg-black/50",
    simple: "bg-black/40 backdrop-blur-sm",
    minimalist: "bg-black/80",
    glassy: "bg-black/40 backdrop-blur-sm",
    liquid: "bg-black/30 backdrop-blur-md",
  }[theme];

  const contentClass = {
    material: cn(cardClass, "rounded-sm"),
    simple: cn(cardClass),
    minimalist:
      "bg-[var(--card)] text-[var(--card-foreground)] border-0 border-l-4 border-[var(--foreground)] rounded-none",
    glassy: "bg-white/10 backdrop-blur-md border border-white/25 text-white rounded-3xl shadow-2xl",
    liquid: cn(cardClass, "rounded-[2rem]"),
  }[theme];

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          overlayClass,
        )}
      />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-[calc(100%-2rem)] sm:w-full max-w-lg translate-x-[-50%] translate-y-[-50%] p-5 sm:p-6 shadow-2xl",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          contentClass,
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
          <X className="h-4 w-4 text-[var(--card-foreground)]" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("flex flex-col space-y-1.5 mb-4", className)} {...props} />;

export const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h2 className={cn("text-lg font-semibold text-[var(--card-foreground)]", className)} {...props} />
);

// ─── Stat Card ────────────────────────────────────────────────────────────────

export const StatCard = ({
  label,
  value,
  trend,
  trendValue,
  icon: Icon,
  className,
  animated = false,
}: {
  label: string;
  value: string;
  trend?: "up" | "down";
  trendValue?: string;
  icon?: React.ElementType;
  className?: string;
  animated?: boolean;
}) => {
  const { cardClass, theme } = useThemeClasses();
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;

  const inner = (
    <>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
            {label}
          </p>
          <h4 className="text-3xl font-extrabold text-[var(--card-foreground)]">{value}</h4>
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {trend && trendValue && (
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-bold w-fit px-2 py-0.5 rounded-full mt-2",
            trend === "up" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600",
          )}
        >
          <TrendIcon className="w-3 h-3" />
          {trendValue}
        </div>
      )}
    </>
  );

  if (animated) {
    const preset = animationPresets[theme];
    return (
      <motion.div className={cn(cardClass, "p-4 sm:p-6 space-y-2", className)} whileHover={preset.hover}>
        {inner}
      </motion.div>
    );
  }

  return <div className={cn(cardClass, "p-4 sm:p-6 space-y-2", className)}>{inner}</div>;
};

// ─── Pricing Card ─────────────────────────────────────────────────────────────

export const PricingCard = ({
  tier,
  price,
  features,
  recommended,
  className,
  animated = false,
}: {
  tier: string;
  price: string;
  features: string[];
  recommended?: boolean;
  className?: string;
  animated?: boolean;
}) => {
  const { cardClass, buttonPrimary, theme } = useThemeClasses();

  const inner = (
    <>
      {recommended && (
        <div className="absolute top-0 right-8 -translate-y-1/2">
          <span className="bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
            Recommended
          </span>
        </div>
      )}
      <div className="space-y-2 mb-6">
        <h4 className="text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)]">
          {tier}
        </h4>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-[var(--card-foreground)]">{price}</span>
          <span className="text-[var(--muted-foreground)] text-sm">/mo</span>
        </div>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f, i) => (
          <li key={i} className="text-sm flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-[var(--primary)]/15 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-[var(--primary)]" />
            </div>
            <span className="text-[var(--card-foreground)]/80">{f}</span>
          </li>
        ))}
      </ul>
      <button className={cn("w-full py-2.5 px-4 font-bold text-sm transition-all", buttonPrimary)}>
        Get Started
      </button>
    </>
  );

  if (animated) {
    const preset = animationPresets[theme];
    return (
      <motion.div
        className={cn(
          cardClass,
          "relative flex flex-col p-5 sm:p-8",
          recommended && "ring-2 ring-[var(--primary)]",
          className,
        )}
        whileHover={preset.hover}
      >
        {inner}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        cardClass,
        "relative flex flex-col p-5 sm:p-8",
        recommended && "ring-2 ring-[var(--primary)]",
        className,
      )}
    >
      {inner}
    </div>
  );
};

// ─── Alert ────────────────────────────────────────────────────────────────────

export type AlertVariant = "info" | "success" | "warning" | "error";

export const Alert: React.FC<{
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}> = ({ variant = "info", title, children, className, animated = false }) => {
  const { theme } = useThemeClasses();

  const variantConfig = {
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-700 dark:text-blue-400",
      icon: "ℹ",
    },
    success: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-700 dark:text-emerald-400",
      icon: "✓",
    },
    warning: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-700 dark:text-amber-400",
      icon: "⚠",
    },
    error: {
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
      text: "text-rose-700 dark:text-rose-400",
      icon: "✕",
    },
  }[variant];

  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated
    ? {
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        transition: animationPresets[theme].enter.transition,
      }
    : {};

  return (
    <Wrapper
      className={cn(
        "flex gap-3 p-4 rounded-xl border text-sm",
        variantConfig.bg,
        variantConfig.border,
        theme === "minimalist" && "rounded-none border-l-4 border-t-0 border-r-0 border-b-0",
        className,
      )}
      {...(wrapperProps as any)}
    >
      <span className={cn("font-black text-base shrink-0", variantConfig.text)}>
        {variantConfig.icon}
      </span>
      <div className="space-y-0.5">
        {title && <p className={cn("font-bold text-sm", variantConfig.text)}>{title}</p>}
        <div className="text-[var(--foreground)]/80 text-sm">{children}</div>
      </div>
    </Wrapper>
  );
};

// ─── Separator ────────────────────────────────────────────────────────────────

export const Separator: React.FC<{
  orientation?: "horizontal" | "vertical";
  className?: string;
}> = ({ orientation = "horizontal", className }) => (
  <div
    role="separator"
    className={cn(
      "bg-[var(--border)] shrink-0",
      orientation === "horizontal" ? "h-px w-full my-2" : "w-px h-full mx-2",
      className,
    )}
  />
);

// ─── Breadcrumb ────────────────────────────────────────────────────────────────

export const Breadcrumb: React.FC<{
  items: { label: string; href?: string }[];
  className?: string;
}> = ({ items, className }) => {
  const { textMuted, textPrimary } = useThemeClasses();

  return (
    <nav className={cn("flex items-center gap-2 text-sm", className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className={cn("text-xs", textMuted)}>/</span>}
          {item.href ? (
            <a
              href={item.href}
              className={cn("hover:text-[var(--primary)] transition-colors font-medium", textMuted)}
            >
              {item.label}
            </a>
          ) : (
            <span className={cn("font-bold", index === items.length - 1 ? textPrimary : textMuted)}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export const Select: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}> = ({ value, onChange, options, placeholder, className }) => {
  const { inputClass } = useThemeClasses();

  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(inputClass, "cursor-pointer", className)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

// ─── Textarea ──────────────────────────────────────────────────────────────────

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  const { inputClass } = useThemeClasses();

  return <textarea className={cn(inputClass, "min-h-[100px] resize-y", className)} {...props} />;
};
