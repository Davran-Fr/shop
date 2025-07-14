"use client"; // если ты в App Router
import React, { useEffect, useRef, useState } from "react";
import { links } from "./links";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import HeaderDrawer from "./HeaderDrawer";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/Redux/store";
import { useRouter } from "next/navigation";

const Header = () => {
  const user = useSelector((state: RootState) => state.userInfo.data);
  const [open, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  useEffect(() => {
    const openClose = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event?.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", openClose);

    return () => {
      window.removeEventListener("click", openClose);
    };
  }, []);
  return (
    <div className="w-full bg-green-    fixed z-50 top-0  font-world ">
      <div
        className={`w-full z-50 linear bg-gradient-to-l  shadow-xl   from-black to-transparent bg-black/25 h-full fixed ease-out duration-500  transition-transform top-0 right-0 ${
          open ? "translate-x-0 " : "delay-200 translate-x-full"
        } `}
      ></div>
      <HeaderDrawer onClick={(e) => onClick(e)} open={open} ref={divRef} />
      <div className="container mx-auto  py-2 w-full  bg-red- h-full flex justify-between  items-center text-white ">
        <h1 className="text-2xl font-agamtoh py-3 px-5 rounded-full  bg-black/50 ">DvG</h1>

        <ul className=" hidden md:flex bg-black/40  gap-3 px-10 text-white rounded-full py-1.5 backdrop-blur-xl   space-x-7 text-lg bg-green-">
          {links.map((items, i) => {
            return (
              <li key={i}>
                <Link href={items.href} className="cursor-pointer">
                  {items.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex  text-2xl bg-black/50 py-3 px-5 rounded-full   gap-7">
          <TiShoppingCart className="hidden md:block" />
          {user?.avatar ? (
            <div className="p-1px max-h-6 max-w-6 overflow-hidden hidden md:flex items-center justify-center  rounded-full bg-white">
              <Image
                width={800}
                height={800}
                alt="avatar"
                className="w-full h-full object-cover"
                src={`${user.avatar}`}
              />
            </div>
          ) : (
            <MdAccountCircle className="hidden md:block" />
          )}
          <GiHamburgerMenu className="md:hidden" onClick={(e) => onClick(e)} />
        </div>
      </div>
    </div>
  );
};

export default Header;
