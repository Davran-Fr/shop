"use client";

import { useLogInForm } from "@/features/auth/useLogInForm";
import RegisterButton from "@/ui/RegisterButton";
import RegisterInput from "@/ui/RegisterInput";
import React from "react";

const LoginForm = () => {
  const {
    onSubmit,
    handleSubmit,
    dispacht,
    register,
    data,
    error,
    isLoading,
    load,
  } = useLogInForm();

  if (isLoading) return <div>LOADING</div>;
  return (
    <div className="w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col   w-full justify-between h-full"
      >
        {/* {error} */}
        <div className="flex flex-col gap-5">
          <RegisterInput
            type="email"
            placeholder="E-mail"
            registation={register("email")}
          />
          <RegisterInput
            type="password"
            placeholder="Password"
            registation={register("password")}
          />
        </div>
        <div className="flex-col gap-5 flex">
          <div className="flex gap-5">
            <RegisterButton type="button" name="Clear All" />
            <RegisterButton type="submit" name="Login" navigation="/" />
          </div>
          <RegisterButton
            type="button"
            name="Sign Up"
            navigation="/auth/signup"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
