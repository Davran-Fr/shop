"use client";

import { clearTokenCookies } from "@/lib/useCookies";
import { clearAccess_token } from "@/lib/useLocaleStorage";
import { changeNotification, clearItem } from "@/Redux/cards";
import { logOutNotificate } from "@/Redux/logOut";
import { RootState } from "@/Redux/store";
import { clearUserDataBase } from "@/Redux/userDataBase";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export const LogOutNotificate = () => {
  const show = useSelector((state: RootState) => state.logOut.show);
  const dispatch = useDispatch();
  const router = useRouter();

  const logOut = () => {
    clearAccess_token();
    clearTokenCookies();
    dispatch(logOutNotificate(false));
    dispatch(changeNotification("stopAdding"));
    dispatch(clearItem());
    setTimeout(() => {
      router.push("/auth");
      dispatch(clearUserDataBase());
    }, 500);
  };
  return (
    <div
      className={`fixed flex ${
        show ? " visible pointer-events-auto" : "invisible pointer-events-none"
      } duration-100 items-center px-4 font-medium justify-center top-0 left-0 w-full h-full bg-black/60 z-50`}
    >
      <div
        className={`rounded-md bg-white ${
          show ? " translate-y-0 opacity-100" : "opacity-0 translate-y-10"
        } delay-100 w-[500px] h-200px duration-200 items-center p-5 flex flex-col justify-between gap-10 font-world text-lg`}
      >
        <span className="text-xl text-center">Are you sure?</span>
        <div className="text-white flex gap-x-5 w-full">
          <button
            onClick={() => dispatch(logOutNotificate(false))}
            className="border-1px hover:shadow-sm duration-300 hover:scale-[1.03] hover:shadow-black border-black bg-black/50 rounded-md w-full"
          >
            Close
          </button>
          <button
            onClick={() => {
              if (show) {
                logOut();
              }
            }}
            className="border-1px hover:shadow-sm duration-300 hover:scale-[1.03] hover:shadow-black border-black bg-black/50 rounded-md w-full"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
