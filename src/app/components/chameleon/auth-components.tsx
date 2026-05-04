/**
 * ════════════════════════════════════════════════════════════════════════════
 * CHAMELEON UI - COMPREHENSIVE AUTHENTICATION COMPONENTS
 * ════════════════════════════════════════════════════════════════════════════
 *
 * Complete authentication flow components for all major use cases:
 * - Login (email/password + social)
 * - Sign Up (with validation)
 * - Forgot Password
 * - Reset Password
 * - Email Verification
 * - Two-Factor Authentication (2FA)
 * - Magic Link
 * - OAuth Callback
 *
 * All components are fully themed across material, simple, minimalist, glassy, and liquid.
 *
 * @version 1.0.0
 * @ai-optimized true
 */

import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
  AlertCircle,
  CheckCircle,
  Loader2,
  Shield,
  Key,
  Smartphone,
  Send,
  Clock,
  RefreshCw,
  LogIn,
  UserPlus,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button, Input, Badge } from "./atoms";
import { Card, CardHeader, CardTitle, CardContent, Alert } from "./molecules";
import { useThemeClasses, useChameleon } from "./context";
import { cn } from "./utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthResponse {
  success: boolean;
  message: string;
  error?: string;
}

type SlotClassNames<T extends string> = Partial<Record<T, string>>;
type SlotStyles<T extends string> = Partial<Record<T, React.CSSProperties>>;

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

type LoginFormSlots =
  | "card"
  | "emailInput"
  | "passwordInput"
  | "rememberCheckbox"
  | "forgotPasswordButton"
  | "submitButton"
  | "signUpButton";

export interface AuthLoginFormProps {
  onSubmit?:
    | ((values: LoginFormValues) => Promise<AuthResponse>)
    | ((email: string, password: string) => Promise<AuthResponse>);
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onSocialLogin?: (provider: string) => void;
  showSocial?: boolean;
  value?: Partial<LoginFormValues>;
  defaultValue?: Partial<LoginFormValues>;
  onChange?: (values: LoginFormValues) => void;
  classNames?: SlotClassNames<LoginFormSlots>;
  styles?: SlotStyles<LoginFormSlots>;
}

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

type SignUpFormSlots =
  | "card"
  | "nameInput"
  | "emailInput"
  | "passwordInput"
  | "confirmPasswordInput"
  | "termsCheckbox"
  | "submitButton"
  | "signInButton";

export interface AuthSignUpFormProps {
  onSubmit?:
    | ((data: SignUpFormValues) => Promise<AuthResponse>)
    | ((data: { name: string; email: string; password: string }) => Promise<AuthResponse>);
  onSignIn?: () => void;
  onSocialLogin?: (provider: string) => void;
  showSocial?: boolean;
  value?: Partial<SignUpFormValues>;
  defaultValue?: Partial<SignUpFormValues>;
  onChange?: (values: SignUpFormValues) => void;
  classNames?: SlotClassNames<SignUpFormSlots>;
  styles?: SlotStyles<SignUpFormSlots>;
}

export interface ForgotPasswordFormValues {
  email: string;
}

type ForgotPasswordSlots = "card" | "emailInput" | "submitButton" | "backButton";

export interface AuthForgotPasswordFormProps {
  onSubmit?:
    | ((values: ForgotPasswordFormValues) => Promise<AuthResponse>)
    | ((email: string) => Promise<AuthResponse>);
  onBack?: () => void;
  value?: Partial<ForgotPasswordFormValues>;
  defaultValue?: Partial<ForgotPasswordFormValues>;
  onChange?: (values: ForgotPasswordFormValues) => void;
  classNames?: SlotClassNames<ForgotPasswordSlots>;
  styles?: SlotStyles<ForgotPasswordSlots>;
}

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

type ResetPasswordSlots = "card" | "passwordInput" | "confirmPasswordInput" | "submitButton";

export interface AuthResetPasswordFormProps {
  token?: string;
  onSubmit?:
    | ((values: ResetPasswordFormValues & { token: string }) => Promise<AuthResponse>)
    | ((password: string, token: string) => Promise<AuthResponse>);
  onSuccess?: () => void;
  value?: Partial<ResetPasswordFormValues>;
  defaultValue?: Partial<ResetPasswordFormValues>;
  onChange?: (values: ResetPasswordFormValues) => void;
  classNames?: SlotClassNames<ResetPasswordSlots>;
  styles?: SlotStyles<ResetPasswordSlots>;
}

