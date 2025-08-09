"use client";
import {
  useAnimations,
} from "@/components/forms/animation";
import RegisterButton from "@/ui/RegisterButton";
import React from "react";

const page = () => {
  const { loginBtn, registerBtn, dvgTexts, btnDiv } = useAnimations();
  return (
      <div className=" text-center gap-10 py-10 w-full h-full text-black flex flex-col    ">
        <div
          ref={dvgTexts}
          className="flex relative z-50 flex-col justify-center gap-10 font-agamtoh w-full h-full "
        >
          <h1 className="text-4xl sm:text-7xl  font"> DvG</h1>
          <h3 className="text-2xl sm:text-4xl"> Shop</h3>
          <h3 className="text-3xl sm:text-5xl  "> Welcome</h3>
        </div>
        <div
          ref={btnDiv}
          className="bg w-full h-full  flex text-lg sm:text-xl  font-world items-center gap-5 justify-between"
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

export default page;
