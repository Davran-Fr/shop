import { UserResponse } from "@/Types/main";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Data {
  data: UserResponse | null;
}

const initialState: Data = {
  data: null,
};

const userDataBase = createSlice({
  name: "databaseSlice",
  initialState,
  reducers: {
    setUsersDataBase: (state, action: PayloadAction<UserResponse>) => {
      state.data = action.payload;
    },
    clearUserDataBase: (state) => {
      state.data = null;
    },
  },
});

export const { setUsersDataBase, clearUserDataBase } = userDataBase.actions;

export default userDataBase.reducer;
