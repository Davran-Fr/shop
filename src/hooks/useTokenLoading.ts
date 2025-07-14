import { getTokenCookies } from "@/features/lib/cookies";
import { useEffect, useState } from "react";

export const useTokenLoading = () => {
  const [isAuthenticated, setCheckLoading] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getTokenCookies();
    setCheckLoading(!!token);
  }, []);
  return { isAuthenticated };
};
