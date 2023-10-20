import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: false,
    verification: false,
    signUp: false,
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        openAccount: (state) => {
            state.account = true;
        },
        closeAccount: (state) => {
            state.account = false;
        },
        openVerification: (state) => {
            state.verification = true
        },
        closeVerification: (state) => {
            state.verification = false
        },
        openSignUp: (state) => {
            state.signUp = true
        },
        closeSignUp: (state) => {
            state.signUp = false
        },
    }
})

export const { openAccount, closeAccount, openVerification, closeVerification, openSignUp, closeSignUp} = accountSlice.actions;
export default accountSlice.reducer;