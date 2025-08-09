"use client";
import { Product } from "@/Types/productsTypes";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "@smastrom/react-rating/style.css";
import { Autoplay, Pagination } from "swiper/modules";
import { useDispatch} from "react-redux";
import { openQuikview, setIdProduct } from "@/Redux/slices/quickView";
import PriceDiscount from "@/ui/PriceDiscount";
import { useRouter } from "next/navigation";

export interface Card {
  data: Product;
}
const Cards: React.FC<Card> = ({ data }) => {
  const dispacth = useDispatch();
  const router = useRouter();
  
  return (
    <div
      onClick={() => {
        router.push(`/products/${data.category}/${data.id}`);
      }}
      key={data.id}
      className="bg-mainColor  rouned-xl overflow-hidden    flex relative justify-between flex-col "
    >
      <div className="relative rounded-xl">
        <div className="bg-white/25 blur-xl w-44 h-44 rounded-full  absolute top-1/2 left-1/2 z-0 transform -translate-y-1/2 -translate-x-1/2"></div>
        <Swiper
          direction="vertical"
          pagination={{
            el: ".bulletsContainerCard",
            clickable: true,
            renderBullet: (_, className) => {
              return `<span class='${className} designedBulletsCard'></span>`;
            },
          }}
          slidesPerView={1}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={data.images.length > 3}
          className="mySwiper    h-[200px] 350:h-250px sm:h-300px md:h-350px overflow-hidden relative "
        >
          {data.images.map((item, i) => {
            console.log(item);
            if (item) {
              return (
                <SwiperSlide
                  key={i}
                  className=" rounded-xl   h-full  relative "
                >
                  <div className="relative z-20 w-full h-full p-3 500:p-5  md:p-5  bg-orderBtn">
                    <Image
                      className="w-full  h-full  object-contain"
                      alt="test"
                      width={800}
                      unoptimized
                      height={800}
                      src={item}
                    />
                  </div>
                </SwiperSlide>
              );
            }
          })}
          <div className="bulletsContainerCard  absolute     max-w-10 flex-col  top-0     z-20  h-full  flex px-5 justify-center items-center gap-3"></div>
        </Swiper>
      </div>
      <div className="py-2.5 px-3 400:p-3 w-full    flex    h-full flex-col justify-between  ">
        <div className="font-ptSerif flex items-center text-[16px]  justify-between">
          <PriceDiscount
          classname="text-sm 500:text-xl"
            price={data.price}
            discountPercentage={data.discountPercentage}
          />
        </div>
        <p className=" text-sm font-medium truncate">{data.title}</p>
        <div className="w-full  hidden  justify-between  relative items-center">
          <button
            onClick={() => {
              dispacth(setIdProduct(data.id));
              dispacth(openQuikview("open"));
            }}
            className="px w-2/5   500:w-1/2 sm:w-2/5 py-1 text-center text-sm  bg-orderBtn font-medium rounded-lg"
          >
            Take a Look
          </button>
          <button className="w-1/2  text-sm py-1 text-center  bg-orderBtn font-medium rounded-lg">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
