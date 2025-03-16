
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products } from "../../data/products";
import { Button } from "./button";
import { Input } from "./input";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (productId: string) => {
    setOpen(false);
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Search products..."
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Clear search"
              className="h-6 w-6"
              onClick={() => setSearch("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CommandList>
          <CommandEmpty>No products found.</CommandEmpty>
          <CommandGroup heading="Products">
            {filteredProducts.map((product) => (
              <CommandItem
                key={product.id}
                onSelect={() => handleSelect(product.id)}
                className="flex items-center"
              >
                <div className="h-10 w-10 rounded-md border overflow-hidden mr-2">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span>{product.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ${product.discountPrice || product.price}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
