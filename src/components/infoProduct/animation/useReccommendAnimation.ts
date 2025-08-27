import { useWidth } from "@/hooks/useWidth";
import gsap from "gsap";

import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollToPlugin);

export const useReccommendAnimation = (show: boolean) => {
  const [showMore, setShowMore] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const widht = useWidth()
  
  //////// --------- --------- --------- ///////// --------- --------- --------- /////////

  useEffect(() => {
    if (!show || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLDivElement>(".recommendDivs");
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.3, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [show]);

  //////// --------- --------- --------- ///////// --------- --------- --------- /////////

  const toggleAccordion = () => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    if (showMore) {
      gsap.to(el, {
        height: "500px",
        duration: 1,
        ease: "power2.inOut",
        overflow: "hidden",
      });
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: containerRef.current,
          offsetY: 150,
        },
      });
    } 
    else {
      gsap.fromTo(
        el,
        { height: "500px", overflow: "hidden" },
        {
          height: el.scrollHeight,
          duration: 1,
          ease: "power2.inOut",
        }
      );
    }

    setShowMore(!showMore);
  };

  //////// --------- --------- --------- ///////// --------- --------- --------- /////////
  return {
    showMore,
    toggleAccordion,
    widht,
    containerRef,
  };
};
