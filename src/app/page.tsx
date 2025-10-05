import React from "react";
import Category from "@/components/home/Category";
import SwiperCard from "@/components/home/SwiperCard";
import Banner from "@/components/products/Banner";

const page = () => {
  return (
    <div className="w-full bg-mainBack">
      <Banner />
      <Category />
      <SwiperCard />
    </div>
  );
};

export default page;
