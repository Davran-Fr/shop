"use client";
import Image from "next/image";
import React from "react";
import bannerAnimations from "./bannerAnimations";

const Banner = () => {
  const { divRef, arrayBannerImage, textRef } = bannerAnimations();

  return (
    <div className="w-full relative overflow-hidden  z-40 h-40vh sm:h-[300px] ">
      {arrayBannerImage.map((items, i) => (
        <div
          key={i}
          className="w-full absolute top-0 left-0 h-full"
          ref={(el) => {
            if (el) divRef.current[i] = el;
          }}
        >
          <div className="absolute w-full h-full font-world gap-10 text-white  top-0 left-0 ">
            <div
              ref={(el) => {
                if (el) textRef.current[i] = el;
              }}
              className="w-full h-full text-center flex flex-col justify-center pt-10 relative z-40 items-center gap-2 container mx-auto px-4"
            >
              <h2 className="text-xl 400:text-3xl sm:text-4xl font-bold">{items.name}</h2>
              <h3 className="text-lg sm:text-2xl font-semibold">{items.title}</h3>
            </div>
            <div className="w-full h-full bg-black/50 absolute top-0 left-0 z-30"></div>
          </div>
          <Image
            alt="images"
            src={items.img}
            className="w-full object-cover h-full relative z-20"
            width={800}
            height={800}
          />
        </div>
      ))}
    </div>
  );
};

export default Banner;
