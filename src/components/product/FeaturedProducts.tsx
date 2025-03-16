
import { useState, useEffect } from "react";
import { getFeaturedProducts, Product } from "../../data/products";
import { ProductGrid } from "./ProductGrid";
import { cn } from "@/lib/utils";

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function FeaturedProducts({
  title = "Featured Products",
  subtitle = "Explore our handpicked selection of premium products",
  className,
}: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      setProducts(getFeaturedProducts());
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="container-content">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-muted animate-pulse rounded-lg overflow-hidden">
                <div className="aspect-square" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                  <div className="h-4 bg-muted-foreground/20 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid products={products} featuredLayout />
        )}
      </div>
    </section>
  );
}
