import { useEffect, useState } from "react";
import {
  clearTokenCookies,
  getTokenCookies,
  setTokenCookies,
} from "../lib/useCookies";
import { useDispatch } from "react-redux";
import { useRefreshTokenMutation } from "@/Api/auth";
import { useRouter } from "next/navigation";
import { setAccess_token } from "../lib/useLocaleStorage";

export const useAuth = () => {

  // const dispatch = useDispatch();
  // const [getRefreshToken ,{isLoading , error}] = useRefreshTokenMutation();
  // const [loading, setLoading] = useState(true);
  
  // const router = useRouter()
  // useEffect(() => {
  //   const refreshToken = async () => {
     
  //     const currentToken = getTokenCookies();
  //     if (!currentToken) {
  //       router.replace('/auth')
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const newToken = await getRefreshToken({ refreshToken: currentToken });
  //       if (newToken.data?.refresh_token && newToken.data.access_token) {
  //         setTokenCookies(newToken.data?.refresh_token);
  //         setAccess_token(newToken.data.access_token)
  //       }
  //     } catch (err) {
  //       clearTokenCookies();
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   refreshToken();
  // }, [dispatch, getRefreshToken]);
  
  // return { loading  , isLoading , error};
};
