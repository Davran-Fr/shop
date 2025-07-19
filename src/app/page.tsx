"use client";

import React from "react";
import Video from "@/components/video/Video";
import MainRecommend from "@/components/mainRecommend/MainRecommend";
import MainPageCards from "@/components/mainPageCard/MainPageCards";
import { useUserData } from "@/features/user/userDatabase";
import { clearAccess_token, clearId_User } from "@/features/lib/localeStorage";
import { clearTokenCookies } from "@/features/lib/cookies";

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
