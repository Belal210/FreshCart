export default function ProductCardSkeleton() {
  return (
    <>
      <div className="py-2 relative shadow-md transition-shadow duration-200 overflow-hidden rounded-xl animate-pulse bg-white">
        <div className="h-52 w-full bg-gray-200 rounded-t-xl" />
        <div className="content p-4 space-y-2">
          <div className="title space-y-1">
            <div className="h-3 w-1/4 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-3 w-8 bg-gray-200 rounded" />
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="space-x-2 flex items-center">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-3 w-12 bg-gray-200 rounded" />
            </div>
            <div className="size-8 bg-gray-200 rounded-full" />
          </div>
        </div>
        <div className="absolute top-4 right-2 flex flex-col gap-4">
          <div className="size-7 bg-gray-200 rounded-md" />
          <div className="size-7 bg-gray-200 rounded-md" />
          <div className="size-7 bg-gray-200 rounded-md" />
        </div>
        <div className="absolute top-4 left-2 h-5 w-12 bg-gray-200 rounded" />
      </div>
    </>
  );
}