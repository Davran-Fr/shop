import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  type?: string;
  registation: UseFormRegisterReturn;
  error?: FieldError;
  placeholder: string;
}

const RegisterInput = ({
  type = 'text',
  registation,
  error,
  placeholder,
}: Props) => {

  return (
    <label  className="flex flex-col border-1px  border-black  rounded-lg  w-full relative">
       <input
        type={type}
        placeholder={placeholder}
        className="rounded-lg text-black py-2.5 px-2.5"
        {...registation}
      />
      {/* {error && ( */}
        <span className=" z-0 sm:absolute sm:-bottom-1/2 left-0 text-sm text-red-500">
          {error?.message}
        </span>
      {/* )} */}
    </label>
  );
};

export default RegisterInput;
