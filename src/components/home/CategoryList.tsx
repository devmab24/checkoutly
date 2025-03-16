
import { Link } from "react-router-dom";
import { categories } from "../../data/products";
import { cn } from "@/lib/utils";

interface CategoryListProps {
  className?: string;
}

export function CategoryList({ className }: CategoryListProps) {
  // Skip the "All Products" category from the display
  const displayCategories = categories.filter(cat => cat.id !== 'all');
  
  const getCategoryImage = (categoryId: string) => {
    switch (categoryId) {
      case 'electronics':
        return "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=800";
      case 'audio':
        return "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800";
      case 'accessories':
        return "https://images.unsplash.com/photo-1625413803224-3eb4ae5f7b3e?q=80&w=800";
      case 'wearables':
        return "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=800";
      default:
        return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800";
    }
  };

  return (
    <section className={cn("py-16", className)}>
      <div className="container-content">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our curated collections of premium products across various categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative overflow-hidden rounded-lg aspect-square transition-all duration-300 hover:shadow-lg"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${getCategoryImage(category.id)})` }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-medium mb-1">{category.name}</h3>
                  <div className="text-white/80 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Explore Collection
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
