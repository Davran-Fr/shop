"use client";

import { useAnimations } from "@/components/forms/animation";
import AuthLoading from "@/ui/AuthLoading";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authDiv } = useAnimations();
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup");
  
  return (
    <div className="mx-auto fixed flex overflow-hidden justify-center font-medium items-center 400:py-5 px-5 z-10  w-full h-screen bg-mainBack">
      <div
        ref={authDiv}
        className={`bg-mainColor overflow-x-hidden ${
          isAuthPage ? "shadow-regiterBackShadow" : "invisible overflow-hidden"
        }   relative z-10  h-auto sm:max-h-registerHeight  rounded-xl sm:h-full  max-w-registerWidth w-full  flex items-center justify-center   p-5 sm:p-10  `}
      >
        <AuthLoading />
        <div className="w-full h-full relative z-10">{children}</div>
      </div>
    </div>
  );
}
