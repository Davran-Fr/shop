import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { ReviewsCards } from "@/ui/ReviewsCards";
import { useReviewAnimation } from "./animation/useReviewAnimation";

export const Reviews = ({ show }: { show: boolean }) => {
  const data = useSelector((state: RootState) => state.infoProductsBase.data);
  const { containerRef } = useReviewAnimation(show);

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 sm:grid-cols-2 font-medium lg:grid-cols-3 text-black gap-5 ${
        !show ? "block" : "hidden"
      }`}
    >
      {data?.reviews.map((items, i) => {
        const { date, reviewerName, rating, comment } = items;

        return (
          <ReviewsCards
            key={i}
            date={date}
            reviewerName={reviewerName}
            rating={rating}
            comment={comment}
          />
        );
      })}
    </div>
  );
};
