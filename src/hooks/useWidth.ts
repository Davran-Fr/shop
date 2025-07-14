import { useEffect, useState } from "react";

export const useWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const setWidths = () => {
      setWidth(window.innerWidth);
    };
    setWidths()
    console.log(width);
    
    window.addEventListener("resize", setWidths);
    return () => {
      window.removeEventListener("resize", setWidths);
    };
  }, []);
  return width
};
