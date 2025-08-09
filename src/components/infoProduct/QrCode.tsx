import { useOverFlow } from "@/hooks/overFlow";
import { loadingAuth } from "@/Redux/slices/globalLoading";
import { RootState } from "@/Redux/store";
import { Product } from "@/Types/productsTypes";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
const QrCode = () => {
  const dispatch = useDispatch();
  const show = useSelector((state: RootState) => state.loadingAuth.loading);
  const qrCode = useSelector(
    (state: RootState) => state.infoProductsBase.data?.meta.qrCode
  );
  useOverFlow(!qrCode);
  return (
    <div
      onClick={() => dispatch(loadingAuth(true))}
      className={`fixed bg-black/50 px-4 flex items-center justify-center top-0 left-0 w-full h-full ${
        !show ? "pointer-events-auto visible" : "invisible pointer-events-none "
      } z-50`}
    >
      <Image
        src={qrCode as string}
        alt="quearCode "
        className={`w-[300px] ${
          !show ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } duration-300 delay-75 relative z-50 `}
        width={800}
        height={800}
      />
    </div>
  );
};

export default QrCode;
