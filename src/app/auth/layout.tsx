"use client";

import { clearAccess_token } from "@/features/lib/localeStorage";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto fixed  flex overflow-hidden justify-center font-medium items-center px-5 z-10  w-full h-screen bg-mainBack">
      <div className="bg-mainColor relative z-10  h-auto sm:max-h-registerHeight sm:h-full max-w-registerWidth w-full rounded-xl flex items-center justify-center    p-10 overflow-hidden  shadow-center  ">
        <div className="w-full h-full relative z-10">{children}</div>
      </div>
    </div>
  );
}
