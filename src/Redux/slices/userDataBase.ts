import { UserResponse } from "@/Types/mainTypes";
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
      state.data = action.payload
    },
  },
});

export const { setUsersDataBase } = userDataBase.actions;

export default userDataBase.reducer;
