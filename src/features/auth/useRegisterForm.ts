// hooks/useRegisterForm.ts
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  validForm,
  GetTypeValidForm,
  UpdatedType,
} from "@/validation/validation";
import { useLogInMutation, useSignUpMutation } from "@/Api/auth";
import { useRouter } from "next/navigation";
import { setAccess_token, setId_User } from "../lib/localeStorage";
import { setTokenCookies } from "../lib/cookies";
import { uploadToCloudinary } from "@/hooks/upLoadCloudinary";

export const useRegisterForm = () => {
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [signUp, { isLoading, error }] = useSignUpMutation();
  const [
    logIn,
    { isLoading: logInIsloading, error: logInError },
  ] = useLogInMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<GetTypeValidForm>({
    resolver: zodResolver(validForm),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgPreview(URL.createObjectURL(file));
    const url = await uploadToCloudinary(file);
    setValue("avatar", url , { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<GetTypeValidForm> = async (datas) => {
    if (
      !datas.name ||
      !datas.email ||
      !datas.password ||
      !datas.confirmPassword
    ) {
      alert("Doldur");
      return;
    }
    
    const {  confirmPassword, ...validForm }: { confirmPassword: string } & UpdatedType = datas;

    const result = await signUp(validForm).unwrap();

    const tokens = await logIn({
      email: validForm.email,
      password: validForm.password,
    });

    if (tokens.data?.access_token && tokens.data.refresh_token) {
      setTokenCookies(tokens.data.refresh_token);
      setAccess_token(tokens.data.access_token);
    }

    router.replace("/");
    setId_User(result.id);
    setImgPreview(null);
    reset();
  };

  const clearSubmit = () => {
    setImgPreview(null);
    reset();
  };

  return {
    register,
    handleSubmit,
    errors,
    imgPreview,
    isLoading,
    error,
    handleFileChange,
    onSubmit,
    clearSubmit,
  };
};
