import {configureStore} from "@reduxjs/toolkit";
import products from "./reducers/products";


export const store = configureStore({
    reducer: {
        products
    }
})