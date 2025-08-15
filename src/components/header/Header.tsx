"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import HeaderDrawer from "./Drawer";
import useClickOutside from "@/hooks/useClickOutSide";

import { CardsShortView } from "./ShortView";
import { links } from "./links";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { Logo } from "@/ui/Logo";
import { Avatar } from "../../ui/Avatar";
import { CardIcon } from "../../ui/CardIcon";
import { Container } from "@/ui/Container";

const Header = () => {
  const user = useSelector((state: RootState) => state.userInfo.data);
  const cards = useSelector((state: RootState) => state.cardItems.items);
  const divRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [openCards, setOpenCards] = useState(false);

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  useClickOutside(divRef, () => setOpen(false));

  return (
    <div className="w-full pt-3 fixed z-50 top-0 font-world">
      <HeaderDrawer onClick={(e) => onClick(e)} open={open} ref={divRef} />
      <Container className="h-11 flex justify-between  items-center text-white">
        <Logo />
        <ul className=" hidden md:flex bg-black/50 items-center gap-3 px-10 text-white rounded-full h-full backdrop-blur-xl space-x-7 text-lg">
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
        <div className="flex relative items-center text-xl bg-black/50 h-full backdrop-blur-xl px-5 rounded-full gap-7">
          <CardIcon
            length={cards.length}
            enter={() => setOpenCards(true)}
            leave={() => setOpenCards(false)}
          />
          <div className="relative z-30">
            <Avatar
              className=" w-6 h-6 hidden md:block"
              avatar={user?.avatar ? user.avatar : ""}
            />
            <GiHamburgerMenu
              className="md:hidden"
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
      </Container>
    </div>
  );
};

export default Header;