export interface AuthEmailVerificationProps {
  email?: string;
  onResend?: () => Promise<AuthResponse>;
  onVerified?: () => void;
  classNames?: SlotClassNames<"card" | "resendButton" | "verifiedButton">;
  styles?: SlotStyles<"card" | "resendButton" | "verifiedButton">;
}

export interface TwoFactorAuthValues {
  code: string;
}

export interface AuthTwoFactorAuthProps {
  onSubmit?:
    | ((values: TwoFactorAuthValues & { method: "sms" | "email" | "app" }) => Promise<AuthResponse>)
    | ((code: string) => Promise<AuthResponse>);
  onResend?: () => Promise<AuthResponse>;
  method?: "sms" | "email" | "app";
  value?: Partial<TwoFactorAuthValues>;
  defaultValue?: Partial<TwoFactorAuthValues>;
  onChange?: (values: TwoFactorAuthValues) => void;
  classNames?: SlotClassNames<"card" | "codeInput" | "resendButton">;
  styles?: SlotStyles<"card" | "codeInput" | "resendButton">;
}

export interface MagicLinkFormValues {
  email: string;
}

export interface AuthMagicLinkFormProps {
  onSubmit?:
    | ((values: MagicLinkFormValues) => Promise<AuthResponse>)
    | ((email: string) => Promise<AuthResponse>);
  value?: Partial<MagicLinkFormValues>;
  defaultValue?: Partial<MagicLinkFormValues>;
  onChange?: (values: MagicLinkFormValues) => void;
  classNames?: SlotClassNames<"card" | "emailInput" | "submitButton">;
  styles?: SlotStyles<"card" | "emailInput" | "submitButton">;
}

