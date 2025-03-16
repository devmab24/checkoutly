
import { Product } from "../../data/products";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  featuredLayout?: boolean;
}

export function ProductGrid({ 
  products, 
  columns = 3, 
  featuredLayout = false 
}: ProductGridProps) {
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  if (featuredLayout && products.length > 0) {
    // Featured layout with first product being larger
    return (
      <div className={`grid ${getGridCols()} gap-6`}>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            featured={index === 0}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${getGridCols()} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
