import React, { useState, useRef } from "react";
import { motion, AnimatePresence, Variants, Transition, TargetAndTransition } from "motion/react";
import { Zap, Layers, Minimize2, Sparkles, Droplets, Play, RefreshCw } from "lucide-react";
import { cn } from "./utils";
import { useChameleon, useThemeClasses } from "./context";
import { ChameleonTheme } from "./context";

// ─── Animation Preset Engine ─────────────────────────────────────────────────
// Each theme has physics-accurate, visually distinct animation presets.
// Components accept animated={true/false} + optional animationVariant

export interface ThemeAnimationPreset {
  name: string;
  description: string;
  icon: React.ElementType;
  // Page / element enter
  enter: {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    exit: TargetAndTransition;
    transition: Transition;
  };
  // Stagger children
  stagger: { container: Variants; item: Variants };
  // Hover / tap
  hover: TargetAndTransition;
  tap: TargetAndTransition;
  // Fade in from bottom
  fadeUp: { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition };
  // Scale in
  scaleIn: { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition };
  // Slide in from side
  slideIn: { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition };
  // Rotate in
  rotateIn: { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition };
  // Bounce
  bounce: { animate: TargetAndTransition; transition: Transition };
  // Pulse
  pulse: { animate: TargetAndTransition; transition: Transition };
  // Attention shake
  shake: { x: number[]; rotate?: number[]; transition: Transition };
}

