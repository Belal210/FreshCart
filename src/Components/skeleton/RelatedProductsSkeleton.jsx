export default function RelatedProductsSkeleton() {
    return (
    <>
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl">You May Also Like</h2>
            <div className="flex gap-2">
              <div className="size-10 rounded-full bg-gray-200 animate-pulse" />
              <div className="size-10 rounded-full bg-gray-200 animate-pulse" />
            </div>
          </div>
          <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-4 rounded-xl shadow-md animate-pulse bg-white"
              >
                <div className="h-32 w-full bg-gray-200 rounded-lg" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="h-6 w-1/2 bg-gray-200 rounded mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}