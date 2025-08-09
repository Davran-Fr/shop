"use client"; 
import React, {  useRef, useState } from "react";
import { links } from "./links";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import HeaderDrawer from "./HeaderDrawer";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/Redux/store";
import useClickOutside from "@/hooks/useClickOutSide";
import CardsShortView from "./CardsShortView";

const Header = () => {
  const user = useSelector((state: RootState) => state.userInfo.data);
  const cards = useSelector((state: RootState) => state.cardItems.items);
  const [open, setOpen] = useState(false);
  const [openCards, setOpenCards] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };
  useClickOutside(divRef, () => setOpen(false));
  return (
    <div className="w-full bg-green-  pt-3  fixed z-50 top-0  font-world ">
      <div
        className={`w-full z-50 linear bg-gradient-to-l  shadow-xl   from-black to-transparent bg-black/25 h-full fixed ease-out duration-500  transition-transform top-0 right-0 ${
          open ? "translate-x-0 " : "delay-200 translate-x-full"
        } `}
      ></div>
      <HeaderDrawer onClick={(e) => onClick(e)} open={open} ref={divRef} />
      <div className="container mx-auto   w-full  bg-red- h-11 flex justify-between  items-center text-white ">
        <h1 className="text-xl backdrop-blur-xl flex items-center justify-center text-center  font-agamtoh h-full px-5 rounded-full  bg-black/50 ">
          DvG
        </h1>

        <ul className=" hidden md:flex bg-black/40  items-center gap-3 px-10 text-white rounded-full h-full backdrop-blur-xl   space-x-7 text-lg bg-green-">
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

        <div className="flex relative items-center  text-xl bg-black/50 h-full backdrop-blur-xl  px-5 rounded-full   gap-7">
          <div
            onMouseLeave={() => setOpenCards(false)}
            onMouseEnter={() => setOpenCards(true)}
            className="relative    md:flex items-center  cursor-pointer "
          >
            <div
              className={`w-2 h-2 bg-red-500 absolute ${
                cards.length > 0 ? "block" : "hidden"
              } z-10 top-0 -right-1 rounded-full`}
            ></div>
            <TiShoppingCart className="max-h-6 max-w-6 w-6 h-6" />
          </div>
          <div className="relative z-30">
            {user?.avatar ? (
              <div className="p-1px  max-h-6 max-w-6 w-6 h-6 overflow-hidden hidden md:flex items-center justify-center  rounded-full bg-white">
                <Image
                  width={800}
                  height={800}
                  alt="avatar"
                  className="w-full h-full object-cover"
                  src={user.avatar}
                />
              </div>
            ) : (
              <MdAccountCircle className="hidden md:block max-h-6 max-w-6 w-6 h-6" />
            )}
            <GiHamburgerMenu
              className="md:hidden "
              onClick={(e) => onClick(e)}
            />
          </div>
          <CardsShortView
            onMouseEnter={() => setOpenCards(true)}
            onMouseLeave={() => setOpenCards(false)}
            openCards={openCards}
            cards={cards}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
