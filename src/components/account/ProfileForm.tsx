import Image from "next/image";
import React from "react";

import { useProfileForm } from "@/features/profile-update/useProfileForm";
import { ProfileInput } from "@/ui/ProfileInput";
import { MdOutlineCameraAlt } from "react-icons/md";

interface Props {
  show: boolean;
  setShow: (name: boolean) => void;
}

export const ProfileForm = ({ show, setShow }: Props) => {
  const {
    handleSubmit,
    onSubmit,
    errors,
    fileChange,
    image,
    register,
    user,
  } = useProfileForm({ setShow });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`text-lg w-full flex flex-col font-medium mt-14 md:mt-10 md:flex-row lg:py-10 gap-x-10 gap-y-10 items-center justify-center mx-auto ${
        show ? "block" : "hidden"
      }`}
    >
      <label
        htmlFor="avatar"
        className="flex font-workSans gap-3 h-fit text-xl items-center flex-col justify-center cursor-pointer"
      >
        <input
          onChange={fileChange}
          id="avatar"
          type="file"
          className="hidden"
        />
        <div className="w-[200px] h-[200px] 400:w-36 400:h-36 500:w-44 500:h-44 bg-white relative border-1px border-black rounded-full flex justify-center items-center overflow-hidden">
          {image ? (
            <div className="">
              <Image
                objectFit="cover"
                className={`rounded-full`}
                fill
                unoptimized
                src={image}
                alt="avatar preview"
              />
            </div>
          ) : (
            <div className="">
              <Image
                className={`rounded-full ${user?.avatar && "opacity-40"}`}
                fill
                objectFit="cover"
                unoptimized
                src={user?.avatar ? user.avatar : ""}
                alt="avatar preview"
              />
              <div className="text-6xl left-1/2 -translate-x-1/2 -translate-y-1/2 absolute top-1/2 font-semibold text-center text-black/">
                <MdOutlineCameraAlt />
              </div>
            </div>
          )}
        </div>
      </label>
      <div className="flex flex-col max-w-[300px] w-full text-lg gap-y-5">
        <ProfileInput
          placeholder={`${user?.name}`}
          registation={register("name")}
          error={errors.name}
        />
        <ProfileInput
          placeholder={`${user?.email}`}
          registation={register("email")}
          error={errors.email}
        />
        <ProfileInput
          type="passwordInput"
          placeholder={`${user?.password}`}
          registation={register("password")}
          error={errors.password}
        />
        <button
          type="submit"
          className="bg-black/50 text-white text-lg px-16 py-1 rounded-md"
        >
          Change
        </button>
        <button
          onClick={() => setShow(false)}
          type="button"
          className="bg-black/50 text-white text-lg px-16 py-1 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
