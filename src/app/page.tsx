"use client";

import React from "react";
import Video from "@/components/video/Video";
import MainPageCards from "@/components/home/SwiperCard";
import { clearAccess_token } from "@/lib/useLocaleStorage";
import { clearTokenCookies } from "@/lib/useCookies";
import Category from "@/components/home/Category";
import SwiperCard from "@/components/home/SwiperCard";

const page = () => {
  // clearAccess_token()
  // clearTokenCookies()

  return (
    <div className="w-full  bg-mainBack ">
      <Video />
      <Category />
      <SwiperCard />
    </div>
  );
};

export default page;
