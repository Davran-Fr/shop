"use client";

import Image from "next/image";
import React from "react";

import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";

const Main = () => {
  const user = useSelector((state: RootState) => state.userInfo.data);
  console.log(user);
  
  return (
    <div className="mx-auto text-xl space-y-5 text-center">
      <div className="relative mx-auto w-[250px] h-[250px] overflow-hidden rounded-full">
        <Image
          src={user?.avatar? user.avatar : ""}
          unoptimized
          objectFit="cover"
          alt="image"
          fill
        />
      </div>
      <h3>{user?.name}</h3>
      <p>{user?.email}</p>
    </div>
  );
};

export default Main;
