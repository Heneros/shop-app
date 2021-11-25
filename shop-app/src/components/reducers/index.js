import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import userReducers from './userReducers';

export default combineReducers({
     products: productsReducer,
     users: userReducers
});
