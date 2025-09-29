"use client";

import Image from "next/image";
import React from "react";

import { IoIosArrowDown } from "react-icons/io";
import { changeOrder, clearOrder } from "@/Redux/showOrder";
import { usePlaceOrder } from "@/features/order/usePlaceOrder";

export const Order = () => {
  const {
    loadAddress,
    onSubmit,
    setAddresses,
    addresses,
    dispacht,
    state,
    open,
    totalProducts,
    setOpen,
    ref,
    card,
  } = usePlaceOrder();

  return (
    <>
      {state.show === true && (
        <div className="flex relative flex-col md:flex-row gap-y-10 justify-between items-center max-w-[900px] pt-10 pb-20 px-4 mx-auto">
          <div className="relative md:w-[350px] md:h-[350px] w-full h-[300px]">
            <Image src={"/order.jpg"} alt="order" fill />
          </div>
          <div className="max-w-[400px] w-full divide-y-[1px] divide-gray-500 bg-gray-100 rounded-xl backdrop-blur-xl p-4">
            <h5 className="text-4xl font-world pb-5">
              Order <span className="text-orange-500">Summary</span>
            </h5>
            <div className="py-5 font-world space-y-3">
              <span className="text-xl"> Select Address</span>
              <div className="relative">
                <input
                  ref={ref}
                  readOnly
                  value={`${state.name}  /  ${state.district}  /  ${state.velayat}`}
                  onClick={() => {
                    setOpen((prev) => !prev);
                    loadAddress();
                  }}
                  type="text"
                  className="border-black cursor-pointer border-1px py-2 pl-2 pr-10 rounded-md w-full"
                />
                <IoIosArrowDown className="absolute z-10 right-2 top-1/2 -translate-y-1/2" />
                <ul
                  className={`${
                    open ? "block" : "hidden"
                  } absolute w-full custom-scroll z-10 mt-1 max-h-[400px] overflow-y-scroll rounded-md border-1px border-black top-full bg-white`}
                >
                  <div className="relative divide-black divide-y-1px">
                    {[...addresses].reverse().map((items, i) => {
                      return (
                        <li
                          key={i}
                          onClick={() => {
                            dispacht(changeOrder(items));
                            setOpen(false);
                          }}
                          className="p-3 text-center cursor-pointer space-x-2 hover:bg-slate-400 hover:text-white"
                        >
                          <span>{items.name}</span> /
                          <span>{items.district}</span> /
                          <span>{items.velayat}</span>
                        </li>
                      );
                    })}
                    <li
                      onClick={() => {
                        dispacht(clearOrder());
                        setOpen(false);
                        dispacht(changeOrder({ show: false }));
                      }}
                      className="text-center sticky cursor-pointer bg-black/50 text-white bottom-0 w-full h-[44px] flex justify-center items-center left-0"
                    >
                      Add +
                    </li>
                    {addresses.length !== 0 && (
                      <li
                        onClick={() => {
                          localStorage.removeItem("addresses");
                          setAddresses([]);
                          dispacht(clearOrder());
                        }}
                        className="text-center cursor-pointer bg-black/50 text-white w-full h-[44px] flex justify-center items-center left-0"
                      >
                        Clear All Addresses
                      </li>
                    )}
                  </div>
                </ul>
              </div>
            </div>

            {/* ///// --  ----- /// --  */}

            <div className="space-y-2 py-5">
              <div className="flex justify-between ">
                <span className="text-gray-500">
                  <span className="font-world ">ITEMS</span>
                  <span className="font-ptSerif font-bold ml-2">
                    {totalProducts}
                  </span>
                </span>
                <span className="font-bold">
                  {card.productsTotalPrice.toFixed(2)}$
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-world">Shipping</span>
                <span className="font-bold">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-world">Tax (2%)</span>
                <span className="font-bold">27 $</span>
              </div>
            </div>

            {/* ///// --  ----- /// --  */}
            <div className="py-5 space-y-2 flex items-center justify-between">
              <span className="text-xl font-world">Total Price</span>
              <span className="font-bold text-xl">
                {(card.productsTotalPrice + 27).toFixed(2)} $
              </span>
            </div>
            <div className="text-white py-5">
              <button
                onClick={() => {
                  onSubmit();
                }}
                className="py-2 bg-black/50 font-world rounded-md px-5"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
