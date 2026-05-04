import React from "react";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { cn } from "../utils";
import { Button, Badge } from "../atoms";
import { Card, CardContent } from "../molecules";
import { useThemeClasses } from "../context";
import type { OrderConfirmationProps, Order } from "./types";

const DEFAULT_ORDER: Order = {
  id: "ORD-00142",
  date: new Date().toLocaleDateString(),
  items: [
    { id: "1", name: "Wireless Headphones", price: 79, quantity: 1 },
    { id: "2", name: "USB-C Hub", price: 39, quantity: 2 },
  ],
  subtotal: 157,
  tax: 15.7,
  total: 172.7,
  estimatedDelivery: "3–5 business days",
};

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  order = DEFAULT_ORDER,
  onContinueShopping,
  onViewOrder,
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();

  return (
    <Card animated={animated} className={cn("text-center max-w-lg mx-auto", className)}>
      <CardContent className="p-8 space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className={cn("text-2xl font-black", textPrimary)}>Order Confirmed!</h2>
          <p className={cn("text-sm", textMuted)}>Thank you! Your order #{order.id} has been placed.</p>
          <Badge>Order #{order.id}</Badge>
        </div>

        <div className="text-left border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-[var(--muted)]/30 border-b border-[var(--border)]">
            <p className={cn("text-sm font-semibold", textPrimary)}>Order Summary</p>
          </div>
          <ul className="divide-y divide-[var(--border)]">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between px-4 py-3">
                <span className={cn("text-sm", textPrimary)}>{item.name} × {item.quantity}</span>
                <span className={cn("text-sm font-medium", textPrimary)}>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="px-4 py-3 border-t border-[var(--border)] flex justify-between">
            <span className={cn("text-sm font-bold", textPrimary)}>Total</span>
            <span className={cn("text-sm font-bold", textPrimary)}>${order.total.toFixed(2)}</span>
          </div>
        </div>

        {order.estimatedDelivery && (
          <div className="flex items-center justify-center gap-2">
            <Package className="w-4 h-4 text-[var(--primary)]" />
            <p className={cn("text-sm", textMuted)}>Estimated delivery: <strong className={textPrimary}>{order.estimatedDelivery}</strong></p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onViewOrder && (
            <Button variant="outline" animated={animated} onClick={onViewOrder}>
              View Order Details
            </Button>
          )}
          {onContinueShopping && (
            <Button animated={animated} onClick={onContinueShopping}>
              Continue Shopping <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
