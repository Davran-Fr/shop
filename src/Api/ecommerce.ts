import { getAllProductsTypes } from "@/Types/mainTypes";
import { Product } from "@/Types/productsTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ecommerce = createApi({
  reducerPath: "ecommerce",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
    },
  }),

  endpoints: (builder) => ({
    getAllCategoriesLists: builder.query<string[], void>({
      query: () => "/products/category-list",
    }),
    getChosedCategories: builder.query<   getAllProductsTypes,   { category: string  } >({
      query: ({ category }) => `/products/category/${category}`,
    }),
    getAllProducts: builder.query<getAllProductsTypes, void>({
      query: () => "/products?limit=0&skip=0",
    }),
    getSingleProduct: builder.query<Product , number | null>({
      query: (id) => ({
        url: `products/${id }`,
        method: "GET"
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesListsQuery,
  useGetAllProductsQuery,
  useGetChosedCategoriesQuery,
  useGetSingleProductQuery
} = ecommerce;
