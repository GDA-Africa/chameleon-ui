import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from "react";

export type ChameleonTheme = "material" | "simple" | "minimalist" | "glassy" | "liquid";
export type ChameleonMode = "light" | "dark";
export type ChameleonLang = "en" | "es" | "fr";

interface ThemeContextType {
  theme: ChameleonTheme;
  setTheme: (theme: ChameleonTheme) => void;
  mode: ChameleonMode;
  setMode: (mode: ChameleonMode) => void;
  lang: ChameleonLang;
  setLang: (lang: ChameleonLang) => void;
  // Intensity controls (0-100)
  glassyIntensity: number;
  setGlassyIntensity: (intensity: number) => void;
  liquidIntensity: number;
  setLiquidIntensity: (intensity: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ─── Theme Token Maps ────────────────────────────────────────────────────────
// Each token guarantees: foreground always contrasts background, primary-foreground always contrasts primary

const themeTokens: Record<
  ChameleonTheme,
  Record<ChameleonMode, React.CSSProperties & Record<string, string>>
> = {
  material: {
    light: {
      "--primary": "#6200ee",
      "--primary-foreground": "#ffffff",
      "--secondary": "#03dac6",
      "--secondary-foreground": "#000000",
      "--background": "#fafafa",
      "--foreground": "#1a1a1a",
      "--card": "#ffffff",
      "--card-foreground": "#1a1a1a",
      "--muted": "#f0f0f0",
      "--muted-foreground": "#616161",
      "--border": "#e0e0e0",
      "--accent": "#f3e5ff",
      "--accent-foreground": "#4a148c",
      "--ring": "#6200ee",
      "--radius": "0.25rem",
    },
    dark: {
      "--primary": "#bb86fc",
      "--primary-foreground": "#000000",
      "--secondary": "#03dac6",
      "--secondary-foreground": "#000000",
      "--background": "#121212",
      "--foreground": "#f3f3f3",
      "--card": "#1e1e1e",
      "--card-foreground": "#f3f3f3",
      "--muted": "#2c2c2c",
      "--muted-foreground": "#ababab",
      "--border": "#333333",
      "--accent": "#3700b3",
      "--accent-foreground": "#e9ddff",
      "--ring": "#bb86fc",
      "--radius": "0.25rem",
    },
  },
  simple: {
    light: {
      "--primary": "#0f172a",
      "--primary-foreground": "#ffffff",
      "--secondary": "#f1f5f9",
      "--secondary-foreground": "#0f172a",
      "--background": "#ffffff",
      "--foreground": "#0f172a",
      "--card": "#ffffff",
      "--card-foreground": "#0f172a",
      "--muted": "#f1f5f9",
      "--muted-foreground": "#64748b",
      "--border": "#e2e8f0",
      "--accent": "#f1f5f9",
      "--accent-foreground": "#0f172a",
      "--ring": "#94a3b8",
      "--radius": "0.5rem",
    },
    dark: {
      "--primary": "#f8fafc",
      "--primary-foreground": "#020617",
      "--secondary": "#1e293b",
      "--secondary-foreground": "#f8fafc",
      "--background": "#020617",
      "--foreground": "#f8fafc",
      "--card": "#0f172a",
      "--card-foreground": "#f8fafc",
      "--muted": "#1e293b",
      "--muted-foreground": "#94a3b8",
      "--border": "#1e293b",
      "--accent": "#1e293b",
      "--accent-foreground": "#f8fafc",
      "--ring": "#475569",
      "--radius": "0.5rem",
    },
  },
  minimalist: {
    light: {
      "--primary": "#000000",
      "--primary-foreground": "#ffffff",
      "--secondary": "#ffffff",
      "--secondary-foreground": "#000000",
      "--background": "#ffffff",
      "--foreground": "#000000",
      "--card": "#ffffff",
      "--card-foreground": "#000000",
      "--muted": "#f9f9f9",
      "--muted-foreground": "#737373",
      "--border": "#e5e5e5",
      "--accent": "#f5f5f5",
      "--accent-foreground": "#000000",
      "--ring": "#000000",
      "--radius": "0px",
    },
    dark: {
      "--primary": "#ffffff",
      "--primary-foreground": "#000000",
      "--secondary": "#1a1a1a",
      "--secondary-foreground": "#ffffff",
      "--background": "#000000",
      "--foreground": "#ffffff",
      "--card": "#0a0a0a",
      "--card-foreground": "#ffffff",
      "--muted": "#111111",
      "--muted-foreground": "#a3a3a3",
      "--border": "#262626",
      "--accent": "#1a1a1a",
      "--accent-foreground": "#ffffff",
      "--ring": "#ffffff",
      "--radius": "0px",
    },
  },
  glassy: {
    light: {
      "--primary": "#7c3aed",
      "--primary-foreground": "#ffffff",
      "--secondary": "rgba(124,58,237,0.15)",
      "--secondary-foreground": "#5b21b6",
      "--background": "transparent",
      "--foreground": "#2d1b69", // Darker for better contrast on light orbs
      "--card": "rgba(255,255,255,0.75)", // Much more opaque for readability
      "--card-foreground": "#2d1b69", // Dark text on light cards
      "--muted": "rgba(255,255,255,0.5)",
      "--muted-foreground": "#5b21b6", // Purple instead of transparent white
      "--border": "rgba(124,58,237,0.25)",
      "--accent": "rgba(255,255,255,0.6)",
      "--accent-foreground": "#5b21b6",
      "--ring": "rgba(124,58,237,0.4)",
      "--radius": "1rem",
      "--glass-blur": "20px",
    },
    dark: {
      "--primary": "#a78bfa",
      "--primary-foreground": "#1a0533",
      "--secondary": "rgba(255,255,255,0.08)",
      "--secondary-foreground": "#ffffff",
      "--background": "transparent",
      "--foreground": "#f0e6ff",
      "--card": "rgba(255,255,255,0.06)",
      "--card-foreground": "#f0e6ff",
      "--muted": "rgba(255,255,255,0.05)",
      "--muted-foreground": "rgba(240,230,255,0.55)",
      "--border": "rgba(255,255,255,0.1)",
      "--accent": "rgba(167,139,250,0.15)",
      "--accent-foreground": "#e9d5ff",
      "--ring": "rgba(167,139,250,0.5)",
      "--radius": "1rem",
      "--glass-blur": "24px",
    },
  },
  liquid: {
    light: {
      "--primary": "#7c3aed",
      "--primary-foreground": "#ffffff",
      "--secondary": "#c4b5fd",
      "--secondary-foreground": "#2e1065",
      "--background": "transparent",
      "--foreground": "#1e1b4b",
      "--card": "rgba(255,255,255,0.88)",
      "--card-foreground": "#1e1b4b",
      "--muted": "rgba(237,233,254,0.7)",
      "--muted-foreground": "#5b21b6",
      "--border": "rgba(167,139,250,0.3)",
      "--accent": "#ede9fe",
      "--accent-foreground": "#4c1d95",
      "--ring": "#7c3aed",
      "--radius": "1.5rem",
    },
    dark: {
      "--primary": "#a78bfa",
      "--primary-foreground": "#0f0a1e",
      "--secondary": "#4c1d95",
      "--secondary-foreground": "#e9d5ff",
      "--background": "transparent",
      "--foreground": "#ede9fe",
      "--card": "rgba(30,20,60,0.8)",
      "--card-foreground": "#ede9fe",
      "--muted": "rgba(76,29,149,0.3)",
      "--muted-foreground": "#c4b5fd",
      "--border": "rgba(167,139,250,0.2)",
      "--accent": "rgba(76,29,149,0.5)",
      "--accent-foreground": "#e9d5ff",
      "--ring": "#a78bfa",
      "--radius": "1.5rem",
    },
  },
};

// ─── Theme Ambient Backgrounds ───────────────────────────────────────────────

const GlassyBackground: React.FC<{ mode: ChameleonMode; intensity: number }> = ({
  mode,
  intensity,
}) => {
  // PERF: No filter:blur — uses box-shadow for glow effect (composited, no paint)
  const spreadSize = 80 + (intensity / 100) * 40; // 80-120px spread
  const baseOpacity = 0.1 + (intensity / 100) * 0.08;

  const orbs =
    mode === "light"
      ? [
          {
            x: "12%",
            y: "18%",
            size: 8,
            color: "168,85,247",
            opacity: baseOpacity * 1.2,
            delay: "0s",
          },
          { x: "72%", y: "12%", size: 8, color: "59,130,246", opacity: baseOpacity, delay: "-6s" },
          {
            x: "48%",
            y: "62%",
            size: 8,
            color: "236,72,153",
            opacity: baseOpacity * 0.8,
            delay: "-12s",
          },
        ]
      : [
          {
            x: "15%",
            y: "15%",
            size: 8,
            color: "124,58,237",
            opacity: baseOpacity * 1.2,
            delay: "0s",
          },
          { x: "75%", y: "10%", size: 8, color: "29,78,216", opacity: baseOpacity, delay: "-6s" },
          {
            x: "45%",
            y: "65%",
            size: 8,
            color: "190,24,93",
            opacity: baseOpacity * 0.9,
            delay: "-12s",
          },
        ];

  return (
    <div
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none"
      style={{ contain: "strict" }}
    >
      <div className={`absolute inset-0 ${mode === "dark" ? "bg-[#0d0a1a]" : "bg-[#e5dbff]"}`} />

      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full chameleon-glassy-orb"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: "transparent",
            boxShadow: `0 0 ${spreadSize}px ${spreadSize}px rgba(${orb.color},${orb.opacity})`,
            transform: "translate(-50%, -50%) translateZ(0)",
            animationDelay: orb.delay,
            animationDuration: `${22 + i * 4}s`,
          }}
        />
      ))}

      <div
        className="absolute inset-0"
        style={{
          background: mode === "dark" ? "rgba(13,10,26,0.2)" : "rgba(255,255,255,0.1)",
        }}
      />
    </div>
  );
};

