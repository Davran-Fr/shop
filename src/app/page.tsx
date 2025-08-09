"use client";

import React from "react";
import Video from "@/components/video/Video";
import MainRecommend from "@/components/mainRecommend/MainRecommend";
import MainPageCards from "@/components/mainPageCard/MainPageCards";
import { clearAccess_token} from "@/features/lib/useLocaleStorage";
import { clearTokenCookies } from "@/features/lib/useCookies";
import { Accordion } from "@/components/Accoridon";

const page = () => {
  // clearAccess_token()
  // clearTokenCookies()
  
  return (
    <div className="w-full  bg-mainBack ">
      <Video />
       <Accordion title="Dowran" content="dandaiwdnawindawidnawndw"/>
      <MainRecommend />
      <MainPageCards />
    </div>
  );
};

export default page;
