import { useWidth } from "@/hooks/useWidth";
import { useEffect, useState } from "react";


export const useSliderBreakPoints = () => {
  const [slidesPerView, setSlidesPerview] = useState(2);
  const [choosePerView, setChoosePerView] = useState(2);
  const width = useWidth();

  useEffect(() => {
    if (width >= 500) {
      setChoosePerView(3);
    }
    if (width >= 600) {
      setSlidesPerview(3);
    }
    if (width >= 768) {
      setSlidesPerview(3);
      setChoosePerView(3);
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
