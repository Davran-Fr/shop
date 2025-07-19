"use client";
import React from "react";
import { useVideoAnimations } from "./videoAnimations";

const Video = () => {
  const { videos, divRef, textRef } = useVideoAnimations();

  return (
    <div className="w-full relative overflow-hidden h-[75vh] z-10">
      {videos.map((items, i) => (
        <div
          key={i}
          ref={(e) => {
            if (e) divRef.current[i] = e;
          }}
          className="w-full absolute top-0 left-0 h-[75vh]"
        >
          <video
            className="w-full h-full  z-20 object-cover"
            loop
            autoPlay
            muted
            src={items.src}
          />
          <div
            className="text-5xl font-world absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
            ref={(e) => {
              if (e) textRef.current[i] = e;
            }}
          >
            <p className="">{items.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Video;
