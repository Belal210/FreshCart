import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products-service";
import ProductCard from "../ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import RelatedProductsSkeleton from "../skeleton/RelatedProductsSkeleton";

export default function RelatedProducts({ productDetails }) {
  const { category } = productDetails;

  const [relatedProducts, SetRelatedProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);
  
  


  async function fetchRelatedProducts() {
    try {
      setIsLoading(true);
      const response = await getAllProducts({ category: category._id });
      
      if (response.success) {
        setIsLoading(false);
        SetRelatedProducts(response?.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error)
    }
  }

  useEffect(() => {
    fetchRelatedProducts();
  }, []);

  if (isLoading) return <RelatedProductsSkeleton />;

  return (
    <>
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl">You May Also Like</h2>
            <div className="flex gap-2">
              <button className="prev-btn size-10 flex justify-center items-center rounded-full bg-gray-100 text-gray-600 hover:text-primary-600 hover:bg-primary-200 transition-colors duration-200">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className="next-btn size-10 flex justify-center items-center rounded-full bg-gray-100 text-gray-600 hover:text-primary-600 hover:bg-primary-200 transition-colors duration-200">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>

          <Swiper
          className="h-[400px]"
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={5}
            loop={true}
            navigation={{ prevEl: ".prev-btn", nextEl: ".next-btn" }}
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {relatedProducts?.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard productInfo={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
