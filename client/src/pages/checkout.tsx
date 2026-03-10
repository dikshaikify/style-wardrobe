import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useCart } from "@/context/cart-context";
import { useCreateOrder } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  address: z.string().min(5, "Full address is required"),
  paymentMethod: z.enum(["card", "paypal", "apple_pay"]),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export function Checkout() {
  const [, setLocation] = useLocation();
  const { items, total, clearCart, setIsCartOpen } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const createOrder = useCreateOrder();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "card"
    }
  });

  const paymentMethod = watch("paymentMethod");

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center space-y-6 bg-card p-8 rounded-2xl shadow-xl border"
        >
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for shopping with AURA. We've sent a confirmation email with your order details.
          </p>
          <Button size="lg" className="w-full mt-4" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-24 px-4 text-center">
        <ShoppingBag className="w-20 h-20 text-muted-foreground/30 mb-6" />
        <h1 className="font-serif text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button size="lg" asChild>
          <Link href="/products">Browse Collection</Link>
        </Button>
      </div>
    );
  }

  const onSubmit = (data: CheckoutForm) => {
    createOrder.mutate(
      {
        order: {
          customerName: data.customerName,
          email: data.email,
          address: data.address,
          paymentMethod: data.paymentMethod,
          total: total.toString(),
        },
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price.toString()
        }))
      },
      {
        onSuccess: () => {
          clearCart();
          setIsCartOpen(false);
          setIsSuccess(true);
        }
      }
    );
  };

  return (
    <div className="container mx-auto px-4 md:px-6 pt-32 pb-24 min-h-screen">
      <h1 className="font-serif text-4xl font-bold mb-10">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Section */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Where should we send your receipt?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    placeholder="you@example.com" 
                    {...register("email")} 
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
                <CardDescription>Where should we deliver your order?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Full Name</Label>
                  <Input 
                    id="customerName" 
                    placeholder="John Doe" 
                    {...register("customerName")}
                    className={errors.customerName ? "border-destructive" : ""}
                  />
                  {errors.customerName && <p className="text-xs text-destructive">{errors.customerName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Fashion St, NY 10001" 
                    {...register("address")}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>All transactions are secure and encrypted.</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  defaultValue="card" 
                  onValueChange={(val) => setValue("paymentMethod", val as "card" | "paypal" | "apple_pay")}
                  className="space-y-3"
                >
                  <div className={`flex items-center space-x-3 border p-4 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : ''}`}>
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer font-medium">Credit Card (Dummy)</Label>
                  </div>
                  <div className={`flex items-center space-x-3 border p-4 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : ''}`}>
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer font-medium">PayPal</Label>
                  </div>
                  <div className={`flex items-center space-x-3 border p-4 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'apple_pay' ? 'border-primary bg-primary/5' : ''}`}>
                    <RadioGroupItem value="apple_pay" id="apple_pay" />
                    <Label htmlFor="apple_pay" className="flex-1 cursor-pointer font-medium">Apple Pay</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 xl:col-span-4">
          <Card className="sticky top-24 shadow-lg border-primary/10">
            <CardHeader className="bg-muted/50 pb-4 border-b">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 hide-scrollbar">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-20 rounded bg-muted overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="font-medium mt-1">${(Number(item.product.price) * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes</span>
                  <span>Calculated at next step</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                form="checkout-form" 
                className="w-full mt-8 h-12 text-base shadow-xl"
                disabled={createOrder.isPending}
              >
                {createOrder.isPending ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
