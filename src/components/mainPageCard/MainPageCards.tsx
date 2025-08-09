"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, FreeMode } from "swiper/modules";
import Cards from "../cards/Cards";
import { actionMainPageCard } from "../../features/card/useCardActions";
import { sliderBreakPoints } from "../cards/cardsBreakpoints";
import QuickView from "../quickView/QuickView";
import { useWidth } from "@/hooks/useWidth";
import { useSearch } from "../filter/actions";
import { capitalize } from "@/hooks/useFirstLetterCapital";

const MainPageCards = () => {
  const mainPageActions = actionMainPageCard();
  const swiperRef = useRef<SwiperRef>(null);
  const { slidesPerView, choosePerView } = sliderBreakPoints();
  const width = useWidth();

  useEffect(() => {
    if (
      !swiperRef.current?.swiper ||
      !mainPageActions.categories ||
      mainPageActions.categories.length === 0
    )
      return;

    const index = mainPageActions.categories.findIndex(
      (item) => item === mainPageActions.category
    );

    if (index !== -1) {
      swiperRef.current.swiper.autoplay.stop();
      swiperRef.current.swiper.slideToLoop(index, 300);
    }
  }, [mainPageActions.categories, mainPageActions.category]);

  return (
    <div className="mx-auto container font-ptSerif  space-y-10 text-black  px-4 py-20">
      <QuickView />
      <div className="">
        <Swiper
          ref={swiperRef}
          loop={
            mainPageActions.categories &&
            mainPageActions.categories?.length >= 3
              ? true
              : false
          }
          pagination={true}
          freeMode={{
            enabled: true,
            sticky: false,
          }}
          spaceBetween={10}
          centeredSlides={true}
          slidesPerView={choosePerView}
          onTouchStart={() => {
            swiperRef.current?.swiper.autoplay.start();
          }}
          onMouseDown={() => {
            swiperRef.current?.swiper.autoplay.start();
          }}
          modules={[Autoplay, FreeMode]}
          speed={500}
          autoplay={{
            delay: 5,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {mainPageActions.categories?.map((item, i) => {
            return (
              <SwiperSlide
                key={i}
                onClick={() => {
                  mainPageActions.setCategory(item ? item : null);
                  swiperRef.current?.swiper.slideToLoop(i, 500);
                  swiperRef.current?.swiper.autoplay.stop();
                }}
                className=" cursor-pointer relative  rounded-xl"
              >
                <div
                  className={`relative  w-full
                     
                        ${
                          mainPageActions.category === item
                            ? "bg-orderBtn"
                            : "bg-mainColor"
                        }  rounded-xl flex backdrop-blur-xl items-center overflow-hidden relative justify-center  text-xl py-7 `}
                >
                  <div
                    className={`absolute whitespace-nowrap font-medium   flex items-center justify-center    h-full ${
                      item &&
                      item.length > 8 &&
                      width <= 640 &&
                      swiperRef.current?.swiper.realIndex === i
                        ? " animate-marquee "
                        : ""
                    } `}
                  >
                    {capitalize(item ? item : "")}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="">
        <Swiper
          ref={mainPageActions.swiperRef}
          onMouseDown={mainPageActions.handleMouseDown}
          onTouchStart={mainPageActions.handleMouseDown}
          onTouchEnd={mainPageActions.handleMouseUp}
          pagination={true}
          spaceBetween={10}
          slidesPerView={slidesPerView}
          loop={
            mainPageActions.products?.products.length &&
            mainPageActions.products?.products.length > 1
              ? true
              : false
          }
          autoplay={true}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {mainPageActions.products?.products?.map((items, i) => {
            return (
              <SwiperSlide className="overflow-hidden    rounded-xl">
                <Cards data={items} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default MainPageCards;
