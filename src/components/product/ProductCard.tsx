
import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { ShoppingBag, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedButton } from "../ui/AnimatedButton";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // Format price with proper currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div 
      className={cn(
        "group relative bg-background rounded-lg overflow-hidden transition-all duration-300",
        featured ? "md:col-span-2" : "",
        "hover:shadow-lg border border-border hover:border-border/50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/9] md:aspect-[2/1]" : "aspect-square",
        )}>
          <div 
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-transform duration-700",
              isHovered && product.images.length > 1 ? "opacity-0" : "opacity-100",
              !isImageLoaded && "image-loading"
            )}
            style={{ backgroundImage: `url(${product.images[0]})` }}
          />
          {product.images.length > 1 && (
            <div 
              className={cn(
                "absolute inset-0 bg-cover bg-center transition-opacity duration-700",
                isHovered ? "opacity-100" : "opacity-0",
                !isImageLoaded && "image-loading"
              )}
              style={{ backgroundImage: `url(${product.images[1]})` }}
            />
          )}
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="opacity-0 absolute pointer-events-none"
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Product badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.discountPrice && (
              <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
                SALE
              </span>
            )}
            {!product.inStock && (
              <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded">
                OUT OF STOCK
              </span>
            )}
          </div>
          
          {/* Quick actions */}
          <div className={cn(
            "absolute bottom-4 right-4 flex gap-2 transform transition-all duration-300",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <AnimatedButton
              size="icon"
              variant="secondary"
              className="rounded-full bg-background border shadow-sm h-9 w-9"
              onClick={(e) => e.preventDefault()}
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </AnimatedButton>
            <AnimatedButton
              size="icon"
              variant="secondary"
              className="rounded-full bg-background border shadow-sm h-9 w-9"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-4 w-4" />
            </AnimatedButton>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-base tracking-tight line-clamp-2 mb-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 fill-current"
                  )}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center">
            {product.discountPrice ? (
              <>
                <span className="font-medium">{formatPrice(product.discountPrice)}</span>
                <span className="text-muted-foreground line-through ml-2 text-sm">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="font-medium">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
