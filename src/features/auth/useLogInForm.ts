import { useLogInMutation } from "@/Api/auth";
import { logInForm, LoginType } from "@/validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setTokenCookies } from "../lib/cookies";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setAccess_token } from "../lib/localeStorage";

export const useLogInForm = () => {
  const [logInMutation, { data, error, isLoading }] = useLogInMutation();
  const [load , setLoad] = useState(false)
  const router = useRouter()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(logInForm),
  });
  const dispacht = useDispatch();

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      const token = await logInMutation({
        email: data.email,
        password: data.password,
      });
      const changedAccesstoken = token.data?.access_token;
      const changedRefreshToken = token.data?.refresh_token;

      if (changedAccesstoken && changedRefreshToken) {

        setAccess_token(changedAccesstoken)
        setTokenCookies(changedRefreshToken);
        setLoad(true)
        router.replace('/')
        
      }
      reset();
    } catch (err) {
      alert("girmedin");
      router.push('/ss')
      console.log(err);
    }
  };

  return{
    onSubmit, 
    handleSubmit,
    dispacht,
    register,
    data,
    error,
    errors,
    isLoading,
    load
  }
};
