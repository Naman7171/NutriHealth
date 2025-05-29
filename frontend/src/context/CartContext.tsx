import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product, CartItem } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { cartAPI } from '@/lib/api';
import { useAuth } from './AuthContext';

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Load cart from API on initial render and when user changes
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          setLoading(true);
          const response = await cartAPI.getCartItems();
          setItems(response.items || []);
        } catch (error) {
          console.error('Failed to load cart:', error);
          toast({
            title: "Error",
            description: "Failed to load cart items.",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      } else {
        setItems([]);
        setLoading(false);
      }
    };

    loadCart();
  }, [user, toast]);

  const addItem = async (product: Product, quantity = 1) => {
    try {
      await cartAPI.addToCart(product.id, quantity);
      const response = await cartAPI.getCartItems();
      setItems(response.items || []);
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive"
      });
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await cartAPI.removeFromCart(productId);
      const response = await cartAPI.getCartItems();
      setItems(response.items || []);
      
      toast({
        title: "Removed from cart",
        description: "The item has been removed from your cart."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive"
      });
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(productId);
      return;
    }

    try {
      await cartAPI.updateCartItem(productId, quantity);
      const response = await cartAPI.getCartItems();
      setItems(response.items || []);
      
      toast({
        title: "Cart updated",
        description: "The quantity has been updated."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update cart item.",
        variant: "destructive"
      });
    }
  };

  const clearCart = async () => {
    try {
      await cartAPI.clearCart();
      setItems([]);
      
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cart.",
        variant: "destructive"
      });
    }
  };

  // Calculate total number of items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
