import React from "react";

import { RootState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { selectedItemRemove } from "@/Redux/cards";
import { removeButton, showSelection } from "@/Redux/removeSelect";
import { TableAddButton } from "@/ui/TableAddButton";

export const TableFooter = () => {
  const cards = useSelector((state: RootState) => state.cardItems);
  const selection = useSelector((state: RootState) => state.removeSelect);
  const dispatch = useDispatch();
  const router = useRouter();

  const selectedItemsCount = selection.items.length > 0 && selection.show;

  return (
    <div className="gap-y-20 pt-10 border-t-1px font-medium border-slate-200 flex flex-col w-full">
      <div className="flex xl:justify-between w-full xl:flex-row gap-y-5 flex-col xl:items-end">
        <div className="flex items-end">
          <h5 className="font-world text-lg md:text-xl">Total Price:</h5>
          <span className="font-workSans font-bold text-red-500 text-xl md:text-2xl ml-5">
            {cards.productsTotalPrice.toFixed(2)} $
          </span>
        </div>
        {selectedItemsCount && (
          <div className="font-world text-lg md:text-2xl text-black/50">
            Selected Items :{" "}
            <span className="font-sans ml-2 text-black font-bold">
              {selection.items.length}
            </span>
          </div>
        )}
        <button
          onClick={() => router.push("/products")}
          className="flex text-lg md:text-xl space-x-5 items-center text-black/50 font-world"
        >
          <span>Continue Shopping</span>
          <FaArrowRight className="text-lg" />
        </button>
      </div>
      {selection.show ? (
        <div className="mx-auto space-x-5">
          <TableAddButton
            name="Remove"
            onClick={() => {
              if (selection.items.length !== 0) {
                dispatch(selectedItemRemove(selection.items));
                dispatch(removeButton(selection.items));
                dispatch(showSelection(false));
              } else {
                alert("Please select the items that you want to remove");
              }
            }}
          />
          <TableAddButton
            name="Cancel"
            onClick={() => {
              dispatch(showSelection(false));
            }}
          />
        </div>
      ) : (
        <TableAddButton name="Order" onClick={() => router.push("/order")} />
      )}
    </div>
  );
};
