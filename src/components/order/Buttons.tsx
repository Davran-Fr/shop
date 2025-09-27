import { changeOrder} from "@/Redux/showOrder";
import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";

export const Buttons = ({ spinner }: { spinner: boolean }) => {
  const dispacth = useDispatch();

  return (
    <div className="space-y-5 text-white">
      {" "}
      <button
        type="submit"
        className="flex w-full justify-center items-center h-10 bg-black/50 font-world max-w-[250px] py-2 rounded-md"
      >
        {spinner ? (
          <>
            <FaSpinner className="animate-spin text-xl text-white" />
          </>
        ) : (
          "Save Address"
        )}
      </button>
      <button
        onClick={() => {
          dispacth(changeOrder({ show: true }));
        }}
        type="button"
        className="flex justify-center w-full max-w-[250px] items-center h-10 bg-black/50 font-world py-2 rounded-md"
      >
        Already have address
      </button>
    </div>
  );
};
