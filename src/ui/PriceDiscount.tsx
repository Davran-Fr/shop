import { Card } from "@/components/cards/Cards";
import React from "react";

interface Props {
  price?: number;
  discountPercentage?: number ;
}
const PriceDiscount = ({ price, discountPercentage }: Props) => {
  
  const discountPrice = price && discountPercentage ? price  * (1 - discountPercentage  / 100): null 

  return (
    <div className="flex items-center">
      {discountPrice && (
        <span className="text-lg font-workSans font-semibold text-red-400  ">
          {discountPrice.toFixed(2)}$
        </span>
      )}
      <span
        className={`${
          discountPercentage
            && "line-through text-black ml-1 text-sm"  
        } `}
      >
        {price}$
      </span>
    </div>
  );
};

export default PriceDiscount;
