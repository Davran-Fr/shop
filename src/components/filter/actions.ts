import { changeFilter } from "@/Redux/slices/filterBase";
import { AppDispatch } from "@/Redux/store";
import { useState } from "react";


export const useCategory = (dispatch: AppDispatch) => {
  const [open, setOpen] = useState(false);

  const onChangeCategory = (items: string) => {
    dispatch(changeFilter({ category: items }));
    setOpen(false);
  };
  const toggleOpen = () => {
    setOpen(!open);
  };
  const clearCategory = () => {
    dispatch(changeFilter({ category: "" }));
  };
  return {
    open,
    toggleOpen,
    clearCategory,
    setOpen,
    onChangeCategory,
  };
};
export const useOrder = (dispatch: AppDispatch) => {
  const [openOrder, setOpenOrder] = useState(false);

  const lowToHigh = () => {
    dispatch(changeFilter({ order: "asc" }));
    dispatch(changeFilter({ sortBy: "price" }));
    setOpenOrder(false);
  };

  const highToLow = () => {
    dispatch(changeFilter({ order: "desc" }));
    dispatch(changeFilter({ sortBy: "price" }));
    setOpenOrder(false);
  };
  const toggleOpenOrder = () => {
    setOpenOrder(!openOrder);
  };

  const onClearOrder = () => {
    dispatch(changeFilter({ order: "" }));
    dispatch(changeFilter({ sortBy: "" }));
  };
  return {
    toggleOpenOrder,
    onClearOrder,
    highToLow,
    lowToHigh,
    setOpenOrder,
    openOrder,
  };
};
export const useSearch = (dispatch: AppDispatch) => {
  const clearSearch = () => {
    dispatch(changeFilter({ search: "" }));
  };
  const onChangeSearch = (e : string) => {
    dispatch(changeFilter({ search: e }));
  };
  return {
    clearSearch,
    onChangeSearch
  }
};
export const usePrices = (dispatch: AppDispatch) => {
  const clearMinPrice = () => {
    dispatch(changeFilter({ minPrice: 0 }));
  };
  const clearMaxPrice = () => {
    dispatch(changeFilter({ maxPrice: 0 }));
  };
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    dispatch(changeFilter({ minPrice: val }));
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    dispatch(changeFilter({ maxPrice: val }));
  };

  return {
    handleMaxChange,
    handleMinChange,
    clearMinPrice,
    clearMaxPrice,
  };
};
