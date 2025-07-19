"use client";
import { useRouter } from "next/navigation";
import React, {
  forwardRef,
  HTMLAttributes,
  ObjectHTMLAttributes,
  RefAttributes,
  RefObject,
} from "react";

interface Props {
  type: "submit" | "button" | "reset";
  navigation?: string;
  name: string;
  classname?: string;
  onclick?: () => void;
}
const RegisterButton = forwardRef<HTMLButtonElement, Props>(({ navigation, name, classname = "", onclick, type = "button" }, ref) => {
    const router = useRouter();
    return (
      <button
        ref={ref}
        type={`${type}`}
        className={`bg-orderBtn  w-full rounded-xl text-black py-2 ${classname}`}
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
