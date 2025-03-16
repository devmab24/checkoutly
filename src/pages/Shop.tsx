
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsByCategory, categories, Product } from "../data/products";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { CartDrawer } from "../components/ui/CartDrawer";
import { ProductGrid } from "../components/product/ProductGrid";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Filter, SlidersHorizontal, X } from "lucide-react";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const categoryParam = searchParams.get("category") || "all";

  // Fetch products based on category and filters
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call with delay
    const timer = setTimeout(() => {
      const fetchedProducts = getProductsByCategory(categoryParam);
      
      // Apply price filter
      const filteredProducts = fetchedProducts.filter(
        product => {
          const price = product.discountPrice || product.price;
          return price >= priceRange[0] && price <= priceRange[1];
        }
      );
      
      setProducts(filteredProducts);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [categoryParam, priceRange]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (value: string) => {
    searchParams.set("category", value);
    setSearchParams(searchParams);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        <div className="bg-muted/30 py-12">
          <div className="container-content">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Shop</h1>
            <p className="text-muted-foreground max-w-2xl">
              Browse our curated collection of premium products designed for exceptional performance and style
            </p>
          </div>
        </div>
        
        <div className="container-content py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <Tabs value={categoryParam} onValueChange={handleCategoryChange} className="w-full">
                <TabsList className="w-full h-auto flex flex-wrap justify-start p-1 bg-transparent">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex-shrink-0 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            <Button
              variant="outline"
              className="gap-2 ml-4 md:hidden"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block space-y-8">
              <div className="space-y-4">
                <h3 className="font-medium">Price Range</h3>
                <div className="space-y-6 px-2">
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={1500}
                    step={50}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between">
                    <div className="text-sm">{formatPrice(priceRange[0])}</div>
                    <div className="text-sm">{formatPrice(priceRange[1])}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="in-stock"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="in-stock" className="text-sm">In Stock</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="out-of-stock"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="out-of-stock" className="text-sm">Out of Stock</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Ratings</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`rating-${rating}`}
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked={rating >= 4}
                      />
                      <Label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                i < rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300 fill-current"
                              )}
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1">{rating === 5 ? "only" : "& up"}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Mobile Filters Overlay */}
            <div 
              className={cn(
                "fixed inset-0 z-50 bg-background md:hidden flex flex-col transform transition-transform duration-300 ease-in-out",
                isMobileFiltersOpen ? "translate-x-0" : "translate-x-full"
              )}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-medium text-lg flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-8">
                <div className="space-y-4">
                  <h3 className="font-medium">Price Range</h3>
                  <div className="space-y-6 px-2">
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={1500}
                      step={50}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex items-center justify-between">
                      <div className="text-sm">{formatPrice(priceRange[0])}</div>
                      <div className="text-sm">{formatPrice(priceRange[1])}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Availability</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="mobile-in-stock"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <Label htmlFor="mobile-in-stock">In Stock</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="mobile-out-of-stock"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <Label htmlFor="mobile-out-of-stock">Out of Stock</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Ratings</h3>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={`mobile-rating-${rating}`}
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked={rating >= 4}
                        />
                        <Label htmlFor={`mobile-rating-${rating}`} className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={cn(
                                  "w-4 h-4",
                                  i < rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300 fill-current"
                                )}
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1">{rating === 5 ? "only" : "& up"}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border-t p-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => setIsMobileFiltersOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsMobileFiltersOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Products */}
            <div className="md:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-muted animate-pulse rounded-lg overflow-hidden">
                      <div className="aspect-square" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                        <div className="h-4 bg-muted-foreground/20 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="text-sm text-muted-foreground mb-6">
                    Showing {products.length} products
                  </div>
                  <ProductGrid products={products} columns={3} />
                </>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search for something else.
                  </p>
                  <Button
                    onClick={() => {
                      setPriceRange([0, 1500]);
                      handleCategoryChange("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Shop;
