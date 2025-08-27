import React from "react";
import { Rating, Star } from "@smastrom/react-rating";
import { Review } from "@/Types/products";

type Props = Omit<Review, "reviewerEmail">;

export const ReviewsCards = ({
  date,
  reviewerName,
  rating,
  comment,
}: Props) => {
    
  return (
    <div  className="commentsDiv bg-orderBtn last:col-span-full lg:last:col-span-1 flex flex-col items-center mx-auto lg:mx-0 max-w-[500px] lg:max-w-none lg:items-start w-full p-5 rounded-xl">
      <div className="space-y-3 flex flex-col items-center lg:items-start">
        <h5 className="text-xl font-world">{reviewerName}</h5>
        <p className="font-workSans text-base font-medium">"{comment}"</p>
        <Rating
          itemStyles={{
            itemShapes: Star,
            activeFillColor: "#facc15",
            inactiveFillColor: "gray",
          }}
          style={{ maxWidth: 80 }}
          value={parseFloat(rating.toFixed(1))}
          readOnly
        />
      </div>
      <p className="font-workSans font-normal mt-10">{date}</p>
    </div>
  );
};
