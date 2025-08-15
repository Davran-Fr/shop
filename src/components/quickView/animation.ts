import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { QuickViewProps } from "./QuickView";
import { useDispatch } from "react-redux";
import { openQuikview } from "@/Redux/quickView";
import { useWidth } from "@/hooks/useWidth";

export const animation = ({ openClose, data }: QuickViewProps) => {
  const [image, setImage] = useState<number>(0);
  const images = data?.images || [];
  const divref = useRef<HTMLDivElement>(null);
  const dispacth = useDispatch();
  const width = useWidth();

  useEffect(() => {
    const tl = gsap.timeline();
    if (divref.current) {
      if (openClose === "open") {
        gsap.set(divref.current, {
          scaleY: 0,
          overflow: "scroll",
          opacity: 0,
        });

        tl.to(divref.current, {
          scaleY: 1,
          height: "100%",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      } else if (openClose === "close") {
        tl.to(divref.current, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            dispacth(openQuikview("hidden"));
          },
        });
      }
    }

    return () => {
      tl.kill();
    };
  }, [openClose]);

  return {
    divref,
    dispacth,
    data,
    images,
    image,
    setImage,
  };
};

export const checkPricePercentage = ({ data }: QuickViewProps) => {
  const discountPrice =
    data?.price && data?.discountPercentage
      ? data.price * (1 - data.discountPercentage / 100)
      : null;

  return {
    discountPrice,
  };
};
