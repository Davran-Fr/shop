"use client";

import Image from "next/image";
import React, { useState } from "react";
import { changeFilter } from "@/Redux/filterBase";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface Props {
  name: string;
  img: string;
  title: string;
  i: number;
}

export const CategoryCard = ({ img, name, title, i }: Props) => {
  const [index, setIndex] = useState<number | null>(null);
  const router = useRouter();
  const dispacht = useDispatch()
  const show = "translate-y-0 transform";

  
  return (
    <div
    onClick={() => {
        router.push(`/products`); 
        dispacht(changeFilter({ category: title }));
      }}
      onMouseEnter={() => setIndex(i)}
      onMouseLeave={() => setIndex(null)}
      key={i}
      className={`mb-5  relative  shadow-sm rounded-md cursor-pointer overflow-hidden `}
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
        {name}
        <div>
          <FaArrowRight
            className={`text-xl mt-1.5 duration-200 transition-all ml-3 transform ${
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
        src={img}
      />
    </div>
  );
};
