import products from '../apis/products';
import _ from 'lodash';

import jsonPlaceholder from "../apis/jsonPlaceholder";
// import addProductReducer from './addProductReducer';
import { ADD_PRODUCT } from './types'


export const fetchProducts =  () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({ type: 'FETCH_PRODUCTS', payload: response.data});
};



export const fetchComment = id => async dispatch =>{
  const response = await jsonPlaceholder.get(`/comments`);
  dispatch({ type: 'FETCH_COMMENT', payload: response.data});
};


export const createProduct = formValues => async dispatch =>{
  const response = await products.post('/product', formValues);
  dispatch({type: ADD_PRODUCT, payload: response})
}