interface SocialProvider {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

// ─── Validation Helpers ───────────────────────────────────────────────────────

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (
  password: string,
): {
  isValid: boolean;
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else feedback.push("At least 8 characters");

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  else feedback.push("Mix of uppercase and lowercase");

  if (/\d/.test(password)) score++;
  else feedback.push("At least one number");

  if (/[^a-zA-Z0-9]/.test(password)) score++;
  else feedback.push("At least one special character");

  return {
    isValid: score >= 3,
    score,
    feedback,
  };
};

// ─── Password Strength Indicator ──────────────────────────────────────────────

export const PasswordStrength: React.FC<{ password: string }> = ({ password }) => {
  const { theme } = useThemeClasses();
  const validation = validatePassword(password);

  if (!password) return null;

  const strength = ["Weak", "Fair", "Good", "Strong"][validation.score - 1] || "Weak";
  const colorClass =
    validation.score === 4
      ? "bg-emerald-500"
      : validation.score === 3
        ? "bg-blue-500"
        : validation.score === 2
          ? "bg-amber-500"
          : "bg-rose-500";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[var(--muted-foreground)]">Password Strength</span>
        <span
          className={cn(
            "text-xs font-black uppercase",
            validation.score === 4
              ? "text-emerald-600"
              : validation.score === 3
                ? "text-blue-600"
                : validation.score === 2
                  ? "text-amber-600"
                  : "text-rose-600",
          )}
        >
          {strength}
        </span>
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all",
              theme === "minimalist" ? "rounded-none" : "",
              level <= validation.score ? colorClass : "bg-[var(--muted)]",
            )}
          />
        ))}
      </div>
      {validation.feedback.length > 0 && (
        <ul className="space-y-1 mt-2">
          {validation.feedback.map((item, i) => (
            <li key={i} className="text-xs text-[var(--muted-foreground)] flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[var(--muted-foreground)]" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ─── Social Login Buttons ─────────────────────────────────────────────────────

const socialProviders: SocialProvider[] = [
  { id: "google", name: "Google", icon: Chrome, color: "#4285f4" },
  { id: "github", name: "GitHub", icon: Github, color: "#333" },
];

export const SocialLoginButtons: React.FC<{
  onProvider: (provider: string) => void;
  loading?: boolean;
}> = ({ onProvider, loading = false }) => {
  const { buttonOutline, theme } = useThemeClasses();

  return (
    <div className="grid grid-cols-2 gap-3">
      {socialProviders.map((provider) => (
        <Button
          key={provider.id}
          variant="outline"
          onClick={() => onProvider(provider.id)}
          disabled={loading}
          className={cn("gap-2", theme === "minimalist" && "rounded-none")}
        >
          <provider.icon className="w-4 h-4" />
          {provider.name}
        </Button>
      ))}
    </div>
  );
};

// ─── Divider ──────────────────────────────────────────────────────────────────

export const AuthDivider: React.FC = () => {
  const { textMuted } = useThemeClasses();

  return (
    <div className="relative flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-[var(--border)]" />
      <span className={cn("text-xs font-bold uppercase tracking-widest", textMuted)}>Or</span>
      <div className="flex-1 h-px bg-[var(--border)]" />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 1. LOGIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════

export const LoginForm: React.FC<AuthLoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onSignUp,
  onSocialLogin,
  showSocial = true,
  value,
  defaultValue,
  onChange,
  classNames,
  styles,
}) => {
  const { cardClass, textPrimary, textMuted, theme } = useThemeClasses();
  const [internalValues, setInternalValues] = useState<LoginFormValues>({
    email: defaultValue?.email ?? "",
    password: defaultValue?.password ?? "",
    rememberMe: defaultValue?.rememberMe ?? false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const values: LoginFormValues = {
    email: value?.email ?? internalValues.email,
    password: value?.password ?? internalValues.password,
    rememberMe: value?.rememberMe ?? internalValues.rememberMe,
  };

  const setValues = (patch: Partial<LoginFormValues>) => {
    const nextValues: LoginFormValues = {
      ...values,
      ...patch,
    };

    if (!value) {
      setInternalValues(nextValues);
    }

    onChange?.(nextValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(values.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!values.password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    try {
      let result: AuthResponse | undefined;
      if (onSubmit) {
        result =
          onSubmit.length >= 2
            ? await (onSubmit as (email: string, password: string) => Promise<AuthResponse>)(
                values.email,
                values.password,
              )
            : await (onSubmit as (submitValues: LoginFormValues) => Promise<AuthResponse>)(values);
      }
      if (!result?.success) {
        setError(result?.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className={cn("max-w-md mx-auto", classNames?.card)}
      style={styles?.card}
    >
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              "w-12 h-12 flex items-center justify-center text-[var(--primary-foreground)]",
              theme === "minimalist"
                ? "bg-black"
                : theme === "liquid"
                  ? "bg-gradient-to-br from-violet-500 to-purple-500 rounded-full"
                  : theme === "glassy"
                    ? "bg-white/10 rounded-2xl"
                    : "bg-[var(--primary)] rounded-2xl",
            )}
          >
            <LogIn className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <p className={cn("text-sm mt-0.5", textMuted)}>Sign in to your account</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="error" animated>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          </Alert>
        )}

        {showSocial && (
          <>
            <SocialLoginButtons onProvider={onSocialLogin || (() => {})} loading={loading} />
            <AuthDivider />
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className={cn("text-sm font-bold block", textPrimary)}>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <Input
                type="email"
                value={values.email}
                onChange={(e) => setValues({ email: e.target.value })}
                placeholder="you@example.com"
                className={cn("pl-10", classNames?.emailInput)}
                style={styles?.emailInput}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={cn("text-sm font-bold block", textPrimary)}>Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <Input
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={(e) => setValues({ password: e.target.value })}
                placeholder="••••••••"
                className={cn("pl-10 pr-10", classNames?.passwordInput)}
                style={styles?.passwordInput}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={values.rememberMe}
                onChange={(e) => setValues({ rememberMe: e.target.checked })}
                className={cn("w-4 h-4 rounded accent-[var(--primary)]", classNames?.rememberCheckbox)}
                style={styles?.rememberCheckbox}
              />
              <span className={cn("text-sm font-medium", textPrimary)}>Remember me</span>
            </label>

            <button
              type="button"
              onClick={onForgotPassword}
              className={cn("text-sm font-bold text-[var(--primary)] hover:underline", classNames?.forgotPasswordButton)}
              style={styles?.forgotPasswordButton}
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            className={cn("w-full", classNames?.submitButton)}
            style={styles?.submitButton}
            disabled={loading}
            animated
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center">
          <span className={cn("text-sm", textMuted)}>Don't have an account? </span>
          <button
            onClick={onSignUp}
            className={cn("text-sm font-bold text-[var(--primary)] hover:underline", classNames?.signUpButton)}
            style={styles?.signUpButton}
          >
            Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. SIGN UP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const SignUpForm: React.FC<AuthSignUpFormProps> = ({
  onSubmit,
  onSignIn,
  onSocialLogin,
  showSocial = true,
  value,
  defaultValue,
  onChange,
  classNames,
  styles,
}) => {
  const { textPrimary, textMuted, theme } = useThemeClasses();
  const [internalValues, setInternalValues] = useState<SignUpFormValues>({
    name: defaultValue?.name ?? "",
    email: defaultValue?.email ?? "",
    password: defaultValue?.password ?? "",
    confirmPassword: defaultValue?.confirmPassword ?? "",
    acceptTerms: defaultValue?.acceptTerms ?? false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const values: SignUpFormValues = {
    name: value?.name ?? internalValues.name,
    email: value?.email ?? internalValues.email,
    password: value?.password ?? internalValues.password,
    confirmPassword: value?.confirmPassword ?? internalValues.confirmPassword,
    acceptTerms: value?.acceptTerms ?? internalValues.acceptTerms,
  };

  const setValues = (patch: Partial<SignUpFormValues>) => {
    const nextValues: SignUpFormValues = {
      ...values,
      ...patch,
    };

    if (!value) {
      setInternalValues(nextValues);
    }

    onChange?.(nextValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!values.name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(values.email)) {
      setError("Please enter a valid email address");
      return;
    }

    const passwordValidation = validatePassword(values.password);
    if (!passwordValidation.isValid) {
      setError("Password does not meet requirements");
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!values.acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      const result = onSubmit
        ? await onSubmit({
            name: values.name,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            acceptTerms: values.acceptTerms,
          })
        : undefined;
      if (!result?.success) {
        setError(result?.error || "Failed to create account");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className={cn("max-w-md mx-auto", classNames?.card)}
      style={styles?.card}
    >
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              "w-12 h-12 flex items-center justify-center text-[var(--primary-foreground)]",
              theme === "minimalist"
                ? "bg-black"
                : theme === "liquid"
                  ? "bg-gradient-to-br from-violet-500 to-purple-500 rounded-full"
                  : theme === "glassy"
                    ? "bg-white/10 rounded-2xl"
                    : "bg-[var(--primary)] rounded-2xl",
            )}
          >
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <p className={cn("text-sm mt-0.5", textMuted)}>Get started for free</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="error" animated>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          </Alert>
        )}

        {showSocial && (
          <>
            <SocialLoginButtons onProvider={onSocialLogin || (() => {})} loading={loading} />
            <AuthDivider />
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className={cn("text-sm font-bold block", textPrimary)}>Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <Input
                type="text"
                value={values.name}
                onChange={(e) => setValues({ name: e.target.value })}
                placeholder="John Doe"
                className={cn("pl-10", classNames?.nameInput)}
                style={styles?.nameInput}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={cn("text-sm font-bold block", textPrimary)}>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <Input
                type="email"
                value={values.email}
                onChange={(e) => setValues({ email: e.target.value })}
                placeholder="you@example.com"
                className={cn("pl-10", classNames?.emailInput)}
                style={styles?.emailInput}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={cn("text-sm font-bold block", textPrimary)}>Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <Input
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={(e) => setValues({ password: e.target.value })}
                placeholder="••••••••"
                className={cn("pl-10 pr-10", classNames?.passwordInput)}
                style={styles?.passwordInput}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <PasswordStrength password={values.password} />
          </div>

          <div className="space-y-2">
            <label className={cn("text-sm font-bold block", textPrimary)}>Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <Input
                type={showPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={(e) => setValues({ confirmPassword: e.target.value })}
                placeholder="••••••••"
                className={cn("pl-10", classNames?.confirmPasswordInput)}
                style={styles?.confirmPasswordInput}
                disabled={loading}
              />
              {values.confirmPassword && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {values.password === values.confirmPassword ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <X className="w-4 h-4 text-rose-500" />
                  )}
                </div>
              )}
            </div>
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={values.acceptTerms}
              onChange={(e) => setValues({ acceptTerms: e.target.checked })}
              className={cn("w-4 h-4 mt-0.5 rounded accent-[var(--primary)]", classNames?.termsCheckbox)}
              style={styles?.termsCheckbox}
            />
            <span className={cn("text-sm", textPrimary)}>
              I agree to the{" "}
              <a href="#" className="font-bold text-[var(--primary)] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-bold text-[var(--primary)] hover:underline">
                Privacy Policy
              </a>
            </span>
          </label>

          <Button
            type="submit"
            className={cn("w-full", classNames?.submitButton)}
            style={styles?.submitButton}
            disabled={loading}
            animated
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center">
          <span className={cn("text-sm", textMuted)}>Already have an account? </span>
          <button
            onClick={onSignIn}
            className={cn("text-sm font-bold text-[var(--primary)] hover:underline", classNames?.signInButton)}
            style={styles?.signInButton}
          >
            Sign in
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 3. FORGOT PASSWORD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const ForgotPasswordForm: React.FC<AuthForgotPasswordFormProps> = ({
  onSubmit,
  onBack,
  value,
  defaultValue,
  onChange,
  classNames,
  styles,
}) => {
  const { textPrimary, textMuted, theme } = useThemeClasses();
  const [internalValues, setInternalValues] = useState<ForgotPasswordFormValues>({
    email: defaultValue?.email ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const values: ForgotPasswordFormValues = {
    email: value?.email ?? internalValues.email,
  };

  const setValues = (patch: Partial<ForgotPasswordFormValues>) => {
    const nextValues = { ...values, ...patch };
    if (!value) setInternalValues(nextValues);
    onChange?.(nextValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(values.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const result = onSubmit
        ? onSubmit.length >= 1
          ? await (onSubmit as (email: string) => Promise<AuthResponse>)(values.email)
          : await (onSubmit as (submitValues: ForgotPasswordFormValues) => Promise<AuthResponse>)(
              values,
            )
        : undefined;
      if (result?.success) {
        setSent(true);
      } else {
        setError(result?.error || "Failed to send reset email");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn("max-w-md mx-auto", classNames?.card)} style={styles?.card}>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              "w-12 h-12 flex items-center justify-center text-[var(--primary-foreground)]",
              theme === "minimalist"
                ? "bg-black"
                : theme === "liquid"
                  ? "bg-gradient-to-br from-violet-500 to-purple-500 rounded-full"
                  : theme === "glassy"
                    ? "bg-white/10 rounded-2xl"
                    : "bg-[var(--primary)] rounded-2xl",
            )}
          >
            <Key className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl">Forgot Password?</CardTitle>
            <p className={cn("text-sm mt-0.5", textMuted)}>
              {sent ? "Check your email" : "Reset your password"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {sent ? (
          <div className="space-y-4">
            <Alert variant="success" animated>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle className="w-4 h-4" />
                  Email Sent Successfully
                </div>
                <p className="text-sm">
                  We've sent password reset instructions to <strong>{values.email}</strong>
                </p>
              </div>
            </Alert>

            <div
              className={cn("p-4 rounded-xl border border-[var(--border)] bg-[var(--muted)]/20")}
            >
              <p className={cn("text-sm leading-relaxed", textMuted)}>
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setSent(false)}
                  className="font-bold text-[var(--primary)] hover:underline"
                >
                  try again
                </button>
              </p>
            </div>

            <Button onClick={onBack} variant="outline" className="w-full">
              Back to Sign In
            </Button>
          </div>
        ) : (
          <>
            {error && (
              <Alert variant="error" animated>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              </Alert>
            )}

            <div
              className={cn("p-4 rounded-xl border border-[var(--border)] bg-[var(--muted)]/20")}
            >
              <p className={cn("text-sm leading-relaxed", textMuted)}>
                Enter your email address and we'll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className={cn("text-sm font-bold block", textPrimary)}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <Input
                    type="email"
                    value={values.email}
                    onChange={(e) => setValues({ email: e.target.value })}
                    placeholder="you@example.com"
                    className={cn("pl-10", classNames?.emailInput)}
                    style={styles?.emailInput}
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className={cn("w-full", classNames?.submitButton)}
                style={styles?.submitButton}
                disabled={loading}
                animated
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <Button
                onClick={onBack}
                variant="ghost"
                className={cn("w-full", classNames?.backButton)}
                style={styles?.backButton}
              >
                Back to Sign In
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 4. RESET PASSWORD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const ResetPasswordForm: React.FC<AuthResetPasswordFormProps> = ({
  token = "",
  onSubmit,
  onSuccess,
  value,
  defaultValue,
  onChange,
  classNames,
  styles,
}) => {
  const { textPrimary, textMuted, theme } = useThemeClasses();
  const [internalValues, setInternalValues] = useState<ResetPasswordFormValues>({
    password: defaultValue?.password ?? "",
    confirmPassword: defaultValue?.confirmPassword ?? "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const values: ResetPasswordFormValues = {
    password: value?.password ?? internalValues.password,
    confirmPassword: value?.confirmPassword ?? internalValues.confirmPassword,
  };

  const setValues = (patch: Partial<ResetPasswordFormValues>) => {
    const nextValues = { ...values, ...patch };
    if (!value) setInternalValues(nextValues);
    onChange?.(nextValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

  const passwordValidation = validatePassword(values.password);
    if (!passwordValidation.isValid) {
      setError("Password does not meet requirements");
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = onSubmit
        ? onSubmit.length >= 2
          ? await (onSubmit as (password: string, submitToken: string) => Promise<AuthResponse>)(
              values.password,
              token,
            )
          : await (
              onSubmit as (
                submitValues: ResetPasswordFormValues & { token: string },
              ) => Promise<AuthResponse>
            )({ ...values, token })
        : undefined;
      if (result?.success) {
        setSuccess(true);
        setTimeout(() => onSuccess?.(), 2000);
      } else {
        setError(result?.error || "Failed to reset password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <Card className={cn("max-w-md mx-auto", classNames?.card)} style={styles?.card}>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              "w-12 h-12 flex items-center justify-center text-[var(--primary-foreground)]",
              theme === "minimalist"
                ? "bg-black"
                : theme === "liquid"
                  ? "bg-gradient-to-br from-violet-500 to-purple-500 rounded-full"
                  : theme === "glassy"
                    ? "bg-white/10 rounded-2xl"
                    : "bg-[var(--primary)] rounded-2xl",
            )}
          >
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <p className={cn("text-sm mt-0.5", textMuted)}>Choose a new password</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {success ? (
          <div className="space-y-4">
            <Alert variant="success" animated>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle className="w-4 h-4" />
                  Password Reset Successfully
                </div>
                <p className="text-sm">Your password has been updated. Redirecting to sign in...</p>
              </div>
            </Alert>
          </div>
        ) : (
          <>
            {error && (
              <Alert variant="error" animated>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className={cn("text-sm font-bold block", textPrimary)}>New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={(e) => setValues({ password: e.target.value })}
                    placeholder="••••••••"
                    className={cn("pl-10 pr-10", classNames?.passwordInput)}
                    style={styles?.passwordInput}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <PasswordStrength password={values.password} />
              </div>

              <div className="space-y-2">
                <label className={cn("text-sm font-bold block", textPrimary)}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    onChange={(e) => setValues({ confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className={cn("pl-10 pr-10", classNames?.confirmPasswordInput)}
                    style={styles?.confirmPasswordInput}
                    disabled={loading}
                  />
                  {values.confirmPassword && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {values.password === values.confirmPassword ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <X className="w-4 h-4 text-rose-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className={cn("w-full", classNames?.submitButton)}
                style={styles?.submitButton}
                disabled={loading}
                animated
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 5. EMAIL VERIFICATION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const EmailVerification: React.FC<AuthEmailVerificationProps> = ({
  email = "your@email.com",
  onResend,
  onVerified,
  classNames,
  styles,
}) => {
  const { textPrimary, textMuted, theme } = useThemeClasses();
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const handleResend = async () => {
    setResending(true);
    try {
      await onResend?.();
      setResent(true);
      setCountdown(60);

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResent(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      // Handle error
    } finally {
      setResending(false);
    }
  };

  return (
  <Card className={cn("max-w-md mx-auto", classNames?.card)} style={styles?.card}>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              "w-12 h-12 flex items-center justify-center text-[var(--primary-foreground)]",
              theme === "minimalist"
                ? "bg-black"
                : theme === "liquid"
                  ? "bg-gradient-to-br from-violet-500 to-purple-500 rounded-full"
                  : theme === "glassy"
                    ? "bg-white/10 rounded-2xl"
                    : "bg-[var(--primary)] rounded-2xl",
            )}
          >
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl">Verify Your Email</CardTitle>
            <p className={cn("text-sm mt-0.5", textMuted)}>Check your inbox</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Alert variant="info" animated>
          <div className="space-y-2">
            <p className="text-sm font-bold">Verification email sent</p>
            <p className="text-sm">
              We've sent a verification link to <strong>{email}</strong>
            </p>
          </div>
        </Alert>

        <div
          className={cn(
            "p-4 rounded-xl border border-[var(--border)] bg-[var(--muted)]/20 space-y-3",
          )}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                theme === "glassy" ? "bg-white/10" : "bg-[var(--primary)]/10",
              )}
            >
              <span className="text-lg">📧</span>
            </div>
            <div>
              <p className={cn("text-sm font-bold mb-1", textPrimary)}>Check your email</p>
              <p className={cn("text-xs leading-relaxed", textMuted)}>
                Click the verification link in the email to activate your account.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                theme === "glassy" ? "bg-white/10" : "bg-[var(--primary)]/10",
              )}
            >
              <span className="text-lg">📁</span>
            </div>
            <div>
              <p className={cn("text-sm font-bold mb-1", textPrimary)}>Check spam folder</p>
              <p className={cn("text-xs leading-relaxed", textMuted)}>
                Sometimes emails end up in spam. Don't forget to check there too.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleResend}
            variant="outline"
            className={cn("w-full", classNames?.resendButton)}
            style={styles?.resendButton}
            disabled={resending || resent}
          >
            {resending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : resent ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Email sent ({countdown}s)
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Resend Email
              </>
            )}
          </Button>

          <button
            onClick={onVerified}
            className={cn("text-sm font-bold text-[var(--primary)] hover:underline", classNames?.verifiedButton)}
            style={styles?.verifiedButton}
          >
            I've verified my email
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 6. TWO-FACTOR AUTHENTICATION (2FA)
// ═══════════════════════════════════════════════════════════════════════════

export const TwoFactorAuth: React.FC<AuthTwoFactorAuthProps> = ({
  onSubmit,
  onResend,
  method = "app",
  value,
  defaultValue,
  onChange,
  classNames,
  styles,
}) => {
  const { textPrimary, textMuted, theme } = useThemeClasses();
  const [internalValues, setInternalValues] = useState<TwoFactorAuthValues>({
    code: defaultValue?.code ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const values: TwoFactorAuthValues = {
    code: value?.code ?? internalValues.code,
  };

  const codeDigits = Array.from({ length: 6 }, (_, index) => values.code[index] ?? "");

  const setValues = (patch: Partial<TwoFactorAuthValues>) => {
    const nextValues = { ...values, ...patch };
    if (!value) setInternalValues(nextValues);
    onChange?.(nextValues);
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

  const newCode = [...codeDigits];
    newCode[index] = value;
  const fullCode = newCode.join("");
  setValues({ code: fullCode });

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (newCode.every((digit) => digit) && fullCode.length === 6) {
      handleSubmit(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (fullCode: string) => {
    setError("");
    setLoading(true);

    try {
      const result = onSubmit
        ? onSubmit.length >= 1
          ? await (onSubmit as (code: string) => Promise<AuthResponse>)(fullCode)
          : await (
              onSubmit as (
                submitValues: TwoFactorAuthValues & { method: "sms" | "email" | "app" },
              ) => Promise<AuthResponse>
            )({ code: fullCode, method })
        : undefined;
      if (!result?.success) {
        setError(result?.error || "Invalid code");
        setValues({ code: "" });
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const methodInfo = {
    sms: { icon: Smartphone, label: "SMS", desc: "Enter the code sent to your phone" },
    email: { icon: Mail, label: "Email", desc: "Enter the code sent to your email" },
    app: {
      icon: Shield,
      label: "Authenticator App",
      desc: "Enter the code from your authenticator app",
    },
  }[method as "sms" | "email" | "app"];

  return (
  <Card className={cn("max-w-md mx-auto", classNames?.card)} style={styles?.card}>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              "w-12 h-12 flex items-center justify-center text-[var(--primary-foreground)]",
              theme === "minimalist"
                ? "bg-black"
                : theme === "liquid"
                  ? "bg-gradient-to-br from-violet-500 to-purple-500 rounded-full"
                  : theme === "glassy"
                    ? "bg-white/10 rounded-2xl"
                    : "bg-[var(--primary)] rounded-2xl",
            )}
          >
            <methodInfo.icon className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
            <p className={cn("text-sm mt-0.5", textMuted)}>{methodInfo.desc}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="error" animated>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="flex gap-2 justify-center">
            {codeDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={loading}
                className={cn(
                  "w-12 h-14 text-center text-xl font-bold",
                  "border-2 transition-all",
                  theme === "minimalist"
                    ? "rounded-none border-black"
                    : theme === "glassy"
                      ? "bg-white/10 border-white/20 rounded-xl text-white"
                      : theme === "liquid"
                        ? "border-purple-200 rounded-2xl"
                        : "border-[var(--border)] rounded-xl",
                  "focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20",
                  digit && "border-[var(--primary)]",
                  theme === "glassy" ? "text-white" : "text-[var(--foreground)]",
                  "bg-[var(--card)]",
                  classNames?.codeInput,
                )}
                style={styles?.codeInput}
              />
            ))}
          </div>

          {loading && (
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--muted-foreground)]">
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying...
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={onResend}
            className={cn("text-sm font-bold text-[var(--primary)] hover:underline flex items-center gap-2 mx-auto", classNames?.resendButton)}
            style={styles?.resendButton}
          >
            <RefreshCw className="w-4 h-4" />
            Resend Code
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 7. MAGIC LINK LOGIN
// ═══════════════════════════════════════════════════════════════════════════

export const MagicLinkForm: React.FC<AuthMagicLinkFormProps> = ({
  onSubmit,
  value,
  defaultValue,
  onChange,
  classNames,
  styles,
}) => {
  const { textPrimary, textMuted, theme } = useThemeClasses();
  const [internalValues, setInternalValues] = useState<MagicLinkFormValues>({
    email: defaultValue?.email ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const values: MagicLinkFormValues = {
    email: value?.email ?? internalValues.email,
  };

  const setValues = (patch: Partial<MagicLinkFormValues>) => {
    const nextValues = { ...values, ...patch };
    if (!value) setInternalValues(nextValues);
    onChange?.(nextValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(values.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const result = onSubmit
        ? onSubmit.length >= 1
          ? await (onSubmit as (email: string) => Promise<AuthResponse>)(values.email)
          : await (onSubmit as (submitValues: MagicLinkFormValues) => Promise<AuthResponse>)(
              values,
            )
        : undefined;
      if (result?.success) {
        setSent(true);
      } else {
        setError(result?.error || "Failed to send magic link");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <Card className={cn("max-w-md mx-auto", classNames?.card)} style={styles?.card}>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              "w-12 h-12 flex items-center justify-center text-[var(--primary-foreground)]",
              theme === "minimalist"
                ? "bg-black"
                : theme === "liquid"
                  ? "bg-gradient-to-br from-violet-500 to-purple-500 rounded-full"
                  : theme === "glassy"
                    ? "bg-white/10 rounded-2xl"
                    : "bg-[var(--primary)] rounded-2xl",
            )}
          >
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl">Magic Link Sign In</CardTitle>
            <p className={cn("text-sm mt-0.5", textMuted)}>
              {sent ? "Check your email" : "No password required"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {sent ? (
          <div className="space-y-4">
            <Alert variant="success" animated>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle className="w-4 h-4" />
                  Magic Link Sent
                </div>
                <p className="text-sm">
                  We've sent a sign-in link to <strong>{values.email}</strong>
                </p>
              </div>
            </Alert>

            <div
              className={cn("p-4 rounded-xl border border-[var(--border)] bg-[var(--muted)]/20")}
            >
              <p className={cn("text-sm leading-relaxed", textMuted)}>
                Click the link in the email to sign in instantly. The link expires in 15 minutes.
              </p>
            </div>

            <Button onClick={() => setSent(false)} variant="outline" className="w-full">
              Send Another Link
            </Button>
          </div>
        ) : (
          <>
            {error && (
              <Alert variant="error" animated>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              </Alert>
            )}

            <div
              className={cn("p-4 rounded-xl border border-[var(--border)] bg-[var(--muted)]/20")}
            >
              <p className={cn("text-sm leading-relaxed", textMuted)}>
                Enter your email and we'll send you a magic link to sign in instantly — no password
                needed.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className={cn("text-sm font-bold block", textPrimary)}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <Input
                    type="email"
                    value={values.email}
                    onChange={(e) => setValues({ email: e.target.value })}
                    placeholder="you@example.com"
                    className={cn("pl-10", classNames?.emailInput)}
                    style={styles?.emailInput}
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className={cn("w-full", classNames?.submitButton)}
                style={styles?.submitButton}
                disabled={loading}
                animated
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Send Magic Link
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
};
