import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

export const useProfileUpdate = () => {
  const user = useSelector((state: RootState) => state.userInfo.data);
  const [show, setShow] = useState(false);
  const [notificate, setNotificate] = useState(false);

  return {
    show,
    notificate,
    setShow,
    user,
    setNotificate,
  };
};
