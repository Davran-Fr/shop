"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaArrowCircleRight, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { changeFilter } from "@/Redux/filterBase";
import { recommend } from "./recommends";
import { Container } from "@/ui/Container";

const Category = () => {
  
  const [index, setIndex] = useState<number | null>(null);
  const router = useRouter();
  const dispacht = useDispatch();
  const show = "translate-y-0 transform";

  return (
    <div className="bg-mainBack w-full relative z-10 font-world">
      <Container className="pt-10 pb-20 md:py-20 space-y-10">
        <div className="flex justify-between items-center text-black">
          <h2 className="text-lg bg-mainColor px-5 sm:text-3xl sm:py-5 sm:px-8 py-2 rounded-xl">
            Categories
          </h2>
          <div className="flex gap-5 self-end items-center">
            <span className="text-2xl">...</span>
            <FaArrowCircleRight className="text-2xl hover:translate-x-10" />
          </div>
        </div>
        <div className="columns-2 min-[600px]:columns-3 lg:columns-4 gap-5">
          {recommend.map((items, i) => (
            <div
              onClick={() => {
                router.push("/products");
                dispacht(changeFilter({ category: items.title }));
              }}
              onMouseEnter={() => setIndex(i)}
              onMouseLeave={() => setIndex(null)}
              key={i}
              className={` ${
                i === 0 && ""
              }  mb-5  relative  shadow-sm rounded-md cursor-pointer overflow-hidden `}
            >
              <div className="bg- h-full w-full absolute top-0 left-0 z-10 opacity-50"></div>
              <div
                className={` ${
                  index === i ? show : "transform translate-y-100%"
                }  delay-75 duration-700 bg-black/50 transition-all z-10 h-full w-full absolute top-0 left-0`}
              ></div>
              <span
                className={`${
                  index === i ? show : "transform translate-y-100%"
                }   text-white text-3xl ease-out flex items-center justify-center delay-100 duration-700 transition-all  absolute w-full h-full z-20 `}
              >
                {items.title}
                <div>
                  <FaArrowRight
                    className={`text-xl mt-1.5    duration-200 transition-all ml-3 transform ${
                      index === i && " translate-x-3 delay-500"
                    }`}
                  />
                </div>
              </span>
              <Image
                alt="test"
                width={800}
                height={800}
                className="w-full object-cover h-full rounded-md"
                src={items.img}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Category;
