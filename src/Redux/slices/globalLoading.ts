import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
};
const globalLoadingPage = createSlice({
  name: "loadingAuth",
  initialState,
  reducers: {
    loadingAuth: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export  const  {loadingAuth} = globalLoadingPage.actions
export default globalLoadingPage.reducer
