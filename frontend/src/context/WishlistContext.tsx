import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { wishlistAPI } from '@/lib/api';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  items: Product[];
  itemIds: string[];
  loading: boolean;
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  toggleItem: (product: Product) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => Promise<void>;
  addToWishlist: (product: Product) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Load wishlist from API on initial render and when user changes
  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        try {
          setLoading(true);
          const response = await wishlistAPI.getWishlistItems();
          setItems(response.products || []);
        } catch (error) {
          console.error('Failed to load wishlist:', error);
          toast({
            title: "Error",
            description: "Failed to load wishlist items.",
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

    loadWishlist();
  }, [user, toast]);

  // Get just the IDs for simpler comparison
  const itemIds = items.map(item => item.id);
  
  const addItem = async (product: Product) => {
    if (!isInWishlist(product.id)) {
      try {
        await wishlistAPI.addToWishlist(product.id);
        const response = await wishlistAPI.getWishlistItems();
        setItems(response.products || []);
        
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add item to wishlist.",
          variant: "destructive"
        });
      }
    }
  };

  // Alias for addItem to maintain compatibility with existing code
  const addToWishlist = addItem;

  const removeItem = async (productId: string) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      const response = await wishlistAPI.getWishlistItems();
      setItems(response.products || []);
      
      toast({
        title: "Removed from wishlist",
        description: "The item has been removed from your wishlist."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist.",
        variant: "destructive"
      });
    }
  };

  const toggleItem = async (product: Product) => {
    if (isInWishlist(product.id)) {
      await removeItem(product.id);
    } else {
      await addItem(product);
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return itemIds.includes(productId);
  };

  const clearWishlist = async () => {
    try {
      await wishlistAPI.clearWishlist();
      setItems([]);
      
      toast({
        title: "Wishlist cleared",
        description: "All items have been removed from your wishlist."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear wishlist.",
        variant: "destructive"
      });
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemIds,
        loading,
        addItem,
        removeItem,
        toggleItem,
        isInWishlist,
        clearWishlist,
        addToWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