const LiquidBackground: React.FC<{ mode: ChameleonMode; intensity: number }> = ({
  mode,
  intensity,
}) => {
  // PERF: box-shadow glow instead of filter:blur. CSS-only animation.
  // borderRadius morphing moved to a STATIC style (not animated) to avoid layout.
  const spreadSize = 100 + (intensity / 100) * 50; // 100-150px spread
  const baseOpacity =
    mode === "dark" ? 0.25 + (intensity / 100) * 0.15 : 0.12 + (intensity / 100) * 0.1;

  const blobs =
    mode === "light"
      ? [
          {
            x: "20%",
            y: "25%",
            color1: "124,58,237",
            color2: "167,139,250",
            delay: "0s",
            duration: "22s",
            radius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          {
            x: "75%",
            y: "15%",
            color1: "79,70,229",
            color2: "129,140,248",
            delay: "-7s",
            duration: "26s",
            radius: "40% 60% 70% 30% / 50% 40% 60% 50%",
          },
          {
            x: "45%",
            y: "70%",
            color1: "147,51,234",
            color2: "192,132,252",
            delay: "-14s",
            duration: "30s",
            radius: "70% 30% 50% 50% / 30% 60% 40% 60%",
          },
        ]
      : [
          {
            x: "20%",
            y: "25%",
            color1: "76,29,149",
            color2: "124,58,237",
            delay: "0s",
            duration: "22s",
            radius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          {
            x: "75%",
            y: "15%",
            color1: "30,27,75",
            color2: "67,56,202",
            delay: "-7s",
            duration: "26s",
            radius: "40% 60% 70% 30% / 50% 40% 60% 50%",
          },
          {
            x: "45%",
            y: "70%",
            color1: "59,7,100",
            color2: "109,40,217",
            delay: "-14s",
            duration: "30s",
            radius: "70% 30% 50% 50% / 30% 60% 40% 60%",
          },
        ];

  return (
    <div
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none"
      style={{ contain: "strict" }}
    >
      {/* Base layer */}
      <div className={`absolute inset-0 ${mode === "dark" ? "bg-[#030014]" : "bg-[#f5f0ff]"}`} />

      {/* Organic blobs — box-shadow glow, static borderRadius, transform-only animation */}
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="absolute chameleon-liquid-blob"
          style={{
            left: blob.x,
            top: blob.y,
            width: 10,
            height: 10,
            borderRadius: blob.radius,
            background: "transparent",
            boxShadow: `0 0 ${spreadSize}px ${spreadSize}px rgba(${blob.color1},${baseOpacity}), 0 0 ${spreadSize * 0.6}px ${spreadSize * 0.4}px rgba(${blob.color2},${baseOpacity * 0.6})`,
            transform: "translate(-50%, -50%) translateZ(0)",
            animationDelay: blob.delay,
            animationDuration: blob.duration,
          }}
        />
      ))}

      {/* Subtle overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            mode === "dark"
              ? "radial-gradient(circle at 50% 50%, transparent 0%, rgba(3,0,20,0.3) 100%)"
              : "radial-gradient(circle at 50% 50%, transparent 0%, rgba(245,240,255,0.2) 100%)",
        }}
      />
    </div>
  );
};

// ─── Provider ────────────────────────────────────────────────────────────────

export function ChameleonProvider({
  children,
  initialTheme = "simple",
  initialMode = "light",
  initialLang = "en",
}: {
  children: ReactNode;
  initialTheme?: ChameleonTheme;
  initialMode?: ChameleonMode;
  initialLang?: ChameleonLang;
}) {
  const [theme, setTheme] = useState<ChameleonTheme>(initialTheme);
  const [mode, setMode] = useState<ChameleonMode>(initialMode);
  const [lang, setLang] = useState<ChameleonLang>(initialLang);
  const [glassyIntensity, setGlassyIntensity] = useState<number>(70); // 0-100
  const [liquidIntensity, setLiquidIntensity] = useState<number>(60); // 0-100

  const cssVars = useMemo(() => {
    const vars = { ...themeTokens[theme][mode] } as Record<string, string>;

    // Apply intensity-based adjustments for glassy theme
    if (theme === "glassy") {
      const blurAmount = 16 + (glassyIntensity / 100) * 16; // 16-32px
      vars["--glass-blur"] = `${blurAmount}px`;
    }

    return vars as React.CSSProperties;
  }, [theme, mode, glassyIntensity]);

  // Apply dark class to document root for Tailwind dark mode
  React.useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        mode,
        setMode,
        lang,
        setLang,
        glassyIntensity,
        setGlassyIntensity,
        liquidIntensity,
        setLiquidIntensity,
      }}
    >
      {/* Ambient backgrounds with intensity controls */}
      {theme === "glassy" && <GlassyBackground mode={mode} intensity={glassyIntensity} />}
      {theme === "liquid" && <LiquidBackground mode={mode} intensity={liquidIntensity} />}

      <div
        data-chameleon-theme={theme}
        data-chameleon-mode={mode}
        className="contents"
        style={cssVars}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useChameleon() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useChameleon must be used within a ChameleonProvider");
  return context;
}

