"use client";

import Cards from "../../ui/Cards";
import clsx from "clsx";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { actionMainPageCard } from "../../features/card/useCard";
import { useSliderBreakPoints } from "../../hooks/useSliderBreakpoints";
import { useWidth } from "@/hooks/useWidth";
import { capitalize } from "@/hooks/useFirstLetterCapital";
import { Container } from "@/ui/Container";

import "swiper/css";
import "swiper/css/pagination";
import { Loading } from "@/ui/Loading";

const SwiperCard = () => {
  const width = useWidth();
  const swiperRef = useRef<SwiperRef>(null);
  const mainPageActions = actionMainPageCard();
  const { slidesPerView, choosePerView } = useSliderBreakPoints();
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
  
  if (mainPageActions.isLoading) return <Loading />;

  return (
    <Container className="space-y-10 text-black pb-20 font-ptSerif">
      <Swiper
        ref={swiperRef}
        loop={
          mainPageActions.categories && mainPageActions.categories?.length >= 3
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
        speed={2500}
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
              className="cursor-pointer relative  rounded-xl"
            >
              <div
                className={clsx(
                  "w-full rounded-xl flex backdrop-blur-xl items-center overflow-hidden relative justify-center text-base sm:text-xl py-7",
                  mainPageActions.category === item
                    ? "bg-gray-400 text-white"
                    : "bg-gray-100 bg-opacity-"
                )}
              >
                <div
                  className={clsx(
                    "absolute whitespace-nowrap font-medium flex items-center justify-center h-full",
                    item &&
                      item.length > 8 &&
                      width <= 640 &&
                      swiperRef.current?.swiper.realIndex === i &&
                      " animate-marquee "
                  )}
                >
                  {capitalize(item ? item : "")}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
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
            <SwiperSlide className="overflow-hidden rounded-xl">
              <Cards data={items} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};

export default SwiperCard;
