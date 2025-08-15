export default function WishlistItemSkeleton() {
  return (
    <>
      <div className="flex items-center p-3 md:p-6 space-x-2 md:space-x-4 border-b border-gray-100 animate-pulse">
        <div className="size-15 md:size-20 rounded-lg bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
          <div className="h-3 w-1/3 bg-gray-200 rounded" />
          <div className="flex items-center mt-2 space-x-2">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-3 w-8 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-1 text-center">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-3 w-8 bg-gray-200 rounded" />
        </div>
        <div className="w-20 h-8 bg-gray-200 rounded ml-2" />
        <div className="w-8 h-8 bg-gray-200 rounded ml-2" />
      </div>
    </>
  );
}