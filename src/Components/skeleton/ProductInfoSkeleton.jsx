export default function ProductInfoSkeleton() {
  return (
    <>
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="grid gap-4 lg:grid-cols-7">
            <div className="images bg-white lg:col-span-2 rounded-lg overflow-hidden flex flex-col items-center justify-center animate-pulse">
              <div className="w-5/6 h-80 bg-gray-200 rounded-lg mb-4" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="w-12 h-12 bg-gray-200 rounded-md" />
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 p-5 bg-white rounded-lg animate-pulse">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-24 bg-gray-200 rounded" />
                <div className="h-8 w-8 bg-gray-200 rounded-full" />
              </div>
              <div className="py-6 space-y-4">
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="h-6 w-2/3 bg-gray-200 rounded" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
                <div className="h-8 w-1/2 bg-gray-200 rounded" />
              </div>
              <div className="py-6 border-y border-gray-200 space-y-4">
                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                <div className="flex items-center gap-2">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-3 md:gap-0">
                <div className="flex items-center gap-3">
                  <div className="min-w-11 h-11 bg-gray-200 rounded-full" />
                  <div>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                    <div className="h-3 w-32 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="min-w-11 h-11 bg-gray-200 rounded-full" />
                  <div>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                    <div className="h-3 w-32 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-32 bg-white rounded my-8 animate-pulse" />
        </div>
      </section>
    </>
  );
}