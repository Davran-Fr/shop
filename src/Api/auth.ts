import {  UpdatedType } from "@/validation/validation";
import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./fecthBaseQueryAuth";
import { UserResponse } from "@/Types/mainTypes";

export const api = createApi({
  reducerPath: "pokemonApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getAllUserInfo: builder.query<UserResponse[], void>({
      query: () => "/users",
    }),
    signUp: builder.mutation<UserResponse, UpdatedType>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
    }),
    logIn: builder.mutation<{access_token : string, refresh_token: string}, {email: string , password:string}>({
      query: (newUser) => ({
        url: "/auth/login",
        method: "POST",
        body: newUser,
      }),
    }),
    refreshToken : builder.mutation<{refresh_token: string | undefined , access_token : string | undefined} , {refreshToken: string}>({
       query: (refreshToken)=> ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: refreshToken,
       })
    }),
    userInfo : builder.query<UserResponse, string | null>({
      query:(id) => ({
        url: `/users/${id}`,
        method : 'GET',
      })
    })
    ,
    getProfile: builder.query<UserResponse, void>({
      query : () => '/auth/profile'
    }),
    isEmailAvailable : builder.mutation<{isAvailable : boolean  } , {email : string}>({
      query : ({email}) => ({
       method : "POST",
       url : '/users/is-available',
       body: {email}
      })
    })
  
  }),
});

export const {useIsEmailAvailableMutation ,  useLazyGetAllUserInfoQuery, useSignUpMutation , useLogInMutation ,useLazyGetProfileQuery, useRefreshTokenMutation , useUserInfoQuery} = api;
