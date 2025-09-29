import { useShowSuccess } from "@/hooks/useShowSuccess";
import {
  addCountCards,
  addItems,
  CartItem,
  PropsSlice,
  removeItems,
} from "@/Redux/cards";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setTimeout } from "timers";

interface Props {
  cards: PropsSlice;
  item: CartItem;
}

export const AddButton = ({ cards, item }: Props) => {
  const [require, setRequire] = useState(false);
  const [spinnner, setSpinner] = useState<"remove" | "add" | "stop">("stop");
  const [orderAdd, setOrderAdd] = useState("");
  const showSuccess = useShowSuccess();
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center font-world items-center gap-3 h-8">
      <button
        onClick={() => {
          if (orderAdd !== "0" && orderAdd !== "") {
            setSpinner("remove");
            setTimeout(() => {
              showSuccess();
              setSpinner("stop");
              dispatch(removeItems(item));
              setOrderAdd("");
            }, 1000);
          } else {
            setRequire(true);
            setTimeout(() => {
              setRequire(false);
            }, 800);
          }
        }}
        className="flex w-[90px] justify-center items-center bg-gray-100 border border-black text-sm h-full px-3 rounded-md"
      >
        {spinnner === "remove" ? (
          <FaSpinner className="animate-spin text-lg text-gray-600" />
        ) : (
          <span>Remove </span>
        )}
      </button>
      <input
        type="number"
        min={0}
        onChange={(e) => {
          setOrderAdd(e.target.value);
          dispatch(
            addCountCards({
              count: Number(e.target.value),
            })
          );
        }}
        value={orderAdd === "0" ? "" : orderAdd}
        className={`bg-gray-100 w-[80px] text-center rounded-md px-2 h-full  ${
          require ? "border-red-500 border-[1px]" : "border-black border-1px"
        } `}
      />
      <button
        onClick={() => {
          if (orderAdd !== "0" && orderAdd !== "") {
            setSpinner("add");
            setTimeout(() => {
              setSpinner("stop");
              showSuccess();
              dispatch(addItems(item));
              setOrderAdd("");
            }, 1000);
          } else {
            setRequire(true);
            setTimeout(() => {
              setRequire(false);
            }, 500);
          }
        }}
        className="flex w-[90px] justify-center items-center bg-gray-100 border border-black text-sm h-full px-3 rounded-md"
      >
        {spinnner === "add" ? (
          <FaSpinner className="animate-spin text-lg text-gray-600" />
        ) : (
          <span>Add </span>
        )}
      </button>
    </div>
  );
};
