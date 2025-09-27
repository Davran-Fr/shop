import { useState } from "react";
import { RootState } from "@/Redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeOrder, clearOrder } from "@/Redux/showOrder";
import { shipping, ShippingType } from "@/validation/shipping";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export const useAdressShipping = () => {
  const dispacth = useDispatch();
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
      const load = localStorage.getItem("addresses");
      const oldAddresses: ShippingType[] = load ? JSON.parse(load) : [];

      const updatedAddresses = [...oldAddresses, data];

      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

      setSpinner(true);

      setTimeout(() => {
        dispacth(changeOrder(data))
        dispacth(changeOrder({ show: true }));
        setSpinner(false);

      }, 1000);
    } catch (err) {
      console.error("Failed to save addresses:", err);
    }
  };

  return {
    spinner,
    state,
    setSpinner,
    register,
    onSubmit,
    dispacth,
    handleSubmit,
    reset,
    errors,
    isSubmitting,
  };
};
