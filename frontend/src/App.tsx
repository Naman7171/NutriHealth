import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminSettings from "./pages/admin/AdminSettings";
import WishlistPage from "./pages/WishlistPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import AdminLayout from "./pages/admin/AdminLayout";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen w-full">
    <Navbar />
    <main className="flex-1 w-full">
      {children}
    </main>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <WishlistProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Main Routes with Standard Layout */}
            <Route path="/" element={<AppLayout><Index /></AppLayout>} />
            
            {/* Product routes */}
            <Route path="/products" element={<AppLayout><ProductsPage /></AppLayout>} />
            <Route path="/product/:id" element={<AppLayout><ProductDetailPage /></AppLayout>} />
            
            {/* User account routes */}
            <Route path="/checkout" element={<AppLayout><CheckoutPage /></AppLayout>} />
            <Route path="/profile" element={<AppLayout><ProfilePage /></AppLayout>} />
            <Route path="/wishlist" element={<AppLayout><WishlistPage /></AppLayout>} />
            
            {/* Auth routes */}
            <Route path="/login" element={<AppLayout><LoginPage /></AppLayout>} />
            <Route path="/signup" element={<AppLayout><SignupPage /></AppLayout>} />
            <Route path="/forgot-password" element={<AppLayout><ForgotPasswordPage /></AppLayout>} />
            <Route path="/reset-password" element={<AppLayout><ResetPasswordPage /></AppLayout>} />
            
            {/* Info pages */}
            <Route path="/about" element={<AppLayout><AboutPage /></AppLayout>} />
            <Route path="/contact" element={<AppLayout><ContactPage /></AppLayout>} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
            <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
            <Route path="/admin/customers" element={<AdminLayout><AdminCustomers /></AdminLayout>} />
            <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
            
            {/* Catch-all/404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
