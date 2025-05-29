
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="product-card h-full flex flex-col overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <Skeleton className="aspect-square w-full rounded-t-xl" />
      
      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Category */}
        <Skeleton className="h-3 w-16 mb-2" />
        
        {/* Title */}
        <Skeleton className="h-5 w-full mb-1" />
        <Skeleton className="h-5 w-3/4 mb-3" />
        
        {/* Rating */}
        <Skeleton className="h-4 w-24 mb-4" />
        
        {/* Price */}
        <div className="mt-auto pt-2">
          <Skeleton className="h-6 w-20 mb-3" />
        </div>
        
        {/* Button */}
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </div>
  );
}
