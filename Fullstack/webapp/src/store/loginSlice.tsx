import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIN: false,
    userName: '',
    userPhoneNumber: '',
    userEmail: '',
    snack: false,
    loginOpen: false,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        updateUserName: (state, action) => {
            state.userName = action.payload;
        },
        updateUserPhoneNumber: (state, action) => {
            state.userPhoneNumber = action.payload;
        },
        updateUserEmail: (state, action) => {
            state.userEmail = action.payload;
        },
        trueloggedIN: (state) => {
            state.loggedIN = true;
        },
        falseloggedIN: (state) => {
            state.loggedIN = false;
        },
        trueSnack: (state) => {
            state.snack = true;
        },
        falseSnack: (state) => {
            state.snack = false;
        },
        trueLoginOpen: (state) => {
            state.loginOpen = true;
        },
        falseLoginOpen: (state) => {
            state.loginOpen = false;
        },
    }
})

export const { updateUserName, updateUserPhoneNumber, trueloggedIN, falseloggedIN, trueSnack, falseSnack, trueLoginOpen, falseLoginOpen, updateUserEmail } = loginSlice.actions;
export default loginSlice.reducer;