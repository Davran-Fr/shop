"use client";

import Image from "next/image";
import React, { useEffect } from "react";

import { useAdressShipping } from "@/features/order/useAdressShipping";
import { ShippingInput } from "@/ui/ShippingInput";
import { TURKMEN_DISTRICTS, TURKMEN_VELAYATS } from "@/validation/shipping";
import { Buttons } from "./Buttons";

export const Address = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    state,
    spinner,
    errors,
    dispatch,
    reset,
    setValue,
  } = useAdressShipping();

  useEffect(() => {
    reset();
  }, [state.show]);

  return (
    <>
      {state.show === false && (
        <div className="pt-10 pb-20 font-medium mx-auto max-w-[900px] gap-x-10 gap-y-10 px-4 flex justify-between flex-col-reverse items-center md:flex-row w-full relative">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <h3 className="font-world text-4xl mb-5">
              Add Shipping <span className="text-orange-500">Address</span>
            </h3>
            <ShippingInput
              setValue={setValue}
              value={state.name}
              dis={"name"}
              actions={register("name")}
              error={errors.name}
              type="text"
              placeholder="Name"
            />
            <ShippingInput
              value={state.phone}
              setValue={setValue}
              dis={"phone"}
              actions={register("phone")}
              error={errors.phone}
              type="tel"
              placeholder="Phone number (+993 65 581689)"
            />
            <ShippingInput
              value={state.area}
              setValue={setValue}
              dis={"area"}
              actions={register("area")}
              className="max-h-[300px] h-[100px]"
              error={errors.area}
              type="area"
              placeholder="Area (area and street)"
            />
            <ShippingInput
              setValue={setValue}
              value={state.district}
              dis={"district"}
              actions={register("district")}
              data={TURKMEN_DISTRICTS as any}
              error={errors.district}
              type="text"
              placeholder="District/City/Town"
            />
            <ShippingInput
              value={state.velayat}
              setValue={setValue}
              dis={"velayat"}
              actions={register("velayat")}
              data={TURKMEN_VELAYATS as any}
              error={errors.velayat}
              type="text"
              placeholder="Velayat"
            />
            <Buttons spinner={spinner} />
          </form>
          <div className="relative md:w-[425px] md:h-[325px] w-full h-[225px]">
            <Image fill alt="map" src={"/map.jpg"} className="rounded-xl" />
          </div>
        </div>
      )}
    </>
  );
};
