"use client";

import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import { LuShoppingBag } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import { InfoRow } from "@/ui/InfoRow";
import { NotFound } from "@/ui/NotFound";

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
      {orders.length === 0 && <NotFound name="No Orders" />}

      {[...orders].reverse().map((items, i) => {
        if (orders.length === 0) return null;
        const [date, timeWithMs] = items.createdAt.split("T");
        const time = timeWithMs.split(".")[0];
        const lastElement = orders.length - 1;
        const counts = items.items.reduce((a, b) => a + b.count, 0);

        return (
          <div key={i}>
            <div
              className={`max-w-[500px] ${
                i === 0 ? "pb-5" : "py-5"
              } w-full mx-auto`}
            >
              <div
                onClick={() => toggle(i)}
                className="flex text-lg items-center cursor-pointer justify-between w-full"
              >
                <LuShoppingBag className="lg:w-8 lg:h-8 w-10 h-10" />
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
                  <InfoRow label="Name" value={items.address.name} />
                  <InfoRow label="Phone" value={items.address.phone} />
                  <InfoRow label="District" value={items.address.district} />
                  <InfoRow label="Velayat" value={items.address.velayat} />
                  <InfoRow label="Time" value={time} />
                  <InfoRow label="Date" value={date} />
                  <InfoRow label="Items" value={counts} />
                  <InfoRow
                    highlight
                    label="Total Price"
                    value={`${items.totalPrice.toFixed(2)} $`}
                  />
                  <InfoRow label="Area" value={items.address.area} />
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
