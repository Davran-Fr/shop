import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  img: string;
  title: string;
  count: number;
  category: string;
  id: number;
}

export const ShortCard = ({ category, id, img, title, count }: Props) => {
  return (
    <div className={`flex gap-4 pr-3 items-center py-2 text-sm`}>
      <div className="bg-white rounded-md p-1">
        {img && (
          <Image
            width={50}
            height={50}
            src={img}
            alt={title || "shortView"}
            className="min-w-[50px] w-[50px]"
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Link href={`/products/${category}/${id}`}>{title}</Link>
        <span className="font-sans">
          Count: <span className="font-semibold">{count}</span>
        </span>
      </div>
    </div>
  );
};
