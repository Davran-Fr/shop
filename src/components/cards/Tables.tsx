"use client";

import React from "react";
import Image from "next/image";

import { RootState } from "@/Redux/store";
import { Container } from "@/ui/Container";
import { useSelector } from "react-redux";
import { AddButton } from "./ui/ChangeQuantity";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";

export const Tables = () => {
  const cards = useSelector((state: RootState) => state.cardItems);
  const router = useRouter();

  return (
    <Container className="">
      {cards.items.length === 0 ? (
        <div className="font-world text-6xl py-20 flex flex-col justify-center items-center gap-y-20">
          <h3>No Products in Card</h3>
          <button
            onClick={() => router.push("/products")}
            className="bg-gray-100 text-2xl px-5 w-fit rounded-md py-5"
          >
            Go Shopp
          </button>
        </div>
      ) : (
        <div className="lg:block hidden pt-5 pb-20">
          <table className="mx-auto border-separate border-spacing-y-7 border-spacing-x-10">
            <thead className="text-xl font-world">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Count</th>
                <th>Product Price</th>
                <th>Price</th>
                <th>Update Quantity</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {[...cards.items].reverse().map((items, i) => {
                const price =
                  items.price * (1 - items.discountPercentage / 100);

                return (
                  <tr key={i} className="text-center">
                    <td>
                      <div className="relative rounded-md w-[80px] h-[80px] bg-gray-100">
                        <Image
                          className="p-1.5"
                          alt={items.brand ? items.brand : ""}
                          fill
                          src={items.images[0]}
                        />
                      </div>
                    </td>
                    <td className="font-world">{items.title}</td>
                    <td className="font-workSans font-medium">{items.count}</td>
                    <td className="font-workSans text-red-500 font-medium">
                      {price.toFixed(2)} <span>$</span>
                    </td>
                    <td className="font-medium font-workSans">
                      {(items.count * price).toFixed(2)} <span>$</span>
                    </td>
                    <td className="flex gap-5 h-20 justify-center items-center">
                      <AddButton cards={cards} item={items} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="gap-y-20 flex flex-col">
            <div className="flex justify-between items-end">
              <div className="pt-10 flex items-end">
                <h5 className="font-world text-xl">Total Price:</h5>
                <span className="font-workSans font-bold text-2xl ml-5">
                  {cards.productsTotalPrice.toFixed(2)} $
                </span>
              </div>
              <button
                onClick={() => router.push("/products")}
                className="flex text-xl space-x-5 items-center text-black/50 font-world"
              >
                <span>Continue Shopping</span>
                <FaArrowRight className="text-xl" />
              </button>
            </div>
            <button
              onClick={() => router.push("/order")}
              className="border-1px border-black w-fit mx-auto font-world py-2 px-10 rounded-xl cursor-pointer
              hover:bg-black/50 hover:backdrop-blur-2xl bg-gray-100
              hover:text-white duration-300 text-xl text-center"
            >
              Order
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};
