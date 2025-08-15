import { RootState } from "@/Redux/store";
import { getAllProductsTypes } from "@/Types/main";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

gsap.registerPlugin(ScrollToPlugin);

const productsAnimations = (main: getAllProductsTypes) => {
  const filterBack = useSelector((state: RootState) => state.toggleFilter);
  const filterBase = useSelector((state: RootState) => state.filter);
  const divAnimation = useRef<HTMLDivElement[]>([]);
  const mainDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (main?.products?.length) {
      gsap.fromTo(
        divAnimation.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [main?.products]);
  useEffect(() => {
    const move = setTimeout(() => {
      if (mainDiv.current) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: mainDiv.current,
            offsetY: 150,
          },
          ease: "power2.out",
        });
      }
    }, 1500);

    return () => {
      clearTimeout(move);
    };
  }, [
    filterBase.page,
    filterBase.category,
    filterBase.search,
    filterBase.minPrice,
    filterBase.maxPrice,
    filterBase.order,
  ]);

  return {
    mainDiv,
    filterBack,
    divAnimation,
  };
};

export default productsAnimations;
