import { useWidth } from "@/hooks/useWidth";
import { useEffect, useState } from "react";

export const sliceBreakPoints = {
  100: 100,
  default: 17,
};

export const descriptionsSlice = {
  360 : 25,
  500: 40,
  650: 25,
  768: 20,
  default: 20,
};

export const sliderBreakPoints = () => {
  const [slidesPerView, setSlidesPerview] = useState(2);
  const [choosePerView, setChoosePerView] = useState(2);
  const width = useWidth();
  useEffect(() => {
    if (width <= 640) {
      setSlidesPerview(2);
    }
    if (width <= 768) {
      setChoosePerView(3)
    }
    if (width >= 768) {
      setSlidesPerview(3);
    }
    if (width >= 1024) {
      setSlidesPerview(4);
      setChoosePerView(4);
    }
    if (width >= 1280) {
      setChoosePerView(5);
    }
    if (width >= 1536) {
      setSlidesPerview(5);
    }
  }, [width]);
  return {
    choosePerView,
    slidesPerView,
  };
};
