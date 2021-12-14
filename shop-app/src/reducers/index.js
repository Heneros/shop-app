import { combineReducers } from 'redux';
import commentsReducer from './commentsReducer';
import productsReducer from './productsReducer';
import { reducer as formReducer } from 'redux-form';
 
export default combineReducers({
     products: productsReducer,

     comments: commentsReducer,
     form: formReducer
});
