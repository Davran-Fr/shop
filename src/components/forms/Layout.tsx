"use client";

import React from "react";

import { useAnimations } from "@/components/forms/animation";
import { usePathname } from "next/navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { authDiv } = useAnimations();
  const pathname = usePathname();
  const isAuthPage =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup");
  

  return (
    <div className="mx-auto fixed  font-medium flex overflow-hidden justify-center items-center 400:py-5 px-5 z-10  w-full h-screen bg-gray-100">
      <div
        ref={authDiv}
        className={`bg-gray-100 overflow-x-hidden ${
          isAuthPage ? "shadow-regiterBackShadow" : "invisible overflow-hidden"
        }   relative z-10  h-auto sm:max-h-registerHeight rounded-xl sm:h-full max-w-registerWidth w-full flex items-center justify-center   p-5 sm:p-10  `}
      >
        <div className="w-full h-full relative z-10">{children}</div>
      </div>
    </div>
  );
};
