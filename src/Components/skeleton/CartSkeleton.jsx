export default function CartSkeleton() {
  return (
    <>
      <main className="py-8 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
                <div className="p-5 border-b border-gray-300 flex items-center justify-between">
                  <div>
                    <div className="h-7 w-40 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-4 p-5">
                  {[...Array(3)].map((_, idx) => (
                    <div
                      key={idx}
                      className="flex items-center p-3 md:p-5 lg:p-6 space-x-2 md:space-x-4 border-b border-gray-100 animate-pulse"
                    >
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
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse mb-6" />
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="flex justify-between border-t border-gray-200 py-4 font-semibold">
                    <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-14 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>

                <div className="bg-primary-50 shadow-sm shadow-primary-100 p-3 mb-3">
                  <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="bg-primary-50 shadow-sm shadow-primary-100 p-3">
                  <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}