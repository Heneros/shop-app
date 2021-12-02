import { combineReducers } from 'redux';
import commentsReducer from './commentsReducer';
import productsReducer from './productsReducer';
import usersReducers from './usersReducers';

export default combineReducers({
     products: productsReducer,
     users: usersReducers,
     comments: commentsReducer
});
