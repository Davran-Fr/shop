// hooks/useRegisterForm.ts
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  validForm,
  GetTypeValidForm,
  UpdatedType,
} from "@/validation/validation";
import {
  useLazyGetAllUserInfoQuery,
  useLogInMutation,
  useSignUpMutation,
} from "@/Api/auth";
import { useRouter } from "next/navigation";
import { setAccess_token } from "../../lib/useLocaleStorage";
import { setTokenCookies } from "../../lib/useCookies";
import { uploadToCloudinary } from "@/hooks/upLoadCloudinary";
import { useDispatch } from "react-redux";
import { loadingAuth } from "@/Redux/globalLoading";

export const useRegisterForm = () => {
  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  const router = useRouter();
  const dispatch = useDispatch();
  const [data] = useLazyGetAllUserInfoQuery();
  const [signUp] = useSignUpMutation();
  const [logIn] = useLogInMutation();
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  //Validation react hooook forms
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<GetTypeValidForm>({
    resolver: zodResolver(validForm),
  });

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  //Upload  images from cloudinaryy
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const checkedSize = file.size / (1024 * 1024);

    if (checkedSize > 2) {
      alert(
        "Would you mind uploading a smaller file? Ideally, it should be under 2 MB."
      );
      return;
    }

    if (file) dispatch(loadingAuth(false));

    setImgPreview(URL.createObjectURL(file));

    const url = await uploadToCloudinary(file);

    if (!url) {
      alert("Coudn't upload image please try again");
      dispatch(loadingAuth(true));
      return;
    }

    if (url) dispatch(loadingAuth(true));

    setValue("avatar", url, { shouldValidate: true });
  };

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  //Register
  const onSubmit: SubmitHandler<GetTypeValidForm> = async (datas) => {
    if (
      !datas.name ||
      !datas.email ||
      !datas.password ||
      !datas.confirmPassword ||
      !datas.avatar
    ) {
      alert("Doldur");
      return;
    }

    ///Take From here confirmPassword because backend is not exepting
    const {
      confirmPassword,
      ...validForm
    }: { confirmPassword: string } & UpdatedType = datas;

    dispatch(loadingAuth(false));

    //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

    //CHECK EMIAL STATUS IN DATABASE
    const isEmailAvailable = async () => {
      const response = await data();
      return response.data?.some((user) => user.email === validForm.email);
    };

    const emailFree = await isEmailAvailable();

    if (emailFree) {
      alert("email is alreadyy exists");
      dispatch(loadingAuth(true));
      return;
    }

    //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

    try {
      await signUp(validForm).unwrap();

      const tokens = await logIn({
        email: validForm.email,
        password: validForm.password,
      }).unwrap();

      if (tokens.access_token && tokens.refresh_token) {
        setTokenCookies(tokens.refresh_token);
        setAccess_token(tokens.access_token);
      }

      setImgPreview(null);
      reset();

      dispatch(loadingAuth(false));
      router.replace("/");
      dispatch(loadingAuth(true));
    } catch (error) {
      console.error("Registration error:", error);
      dispatch(loadingAuth(true));
    }
  };

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  const clearSubmit = () => {
    setImgPreview(null);
    reset();
  };

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  return {
    register,
    handleSubmit,
    errors,
    imgPreview,
    handleFileChange,
    onSubmit,
    clearSubmit,
  };
};
