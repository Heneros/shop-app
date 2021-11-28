import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import usersReducers from './usersReducers';

export default combineReducers({
     products: productsReducer,
     users: usersReducers
});