export const animationPresets: Record<ChameleonTheme, ThemeAnimationPreset> = {
  material: {
    name: "Material Motion",
    description: "Smooth deceleration curves — Material Design standard easing",
    icon: Layers,
    enter: {
      initial: { opacity: 0, y: 24, scale: 0.97 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -16, scale: 0.97 },
      transition: { type: "tween", duration: 0.28, ease: [0.4, 0, 0.2, 1] },
    },
    stagger: {
      container: {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
      },
      item: {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: "tween", duration: 0.25, ease: [0.4, 0, 0.2, 1] },
        },
      },
    },
    hover: { scale: 1.02, y: -2, transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } },
    tap: { scale: 0.97, transition: { duration: 0.1 } },
    fadeUp: {
      initial: { opacity: 0, y: 32 },
      animate: { opacity: 1, y: 0 },
      transition: { type: "tween", duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.85 },
      animate: { opacity: 1, scale: 1 },
      transition: { type: "tween", duration: 0.25, ease: [0.34, 1.56, 0.64, 1] },
    },
    shake: { x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.4, ease: "easeInOut" } },
    slideIn: {
      initial: { opacity: 0, x: -40 },
      animate: { opacity: 1, x: 0 },
      transition: { type: "tween", duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -180, scale: 0.5 },
      animate: { opacity: 1, rotate: 0, scale: 1 },
      transition: { type: "tween", duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
    },
    bounce: {
      animate: { y: [0, -10, 0] },
      transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
    },
    pulse: {
      animate: { scale: [1, 1.05, 1] },
      transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
    },
  },

  simple: {
    name: "Simple Fade",
    description: "Clean, unobtrusive transitions — get out of the way",
    icon: Minimize2,
    enter: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.18, ease: "easeOut" },
    },
    stagger: {
      container: {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } },
      },
      item: {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
      },
    },
    hover: { opacity: 0.85, transition: { duration: 0.12 } },
    tap: { opacity: 0.6, scale: 0.99 },
    fadeUp: {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.22, ease: "easeOut" },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.2, ease: "easeOut" },
    },
    shake: { x: [0, -4, 4, -2, 2, 0], transition: { duration: 0.3 } },
    slideIn: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.2, ease: "easeOut" },
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -90, scale: 0.8 },
      animate: { opacity: 1, rotate: 0, scale: 1 },
      transition: { duration: 0.3, ease: "easeOut" },
    },
    bounce: {
      animate: { y: [0, -8, 0] },
      transition: { duration: 0.5, repeat: Infinity, ease: "linear" },
    },
    pulse: {
      animate: { opacity: [1, 0.7, 1] },
      transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
    },
  },

  minimalist: {
    name: "Snap & Slice",
    description: "Zero-easing instant snaps — precision over decoration",
    icon: Zap,
    enter: {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 8 },
      transition: { duration: 0.12, ease: "linear" },
    },
    stagger: {
      container: {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.04 } },
      },
      item: {
        hidden: { opacity: 0, x: -8 },
        show: { opacity: 1, x: 0, transition: { duration: 0.1, ease: "linear" } },
      },
    },
    hover: { x: 3, transition: { duration: 0.08, ease: "linear" } },
    tap: { scale: 0.99, transition: { duration: 0.05 } },
    fadeUp: {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.1, ease: "linear" },
    },
    scaleIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.08, ease: "linear" },
    },
    shake: { x: [0, -8, 8, -6, 6, 0], transition: { duration: 0.2, ease: "linear" } },
    slideIn: {
      initial: { opacity: 0, x: -16 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.12, ease: "linear" },
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -45, scale: 0.95 },
      animate: { opacity: 1, rotate: 0, scale: 1 },
      transition: { duration: 0.15, ease: "linear" },
    },
    bounce: {
      animate: { y: [0, -6, 0] },
      transition: { duration: 0.4, repeat: Infinity, ease: "linear" },
    },
    pulse: {
      animate: { scale: [1, 1.03, 1] },
      transition: { duration: 1, repeat: Infinity, ease: "linear" },
    },
  },

  glassy: {
    name: "Frosted Morph",
    description: "Blur-in transitions with soft refractive springs",
    icon: Sparkles,
    enter: {
      initial: { opacity: 0, scale: 0.93, filter: "blur(12px)", y: 10 },
      animate: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 },
      exit: { opacity: 0, scale: 1.04, filter: "blur(8px)", y: -8 },
      transition: { type: "spring", stiffness: 280, damping: 22, mass: 0.7 },
    },
    stagger: {
      container: {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
      },
      item: {
        hidden: { opacity: 0, scale: 0.9, filter: "blur(8px)" },
        show: {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transition: { type: "spring", stiffness: 280, damping: 22 },
        },
      },
    },
    hover: {
      scale: 1.04,
      y: -4,
      transition: { type: "spring", stiffness: 400, damping: 15 },
    },
    tap: { scale: 0.96, transition: { type: "spring", stiffness: 500, damping: 20 } },
    fadeUp: {
      initial: { opacity: 0, y: 20, filter: "blur(8px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8, filter: "blur(16px)" },
      animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
      transition: { type: "spring", stiffness: 300, damping: 18 },
    },
    shake: {
      x: [0, -8, 8, -6, 6, -3, 3, 0],
      transition: { type: "spring", stiffness: 400, damping: 10, duration: 0.6 },
    },
    slideIn: {
      initial: { opacity: 0, x: -60, filter: "blur(12px)" },
      animate: { opacity: 1, x: 0, filter: "blur(0px)" },
      transition: { type: "spring", stiffness: 250, damping: 20 },
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -360, scale: 0.3, filter: "blur(20px)" },
      animate: { opacity: 1, rotate: 0, scale: 1, filter: "blur(0px)" },
      transition: { type: "spring", stiffness: 200, damping: 18 },
    },
    bounce: {
      animate: { y: [0, -15, 0], scale: [1, 0.98, 1] },
      transition: { type: "spring", stiffness: 300, damping: 10, repeat: Infinity, duration: 1 },
    },
    pulse: {
      animate: { scale: [1, 1.08, 1], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] },
      transition: { type: "spring", stiffness: 200, damping: 15, repeat: Infinity, duration: 1.5 },
    },
  },

  liquid: {
    name: "Liquid Bounce",
    description: "Organic, morphing springs — like water finding its shape",
    icon: Droplets,
    enter: {
      initial: { opacity: 0, y: 60, scale: 0.82, rotate: -4 },
      animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
      exit: { opacity: 0, y: -40, scale: 0.88, rotate: 3 },
      transition: { type: "spring", stiffness: 160, damping: 14, mass: 0.9 },
    },
    stagger: {
      container: {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
      },
      item: {
        hidden: { opacity: 0, y: 40, scale: 0.85, rotate: -3 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          transition: { type: "spring", stiffness: 180, damping: 14 },
        },
      },
    },
    hover: {
      y: -8,
      scale: 1.06,
      rotate: 1,
      transition: { type: "spring", stiffness: 300, damping: 12 },
    },
    tap: {
      scale: 0.93,
      rotate: -2,
      transition: { type: "spring", stiffness: 400, damping: 15 },
    },
    fadeUp: {
      initial: { opacity: 0, y: 50, scale: 0.88, rotate: -2 },
      animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
      transition: { type: "spring", stiffness: 150, damping: 14 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.6, rotate: -8 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      transition: { type: "spring", stiffness: 200, damping: 12 },
    },
    shake: {
      x: [0, -12, 12, -9, 9, -5, 5, 0],
      rotate: [0, -3, 3, -2, 2, 0],
      transition: { type: "spring", stiffness: 300, damping: 8, duration: 0.8 },
    },
    slideIn: {
      initial: { opacity: 0, x: -80, rotate: -5, scale: 0.9 },
      animate: { opacity: 1, x: 0, rotate: 0, scale: 1 },
      transition: { type: "spring", stiffness: 140, damping: 16 },
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -540, scale: 0.2, y: 50 },
      animate: { opacity: 1, rotate: 0, scale: 1, y: 0 },
      transition: { type: "spring", stiffness: 150, damping: 14 },
    },
    bounce: {
      animate: {
        y: [0, -20, 0],
        scale: [1, 0.95, 1],
        rotate: [0, -2, 2, 0],
      },
      transition: { type: "spring", stiffness: 250, damping: 8, repeat: Infinity, duration: 1.2 },
    },
    pulse: {
      animate: {
        scale: [1, 1.12, 1],
        rotate: [0, 2, -2, 0],
      },
      transition: { type: "spring", stiffness: 180, damping: 12, repeat: Infinity, duration: 1.8 },
    },
  },
};

