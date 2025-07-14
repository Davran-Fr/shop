import { configureStore } from "@reduxjs/toolkit";
import userInfo from "@/Redux/slices/userDataBase";
import quickView from "@/Redux/slices/quickView";
import { ecommerce } from "@/Api/ecommerce";
import { api } from "@/Api/auth";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [ecommerce.reducerPath]: ecommerce.reducer,
    userInfo: userInfo,
    quikcView: quickView,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(ecommerce.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
