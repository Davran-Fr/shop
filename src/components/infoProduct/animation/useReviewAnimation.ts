import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useReviewAnimation = (show: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);
  //////// --------- --------- --------- ///////// --------- --------- --------- /////////

  useEffect(() => {
    if (show || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLDivElement>(".commentsDiv");
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.3, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [show]);
  
  //////// --------- --------- --------- ///////// --------- --------- --------- /////////

  return {
    containerRef,
  };
};
