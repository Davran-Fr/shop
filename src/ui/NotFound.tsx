import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  name: string;
}

export const NotFound = ({ name }: Props) => {
  const router = useRouter();
  return (
    <div className="font-world text-3xl md:text-6xl py-20 flex flex-col justify-center items-center gap-y-20">
      <h3>{name}</h3>
      <button
        onClick={() => router.push("/products")}
        className="bg-gray-100 text-2xl px-5 w-fit rounded-md py-5"
      >
        Go Shopp
      </button>
    </div>
  );
};
