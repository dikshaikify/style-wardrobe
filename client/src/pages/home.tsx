import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function Home() {
  const { data: products, isLoading } = useProducts();
  
  const featuredProducts = products?.filter(p => p.featured).slice(0, 4) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* landing page hero scenic modern fashion minimal */}
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop" 
            alt="Hero Fashion" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
        </div>
        
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 max-w-4xl"
          >
            Redefining Your <br className="hidden md:block"/> Everyday Wardrobe
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/90 max-w-xl mb-10 text-balance"
          >
            Discover our new collection of minimalist essentials crafted from sustainable materials.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Button size="lg" className="h-14 px-8 text-base shadow-xl" asChild>
              <Link href="/products">
                Shop the Collection <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Featured Pieces</h2>
            <p className="text-muted-foreground text-lg">Curated selections for the modern minimalist.</p>
          </div>
          <Button variant="ghost" className="hidden md:flex group" asChild>
            <Link href="/products">
              View All <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
        
        <div className="mt-10 flex justify-center md:hidden">
          <Button variant="outline" className="w-full max-w-sm" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="bg-primary text-primary-foreground py-20 mt-10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Summer Sale Preview</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 text-balance">
              Sign up for our newsletter to get early access to our biggest sale of the year. Plus, receive 10% off your first order.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 transition-all"
              />
              <Button variant="secondary" className="whitespace-nowrap px-8">
                Subscribe
              </Button>
            </div>
          </div>
          <div className="w-full max-w-sm hidden lg:block rounded-xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
             {/* fashion promotional secondary image */}
             <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop" alt="Promo Style" className="w-full object-cover aspect-[4/5]" />
          </div>
        </div>
      </section>
    </div>
  );
}
