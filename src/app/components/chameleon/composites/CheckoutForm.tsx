import React, { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { cn } from "../utils";
import { Button, Input } from "../atoms";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules";
import { useThemeClasses } from "../context";
import type { CheckoutFormProps } from "./types";

const DEFAULT_COUNTRIES = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "gb" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
];

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmit,
  countries = DEFAULT_COUNTRIES,
  isLoading = false,
  total,
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [form, setForm] = useState<Record<string, string>>({
    firstName: "", lastName: "", email: "", address: "", city: "", country: "us", postal: "", cardNumber: "", expiry: "", cvv: "",
  });

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  const inputCls = "w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]";

  return (
    <form onSubmit={handleSubmit}>
      <Card animated={animated} className={cn(className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" /> Checkout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <fieldset className="space-y-3">
            <legend className={cn("text-sm font-semibold", textPrimary)}>Contact</legend>
            <div className="grid sm:grid-cols-2 gap-3">
              <input className={inputCls} placeholder="First name" value={form.firstName} onChange={set("firstName")} required />
              <input className={inputCls} placeholder="Last name" value={form.lastName} onChange={set("lastName")} required />
            </div>
            <input className={inputCls} type="email" placeholder="Email" value={form.email} onChange={set("email")} required />
          </fieldset>

          <fieldset className="space-y-3">
            <legend className={cn("text-sm font-semibold", textPrimary)}>Shipping</legend>
            <input className={inputCls} placeholder="Street address" value={form.address} onChange={set("address")} required />
            <div className="grid sm:grid-cols-3 gap-3">
              <input className={inputCls} placeholder="City" value={form.city} onChange={set("city")} required />
              <select className={inputCls} value={form.country} onChange={set("country")}>
                {countries.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
              <input className={inputCls} placeholder="Postal" value={form.postal} onChange={set("postal")} required />
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className={cn("text-sm font-semibold", textPrimary)}>Payment</legend>
            <input className={inputCls} placeholder="Card number" maxLength={19} value={form.cardNumber} onChange={set("cardNumber")} required />
            <div className="grid grid-cols-2 gap-3">
              <input className={inputCls} placeholder="MM/YY" maxLength={5} value={form.expiry} onChange={set("expiry")} required />
              <input className={inputCls} placeholder="CVV" maxLength={4} value={form.cvv} onChange={set("cvv")} required />
            </div>
          </fieldset>

          <Button type="submit" className="w-full" animated={animated} disabled={isLoading}>
            <Lock className="w-4 h-4 mr-2" />
            {isLoading ? "Processing…" : total ? `Pay $${total.toFixed(2)}` : "Place Order"}
          </Button>
          <p className={cn("text-center text-xs", textMuted)}>🔒 Your payment is secured and encrypted</p>
        </CardContent>
      </Card>
    </form>
  );
};
