"use client";

import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";

gsap.registerPlugin(SplitText);

interface AnimationsContextType {
  authDiv: React.RefObject<HTMLDivElement | null>;
  dvgTexts: React.RefObject<HTMLDivElement | null>;
  btnDiv: React.RefObject<HTMLDivElement | null>;
  loginBtn: React.RefObject<HTMLButtonElement | null>;
  registerBtn: React.RefObject<HTMLButtonElement | null>;
}

const AnimationsContext = createContext<AnimationsContextType | null>(null);

export const useAnimations = () => {
  const context = useContext(AnimationsContext);
  if (!context) {
    throw new Error("useAnimations ");
  }
  return context;
};

export const AnimationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  
  const authDiv = useRef<HTMLDivElement>(null);
  const btnDiv = useRef<HTMLDivElement>(null);
  const dvgTexts = useRef<HTMLDivElement>(null);
  const loginBtn = useRef<HTMLButtonElement>(null);
  const registerBtn = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup");

  useLayoutEffect(() => {
    if (isAuthPage) return;
    if (
      !authDiv.current ||
      !dvgTexts.current ||
      !loginBtn.current ||
      !registerBtn.current
    )
      return;
    const tl = gsap.timeline();
    const text = SplitText.create(dvgTexts.current, { type: "chars" });

    tl.fromTo(
      authDiv.current,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, duration: 1 }
    )
      .from(text.chars, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        autoAlpha: 0,
        stagger: { amount: 0.5, from: "random" },
      })
      .from(btnDiv.current, { height: 0 })
      .from(authDiv.current, { borderRadius: "50%", duration: 1 }, "<")
      .from(
        [loginBtn.current, registerBtn.current],
        { scale: 0, duration: 0.5, stagger: 0.2 },
        "<"
      )
      .to(
        authDiv.current,
        { boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)", duration: 1 },
        "<"
      );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <AnimationsContext.Provider
      value={{ authDiv, dvgTexts, loginBtn, registerBtn, btnDiv }}
    >
      {children}
    </AnimationsContext.Provider>
  );
};
