import React from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { cn } from "../utils";
import { Button } from "../atoms";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules";
import { useThemeClasses } from "../context";
import type { CartSummaryProps, CartItem } from "./types";

const DEFAULT_ITEMS: CartItem[] = [
  { id: "1", name: "Wireless Headphones", price: 79, quantity: 1 },
  { id: "2", name: "USB-C Hub", price: 39, quantity: 2 },
];

export const CartSummary: React.FC<CartSummaryProps> = ({
  items = DEFAULT_ITEMS,
  subtotal,
  tax,
  discount,
  total,
  onCheckout,
  onUpdateQuantity,
  onRemoveItem,
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();

  const computedSubtotal = subtotal ?? items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const computedTax = tax ?? computedSubtotal * 0.1;
  const computedTotal = total ?? (computedSubtotal + computedTax - (discount ?? 0));

  return (
    <Card animated={animated} className={cn(className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" /> Cart ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <p className={cn("text-sm text-center py-6", textMuted)}>Your cart is empty</p>
        ) : (
          <>
            <ul className="divide-y divide-[var(--border)]">
              {items.map((item) => (
                <li key={item.id} className="py-3 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[var(--muted)] overflow-hidden shrink-0">
                    {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-medium truncate", textPrimary)}>{item.name}</p>
                    <p className={cn("text-xs", textMuted)}>${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity?.(item.id, Math.max(0, item.quantity - 1))}
                      className="w-6 h-6 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)] transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className={cn("text-sm w-4 text-center", textPrimary)}>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)] transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button onClick={() => onRemoveItem?.(item.id)} className="ml-2 text-[var(--muted-foreground)] hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-[var(--border)] pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className={textMuted}>Subtotal</span>
                <span className={textPrimary}>${computedSubtotal.toFixed(2)}</span>
              </div>
              {discount && (
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-500">Discount</span>
                  <span className="text-emerald-500">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className={textMuted}>Tax (10%)</span>
                <span className={textPrimary}>${computedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-[var(--border)]">
                <span className={textPrimary}>Total</span>
                <span className={textPrimary}>${computedTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full" animated={animated} onClick={onCheckout}>
              Proceed to Checkout
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
