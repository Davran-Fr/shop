import Cookies from 'js-cookie'

import { clearAccess_token, getAccess_token } from "@/lib/useLocaleStorage";
import { usePathname } from "next/navigation";
import { useLazyGetProfileQuery } from "@/Api/auth";
import { useEffect } from "react";
import { setUsersDataBase } from "../Redux/userDataBase";
import { useDispatch } from "react-redux";
import { getTokenCookies } from "@/lib/useCookies";

export function UserDataBase({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const token = getAccess_token();
  const refreshToken = getTokenCookies();
  const pathname = usePathname();

  const [triggerProfile, { data }] = useLazyGetProfileQuery();

  useEffect(() => {
    if (token && refreshToken && !pathname.startsWith("/auth")) {
      triggerProfile();
    } else if (!refreshToken && pathname.startsWith("/auth")) {
      localStorage.removeItem("addresses");
      Cookies.remove("cart");
      clearAccess_token();
    }
  }, [token, refreshToken]);

  useEffect(() => {
    if (data) {
      dispatch(setUsersDataBase(data));
    }
  }, [data, dispatch]);

  return <>{children}</>;
}
