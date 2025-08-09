import { CartItem } from "@/Redux/slices/cards";
import { RootState } from "@/Redux/store";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

interface Props {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  openCards: boolean;
  cards: CartItem[];
}

const CardsShortView = ({
  cards,
  onMouseEnter,
  onMouseLeave,
  openCards,
}: Props) => {
  const total = useSelector((state: RootState) => state.cardItems);
  return (
    <div
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className={` ${
        cards.length === 0 ? "invisible pointer-events-none -z-50" : ""
      } ${
        openCards
          ? "visible pointer-events-auto max-h-[400px] h-[400px]      "
          : "invisible pointer-events-none  max-h-0 h-0  "
      } rounded-md hidden lg:block w-[350px]  duration-300  bottom-3 transition-all ease-in-out overflow-hidden  z-10 absolute  right-0  pt-7   translate-y-full`}
    >
      <div
        className={` w-full h-full flex flex-col overflow-hidden justify-between    bg-gray-600 backdrop-blur-xl  rounded-md  `}
      >
        <div
          className={`h-full custom-scroll py-3 pl-3  ${
            cards.length >= 2 ? "overflow-y-scroll" : ""
          } flex flex-col`}
        >
          {[...cards].reverse().map((items, i) => (
            <div
              key={i}
              className={`flex gap-4  pr-3 items-center  py-2 text-sm `}
            >
              <div className="bg-orderBtn rounded-md p-1">
                <Image
                  width={800}
                  height={800}
                  src={items.images[0]}
                  alt="shortView"
                  className="min-w-[50px] w-[50px]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span>{items.title}</span>
                <span className="font-sans">
                  Count: <span className="font-semibold">{items.count}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-3 pb-3  ">
          <div className="w-full border-t-1px border-gray-200">
            <span className="py-3 text-sm space-x-2 font-sans">
              <span className="">Total Price:</span>
              <span className="font-semibold">
                {total.productsTotalPrice.toFixed(2)}$
              </span>
            </span>
            <button className="py-2 text-center font-world  w-full ">
              View Cards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsShortView;
