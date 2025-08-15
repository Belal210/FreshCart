import ProductCardSkeleton from "./ProductCardSkeleton";

export default function FeaturedProductsSkeleton() {
    return (
            <>
            <section className="py-5">
                <div className="container">
                    <div className="h-8 w-40 mb-3 bg-gray-200 rounded animate-pulse" />
    
                    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {[...Array(10)].map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
    
                    </div>
                </div>
            </section>
            </>
        )
}