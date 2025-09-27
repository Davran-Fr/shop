import React from "react";
import Cards from "../../ui/Cards";

import { getAllProductsTypes } from "@/Types/main";
import productsAnimations from "./animation/useCardAnimations";
import { Container } from "@/ui/Container";

interface Props {
  main?: getAllProductsTypes;
}

export const Products = ({ main }: Props) => {
  if (!main) return;

  const { mainDiv, filterBack, divAnimation } = productsAnimations(main);

  return (
    <Container className="pb-20">
      <div ref={mainDiv} className="w-full">
        {main?.products.length === 0 ? (
          <h3 className="w-full text-5xl font-semibold text-center py-10 font-world">
            Not Found
          </h3>
        ) : (
          <div className=" w-full grid grid-cols-2 500:grid-cols-2 relative sm:grid-cols-3 min-[900px]:grid-cols-4 xl:grid-cols-5 gap-2 gap-y-4 sm:gap-5 ">
            <div
              className={`w-full h-full absolute  ease-in-out ${
                filterBack.filter
                  ? "pointer-events-auto translate-y-0 visible "
                  : " pointer-events-none invisible -translate-y-full"
              } duration-500 transition-all top-0 left-0 bg-white/75 z-10`}
            ></div>
            {main?.products.map((items, i) => {
              return (
                <div
                  key={i}
                  ref={(e) => {
                    if (e) divAnimation.current[i] = e;
                  }}
                  className=" w-full h-full relative z-0"
                >
                  <Cards data={items} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
};
