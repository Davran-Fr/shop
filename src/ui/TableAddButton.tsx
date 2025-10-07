import React from "react";

interface Props {
  onClick: VoidFunction;
  name: string;
}

export const TableAddButton = ({ onClick, name }: Props) => {
  return (
    <button
      onClick={onClick}
      className="border-1px sticky bottom-5 border-black w-fit mx-auto font-world py-0.5 xl:py-2 px-7 rounded-xl cursor-pointer
                      hover:bg-black/50 hover:backdrop-blur-2xl bg-gray-100
                      hover:text-white duration-300 text-lg xl:text-xl text-center"
    >
      {name}
    </button>
  );
};
