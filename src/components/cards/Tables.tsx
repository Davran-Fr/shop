"use client";

import React from "react";

import { RootState } from "@/Redux/store";
import { Container } from "@/ui/Container";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";
import { NotFound } from "@/ui/NotFound";

export const Tables = () => {
  const cards = useSelector((state: RootState) => state.cardItems);
  const router = useRouter();

  return (
    <Container className="">
      {cards.items.length === 0 ? (
        <NotFound name="No Products in Card" />
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
