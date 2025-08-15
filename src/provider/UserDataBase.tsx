import { getAccess_token } from "@/lib/useLocaleStorage";
import { usePathname, useRouter } from "next/navigation";
import { useLazyGetProfileQuery } from "@/Api/auth";
import { getTokenCookies } from "@/lib/useCookies";
import { useEffect } from "react";
import { setUsersDataBase } from "../Redux/userDataBase";
import { useDispatch } from "react-redux";

export function UserDataBase({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const token = getAccess_token();
  const refreshToken = getTokenCookies();
  const pathname = usePathname();

  const [triggerProfile, { data }] = useLazyGetProfileQuery();

  useEffect(() => {
    if (token && !pathname.startsWith("/auth")) {
      triggerProfile();
    }
  }, [token]);

  useEffect(() => {
    if (data) {
      dispatch(setUsersDataBase(data));
    }
  }, [data, dispatch]);

  return <>{children}</>;
}
