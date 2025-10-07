"use client";

import React from "react";

import { usePathname, useRouter } from "next/navigation";
import { MdManageAccounts } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { logOutNotificate } from "@/Redux/logOut";
import { useWidth } from "@/hooks/useWidth";


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
  const width = useWidth();

  return (
    <div className=" sticky md:flex font-medium flex bottom-0 md:flex-col flex-wrap justify-center md:justify-start gap-x-10 gap-y-5">
      {links.map((item, i) => {
        const isActive = pathname === item.href;
        const lastElement = links.length - 1;
        if (item.href === "/auth" && width <= 768) return null;

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
              }  flex items-center gap-x-5 text-lg md:text-xl cursor-pointer md:hover:text-slate-500 md:hover:font-bold`}
            >
              <span >{item.icon}</span>
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
