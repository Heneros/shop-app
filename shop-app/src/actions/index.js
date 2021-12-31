import products from '../apis/products';
import history from '../history'; 
import _ from 'lodash'; 

// import jsonPlaceholder from "../apis/jsonPlaceholder";
// import addProductReducer from './addProductReducer';
import { 
  ADD_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CREATE_PRODUCT

 } from './types'


// export const fetchProducts =  () => async dispatch => {
//     const response = await jsonPlaceholder.get('/posts');
//     dispatch({ type: 'FETCH_PRODUCTS', payload: response.data});
// };

export const fetchProducts = () => async dispatch =>{
  const response = await products.get('/products');
  dispatch({type: FETCH_PRODUCTS, payload: response.data})
};

export const createProduct = formValues => async dispatch =>{
  const response = await products.post('/products', formValues);
  dispatch({type: CREATE_PRODUCT, payload: response})
  history.push('/');
}


export const fetchProduct = (id) => async dispatch =>{
  const response = await products.get(`/products/${id}`);
  dispatch({type: FETCH_PRODUCT, payload: response})
}

export const editProduct = (id, formValues) => async dispatch =>{
  const response = await products.put(`/products/${id}`, formValues);
  dispatch({type: EDIT_PRODUCT, payload: response})
}

export const deleteProduct = (id) => async dispatch =>{
   await products.dlete(`/products/${id}`);
  dispatch({type: DELETE_PRODUCT, payload: id})
}