"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);
const Video = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const videos = [
    {
      name: "DvG",
      src: "/video/SkeatBoard.mp4",
    },
    {
      name: "Wonderful Furniters For Modern Design",
      src: "/video/House.mp4",
    },
    {
      name: "Shoeses",
      src: "/video/reklamSneakers.mp4",
    },
    {
      name: "Clothes",
      src: "/video/clothes1.mp4",
    },
  ];
  useEffect(() => {
    const tl = gsap.timeline(
      ScrollTrigger.create({
        trigger: '.divv',
        start: 'top top',
        // end: '+=300px',
        // pin: true,
        // pinSpacing: false
      })
    );
    tl.from(divRef.current, { x: "-100%"  , duration: 1 });
    
    return () => {
      tl.kill()
    }
  }, []);

  return (
    <div className="w-full divv relative  overflow-hidden h-[75vh]  z-0  ">
      <div ref={divRef} className="w-full h-[75vh]">
        <video
          className="w-full h-full   object-cover"
          loop
          autoPlay
          muted
          src={`${videos[0].src}`}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Video;
