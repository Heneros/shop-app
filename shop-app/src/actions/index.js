import products from '../apis/products';
import history from '../history'; 
import _ from 'lodash'; 

import { 
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CREATE_PRODUCT

 } from './types'


export const createProduct = formValues => async (dispatch) =>{
  const response = await products.post('/products', {...formValues});
  dispatch({type: CREATE_PRODUCT, payload: response.data})
  history.push('/');
}

export const fetchProducts = () => async dispatch =>{
  const response = await products.get('/products');
  dispatch({type: FETCH_PRODUCTS, payload: response.data})
};


export const fetchProduct = (id) => async dispatch =>{
  const response = await products.get(`/products/${id}`);
  dispatch({type: FETCH_PRODUCT, payload: response.data})
}

export const editProduct = (id, formValues) => async dispatch =>{
  const response = await products.patch(`/products/${id}`, formValues);
  dispatch({type: EDIT_PRODUCT, payload: response.data});
  history.push('/')
}

export const deleteProduct = (id) => async dispatch =>{
   await products.delete(`/products/${id}`);
  dispatch({type: DELETE_PRODUCT, payload: id})
  history.push('/')
}