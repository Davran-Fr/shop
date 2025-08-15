import { Product } from "@/Types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Props {
    data: Product | null,
}

const initialState : Props = {
    data : null
}

const infoProductsBase = createSlice({
    name : ' infoProducts',
    initialState,
    reducers : {
        addInfoProducts : (state , action : PayloadAction<Props>) => {
            state.data = action.payload.data
        }
    }
    
})
export const {addInfoProducts} = infoProductsBase.actions
export default infoProductsBase.reducer