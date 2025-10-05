"use client";

import React, { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { MdManageAccounts } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { clearAccess_token } from "@/lib/useLocaleStorage";
import { clearTokenCookies } from "@/lib/useCookies";
import { clearItem } from "@/Redux/cards";
import { clearUserDataBase } from "@/Redux/userDataBase";
import { useRemoveOrder } from "@/lib/useOrders";
import { useRemoveDeleteUrl } from "@/lib/useDeleteUrl";
import { LogOutNotificate } from "../notification/LogOutNotificate";
import { loadingAuth } from "@/Redux/globalLoading";
import { logOutNotificate } from "@/Redux/logOut";

const links = [
  {
    title: "Account",
    href: "/account",
    icon: <MdManageAccounts className="w-6 h-6" />,
  },
  {
    title: "Orders",
    href: "/account/my-orders",
    icon: <LuShoppingBag className="w-6 h-6" />,
  },
  {
    title: "Sign Out",
    href: "/auth",
    icon: <PiSignOutBold className="w-6 h-6" />,
  },
];

export const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className=" sticky md:flex hidden bottom-0 md:flex-col flex-wrap justify-center md:justify-start gap-x-10 gap-y-5">
      {links.map((item, i) => {
        const isActive = pathname === item.href;
        const lastElement = links.length - 1;
        return (
          <div key={i} className="space-y-5 relative">
            <div
              onClick={() => {
                if (item.href === "/auth") {
                  dispatch(logOutNotificate(true));
                } else {
                  router.push(item.href);
                }
              }}
              className={`${
                isActive ? "text-slate-500 font-bold" : "text-black"
              }  flex items-center gap-x-5 md:text-xl cursor-pointer hover:text-slate-500 hover:font-bold`}
            >
              <span className="md:block hidden">{item.icon}</span>
              <span>{item.title}</span>
            </div>
            <div
              className={`bg-gradientAccordion md:block hidden w-full h-[1px] ${
                lastElement === i && "hidden"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};
