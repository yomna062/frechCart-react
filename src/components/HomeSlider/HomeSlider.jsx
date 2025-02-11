import slidImgo from "../../assets/images/slider-image-1.jpeg";
import slidImge from "../../assets/images/slider-image-2.jpeg";
import slidImgs from "../../assets/images/slider-image-3.jpeg";
import product1 from "../../assets/images/banner-4.jpeg";
import product2 from "../../assets/images/slider-2.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/pagination";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function HomeSlider() {
  return (
    <>
      <section className="grid grid-cols-12 gap-4 mb-11 mt-5">
        {/* Slider Section */}
        <div className="col-span-12 lg:col-span-8">
          <Swiper
            loop={true}
            pagination={{ clickable: true }}
            slidesPerView={1}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="h-[400px] rounded-xl"
          >
            <SwiperSlide className="rounded-xl overflow-hidden relative">
              <img className="w-full h-[400px] object-cover" src={slidImgs} alt="Slide 1" />
            </SwiperSlide>
            <SwiperSlide className="rounded-xl overflow-hidden relative">
              <img className="w-full h-[400px] object-cover" src={slidImge} alt="Slide 2" />
            </SwiperSlide>
            <SwiperSlide className="rounded-xl overflow-hidden relative">
              <img className="w-full h-[400px] object-cover" src={slidImgo} alt="Slide 3" />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Banners Section */}
        <div className="col-span-12 flex flex-col sm:flex-row lg:grid lg:col-span-4 gap-1">
          <div className="w-full rounded-xl overflow-hidden relative">
            <img className="w-full h-[200px] object-cover rounded-xl" src={product1} alt="Banner 1" />
          </div>
          <div className="w-full rounded-xl overflow-hidden relative">
            <img className="w-full h-[200px] object-cover rounded-xl" src={product2} alt="Banner 2" />
          </div>
        </div>
      </section>
    </>
  );
}
