// hooks/useUserData.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getId_User } from "../lib/localeStorage";
import { useUserInfoQuery } from "@/Api/auth";
import { setUsersDataBase } from "@/Redux/slices/userDataBase";

export function useUserData() {
  const id = getId_User();
  const parsedId = id || null;

  const { data, error, isLoading } = useUserInfoQuery(parsedId, {
    skip: !parsedId,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUsersDataBase(data));
    }
  }, [data, dispatch]);

  return { data, error, isLoading };
}
