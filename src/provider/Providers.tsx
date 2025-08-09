"use client";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { AnimationsProvider } from "@/components/forms/animation";
import { UserDataBase } from "./UserDataBase";
import GlobalLoading from "./GlobalLoading";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <UserDataBase>
        <GlobalLoading>
          <AnimationsProvider>{children}</AnimationsProvider>
        </GlobalLoading>
      </UserDataBase>
    </Provider>
  );
}