// ─── Theme-Aware Styling Hook ────────────────────────────────────────────────
// Provides component-level CSS classes that guarantee text contrast for each theme

export function useThemeClasses() {
  const { theme, mode } = useChameleon();

  // PERF: Memoize all class strings — called 50+ times across component tree
  return useMemo(() => {
    const isDark = mode === "dark";

    const cardClass = {
      material: isDark
        ? "bg-[var(--card)] text-[var(--card-foreground)] shadow-xl shadow-black/40 rounded-sm"
        : "bg-[var(--card)] text-[var(--card-foreground)] shadow-lg shadow-black/8 rounded-sm",
      simple:
        "bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] rounded-xl shadow-sm",
      minimalist: isDark
        ? "bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)]"
        : "bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)]",
      glassy:
        "text-[var(--card-foreground)] border border-[var(--border)] rounded-2xl shadow-2xl" +
        (isDark
          ? " bg-[rgba(255,255,255,0.08)] shadow-black/30"
          : " bg-[rgba(255,255,255,0.82)] shadow-purple-500/15"),
      liquid: isDark
        ? "bg-[var(--card)] text-[var(--card-foreground)] rounded-[2rem] border border-[var(--border)] shadow-2xl shadow-purple-900/30"
        : "bg-[var(--card)] text-[var(--card-foreground)] rounded-[2rem] border border-[var(--border)] shadow-xl shadow-purple-400/15",
    }[theme];

    const buttonPrimary = {
      material:
        "bg-[var(--primary)] text-[var(--primary-foreground)] rounded-sm uppercase tracking-wider shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 active:shadow-sm transition-shadow",
      simple: "bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90",
      minimalist:
        "bg-transparent text-[var(--foreground)] border border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors",
      glassy: isDark
        ? "bg-white/15 text-white border border-white/25 rounded-xl hover:bg-white/25 hover:border-white/40 transition-all shadow-lg"
        : "bg-[var(--primary)] text-white border border-[var(--primary)]/30 rounded-xl hover:bg-[var(--primary)]/90 hover:shadow-xl transition-all shadow-lg shadow-purple-500/25",
      liquid:
        "bg-gradient-to-r from-[var(--primary)] to-violet-500 text-[var(--primary-foreground)] rounded-full shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-[1.02] transition-all",
    }[theme];

    const buttonSecondary = {
      material: "bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-sm shadow-sm",
      simple: "bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-lg",
      minimalist:
        "bg-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors",
      glassy: isDark
        ? "bg-white/8 text-[var(--card-foreground)] border border-white/15 rounded-xl hover:bg-white/15"
        : "bg-white/60 text-[var(--foreground)] border border-[var(--border)] rounded-xl hover:bg-white/80",
      liquid:
        "bg-[var(--muted)] text-[var(--muted-foreground)] rounded-full hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors",
    }[theme];

    const buttonOutline = {
      material:
        "border border-[var(--primary)] text-[var(--primary)] bg-transparent rounded-sm hover:bg-[var(--accent)]",
      simple:
        "border border-[var(--border)] text-[var(--foreground)] bg-transparent rounded-lg hover:bg-[var(--muted)]",
      minimalist:
        "border-b border-[var(--foreground)] text-[var(--foreground)] bg-transparent rounded-none pb-0.5 hover:border-b-2",
      glassy: isDark
        ? "border border-white/30 text-[var(--card-foreground)] bg-transparent rounded-xl hover:bg-white/10"
        : "border-2 border-[var(--primary)] text-[var(--primary)] bg-white/40 rounded-xl hover:bg-white/60",
      liquid:
        "border-2 border-[var(--primary)] text-[var(--primary)] bg-transparent rounded-full hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-all",
    }[theme];

    const buttonGhost = {
      material:
        "bg-transparent text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] rounded-sm",
      simple: "bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg",
      minimalist:
        "bg-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-none",
      glassy: isDark
        ? "bg-transparent text-[var(--card-foreground)] hover:bg-white/10 rounded-xl"
        : "bg-transparent text-[var(--foreground)] hover:bg-white/40 rounded-xl",
      liquid: "bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)] rounded-2xl",
    }[theme];

    const inputClass = {
      material:
        "border-0 border-b-2 border-[var(--border)] rounded-none bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none transition-colors pb-1",
      simple:
        "border border-[var(--border)] rounded-lg bg-[var(--muted)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] px-3",
      minimalist:
        "border-0 border-b border-[var(--border)] rounded-none bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--foreground)] transition-colors",
      glassy: isDark
        ? "bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
        : "bg-white/60 border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:bg-white/80 transition-all",
      liquid:
        "bg-[var(--muted)] border-2 border-transparent rounded-2xl text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-all",
    }[theme];

    const badgeClass = {
      material:
        "rounded-sm border-0 bg-[var(--primary)] text-[var(--primary-foreground)] uppercase tracking-wider",
      simple:
        "rounded-full border border-[var(--border)] bg-[var(--muted)] text-[var(--foreground)]",
      minimalist:
        "rounded-none border border-[var(--foreground)] bg-transparent text-[var(--foreground)] uppercase tracking-widest text-[10px]",
      glassy: isDark
        ? "rounded-full bg-white/15 border border-white/25 text-white"
        : "rounded-full bg-white/60 border border-[var(--border)] text-[var(--foreground)]",
      liquid:
        "rounded-full border-none bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-[var(--primary)] border border-[var(--border)]",
    }[theme];

    const textPrimary = "text-[var(--foreground)]";
    const textMuted = "text-[var(--muted-foreground)]";
    const textOnCard = "text-[var(--card-foreground)]";
    const textOnPrimary = "text-[var(--primary-foreground)]";

    const surfaceClass = {
      material: "bg-[var(--muted)] text-[var(--foreground)]",
      simple: "bg-[var(--muted)] text-[var(--foreground)] rounded-xl",
      minimalist: "bg-[var(--muted)] text-[var(--foreground)]",
      glassy: isDark
        ? "bg-white/5 text-[var(--card-foreground)] border border-white/10 rounded-xl"
        : "bg-white/50 text-[var(--foreground)] border border-[var(--border)] rounded-xl",
      liquid: "bg-[var(--muted)] text-[var(--foreground)] rounded-2xl",
    }[theme];

    return {
      cardClass,
      buttonPrimary,
      buttonSecondary,
      buttonOutline,
      buttonGhost,
      inputClass,
      badgeClass,
      textPrimary,
      textMuted,
      textOnCard,
      textOnPrimary,
      surfaceClass,
      theme,
      mode,
      isDark,
    };
  }, [theme, mode]);
}

