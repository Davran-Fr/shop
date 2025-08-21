"use client";

import PaginationPage from "@/components/pagination/PaginationPage";
import Banner from "@/components/products/Banner";
import CardsProducts from "@/components/products/CardsProducts";
import Filter from "@/components/filter/MainFilterBar";
import productsFiltiration from "@/features/products/useFilter";
import React from "react";

const page = () => {
  const {   isLoading, filtered,   searchedProducts , } = productsFiltiration();

  return (
    <div>
      <Banner />
      <Filter  />
      <CardsProducts main={filtered } />
      <PaginationPage total={searchedProducts.length} />
    </div>
  );
};

export default page;
