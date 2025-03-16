
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { categories } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/ui/SearchDialog";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const location = useLocation();
  const { openCart, itemCount } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out",
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
    >
      <div className="container-content py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            LUXESTORE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                location.pathname === "/" && "text-accent"
              )}
            >
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setIsHoveringNav(true)}
              onMouseLeave={() => setIsHoveringNav(false)}
            >
              <Link
                to="/shop"
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-accent",
                  location.pathname === "/shop" && "text-accent",
                  "gap-1"
                )}
              >
                Shop
                <ChevronDown className="h-4 w-4" />
              </Link>
              {isHoveringNav && (
                <div className="absolute top-full left-0 mt-1 py-2 w-48 bg-background border rounded-md shadow-lg animate-fade-in z-50">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/shop?category=${category.id}`}
                      className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                location.pathname === "/about" && "text-accent"
              )}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                location.pathname === "/contact" && "text-accent"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <SearchDialog />
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Account"
              className="hidden md:flex"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              className="relative"
              onClick={openCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium h-5 w-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Menu"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t animate-fade-in">
          <nav className="container py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className={cn(
                "text-base font-medium py-2 transition-colors",
                location.pathname === "/" && "text-accent"
              )}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={cn(
                "text-base font-medium py-2 transition-colors",
                location.pathname === "/shop" && "text-accent"
              )}
            >
              Shop
            </Link>
            <div className="pl-4 space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/shop?category=${category.id}`}
                  className="block py-1 text-sm text-muted-foreground hover:text-accent"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <Link
              to="/about"
              className={cn(
                "text-base font-medium py-2 transition-colors",
                location.pathname === "/about" && "text-accent"
              )}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={cn(
                "text-base font-medium py-2 transition-colors",
                location.pathname === "/contact" && "text-accent"
              )}
            >
              Contact
            </Link>
            <div className="flex items-center space-x-4 pt-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => {
                setIsMobileMenuOpen(false);
                document.querySelector<HTMLButtonElement>(".search-dialog-trigger")?.click();
              }}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
