import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    text: '',
    category: 'all',
    company: 'all',
    color: 'all',
    price: 0,
    shipping: false,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateTextFilter(state, action) {
            state.text = action.payload;
        },
        updateCategoryFilter(state, action) {
            state.category = action.payload;
        },
        updateCompanyFilter(state, action) {
            state.company = action.payload;
        },
        updateColorFilter(state, action) {
            state.color = action.payload;
        },
        updatePriceFilter(state, action) {
            state.price = action.payload;
        },
        updateShippingFilter(state, action) {
            state.shipping = action.payload;
        },
        clearFilters(state) {
            return initialState;
        },
    },
});

export const {
    updateTextFilter,
    updateCategoryFilter,
    updateCompanyFilter,
    updateColorFilter,
    updatePriceFilter,
    updateShippingFilter,
    clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
