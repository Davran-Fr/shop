import React from "react";

const QuikViewSpan = ({
  name,
  title,
  discountPercentage,
}: {
  discountPercentage?: number;
  name?: string | number;
  title?: string | number;
}) => {
  
  return (
    <span className="flex">
      <p>{name}</p>
      <span> {title}</span>
    </span>
  );
};

export default QuikViewSpan;
