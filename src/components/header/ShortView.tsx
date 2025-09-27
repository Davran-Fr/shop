import clsx from "clsx";
import React from "react";

import { CartItem } from "@/Redux/cards";
import { RootState } from "@/Redux/store";
import { ShortCard } from "@/ui/ShortCard";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  openCards: boolean;
  cards: CartItem[];
}

export const CardsShortView = ({
  cards,
  onMouseEnter,
  onMouseLeave,
  openCards,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const total = useSelector((state: RootState) => state.cardItems);

  const container = clsx(
    "rounded-md hidden lg:block w-[350px] duration-300 bottom-3 transition-all ease-in-out z-10 absolute right-0 pt-5 translate-y-full",
    cards.length === 0 && "invisible pointer-events-none -z-50",
    pathname === "/cards" && "invisible pointer-event-none",
    openCards
      ? "visible pointer-events-auto max-h-[400px] h-[400px]"
      : "invisible pointer-events-none max-h-0 h-0"
  );

  return (
    <div
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className={container}
    >
      <div
        className={`w-full h-full flex flex-col  shadow-[0_0_20px_rgba(255,165,0,0.5)] shadow-black/50 overflow-hidden justify-between bg-gray-100 text-black backdrop-blur-xl rounded-md`}
      >
        <div
          className={`h-full custom-scroll py-3 pl-3 ${
            cards.length >= 2 && "overflow-y-scroll"
          } 
           flex flex-col`}
        >
          {[...cards].reverse().map((items, i) => {
            const { images, count, title, category, id } = items;
            return (
              <ShortCard
                key={i}
                img={images[0]}
                count={count}
                category={category}
                id={id}
                title={title}
              />
            );
          })}
        </div>

        <div className="px-3 pb-3">
          <div className="w-full border-t-1px border-black">
            <span className="py-3 text-sm space-x-2 font-sans">
              <span className="">Total Price:</span>
              <span className="font-semibold">
                {total.productsTotalPrice.toFixed(2)}$
              </span>
            </span>
            <button
              onClick={() => router.push("/cards")}
              className="py-2 text-center font-world  w-full"
            >
              View Cards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
