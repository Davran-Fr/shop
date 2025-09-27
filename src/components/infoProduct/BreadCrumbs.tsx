"use client";

import React from "react";

import { capitalize } from "@/hooks/useFirstLetterCapital";
import { changeFilter } from "@/Redux/filterBase";
import { RootState } from "@/Redux/store";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@/ui/Container";

interface Props {
  name?: string;
}

export const BreadCrumbs = ({ name }: Props) => {
  const data = useSelector((state: RootState) => state.infoProductsBase.data);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const { category } = useParams();

  return (
    <div className="w-full bg-gray hidden sm:flex items-center mt-20 py-3">
      <Container className="flex text-xl items-center w-full text-black font-world gap-3">
        <FaAngleLeft
          className="text-xl mr-5 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <span onClick={() => router.push("/")} className="cursor-pointer">
          Home
        </span>{" "}
        /
        {name === "produts" ? (
          <>
            <span
              onClick={() => {
                router.push("/products");
                dispatch(changeFilter({ category: String(category) }));
              }}
              className="cursor-pointer"
            >
              {capitalize(String(category))}
            </span>
            /<span className="opacity-80">{data?.title}</span>
          </>
        ) : (
          <span className="cursor-pointer opacity-50">
            {capitalize(pathName.slice(1, pathName.length))}
          </span>
        )}
      </Container>
    </div>
  );
};
