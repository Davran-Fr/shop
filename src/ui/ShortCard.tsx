import Image from "next/image";
import React from "react";

interface Props {
    img : string
    title : string,
    count : number
}

export const ShortCard = ({img , title , count} : Props) => {
  return (
    <div className={`flex gap-4 pr-3 items-center py-2 text-sm `}>
      <div className="bg-orderBtn rounded-md p-1">
        <Image
          width={50}
          height={50}
          src={img}
          alt="shortView"
          className="min-w-[50px] w-[50px]"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span>{title}</span>
        <span className="font-sans">
          Count: <span className="font-semibold">{count}</span>
        </span>
      </div>
    </div>
  );
};
