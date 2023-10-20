import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dateTime: Date(),
    plainBagels: '',
    everythingBagels: '',
    orderOpen: false,
    snack: false,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{
        updateDateTime: (state, action) => {
            state.dateTime = action.payload;
        },
        updatePlainBagels: (state, action) => {
            state.plainBagels = action.payload;
        },
        updateEverythingBagels: (state, action) => {
            state.everythingBagels = action.payload;
        },
        trueOrderOpen: (state) => {
            state.orderOpen = true;
        },
        falseOrderOpen: (state) => {
            state.orderOpen = false;
        },
        trueSnack: (state) => {
            state.snack = true;
        },
        falseSnack: (state) => {
            state.snack = false;
        },      
    }
})

export const { updateDateTime, updatePlainBagels, updateEverythingBagels, trueOrderOpen, falseOrderOpen,falseSnack, trueSnack} = orderSlice.actions;
export default orderSlice.reducer;