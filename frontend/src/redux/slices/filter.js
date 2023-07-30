import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    all_products: [],
    sort: 'price-lowest',
    filtered_products: [],
    filters: {
        text: '',
        company: 'all',
        category: 'all',
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false
    },

};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        loadProducts(state, action) {
            state.all_products = action.payload.products
        },
        updateSort(state, action) {
            state.sort = action.payload.products
        },
        updateFilters(state, action) {
            const { name, value } = action.payload.products
            if (name == 'category') {
                state.filters.category = value;
            } else if (name == 'price') {
                state.filters.price = Number(value);
            } else if (name == 'shipping') {
                state.filters.shipping = value;
            } else {
                state.filters[name] = value;
            }
        },
        clearFilters(state) {
            state.filters = {
                text: '',
                company: 'all',
                category: 'all',
                min_price: 0,
                max_price: 0,
                price: 0,
                shipping: false
            };
        },
    },
});


export const { loadProducts, updateSort, updateFilters, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;

