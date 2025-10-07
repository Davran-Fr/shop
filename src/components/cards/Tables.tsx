"use client";

import React from "react";

import { RootState } from "@/Redux/store";
import { Container } from "@/ui/Container";
import { useSelector } from "react-redux";
import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";
import { NotFound } from "@/ui/NotFound";
import { TableFooter } from "./TableFooter";

export const Tables = () => {
  const cards = useSelector((state: RootState) => state.cardItems);

  return (
    <Container className="">
      {cards.items.length === 0 ? (
        <NotFound name="No Products in Card" />
      ) : (
        <>
          <div className="w-full xl:space-y-0 flex flex-col xl:items-center pt-10 sm:pb-20 pb-32 relative">
            <Desktop />
            <Mobile />
            <TableFooter />
          </div>
        </>
      )}
    </Container>
  );
};
