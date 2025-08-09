import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(SplitText);

const videos = [
  {
    name: " Upgrade Your Style.",
    title: "Find the look that defines you.",
    img: "/productsBanner/clothesImg.jpg",
  },
  {
    name: " Next-Gen Tech, Today.",
    title: "Laptops built for your lifestyle.",
    img: "/productsBanner/laptop.jpg",
  },
  {
    name: " Comfort Meets Design.",
    title: "Redefine your space with elegance.",
    img: "/productsBanner/furnitureP.jpg",
  },
  {
    name: " Step Into Comfort.",
    title: "Shoes that move with you.",
    img: "/productsBanner/shoesmain.jpg",
  },
  {
    name: " Skin First. Beauty Always.",
    title: "Shop our most-loved essentials.",
    img: "/productsBanner/cosmeticss.jpg",
  },
];

export const useVideoAnimations = () => {
  const divRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement[]>([]);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const allReady =
      divRef.current.length === videos.length &&
      divRef.current.every((el) => el !== null);

    if (allReady) {
      setIsReady(true);
    }
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
            stagger: { each: 0.02 , from : 'random' },
            duration: 0.7,
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
