import clsx from "clsx";
import React from "react";

import { RootState } from "@/Redux/store";
import { Avatar } from "@/ui/Avatar";
import { MdManageAccounts } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { PiSignOutBold } from "react-icons/pi";
import { LuShoppingBag } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import { logOutNotificate } from "@/Redux/logOut";
import { useWidth } from "@/hooks/useWidth";

interface Props {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  openCards: boolean;
}

export const Settings = ({ onMouseEnter, onMouseLeave, openCards }: Props) => {
  const user = useSelector((state: RootState) => state.userInfo);
  const router = useRouter();
  const dispacth = useDispatch();
  const pathname = usePathname();

  const container = clsx(
    "rounded-md w-[300px] font-medium duration-300 bottom-3  transition-all ",
    "ease-in-out overflow- z-10 absolute right-0 pt-5 translate-y-full",
    openCards
      ? "visible pointer-events-auto max-h-[400px] h-[300px]"
      : "invisible pointer-events-none max-h-0 h-0",
    pathname.startsWith("/account") ? "hidden" : "hidden lg:block"
  );

  const settings = [
    {
      label: "Account",
      push: "/account",
      icon: <MdManageAccounts className="w-full h-full hidden md:block" />,
    },
    {
      label: "My Orders",
      push: "/account/my-orders",
      icon: <LuShoppingBag className="w-full h-full hidden md:block" />,
    },
    {
      label: "Sign Out",
      icon: <PiSignOutBold className="w-full h-full hidden md:block" />,
    },
  ];

  return (
    <div
      onMouseLeave={() => onMouseLeave()}
      onMouseEnter={() => onMouseEnter()}
      className={container}
    >
      <div
        className={`divide-y-1px divide-black shadow-[0_0_20px_rgba(255,165,0,0.5)] text-black 
          h-full flex flex-col overflow-hidden bg-gray-100 backdrop-blur-xl rounded-md
          shadow-black/50 w-full`}
      >
        <div className="flex items-center py-8 px-7 gap-x-5">
          <div className="p-0.5 bg-white rounded-full">
            <Avatar
              className="w-11 h-11 hidden md:block"
              avatar={user?.data?.avatar ? user.data.avatar : ""}
            />
          </div>
          <div className="text-base">
            <h4>{user.data?.name}</h4>
            <h4 className="text-sm">{user.data?.email}</h4>
          </div>
        </div>
        {settings.map((item, i) => (
          <div
            onClick={() => {
              onMouseLeave;
              if (item.push) {
                router.push(item.push);
              } else if (item.label === "Sign Out") {
                dispacth(logOutNotificate(true));
              }
            }}
            key={i}
            className="flex hover:bg-black/50 hover:text-white cursor-pointer items-center px-10 gap-x-5 py-4"
          >
            <div className="w-6 h-6">{item.icon}</div>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
