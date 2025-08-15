import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState  =  {
   filter : false
}

const toggleFilterBack = createSlice({
  name: "toggleFilter",
  initialState,
  reducers  : {
    toggleFilter : (state , action : PayloadAction<boolean>) => {
         state.filter = action.payload
    }
  }

});

export const {toggleFilter} = toggleFilterBack.actions;
export default toggleFilterBack.reducer
