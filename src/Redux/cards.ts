import Cookies from "js-cookie";

import { Product } from "@/Types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultState: PropsSlice = {
  items: [],
  count: 0,
  totalCount: 0,
  productsTotalPrice: 0,
  remainding: 0,
  notification: "stopAdding",
  notificateText: "",
};

//// Each object (items) in the card will contain counts and totalPrice
export interface CartItem extends Product {
  count: number;
  totalPrice: number;
}

export interface PropsSlice {
  items: CartItem[];
  count: number;
  totalCount: number;
  productsTotalPrice: number;
  remainding: number;
  notification: "add" | "stopAdding" | "notificate" | "remove";
  notificateText: string;
}

//////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////
const saveCartLocal = (state: PropsSlice) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (e) {
    console.error("Error saving cart to localStorage", e);
  }
};

//////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////
const loadCartLocal = (): PropsSlice => {
  try {
    const data = localStorage.getItem("cart");
    if (data) {
      return JSON.parse(data) as PropsSlice;
    }
  } catch (e) {
    console.error("Error loading cart from localStorage", e);
  }
  return defaultState;
};

//////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

const initialState: PropsSlice = loadCartLocal();

//////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

const cardItems = createSlice({
  name: "card",
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<Product>) => {
      //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

      const percentage = action.payload.discountPercentage ?? 0;
      const price = action.payload.price ?? 0;
      const discountPrice = price * (1 - percentage / 100);

      //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

      const existing = state.items.find(
        (items) => items.id === action.payload.id
      );

      //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

      if (!existing) {
        const totalDesiredCount = state.totalCount + state.count;
        const newCount =
          totalDesiredCount <= action.payload.stock
            ? totalDesiredCount
            : state.totalCount;

        state.notification =
          totalDesiredCount <= action.payload.stock ? "add" : "notificate";

        //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

        if (state.notification === "notificate") {
          state.remainding = action.payload.stock;
          state.notificateText = `Sorry we have ${action.payload.stock} items in stock`;
        }

        //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

        if (state.notification === "add") {
          state.notificateText = `Added ${state.count} items`;
          state.remainding = action.payload.stock - totalDesiredCount;
          state.items.push({
            ...action.payload,
            count: newCount,
            totalPrice: newCount * discountPrice,
            stock: action.payload.stock - totalDesiredCount,
          });
        }

        //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////
      } else {
        const totalDesiredCount = existing.count + state.count;
        const newCount =
          state.count <= existing.stock ? totalDesiredCount : existing.count;

        state.notification =
          state.count <= existing.stock ? "add" : "notificate";

        //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

        if (state.notification === "notificate") {
          state.remainding = existing.stock;
          state.notificateText =
            state.remainding === 0
              ? `This item is out of stock.`
              : `Sorry we have ${state.remainding} items in stock`;
        }

        //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

        if (state.notification === "add") {
          state.remainding = existing.stock - totalDesiredCount;
          state.notificateText = `Added ${state.count} items`;
          existing.count = newCount;
          existing.totalPrice = existing.count * discountPrice;
          existing.stock = existing.stock - state.count;
        }
      }

      //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

      state.productsTotalPrice = state.items.reduce(
        (a, b) => a + b.totalPrice,
        0
      );

      //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

      saveCartLocal(state);
    },
    removeItems: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

      if (findItem) {
        state.notification =
          state.count <= findItem.count ? "remove" : "notificate";

        //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

        if (state.notification === "remove") {
          findItem.count -= state.count;
          findItem.stock += state.count;
          state.notificateText = `Removed ${state.count} items`;
          const discountPrice =
            findItem.price * (1 - (findItem.discountPercentage ?? 0) / 100);
          findItem.totalPrice = findItem.count * discountPrice;
        } else if (state.notification === "notificate") {
          state.notificateText = `Warning you have ${findItem.count} items in card`;
        }

        //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

        if (findItem.count === 0) {
          state.items = state.items.filter(
            (items) => items.id !== action.payload.id
          );
        }
      }

      //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

      state.productsTotalPrice = state.items.reduce(
        (a, b) => a + b.totalPrice,
        0
      );

      //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

      saveCartLocal(state);
    },

    clearItem: (state) => {
      state.items = [];
    },
    addCountCards: (state, action: PayloadAction<{ count: number }>) => {
      state.count = action.payload.count;
    },
    changeNotification: (
      state,
      action: PayloadAction<"add" | "stopAdding" | "notificate" | "remove">
    ) => {
      state.notification = action.payload;
    },
    remaindingState: (state, action: PayloadAction<number>) => {
      state.remainding = action.payload;
    },
    selectedItemRemove: (state, action: PayloadAction<CartItem[]>) => {
      const toRemove = action.payload.map((i) => i.id);
      state.items = state.items.filter((item) => !toRemove.includes(item.id));
      saveCartLocal(state);
    },
    
  },
});

export const {
  selectedItemRemove,
  addItems,
  removeItems,
  clearItem,
  addCountCards,
  changeNotification,
  remaindingState,
} = cardItems.actions;
export default cardItems.reducer;
