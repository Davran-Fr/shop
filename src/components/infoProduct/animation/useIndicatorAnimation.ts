import gsap from "gsap";
import { useRef, useEffect, useState } from "react";

export const useIndicatorAnimation = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triangleRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  //////// --------- --------- --------- ///////// --------- --------- --------- /////////
  const tlRef = useRef<GSAPTimeline | null>(null);
  //////// --------- --------- --------- ///////// --------- --------- --------- /////////
  useEffect(() => {
    if (!tlRef.current) {
      tlRef.current = gsap.timeline({
        defaults: { duration: 0.6, ease: "", stagger: 0.1 },
      });
    }

    const activeTab = tabRefs.current[active];
    if (activeTab && indicatorRef.current && triangleRef.current) {
      const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = activeTab;

      gsap.to(indicatorRef.current, { x: offsetLeft, width: offsetWidth });

      gsap.to(triangleRef.current, {
        x: offsetLeft + offsetWidth / 2 - 15,
        y: offsetTop + offsetHeight + 3,
      });
    }
  }, [active]);
  //////// --------- --------- --------- ///////// --------- --------- --------- /////////
  return {
    active,
    tabRefs,
    indicatorRef,
    triangleRef,
    setActive,
  };
};
