import {configureStore} from "@reduxjs/toolkit";
import { rememberReducer, rememberEnhancer } from 'redux-remember';
import products from "./reducers/products";
import user from "./reducers/user"

const rememberedKeys = ["user", "products"]

const store = configureStore({
    reducer: rememberReducer({
        user,
        products
    }),
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(
        rememberEnhancer(
            window.localStorage,
            rememberedKeys
        )
    )
})

export default store