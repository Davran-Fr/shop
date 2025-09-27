"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  navigation?: string;
  name: string;
  classname?: string;
  onclick?: () => void;
  type: "button" | 'submit';
}

const RegisterButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ navigation, type = "button", name, classname = "", onclick }, ref) => {
    const router = useRouter();
    return (
      <button
        ref={ref}
        type={`${type}`}
        className={`bg-black/50  border-1px border-gray-500 w-full rounded-xl text-white py-2 ${classname}`}
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
