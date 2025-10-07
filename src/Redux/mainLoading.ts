import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const mainLoading = createSlice({
  name: "loadingAuth",
  initialState,
  reducers: {
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { changeLoading } = mainLoading.actions;
export default mainLoading.reducer;
