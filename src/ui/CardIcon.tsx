import { useRouter } from "next/navigation";
import React from "react";
import { TiShoppingCart } from "react-icons/ti";

interface Props {
  enter: VoidFunction;
  leave: VoidFunction;
  length: number;
}

export const CardIcon = ({ enter, leave, length }: Props) => {
  const router = useRouter()
  return (
    <div
      onMouseLeave={leave}
      onClick={() => router.push('/cards')}
      onMouseEnter={enter}
      className="relative md:flex items-center cursor-pointer"
    >
      <div
        className={`w-2 h-2 bg-red-500 absolute ${
          length > 0 ? "block" : "hidden"
        } z-10 top-0 -right-1 rounded-full`}
      ></div>
      <TiShoppingCart className=" w-6 h-6" />
    </div>
  );
};
