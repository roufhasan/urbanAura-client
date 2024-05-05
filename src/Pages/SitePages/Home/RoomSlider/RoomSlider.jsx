import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

/* Style Import */
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./roomSlider.css";

/* Image Import */
import slider1 from "../../../../assets/images/home/slider-1.png";
import slider2 from "../../../../assets/images/home/slider-2.png";
import slider3 from "../../../../assets/images/home/slider-3.jpg";
import slider4 from "../../../../assets/images/home/slider-4.jpg";
import { BsArrowRight } from "react-icons/bs";

const RoomSlider = () => {
  const sliderData = [
    {
      title: "Inner Peace",
      sub_title: "Bed Room",
      image: slider1,
    },
    {
      title: "Calm Dining",
      sub_title: "Dining Room",
      image: slider2,
    },
    {
      title: "Cozy Corner",
      sub_title: "Lounge Room",
      image: slider3,
    },
    {
      title: "Relaxation",
      sub_title: "Living Room",
      image: slider4,
    },
  ];

  return (
    <section className="my-16 items-center bg-[#FCF8F3] px-[4%] py-12 text-[#3A3A3A] md:flex md:px-[7%]">
      {/* Left Side Text */}
      <div className="mb-10 md:mb-0 md:w-[35%]">
        <h1 className="text-[32px] font-bold md:text-[40px]">
          50+ Beautiful rooms inspiration
        </h1>
        <p className="mb-6 mt-2 font-medium text-[#616161]">
          Our designer already made a lot of beautiful prototipe of rooms that
          inspire you
        </p>
        <Link
          to="/shop"
          className="inline-block bg-[#B88E2F] px-9 py-3 font-semibold text-white"
        >
          Explore More
        </Link>
      </div>

      {/* Carousel */}
      <div className="md:w-[65%]">
        <Swiper
          slidesPerView={1}
          spaceBetween={12}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          loop={true}
          className="mySwiper"
          modules={[Pagination, Navigation]}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
          }}
        >
          {sliderData &&
            sliderData.length > 0 &&
            sliderData.map((data, index) => (
              <SwiperSlide
                key={data.title}
                className="relative max-h-[486px] max-w-[372px]"
              >
                <img
                  src={data.image}
                  alt={`${data.title}`}
                  className="h-[486px] w-full object-cover object-center"
                  loading="lazy"
                />
                <div className="slider-text absolute bottom-10 left-[10%] flex items-end justify-center">
                  <div className="max-w-60 bg-white/70 p-8 pr-4">
                    <div className="flex items-center gap-2 text-[#616161]">
                      <p>0{index + 1}</p>
                      <div className="w-7 border border-[#616161]"></div>
                      <p className="font-medium">{data.sub_title}</p>
                    </div>
                    <p className="text-[28px] font-semibold">{data.title}</p>
                  </div>
                  <Link
                    to="/shop"
                    className="inline-block h-full bg-[#B88E2F] p-3"
                  >
                    <BsArrowRight size={24} className="text-white" />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default RoomSlider;
