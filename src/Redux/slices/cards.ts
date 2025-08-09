import { UserResponse } from "@/Types/mainTypes";
import { Product } from "@/Types/productsTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { count } from "console";

export interface CartItem extends Product {
  count: number;
  totalPrice: number;
}
 export interface PropsSlice {
  items: CartItem[];
  count: number;
  totalCount: number;
  productsTotalPrice: number;
  remainding : number,
  notificateCounts : 'add' | 'stopAdding' | 'notificate'
  notificateText : string
}
const initialState: PropsSlice = {
  items: [],
  count: 0,
  totalCount: 0,
  productsTotalPrice: 0,
  remainding : 0,
  notificateCounts : 'stopAdding',
  notificateText : ''
};

const cardItems = createSlice({
  name: "card",
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<Product>) => {
      const percentage = action.payload.discountPercentage ?? 0;
      const price = action.payload.price ?? 0;
      const discountPrice = price * (1 - percentage / 100);

      const existing = state.items.find(
        (items) => items.id === action.payload.id
      );
      
      //check  counts  and  total  prices of products in cards with checking finddd metod EXISTING
      if (!existing) {
        const totalDesiredCount = state.totalCount + state.count 
        const newCount = totalDesiredCount <= action.payload.stock ? totalDesiredCount  : state.totalCount
         
        state.notificateCounts  = totalDesiredCount <= action.payload.stock ? 'add' : 'notificate'
        if(state.notificateCounts === 'notificate'){
          state.remainding =  action.payload.stock  
          state.notificateText = `Sorry we have ${action.payload.stock} items in stock`
        }
        
        if(state.notificateCounts === 'add'){
          state.remainding = action.payload.stock - totalDesiredCount
          state.notificateText = `${state.remainding - totalDesiredCount} items are still available`
          state.items.push({
            ...action.payload,
            count:  newCount,
            totalPrice: newCount * discountPrice,
            stock : action.payload.stock - totalDesiredCount
          });
        }
        
      } else {
        const totalDesiredCount =  existing.count + state.count;
        const newCount = state.count  <= existing.stock ? totalDesiredCount  : existing.count

        state.notificateCounts  = state.count <= existing.stock ? 'add' : 'notificate'

        if(state.notificateCounts === 'notificate'){
          state.remainding =  existing.stock  
          state.notificateText = state.remainding === 0 ? `This item is out of stock.` :   `Sorry we have ${state.remainding} items in stock`
        }
        if(state.notificateCounts === 'add'){
          state.remainding = existing.stock - totalDesiredCount
          state.notificateText = `${state.remainding - totalDesiredCount} are still available`
          existing.count = newCount ;
          existing.totalPrice = existing.count * discountPrice;
          existing.stock = existing.stock  - state.count
        }
        
      }

      state.productsTotalPrice = state.items.reduce(
        (a, b) => a + b.totalPrice,
        0
      );
    },

    removeItems: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter(
        (items) => items.id !== action.payload.id
      );
    },

    clearItem: (state) => {
      state.items = [];
    },

      addCountCards: (
        state,
        action: PayloadAction<{ count: number; }>
      ) => {
        state.count = action.payload.count;
      },

    changeNotificateCounts : (state , action : PayloadAction<'add' | 'stopAdding' | 'notificate'>) => {
      state.notificateCounts  = action.payload
    }
    ,
    remaindingState : (state , action : PayloadAction<number>) => {
      state.remainding = action.payload
    }
  },
});

export const {
  addItems,
  removeItems,
  clearItem,
  addCountCards,
  changeNotificateCounts
  ,remaindingState
} = cardItems.actions;
export default cardItems.reducer;
