import products from '../apis/products';
import _ from 'lodash';

import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchProductsAndUsers = () => async (dispatch, getState) =>{

  await dispatch(fetchProducts());
//  const userIds = _.uniq(_.map(getState().products, 'userId'));
// //  console.log(userIds);
//  userIds.forEach(id => dispatch(fetchUser(id)));

_.chain(getState().products)
.map('userId')
.uniq()
.forEach(id => dispatch(fetchUser(id)))
.value()
};

export const fetchProducts =  () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_PRODUCTS', payload: response.data});
};
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: 'FETCH_USER', payload: response.data });
};

// export const fetchUser = id => async dispatch => _fetchUser(id, dispatch);
// const  _fetchUser = _.memoize( async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });


export const fetchComment = id => async dispatch =>{
  const response = await jsonPlaceholder.get(`/comments`);
  dispatch({ type: 'FETCH_COMMENT', payload: response.data});
};



export const createProduct = formValues => async dispatch =>{
  products.post('/products', formValues);
}