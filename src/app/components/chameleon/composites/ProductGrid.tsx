import React, { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "../utils";
import { Input } from "../atoms";
import { useThemeClasses } from "../context";
import { ProductCard } from "./ProductCard";
import type { ProductGridProps, Product } from "./types";

const DEFAULT_PRODUCTS: Product[] = [
  { id: "1", name: "Wireless Headphones", price: 79, originalPrice: 99, category: "Audio", rating: 4.8, reviewCount: 142, badge: "Best Seller" },
  { id: "2", name: "Smart Watch Pro", price: 249, category: "Wearables", rating: 4.6, reviewCount: 89 },
  { id: "3", name: "Laptop Stand", price: 45, originalPrice: 60, category: "Accessories", rating: 4.9, reviewCount: 203 },
  { id: "4", name: "USB-C Hub", price: 39, category: "Accessories", rating: 4.7, reviewCount: 67, badge: "New" },
  { id: "5", name: "Mechanical Keyboard", price: 129, category: "Input", rating: 4.8, reviewCount: 178 },
  { id: "6", name: "Monitor Light Bar", price: 55, originalPrice: 70, category: "Lighting", rating: 4.5, reviewCount: 92 },
];

const colsMap = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };

export const ProductGrid: React.FC<ProductGridProps> = ({
  heading,
  products = DEFAULT_PRODUCTS,
  onProductClick,
  onAddToCart,
  searchable = true,
  columns = 3,
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [query, setQuery] = useState("");

  const filtered = query
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.category?.toLowerCase().includes(query.toLowerCase()))
    : products;

  return (
    <section className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {heading && <h2 className={cn("text-2xl font-black", textPrimary)}>{heading}</h2>}
        {searchable && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <Input className="pl-9 w-48 sm:w-64" placeholder="Search products…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className={cn("text-center py-10", textMuted)}>No products found.</p>
      ) : (
        <div className={cn("grid grid-cols-1 gap-6", colsMap[columns])}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onClick={onProductClick} animated={animated} />
          ))}
        </div>
      )}
    </section>
  );
};
