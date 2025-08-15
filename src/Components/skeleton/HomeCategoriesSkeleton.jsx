export default function HomeCategoriesSkeleton() {
  return (
    <>
      <section>
        <div className="container">
          
          
            <div className="h-8 w-44 mb-4 bg-gray-200 rounded animate-pulse" />
            
          
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-6 py-10">
            {[...Array(10)].map((_, idx) => (
              <div
                key={idx}
                className="card p-3 flex flex-col items-center justify-center gap-2 rounded-xl shadow-md animate-pulse"
              >
                <div className="size-15 bg-gray-200 rounded-full mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
