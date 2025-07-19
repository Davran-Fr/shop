import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(SplitText);

const videos = [
  { name: "DvG", src: "/video/SkeatBoard.mp4" },
  { name: "Wonderful Furnitures", src: "/video/House.mp4" },
  { name: "Shoes", src: "/video/reklamSneakers.mp4" },
  { name: "Clothes", src: "/video/clothes1.mp4" },
];

export const useVideoAnimations = () => {
  const divRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const allReady =
      divRef.current.length === videos.length &&
      divRef.current.every((el) => el !== null);

    if (allReady) setIsReady(true);
  }, []);

  useLayoutEffect(() => {
    if (!isReady) return;

    const tl = gsap.timeline({ repeat: -1 });

    videos.forEach((_, i) => {
      const current = divRef.current[i];
      const currentText = textRef.current[i];
      if (!current || !currentText) return;

      const split = new SplitText(currentText, { type: "chars" });

      tl.set(current, { zIndex: 1 }) 
        .fromTo(
          current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.7, ease: "power2.out" }
        )
        .from(
          split.chars,
          {
            autoAlpha: 0,
            y: 20,
            stagger: { each: 0.02 },
            duration: 0.4,
          },
          "<"
        )

        .to({}, { duration: 2 }) 

        .to(
          current,
          {
            autoAlpha: 1,
            duration: 0.7,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(current, { zIndex: 0 });
            },
          },
          "+=0"
        );
    });

    return () => {
      tl.kill();
    };
  }, [isReady]);

  return {
    videos,
    divRef,
    textRef,
  };
};
