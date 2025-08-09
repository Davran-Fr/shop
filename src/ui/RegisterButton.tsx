"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { forwardRef } from "react";

interface Props {
  navigation?: string;
  name: string;
  classname?: string;
  onclick?: () => void;
  type: "button" | 'submit';
}
const RegisterButton = forwardRef<HTMLButtonElement, Props>(
  ({ navigation, type = "button", name, classname = "", onclick }, ref) => {
    const router = useRouter();
    return (
      <button
        ref={ref}
        type={`${type}`}
        className={`bg-orderBtn border-1px border-gray-500 w-full rounded-xl text-black py-2 ${classname}`}
        onClick={() => {
          onclick?.();
          if (navigation) router.push(`${navigation}`);
        }}
      >
        {name}
      </button>
    );
  }
);

export default RegisterButton;
