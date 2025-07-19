"use client";

import { useAnimations } from "@/components/forms/animation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authDiv } = useAnimations();
  return (
    <div className="mx-auto fixed  flex overflow-hidden justify-center font-medium items-center px-5 z-10  w-full h-screen bg-mainBack">
      <div
        ref={authDiv}
        className="bg-mainColor invisible  relative z-10  h-auto sm:max-h-registerHeight rounded-xl sm:h-full max-w-registerWidth w-full  flex items-center justify-center    p-10 overflow-hidden     "
      >
        <div className="w-full h-full relative z-10">{children}</div>
      </div>
    </div>
  );
}
