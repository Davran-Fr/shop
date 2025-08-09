"use client";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { AnimationsProvider } from "@/components/forms/animation";
import { UserDataBase } from "./UserDataBase";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <UserDataBase>
        <AnimationsProvider>{children}</AnimationsProvider>
      </UserDataBase>
    </Provider>
  );
}
