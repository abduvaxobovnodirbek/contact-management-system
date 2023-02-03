import { Pagination } from "swiper";
import { Image } from "cloudinary-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";


export default function ImageCarousel({ images }) {
  return (
    <div className="p-4">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        autoplay
        className="mySwiper"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className="!h-[300px] !w-full">
            <SwiperSlide>
              {typeof img === "string" ? (
                <Image
                  cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                  publicId={"dev_setups/" + img}
                  className="!object-cover !h-[300px] !w-full"
                />
              ) : (
                <img
                  src={img.preview}
                  alt={`${i} img`}
                  className="!object-cover h-[280px] w-full"
                />
              )}
            </SwiperSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
