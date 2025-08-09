import { useRouter } from "next/navigation";
import React from "react";

const NotFoundInfo = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center justify-center gap-20 py-40 h-screen">
      <h1 className="text-4xl font-world">Sorry Product Not Found</h1>
      <button onClick={() => router.refresh()} className="bg-orderBtn py-5 px-10">Refresh the page</button>
    </div>
  );
};

export default NotFoundInfo;
