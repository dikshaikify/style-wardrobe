import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-muted py-12 border-t mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-serif font-bold tracking-tight inline-block mb-4">
              AURA
            </Link>
            <p className="text-muted-foreground max-w-sm text-balance">
              Elevating everyday essentials with premium materials and timeless design. Redefining modern luxury for the conscious consumer.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products?category=women" className="hover:text-primary transition-colors">Women's Collection</Link></li>
              <li><Link href="/products?category=men" className="hover:text-primary transition-colors">Men's Collection</Link></li>
              <li><Link href="/products?category=kids" className="hover:text-primary transition-colors">Kids' Essentials</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">View All</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><span className="cursor-not-allowed opacity-70">FAQ</span></li>
              <li><span className="cursor-not-allowed opacity-70">Shipping & Returns</span></li>
              <li><span className="cursor-not-allowed opacity-70">Size Guide</span></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50 text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} AURA. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="cursor-not-allowed hover:text-primary transition-colors">Privacy Policy</span>
            <span className="cursor-not-allowed hover:text-primary transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
