"use client";

import Banner from "@/components/products/Banner";
import { Products } from "@/components/products/Products";
import Filter from "@/components/filter/MainFilterBar";
import productsFiltiration from "@/features/filters/useFilter";
import React from "react";
import { Pagination } from "@/components/pagination/Pagination";
import { Loading } from "@/ui/Loading";

const page = () => {
  const { isLoading, filtered, searchedProducts } = productsFiltiration();
  if (isLoading) return <Loading />;
  return (
    <div>
      <Banner />
      <Filter />
      <Products loading={isLoading} main={filtered} />
      <Pagination total={searchedProducts.length} />
    </div>
  );
};

export default page;
