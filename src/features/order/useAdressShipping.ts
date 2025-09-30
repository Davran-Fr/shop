import Cookies from "js-cookie";

import { useState } from "react";
import { RootState } from "@/Redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeOrder } from "@/Redux/showOrder";
import { shipping, ShippingType } from "@/validation/shipping";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export const useAdressShipping = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.showOrder);
  const [spinner, setSpinner] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ShippingType>({
    resolver: zodResolver(shipping),
  });

  const onSubmit: SubmitHandler<ShippingType> = async (data) => {
    try {
      const load = Cookies.get("addresses");
      const oldAddresses: ShippingType[] = load ? JSON.parse(load) : [];

      const updatedAddresses = [...oldAddresses, data];

      Cookies.set("addresses", JSON.stringify(updatedAddresses), {
        expires: 7,
        sameSite: "Strict",
      });

      setSpinner(true);

      setTimeout(() => {
        dispatch(changeOrder(data));
        dispatch(changeOrder({ show: true }));
        setSpinner(false);
        reset();
      }, 1000);
    } catch (err) {
      console.error("Failed to save addresses in cookies:", err);
    }
  };

  return {
    spinner,
    state,
    setSpinner,
    register,
    onSubmit,
    dispatch,
    handleSubmit,
    reset,
    errors,
    isSubmitting,
  };
};
