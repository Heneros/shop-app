import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/products';
import { authReducer } from './slices/auth';
// import filterReducer from './slices/filters';


// const rootReducer = combineReducers({
//     products: productsReducer,
//     filter: filterReducer,
// });

// const store = configureStore({
//     reducer: rootReducer,
// });



const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: authReducer
        // filter: filterReducer

    }
})
export default store;