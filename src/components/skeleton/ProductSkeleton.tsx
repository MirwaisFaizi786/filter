// components/product/ProductSkeleton.tsx

export default function ProductSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen py-8 animate-pulse">
      <section className="mx-auto flex max-w-7xl justify-center flex-col lg:flex-row px-4 sm:px-6 lg:px-8 gap-10">
        {/* Left Section: Image Carousel */}
        <div className="lg:w-2/4 flex flex-col lg:flex-row gap-6">
          {/* Thumbnail Skeletons */}
          <div className="flex flex-row lg:flex-col gap-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="aspect-square w-20 lg:w-20 bg-gray-200 rounded-lg overflow-hidden border border-gray-200"
              />
            ))}
          </div>

          {/* Main Image Skeleton */}
          <div className="relative flex-1 overflow-hidden bg-gray-200 rounded-lg">
            <div className="w-full h-full aspect-[4/5]"></div>
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="lg:w-1/4 flex flex-col justify-start p-6 space-y-6">
          {/* Title Skeleton */}
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>

          {/* Description Skeleton */}
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>

          {/* Price Skeleton */}
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>

          {/* Category, Brand, Status, Stock Skeletons */}
          <div className="flex flex-col space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>

          {/* Add to Cart Button Skeleton */}
          <div className="h-12 bg-gray-300 rounded w-full mt-4"></div>
        </div>
      </section>
    </div>
  );
}
