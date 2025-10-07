"use client";

import React from "react";

import { capitalize } from "@/hooks/useFirstLetterCapital";
import { changeFilter } from "@/Redux/filterBase";
import { RootState } from "@/Redux/store";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@/ui/Container";
import { GoMultiSelect } from "react-icons/go";
import { showSelection, showToggle } from "@/Redux/removeSelect";

interface Props {
  name?: string;
  className?: string;
}

export const BreadCrumbs = ({ name, className }: Props) => {
  const data = useSelector((state: RootState) => state.infoProductsBase.data);
  const selection = useSelector((state: RootState) => state.removeSelect);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const { category } = useParams();
  const splitedPathname = pathName.split("/");
  const lastIndex = splitedPathname.length - 1;

  return (
    <div
      className={`w-full items-center ${
        name === "cards" ? "flex" : "hidden sm:flex"
      } ${name === "settings" ? "m-0" : "mt-20"} ${className}`}
    >
      <Container className="flex w-full">
        <div
          className={`text-xl hidden sm:flex items-center w-full text-black font-world gap-3`}
        >
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
            <>
              {splitedPathname.map((items, i) => {
                if (items === "") return null;
                return (
                  <div key={i} className="flex gap-x-3">
                    <span
                      className={`cursor-pointer ${
                        i === lastIndex && "opacity-50"
                      }`}
                    >
                      {capitalize(items)}
                    </span>
                    <span className={`${lastIndex === i ? "hidden" : "block"}`}>
                      /
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </div>
        {name === "cards" && (
          <div
            onClick={() => dispatch(showToggle())}
            className="flex items-center pt-5 justify-self-end text-xl gap-x-5 font-world cursor-pointer"
          >
            <span>Select</span>
            <GoMultiSelect className="w-6 h-6 xl:mr-10" />
          </div>
        )}
      </Container>
    </div>
  );
};
