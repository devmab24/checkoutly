
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedButton } from "../ui/AnimatedButton";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section 
      className={cn(
        "relative overflow-hidden bg-background py-20 md:py-28",
        className
      )}
    >
      <div className="container-content relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
              New Collection
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Premium Quality <br className="hidden md:inline" />
              <span className="text-accent">Modern Design</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto lg:mx-0">
              Experience exceptional craftsmanship with our curated selection of premium products.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <AnimatedButton size="lg" asChild>
                <Link to="/shop" className="flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </AnimatedButton>
              
              <AnimatedButton variant="outline" size="lg" asChild>
                <Link to="/shop?category=featured">
                  View Featured
                </Link>
              </AnimatedButton>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square md:aspect-[4/5] relative z-10 overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1548" 
                alt="Premium product" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 h-64 w-64 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-48 w-48 bg-accent/5 rounded-full blur-3xl" />
            
            {/* Product features */}
            <div className="absolute -left-6 top-1/4 bg-background border shadow-md rounded-lg p-4 w-48 animate-float">
              <div className="font-medium mb-1">Premium Design</div>
              <div className="text-sm text-muted-foreground">Crafted with attention to every detail</div>
            </div>
            
            <div className="absolute -right-6 bottom-1/4 bg-background border shadow-md rounded-lg p-4 w-48 animate-float delay-700">
              <div className="font-medium mb-1">Superior Quality</div>
              <div className="text-sm text-muted-foreground">Built to last with the finest materials</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-accent/5 -z-10" />
      <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl -z-10" />
      <div className="absolute top-1/4 -left-20 h-60 w-60 rounded-full bg-accent/5 blur-3xl -z-10" />
    </section>
  );
}
