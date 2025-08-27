"use client";

import Banner from "@/components/products/Banner";
import { Products } from "@/components/products/Products";
import Filter from "@/components/filter/MainFilterBar";
import productsFiltiration from "@/features/filters/useFilter";
import React from "react";
import { Pagination } from "@/components/pagination/Pagination";

const page = () => {
  const { isLoading, filtered, searchedProducts } = productsFiltiration();

  return (
    <div>
      <Banner />
      <Filter />
      <Products main={filtered} />
      <Pagination total={searchedProducts.length} />
    </div>
  );
};

export default page;
