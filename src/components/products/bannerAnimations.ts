import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const arrayBannerImage = [
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

gsap.registerPlugin(SplitText);

const bannerAnimations = () => {
  const divRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const allReady =
      divRef.current.length === arrayBannerImage.length &&
      divRef.current.every((el) => el !== null);

    if (allReady) {
      setIsReady(true);
    }
  }, [arrayBannerImage]);

  useLayoutEffect(() => {
    if (!isReady) return;

    const tl = gsap.timeline({ repeat: -1 });

    divRef.current.forEach((_, i) => {
      const imageDiv = divRef.current[i];
      const textDiv = textRef.current[i];
      let texts = SplitText.create(textDiv, { type: "chars" });

      tl.from(imageDiv, {
        x: `${i % 2 === 0 ? "-" : ""}${i}00px`,
        opacity: i === 0 ? 1 : 0,
        duration: 0.5,
        ease: "power1.inOut",
        delay: i * 2,
      })
        .to(imageDiv, {
          duration: i === arrayBannerImage.length - 1 ? 3 : 0,
        })
        .from(
          texts.chars,
          {
            autoAlpha: 0,
            stagger: {
              from: "random",
              amount: 0.8,
            },
          },
          "<"
        );
    });

    return () => {
      tl.kill();
    };
  }, [isReady]);

  return {
    arrayBannerImage,
    divRef,
    textRef,
  };
};

export default bannerAnimations;
