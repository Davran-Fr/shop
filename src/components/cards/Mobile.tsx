import Image from "next/image";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

import { RootState } from "@/Redux/store";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AddButton } from "./ui/ChangeQuantity";

export const Mobile = () => {
  const cards = useSelector((state: RootState) => state.cardItems);
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
    <div className="xl:hidden divide-y-1px divide-slate-200">
      {[...cards.items].reverse().map((items, i) => {
        const price = items.price * (1 - items.discountPercentage / 100);

        return (
          <div key={i} className={`text-center py-4`}>
            <div
              onClick={() => toggle(i)}
              className="flex justify-between gap-y-2 font-world"
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
                <h5 className="">{items.brand}</h5>
              </div>
              <div className="grid grid-cols-1 text-lg items-center">
                <FaChevronDown
                  className={`${index === i && "rotate-180"} duration-300`}
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
                  <h5 className="font-world">Price :</h5>
                  <p className="ml-3 text-lg font-ptSerif font-medium">
                    {(items.count * price).toFixed(2)} <span>$</span>
                  </p>
                </div>
                <div className="flex">
                  <h5 className="font-world">Product Price:</h5>
                  <p className="font-ptSerif font-medium ml-3 text-lg">
                    {price.toFixed(2)} $
                  </p>
                </div>
                <div className="space-y-3">
                  <h5 className="font-world">Count</h5>
                  <p className="font-ptSerif font-medium text-lg">
                    {items.count}
                  </p>
                </div>
                <AddButton cards={cards} item={items} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
