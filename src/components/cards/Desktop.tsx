import React from "react";
import Image from "next/image";

import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import { AddButton } from "./ui/ChangeQuantity";

export const Desktop = () => {
  const cards = useSelector((state: RootState) => state.cardItems);

  return (
    <table className="hidden xl:block border-separate border-spacing-y-7 border-spacing-x-10">
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
  );
};
