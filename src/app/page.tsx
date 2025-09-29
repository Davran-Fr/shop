import React, { useEffect } from "react";
import { clearAccess_token } from "@/lib/useLocaleStorage";
import { clearTokenCookies } from "@/lib/useCookies";
import Category from "@/components/home/Category";
import SwiperCard from "@/components/home/SwiperCard";
import Banner from "@/components/products/Banner";

const page = () => {
  // clearAccess_token()
  // clearTokenCookies()
  

 

  return (
    <div className="w-full  bg-mainBack ">
      <Banner />
      <Category />
      <SwiperCard />
    </div>
  );
};

export default page;
