"use client";

import React from "react";

import { RootState } from "@/Redux/store";
import { Container } from "@/ui/Container";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";

export const Tables = () => {
  const cards = useSelector((state: RootState) => state.cardItems);
  const router = useRouter();

  return (
    <Container className="">
      {cards.items.length === 0 ? (
        <div className="font-world text-3xl md:text-6xl py-20 flex flex-col justify-center items-center gap-y-20">
          <h3>No Products in Card</h3>
          <button
            onClick={() => router.push("/products")}
            className="bg-gray-100 text-2xl px-5 w-fit rounded-md py-5"
          >
            Go Shopp
          </button>
        </div>
      ) : (
        <>
          <div className="w-full xl:space-y-0 flex flex-col xl:items-center pt-20 sm:pt-10 sm:pb-20 pb-10">
            <Desktop />
            <Mobile />
            <div className="gap-y-20 pt-10 border-t-1px border-slate-200 flex flex-col w-full">
              <div className="flex xl:justify-between w-full xl:flex-row gap-y-5 flex-col xl:items-end">
                <div className="flex items-end">
                  <h5 className="font-world text-lg md:text-xl">
                    Total Price:
                  </h5>
                  <span className="font-workSans font-bold text-red-500 text-xl md:text-2xl ml-5">
                    {cards.productsTotalPrice.toFixed(2)} $
                  </span>
                </div>
                <button
                  onClick={() => router.push("/products")}
                  className="flex text-lg md:text-xl space-x-5 items-center text-black/50 font-world"
                >
                  <span>Continue Shopping</span>
                  <FaArrowRight className="text-lg" />
                </button>
              </div>
              <button
                onClick={() => router.push("/order")}
                className="border-1px border-black w-fit mx-auto font-world py-1 xl:py-2 px-10 rounded-xl cursor-pointer
              hover:bg-black/50 hover:backdrop-blur-2xl bg-gray-100
              hover:text-white duration-300 text-lg xl:text-xl text-center"
              >
                Order
              </button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};
