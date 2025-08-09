"use client";
import React from "react";
import { useVideoAnimations } from "./videoAnimations";
import Image from "next/image";

const Video = () => {
  const { videos, divRef, textRef } = useVideoAnimations();

  return (
    <div className="w-full relative overflow-hidden h-50vh z-10">
      {videos.map((items, i) => (
        <div
          key={i}
          ref={(e) => {
            if (e) divRef.current[i] = e;
          }}
          className="w-full absolute top-0 left-0 h-full"
        >
          <Image
            src={items.img}
            alt="images"
            width={800}
            height={800}
            className="w-full h-full z-20 object-cover"
          />
          <div className="bg-black/50 w-full z-20 absolute top-0 left-0 h-full "></div>
          <div
            className="text-3xl text-center font-world absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
            ref={(e) => {
              if (e) textRef.current[i] = e;
            }}
          >
            <p className="relative z-30">{items.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Video;
