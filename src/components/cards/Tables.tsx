"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

import { RootState } from "@/Redux/store";
import { Container } from "@/ui/Container";
import { useSelector } from "react-redux";
import { AddButton } from "./ui/ChangeQuantity";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";

export const Tables = () => {
  const cards = useSelector((state: RootState) => state.cardItems);
  const router = useRouter();
  const [index, setIndex] = useState<number | null>(null);
  const refs = useRef<HTMLDivElement[]>([]);
  const toggle = (i: number) => {
    setIndex(index === i ? null : i);
  };

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;

      if (index === i) {
        // Открыть
        gsap.to(el, {
          height: el.scrollHeight,
          duration: 0.4,
          ease: "power2.out",
          maxHeight: el.scrollHeight,
        });
      } else {
        // Закрыть
        gsap.to(el, {
          height: 0,
          duration: 0.4,
          ease: "power2.inOut",
          maxHeight: 0,
        });
      }
    });
  }, [index]);

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
        <>
          <div className="space-y- xl:space-y-0 pt-24 sm:pt-10 sm:pb-20 pb-10">
            {/* //////// Desktop /////// */}
            <table className="mx-auto hidden xl:block border-separate border-spacing-y-7 border-spacing-x-10">
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
                      <td className="font-workSans font-medium">
                        {items.count}
                      </td>
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
            {/* //////// Mobile /////// */}
            <div className="xl:hidden divide-y-1px divide-slate-200">
              {[...cards.items].reverse().map((items, i) => {
                const price =
                  items.price * (1 - items.discountPercentage / 100);

                return (
                  <div key={i} className={`text-center py-4 font-world`}>
                    <div
                      onClick={() => toggle(i)}
                      className="flex justify-between gap-y-2"
                    >
                      <div className="bg-gray-100 rounded-xl">
                        <Image
                          className="p-1.5"
                          alt={items.brand ? items.brand : ""}
                          width={100}
                          height={100}
                          src={items.images[0]}
                        />
                      </div>
                      <div className="flex items-center text-lg">
                        <h5>{items.brand}</h5>
                      </div>
                      <div className="grid grid-cols-1 text-xl items-center">
                        <FaChevronDown
                          className={`${
                            index === i && "rotate-180"
                          } duration-300`}
                        />
                      </div>
                    </div>
                    <div
                      ref={(el) => {
                        if (el) refs.current[i] = el;
                      }}
                      className={`overflow-hidden`}
                    >
                      <div className="flex flex-col text-lg gap-y-3 pt-5 pb-10">
                        <div className="flex">
                          <h5>Price :</h5>
                          <p className="ml-3 text-lg">
                            {(items.count * price).toFixed(2)} <span>$</span>
                          </p>
                        </div>
                        <div className="flex">
                          <h5>Product Price:</h5>
                          <p className="font-ptSerif ml-3">
                            {price.toFixed(2)} $
                          </p>
                        </div>
                        <div className="space-y-3">
                          <h5>Count</h5>
                          <p className="font-ptSerif">{items.count}</p>
                        </div>
                        <AddButton cards={cards} item={items} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* //////// ------- /////// */}
            <div className="gap-y-20 pt-10 border-t-1px border-slate-200 flex flex-col">
              <div className="flex xl:justify-between xl:flex-row gap-y-5 flex-col xl:items-end">
                <div className="flex items-end">
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
        </>
      )}
    </Container>
  );
};
