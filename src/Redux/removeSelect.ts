import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./cards";

interface Props {
  show: boolean;
  items: CartItem[];
}

const initialState: Props = {
  show: false,
  items: [],
};
const removeSelect = createSlice({
  name: "removeSelect",
  initialState,
  reducers: {
    removeSelectItem: (state, action: PayloadAction<CartItem>) => {
      const itemExists = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemExists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }
    },
    showToggle: (state) => {
      state.show = !state.show;
    },
    showSelection: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    removeButton: (state, action: PayloadAction<CartItem[]>) => {
      const toRemove = action.payload.map((i) => i.id);
      state.items = state.items.filter((item) => !toRemove.includes(item.id));
    },
  },
});

export const {
  removeSelectItem,
  showSelection,
  removeButton,
  showToggle,
} = removeSelect.actions;
export default removeSelect.reducer;
