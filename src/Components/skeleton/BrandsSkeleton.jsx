import BrandItemSkeleton from "./BrandItemSkeleton";

export default function BrandsSkeleton() {
  return (
    <>
      <section className="bg-white">
        <div className="w-2/3 mx-auto py-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Our Partner Brands</h2>
          <p className="text-gray-700">
            Discover quality products from our trust brand partners. We've
            partnered with leading brands to bring you the best selection of
            fresh and organic products.
          </p>
        </div>
        <div className="bg-gray-50 py-10">
          <div className="container">
            <h3 className="text-xl font-bold mb-5">Featured Brands</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(8)].map((_, idx) => (
                <BrandItemSkeleton key={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}