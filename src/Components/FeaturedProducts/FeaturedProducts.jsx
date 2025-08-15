import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import FeaturedProductsSkeleton from "../skeleton/FeaturedProductsSkeleton";
import { Link } from "react-router";
import { useState } from "react";

export default function FeaturedProducts() {
  const [searchValue, setSearchValue] = useState("");
  const { products, isLoading, isError, error } = useProducts();

  const searchProducts =
    products?.filter((product) =>
      product.title.toLowerCase().includes(searchValue?.toLowerCase())
    ) || [];

  if (isLoading) {
    return <FeaturedProductsSkeleton />;
  }


  return (
    <>
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link
              to={"/all-products"}
              className="text-primary-600 pl-1 md:pl-0 text-xs md:text-sm lg:text-[16px] hover:text-primary-700 transition-colors duration-200 font-semibold flex items-center gap-2"
            >
              View All Products
            </Link>
          </div>
          <div className="search w-3/4 md:w-2/3 lg:w-1/2 mx-auto my-8">
            <input
              type="search"
              placeholder="Search By Product Name..."
              className="form-control w-full"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {searchValue === "" ? (
              products?.map((product) => (
                <ProductCard key={product.id} productInfo={product} />
              ))
            ) : searchProducts.length >= 1 ? (
              searchProducts.map((product) => (
                <ProductCard key={product.id} productInfo={product} />
              ))
            ) : (
              <div className="text-2xl lg:text-3xl text-center col-span-full py-32">
                There are no products with this name 😓.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
