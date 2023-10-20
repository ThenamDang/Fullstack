import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuData: [],
    signUpPhone: '',
    signUpName: '',
    signUpEmail: '',
    inUseTag: false,
    codeValidModal: false,
    signUpCode: ''
}

export const apiDataSlice = createSlice({
    name: 'apiData',
    initialState,
    reducers: {
        updateMenuData: (state, action) => {
            state.menuData = action.payload;
        },
        updateSignUpPhone: (state, action) => {
            state.signUpPhone = action.payload;
        },
        updateSignUpName: (state, action) => {
            state.signUpName = action.payload;
        },
        updateSignUpEmail: (state, action) => {
            state.signUpEmail = action.payload;
        },
        updateSignUpCode: (state, action) => {
            state.signUpCode = action.payload;
        },
        trueInUseTag: (state) => {
            state.inUseTag = true;
        },
        falseInUseTag: (state) => {
            state.inUseTag = false;
        },
        trueCodeValidModal: (state) => {
            state.codeValidModal = true;
        },
        falseCodeValidModal: (state) => {
            state.codeValidModal = false;
        },
    }
})

export const { updateMenuData, updateSignUpPhone, trueInUseTag, falseInUseTag, updateSignUpName, trueCodeValidModal, falseCodeValidModal, updateSignUpCode, updateSignUpEmail } = apiDataSlice.actions;
export default apiDataSlice.reducer;