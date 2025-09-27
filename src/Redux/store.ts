import userInfo from "@/Redux/userDataBase";
import filter from "@/Redux/filterBase";
import toggleFilter from "./toggleFilterBack";
import loadingAuth from "./globalLoading";
import cardItems from "./cards";
import addInfoProducts from "./infoDataBase";
import showOrder from "./showOrder";

import { ecommerce } from "@/Api/ecommerce";
import { api } from "@/Api/auth";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [ecommerce.reducerPath]: ecommerce.reducer,
    userInfo: userInfo,
    filter: filter,
    toggleFilter: toggleFilter,
    loadingAuth: loadingAuth,
    cardItems: cardItems,
    infoProductsBase: addInfoProducts,
    showOrder: showOrder,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(ecommerce.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
