import React from "react";
import Cards from "../../ui/Cards";
import clsx from "clsx";

import { useGetProductsFilteredQuery } from "@/Api/ecommerce";
import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import { useReccommendAnimation } from "./animation/useReccommendAnimation";
import { useShowMoreBreakPoints } from "./animation/useShowMoreBreakPoints";

export const Recommends = ({ show }: { show: boolean }) => {
  const datas = useSelector((state: RootState) => state.infoProductsBase.data);

  const { data } = useGetProductsFilteredQuery({ category: datas?.category });

  const { containerRef, showMore, toggleAccordion } = useReccommendAnimation(
    show
  );
  const { breakpoint } = useShowMoreBreakPoints(data?.products?.length ?? 0);

  //////// --------- --------- --------- ///////// --------- --------- --------- /////////
  
  if (!data) {
    return <div>Not Found Recommend Products</div>;
  }

  //////// --------- --------- --------- ///////// --------- --------- --------- /////////

  const showDiv = clsx(
    "relative grid sm:grid-cols-3 min-[900px]:grid-cols-4 xl:grid-cols-5 grid-cols-2 500:grid-cols-2 gap-5 h-[500px]",
    show ? "block" : "hidden overflow-hidden",
    !showMore && "overflow-hidden"
  );

  const showMoreBtn = clsx(
    "absolute w-full bottom-0 flex justify-center bg-showMoreGradient  py-5 z-10",
    !showMore ? "rounded-t-[50px] duration-300" : "rounded-b-[50px] translate-y-full duration-300",
    breakpoint ? "block" : "hidden"
  );

  //////// --------- --------- --------- ///////// --------- --------- --------- /////////

  return (
    <div ref={containerRef} className={showDiv}>
      {data?.products.map((items, i) => {
        if(datas?.id === items.id) return null
        return (
          <div key={i} className="recommendDivs">
            <Cards data={items} />
          </div>
        );
      })}
      <div className={showMoreBtn}>
        <button
          onClick={toggleAccordion}
          className="bg-gray-100 px-10 py-2 font-world  text-xl rounded-full"
        >
          Show More
        </button>
      </div>
    </div>
  );
};
