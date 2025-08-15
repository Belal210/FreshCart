export default function OrdersSkeleton() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="border border-gray-200 overflow-auto rounded-lg mb-4 animate-pulse"
          >
            <div className="bg-gray-50 p-3 flex justify-between items-center border-b border-gray-200">
              <div className="flex gap-3 items-start">
                <div className="mr-2">
                  <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
                  <div className="h-2 w-16 bg-gray-200 rounded" />
                </div>
                <div className="h-5 w-16 bg-gray-200 rounded" />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="h-6 w-20 bg-gray-200 rounded mb-2" />
                <div className="h-6 w-20 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="p-2 md:p-3 flex gap-8 lg:gap-0 lg:justify-between">
              <div className="images flex flex-col xl:flex-row gap-1 pr-2 lg:pr-3 border-r border-gray-400">
                {[...Array(3)].map((_, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="relative size-12 lg:size-14 bg-gray-200 rounded overflow-hidden"
                  />
                ))}
              </div>
              <div className="flex flex-col items-center md:flex-row gap-5 xl:gap-15">
                <div className="flex justify-baseline md:justify-between gap-2 lg:gap-3 xl:gap-5">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-10 bg-gray-200 rounded mb-1" />
                    <div className="h-3 w-12 bg-gray-200 rounded" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-16 bg-gray-200 rounded mb-1" />
                    <div className="h-3 w-14 bg-gray-200 rounded" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-20 bg-gray-200 rounded mb-1" />
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="flex items-end flex-col gap-2 md:gap-3 ml-2">
                  <div className="h-8 w-32 bg-gray-200 rounded" />
                  <div className="h-8 w-32 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}