// ─── Translations ─────────────────────────────────────────────────────────────

export const translations = {
  en: {
    welcome: "Welcome back",
    signIn: "Sign In",
    signOut: "Sign Out",
    getStarted: "Get Started",
    settings: "Settings",
    profile: "Profile",
    appearance: "Appearance",
    language: "Language",
    save: "Save Changes",
    email: "Email Address",
    password: "Password",
    features: "Features",
    pricing: "Pricing",
    dashboard: "Dashboard",
    theme: "Theme",
    mode: "Mode",
    light: "Light",
    dark: "Dark",
    loginDesc: "Enter your credentials to access your account",
    rememberMe: "Remember me",
    forgotPass: "Forgot password?",
    noAccount: "Don't have an account?",
    signUp: "Sign Up",
    general: "General",
    notifications: "Notifications",
    security: "Security",
    dangerZone: "Danger Zone",
    deleteAccount: "Delete Account",
    confirmDelete: "This action is permanent and cannot be undone.",
  },
  es: {
    welcome: "Bienvenido de nuevo",
    signIn: "Iniciar sesión",
    signOut: "Cerrar sesión",
    getStarted: "Empezar",
    settings: "Ajustes",
    profile: "Perfil",
    appearance: "Apariencia",
    language: "Idioma",
    save: "Guardar cambios",
    email: "Correo electrónico",
    password: "Contraseña",
    features: "Características",
    pricing: "Precios",
    dashboard: "Tablero",
    theme: "Tema",
    mode: "Modo",
    light: "Claro",
    dark: "Oscuro",
    loginDesc: "Ingrese sus credenciales para acceder a su cuenta",
    rememberMe: "Recuérdame",
    forgotPass: "¿Olvidaste tu contraseña?",
    noAccount: "¿No tienes una cuenta?",
    signUp: "Registrarse",
    general: "General",
    notifications: "Notificaciones",
    security: "Seguridad",
    dangerZone: "Zona de Peligro",
    deleteAccount: "Eliminar Cuenta",
    confirmDelete: "Esta acción es permanente y no se puede deshacer.",
  },
  fr: {
    welcome: "Bon retour",
    signIn: "Se connecter",
    signOut: "Se déconnecter",
    getStarted: "Commencer",
    settings: "Paramètres",
    profile: "Profil",
    appearance: "Apparence",
    language: "Langue",
    save: "Sauvegarder",
    email: "Adresse e-mail",
    password: "Mot de passe",
    features: "Fonctionnalités",
    pricing: "Tarification",
    dashboard: "Tableau de bord",
    theme: "Thème",
    mode: "Mode",
    light: "Clair",
    dark: "Sombre",
    loginDesc: "Entrez vos identifiants pour accéder à votre compte",
    rememberMe: "Se souvenir de moi",
    forgotPass: "Mot de passe oublié ?",
    noAccount: "Vous n'avez pas de compte ?",
    signUp: "S'inscrire",
    general: "Général",
    notifications: "Notifications",
    security: "Sécurité",
    dangerZone: "Zone de Danger",
    deleteAccount: "Supprimer le Compte",
    confirmDelete: "Cette action est permanente et ne peut être annulée.",
  },
};
