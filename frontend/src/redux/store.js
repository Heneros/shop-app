import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/products';
import { authReducer } from './slices/auth';
import { apiSlice } from './slices/apiSlice';


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        products: productsReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})


export default store;