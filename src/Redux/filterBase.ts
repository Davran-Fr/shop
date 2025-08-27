import { ProductParams } from "@/Types/filter";
import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

const initialState: ProductParams = {
  category: "",
  sortBy: "",
  order: "",
  limit: 0,
  skip: 0,
  select: "",
  search : "",
  minPrice: 0,
  maxPrice  : 0,
  page : 1,
  itemsPerPage : 8
};

const filterBase = createSlice({
  name: "filterBase",
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<Partial<ProductParams>>) => {
      return { ...state, ...action.payload };
    },
    
  },
});

export const {changeFilter} = filterBase.actions;
export default filterBase.reducer;
