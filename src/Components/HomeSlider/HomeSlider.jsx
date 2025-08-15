import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import homeSliderImg from "../../assets/images/home-slider-1.png";

export default function HomeSlider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={2}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        
      >
        <SwiperSlide>
          <div style={{ backgroundImage: `url(${homeSliderImg})` , backgroundSize: "cover" , backgroundPosition: "center"}} >
            <div className="overlay py-28 md:py-32 bg-gradient-to-r from-primary-600/90 to-primary-600/50 ">
              <div className="container text-center md:text-start md:pl-18 text-white space-y-4">
                <h3 className="text-3xl  font-bold">
                  Fresh Products Delivered <br />to your Door
                </h3>
                <p className="">Get 20% for your first order</p>
                <div className="space-x-3 ">
                  <button className="btn text-primary-600 bg-white border-2 border-gray-100 hover:bg-gray-100">Shop Now</button>
                  <button className="btn bg-transparent border-2 border-gray-100 text-white hover:text-primary-600 hover:bg-gray-100">View Deals</button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ backgroundImage: `url(${homeSliderImg})` , backgroundSize: "cover" , backgroundPosition: "center"}} >
            <div className="overlay py-32 bg-gradient-to-r from-primary-600/90 to-primary-600/50 ">
              <div className="container text-center md:text-start md:pl-18 text-white space-y-4">
                <h3 className="text-3xl  font-bold">
                  Premium Quality <br />Guaranteed
                </h3>
                <p className="">Fresh from farm to your table</p>
                <div className="space-x-3 ">
                  <button className="btn text-violet-600 bg-white border-2 border-gray-100 hover:bg-gray-100">Shop Now</button>
                  <button className="btn bg-transparent border-2 border-gray-100 text-white hover:text-primary-600 hover:bg-gray-100">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ backgroundImage: `url(${homeSliderImg})` , backgroundSize: "cover" , backgroundPosition: "center"}} >
            <div className="overlay py-32 bg-gradient-to-r from-primary-600/90 to-primary-600/50 ">
              <div className="container text-center md:text-start md:pl-18 text-white space-y-4">
                <h3 className="text-3xl font-bold">
                  Fast & Free <br />Delivery
                </h3>
                <p>Same day delivery avaliable</p>
                <div className="space-x-3">
                  <button className="btn text-violet-600 bg-white border-2 border-gray-100 hover:bg-gray-100">Order Now</button>
                  <button className="btn bg-transparent border-2 border-gray-100 text-white hover:text-primary-600 hover:bg-gray-100">Delivery Info</button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
