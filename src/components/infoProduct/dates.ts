import { useGetSingleProductQuery } from "@/Api/ecommerce";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { addCountCards, remaindingState } from "@/Redux/slices/cards";
import { addInfoProducts } from "@/Redux/slices/infoDataBase";
export const dates = () => {
  const { id, category } = useParams();
  const { data, isSuccess, error , isLoading} = useGetSingleProductQuery(Number(id));
  const dispatch = useDispatch();
  const pathname = usePathname();
  const infoBase = useSelector(
    (state: RootState) => state.infoProductsBase.data
  );

  useEffect(() => {
    dispatch(addCountCards({ count: 0 }));
    dispatch(remaindingState(0));
    dispatch(addInfoProducts({ data: null }));
  }, [pathname]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addInfoProducts({ data: data }));
    }
  }, [isSuccess, data]);
  return {
    infoBase,
    isLoading,
    error,
  };
};
