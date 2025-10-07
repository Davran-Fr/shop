import React from "react";
import Image from "next/image";

import { RootState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AddButton } from "./ui/ChangeQuantity";
import { removeSelectItem } from "@/Redux/removeSelect";

export const Desktop = () => {
  const cards = useSelector((state: RootState) => state.cardItems);
  const selection = useSelector((state: RootState) => state.removeSelect);
  const dispatch = useDispatch();
  const show = selection.show && "opacity-40";

  return (
    <table className="hidden xl:block border-separate font-medium border-spacing-y-7 border-spacing-x-10">
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
          const price = items.price * (1 - items.discountPercentage / 100);
          const padd = selection.items.find((item) => {
            return item.id === items.id;
          });

          return (
            <tr
              onClick={() => dispatch(removeSelectItem(items))}
              key={i}
              className="text-center relative"
            >
              <td className={`${show}`}>
                <div className="relative rounded-md w-[80px] h-[80px] bg-gray-100">
                  <Image
                    className="p-1.5"
                    alt={items.brand ? items.brand : ""}
                    fill
                    src={items.images[0]}
                  />
                </div>
              </td>
              <td className={`font-world ${show}`}>{items.title}</td>
              <td className={`font-workSans font-medium ${show}`}>
                {items.count}
              </td>
              <td className={`font-workSans text-red-500 font-medium ${show}`}>
                {price.toFixed(2)} <span>$</span>
              </td>
              <td className={`font-medium font-workSans ${show}`}>
                {(items.count * price).toFixed(2)} <span>$</span>
              </td>
              <td
                className={`flex gap-5 h-20 justify-center items-center ${show}`}
              >
                <AddButton cards={cards} item={items} />
              </td>
              <div  
                className={`w-full cursor-pointer h-full ${
                  selection.show ? "block" : "hidden"
                } absolute z-[2] top-0 left-0 flex items-center`}
              >
                {padd && (
                  <div className="w-full h-[1px] bg-gradientAccordion" />
                )}
              </div>
              <div
                className={`absolute z-[1] cursor-pointer left-full duration-300 top-1/2 ml-5 -translate-y-1/2 bg-red-400 rounded-full w-7 h-7 ${
                  selection.show ? "visible opacity-100" : "invisible opacity-0"
                } ${padd && "p-1.5"}`}
              >
                <div className="w-full h-full bg-gray-500  rounded-full" />
              </div>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
