
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Address } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Truck, CheckCircle } from "lucide-react";

// Payment method options
const paymentMethods = [
  { id: "credit-card", name: "Credit Card", icon: CreditCard },
  { id: "paypal", name: "PayPal", icon: CreditCard },
];

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  street: z.string().min(5, { message: "Street address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  postalCode: z.string().min(5, { message: "Postal code is required." }),
  country: z.string().min(2, { message: "Country is required." }),
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "USA",
    },
  });

  if (items.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          You don't have any items in your cart.
        </p>
        <Button onClick={() => navigate("/products")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  const handleSubmit = (values: FormValues) => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Mock payment processing
      toast({
        title: "Order Submitted!",
        description: "Your order has been successfully placed.",
      });
      clearCart();
      setStep(3);
    }
  };

  // Calculate shipping cost
  const shippingCost = subtotal >= 100 ? 0 : 9.99;
  // Calculate tax (assuming 8%)
  const tax = subtotal * 0.08;
  // Calculate order total
  const orderTotal = subtotal + shippingCost + tax;

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      {/* Progress steps */}
      <div className="mb-10">
        <div className="flex items-center justify-center gap-1 sm:gap-4">
          <div
            className={`flex flex-col items-center ${
              step >= 1 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-medium mb-1 ${
                step >= 1 
                  ? "border-primary bg-primary text-white" 
                  : "border-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <span className="text-xs hidden sm:block">Shipping</span>
          </div>
          <div className="w-10 sm:w-20 h-0.5 bg-muted">
            <div
              className={`h-0.5 bg-primary ${
                step >= 2 ? "w-full" : "w-0"
              } transition-all duration-300`}
            />
          </div>
          <div
            className={`flex flex-col items-center ${
              step >= 2 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-medium mb-1 ${
                step >= 2 
                  ? "border-primary bg-primary text-white" 
                  : "border-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <span className="text-xs hidden sm:block">Payment</span>
          </div>
          <div className="w-10 sm:w-20 h-0.5 bg-muted">
            <div
              className={`h-0.5 bg-primary ${
                step >= 3 ? "w-full" : "w-0"
              } transition-all duration-300`}
            />
          </div>
          <div
            className={`flex flex-col items-center ${
              step >= 3 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-medium mb-1 ${
                step >= 3 
                  ? "border-primary bg-primary text-white" 
                  : "border-muted text-muted-foreground"
              }`}
            >
              3
            </div>
            <span className="text-xs hidden sm:block">Confirmation</span>
          </div>
        </div>
      </div>

      {step === 3 ? (
        <div className="max-w-md mx-auto text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
          <p className="text-muted-foreground mb-8">
            Your order has been placed successfully. We've sent you an email with
            the order details and tracking information.
          </p>
          <Button onClick={() => navigate("/products")}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Customer information form */}
          <div className="md:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {step === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Truck className="mr-2 h-5 w-5" />
                        Shipping Information
                      </CardTitle>
                      <CardDescription>
                        Enter your shipping details to continue
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="New York" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="NY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="10001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="USA">United States</SelectItem>
                                  <SelectItem value="Canada">Canada</SelectItem>
                                  <SelectItem value="UK">United Kingdom</SelectItem>
                                  <SelectItem value="Australia">Australia</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="ml-auto"
                      >
                        Continue to Payment
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {step === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Payment Method
                      </CardTitle>
                      <CardDescription>
                        Choose how you'd like to pay
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`flex items-center p-3 cursor-pointer border rounded-lg ${
                              paymentMethod === method.id
                                ? "border-primary bg-muted/30"
                                : "border-muted"
                            }`}
                            onClick={() => setPaymentMethod(method.id)}
                          >
                            <div className="mr-2">
                              <method.icon className="h-5 w-5" />
                            </div>
                            <div>{method.name}</div>
                            <div className="ml-auto">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  paymentMethod === method.id
                                    ? "border-primary"
                                    : "border-muted"
                                }`}
                              >
                                {paymentMethod === method.id && (
                                  <div className="w-3 h-3 rounded-full bg-primary" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Mock credit card form (simplified) */}
                      {paymentMethod === "credit-card" && (
                        <div className="space-y-4 mt-6">
                          <div>
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              className="mt-1"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input
                                id="expiry"
                                placeholder="MM/YY"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvc">CVC</Label>
                              <Input
                                id="cvc"
                                placeholder="123"
                                className="mt-1"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="name-on-card">Name on Card</Label>
                            <Input
                              id="name-on-card"
                              placeholder="John Doe"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      )}

                      {paymentMethod === "paypal" && (
                        <div className="p-6 text-center">
                          <p className="text-muted-foreground">
                            You'll be redirected to PayPal to complete your payment.
                          </p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      <Button type="submit">Place Order</Button>
                    </CardFooter>
                  </Card>
                )}
              </form>
            </Form>
          </div>

          {/* Order summary */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  {items.length} {items.length === 1 ? "item" : "items"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.product.name}</h4>
                        <p className="text-muted-foreground text-sm">
                          Qty: {item.quantity}
                        </p>
                        <p className="font-medium text-sm">
                          ${(item.product.discountPercentage
                            ? item.product.price * (1 - item.product.discountPercentage / 100)
                            : item.product.price
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
