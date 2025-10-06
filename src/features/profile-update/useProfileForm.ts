import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useChangeProfileMutation } from "@/Api/auth";
import { uploadToImgbb } from "@/hooks/useUpLoadCloudinary";
import { setUsersDataBase } from "@/Redux/userDataBase";
import { SubmitHandler, useForm } from "react-hook-form";
import { profileForm, ProfileUpdateType } from "@/validation/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

interface Props {
  setShow: (name: boolean) => void;
}

export const useProfileForm = ({ setShow }: Props) => {
  const user = useSelector((state: RootState) => state.userInfo.data);
  const [changeProfile] = useChangeProfileMutation();
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState("");
  const router = useRouter();
  //////// --------- useForm setup --------- /////////
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUpdateType>({
    resolver: zodResolver(profileForm),
  });

  //////// --------- Submit handler --------- /////////
  const onSubmit: SubmitHandler<ProfileUpdateType> = async (data  ) => {
    if (!user?.id) return;

    try {
      let avatarUrl = data.avatar;

      if (file) {
        const url = await uploadToImgbb(file);
        avatarUrl = url;
        setValue("avatar", url);
      }

      const payload: Partial<ProfileUpdateType> = {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        ...(avatarUrl && { avatar: avatarUrl }),
        ...(data.password && { password: data.password }),
      };
      console.log(payload);

      const updatedUser = await changeProfile({
        id: String(user.id),
        body: payload,
      }).unwrap();

      setTimeout(() => {
        dispatch(setUsersDataBase(updatedUser));
      }, 500);

      alert("Profile updated!");
      setShow(false);
      setValue("name", "");
      setValue("email", "");
      setValue("password", "");
      setValue("avatar", "");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  //////// --------- File Change --------- /////////
  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const checkedSize = file.size / (1024 * 1024);
    if (checkedSize > 2) {
      alert("Please upload a smaller file (<2 MB).");
      return;
    }

    setFile(file);
    setImage(URL.createObjectURL(file));
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    fileChange,
    image,
    user,
    register,
  };
};
