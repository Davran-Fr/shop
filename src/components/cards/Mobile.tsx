import Image from "next/image";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

import { RootState } from "@/Redux/store";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AddButton } from "./ui/ChangeQuantity";
import { removeSelectItem } from "@/Redux/removeSelect";

export const Mobile = () => {
  const cards = useSelector((state: RootState) => state.cardItems);
  const selection = useSelector((state: RootState) => state.removeSelect);
  const [index, setIndex] = useState<number | null>(null);
  const refs = useRef<HTMLDivElement[]>([]);
  const dispatch = useDispatch();

  const show = selection.show && "opacity-40";

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
    <div className="xl:hidden font-medium divide-y-1px divide-slate-200">
      {[...cards.items].reverse().map((items, i) => {
        const price = items.price * (1 - items.discountPercentage / 100);
        const padd = selection.items.find((item) => {
          return item.id === items.id;
        });

        return (
          <div key={i} className={`text-center py-4`}>
            <div
              onClick={() => {
                if (selection.show) {
                  dispatch(removeSelectItem(items));
                } else {
                  toggle(i);
                }
              }}
              className="flex justify-between relative gap-y-2 font-world"
            >
              <div className={`bg-gray-100 rounded-xl ${show}`}>
                <Image
                  className="p-1.5"
                  alt={items.brand ? items.brand : ""}
                  width={100}
                  height={100}
                  src={items.images[0]}
                />
              </div>
              <div className={`flex items-center text-lg ${show}`}>
                <h5 className="">{items.brand}</h5>
              </div>
              <div className={`grid grid-cols-1 text-lg items-center ${show}`}>
                <FaChevronDown
                  className={`${index === i && "rotate-180"} duration-300`}
                />
              </div>
              <div
                className={`w-full cursor-pointer h-full ${
                  selection.show ? "block" : "hidden"
                } absolute z-[2] pr-10 top-0 left-0 flex items-center`}
              >
                {padd && (
                  <div className="w-full h-[1px] bg-gradientAccordion" />
                )}
              </div>
              <div
                className={`absolute z-[1] cursor-pointer right-0 duration-300 top-1/2 -translate-y-1/2 bg-red-400 rounded-full w-7 h-7 ${
                  selection.show ? "visible opacity-100" : "invisible opacity-0"
                } ${padd && "p-1.5"}`}
              >
                <div className="w-full h-full bg-gray-500  rounded-full" />
              </div>
            </div>
            {/* /// ---- //// ----- Accordion  ---- ////// ----- /////*/}
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
