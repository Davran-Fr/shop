"use client";
import { useGetProductsFilteredQuery } from "@/Api/ecommerce";
import Banner from "@/components/products/Banner";
import React from "react";

const page = () => {
  const { data, error, isLoading } = useGetProductsFilteredQuery({
    q: "apple",
    category: "mens-shirts",
    sortBy: "title",
    order: "asc",
    limit: 10,
    skip: 0,
    select: "",
  });
  console.log(data);

  return (
    <div>
      <Banner />
    </div>
  );
};

export default page;
