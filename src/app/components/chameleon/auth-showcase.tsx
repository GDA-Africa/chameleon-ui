/**
 * Authentication Flow Showcase
 * Interactive demonstration of all auth components
 */

import React, { useState } from "react";
import {
  LogIn,
  UserPlus,
  Key,
  RefreshCw,
  Mail,
  Shield,
  Sparkles,
  ArrowLeft,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button, Badge } from "./atoms";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./molecules";
import { useThemeClasses } from "./context";
import { cn } from "./utils";
import {
  LoginForm,
  SignUpForm,
  ForgotPasswordForm,
  ResetPasswordForm,
  EmailVerification,
  TwoFactorAuth,
  MagicLinkForm,
  type AuthResponse,
} from "./auth-components";

type AuthFlow =
  | "login"
  | "signup"
  | "forgot-password"
  | "reset-password"
  | "email-verification"
  | "two-factor-sms"
  | "two-factor-email"
  | "two-factor-app"
  | "magic-link";

export const AuthShowcase: React.FC = () => {
  const { textPrimary, textMuted, cardClass, theme } = useThemeClasses();
  const [activeFlow, setActiveFlow] = useState<AuthFlow>("login");
  const [demoEmail, setDemoEmail] = useState("demo@example.com");

  // Mock handlers
  const mockLoginHandler = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { success: true, message: "Login successful" };
  };

  const mockSignUpHandler = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { success: true, message: "Account created" };
  };

  const mockForgotPasswordHandler = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setDemoEmail(email);
    return { success: true, message: "Email sent" };
  };

  const mockResetPasswordHandler = async (password: string, token: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { success: true, message: "Password reset" };
  };

  const mockResendHandler = async (): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, message: "Email resent" };
  };

  const mock2FAHandler = async (code: string): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (code === "123456") {
      return { success: true, message: "Verified" };
    }
    return { success: false, message: "Invalid code" };
  };

  const mockSocialLoginHandler = (provider: string) => {
    console.log("Social login:", provider);
  };

  const authFlows = [
    { id: "login" as const, label: "Login", icon: LogIn, desc: "Email + Password" },
    { id: "signup" as const, label: "Sign Up", icon: UserPlus, desc: "Create Account" },
    { id: "forgot-password" as const, label: "Forgot Password", icon: Key, desc: "Reset Request" },
    {
      id: "reset-password" as const,
      label: "Reset Password",
      icon: RefreshCw,
      desc: "New Password",
    },
    { id: "email-verification" as const, label: "Email Verify", icon: Mail, desc: "Confirm Email" },
    { id: "two-factor-app" as const, label: "2FA - App", icon: Shield, desc: "Authenticator" },
    { id: "two-factor-sms" as const, label: "2FA - SMS", icon: Shield, desc: "Phone Code" },
    { id: "magic-link" as const, label: "Magic Link", icon: Sparkles, desc: "Passwordless" },
  ];

  const renderAuthComponent = () => {
    switch (activeFlow) {
      case "login":
        return (
          <LoginForm
            onSubmit={mockLoginHandler}
            onForgotPassword={() => setActiveFlow("forgot-password")}
            onSignUp={() => setActiveFlow("signup")}
            onSocialLogin={mockSocialLoginHandler}
          />
        );

      case "signup":
        return (
          <SignUpForm
            onSubmit={mockSignUpHandler}
            onSignIn={() => setActiveFlow("login")}
            onSocialLogin={mockSocialLoginHandler}
          />
        );

      case "forgot-password":
        return (
          <ForgotPasswordForm
            onSubmit={mockForgotPasswordHandler}
            onBack={() => setActiveFlow("login")}
          />
        );

      case "reset-password":
        return (
          <ResetPasswordForm
            token="demo-token-123"
            onSubmit={mockResetPasswordHandler}
            onSuccess={() => setActiveFlow("login")}
          />
        );

      case "email-verification":
        return (
          <EmailVerification
            email={demoEmail}
            onResend={mockResendHandler}
            onVerified={() => setActiveFlow("login")}
          />
        );

      case "two-factor-app":
        return (
          <TwoFactorAuth method="app" onSubmit={mock2FAHandler} onResend={mockResendHandler} />
        );

      case "two-factor-sms":
        return (
          <TwoFactorAuth method="sms" onSubmit={mock2FAHandler} onResend={mockResendHandler} />
        );

      case "two-factor-email":
        return (
          <TwoFactorAuth method="email" onSubmit={mock2FAHandler} onResend={mockResendHandler} />
        );

      case "magic-link":
        return <MagicLinkForm onSubmit={mockForgotPasswordHandler} />;

      default:
        return null;
    }
  };

  return (
    <div className="pb-20 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-14 h-14 flex items-center justify-center text-[var(--primary-foreground)]",
              theme === "minimalist"
                ? "bg-black"
                : theme === "liquid"
                  ? "bg-gradient-to-br from-violet-500 to-purple-500 rounded-full"
                  : theme === "glassy"
                    ? "bg-white/10 rounded-2xl"
                    : "bg-[var(--primary)] rounded-2xl shadow-xl shadow-[var(--primary)]/20",
            )}
          >
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <h1 className={cn("text-5xl font-black tracking-tight", textPrimary)}>
              Authentication Flows
            </h1>
            <p className={cn("text-xl mt-1", textMuted)}>Complete auth system for all use cases</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Badge className="px-3 py-1.5 bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
            <Check className="w-3 h-3 mr-1.5" />8 Components
          </Badge>
          <Badge className="px-3 py-1.5 bg-blue-500/10 text-blue-600 border-blue-500/30">
            <Check className="w-3 h-3 mr-1.5" />
            Social Login
          </Badge>
          <Badge className="px-3 py-1.5 bg-purple-500/10 text-purple-600 border-purple-500/30">
            <Check className="w-3 h-3 mr-1.5" />
            2FA Support
          </Badge>
          <Badge className="px-3 py-1.5 bg-amber-500/10 text-amber-600 border-amber-500/30">
            <Check className="w-3 h-3 mr-1.5" />
            All Themes
          </Badge>
        </div>
      </div>

      {/* Flow Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Authentication Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {authFlows.map((flow) => {
              const isActive = activeFlow === flow.id;
              return (
                <motion.button
                  key={flow.id}
                  onClick={() => setActiveFlow(flow.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all text-left",
                    theme === "minimalist" && "rounded-none",
                    isActive
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-[var(--border)] hover:border-[var(--primary)]/30",
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <flow.icon
                      className={cn(
                        "w-5 h-5",
                        isActive ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]",
                      )}
                    />
                    <span className={cn("font-bold text-sm", isActive ? textPrimary : textMuted)}>
                      {flow.label}
                    </span>
                  </div>
                  <p className={cn("text-xs", textMuted)}>{flow.desc}</p>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Component Display */}
      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFlow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderAuthComponent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
              <Check className="w-6 h-6" />
            </div>
            <h3 className={cn("font-bold text-lg mb-2", textPrimary)}>Complete Validation</h3>
            <p className={cn("text-sm leading-relaxed", textMuted)}>
              Built-in email validation, password strength checking, and real-time feedback for all
              inputs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className={cn("font-bold text-lg mb-2", textPrimary)}>Security First</h3>
            <p className={cn("text-sm leading-relaxed", textMuted)}>
              2FA support (SMS, Email, App), magic links, and secure password reset flows out of the
              box.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className={cn("font-bold text-lg mb-2", textPrimary)}>Theme Adaptive</h3>
            <p className={cn("text-sm leading-relaxed", textMuted)}>
              All components automatically adapt to your active theme with perfect contrast and
              styling.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="import">
            <TabsList>
              <TabsTrigger value="import">Import</TabsTrigger>
              <TabsTrigger value="basic">Basic Usage</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="import" className="space-y-3">
              <p className={cn("text-sm", textMuted)}>Import the components you need:</p>
              <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-xs overflow-x-auto">
                <pre>{`import {
  LoginForm,
  SignUpForm,
  ForgotPasswordForm,
  ResetPasswordForm,
  EmailVerification,
  TwoFactorAuth,
  MagicLinkForm
} from './components/chameleon/auth-components';`}</pre>
              </div>
            </TabsContent>

            <TabsContent value="basic" className="space-y-3">
              <p className={cn("text-sm", textMuted)}>Minimal setup for a login form:</p>
              <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-xs overflow-x-auto">
                <pre>{`<LoginForm
  onSubmit={async (email, password) => {
    const result = await login(email, password);
    return { success: result.ok, error: result.error };
  }}
  onForgotPassword={() => navigate('/forgot-password')}
  onSignUp={() => navigate('/signup')}
  onSocialLogin={(provider) => socialAuth(provider)}
/>`}</pre>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-3">
              <p className={cn("text-sm", textMuted)}>Complete flow with state management:</p>
              <div className="bg-slate-950 text-slate-50 p-4 rounded-xl font-mono text-xs overflow-x-auto">
                <pre>{`const [authStep, setAuthStep] = useState<'login' | '2fa'>('login');

{authStep === 'login' && (
  <LoginForm
    onSubmit={async (email, password) => {
      const result = await login(email, password);
      if (result.requires2FA) {
        setAuthStep('2fa');
        return { success: true };
      }
      return result;
    }}
  />
)}

{authStep === '2fa' && (
  <TwoFactorAuth
    method="app"
    onSubmit={verify2FACode}
  />
)}`}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
