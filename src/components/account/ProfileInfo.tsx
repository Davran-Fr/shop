import { RootState } from "@/Redux/store";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  show: boolean;
  setNotificate: (name: boolean) => void;
}

export const ProfileInfo = ({ show, setNotificate }: Props) => {
  const user = useSelector((state: RootState) => state.userInfo.data);
  const [loading, setLoading] = useState(false);

  return (
    <div className={`${!show ? "block" : "hidden"} space-y-5 text-center mt-14 md:mt-10`}>
      <div className="relative bg-black/50 mx-auto w-[250px] h-[250px] overflow-hidden rounded-full">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse rounded-full">
            <span className="text-gray-500 text-sm">Loading...</span>
          </div>
        )}
        <Image
          className={`${loading ? "opacity-0" : "opacity-100"}`}
          src={user?.avatar ? user.avatar : ""}
          unoptimized
          objectFit="cover"
          alt="image"
          fill
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3>{user?.name}</h3>
      <p>{user?.email}</p>
      <button
        onClick={() => setNotificate(true)}
        className="bg-black/50 text-white px-5 py-2 rounded-lg text-lg hover:shadow-md duration-300 hover:shadow-black"
      >
        Change Account
      </button>
    </div>
  );
};
