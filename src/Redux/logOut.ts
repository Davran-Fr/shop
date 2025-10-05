import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Props {
  show: boolean;
}

const initialState: Props = {
  show: false,
};

const logOut = createSlice({
  name: "logoutnotificate",
  initialState,
  reducers: {
    logOutNotificate: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

export const {
  logOutNotificate
} = logOut.actions;
export default logOut.reducer;
