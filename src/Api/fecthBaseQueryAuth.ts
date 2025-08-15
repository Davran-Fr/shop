import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {
  clearTokenCookies,
  getTokenCookies,
  setTokenCookies,
} from "@/lib/useCookies";
import {
  clearAccess_token,
  getAccess_token,
  setAccess_token,
} from "@/lib/useLocaleStorage";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.escuelajs.co/api/v1" ,
  //   credentials: "include",
  prepareHeaders: (headers) => {
    const token = getAccess_token();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const customBaseQuery: BaseQueryFn<   string | FetchArgs,   unknown,   FetchBaseQueryError > = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
   
  if (result.error?.status === 401) {
    try {
      const currentToken = getTokenCookies();

      const refresResult: any = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: {
            refreshToken: currentToken,
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
        api,
        extraOptions
      );

      if (refresResult?.data?.refresh_token) {
        setTokenCookies(refresResult.data.refresh_token);
        setAccess_token(refresResult.data.access_token);
        result = await baseQuery(args, api, extraOptions);
      } else {
        clearAccess_token();
        clearTokenCookies();
      }
    } catch (err) {
      console.log("Error iz autoRefreshTokena ,", err);
    }
  }

  
  const errorName = (result.error as any)?.data?.name;
  if (errorName === "EntityNotFoundError") {
    clearTokenCookies();
    clearAccess_token();
  }

  return result;
};
