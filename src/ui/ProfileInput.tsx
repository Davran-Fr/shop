import React, { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { IoEyeOffSharp } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";

interface Props {
  type?: string;
  registation?: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
}

export const ProfileInput = ({
  type = "text",
  registation,
  error,
  placeholder,
}: Props) => {
  const [change, setChange] = useState(false);
  const [onChange, setOnChange] = useState("");

  return (
    <>
      {" "}
      {type === "passwordInput" ? (
        <div className="w-full relative z-[1] mx-auto">
          <input
            value={onChange}
            onChange={(e) => setOnChange(e.target.value)}
            type={`${change ? "text" : "password"}`}
            className="border-1px border-black w-full rounded-lg py-1.5 pl-2 pr-10 text-base"
          />
          {change ? (
            <MdRemoveRedEye
              onClick={() => setChange((prev) => !prev)}
              className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2 z-10"
            />
          ) : (
            <IoEyeOffSharp
              onClick={() => setChange((prev) => !prev)}
              className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2 z-10"
            />
          )}
        </div>
      ) : (
        <label className="flex flex-col border-1px border-black rounded-lg w-full">
          <input
            placeholder={placeholder}
            type={type}
            className="rounded-lg text-black py-1.5 px-2.5"
            {...registation}
          />
          <span className="z-0 sm:absolute sm:-bottom-1/2 left-0 text-sm text-red-500">
            {error?.message}
          </span>
        </label>
      )}
    </>
  );
};
