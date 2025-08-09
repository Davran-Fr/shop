import { capitalize } from "@/hooks/useFirstLetterCapital";
import { changeFilter } from "@/Redux/slices/filterBase";
import { RootState } from "@/Redux/store";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";


export const LinksInfo = () => {
  const data = useSelector((state: RootState) => state.infoProductsBase.data);
  const dispatch = useDispatch();
  const router = useRouter();
  const {  category } = useParams();

  return (
    <div className="w-full bg-orderBtn  hidden sm:flex items-center py-3">
      <div className="text-sm container w-full text-black  px-4 mx-auto flex items-center font-world gap-3 ">
        <FaAngleLeft
          className="text-xl mr-5 cursor-pointer "
          onClick={() => router.back()}
        />
        <span onClick={() => router.push("/")} className="cursor-pointer">
          Home
        </span>{" "}
        /
        <span
          onClick={() => {
            dispatch(changeFilter({ category: String(category) }));
            router.back();
          }}
          className="cursor-pointer"
        >
          {capitalize(String(category))}
        </span>{" "}
        /<span className="opacity-80 ">{data?.title}</span>
      </div>
    </div>
  );
};
