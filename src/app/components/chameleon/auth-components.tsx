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

export const LoginForm: React.FC<{
  onSubmit?: (email: string, password: string) => Promise<AuthResponse>;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onSocialLogin?: (provider: string) => void;
  showSocial?: boolean;
}> = ({ onSubmit, onForgotPassword, onSignUp, onSocialLogin, showSocial = true }) => {
  const { cardClass, textPrimary, textMuted, theme } = useThemeClasses();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    try {
      const result = await onSubmit?.(email, password);
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
    <Card className="max-w-md mx-auto">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-10"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10"
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
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-[var(--primary)]"
              />
              <span className={cn("text-sm font-medium", textPrimary)}>Remember me</span>
            </label>

            <button
              type="button"
              onClick={onForgotPassword}
              className={cn("text-sm font-bold text-[var(--primary)] hover:underline")}
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" className="w-full" disabled={loading} animated>
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
            className="text-sm font-bold text-[var(--primary)] hover:underline"
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

export const SignUpForm: React.FC<{
  onSubmit?: (data: { name: string; email: string; password: string }) => Promise<AuthResponse>;
  onSignIn?: () => void;
  onSocialLogin?: (provider: string) => void;
  showSocial?: boolean;
}> = ({ onSubmit, onSignIn, onSocialLogin, showSocial = true }) => {
  const { textPrimary, textMuted, theme } = useThemeClasses();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError("Password does not meet requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      const result = await onSubmit?.({ name, email, password });
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
    <Card className="max-w-md mx-auto">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="pl-10"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-10"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10"
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
            <PasswordStrength password={password} />
          </div>

          <div className="space-y-2">
            <label className={cn("text-sm font-bold block", textPrimary)}>Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <Input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10"
                disabled={loading}
              />
              {confirmPassword && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {password === confirmPassword ? (
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
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded accent-[var(--primary)]"
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

          <Button type="submit" className="w-full" disabled={loading} animated>
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
            className="text-sm font-bold text-[var(--primary)] hover:underline"
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

export const ForgotPasswordForm: React.FC<{
  onSubmit?: (email: string) => Promise<AuthResponse>;
  onBack?: () => void;
}> = ({ onSubmit, onBack }) => {
  const { textPrimary, textMuted, theme } = useThemeClasses();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const result = await onSubmit?.(email);
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
    <Card className="max-w-md mx-auto">
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
                  We've sent password reset instructions to <strong>{email}</strong>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10"
                    disabled={loading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading} animated>
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

              <Button onClick={onBack} variant="ghost" className="w-full">
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

export const ResetPasswordForm: React.FC<{
  token?: string;
  onSubmit?: (password: string, token: string) => Promise<AuthResponse>;
  onSuccess?: () => void;
}> = ({ token = "", onSubmit, onSuccess }) => {
  const { textPrimary, textMuted, theme } = useThemeClasses();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError("Password does not meet requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = await onSubmit?.(password, token);
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
    <Card className="max-w-md mx-auto">
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
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
                <PasswordStrength password={password} />
              </div>

              <div className="space-y-2">
                <label className={cn("text-sm font-bold block", textPrimary)}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    disabled={loading}
                  />
                  {confirmPassword && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {password === confirmPassword ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <X className="w-4 h-4 text-rose-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading} animated>
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

export const EmailVerification: React.FC<{
  email?: string;
  onResend?: () => Promise<AuthResponse>;
  onVerified?: () => void;
}> = ({ email = "your@email.com", onResend, onVerified }) => {
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
    <Card className="max-w-md mx-auto">
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
            className="w-full"
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
            className={cn("text-sm font-bold text-[var(--primary)] hover:underline")}
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

export const TwoFactorAuth: React.FC<{
  onSubmit?: (code: string) => Promise<AuthResponse>;
  onResend?: () => Promise<AuthResponse>;
  method?: "sms" | "email" | "app";
}> = ({ onSubmit, onResend, method = "app" }) => {
  const { textPrimary, textMuted, theme } = useThemeClasses();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (newCode.every((digit) => digit) && newCode.join("").length === 6) {
      handleSubmit(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (fullCode: string) => {
    setError("");
    setLoading(true);

    try {
      const result = await onSubmit?.(fullCode);
      if (!result?.success) {
        setError(result?.error || "Invalid code");
        setCode(["", "", "", "", "", ""]);
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
  }[method];

  return (
    <Card className="max-w-md mx-auto">
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
            {code.map((digit, index) => (
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
                )}
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
            className="text-sm font-bold text-[var(--primary)] hover:underline flex items-center gap-2 mx-auto"
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

export const MagicLinkForm: React.FC<{
  onSubmit?: (email: string) => Promise<AuthResponse>;
}> = ({ onSubmit }) => {
  const { textPrimary, textMuted, theme } = useThemeClasses();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const result = await onSubmit?.(email);
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
    <Card className="max-w-md mx-auto">
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
                  We've sent a sign-in link to <strong>{email}</strong>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10"
                    disabled={loading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading} animated>
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
