import { useState } from "react";
import { useLocation } from "wouter";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Men", "Women", "Kids"];

export function Products() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get("category");
  
  const [activeCategory, setActiveCategory] = useState(
    initialCategory && CATEGORIES.map(c => c.toLowerCase()).includes(initialCategory.toLowerCase()) 
      ? initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1)
      : "All"
  );

  const { data: products, isLoading } = useProducts();

  const filteredProducts = products?.filter(p => 
    activeCategory === "All" ? true : p.category.toLowerCase() === activeCategory.toLowerCase()
  ) || [];

  return (
    <div className="container mx-auto px-4 md:px-6 pt-32 pb-24 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">The Collection</h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            Explore our complete range of premium clothing. Filter by category to find exactly what you're looking for.
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 gap-2 hide-scrollbar">
          {CATEGORIES.map(cat => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              className={cn(
                "rounded-full px-6 transition-all duration-300",
                activeCategory === cat ? "shadow-md" : ""
              )}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[3/4] w-full rounded-lg" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="py-24 text-center text-muted-foreground"
            >
              <p className="text-xl">No products found in this category.</p>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-12"
            >
              <AnimatePresence>
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
