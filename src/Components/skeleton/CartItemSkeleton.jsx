export default function CartItemSkeleton() {
  return (
    <>
      <div className="flex items-center p-3 md:p-5 lg:p-6 space-x-2 md:space-x-4 border-b border-gray-100 animate-pulse">
        <div className="size-15 md:size-20 rounded-md bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
          <div className="h-3 w-1/3 bg-gray-200 rounded" />
          <div className="flex items-center mt-2 space-x-2">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-3 w-8 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="flex items-center border border-gray-200 rounded-lg">
            <div className="w-8 h-8 bg-gray-200 rounded" />
            <div className="w-12 h-8 bg-gray-200 border-x border-gray-200" />
            <div className="w-8 h-8 bg-gray-200 rounded" />
          </div>
          <div className="w-12 h-6 bg-gray-200 rounded ml-2" />
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded ml-2" />
      </div>
    </>
  );
}