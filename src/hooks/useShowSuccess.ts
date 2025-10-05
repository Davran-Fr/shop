import { useDispatch } from "react-redux";
import { loadingAuth } from "@/Redux/globalLoading";

export const useShowSuccess = () => {
  const dispatch = useDispatch();

  const show = () => {
    dispatch(loadingAuth(false));  
    setTimeout(() => {
      dispatch(loadingAuth(true));
    }, 2000);
  };

  return show;
};
