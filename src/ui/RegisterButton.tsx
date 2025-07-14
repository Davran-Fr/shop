'use client'
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  type: 'submit' | 'button' | 'reset';
  navigation?: string;
  name: string;
  classname?: string;
  onclick?: () => void;
}
const RegisterButton = ({ navigation, name, classname, onclick, type    }: Props) => {
  const router = useRouter();
  return (
    <button
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
};

export default RegisterButton;
