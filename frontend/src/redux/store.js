import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/products';
import filterReducer from './slices/filter';


const rootReducer = combineReducers({
    // Добавьте другие reducers, если есть
    products: productsReducer,
    filter: filterReducer,
});

const store = configureStore({
    reducer: rootReducer,
});



// const store = configureStore({
//     reducer: {
//         products: productsReducer,
//         filter: filterReducer

//     }
// })
export default store;