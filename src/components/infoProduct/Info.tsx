import React from "react";
import Images from "./Images";
import Texts from "./Texts";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { Container } from "@/ui/Container";

const Info = () => {
  const data = useSelector((state: RootState) => state.infoProductsBase.data);
  const cards = useSelector((state: RootState) => state.cardItems);

  if (!data)
    return <div className="w-full py-32 text-center">Product Not Found</div>;

  return (
    <Container className="flex flex-col md:flex-row w-full gap-10 md:gap-5 justify-center py-20 sm:py-10">
      <Images data={data?.images} />
      <Texts data={data} cards={cards} />
    </Container>
  );
};

export default Info;
