"use client";

import Link from "next/link";
import clsx from "clsx";
import React, { forwardRef } from "react";
import { useOverFlow } from "@/hooks/useOverFlow";
import { IoCloseSharp } from "react-icons/io5";
import { links } from "./links";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { Avatar } from "../../ui/Avatar";
import { useRouter } from "next/navigation";
import { logOutNotificate } from "@/Redux/logOut";

interface Props {
  open: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const HeaderDrawer = forwardRef<HTMLDivElement, Props>(
  ({ open, onClick }, ref) => {
    const user = useSelector((state: RootState) => state.userInfo.data);
    const router = useRouter();
    const dispacht = useDispatch();
    useOverFlow(open);

    const container = clsx(
      `fixed py-10 px-5 text-black font-medium top-0 w-2/3 delay-400 space-y-10 ease-out duration-500 transition-transform h-full right-0 z-60 bg-mainBack`,
      open ? "translate-x-0 delay-200" : "translate-x-full "
    );

    return (
      <div>
        <div
          className={`w-full z-50 linear bg-gradient-to-l shadow-xl from-black to-transparent bg-black/25 h-full fixed ease-out duration-500 transition-transform top-0 right-0 ${
            open ? "translate-x-0 " : "delay-200 translate-x-full"
          } `}
        ></div>
        <div ref={ref} className={container}>
          <IoCloseSharp className="text-3xl" onClick={onClick} />
          <div className="flex w-full items-center gap-10 flex-col">
            <Avatar
              className="w-16 h-16"
              avatar={user?.avatar ? user.avatar : ""}
            />
            <ul className="flex flex-col w-full gap-3 font-world text-center">
              {links.map((items, i) => {
                if (items.href === "/cards") return null;
                return (
                  <li
                    onClick={(e) => {
                      onClick(e);
                      if (items.href === "/auth") {
                        dispacht(logOutNotificate(true));
                      } else {
                        router.push(items.href);
                      }
                    }}
                    key={i}
                    className="py-2 bg-black/50 text-white border-1px border-gray-500 rounded-xl"
                  >
                    {items.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
);

export default HeaderDrawer;
