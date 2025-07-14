"use client";
import Image from "next/image";
import React from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import { useRegisterForm } from "@/features/auth/useRegisterForm";
import RegisterInput from "@/ui/RegisterInput";
import RegisterButton from "@/ui/RegisterButton";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    imgPreview,
    isLoading,
    error,
    handleFileChange,
    onSubmit,
    clearSubmit,
  } = useRegisterForm();
  return (
    <div className="flex  font-medium font-world  h-full     w-full  bg-red-">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl flex  items-center flex-col sm:flex-row   gap-10  justify-between w-full  h-full     text-black"
      >
        <label
          htmlFor="avatar"
          className="flex font-workSans gap-3 bg--300 h-fit  text-xl w-1/2 items-center flex-col justify-center cursor-pointer"
        >
          <span>Photo</span>
          <input
            {...register("avatar")}
            onChange={handleFileChange}
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
          />
          <div className="w-40 h-40 bg-white  border-1px border-black rounded-full flex justify-center items-center overflow-hidden">
            {imgPreview ? (
              <Image
                className="w-full h-full object-cover rounded-full"
                height={128}
                width={128}
                src={imgPreview}
                alt="avatar preview"
              />
            ) : (
              <div className="text-6xl font-semibold text-center text-black/50">
                <MdOutlineCameraAlt />
              </div>
            )}
          </div>
        </label>

        <div className="w-full h-full  text-black gap-5 flex flex-col  justify-between">
          <RegisterInput
            error={errors.name}
            placeholder="Your name"
            registation={register("name")}
          />
          <RegisterInput
            error={errors.email}
            placeholder="E-mail"
            registation={register("email")}
          />
          <RegisterInput
            error={errors.password}
            placeholder="Password"
            type="password"
            registation={register("password")}
          />
          <RegisterInput
            error={errors.confirmPassword}
            placeholder="Confirm Password"
            type="password"
            registation={register("confirmPassword")}
          />
          <div className="w-full flex justify-center gap-5">
            <RegisterButton
              name="Clear All"
              onclick={clearSubmit}
              type="button"
              classname="text-lg"
            />
            <RegisterButton name="Register" type="submit" classname="text-lg" />
          </div>
          <RegisterButton
            name="Login"
            navigation="/auth/login"
            type="button"
            classname="text-lg"
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
