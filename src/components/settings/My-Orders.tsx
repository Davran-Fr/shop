"use client";

import React, { useEffect, useRef, useState } from "react";

import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import { LuShoppingBag } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import gsap from "gsap";

export const Orders = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [index, setIndex] = useState<number | null>(null);
  const refs = useRef<HTMLDivElement[]>([]);

  const toggle = (i: number) => {
    setIndex(index === i ? null : i);
  };

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;

      if (index === i) {
        gsap.to(el, {
          height: el.scrollHeight,
          duration: 0.4,
          ease: "power2.out",
          maxHeight: el.scrollHeight,
        });
      } else {
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
    <div className="flex-col flex">
      {orders.map((items, i) => {
        const [date, timeWithMs] = items.createdAt.split("T");
        const time = timeWithMs.split(".")[0];
        const lastElement = orders.length - 1;
        const counts = items.items.reduce((a, b) => a + b.count, 0);

        return (
          <div key={i}>
            <div className={`max-w-[600px] py-5 w-full mx-auto`}>
              <div
                onClick={() => toggle(i)}
                className="flex text-lg items-center cursor-pointer justify-between w-full"
              >
                <LuShoppingBag className="lg:w-12 lg:h-12 w-10 h-10" />
                <div>
                  <p>
                    {items.address.name} / {items.address.district} /{" "}
                    {items.address.velayat}
                  </p>
                </div>
                <FaChevronDown
                  className={`${index === i && "rotate-180"} duration-300`}
                />
              </div>
              <div
                ref={(el) => {
                  if (el) refs.current[i] = el;
                }}
                className={`overflow-hidden`}
              >
                <div className="py-5 space-y-2">
                  <div className="flex gap-x-5">
                    <p>Date : </p>
                    <p>{time}</p>
                    <p>{date}</p>
                  </div>
                  <div className="flex gap-x-5">
                    <p>Items : </p>
                    <p className="">{counts}</p>
                  </div>
                  <div className="flex gap-x-5">
                    <p>Total Price : </p>
                    <p className="text-red-500">
                      {items.totalPrice.toFixed(2)} $
                    </p>
                  </div>
                  <div className="flex gap-x-5">
                    <p>Phone : </p>
                    <p className="">{items.address.phone}</p>
                  </div>
                  <div className="flex gap-x-5">
                    <p>Area : </p>
                    <p className="">{items.address.area}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`bg-gradientAccordion w-full h-[1px] ${
                lastElement === i && "hidden"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};
