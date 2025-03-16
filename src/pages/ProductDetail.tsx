
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { CartDrawer } from "../components/ui/CartDrawer";
import { AnimatedButton } from "../components/ui/AnimatedButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Minus, Plus, ShoppingBag, ChevronRight } from "lucide-react";
import { FeaturedProducts } from "../components/product/FeaturedProducts";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top and fetch product
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    
    // Simulate API call
    const timer = setTimeout(() => {
      if (id) {
        setProduct(getProductById(id));
      }
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = () => {
    if (product && product.inStock) {
      addToCart(product, quantity);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        <div className="container-content py-8">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/shop" className="hover:text-foreground transition-colors">
              Shop
            </Link>
            {product && (
              <>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link 
                  to={`/shop?category=${product.category}`}
                  className="hover:text-foreground transition-colors capitalize"
                >
                  {product.category}
                </Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-foreground truncate max-w-[200px]">
                  {product.name}
                </span>
              </>
            )}
          </nav>
          
          {isLoading || !product ? (
            // Loading skeleton
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-muted animate-pulse rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted animate-pulse rounded w-3/4"></div>
                <div className="h-4 bg-muted animate-pulse rounded w-1/4"></div>
                <div className="h-24 bg-muted animate-pulse rounded"></div>
                <div className="h-10 bg-muted animate-pulse rounded w-1/2"></div>
                <div className="h-12 bg-muted animate-pulse rounded"></div>
              </div>
            </div>
          ) : (
            // Product details
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden border">
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        className={cn(
                          "aspect-square rounded overflow-hidden border transition-all",
                          selectedImage === index 
                            ? "ring-2 ring-accent ring-offset-2" 
                            : "opacity-70 hover:opacity-100"
                        )}
                        onClick={() => setSelectedImage(index)}
                      >
                        <img 
                          src={image} 
                          alt={`${product.name} - View ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300 fill-current"
                          )}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    
                    {!product.inStock && (
                      <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded">
                        OUT OF STOCK
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-muted-foreground">{product.description}</p>
                
                <div className="flex items-baseline gap-4">
                  {product.discountPrice ? (
                    <>
                      <span className="text-2xl font-bold">{formatPrice(product.discountPrice)}</span>
                      <span className="text-muted-foreground line-through text-lg">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                  )}
                </div>
                
                {/* Color options */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3">Color</h3>
                    <div className="flex gap-3">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          className={cn(
                            "h-8 w-8 rounded-full border-2 transition-all",
                            index === 0 ? "ring-2 ring-accent ring-offset-2" : ""
                          )}
                          style={{ backgroundColor: color }}
                          aria-label={`Select color ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quantity selector and add to cart */}
                <div className="space-y-4">
                  <h3 className="font-medium">Quantity</h3>
                  <div className="flex gap-6">
                    <div className="flex items-center border rounded h-12">
                      <button
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="w-12 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={increaseQuantity}
                        className="w-12 flex items-center justify-center text-muted-foreground hover:text-foreground"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <AnimatedButton
                      className="flex-1 text-base"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Add to Cart
                    </AnimatedButton>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                {/* Product specifications */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <div className="space-y-4 pt-4">
                    <Separator />
                    <h3 className="font-medium">Specifications</h3>
                    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <dt className="text-sm text-muted-foreground">{key}</dt>
                          <dd className="text-sm font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Related products */}
        <FeaturedProducts 
          title="You May Also Like" 
          subtitle="Explore more products in our collection"
        />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default ProductDetail;
