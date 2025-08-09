import { getAccess_token } from "@/features/lib/useLocaleStorage";
import { usePathname, useRouter } from "next/navigation";
import { useLazyGetProfileQuery } from "@/Api/auth";
import { getTokenCookies } from "@/features/lib/useCookies";
import { useEffect } from "react";
import { setUsersDataBase } from "../Redux/slices/userDataBase";
import { useDispatch } from "react-redux";

export function UserDataBase({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const token = getAccess_token();
  const refreshToken = getTokenCookies();
  const pathname = usePathname();
  const router = useRouter();
  const showRefresh =
    !refreshToken && !pathname.startsWith("/auth") ? true : false;

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

  return (
    <>
      <div
        className={`${
          showRefresh
            ? "visible pointer-events-auto"
            : "invisible pointer-events-none "
        } fixed z-50 flex justify-center items-center w-full h-full top-0 left-0 bg-black/50`}
      >
        <div
          className={`bg-white p-10 rounded-md ${
            showRefresh
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }  delay-150 duration-200 flex flex-col gap-20`}
        >
          <h3>Please try again something went wrong</h3>
          <button onClick={() => router.refresh()}>Refresh</button>
        </div>
      </div>
      {children}
    </>
  );
}
