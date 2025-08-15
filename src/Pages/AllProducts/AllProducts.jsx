import { NavLink, useSearchParams } from "react-router";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import FeaturedProductsSkeleton from "../../Components/skeleton/FeaturedProductsSkeleton";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function AllProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);

  const [queryStrings, setQueryStrings] = useSearchParams({ page: 1 });
  const currentPage = +queryStrings.get("page");

  async function fetchAllProducts() {
    try {
      setIsLoading(true);
      const response = await getAllProducts({ page: currentPage });

      if (response.success) {
        setIsLoading(false);
        setError(null);
        setProducts(response?.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error || "Something went wrong");
    }
  }

  useEffect(() => {
    fetchAllProducts();
  }, [currentPage]);

  if (isLoading) return <FeaturedProductsSkeleton />;

  return (
    <>
    <PageMetaData title="All Products"/>
      <section className="py-10 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">All Our Products</h2>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products?.map((product) => (
              <ProductCard key={product.id} productInfo={product} />
            ))}
          </div>
          <div className="mt-7">
            <ul className="flex items-center gap-1 w-fit mx-auto">
              {currentPage > 1 ? (
                <NavLink
                  to={`?page=${currentPage - 1}`}
                  className="size-10 flex justify-center items-center border border-gray-300 rounded hover:bg-primary-600 hover:text-white transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </NavLink>
              ) : (
                <button
                  className="size-10 flex justify-center items-center border border-gray-300 rounded opacity-50 cursor-default"
                  disabled
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              )}
              <li>
                <NavLink
                  to={"?page=1"}
                  className={`${
                    currentPage === 1 && "bg-primary-600 text-white"
                  } size-10 flex justify-center items-center border border-gray-300 rounded hover:bg-primary-600 hover:text-white transition-colors duration-200`}
                >
                  1
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"?page=2"}
                  className={`${
                    currentPage === 2 && "bg-primary-600 text-white"
                  } size-10 flex justify-center items-center border border-gray-300 rounded hover:bg-primary-600 hover:text-white transition-colors duration-200`}
                >
                  2
                </NavLink>
              </li>
              {currentPage < 2 ? (
                <NavLink
                  to={`?page=${currentPage + 1}`}
                  className="size-10 flex justify-center items-center border border-gray-300 rounded hover:bg-primary-600 hover:text-white transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </NavLink>
              ) : (
                <button
                  className="size-10 flex justify-center items-center border border-gray-300 rounded opacity-50 cursor-default"
                  disabled
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
