
import { Skeleton } from "@/components/ui/skeleton";

function ProductSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <section className="mx-auto flex max-w-7xl flex-col lg:flex-row px-4 sm:px-6 lg:px-8 gap-10 animate-pulse">
        {/* Left Section: Image Carousel */}
        <div className="lg:w-2/3 flex flex-col lg:flex-row gap-6">
          {/* Thumbnail Skeleton */}
          <div className="flex flex-row lg:flex-col gap-2">
            <Skeleton className="aspect-square w-20 lg:w-24 rounded-lg bg-gray-200" />
            <Skeleton className="aspect-square w-20 lg:w-24 rounded-lg bg-gray-200" />
            <Skeleton className="aspect-square w-20 lg:w-24 rounded-lg bg-gray-200" />
            <Skeleton className="aspect-square w-20 lg:w-24 rounded-lg bg-gray-200" />
          </div>

          {/* Main Image Carousel Skeleton */}
          <div className="relative aspect-square w-96 flex-1 overflow-hidden bg-gray-200 rounded-sm"></div>
        </div>

        {/* Right Section: Product Details */}
        <div className="lg:w-1/3 flex flex-col justify-start p-6 space-y-6">
          <Skeleton className="h-8 w-2/3 bg-gray-200 rounded-md" />
          <Skeleton className="h-6 w-full bg-gray-200 rounded-md" />
          <Skeleton className="h-6 w-1/3 bg-gray-200 rounded-md" />

          <div className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-2/3 bg-gray-200 rounded-md" />
            <Skeleton className="h-4 w-2/3 bg-gray-200 rounded-md" />
            <Skeleton className="h-4 w-2/3 bg-gray-200 rounded-md" />
            <Skeleton className="h-4 w-2/3 bg-gray-200 rounded-md" />
          </div>

          <Skeleton className="mt-4 h-12 w-full bg-blue-200 rounded-lg" />
        </div>
      </section>
    </div>
  );
}

export default ProductSkeleton;
