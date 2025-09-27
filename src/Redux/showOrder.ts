import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderState {
  show?: boolean;
  name?: string;
  phone?: string;
  area?: string;
  district?: string;
  velayat?: string;
}

const initialState: OrderState = {
  show: true,
  name: "",
  phone: "",
  area: "",
  district: "",
  velayat: "",
};

const showOrder = createSlice({
  name: "order",
  initialState,
  reducers: {
    changeOrder: (state, action: PayloadAction<OrderState>) => {
      return { ...state, ...action.payload };
    },
    clearOrder: (state) => {
      state.area = "";
      state.name = "";
      state.district = "";
      state.velayat = "";
      state.phone = "";
    },
  },
});

export const { changeOrder , clearOrder} = showOrder.actions;
export default showOrder.reducer;
