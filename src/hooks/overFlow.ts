import { useEffect } from "react";

export const useOverFlow = (lock: boolean) => {
  useEffect(() => {
    const html = document.body;
    if (lock) {
      html.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
    }
    return () => {
      html.style.overflow = "";
    };
  }, [lock]);
};
