"use client";

import React, { useEffect, useState } from "react";
import Video from "@/components/video/Video";
import MainRecommend from "@/components/mainRecommend/MainRecommend";
import MainPageCards from "@/components/mainPageCard/MainPageCards";
import { useUserData } from "@/features/user/userDatabase";
import { clearTokenCookies } from "@/features/lib/cookies";
import { clearAccess_token } from "@/features/lib/localeStorage";

const page = () => {
  const { data, error, isLoading } = useUserData();
  return (
    <div className="w-full  bg-mainBack ">
      <Video />
      <MainRecommend />
      <MainPageCards />
    </div>
  );
};

export default page;
