import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchProducts = createAsyncThunk('api/products/fetchProducts', async () => {
    try {
        const { data } = await axios.get('/api/products');
        return data;
    } catch (error) {
        throw error;
    }
});

const initialState = {
    products: [],
    status: 'loading'
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.products = [];
            state.products.status = 'loading';
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.products = action.payload.products;
            state.products.status = 'loaded';
        },
        [fetchProducts.rejected]: (state) => {
            state.products = [];
            state.products.status = 'error';
        },
    }
})


export const productsReducer = productsSlice.reducer;