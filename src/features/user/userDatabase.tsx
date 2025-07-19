// hooks/useUserData.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getId_User } from "../lib/localeStorage";
import { useGetProfileQuery, useUserInfoQuery } from "@/Api/auth";
import { setUsersDataBase } from "@/Redux/slices/userDataBase";

export function useUserData() {
  const { data, error, isLoading } = useGetProfileQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUsersDataBase(data));
    }
  }, [data, dispatch]);

  return { data, error, isLoading };
}
