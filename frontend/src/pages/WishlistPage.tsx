import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, X, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());

  const handleAddToCart = (productId: string) => {
    const product = items.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      setAddedToCart(prev => new Set(prev).add(productId));
      
      // Reset button after 3 seconds
      setTimeout(() => {
        setAddedToCart(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
        
        {items.length > 0 && (
          <Button 
            variant="outline" 
            onClick={clearWishlist}
            className="mt-4 md:mt-0"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear wishlist
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Items added to your wishlist will appear here
          </p>
          <Link to="/products">
            <Button>
              Browse Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.id} className="group relative bg-background rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
              {/* Remove from wishlist button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={() => removeItem(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              {/* Product image */}
              <Link to={`/product/${item.id}`}>
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              
              {/* Product info */}
              <div className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-medium truncate mb-1 hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="flex items-center mb-3">
                  <p className="font-bold">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                
                <Button
                  variant={addedToCart.has(item.id) ? "secondary" : "default"}
                  size="sm"
                  className="w-full"
                  onClick={() => handleAddToCart(item.id)}
                  disabled={addedToCart.has(item.id)}
                >
                  {addedToCart.has(item.id) ? (
                    <span>Added to Cart</span>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
