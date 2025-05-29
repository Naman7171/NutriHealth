import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mockProducts } from "@/lib/mockData";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/components/ui/use-toast";
import { Star, Heart, ShoppingCart, ArrowRight } from "lucide-react";

const Index = () => {
  const { addItem } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestsellerProducts, setBestsellerProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    setLoading(true);
    try {
      // Get first 4 products for featured
      setFeaturedProducts(mockProducts.slice(0, 4));
      // Get last 4 products for bestsellers
      setBestsellerProducts(mockProducts.slice(-4));
    } catch (error) {
      console.error("Error loading products:", error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    toast({
      title: "Success",
      description: "Product added to cart",
    });
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product);
    toast({
      title: "Success",
      description: isInWishlist(product.id)
        ? "Product removed from wishlist"
        : "Product added to wishlist",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1505576633757-0ac1084af824?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">
              Discover Your Path to Wellness
            </h1>
            <p className="text-xl mb-8">
              Premium health supplements to support your journey to a healthier
              lifestyle.
            </p>
            <Button size="lg" asChild>
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="ghost" asChild>
              <Link to="/products" className="flex items-center">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Loading products...</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-lg border bg-white"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{product.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.round(product.averageRating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          ({product.totalReviews})
                        </span>
                      </div>
                      <p className="text-lg font-bold mt-2">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={() => handleAddToWishlist(product)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isInWishlist(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-5 w-5 text-gray-400" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Bestsellers</h2>
            <Button variant="ghost" asChild>
              <Link to="/products" className="flex items-center">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Loading products...</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellerProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-lg border bg-white"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{product.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.round(product.averageRating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          ({product.totalReviews})
                        </span>
                      </div>
                      <p className="text-lg font-bold mt-2">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={() => handleAddToWishlist(product)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isInWishlist(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-5 w-5 text-gray-400" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Protein",
                image: "https://images.unsplash.com/photo-1593097136047-6e61e50c9e8a?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
                category: "protein"
              },
              {
                name: "Vitamins",
                image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
                category: "vitamins"
              },
              {
                name: "Weight Loss",
                image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
                category: "weight-loss"
              },
              {
                name: "Beauty & Wellness",
                image: "https://images.unsplash.com/photo-1595348020949-87cdfbb44174?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
                category: "beauty-wellness"
              }
            ].map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.category}`}
                className="group relative h-64 overflow-hidden rounded-lg"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-8">
              Stay updated with our latest products and exclusive offers.
            </p>
            <form className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
