import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice'
import AdminProductsSlice from './admin/products-slice'
import shoppingProductSlice from "./shop/products-slics"

const store = configureStore({
    reducer :{
        auth : authReducer,
        adminProducts : AdminProductsSlice,
        shopProducts : shoppingProductSlice,
    }
})


export default store;