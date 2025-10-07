import { Container } from "@/ui/Container";
import { Indicator } from "./Indicator";
import { Reviews } from "./Reviews";
import { Recommends } from "./Recommends";
import { useState } from "react";

export const ReviewsRecommends = () => {
  const [show , setShow] = useState(false)
  
  return (
    <div className="pt-10 pb-28 font-medium space-y-10">
      <div className="w-full bg-gray-100">
        <Container>
          <Indicator onClick={(items) => setShow(items)} />
        </Container>
      </div>
      <Container>
        <Reviews show={show} />
        <Recommends show={show} />
      </Container>
    </div>
  );
};
