import Image from "next/image";
import React, { useRef, useState } from "react";
import "@smastrom/react-rating/style.css";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { EffectFade, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
interface Props {
  data: string[];
}
const Images = ({ data }: Props) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
 
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className="flex flex-col-reverse items-center justify-center lg:items-start lg:flex-row gap-5">
      {data?.length > 1 && (
        <div className="flex lg:flex-col  flex-row   gap-2  lg:items-center  ">
          {data.map((items, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setActiveSlide(i);
                  swiperRef.current?.swiper.slideToLoop(i);
                }}
                className="bg-orderBtn border-1px p-2 relative border-black"
              >
                <div
                  className={`  z-10  w-full duration-100 h-full absolute top-0 left-0   ${
                    i === activeSlide
                      ? " bg-transparent "
                      : "bg-black/50 hover:bg-transparent"
                  }`}
                ></div>
                <Image
                  alt="images "
                  width={800}
                  height={800}
                  src={items}
                  className="sm:min-w-50px w-50px relative"
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-orderBtn border-1px border-black  w-full 500:w-fit   flex items-center justify-center relative border-">
        <Swiper
          ref={swiperRef}
          onSlideChange={(s) => setActiveSlide(s.realIndex)}
          spaceBetween={50}
          speed={1000}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          modules={[EffectFade, Navigation]}
          navigation={{
            nextEl: ".nextSwiperBtn",
            prevEl: ".prevSwiperBtn",
          }}
          pagination={{
            clickable: true,
          }}
          className="mySwiper 500:w-400px  lg:w-500px "
        >
          {data?.map((items, i) => {
            return (
              <SwiperSlide
                key={i}
                className="flex items-center p-3 justify-center"
              >
                <Image
                  alt="images "
                  width={800}
                  height={800}
                  src={items}
                  className="w-full  relative"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        {data.length > 1 && (
          <>
            <button className="absolute z-10 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white nextSwiperBtn rounded-full -right-3  500:right-3">
              <FaAngleRight className="  cursor-pointer " />
            </button>
            <button className="absolute z-10 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white  prevSwiperBtn rounded-full  -left-3 500:left-3">
              <FaAngleLeft className=" cursor-pointer " />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Images;
