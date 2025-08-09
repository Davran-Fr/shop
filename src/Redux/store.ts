import { configureStore } from "@reduxjs/toolkit";
import userInfo from "@/Redux/slices/userDataBase";
import quickView from "@/Redux/slices/quickView";
import filter from "@/Redux/slices/filterBase";
import { ecommerce } from "@/Api/ecommerce";
import { api } from "@/Api/auth";
import toggleFilter from "./slices/toggleFilterBack";
import loadingAuth from "./slices/globalLoading";
import cardItems from "./slices/cards";
import addInfoProducts  from "./slices/infoDataBase";

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
