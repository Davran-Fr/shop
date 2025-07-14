"use client";
import { useWidth } from "./useWidth";

type Breakpoints = {
  [key: number]: number; 
  default: number; 
};

export const useSliceText = (breakpoints: Breakpoints) => {
  const width = useWidth();

  const getLimit = () => {
    const keys = Object.keys(breakpoints)
      .filter((key) => key !== "default")
      .map((key) => Number(key))
      .sort((a, b) => a - b);

    for (let bp of keys) {
      if (width < bp) {
        return breakpoints[bp];
      }
    }

    return breakpoints.default;
  };

  const sliceText = (text: string) => {
    const limit = getLimit();
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return sliceText;
};