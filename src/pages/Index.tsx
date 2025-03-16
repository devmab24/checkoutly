
import { useEffect } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/home/Hero";
import { CategoryList } from "../components/home/CategoryList";
import { FeaturedProducts } from "../components/product/FeaturedProducts";
import { CartDrawer } from "../components/ui/CartDrawer";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        <Hero />
        <CategoryList />
        <FeaturedProducts />
        
        {/* Testimonials or additional section can go here */}
        <section className="py-16 bg-muted/30">
          <div className="container-content text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Crafted for Excellence
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our products combine beautiful design with exceptional quality and functionality,
              ensuring an experience that delights from unboxing to everyday use.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
