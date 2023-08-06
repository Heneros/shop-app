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

export const fetchFilters = createAsyncThunk('api/products/fetchFilters', async () => {
    try {
        const { data } = await axios.get('/api/products/filters');
        return data;
        // console.log(data);
    } catch (error) {
        throw error;
    }
});




const initialState = {
    products: {
        items: [],
        status: 'loading'
    },
    categories: {
        items: [],
        status: 'loading'
    }
    // products: [],
    // status: 'loading'
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


        [fetchFilters.pending]: (state) => {
            state.categories = [];
            state.categories.status = 'loading';
        },
        [fetchFilters.fulfilled]: (state, action) => {
            state.categories = action.payload.categories;
            state.categories.status = 'loaded';
        },
        [fetchFilters.rejected]: (state) => {
            state.categories = [];
            state.categories.status = 'error';
        },

    }
})
export const selectAllProducts = (state) => state.products.products;



export const productsReducer = productsSlice.reducer;