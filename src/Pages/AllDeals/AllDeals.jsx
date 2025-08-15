import PageMetaData from "../../Components/PageMetaData/PageMetaData";
import ProductCard from "../../Components/ProductCard/ProductCard";
import FeaturedProductsSkeleton from "../../Components/skeleton/FeaturedProductsSkeleton";
import { useProducts } from "../../hooks/useProducts";

export default function AllDeals() {
  const { products, isLoading, isError, error } = useProducts();

  const deals = products?.filter((product) => product.priceAfterDiscount);

  if (isLoading) return <FeaturedProductsSkeleton />;

  return (
    <>
      <PageMetaData title="All Deals" />
      <section className="py-10 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Our Deals Today</h2>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {deals?.map((product) => (
              <ProductCard key={product.id} productInfo={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
