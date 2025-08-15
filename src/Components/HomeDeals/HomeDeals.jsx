import { Link } from "react-router";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { calcTimeLeft } from "../../utils/counterdown";
import { useProducts } from "../../hooks/useProducts";
import HomeDealsSkeleton from "../skeleton/HomeDealsSkeleton";

export default function HomeDeals() {
  const { products, isLoading, isError, error } = useProducts();

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calcTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return function () {
      clearInterval(timer);
    };
  }, []);

  if (isLoading) {
    return <HomeDealsSkeleton />;
  }

  const deals = products
    ?.filter((product) => product.priceAfterDiscount)
    .slice(0, 5);

  return (
    <>
      <section className="bg-white py-8">
        <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Deals of the Day</h2>
            <div className="flex items-center gap-2 text-sm md:text-[16px]">
              <p>Offers ends in :</p>
              <div className="counter flex items-center gap-2">
                <div className="size-7 text-white text-sm bg-gray-900 flex justify-center items-center rounded-md">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <span>:</span>
                <div className="size-7 text-white text-sm bg-gray-900 flex justify-center items-center rounded-md">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <span>:</span>
                <div className="size-7 text-white text-sm bg-gray-900 flex justify-center items-center rounded-md">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
          <Link
            to={"/all-deals"}
            className="text-xs md:text-sm lg:text-[16px] font-semibold text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            View All Deals
          </Link>
        </div>

        <div className="py-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {deals?.map((product) => (
            <ProductCard key={product.id} productInfo={product} />
          ))}
        </div>
      </div>
      </section>
    </>
  );
}
