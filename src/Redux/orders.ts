import { Order } from "@/features/order/usePlaceOrder";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Main {
  orders: Order[];
}

const loadOrders = (): Order[] => {
  if (typeof window === "undefined") return []; // чтобы на сервере не упало
  try {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Ошибка при загрузке orders из localStorage:", e);
    return [];
  }
};

const saveItem = (item: Order) => {
  try {
    const loaded = localStorage.getItem("orders");
    const items: Order[] = loaded ? JSON.parse(loaded) : [];
    const allItems = [...items, item];
    localStorage.setItem("orders", JSON.stringify(allItems));
  } catch (e) {
    console.error("errors form orders Redux");
  }
};
const initialState: Main = {
  orders: loadOrders(),
};

const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      saveItem(action.payload);
    },
  },
});

export const { addOrder } = orders.actions;
export default orders.reducer;
