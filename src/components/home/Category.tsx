import React from "react";

import { FaArrowCircleRight } from "react-icons/fa";
import { recommend } from "./recommends";
import { Container } from "@/ui/Container";
import { CategoryCard } from "@/ui/CategoryCard";

const Category = () => {
  return (
    <div className="bg-mainBack w-full font-medium relative z-10 font-world">
      <Container className="pt-10 pb-20 md:py-20 space-y-10">
        <div className="flex justify-between items-center text-black">
          <h2 className="text-lg bg-gray-100 px-5 sm:text-3xl sm:py-5 sm:px-8 py-2 rounded-xl">
            Categories
          </h2>
          <div className="flex gap-5 self-end items-center">
            <span className="text-2xl">...</span>
            <FaArrowCircleRight className="text-2xl" />
          </div>
        </div>
        <div className="columns-2 min-[600px]:columns-3 lg:columns-4 gap-5">
          {recommend.map((items, i) => {
            const { title, img, name } = items;
            return (
              <CategoryCard key={i} name={name} title={title} img={img} i={i} />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Category;
