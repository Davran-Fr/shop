import { ProductParams } from "@/Types/filter";
import { getAllProductsTypes } from "@/Types/main";
import { Product } from "@/Types/products";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useRouter } from "next/navigation";

export const ecommerce = createApi({
  reducerPath: "ecommerce",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ECOMMERCE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
    },
  }),
  endpoints: (builder) => ({
    getAllCategoriesLists: builder.query<string[], void>({
      query: () => "/products/category-list",
    }),

    //////// --------- --------- --------- ///////// --------- --------- --------- /////////

    getChosedCategories: builder.query<
      getAllProductsTypes,
      { category: string | null }
    >({
      query: ({ category }) => `/products/category/${category}`,
    }),

    //////// --------- --------- --------- ///////// --------- --------- --------- /////////

    getAllProducts: builder.query<getAllProductsTypes, void>({
      query: () => "/products?limit=0&skip=0",
    }),

    //////// --------- --------- --------- ///////// --------- --------- --------- /////////

    getSingleProduct: builder.query<Product, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    }),

    //////// --------- --------- --------- ///////// --------- --------- --------- /////////

    getProductsFiltered: builder.query<getAllProductsTypes, ProductParams>({
      query: ({ skip, category, sortBy, order, select, limit }) => {
        let url = "";
        const params = new URLSearchParams();

        if (category) {
          url = `/products/category/${category}`;
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
      transformResponse: (response: getAllProductsTypes) => {
        return {
          ...response,
          products: response.products.filter(
            (items) => !items.category.includes("groceries")
          ),
        };
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
