import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from '../../axios';


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const { data } = await axios.get('/products');
    return data;
});


const initialState = {
    products: {
        items: [],
        status: 'loading'
    }
};

const productsSlice = createSlice({
    name: 'products'
})


export const productsReducer = productsSlice.reducer;