// // hooks/useAutoLoading.ts
// import { changeLoading } from "@/Redux/mainLoading";
// import { RootState } from "@/Redux/store";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export const useAutoLoading = (delay: number = 500) => {
//   const dispatch = useDispatch();
//   const loading = useSelector((state: RootState) => state.mainLoading);

//   useEffect(() => {
//     if (loading.loading) {
//       const timer = setTimeout(() => {
//         dispatch(changeLoading(false));
//       }, delay);

//       return () => clearTimeout(timer);
//     }
//   }, [loading.loading, dispatch, delay]);
// };
