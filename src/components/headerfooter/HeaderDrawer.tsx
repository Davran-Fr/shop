"use client";
import { useOverFlow } from "@/hooks/overFlow";
import React, { forwardRef, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { links } from "./links";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/Redux/store";

interface Props {
  open: boolean;
  onClick: (e: React.MouseEvent) => void;
}
const HeaderDrawer = forwardRef<HTMLDivElement, Props>(
  ({ open, onClick }, ref) => {
    const user = useSelector((state: RootState) => state.userInfo.data);
    useOverFlow(open);
    return (
      <div
        ref={ref}
        className={`fixed py-10 px-5 text-white top-0 w-2/3  delay-400 space-y-10 ease-out duration-500  transition-transform h-full right-0 z-60 bg-mainBack transform  ${
          open ? "translate-x-0 delay-200" : "translate-x-full "
        }`}
      >
        <IoCloseSharp className="text-3xl" onClick={onClick} />
        <div className="flex w-full items-center gap-10 flex-col">
          <div className=" rounded-full  bg-mainColor p-1px">
            {user?.avatar ? (
              <div className="p-1px max-h-20   max-w-20 overflow-hidden rounded-full bg-mainColor">
                <Image
                  width={800}
                  height={800}
                  alt="avatar"
                  className="w-full h-full object-cover "
                  src={user.avatar}
                />
              </div>
            ) : (
              <MdAccountCircle className="text-7xl" />
            )}
          </div>
          <div className="flex flex-col w-full   gap-3    font-world text-center">
            {links.map((items ,i ) => {
              return (
                <Link
                key={i}
                  className="py-5 bg-mainColor rounded-xl"
                  href={items.href}
                >
                  {items.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default HeaderDrawer;
