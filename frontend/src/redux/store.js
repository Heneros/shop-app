import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/products';
import filterReducer from './slices/filter';


const store = configureStore({
    reducer: {
        products: productsReducer,
        filter: filterReducer
    }
})
export default store;