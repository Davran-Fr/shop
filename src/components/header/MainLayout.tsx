"use client";

import React from "react";
import Header from "./Header";
import Fotoer from "../footer/Footer";

import { usePathname } from "next/navigation";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  
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

