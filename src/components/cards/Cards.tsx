"use client";
import { useSliceText } from "@/hooks/useSliceText";
import { Product } from "@/Types/productsTypes";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Autoplay, Pagination } from "swiper/modules";
import { descriptionsSlice, sliceBreakPoints } from "./cardsBreakpoints";
import { useDispatch } from "react-redux";
import { openQuikview, setIdProduct } from "@/Redux/slices/quickView";
import PriceDiscount from "@/ui/PriceDiscount";
import { useWidth } from "@/hooks/useWidth";
import { useRouter } from "next/navigation";

export interface Card {
  data: Product;
}
const Cards: React.FC<Card> = ({ data }) => {
  const width = useWidth();
  const dispacth = useDispatch();
  const sliceText = useSliceText(sliceBreakPoints);
  const sliceDesc = useSliceText(descriptionsSlice);
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/products/${data.id}`);
      }}
      key={data.id}
      className="bg-mainColor  rouned-xl    flex relative justify-between flex-col "
    >
      <div className="relative">
        <div className="bg-white/25 blur-xl w-44 h-44 rounded-full  absolute top-1/2 left-1/2 z-0 transform -translate-y-1/2 -translate-x-1/2">
          dw
        </div>
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
          loop={true}
          className="mySwiper   h-[200px] 500:h-350px  relative "
        >
          {data.images.map((item, i) => {
            console.log(item);
            if (item) {
              return (
                <SwiperSlide key={i} className=" rounded-xl    relative ">
                  <div className="relative z-20 w-full h-full md:px-5 md:py-5  bg-orderBtn">
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
      <div className="p-5 w-full h-full gap-2  ">
        <div className="flex   h-full flex-col justify-between  ">
          <div className="font-ptSerif flex items-center text-sm justify-between">
            <PriceDiscount
              price={data.price}
              discountPercentage={data.discountPercentage}
            />
            {/* {data?.rating && width > 640 && (
              <Rating
                itemStyles={{
                  itemShapes: Star,
                  activeFillColor: "#facc15",
                  inactiveFillColor: "#e5e7eb",
                  }}
                  style={{ maxWidth: 60 }}
                  value={parseFloat(data.rating.toFixed(1))}
                  readOnly
                  />
                  )} */}
          </div>
          <p className="text-lg font-medium truncate">{data.title}</p>
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
    </div>
  );
};

export default Cards;
