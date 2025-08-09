"use client";

import { openQuikview } from "@/Redux/slices/quickView";
import { Product } from "@/Types/productsTypes";
import { IoCloseSharp } from "react-icons/io5";
import { animation } from "./animation";
import { QuickViewImages, QuickViewText } from "./Infos";
import { actionGetIdProducts } from "../../features/card/useCardActions";

export interface QuickViewProps {
  data?: Product | null;
  openClose?: string | null;
  loading?: boolean;
}

const QuickView = () => {
  const forQuickView = actionGetIdProducts();
  const { divref, dispacth } = animation({
    openClose: forQuickView.openClose,
    data: forQuickView.data,
  });

  return (
    <div
      className={`${
        forQuickView.openClose === "hidden"
          ? "hidden opacity-0 duration-500 transition-all"
          : "flex  duration-500 opacity-100"
      }  w-full  h-screen   overflow-hidden fixed   top-0 left-0   z-70 flex items-center transition-all  justify-center  `}
    >
      <div className=" overflow-scroll pt-20   px-5  h-full ">
        <div
          onClick={() => dispacth(openQuikview("close"))}
          className="absolute inset-0 bg-black/60 z-50"
        />
        <IoCloseSharp
          className="absolute  z-60 top-5 right-32  text-5xl cursor-pointer"
          onClick={() => dispacth(openQuikview("close"))}
        />
        <div
          ref={divref}
          className={`bg-mainColor  rounded-xl lg:divide-x-2 gap-3 lg:gap-0  lg:divide-gray-600   flex flex-col lg:flex-row w-full max-w-quickViewWidth2    lg:max-w-quickViewWidth   lg:overflow-hidden  relative z-80    p-5 `}
        >
          <QuickViewImages data={forQuickView.data} />
          <QuickViewText data={forQuickView.data} />
        </div>
      </div>
    </div>
  );
};

export default QuickView;
