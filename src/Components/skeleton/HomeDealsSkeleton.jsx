import ProductCardSkeleton from "./ProductCardSkeleton";

export default function HomeDealsSkeleton() {
  return (
    <>
      <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="flex items-center gap-2">
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
              <div className="counter flex items-center gap-4">
                <div className="size-7 bg-gray-200 rounded-md animate-pulse" />
                <div className="size-7 bg-gray-200 rounded-md animate-pulse" />
                <div className="size-7 bg-gray-200 rounded-md animate-pulse" />
              </div>
            </div>
          </div>
          <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="py-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(5)].map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}