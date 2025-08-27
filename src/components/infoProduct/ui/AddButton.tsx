import React, { useState } from "react";
import { addCountCards, addItems, PropsSlice } from "@/Redux/cards";
import { Product } from "@/Types/products";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface Props {
  data: Product;
  cards: PropsSlice;
}

const AddButton = ({ cards, data }: Props) => {
  const [spinnner, setSpinner] = useState(false);
  const [require, setRequire] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="font-world max-w-[420px] h-10 xl:text-lg text-sm flex gap-1">
      <button
        onClick={() => {
          if (cards.count > 0) {
            setSpinner(true);
            setTimeout(() => {
              dispatch(addItems(data));
              setSpinner(false);
              dispatch(addCountCards({ count: 0 }));
            }, 2000);
          } else if (cards.count === 0) {
            setRequire(true);
            setTimeout(() => {
              setRequire(false);
            }, 2000);
          }
        }}
        className=" flex justify-center w-full items-center bg-orderBtn border-1px border-black h-full rounded-md"
      >
        {spinnner ? (
          <FaSpinner className="animate-spin text-xl text-gray-600" />
        ) : (
          <span>Add to Card</span>
        )}
      </button>
      <input
        value={cards.count === 0 ? "" : cards.count}
        onChange={(e) => {
          dispatch(
            addCountCards({
              count: e.target.value ? Number(e.target.value) : 0,
            })
          );
        }}
        type="number"
        className={` bg-orderBtn w-1/2 h-full rounded-md px-2 ${
          require ? "border-red-500 border-2" : "border-black border-1px"
        }`}
        placeholder="Count"
        max={data?.stock}
      />
    </div>
  );
};

export default AddButton;
