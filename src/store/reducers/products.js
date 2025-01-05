
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getProducts = createAsyncThunk(
    "get/getProducts",
    async (arg, { rejectWithValue }) => {
        try {
            const res = await axios("http://localhost:8080/products");

            if (res.status !== 200) {
                throw new Error("Ошибка при получении продуктов");
            }

            return res.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const products = createSlice({
    name: "products",
    initialState: {
        data: [],
        status: "pending",
        error: null,
        filter: {
            order: false,
        },
    },
    reducers: {
        changeOrder: (state) => {
            state.filter.order = !state.filter.order;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.data = [];
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload;
            });
    },
});

export const { changeOrder } = products.actions;
export default products.reducer;