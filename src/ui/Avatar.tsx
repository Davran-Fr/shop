import Image from "next/image";
import React from "react";
import { MdAccountCircle } from "react-icons/md";

export const Avatar = ({ avatar ,className }: { avatar: string  , className : string}) => {
  return avatar ? (
    <div className={`overflow-hidden relative md:block rounded-full ${className}`}>
      <Image fill alt="avatar" objectPosition="center" className="rounded-full" src={avatar} />
    </div>
  ) : (
    <MdAccountCircle className="hidden md:block w-6 h-6" />
  );
};
