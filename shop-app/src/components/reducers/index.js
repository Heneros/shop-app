import { combineReducers } from 'redux';
import commentsReducer from './commentsReducer';
import productsReducer from './productsReducer';
import usersReducers from './usersReducers';
import { reducer as formReducer } from 'redux-form';
 
export default combineReducers({
     products: productsReducer,
     users: usersReducers,
     comments: commentsReducer,
     form: formReducer
});
