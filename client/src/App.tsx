import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "@/lib/theme-provider";
import { CartProvider } from "@/context/cart-context";

// Layout Components
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";

// Pages
import { Home } from "@/pages/home";
import { Products } from "@/pages/products";
import { Checkout } from "@/pages/checkout";
import { Contact } from "@/pages/contact";

function Router() {
  return (
    <main className="flex-1 flex flex-col">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="aura-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
              <Navbar />
              <Router />
              <Footer />
              <CartDrawer />
            </div>
            <Toaster />
          </CartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
