import { ProductParams } from "@/Types/filterTypes";
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
    getChosedCategories: builder.query<
      getAllProductsTypes,
      { category: string }
    >({
      query: ({ category }) => `/products/category/${category}`,
    }),
    getAllProducts: builder.query<getAllProductsTypes, void>({
      query: () => "/products?limit=0&skip=0",
    }),
    getSingleProduct: builder.query<Product, number | null>({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    }),
    getProductsFiltered: builder.query<any, ProductParams>({
      query: ({ skip, category, q, sortBy, order, select, limit }) => {
        let url = "";
        const params = new URLSearchParams();

        if (category && !q) {
          url = `/products/category/${category}`;
        } else if (q) {
          url = `/products/search`;
          params.append("q", q);
        } else {
          url = `/products`;
        }

        if (sortBy) params.append("sortBy", sortBy);
        if (order) params.append("order", order);
        if (limit !== undefined) params.append("limit", String(limit));
        if (skip !== undefined) params.append("skip", String(skip));
        if (select) params.append("select", select);

        return `${url}?${params.toString()}`;
      },
    }),
  }),
});

export const {
  useGetAllCategoriesListsQuery,
  useGetAllProductsQuery,
  useGetChosedCategoriesQuery,
  useGetSingleProductQuery,
  useGetProductsFilteredQuery,
} = ecommerce;
