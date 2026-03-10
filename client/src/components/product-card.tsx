import { type Product } from "@shared/schema";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export function ProductCard({ product, index = 0 }: { product: Product, index?: number }) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group flex flex-col hover-elevate rounded-lg bg-card"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 flex justify-center bg-gradient-to-t from-black/60 to-transparent">
          <Button 
            className="w-full shadow-lg gap-2" 
            onClick={() => addToCart(product)}
            variant="secondary"
          >
            <ShoppingBag className="w-4 h-4" />
            Quick Add
          </Button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col gap-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-medium text-base truncate">{product.name}</h3>
          <span className="font-medium whitespace-nowrap">${Number(product.price).toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
      </div>
    </motion.div>
  );
}
