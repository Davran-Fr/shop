"use client";
import { Product } from "@/Types/products";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import PriceDiscount from "@/ui/PriceDiscount";
import { useRouter } from "next/navigation";
import "@smastrom/react-rating/style.css";

export interface Card {
  data: Product;
}
const Cards: React.FC<Card> = ({ data }) => {
  
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/products/${data.category}/${data.id}`);
      }}
      key={data.id}
      className="bg-gray-100 rouned-xl overflow-hidden flex relative justify-between flex-col"
    >
      <div className="relative rounded-xl">
        {/* <div className="bg-white/25 blur-xl w-44 h-44 rounded-full absolute top-1/2 left-1/2 z-0 transform -translate-y-1/2 -translate-x-1/2" /> */}
        <Swiper
          direction="horizontal"
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
          className="mySwiper overflow-hidden h-[250px] 500:h-[350px] relative"
        >
          {data.images.map((item, i) => {
            console.log(item);
            if (item) {
              return (
                <SwiperSlide key={i} className="rounded-xl relative">
                  <div className="relative z-20 w-full p-3 h-[250px] 500:h-[350px] 500:p-5 bg-gray-50 bg-opacity-50">
                    <Image
                      className="object-contain"  
                      alt="test"
                      fill
                      objectPosition="center"
                      unoptimized
                      src={item}
                    />
                  </div>
                </SwiperSlide>
              );
            }
          })}
          <div className="bulletsContainerCard hidden lg:flex absolute max-w-10 flex-col top-0 z-20 h-full px-5 justify-center items-center gap-3"></div>
        </Swiper>
      </div>
      <div className="py-2.5 px-3 400:p-3 w-full flex h-full flex-col justify-between">
        <div className="font-ptSerif flex items-center text-[16px] justify-between">
          <PriceDiscount
            classname="text-sm 500:text-xl"
            price={data.price}
            discountPercentage={data.discountPercentage}
          />
        </div>
        <p className="text-sm font-medium truncate">{data.title}</p>
      </div>
    </div>
  );
};

export default Cards;
