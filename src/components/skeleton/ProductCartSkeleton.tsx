function ProductCardSkeleton() {
  return (
    <div className="relative animate-pulse">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 lg:h-80 lg:aspect-auto group-hover:opacity-75">
        <div className="h-full w-full bg-gray-200" />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="h-5 w-full bg-gray-200 "></div>
        <div className="h-5 w-full bg-gray-200 "></div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
