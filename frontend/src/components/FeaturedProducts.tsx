
import { useState } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCardSkeleton from './ProductCardSkeleton';

interface FeaturedProductsProps {
  title: string;
  products: Product[];
  loading?: boolean;
  addToCart: (product: Product) => void;
  addToWishlist: (product: Product) => void;
  wishlist: string[];
}

export default function FeaturedProducts({
  title,
  products,
  loading = false,
  addToCart,
  addToWishlist,
  wishlist
}: FeaturedProductsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Get current products
  const currentProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full"
              disabled={loading || products.length <= productsPerPage}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full"
              disabled={loading || products.length <= productsPerPage}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Show skeletons when loading
            Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : (
            // Show actual products
            currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                isWishlisted={wishlist.includes(product.id)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