// ─── useAnimation hook ───────────────────────────────────────────────────────
// Get the animation preset for the current theme

export function useAnimation() {
  const { theme } = useChameleon();
  return animationPresets[theme];
}

// ─── Animated Wrapper ────────────────────────────────────────────────────────
// Wrap any content with theme-specific enter animation

interface AnimatedProps {
  children: React.ReactNode;
  type?: "enter" | "fadeUp" | "scaleIn" | "slideIn" | "rotateIn" | "bounce" | "pulse";
  delay?: number;
  className?: string;
  disabled?: boolean;
}

export const Animated: React.FC<AnimatedProps> = ({
  children,
  type = "enter",
  delay = 0,
  className,
  disabled = false,
}) => {
  const preset = useAnimation();
  const anim = preset[type];

  if (disabled) return <>{children}</>;

  // Handle infinite animations (bounce, pulse)
  if (type === "bounce" || type === "pulse") {
    return (
      <motion.div
        animate={anim.animate}
        transition={{ ...anim.transition, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // PERF: Use whileInView + once to only animate when scrolled into view,
  // and only animate once (not on every scroll back).
  // This prevents 20+ motion.div elements all animating simultaneously on mount.
  return (
    <motion.div
      initial={(anim as any).initial}
      whileInView={anim.animate}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ ...anim.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── AnimatedList ────────────────────────────────────────────────────────────
// Staggered list animation

interface AnimatedListProps {
  children: React.ReactNode[];
  className?: string;
  disabled?: boolean;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  children,
  className,
  disabled = false,
}) => {
  const preset = useAnimation();

  if (disabled) return <div className={className}>{children}</div>;

  // PERF: Use whileInView + once so staggered lists only animate when scrolled into view
  return (
    <motion.div
      className={className}
      variants={preset.stagger.container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={preset.stagger.item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// ─── AnimatedPage ────────────────────────────────────────────────────────────
// Page-level transition wrapper using AnimatePresence

interface AnimatedPageProps {
  children: React.ReactNode;
  pageKey: string;
  className?: string;
}

export const AnimatedPage: React.FC<AnimatedPageProps> = ({ children, pageKey, className }) => {
  const preset = useAnimation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={preset.enter.initial}
        animate={preset.enter.animate}
        exit={preset.enter.exit}
        transition={preset.enter.transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ─── InteractiveCard ────────────────────────────────────────────────────────
// Card with hover/tap animations, auto-theme-aware

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  onClick?: () => void;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className,
  animated = true,
  onClick,
}) => {
  const preset = useAnimation();
  const { cardClass } = useThemeClasses();

  if (!animated) {
    return (
      <div className={cn(cardClass, "p-6", className)} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(cardClass, "p-6 cursor-pointer", className)}
      whileHover={preset.hover}
      whileTap={preset.tap}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

// ─── AnimationPresets Workshop Page ─────────────────────────────────────────

interface DemoBoxProps {
  themeName: ChameleonTheme;
  preset: ThemeAnimationPreset;
  isCurrent: boolean;
}

const DemoBox: React.FC<DemoBoxProps> = ({ themeName, preset, isCurrent }) => {
  const [key, setKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border)] overflow-hidden",
        isCurrent && "ring-2 ring-[var(--primary)]",
      )}
    >
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
            <preset.icon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--foreground)]">{preset.name}</p>
            <p className="text-[11px] text-[var(--muted-foreground)]">{preset.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isCurrent && (
            <span className="text-[10px] font-black uppercase tracking-widest bg-[var(--primary)] text-[var(--primary-foreground)] px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
          <button
            onClick={() => setKey((k) => k + 1)}
            className="w-7 h-7 rounded-lg bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="p-6 bg-[var(--muted)]/30 min-h-[140px] flex items-center justify-center gap-6 flex-wrap">
        {/* Enter animation */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-widest font-bold">
            Enter
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={`enter-${key}`}
              initial={preset.enter.initial}
              animate={preset.enter.animate}
              exit={preset.enter.exit}
              transition={preset.enter.transition}
              className="px-5 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-bold text-sm"
            >
              {themeName}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hover animation */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-widest font-bold">
            Hover
          </p>
          <motion.div
            whileHover={preset.hover}
            whileTap={preset.tap}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="px-5 py-2.5 bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] rounded-xl font-bold text-sm cursor-pointer shadow-sm"
          >
            {isHovered ? "✓ Active" : "Hover me"}
          </motion.div>
        </div>

        {/* Stagger animation */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-widest font-bold">
            Stagger
          </p>
          <motion.div
            key={`stagger-${key}`}
            variants={preset.stagger.container}
            initial="hidden"
            animate="show"
            className="flex gap-1.5"
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={preset.stagger.item}
                className="w-8 h-8 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] text-xs font-black"
              >
                {i}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Code snippet */}
      <div className="p-4 bg-slate-950/90 text-slate-300 font-mono text-[10px] leading-relaxed border-t border-slate-800">
        <pre className="overflow-x-auto whitespace-pre-wrap">{`// ${preset.name}
transition: ${JSON.stringify(preset.enter.transition, null, 0)}`}</pre>
      </div>
    </div>
  );
};

export const AnimationPresets: React.FC<{ currentTheme: ChameleonTheme }> = ({ currentTheme }) => {
  const { cardClass, textPrimary, textMuted } = useThemeClasses();

  return (
    <div className="space-y-8 pb-20">
      <div className="space-y-1">
        <h2 className={cn("text-3xl font-black tracking-tight", textPrimary)}>Animation Presets</h2>
        <p className={cn("text-base", textMuted)}>
          Each theme has hand-tuned physics. Use the{" "}
          <code className="font-mono bg-[var(--muted)] px-1.5 py-0.5 rounded text-xs">
            animated
          </code>{" "}
          prop on any component to opt in.
        </p>
      </div>

      {/* Usage Guide */}
      <div className={cn(cardClass, "p-6")}>
        <p className="text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
          Usage
        </p>
        <div className="bg-slate-950 text-slate-300 p-5 rounded-xl font-mono text-xs leading-relaxed space-y-3">
          <div>
            <span className="text-slate-500">
              // Option 1: animated prop on any Chameleon component
            </span>
            <pre className="text-emerald-400 mt-1">{`<Button animated>Click me</Button>
<Card animated>Content</Card>`}</pre>
          </div>
          <div>
            <span className="text-slate-500">// Option 2: Animated wrapper</span>
            <pre className="text-blue-400 mt-1">{`import { Animated, AnimatedList } from "chameleon/animations";

<Animated type="fadeUp" delay={0.1}>
  <MyComponent />
</Animated>`}</pre>
          </div>
          <div>
            <span className="text-slate-500">// Option 3: raw preset for motion.div</span>
            <pre className="text-purple-400 mt-1">{`import { useAnimation } from "chameleon/animations";

const preset = useAnimation();
<motion.div {...preset.enter} whileHover={preset.hover} />`}</pre>
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        {(Object.entries(animationPresets) as [ChameleonTheme, ThemeAnimationPreset][]).map(
          ([key, preset]) => (
            <DemoBox key={key} themeName={key} preset={preset} isCurrent={key === currentTheme} />
          ),
        )}
      </div>
    </div>
  );
};
