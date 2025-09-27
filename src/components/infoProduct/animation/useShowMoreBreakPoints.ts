import { useWidth } from "@/hooks/useWidth";
import { useState, useEffect } from "react";

export const useShowMoreBreakPoints = (length: number) => {
  const [breakpoint, setBreakPoint] = useState(false);
  const width = useWidth();

  useEffect(() => {
    if (width < 640 && length >=  2 ) setBreakPoint(true);
    else if (width < 900 && length > 3 ) setBreakPoint(true);
    else if (width < 1280 && length > 4) setBreakPoint(true);
    else if (width > 1280 && length > 5) setBreakPoint(true);
    else setBreakPoint(false)
    
  }, [width , length]);

  return { breakpoint };
};
