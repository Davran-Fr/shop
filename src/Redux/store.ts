import { configureStore } from "@reduxjs/toolkit";
import userInfo from "@/Redux/userDataBase";
import quickView from "@/Redux/quickView";
import filter from "@/Redux/filterBase";
import { ecommerce } from "@/Api/ecommerce";
import { api } from "@/Api/auth";
import toggleFilter from "./toggleFilterBack";
import loadingAuth from "./globalLoading";
import cardItems from "./cards";
import addInfoProducts  from "./infoDataBase";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [ecommerce.reducerPath]: ecommerce.reducer,
    userInfo: userInfo,
    quikcView: quickView,
    filter: filter,
    toggleFilter: toggleFilter,
    loadingAuth: loadingAuth,
    cardItems: cardItems,
    infoProductsBase : addInfoProducts
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(ecommerce.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
