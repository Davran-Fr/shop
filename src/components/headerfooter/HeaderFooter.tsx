"use client";
import React from "react";
import Header from "./Header";
import Fotoer from "./Fotoer";
import { usePathname } from "next/navigation";

const HeaderFooter = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const check = pathname.startsWith("/auth");
  return (
    <>
      {!check && <Header />}
      {children}
      {!check && <Fotoer />}
    </>
  );
};

export default HeaderFooter;
