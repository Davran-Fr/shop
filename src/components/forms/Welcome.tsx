'use client'

import React from "react";
import RegisterButton from "@/ui/RegisterButton";
import { useAnimations } from "./animation";


export const Welcome = () => {
  const { loginBtn, registerBtn, dvgTexts, btnDiv } = useAnimations();

  return (
    <div className=" text-center font-medium gap-10 py-10 w-full h-full text-black flex flex-col">
      <div
        ref={dvgTexts}
        className="flex relative z-50 flex-col justify-center gap-10 font-agamtoh w-full h-full "
      >
        <h1 className="text-4xl sm:text-7xl"> DvG</h1>
        <h3 className="text-2xl sm:text-4xl"> Shop</h3>
        <h3 className="text-3xl sm:text-5xl"> Welcome</h3>
      </div>
      <div
        ref={btnDiv}
        className="bg w-full h-full  flex text-lg sm:text-xl font-world items-center gap-5 justify-between"
      >
        <RegisterButton
          ref={loginBtn}
          classname="py-3 "
          name="Log In"
          navigation="auth/login"
          type="button"
        />
        <RegisterButton
          ref={registerBtn}
          classname="py-3 "
          name="Sign Up"
          navigation="auth/signup"
          type="button"
        />
      </div>
    </div>
  );
};
