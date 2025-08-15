import {   changeNotification, PropsSlice } from "@/Redux/cards";
import { RootState } from "@/Redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const NotificateInfo = () => {
  const cards = useSelector((state: RootState) => state.cardItems);
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed flex ${
        cards.notification === "notificate"
          ? " visible pointer-events-auto "
          : "invisible pointer-events-none "
      } duration-100 items-center px-4 justify-center top-0 left-0 w-full h-full bg-black/60 z-50`}
    >
      <div
        className={`p-10 rounded-md ${
          cards.notification === "notificate"
            ? " translate-y-0 opacity-100"
            : "opacity-0 translate-y-10"
        } delay-200 w-[500px] h-200px   duration-300 items-center bg-white p-5 flex flex-col justify-between gap-10 font-world text-lg`}
      >
        <span className="text-xl text-center">{cards.notificateText}</span>
        <button
          onClick={() => dispatch(changeNotification("stopAdding"))}
          className="border-1px border-black bg-orderBtn rounded-md w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificateInfo;
