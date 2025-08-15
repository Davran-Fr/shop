import { useLogInMutation } from "@/Api/auth";
import { logInForm, LoginType } from "@/validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setTokenCookies } from "../../lib/useCookies";
import { useRouter } from "next/navigation";
import { setAccess_token } from "../../lib/useLocaleStorage";
import { loadingAuth } from "@/Redux/globalLoading";

export const useLogInForm = () => {
  const [logInMutation, { data, error, isLoading }] = useLogInMutation();
  const router = useRouter();
  const dispacht = useDispatch();

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(logInForm),
  });

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    if (!data.email || !data.password) {
      alert("plaaese fill the form");
      return;
    }
    dispacht(loadingAuth(false));
    try {
      const token = await logInMutation({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (token.access_token && token.refresh_token) {
        setAccess_token(token.access_token);
        setTokenCookies(token.refresh_token);
      }
      reset();
      router.replace("/");
    } catch (err) {
      alert("wrong");
      reset();
      dispacht(loadingAuth(true));
    }
  };

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  return {
    onSubmit,
    handleSubmit,
    register,
    reset,
    errors,
  };
};
