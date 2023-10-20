import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './accountSlice'
import dataReducer from './apiDataSlice'
import loginReducer from './loginSlice'
import orderReducer from './orderSlice'

const store = configureStore({
    reducer: {
        account: accountReducer,
        apiData: dataReducer,
        login: loginReducer,
        order: orderReducer,
    }
})

export default store;