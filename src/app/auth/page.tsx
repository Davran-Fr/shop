import RegisterButton from "@/ui/RegisterButton";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className=" text-center w-full h-full text-black flex flex-col   gap-10">
      <div className="flex flex-col justify-between font-agamtoh w-full h-full gap-5">
        <h1 className="text-4xl sm:text-5xl  font"> DvG</h1>
        <h3 className="text-2xl sm:text-3xl"> Shop</h3>
        <h3 className="text-3xl sm:text-5xl  "> Welcome</h3>
      </div>
      <div className="bg w-full h-full flex text-xl  font-world items-center gap-5 justify-between">
        <RegisterButton classname="py-5 " name="Log In" navigation="auth/login" type="button" />
        <RegisterButton classname="py-5 " name="Sign Up" navigation="auth/signup" type="button" />
      </div>
    </div>
  );
};

export default page;
