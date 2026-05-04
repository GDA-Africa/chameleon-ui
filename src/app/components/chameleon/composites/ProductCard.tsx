import React from "react";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { cn } from "../utils";
import { Button, Badge } from "../atoms";
import { Card, CardContent } from "../molecules";
import { useThemeClasses } from "../context";
import type { ProductCardProps } from "./types";

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onClick,
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Card
      animated={animated}
      className={cn("group overflow-hidden", onClick && "cursor-pointer", className)}
      onClick={() => onClick?.(product)}
    >
      <div className="relative aspect-square bg-[var(--muted)] overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)]">
            <ShoppingCart className="w-8 h-8 opacity-30" />
          </div>
        )}
        {product.badge && (
          <div className="absolute top-2 left-2">
            <Badge>{product.badge}</Badge>
          </div>
        )}
        {discount && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-red-500 text-white">-{discount}%</Badge>
          </div>
        )}
        <button
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-black/60 text-[var(--muted-foreground)] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <p className={cn("text-xs", textMuted)}>{product.category}</p>
          <h3 className={cn("text-sm font-semibold truncate mt-0.5", textPrimary)}>{product.name}</h3>
        </div>

        {product.rating !== undefined && (
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className={cn("text-xs font-medium", textPrimary)}>{product.rating.toFixed(1)}</span>
            {product.reviewCount !== undefined && (
              <span className={cn("text-xs", textMuted)}>({product.reviewCount})</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className={cn("text-lg font-black", textPrimary)}>${product.price}</span>
            {product.originalPrice && (
              <span className={cn("text-xs line-through", textMuted)}>${product.originalPrice}</span>
            )}
          </div>
          <Button
            size="sm"
            animated={animated}
            onClick={(e) => { e.stopPropagation(); onAddToCart?.(product); }}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
