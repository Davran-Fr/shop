import React from "react";

import { capitalize } from "@/hooks/useFirstLetterCapital";
import { changeFilter } from "@/Redux/filterBase";
import { RootState } from "@/Redux/store";
import { useParams, useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@/ui/Container";

export const BreadCrumbs = () => {
  const data = useSelector((state: RootState) => state.infoProductsBase.data);
  const dispatch = useDispatch();
  const router = useRouter();
  const { category } = useParams();

  return (
    <div className="w-full bg-orderBtn hidden sm:flex items-center py-3">
      <Container className="flex text-base items-center w-full text-black font-world gap-3">
        <FaAngleLeft
          className="text-xl mr-5 cursor-pointer"
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
        /<span className="opacity-80">{data?.title}</span>
      </Container>
    </div>
  );
};
