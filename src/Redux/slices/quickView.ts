import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface Props {
  id: number | null;
  open: "open" | "hidden" | "close",
}
const initialState: Props = {
  id: null,
  open: 'hidden',
};

export const quickView = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    setIdProduct: (state, action: PayloadAction<number  | null>) => {
      state.id = action.payload;
    },
    openQuikview: (state, action: PayloadAction<'open' | "hidden" | 'close'>) => {
      state.open = action.payload;
    },
  },
});

export const { setIdProduct, openQuikview } = quickView.actions;
export default quickView.reducer;
