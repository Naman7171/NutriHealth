import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mockProducts } from "@/lib/mockData";
import { ProductFilters, Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import ProductCard from "@/components/ProductCard";
import { Search, Filter, Grid2X2, List, ArrowDownNarrowWide, ArrowDownWideNarrow } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
];

const ProductsPage = () => {
  const { addItem } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [filters, setFilters] = useState<ProductFilters>({
    category: undefined,
    minPrice: 0,
    maxPrice: 100,
    minRating: 0,
    search: "",
    sortBy: "newest",
  });

  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  });

  // Fetch categories
  useEffect(() => {
    // Get unique categories from mock products
    const uniqueCategories = Array.from(new Set(mockProducts.map(p => p.category)));
    setCategories(uniqueCategories);
  }, []);

  // Fetch products with filters
  useEffect(() => {
    setLoading(true);
    try {
      let filteredProducts = [...mockProducts];

      // Apply search filter
      if (filters.search) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.description.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      // Apply category filter
      if (filters.category) {
        filteredProducts = filteredProducts.filter(product =>
          product.category === filters.category
        );
      }

      // Apply price filter
      filteredProducts = filteredProducts.filter(product =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
      );

      // Apply rating filter
      if (filters.minRating > 0) {
        filteredProducts = filteredProducts.filter(product =>
          product.averageRating >= filters.minRating
        );
      }

      // Apply in-stock filter
      if (inStockOnly) {
        filteredProducts = filteredProducts.filter(product =>
          product.stock > 0
        );
      }

      // Apply sorting
      switch (filters.sortBy) {
        case "price-asc":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filteredProducts.sort((a, b) => b.averageRating - a.averageRating);
          break;
        case "newest":
        default:
          filteredProducts.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }

      // Apply pagination
      const startIndex = (pagination.currentPage - 1) * 12;
      const paginatedProducts = filteredProducts.slice(startIndex, startIndex + 12);

      setProducts(paginatedProducts);
      setPagination({
        currentPage: pagination.currentPage,
        totalPages: Math.ceil(filteredProducts.length / 12),
        totalProducts: filteredProducts.length
      });
    } catch (error) {
      console.error('Error filtering products:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.currentPage, inStockOnly]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    setFilters((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setFilters(prev => ({
      ...prev,
      category: category
    }));
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setFilters({
      category: undefined,
      minPrice: 0,
      maxPrice: 100,
      minRating: 0,
      search: "",
      sortBy: "newest",
    });
    setPriceRange([0, 100]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setInStockOnly(false);
  };

  const toggleShowFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const FilterContent = () => (
    <>
      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              min={0}
              max={100}
              step={1}
              onValueChange={handlePriceRangeChange}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm">${priceRange[0]}</span>
              <span className="text-sm">${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="font-medium mb-3">Product Tags</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer"
                onClick={() => handleTagChange(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stock Status */}
        <div>
          <h3 className="font-medium mb-3">Stock Status</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={setInStockOnly}
            />
            <Label htmlFor="in-stock">Show only in-stock items</Label>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={clearFilters}
        className="w-full mt-6"
      >
        Clear Filters
      </Button>
    </>
  );

  return (
    <div className="container mx-auto py-12 px-4 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">All Products</h1>
      <p className="text-muted-foreground mb-8">
        Browse our collection of premium health and nutrition products
      </p>

      {/* Search and mobile filter button */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="pl-10"
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="sm:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine your search results with these filters.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <FilterContent />
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Desktop view toggle */}
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none ${
                viewMode === "grid" ? "bg-muted" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none ${
                viewMode === "list" ? "bg-muted" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Select
            value={filters.sortBy}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, sortBy: value as any }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center">
                    {option.value === "price-asc" && (
                      <ArrowDownNarrowWide className="mr-2 h-4 w-4" />
                    )}
                    {option.value === "price-desc" && (
                      <ArrowDownWideNarrow className="mr-2 h-4 w-4" />
                    )}
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div
          className={`hidden sm:block w-full md:w-1/4 lg:w-1/5 ${
            showFilters ? "block" : "hidden"
          }`}
        >
          <div className="neumorphic-card p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
              >
                Reset
              </Button>
            </div>
            <FilterContent />
          </div>
        </div>

        {/* Product Grid */}
        <div className={`w-full ${showFilters ? "md:w-3/4 lg:w-4/5" : "w-full"}`}>
          {loading ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Loading products...</h3>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters or search criteria
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-muted-foreground">
                {products.length} products found
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      className="block group"
                    >
                      <ProductCard 
                        product={product}
                        addToCart={() => addItem(product, 1)}
                        addToWishlist={() => addToWishlist(product)} 
                        isWishlisted={isInWishlist(product.id)}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      className="block"
                    >
                      <div className="product-card p-4 flex gap-6 overflow-hidden transition-all duration-200 hover:shadow-md">
                        <div className="w-32 h-32 flex-shrink-0 rounded-md overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-primary font-bold mt-1">
                            ${product.price.toFixed(2)}
                          </p>
                          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">
                              {product.category}
                            </Badge>
                            {product.stock > 0 ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                In Stock
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
