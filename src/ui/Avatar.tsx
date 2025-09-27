import Image from "next/image";
import React from "react";
import { MdAccountCircle } from "react-icons/md";

export const Avatar = ({
  avatar,
  className,
  enter,
  leave,
}: {
  avatar?: string;
  className?: string;
  enter?: VoidFunction;
  leave?: VoidFunction;
}) => {
  return avatar ? (
    <div
      onMouseEnter={enter}
      onMouseLeave={leave}
      className={`overflow-hidden relative md:block rounded-full ${className}`}
    >
      <Image fill alt="avatar" unoptimized objectFit="cover" src={avatar} />
    </div>
  ) : (
    <MdAccountCircle className="hidden md:block w-6 h-6" />
  );
};
