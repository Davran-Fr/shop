// 'use client'
// import { usePathname, useRouter  } from "next/navigation";
// import { useEffect } from "react";
// import { useTokenLoading } from "./useTokenLoading";

// export function useAuthRedirect() {
//   const { isAuthenticated} = useTokenLoading();
//   const pathname = usePathname()
//   const router = useRouter();

//   useEffect(() => {
//     if (isAuthenticated === null) return;
//     const isAuthPage = ["/auth/signup", "/auth/login", "/auth"].includes(pathname);

//     if (isAuthenticated && isAuthPage) {
//       // router.replace("/"); 
//     }

//     if ( !isAuthenticated  && !isAuthPage) {
//       // router.replace("/auth"); 
//     }
//   }, [isAuthenticated, router , pathname]);
// }
